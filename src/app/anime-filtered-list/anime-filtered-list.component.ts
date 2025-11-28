import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Anime,
  AnimeServiceService,
} from 'src/app/service/anime-service.service';

/**
 * Component responsible for displaying a filtered and paginated list of animes.
 * It provides functionality to filter the list by title, episodes, and protagonist,
 * as well as to delete animes and handle pagination.
 */
@Component({
  selector: 'app-anime-filtered-list',
  templateUrl: './anime-filtered-list.component.html',
  styleUrls: ['./anime-filtered-list.component.css'],
})
export class AnimeFilteredListComponent implements OnInit {
  /** The list of animes currently displayed. */
  animes!: Anime[];
  /** Object holding pagination information. */
  pageInfo!: { totalPages: number; currentPage: number; pageSize: number };
  /** The form group for filter criteria. */
  filterForm = this.fb.group({
    title: [''],
    episodes: [''],
    protagonist: [''],
  });

  /**
   * Constructor for AnimeFilteredListComponent.
   *
   * @param animeService - The service for fetching and manipulating anime data.
   * @param router - The Angular Router for navigation.
   * @param route - The ActivatedRoute to access current route parameters.
   * @param fb - The FormBuilder for creating the filter form.
   */
  constructor(
    private animeService: AnimeServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * It subscribes to route query parameters to initialize pagination and filters,
   * and fetches the initial list of animes.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.pageInfo = {
        totalPages: 2,
        currentPage: params['page'] ? +params['page'] : 0,
        pageSize: params['size'] ? +params['size'] : 5,
      };
      let filterItems = {
        title: params['title'] ? +params['title'] : '',
        episodes: params['episodes'] ? +params['episodes'] : '',
        protagonist: params['protagonist'] ? +params['protagonist'] : '',
      };
      this.filterForm.setValue({
        title: filterItems.title.toString(),
        episodes: filterItems.episodes.toString(),
        protagonist: filterItems.protagonist.toString(),
      });
      this.animeService
        .getFilteredAnimes(
          this.pageInfo,
          this.filterForm.value as {
            title: string;
            episodes: string;
            protagonist: string;
          }
        )
        .subscribe({
          next: (data) => {
            this.pageInfo = {
              totalPages: data.totalPages,
              currentPage: data.currentPage,
              pageSize: data.pageSize,
            };
            this.animes = data.body;
          },

          error: (error) => {
            this.animes = [];
            this.router.navigate([]);
          },
        });
    });
  }

  /**
   * Deletes an anime by its ID.
   * After deletion, it refreshes the list of animes.
   *
   * @param id - The ID of the anime to delete.
   */
  deleteAnime(id: number) {
    this.animeService.deleteAnime(id).subscribe({
      complete: () => {
        this.animeService
          .getFilteredAnimes(
            this.pageInfo,
            this.filterForm.value as {
              title: string;
              episodes: string;
              protagonist: string;
            }
          )
          .subscribe((data) => {
            this.animes = data.body;
          });
      },
    });
  }

  /**
   * Filters the anime list based on the values in the filter form.
   * It resets the page to 0.
   */
  filterAnime() {
    this.animeService
      .getFilteredAnimes(
        {
          totalPages: 1,
          currentPage: 0,
          pageSize: this.pageInfo.pageSize,
        },
        this.filterForm.value as {
          title: string;
          episodes: string;
          protagonist: string;
        }
      )
      .subscribe({
        next: (data) => {
          this.pageInfo = {
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            pageSize: data.pageSize,
          };
          this.animes = data.body;
        },
        error: (error) => {
          this.animes = [];
          this.router.navigate([]);
        },
      });
  }

  /**
   * Refreshes the anime list when the page size is updated.
   * Uses the current page info and filter form values.
   */
  updatePageSize() {
    this.animeService
      .getFilteredAnimes(
        this.pageInfo,
        this.filterForm.value as {
          title: string;
          episodes: string;
          protagonist: string;
        }
      )
      .subscribe({
        next: (data) => {
          this.pageInfo = {
            totalPages: data.totalPages,
            currentPage: data.currentPage,
            pageSize: data.pageSize,
          };
          this.animes = data.body;
        },

        error: (error) => {
          this.animes = [];
          this.router.navigate([]);
        },
      });
  }
}
