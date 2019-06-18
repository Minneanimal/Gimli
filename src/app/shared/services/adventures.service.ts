import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Adventure } from '../models/adventure.model';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdventuresService {
  private adventuresCollection: AngularFirestoreCollection<Adventure>;
  private adventureDoc: AngularFirestoreDocument<Adventure>;
  adventures: Observable<Adventure[]>;
  adventure: Observable<Adventure>;
  adventureTitle;

  constructor(db: AngularFirestore, private fb: FormBuilder) {
    this.adventuresCollection = db.collection('adventures');
    this.adventures = this.adventuresCollection.valueChanges({ idField: 'adventureId' });
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

  getAdventure(id: string) {
    this.adventureDoc = this.adventuresCollection.doc<Adventure>('/' + id);
    this.adventure = this.adventureDoc.valueChanges();
    return this.adventure;
  }

  deleteAdventure(id: string) {
    this.adventuresCollection.doc<Adventure>('/' + id).delete();
  }
}
