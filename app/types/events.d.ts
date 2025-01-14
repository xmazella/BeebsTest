type Events = Event[];

interface Event {
  recordid: string;
  fields: {
    title: string;
    cover_url: string;
    date_start: string;
    date_end: string;
    address_name: string;
    address_street: string;
    address_city: string;
    description: string;
    price_type: string;
    pmr: string;
    blind: string;
    tags: string;
  };
}
