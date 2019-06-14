import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Adventure } from '../models/adventure.model';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdventuresService {
  private adventuresCollection: AngularFirestoreCollection<Adventure>;
  adventures: Observable<Adventure[]>;

  constructor(db: AngularFirestore, private fb: FormBuilder) {
    this.adventuresCollection = db.collection('adventures');
    this.adventures = this.adventuresCollection.valueChanges();
  }

  adventureForm = this.fb.group({
    title: [null, Validators.required],
    authorFirstName: [null, Validators.required],
    authorLastName: [null, Validators.required],
   /*  state: [null, Validators.required], */
  });

  createAdventure(adventure: Adventure) {
    this.adventuresCollection.add(adventure).then(res => {}, err => console.log(err));
  }
}
