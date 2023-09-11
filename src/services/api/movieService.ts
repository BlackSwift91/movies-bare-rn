import axios from 'axios';
import {API, baseUrl} from '../../constants';

class MovieService {
  async getAllMovies(token: string) {
    const config = {
      method: 'get',
      url: `${baseUrl}${API}movies?sort=title&order=ASC&limit=10&offset=0`,
      headers: {
        Authorization: token,
      },
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }

  async deleteMovie(id: number, token: string) {
    const config = {
      method: 'delete',
      url: `${baseUrl}${API}movies/${id}`,
      headers: {
        Authorization: token,
      },
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }

  async addMovie(
    title: string,
    year: string,
    format: string,
    actors: {name: string; id: string}[],
    token: string,
  ) {
    const actorsArray = actors.map(it => it.name);

    const data = JSON.stringify({
      title,
      year: Number(year),
      format,
      actors: actorsArray,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}${API}movies`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }

  async getMovieById(id: number, token: string) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}${API}movies/${id}`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }

  async searchMovie(
    searchText: string,
    searchType: 'title' | 'actor' | 'search',
    token: string,
  ) {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${baseUrl}${API}movies?${searchType}=${searchText}&sort=year&order=DESC&limit=10&offset=0`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }

  async importMovies(token: string) {
    const data = new FormData();
    // data.append();

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}${API}movies/import`,
      headers: {
        Authorization: token,
      },
      data: data,
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }
}

export const movieService = new MovieService();
