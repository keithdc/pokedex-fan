import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoDialogComponent } from './card-info-dialog.component';

describe('PokemonComponent', () => {
  let component: CardInfoDialogComponent;
  let fixture: ComponentFixture<CardInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
