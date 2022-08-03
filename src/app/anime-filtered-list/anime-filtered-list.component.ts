import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Anime,
  AnimeServiceService,
} from 'src/app/service/anime-service.service';

@Component({
  selector: 'app-anime-filtered-list',
  templateUrl: './anime-filtered-list.component.html',
  styleUrls: ['./anime-filtered-list.component.css'],
})
export class AnimeFilteredListComponent implements OnInit {
  animes!: Anime[];
  pageInfo!: { totalPages: number; currentPage: number; pageSize: number };
  filterForm = this.fb.group({
    title: [''],
    episodes: [''],
    protagonist: [''],
  });

  constructor(
    private animeService: AnimeServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

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
