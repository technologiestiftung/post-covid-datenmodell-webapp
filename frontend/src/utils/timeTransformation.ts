// util functions for date transformation

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(
    date.getTime() - userTimezoneOffset
  ).toISOString();
  return localISOTime.split("T")[0];
};
