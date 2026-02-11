export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
  });
};

export const formatDateRange = (
  startDate: string,
  endDate?: string,
): string => {
  console.log(endDate);
  const start = formatDate(startDate);
  const end =
    endDate && endDate !== "Presente" ? formatDate(endDate) : "Presente";
  return `${start} - ${end}`;
};
