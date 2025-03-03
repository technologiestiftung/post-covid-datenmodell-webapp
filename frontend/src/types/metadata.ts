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

export type filterParams = {
  start_date: string;
  end_date: string; // todo: Date format?
  location_plz: string; // string[];
  gender: string;
  age: string; // todo: possibly enum for categories?
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
  availability_age: boolean;
  availability_gender: boolean;
  availability_temporal: TemporalAvailability;
  availability_spatial: SpatialAvailability;
};
