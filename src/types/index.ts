export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface FetchRespones<T> {
  count: number;
  results: T[];
}

export interface FetchPaginatedResponse<T> extends FetchRespones<T> {
  next: string;
  previous: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string | null;
  searchText: string;
}
