export interface Icity {
  id: string;
  name: string;
  coord: {lat: number; lon: number};
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  isSearched: boolean;
}
