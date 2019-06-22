import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureNavComponent } from './adventure-nav.component';

describe('AdventureNavComponent', () => {
  let component: AdventureNavComponent;
  let fixture: ComponentFixture<AdventureNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
