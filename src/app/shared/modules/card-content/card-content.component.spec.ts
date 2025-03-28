import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentComponent } from './card-content.component';

describe('CardComponent', () => {
  let component: CardContentComponent;
  let fixture: ComponentFixture<CardContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
