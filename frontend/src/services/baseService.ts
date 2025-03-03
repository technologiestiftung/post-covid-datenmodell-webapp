import { type filterParams } from "@/types/metadata";
import { type fetchedDataset } from "@/types/export";

// place for base service + type of it
interface BaseServiceType {
  // we take the defined filterParams and adjust them to the specific service
  transformFilterParams(filterParams: filterParams): any;
  // we use the adjusted filterParams to fetch the data -> the retun data is not yet defineable
  fetchData(transformedFilterParams: any): any;
  transformData(data: any): fetchedDataset;
}

abstract class BaseService implements BaseServiceType {
  abstract transformFilterParams(filterParams: filterParams): any;
  abstract fetchData(transformedFilterParams: any): any;
  abstract transformData(data: any): fetchedDataset;
}

export { BaseService };
