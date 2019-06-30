import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';
import { Observable } from 'rxjs';
import { Campaign } from '../../shared/models/campaign.model';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Observable<Campaign[]>;

  constructor(private campaignService: CampaignService) {
  }

  ngOnInit() {
    this.campaigns = this.campaignService.campaigns;
  }

  onCampaignDeleted(campaignId: string) {
    this.campaignService.deleteCampaign(campaignId);
  }
}
