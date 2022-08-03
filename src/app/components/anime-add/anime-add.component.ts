import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeServiceService } from 'src/app/service/anime-service.service';

@Component({
  selector: 'app-anime-add',
  templateUrl: './anime-add.component.html',
  styleUrls: ['./anime-add.component.css'],
})
export class AnimeAddComponent implements OnInit {
  id!: number;
  animeForm = this.fb.group({
    id: [0],
    title: [''],
    protagonist: [''],
    episodes: [0],
    desc: [''],
  });

  constructor(
    private fb: FormBuilder,
    private animeService: AnimeServiceService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    if (this.id) {
      this.animeService.getSingleAnime(this.id).subscribe((data) => {
        this.animeForm.setValue(data);
      });
    }
  }

  addAnime() {
    this.animeService.saveAnime(this.animeForm.value).subscribe({
      next: (data) => {},
      complete: () => {
        this.location.back();
      },
    });
  }

  updateAnime() {
    this.animeService.updateAnime(this.animeForm.value).subscribe({
      next: (data) => {},
      complete: () => {
        this.location.back();
      },
    });
  }
}
