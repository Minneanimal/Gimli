import { Component } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent {

  constructor(private campaignService: CampaignService) {
  }

  onSubmit() {
    const campaignInput = this.campaignService.campaignForm.value;

    this.campaignService.createCampaign(campaignInput);
  }
}
