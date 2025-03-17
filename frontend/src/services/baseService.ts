import { type FilterParams } from "@/types/metadata";
import { type fetchedDataset } from "@/types/export";

type ServiceError = {
  message: string;
  code?: string;
  status?: number;
};

interface BaseServiceType {
  transformFilterParams(filterParams: FilterParams): any;
  fetchData(transformedFilterParams: any): Promise<fetchedDataset>;
  onStateChange?: (loading: boolean) => void;
}

abstract class BaseService implements BaseServiceType {
  private loading = false;
  private error: ServiceError | null = null;
  onStateChange?: (loading: boolean) => void;

  private setLoading(value: boolean) {
    this.loading = value;
    this.onStateChange?.(value);
  }

  isLoading(): boolean {
    return this.loading;
  }

  getError(): ServiceError | null {
    return this.error;
  }

  abstract transformFilterParams(filterParams: FilterParams): any;

  async fetchData(transformedFilterParams: any): Promise<any> {
    this.setLoading(true);
    this.error = null;

    try {
      return await this.performFetch(transformedFilterParams);
    } catch (error) {
      const serviceError = this.handleError(error);
      this.error = serviceError;
      throw serviceError;
    } finally {
      this.setLoading(false);
    }
  }

  protected abstract performFetch(transformedFilterParams: any): Promise<any>;

  protected handleError(error: any): ServiceError {
    const serviceError: ServiceError = {
      message: error.message || "An unexpected error occurred",
      status: error.response?.status,
    };
    return serviceError;
  }

  protected transformData(jsonData: any[]): fetchedDataset {
    if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
      return { headers: [], rows: [] };
    }

    try {
      const firstRow = jsonData[0];
      if (!firstRow || typeof firstRow !== "object") {
        throw new Error("Invalid data format");
      }

      const headers = Object.keys(firstRow);
      return {
        headers: headers,
        rows: jsonData.filter((row) => row !== null && typeof row === "object"),
      };
    } catch (error) {
      return { headers: [], rows: [] };
    }
  }

  // set default for transforming the data -> allows custom overwriting in the services
  public getTransformedData(jsonData: any[]): fetchedDataset {
    return this.transformData(jsonData);
  }
}

export { BaseService, type ServiceError };
