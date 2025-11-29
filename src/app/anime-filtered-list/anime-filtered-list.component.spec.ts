import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimeFilteredListComponent } from './anime-filtered-list.component';
import { AnimeServiceService } from '../service/anime-service.service';

describe('AnimeFilteredListComponent', () => {
  let component: AnimeFilteredListComponent;
  let fixture: ComponentFixture<AnimeFilteredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeFilteredListComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [AnimeServiceService]
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
