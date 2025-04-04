export interface FhirBundle {
  resourceType: string;      
  type?: string;             
  entry?: FhirEntry[];
  [key: string]: any;
}

export interface FhirEntry {
  fullUrl?: string;
  resource: FhirResource;
  [key: string]: any;
}

export interface FhirResource {
  resourceType: string;
  [key: string]: any;
}

export interface ParsedMiiData {
  patients: any[];
  encounters: any[];
  conditions: any[];
  procedures: any[];
  medicationStatements: any[];
}