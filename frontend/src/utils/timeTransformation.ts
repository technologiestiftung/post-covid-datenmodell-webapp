// util functions for date transformation

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(
    date.getTime() - userTimezoneOffset
  ).toISOString();
  return localISOTime.split("T")[0];
};

// Utility to add or subtract years from a date
export const addYears = (date: Date, years: number): Date => {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
};
