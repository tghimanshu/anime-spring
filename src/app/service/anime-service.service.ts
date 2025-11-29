import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Interface representing the structure of an Anime object.
 */
export interface Anime {
  /** A brief description of the anime. */
  desc: string;
  /** The total number of episodes in the anime. */
  episodes: number;
  /** The unique identifier for the anime. */
  id: number;
  /** The name of the main protagonist. */
  protagonist: string;
  /** The title of the anime. */
  title: string;
}

/**
 * Service responsible for handling HTTP requests related to Anime data.
 * It communicates with the backend API to perform CRUD operations and filtering.
 */
@Injectable({
  providedIn: 'root',
})
export class AnimeServiceService {
  /**
   * Constructor for AnimeServiceService.
   *
   * @param http - The HttpClient used to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of all animes from the backend.
   *
   * @returns An Observable that emits an array of Anime objects.
   */
  getAnimes() {
    return this.http.get<Anime[]>('http://localhost:8080/api/animes');
  }

  /**
   * Retrieves a filtered and paginated list of animes based on provided criteria.
   *
   * @param pageInfo - An object containing pagination information.
   * @param pageInfo.totalPages - The total number of pages (not typically sent in request, but part of the structure).
   * @param pageInfo.currentPage - The current page number to retrieve.
   * @param pageInfo.pageSize - The number of items per page.
   * @param filters - An object containing filter criteria.
   * @param filters.title - The title to filter by.
   * @param filters.episodes - The number of episodes to filter by.
   * @param filters.protagonist - The protagonist name to filter by.
   * @returns An Observable that emits an object containing the list of animes and pagination details.
   */
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

  /**
   * Retrieves a single anime by its ID.
   *
   * @param id - The unique identifier of the anime to retrieve.
   * @returns An Observable that emits the requested Anime object.
   */
  getSingleAnime(id: Number) {
    return this.http.get<Anime>(`http://localhost:8080/api/animes/${id}`);
  }

  /**
   * Saves a new anime to the backend.
   *
   * @param anime - The anime object to save.
   * @returns An Observable that completes when the operation is finished.
   */
  saveAnime(anime: any) {
    return this.http.post('http://localhost:8080/api/animes', anime);
  }

  /**
   * Updates an existing anime in the backend.
   *
   * @param anime - The anime object with updated information.
   * @returns An Observable that completes when the operation is finished.
   */
  updateAnime(anime: any) {
    return this.http.put('http://localhost:8080/api/animes', anime);
  }

  /**
   * Deletes an anime from the backend by its ID.
   *
   * @param id - The unique identifier of the anime to delete.
   * @returns An Observable that completes when the operation is finished.
   */
  deleteAnime(id: Number) {
    return this.http.delete(`http://localhost:8080/api/animes/${id}`);
  }
}
