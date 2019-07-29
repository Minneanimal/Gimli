import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignService } from '../../shared/services/campaign.service';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Character } from 'src/app/shared/models/character.model';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Campaign } from '../../shared/models/campaign.model';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface System {
  value: string;
  viewValue: string;
}
interface Pace {
  value: string;
  viewValue: string;
}
interface MaturityRating {
  value: string;
  viewValue: string;
}
interface Genre {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit, OnDestroy {
  systems: System[] = [
    {value: 'none-0', viewValue: 'None'},
    {value: 'other-1', viewValue: 'Other'},
    {value: 'D&D-2', viewValue: 'Dungeons & Dragons'}
  ];

  paceOptions: Pace[] = [
    {value: 'verySlow-0', viewValue: 'Very Slow'},
    {value: 'slow-1', viewValue: 'Slow'},
    {value: 'average-2', viewValue: 'Average'},
    {value: 'fast-3', viewValue: 'Fast'},
    {value: 'veryFast-4', viewValue: 'Very Fast'}
  ];

  maturityRatings: MaturityRating[] = [
    {value: 'everyone-0', viewValue: 'Everyone'},
    {value: 'teen-1', viewValue: 'Teen'},
    {value: 'mature-2', viewValue: 'Mature 17+'},
    {value: 'adult-3', viewValue: 'Adult 18+'}
  ];

  genres: Genre[] = [
    {value: 'crime-0', viewValue: 'Crime'},
    {value: 'fantasy-1', viewValue: 'Fantasy'},
    {value: 'romance-2', viewValue: 'Romance'},
    {value: 'scienceFiction-3', viewValue: 'Science Fiction'},
    {value: 'western-3', viewValue: 'Western'},
    {value: 'inspirational-3', viewValue: 'Inspirational'},
    {value: 'horror-3', viewValue: 'Horror'}
  ];
  characters: Observable<Character[]>;
  userId: string;
  destroyed$ = new Subject<void>();

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private campaignService: CampaignService,
    public characterService: CharacterService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.authService.user.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.characters = this.characterService.characters;
    this.firstFormGroup = this.fb.group({
      title: ['', Validators.required],
      overview: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      system: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      genre: ['', Validators.required],
      maturityRating: ['', Validators.required],
      pace: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit() {
    const campaignInfo = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value
    };

    const newCampaign: Campaign = {
      title: campaignInfo.title,
      uid: this.userId,
      imageUrl: '',
      genre: campaignInfo.genre,
      pace: campaignInfo.pace,
      maturityRating: campaignInfo.maturityRating,
      system: campaignInfo.system
    };

    this.campaignService.createCampaign(newCampaign);
    this.router.navigate(['../campaigns']);
  }
}
