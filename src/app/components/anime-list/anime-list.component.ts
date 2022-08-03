import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Anime,
  AnimeServiceService,
} from 'src/app/service/anime-service.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  animes!: Anime[];
  constructor(
    private animeService: AnimeServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animeService.getAnimes().subscribe((data) => {
      this.animes = data;
    });
  }

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
