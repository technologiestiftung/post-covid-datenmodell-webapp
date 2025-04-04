"""
Script to generate static data for air quality in germany

"""

import pandas as pd
import json
import os
import httpx
from datetime import datetime

TODAY = datetime.today().strftime("%Y-%m-%d")

bundesland_mapping = {
    "NW": "Nordrhein-Westfalen",
    "BY": "Bayern",
    "BW": "Baden-Württemberg",
    "HE": "Hessen",
    "NI": "Niedersachsen",
    "BB": "Brandenburg",
    "RP": "Rheinland-Pfalz",
    "SN": "Sachsen",
    "ST": "Sachsen-Anhalt",
    "TH": "Thüringen",
    "BE": "Berlin",
    "SH": "Schleswig-Holstein",
    "MV": "Mecklenburg-Vorpommern",
    "HH": "Hamburg",
    "HB": "Bremen",
    "SL": "Saarland",
    "UB": "Unbekannt"
}

def get_all_stations(time_start: str = "2024-01-01", time_end: str = "2024-12-31") -> list:
        """
        Gets all available air quality stations in Germany that are available through
        the Umwelt Bundesamt Luftdaten API.

        Args:
            time_start (str): start date of the timeframe, default is 2019-01-01
            time_end (str): end date of the timeframe, default is 2024-12-31

        Returns:
            list: list of all available stations with their respective data
        """
        

        url = f"https://www.umweltbundesamt.de/api/air_data/v3/stations/json?use=airquality&lang=de&date_from={time_start}&date_to={time_end}&time_from=1&time_to=24"

        
        try: 
            response = httpx.get(url, timeout=20.0)
            response_data = response.json()

            # get necessary station data
            stations = []

            # if response is valid
            if response_data["data"]:
                for key, value in response_data["data"].items():
                    stations.append({
                    "id": value[0],
                    "code": value[1],
                    "name": value[2], 
                    "bundesland": value[12],
                    "longitude": float(value[7]), 
                    "latitude": float(value[8])})
        except httpx.ReadTimeout:
            warnings.warn("Request timed out")
            


        return stations

def get_schadstoffe_data(bundesland:str, station_id: str, start_date: str = "2024-01-01", end_date: str = "2024-12-31") -> pd.DataFrame:
    """
    Gets all available air quality stations in Germany that are available through
    the Umwelt Bundesamt Luftdaten API.

    Args:
        start_data (str): start date of the timeframe, default is 2024-01-01
        end_date (str): end date of the timeframe, default is 2024-12-31

    Returns:
        list: list of all available stations with their respective data
    """

    # Get Station Data for the Pollutants
    schadstoff_scope_mapping = {
        1: 6,  # Feinstaub (PM10) PM10 -> stündlich gleitendes Tagesmittel 
        5: 2,  # Stickstoffdioxid NO2 -> Ein-Stunden-Mittelwert 1SMW
        9: 6,  # Feinstaub (PM2.5) PM2.5 -> stündlich gleitendes Tagesmittel
        3: 2,  # Ozon O3 -> Ein-Stunden-Mittelwert 1SMW
        }

    component_name_mapping = {
        1: "Feinstaub (PM10)",
        5: "Stickstoffdioxid",
        9: "Feinstaub (PM2.5)",
        3: "Ozon"
        }

    schadstoff_data = {}

    # iterate over all components and get the data
    for key, value in schadstoff_scope_mapping.items():
        component = key
        component_name = component_name_mapping[component]
        scope = value
            
        request_url = f"https://www.umweltbundesamt.de/api/air_data/v3/measures/json?date_from={start_date}&time_from=1&date_to={end_date}&time_to=24&station={station_id}&component={component}&scope={scope}"
        response = httpx.get(request_url, timeout=10.0)
        response_data = response.json()

        # if request is successful
        if response_data["data"] and len(response_data["data"]) > 0: 
            station_data = response_data["data"].get(station_id, None)

            daily_data = {}
            daily_data_mean = {}

            # sort values into their days (if multiple values per day)
            for key, value in station_data.items():
                day = key.split(" ")[0]
                if daily_data.get(day, None) is None and value[2]:
                    daily_data[day] = []
                    daily_data[day].append(value[2]) # value[2] = measurement

                elif value[2]: # append only if values are valid
                    daily_data[day].append(value[2])

            for key, value in daily_data.items():
                assert len(value) > 0 # if we have a day, we should have at least one value
                assert len(value) < 25 # we can only have 24 measures as there is one per hour
                daily_data_mean[key] = sum(value) / len(value)
                    
            schadstoff_data[component_name] = daily_data_mean
        # if the measurement is not available
        else : 
            schadstoff_data[component_name] = None
                

    schadstoff_data = pd.DataFrame(schadstoff_data)
    schadstoff_data["standort"] = [bundesland] * len(schadstoff_data)
    schadstoff_data["bundesland"] = [bundesland_mapping[bundesland]] * len(schadstoff_data)
    schadstoff_data.index.name = "Date"
    schadstoff_data.reset_index(inplace=True)

    return schadstoff_data


if __name__ == "__main__":
    # Example usage
    station_info = get_all_stations()
    station_info = pd.DataFrame(station_info)
    # one station per state
    station_info = station_info.drop_duplicates(subset=["bundesland"])

    # get schadstoffe data for each station
    all_station_data = []

    for index, row in station_info.iterrows():
        station_pollutant_data = get_schadstoffe_data(row["bundesland"], row["id"], start_date="2024-01-01", end_date="2024-12-31")
        all_station_data.append(station_pollutant_data)

    all_station_data = pd.concat(all_station_data, ignore_index=True)

    # 16 bundesländer + unbekanntest bundesland for 366 days in 2024
    assert len(all_station_data) == 17*366

    # write to file
    all_station_data.to_json(
        f"./frontend/src/data/{TODAY}_air_quality_states_schadstoffe.json",
        orient="records",
    )
