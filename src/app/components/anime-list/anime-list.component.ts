import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Anime,
  AnimeServiceService,
} from 'src/app/service/anime-service.service';

/**
 * Component responsible for displaying a list of all animes.
 * It fetches the list of animes on initialization and provides functionality to delete them.
 */
@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  /** The list of animes to display. */
  animes!: Anime[];

  /**
   * Constructor for AnimeListComponent.
   *
   * @param animeService - The service for fetching and manipulating anime data.
   * @param router - The Angular Router (not used in this component, but injected).
   */
  constructor(
    private animeService: AnimeServiceService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook called after component initialization.
   * It fetches the list of animes from the service.
   */
  ngOnInit(): void {
    this.animeService.getAnimes().subscribe((data) => {
      this.animes = data;
    });
  }

  /**
   * Deletes an anime by its ID.
   * After successful deletion, it refreshes the list of animes.
   *
   * @param id - The unique identifier of the anime to delete.
   */
  deleteAnime(id: number) {
    this.animeService.deleteAnime(id).subscribe({
      next: (data: any) => {},
      complete: () => {
        this.animeService.getAnimes().subscribe((data) => {
          this.animes = data;
        });
      },
    });
  }
}
