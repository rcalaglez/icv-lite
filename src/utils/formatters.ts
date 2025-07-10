export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });
};

export const formatDateRange = (
  startDate: string,
  endDate?: string
): string => {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Presente";
  return `${start} - ${end}`;
};
