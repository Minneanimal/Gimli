import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Character } from 'src/app/shared/models/character.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {
  characters: Observable<Character[]>;

  constructor(private campaignService: CampaignService, public characterService: CharacterService) {
  }

  ngOnInit() {
    this.characters = this.characterService.characters;
  }

  onSubmit() {
    const campaignInput = this.campaignService.campaignForm.value;

    this.campaignService.createCampaign(campaignInput);
  }
}
