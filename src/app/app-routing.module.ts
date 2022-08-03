import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeFilteredListComponent } from './anime-filtered-list/anime-filtered-list.component';
import { AnimeAddComponent } from './components/anime-add/anime-add.component';
import { AnimeListComponent } from './components/anime-list/anime-list.component';

const routes: Routes = [
  { path: '', component: AnimeListComponent },
  { path: 'add/:id', component: AnimeAddComponent },
  { path: 'add', component: AnimeAddComponent },
  { path: 'filtered/add/:id', component: AnimeAddComponent },
  { path: 'filtered/add', component: AnimeAddComponent },
  { path: 'filtered', component: AnimeFilteredListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
