import { makeAutoObservable } from "mobx";

type GenresType =  string[];
type RatingType = {
  min: string;
  max: string;
};

type YearType = {
  min: string;
  max: string;
};

class FiltersStore {
  genres: GenresType = [];
  rating: RatingType = {
    min: '',
    max: '',
  };
  year: YearType = {
    min: '',
    max: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  addOrRemoveGenres = (item: string) => {
    if(this.genres.includes(item)) {
      this.genres = this.genres.filter(g => g !== item);
    } else {
      this.genres = this.genres.concat(item);
    }
  }

  addMinRating = (item: string) => {
    this.rating.min = item;
  }

  addMaxRating = (item: string) => {
    this.rating.max = item;
  }

  get valueRating() {
    return this.rating.min + (this.rating.max && '-' + this.rating.max);
  }

  addMinYear = (item: string) => {
    this.year.min = item;
  }

  addMaxYear = (item: string) => {
    this.year.max = item;
  }

  removeFilters = () => {
    this.genres = [];
    this.rating = {
      min: '',
      max: ''
    };
    this.year = {
      min: '',
      max: ''
    };
  }

  get valueYear() {
    return this.year.min + (this.year.max && '-' + this.year.max);
  }
}

export default new FiltersStore;