import axios from 'axios';
import { IResultItem } from '../features/searchSlice';

interface SearchResponse {
  artistName: string;
  trackId: string;
  trackName: string;
  imageUrl: string;
  trackPrice: number;
  currency: string;
  artworkUrl100: string;
}

class SearchService {
  private baseApi = 'https://itunes.apple.com';
  getItems = async (term: string, offset = 0, limit = 10) => {
    return axios
      .get(
        `${this.baseApi}/search?term=${term}&entity=musicVideo&offset=${offset}&limit=${limit}`
      )
      .then((response) => {
        const result: IResultItem[] = response.data.results.map(
          (item: SearchResponse) => ({
            trackImageUrl: item.artworkUrl100,
            artistName: item.artistName,
            trackId: item.trackId,
            trackName: item.trackName,
            trackPrice: item.trackPrice,
            currency: item.currency,
          })
        );
        return result;
      });
  };
}

export default new SearchService();
