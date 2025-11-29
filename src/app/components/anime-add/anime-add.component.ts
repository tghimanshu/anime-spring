import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeServiceService } from 'src/app/service/anime-service.service';

/**
 * Component responsible for adding or updating an anime.
 * It provides a form to input anime details. If an ID is present in the route,
 * it loads the existing anime data for editing.
 */
@Component({
  selector: 'app-anime-add',
  templateUrl: './anime-add.component.html',
  styleUrls: ['./anime-add.component.css'],
})
export class AnimeAddComponent implements OnInit {
  /** The ID of the anime being edited, if any. */
  id!: number;
  /** The form group for anime details. */
  animeForm = this.fb.group({
    id: [0],
    title: [''],
    protagonist: [''],
    episodes: [0],
    desc: [''],
  });

  /**
   * Constructor for AnimeAddComponent.
   *
   * @param fb - The FormBuilder for creating the anime form.
   * @param animeService - The service for interacting with the anime API.
   * @param location - The Location service to navigate back in history.
   * @param route - The ActivatedRoute to access route parameters.
   */
  constructor(
    private fb: FormBuilder,
    private animeService: AnimeServiceService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * It checks for an 'id' parameter in the route. If found, it fetches the anime details
   * and populates the form for editing.
   */
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

  /**
   * Submits the new anime data to the backend.
   * Navigates back to the previous location upon completion.
   */
  addAnime() {
    this.animeService.saveAnime(this.animeForm.value).subscribe({
      next: (data) => {},
      complete: () => {
        this.location.back();
      },
    });
  }

  /**
   * Updates the existing anime data in the backend.
   * Navigates back to the previous location upon completion.
   */
  updateAnime() {
    this.animeService.updateAnime(this.animeForm.value).subscribe({
      next: (data) => {},
      complete: () => {
        this.location.back();
      },
    });
  }
}
