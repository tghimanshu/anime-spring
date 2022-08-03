import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeAddComponent } from './anime-add.component';

describe('AnimeAddComponent', () => {
  let component: AnimeAddComponent;
  let fixture: ComponentFixture<AnimeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
