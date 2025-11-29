import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimeListComponent } from './anime-list.component';
import { AnimeServiceService } from 'src/app/service/anime-service.service';

describe('AnimeListComponent', () => {
  let component: AnimeListComponent;
  let fixture: ComponentFixture<AnimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [AnimeServiceService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
