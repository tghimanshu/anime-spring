import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Anime {
  desc: string;
  episodes: number;
  id: number;
  protagonist: string;
  title: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnimeServiceService {
  constructor(private http: HttpClient) {}

  getAnimes() {
    return this.http.get<Anime[]>('http://localhost:8080/api/animes');
  }

  getFilteredAnimes(
    pageInfo: {
      totalPages: number;
      currentPage: number;
      pageSize: number;
    },
    filters: {
      title: string;
      episodes: string;
      protagonist: string;
    }
  ) {
    let url = 'http://localhost:8080/api/animes/filtered?';
    pageInfo.currentPage ? (url += 'page=' + pageInfo.currentPage + '&') : null;
    pageInfo.pageSize ? (url += 'size=' + pageInfo.pageSize + '&') : null;
    filters.title && filters.title !== ''
      ? (url += 'title=' + filters.title + '&')
      : null;
    filters.episodes && filters.episodes.toString() !== ''
      ? (url += 'episodes=' + filters.episodes + '&')
      : null;
    filters.protagonist && filters.protagonist !== ''
      ? (url += 'protagonist=' + filters.protagonist + '&')
      : null;
    return this.http.get<{
      totalPages: number;
      body: Anime[];
      currentPage: number;
      pageSize: number;
    }>(url);
  }

  getSingleAnime(id: Number) {
    return this.http.get<Anime>(`http://localhost:8080/api/animes/${id}`);
  }

  saveAnime(anime: any) {
    return this.http.post('http://localhost:8080/api/animes', anime);
  }

  updateAnime(anime: any) {
    return this.http.put('http://localhost:8080/api/animes', anime);
  }

  deleteAnime(id: Number) {
    return this.http.delete(`http://localhost:8080/api/animes/${id}`);
  }
}
