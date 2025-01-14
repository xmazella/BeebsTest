export const fetchEvents = async (
  search: string = "",
  start: number = 0,
  date_start?: string,
  date_end?: string,
  tags?: (string | number)[],
  price_type?: (string | number)[],
  accessPMR?: (string | number)[],
  accessVisuallyImpaired?: (string | number)[]
) => {
  const params = new URLSearchParams({
    q: search,
    start: start.toString(),
  });

  if (date_start) params.append("refine.date_start", date_start);
  if (date_end) params.append("refine.date_end", date_end);
  if (tags && tags.length > 0)
    tags.forEach((tag) => params.append("refine.tags", tag.toString()));
  if (price_type && price_type.length > 0)
    params.append("refine.price_type", price_type[0].toString());
  if (accessPMR && accessPMR.length > 0)
    params.append("refine.pmr", accessPMR[0].toString());
  if (accessVisuallyImpaired && accessVisuallyImpaired.length > 0)
    params.append("refine.blind", accessVisuallyImpaired[0].toString());

  const response = await fetch(`/api/events?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const data = await response.json();
  return data;
};
