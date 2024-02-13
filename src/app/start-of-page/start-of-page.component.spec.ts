import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOfPageComponent } from './start-of-page.component';

describe('StartOfPageComponent', () => {
  let component: StartOfPageComponent;
  let fixture: ComponentFixture<StartOfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartOfPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StartOfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
