
import { type FhirBundle, type FhirEntry, type FhirResource, type ParsedMiiData } from '../types/mii';

export function parseMiiData(jsonString: string): ParsedMiiData {
  let bundle: FhirBundle;

  // 1) Parse raw JSON
  try {
    bundle = JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Invalides JSON: die Datei konnte nicht gelesen werden.");
  }

  // 2) Basic structural validation
  if (bundle.resourceType !== "Bundle") {
    throw new Error('Der "resourceType" muss "Bundle" sein.');
  }
  if (!Array.isArray(bundle.entry)) {
    throw new Error('Der Schlüssel "entry" sollte enthalten sein.');
  }

  // 3) Prepare result object
  const result: ParsedMiiData = {
    patients: [],
    encounters: [],
    conditions: [],
    procedures: [],
    medicationStatements: []
  };

  // 4) Walk through each entry and group by resourceType
  for (const entry of bundle.entry) {
    if (!entry.resource || !entry.resource.resourceType) {
      continue;
    }

    const { resourceType } = entry.resource;

    switch (resourceType) {
      case "Patient":
        result.patients.push(entry.resource);
        break;
      case "Encounter":
        result.encounters.push(entry.resource);
        break;
      case "Condition":
        result.conditions.push(entry.resource);
        break;
      case "Procedure":
        result.procedures.push(entry.resource);
        break;
      case "MedicationStatement":
        result.medicationStatements.push(entry.resource);
        break;
      default:
        break;
    }
  }

  return result;
}