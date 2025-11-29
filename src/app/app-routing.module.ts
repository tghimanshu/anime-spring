import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeFilteredListComponent } from './anime-filtered-list/anime-filtered-list.component';
import { AnimeAddComponent } from './components/anime-add/anime-add.component';
import { AnimeListComponent } from './components/anime-list/anime-list.component';

/**
 * Defines the routes for the application.
 */
const routes: Routes = [
  /** Route for the home page, displaying the list of animes. */
  { path: '', component: AnimeListComponent },
  /** Route for editing an existing anime by ID. */
  { path: 'add/:id', component: AnimeAddComponent },
  /** Route for adding a new anime. */
  { path: 'add', component: AnimeAddComponent },
  /** Route for editing an anime from the filtered list context. */
  { path: 'filtered/add/:id', component: AnimeAddComponent },
  /** Route for adding an anime from the filtered list context. */
  { path: 'filtered/add', component: AnimeAddComponent },
  /** Route for the filtered list view. */
  { path: 'filtered', component: AnimeFilteredListComponent },
];

/**
 * The routing module for the application.
 * It configures the router with the defined routes and exports it for use in the main module.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
