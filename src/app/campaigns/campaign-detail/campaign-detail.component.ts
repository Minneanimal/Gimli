import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  campaign$: Observable<Campaign>;
  campaignId: string;

  constructor(private route: ActivatedRoute, private campaignService: CampaignService) {
     this.campaignId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.campaign$ = this.campaignService.getCampaign(this.campaignId);
  }

}
