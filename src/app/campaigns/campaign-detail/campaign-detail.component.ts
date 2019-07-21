import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/shared/services/campaign.service';
import { Campaign } from 'src/app/shared/models/campaign.model';
import { Observable } from 'rxjs';
import { CharacterService } from '../../shared/services/character.service';
import { Character } from '../../shared/models/character.model';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {
  campaign$: Observable<Campaign>;
  characters$: Observable<Character[]>;
  campaignId: string;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService,
    private characterService: CharacterService,
  ) {
    this.campaignId = this.route.snapshot.paramMap.get('id');
  }

  joinCampaignForm = new FormGroup({
    characterId: new FormControl('')
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.characterService.addCharacterToCampaign(this.campaignId, this.joinCampaignForm.get('characterId').value);
  }

  ngOnInit() {
    this.campaign$ = this.campaignService.getCampaign(this.campaignId);
    this.characters$ = this.characterService.characters.pipe(
      map((allCharacters: Character[]) => {
        return allCharacters.filter(character => !character.currentCampaignId);
      })
    );
  }
}
