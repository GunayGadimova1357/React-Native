export type ShowDay = {
  id: string;
  day: string;
  date: string;
  month: string;
};

export type Cinema = {
  id: string;
  name: string;
  location: string;
  distance: string;
  times: string[];
  lat: number;
  lng: number;
};

export const showDays: ShowDay[] = [
  { id: "1", day: "MON", date: "9", month: "FEB" },
  { id: "2", day: "TUE", date: "10", month: "FEB" },
  { id: "3", day: "WED", date: "11", month: "FEB" },
  { id: "4", day: "THU", date: "12", month: "FEB" },
  { id: "5", day: "FRI", date: "13", month: "FEB" },
  { id: "6", day: "SAT", date: "14", month: "FEB" },
];

export const cinemas: Cinema[] = [
  {
    id: "1",
    name: "Cineplex Downtown",
    location: "City Center",
    distance: "2.1 km",
    times: ["10:30 AM", "1:45 PM", "4:15 PM", "7:30 PM", "10:45 PM"],
    lat: 40.3724,
    lng: 49.8533,
  },
  {
    id: "2",
    name: "Cineplex Westside",
    location: "West Mall",
    distance: "4.5 km",
    times: ["11:00 AM", "2:30 PM", "5:45 PM", "8:00 PM"],
    lat: 40.4093,
    lng: 49.8671,
  },
  {
    id: "3",
    name: "Cineplex Riverside",
    location: "River Park",
    distance: "6.2 km",
    times: ["12:00 PM", "3:15 PM", "6:40 PM", "9:30 PM"],
    lat: 40.3951,
    lng: 49.8826,
  },
];
