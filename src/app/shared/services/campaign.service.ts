import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Campaign } from '../models/campaign.model';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private campaignsCollection: AngularFirestoreCollection<Campaign>;
  private campaignDoc: AngularFirestoreDocument<Campaign>;
  campaigns: Observable<Campaign[]>;
  campaign: Observable<Campaign>;
  currrentUserId: string;

  constructor(db: AngularFirestore, private fb: FormBuilder, private authService: AuthenticationService) {
    this.campaignsCollection = db.collection('campaigns');
    this.campaigns = this.campaignsCollection.valueChanges({ idField: 'campaignId' });
  }

  campaignForm = this.fb.group({
    title: [null, Validators.required]
   /*  state: [null, Validators.required], */
  });

  createCampaign(campaignInput) {
    this.campaignsCollection.add(campaignInput).then(res => {}, err => console.log(err));
  }

  getCampaign(id: string) {
    this.campaignDoc = this.campaignsCollection.doc<Campaign>('/' + id);
    this.campaign = this.campaignDoc.valueChanges();
    return this.campaign;
  }

  deleteCampaign(id: string) {
    this.campaignsCollection.doc<Campaign>('/' + id).delete();
  }
}
