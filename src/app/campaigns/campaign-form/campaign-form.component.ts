import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Character } from 'src/app/shared/models/character.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Campaign } from '../../shared/models/campaign.model';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {
  characters: Observable<Character[]>;
  userId: string;

  constructor(
    private campaignService: CampaignService,
    public characterService: CharacterService,
    private authService: AuthenticationService
  ) {
    this.authService.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.characters = this.characterService.characters;
  }

  onSubmit() {
    const campaignTitle = this.campaignService.campaignForm.value.title;

    const newCampaign: Campaign = {
      title: campaignTitle,
      uid: this.userId
    };

    this.campaignService.createCampaign(newCampaign);
  }
}
