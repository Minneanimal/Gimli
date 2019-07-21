import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';
import { Observable } from 'rxjs';
import { Campaign } from '../../shared/models/campaign.model';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Observable<Campaign[]>;
  userId: string;

  constructor(private campaignService: CampaignService, private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.campaigns = this.campaignService.getAllCampaignsByUserId(user.uid);
    });
  }

  onCampaignDeleted(campaignId: string) {
    this.campaignService.deleteCampaign(campaignId);
  }
}
