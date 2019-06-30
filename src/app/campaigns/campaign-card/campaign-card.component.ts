import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.css']
})
export class CampaignCardComponent implements OnInit, AfterViewInit {
  @Input() campaign: Campaign;
  @Output() campaignDeleted = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementsByClassName('mat-card-header-text')[0].setAttribute('style', 'margin: 0');
  }

  deleteCampaign(campaignId: string) {
    this.campaignDeleted.emit(campaignId);
  }

  navigateToCampaign() {
    this.router.navigate([this.campaign.campaignId], {relativeTo: this.route});
  }

}
