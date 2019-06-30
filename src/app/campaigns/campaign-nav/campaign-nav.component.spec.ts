import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNavComponent } from './campaign-nav.component';

describe('CampaignNavComponent', () => {
  let component: CampaignNavComponent;
  let fixture: ComponentFixture<CampaignNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
