import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimeAddComponent } from './anime-add.component';
import { AnimeServiceService } from 'src/app/service/anime-service.service';

describe('AnimeAddComponent', () => {
  let component: AnimeAddComponent;
  let fixture: ComponentFixture<AnimeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimeAddComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [AnimeServiceService]
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
