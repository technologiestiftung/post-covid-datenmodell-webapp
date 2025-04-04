export enum Category {
  "Umwelt" = "Umwelt",
  "Gesellschaft" = "Gesellschaft",
  "Gesundheit" = "Gesundheit",
  "Demografie" = "Demografie",
}

export enum Attribute {
  "Zeitspanne" = "Zeitspanne",
  "Ort" = "Ort",
  "Alter" = "Alter",
  "Geschlecht" = "Geschlecht",
} // MII-Schlüsselattribute";

export enum LocationLevel {
  "states" = "states",
  "districts" = "districts",
  "germany" = "germany",
}

export type FilterParams = {
  startDate: string;
  endDate: string;
  locationStates: string[];
  locationDistricts: string[];
  age: string[];
};

// export enum filterMapping = {
//   "Ort" = "location_plz";
//   "Zeitspanne" =
// }

export type Contact = {
  name: string;
  address: string;
  email: string;
  phone_number: string;
};

export type SpatialAvailability = {
  country: string;
  bbox: string;
};

export type TemporalAvailability = {
  start_date: string;
  end_date: string;
  resolution: "hourly" | "daily" | "monthly" | "yearly";
};

export enum DataFormat {
  "csv" = "csv",
  "json" = "json",
}

export type AttributeMeta = {
  id: string;
  time_attribute: boolean;
  location_attribute: boolean;
  age_attribute: boolean;
  type: string;
  description: string;
};

export type MetaDataEntry = {
  id: string;
  title: string;
  description: string;
  source: string;
  license: string;
  category: Category;
  filter_attributes: string[];
  keywords: string[];
  contact: Contact;
  last_updated: string;
  data_formats: DataFormat[];
  // MII-Schlüsselattribute
  attributes: Attribute[];
  attributes_meta: AttributeMeta[];
  availability_age: boolean;
  availability_gender: boolean;
  availability_temporal: TemporalAvailability;
  availability_spatial: SpatialAvailability;
};
