import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ArtDataProps {
  data: ArtProps[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}
export interface ArtProps {
  artist_id: number;
  artist_title: string;
  artist_display: string;
  artwork_type_title: string;
  thumbnail: {
    lqip: string;
    alt_text: string;
  };
  image_id: string;
  description: string;
  exhibition_history: string;
  provenance_text: string;
}

const fieldsToFetchParams =
  "fields=artist_id,title,artist_title,artist_display,artwork_type_title,thumbnail,image_id,description,exhibition_history,provenance_text";

const fetchData = async (page: number): Promise<ArtDataProps> => {
  const response = await axios.get(
    `https://api.artic.edu/api/v1/artworks?page=${page}&limit=20&${fieldsToFetchParams}`
  );
  return response.data;
};

export function useGetArtCollection(page: number) {
    return useQuery({
      queryKey: ["get-art-collection", page],
      queryFn: () => fetchData(page),
      meta: {
        keepPreviousData: true,
      },
      gcTime: 0,
    });
}
