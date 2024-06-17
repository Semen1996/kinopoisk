import axios from 'axios';

interface IGenre {
  name: string;
}

export interface IGetMoviesResMovie {
  id: number;
  name: string;
  year: number;
  rating: {
    kp: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
     await?: number;
  };
  poster?: {
    url: string;
    previewUrl: string;
  };
  genres: IGenre[]
}

interface IGetMoviesRes {
  docs: IGetMoviesResMovie[];
}

const API_URL = 'https://api.kinopoisk.dev/v1.4';

const axiosKinoPoisk = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': '1JEMCED-V37MW3C-GTKWCK4-79TEYM4'
  },
  timeout: 5000,
});

export async function getMoviesReq({page, genres, rating, year}: {page: number, genres: string[], rating: string, year: string} ) {
  try{
    const ratingReq = rating ? [rating] : [];
    const yearReq = year ? [year] : [];
    const { data: { docs } } = await axiosKinoPoisk.get<IGetMoviesRes>(`/movie`, {
      params: {
        page,
        limit: 50,
        selectFields: ['id', 'name', 'year', 'rating', 'poster', 'genres'],
        "genres.name": genres,
        "rating.kp": ratingReq,
        year: yearReq,
      },
      paramsSerializer: {
        indexes: null,
      }
    });
    return docs;
  } catch(error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data, 'error')
    } else if(error instanceof Error) {
      console.log(error.message);
    }
  }
}

export async function getFavouritesReq({id}: {id: string[]} ) {
  try{
    const { data: { docs } } = await axiosKinoPoisk.get<IGetMoviesRes>(`/movie`, {
      params: {
        selectFields: ['id', 'name', 'year', 'rating', 'poster', 'genres'],
        id
      },
      paramsSerializer: {
        indexes: null,
      }
    });
    return docs;
  } catch(error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data, 'error')
    } else if(error instanceof Error) {
      console.log(error.message);
    }
  }
}


export async function getMovieReq({id}: {id: number} ) {
  try{
    const { data } = await axiosKinoPoisk.get(`/movie/${id}`);
    return {
      title: data.name,
      img: data.poster ? data.poster.url : '',
      description: data.description,
      rating: data.rating.kp,
      year: data.year,
      genres: data.genres,
    }
  } catch(error) {
    if(axios.isAxiosError(error)) {
      console.log(error.response?.data, 'error')
    } else if(error instanceof Error) {
      console.log(error.message);
    }
  }
}