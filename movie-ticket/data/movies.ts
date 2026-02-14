export type Movie = {
  id: string;
  title: string;
  image: string;
  rating?: number;
  genre?: string;
  duration?: string;
  year?: number;
  age?: string;
  synopsis?: string;
  releaseDate?: string;
};
export const nowShowing: Movie[] = [
  {
    id: "1",
    title: "Dark Universe",
    rating: 8.5,
    genre: "Sci-Fi · Action",
    duration: "2h 28m",
    year: 2026,
    age: "13+",
    image: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
    synopsis:
      "An epic journey through the cosmos where humanity’s last hope rests on a team of unlikely heroes. As dark forces threaten to consume the universe, they must unite to uncover an ancient power.",
  },
  {
    id: "2",
    title: "Shadow Protocol",
    rating: 9.1,
    genre: "Thriller · Mystery",
    duration: "2h 15m",
    year: 2025,
    age: "16+",
    image: "https://image.tmdb.org/t/p/w500/8uVKfOJUhmybNsVh089EqLHUYEG.jpg",
    synopsis:
      "A covert intelligence operation spirals out of control when a rogue agent uncovers a conspiracy that reaches the highest levels of global power.",
  },
  {
    id: "3",
    title: "Neon Skies",
    rating: 8.2,
    genre: "Sci-Fi · Drama",
    duration: "2h 05m",
    year: 2025,
    age: "12+",
    image: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    synopsis:
      "In a futuristic city illuminated by neon lights, a young hacker discovers a secret that could change society forever.",
  },
  {
    id: "6",
    title: "Iron Dawn",
    rating: 8.7,
    genre: "Action · Sci-Fi",
    duration: "2h 12m",
    year: 2026,
    age: "13+",
    image: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg",
    synopsis:
      "After a global blackout, a former engineer uncovers a militarized AI system preparing to seize control of the world.",
  },
];

export const comingSoon: Movie[] = [
  {
    id: "4",
    title: "Last Horizon",
    genre: "Adventure · Sci-Fi",
    duration: "2h 32m",
    year: 2026,
    age: "13+",
    releaseDate: "2026-03-21",
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    synopsis:
      "A deep-space expedition ventures beyond known galaxies, only to discover a threat that challenges humanity’s place in the universe.",
  },
  {
    id: "5",
    title: "Echoes of Tomorrow",
    genre: "Drama · Romance",
    duration: "1h 58m",
    year: 2026,
    age: "12+",
    releaseDate: "2026-04-12",
    image: "https://image.tmdb.org/t/p/w500/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
    synopsis:
      "Two strangers connected by time discover that love can transcend both space and fate.",
  },
  {
    id: "8",
    title: "Crimson Signal",
    genre: "Sci-Fi · Thriller",
    duration: "2h 10m",
    year: 2026,
    age: "16+",
    releaseDate: "2026-05-03",
    image: "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    synopsis:
      "A mysterious signal from space sends Earth into chaos as scientists race to understand whether it is a warning—or an invasion.",
  },
  {
    id: "9",
    title: "Silent Orbit",
    genre: "Sci-Fi · Mystery",
    duration: "2h 06m",
    year: 2026,
    age: "13+",
    releaseDate: "2026-06-18",
    image: "https://image.tmdb.org/t/p/w500/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
    synopsis:
      "When a space station suddenly goes silent, a rescue crew uncovers a truth that was never meant to return to Earth.",
  },
];
