## Post-COVID Phase III

## Über das Projekt

Das Post-COVID-Datenmodell ist eine Webanwendung, die es Forschenden ermöglicht, offene und medizinische Daten einfach zu verknüpfen und auszuwerten. Ziel ist es, mit Hilfe von offenen Daten und Daten der Medizininformatik-Initiative (MII-Daten) innovative Fragestellungen zur Post-COVID-Forschung zu beantworten.

## Benutzte Datenquellen und MII-Daten Matching

Für das Projekt wurden mehrere (öffentliche) Datensätze benutzt. Weitere Informationen zu den Datensätzen finden Sie unter unter [Metadata](../data/2025-02-18_metadata.json).

Ausgewählte Daten lassen sich nach Zeit, Standort und Altersgruppen filtern.

Zu den Datensätzen gibt es ausgewählte Use-Cases, bei denen sich MII-Daten mit den zum Export hinzugefügten Daten verknüpfen lassen. So können beispielsweise für Patient:innen das nächstgelegene POST-Covid Reha Angebot gefunden werden. Der Standort der Patient:innen wir durch die Postleitzahl erfasst. Auf Basis von hochgeladenen MII-Daten lassen sich auch relevante Filter extrahieren.

| Datensatz                                 | Kurzbeschreibung                                                                                                                                                                                                                                                                                                                                                                                                                         | Mögliche Filterung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Link                                                                          | MII-Daten-Matching                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Luftdaten (Umweltbundesamt)               | Die API des Umwelt Bundesamtest gibt für verschiedene Stationen in Deutschland Luftdaten an. Die API ist momentan noch nicht in dem Projekt enthalten. Alternativ wird eine Datei für Standorte in jedem Bundesland für das Jahr bereitgestellt. Die Datei beinhaltet durschnittliche Tages-Werte für z.B. Feinstaub oder Stickstoffdioxid. Die Datei ist unter [data](..data/2025-03-31_air_quality_states_schadstoffe.json) verfügbar. | Momentan ist noch keine Filterung implementiert. Der Datensatz enthält Angaben zu Standort und Datum.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | https://www.umweltbundesamt.de/daten/luft/luftdaten/doc                       | Momentan ist noch kein MII-Daten-Matching verfügbar                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Wetterdaten (Bright Sky)                  | Die API für Wetterdaten sellt die Daten des Deutschen Wetter Dienstes bereit. Das Wetter (Eigenschaften wie Niederschlag, Sonnenstunden, Temperatur) können mit einem Standort (Breitengrad, Längengrad) stündlich abgefragt werden.                                                                                                                                                                                                     | Die Wetterdaten können nach Standort (Breitengrad, Längengrad) und Zeit gefiltert werden. Bei Filterung "bundesweit" wird für jedes Bundesland ein Standort gewählt, der mittig liegt. Wenn Kreise ausgewählt sind wird für jeden Kreis der mittlere Punkt gewählt.                                                                                                                                                                                                                                                                                                                                                                   | https://brightsky.dev/                                                        | Use Case: Wetterdaten am Wohnort der Patient:innen: Für das Matching mit den MII-Daten wird in den exportierten Daten für jeden Patienten/jede Patientin die nächstgelegene Station in den ausgewählten Bundesländern/Kreisen gesucht.                                                                                                                                                                                                                                                |
| Abwasserdaten (Viruslast im Wasser) - RKI | Die Daten stammen aus dem Projekt Abwassersurveillance AMELAG vom RKI und enthält Daten von Abwasser-Stationen in Deutschland. Der Datensatz wird während der Projektlaufzeit von AMELAG wöchentlich aktualisiert und ist über GitHub zugänglich. Auf Nachfrage bei dem RKI wurden auch die Standorte der Stationen angegeben um ein besseres Matching von Patient:innen auf die relevante Station zu garantieren.                       | Die Abwasserdaten lassen sich nach Zeit und Standort filtern. Die zeitliche Angabe beschränkt aus welchem Zeitraum die Daten zurückgegeben werden sollen. Bei der Filterung nach Standort kann auf die Liste der Standorte der Kläranlagen zurückgegriffen werden. Diese enthalten das Bundesland der Anlage. Für den Filter "bundesweit" werden alle Kläranlagen zurückgegeben. Bei der Filterung nach Kreisen werden die relevanten Bundesländer gesucht und dann,g genauso wie bei der Filterung nach Bundesländern, die relevanten Kläranlagen zurückgegeben.                                                                     | https://github.com/robert-koch-institut/Abwassersurveillance_AMELAG/tree/main | Use Case: Abwassersurveillance AMELAG am Wohnort der Patient:inne: Für das Matching mit den MII-Daten wird in den expotierten Daten für jeden Patienten/jede Patientin die nächstgelegene Station gesucht. Dabei kann nicht direkt von Kreis auf Standort der Abwassersurveillance gemapped werden. Es werden daher (wenn Kreise ausgewählt) die relevanten Bundesländer identifiziert und die Standorte in diesen Bundesländern für die Suche der nächstgelegenen Standorte benutzt. |
| POST-Covid Ambulanzen / Kliniken          | Die Daten für POST-Covid Ambulanzen stammen von der BMG Initiative Long Covid. Die Daten aus der dort aufgelisteten Tabelle wurden zuletzt am 02.12.2024 abgefragt und befinden sich in der Datei data/raw/2022-12-02_post_covid_ambulanzen_kliniken.json                                                                                                                                                                                | Die POST-Covid Ambulanzen / Kliniken können nach Standort gefiltert werden. Dabei haben die Kliniken angaben zu ihren Postleitzahlen. Wenn "bundesweit" angegeben wird, werden alle Standorte zurückgegeben. Bei Filterung nach Bundesländern / Kreise werden erst die relevanten Postleitzahlen gesammelt und dann die Kliniken zurückgegeben, die in den relevanten Postleitzahlen liegen.                                                                                                                                                                                                                                          | https://www.bmg-longcovid.de/service/buergertelefon-und-regionale-kliniksuche | Momentan ist noch kein MII-Daten-Matching verfügbar                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| POST-Covid Reha Angebote                  | Die Daten für POST-Covid Reha Angebote stammen von der Bundesarbeitsgemeinschaft für Rehabilitation (BAR). In der Suche wurden alle Reha Angebote gezogen die mit der Auswahl 'Rehabilitation bei Long/Post COVID' zu finden sind. Dabei sind stationäre und ambulante Reha Angebote enthalten.                                                                                                                                          | Die Reha-Angebote können nach Standort gefiltert werden. Die Reha-Standorte enthalten Informationen zu Breitengrad, Längengrad. Für "bundesweit" werden alle Reha Angebote zurückgegeben. Wenn Bundesländer oder Kreise ausgewählt sind wird die nächstgelegene Reha gesucht, indem Breitengrad, Längengrad der jeweiligen Auswahl benutzt wird.                                                                                                                                                                                                                                                                                      | https://www.reha-einrichtungsverzeichnis.de/index.html                        | Use Case: POST-Covid Rehaeinrichtungen am Wohnort der Patient:innen: Für das Matching mit den MII-Daten wird in den exportierten Daten für jeden Patienten/ jede Patientin die nächstgelegene Rehaeinrichtung gesucht. Dabei kann Breitengrad und Längengrad der Rehaeinrichtung berücksichtigt werden um die möglichst nahe Einrichtung in den ausgewählten Bundesländern/Kreisen (oder bundesweit) zu finden.                                                                       |
| SARS-CoV-2-Infektionen in Deutschland     | Der Datensatz stammt vom RKI und enthält 'umfassende Informationen zu SARS-CoV-2-Infektionen in Deutschland, die gemäß dem Infektionsschutzgesetze (IfSG) von den Gesundheitsämtern an das Robert Koch-Institut (RKI) gemeldet wurden.' - GitHub Beschreibung des RKIs                                                                                                                                                                   | Die Daten zu SARS-CoV-2-Infektionen in Deutschland können nach Zeit, Standort und Altersgruppe gefiltert werden. Die zeitliche Angabe beschränkt aus welchem Zeitraum die Daten zurückgegeben werden sollen. Die Filterung nach Standort kann auf Bundesland-Ebene erfolgen. Wird "bundesweit" auswgewählt, werden alle Standorte zurückgegeben. Bei der Auswahl von Kreisen werden die relevanten Bundesländer ausgewählt und zurückgegeben, genauso wie bei der Auswahl von Bundesländern. Der Datensatz lässt sich auch nach Altersgruppen filtern. Dabei werden die im Datensatz vorgegebenen Altersgruppe, z.B. "15-34" benutzt. | https://github.com/robert-koch-institut/SARS-CoV-2-Infektionen_in_Deutschland | Momentan ist noch kein MII-Daten-Matching verfügbar                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Tabelle 1: Übersicht der benutzten Datenquellen und MII-Daten Matching

