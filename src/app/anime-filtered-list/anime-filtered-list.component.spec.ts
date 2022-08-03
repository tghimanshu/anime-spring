import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeFilteredListComponent } from './anime-filtered-list.component';

describe('AnimeFilteredListComponent', () => {
  let component: AnimeFilteredListComponent;
  let fixture: ComponentFixture<AnimeFilteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeFilteredListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeFilteredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
