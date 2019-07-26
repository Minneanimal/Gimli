import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Character } from 'src/app/shared/models/character.model';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Campaign } from '../../shared/models/campaign.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit, OnDestroy {
  characters: Observable<Character[]>;
  userId: string;
  destroyed$ = new Subject<void>();

  constructor(
    private campaignService: CampaignService,
    public characterService: CharacterService,
    private authService: AuthenticationService
  ) {
    this.authService.user.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.characters = this.characterService.characters;
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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