## Starten des Projektes

Die Applikation wurde mit Vue.js und TypeScript entwickelt. Um das Projekt zu starten, führen Sie folgende Befehle aus.

Um die Abhängigkeiten zu installieren, führen Sie den folgenden Befehl aus:

```bash
cd frontend
npm install
```

Um die Applikation (das Frontend) zu starten:

```bash
npm run dev
```

Um das Frontend zu bauen:

```bash
npm run build
```

### Contributors ✨

Thanks goes to these wonderful people (![emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bauerfriederike"><img src="https://avatars.githubusercontent.com/u/141726622?v=4?s=100" width="100px;" alt="bauerfriederike"/><br /><sub><b>bauerfriederike</b></sub></a><br /><a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/commits?author=bauerfriederike" title="Code">💻</a> <a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/commits?author=bauerfriederike" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/aebikash"><img src="https://avatars.githubusercontent.com/u/150939209?v=4" width="100px;" alt="aebikash"/><br /><sub><b>Bikash Karmokar</b></sub></a><br /><a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/commits?author=aebikash" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ckeuss"><img src="https://avatars.githubusercontent.com/u/147528104?v=4?s=100" width="100px;" alt="ckeuss"/><br /><sub><b>ckeuss</b></sub></a><br /><a href="https://github.com/technologiestiftung/post-covid-datenmodell/commits?author=ckeuss" title="Documentation">📖</a> <a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/pulls?q=is%3Apr+reviewed-by%3Ackeuss" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/m-b-e"><img src="https://avatars.githubusercontent.com/u/36029603?v=4?s=100" width="100px;" alt="Max B. Eckert"/><br /><sub><b>Max B. Eckert</b></sub></a><br /><a href="#projectManagement-m-b-e" title="Project Management">📆</a> <a href="https://github.com/technologiestiftung/post-covid-datenmodell/commits?author=m-b-e" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lisa-Stubert"><img src="https://avatars.githubusercontent.com/u/61182572?v=4?s=100" width="100px;" alt="Lisa Stubert"/><br /><sub><b>Lisa Stubert</b></sub></a><br /><a href="#projectManagement-Lisa-Stubert" title="Project Management">📆</a> <a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/commits?author=Lisa-Stubert" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jjmllr"><img src="https://avatars.githubusercontent.com/u/68501961?v=4?s=100" width="100px;" alt="jjmllr"/><br /><sub><b>jjmllr</b></sub></a><br /><a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/commits?author=jjmllr" title="Code">💻</a> <a href="https://github.com/technologiestiftung/post-covid-datenmodell-webapp/commits?author=jjmllr" title="Documentation">📖</a> <a href="#projectManagement-jjmllr" title="Project Management">📆</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

### Credits

<table>
  <tr>
    <td>
      <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg" />
      </a>
    </td>
    <td>
      In Zusammenarbeit mit: <a href="https://www.bihealth.org/en/">
        <br />
        <br />
        <img width="200" src="https://www.bihealth.org/_assets/6cb4206c3a065969362f190803612019/Frontend/Build/assets/images/bih-logo.svg" />
      </a>
    </td>
    <td>
      und: <a href="https://www.and-effect.com/de/">
        <br />
        <br />
        <img width="200" src="https://www.it-ausschreibung.de/storage/logos/logo_effect_14925.png" />
      </a>
    </td>
    <td>
      Im Auftrag des: <a href="https://www.bmi.bund.de/DE/startseite/startseite-node.html">
        <br />
        <br />
        <img width="150" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/BMI_Logo.svg/320px-BMI_Logo.svg.png" />
      </a>
    </td>
  </tr>
</table>