import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs';
import {
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private charactersCollection: AngularFirestoreCollection<Character>;
  private characterDoc: AngularFirestoreDocument<Character>;
  characters: Observable<Character[]>;
  character: Observable<Character>;

  characterForm = this.fb.group({
    name: [null, Validators.required]
    /*  state: [null, Validators.required], */
  });

  constructor(private db: AngularFirestore, private fb: FormBuilder) {
    this.charactersCollection = db.collection('characters');
    this.characters = this.charactersCollection.valueChanges({ idField: 'id' });
  }

  createCharacter(character: Character) {
    this.charactersCollection
      .add(character)
      .then(res => {}, err => console.log(err));
  }

  getCharacter(id: string) {
    this.characterDoc = this.charactersCollection.doc<Character>('/' + id);
    this.character = this.characterDoc.valueChanges();
    return this.character;
  }

  getActiveCharacter(
    campaignId: string,
    userId: string
  ): Observable<Character> {
    return this.db
      .collection<Character>('characters', ref =>
        ref.where('currentCampaignId', '==', campaignId).where('uid', '==', userId)
      )
      .valueChanges().pipe(map(characters => characters[0]));
  }

  getCharactersByCampaignId(campaignId: string): Observable<Character[]> {
    return this.db
      .collection<Character>('characters', ref =>
        ref.where('currentCampaignId', '==', campaignId)
      )
      .valueChanges();
  }

  deleteCharacter(id: string) {
    this.charactersCollection.doc<Character>('/' + id).delete();
  }

  addCharacterToCampaign(campaignId: string, characterId: string) {
    this.charactersCollection
      .doc<Character>('/' + characterId)
      .update({ currentCampaignId: campaignId });
  }

  getCharactersByUserId(userId: string) {
    return this.db
      .collection<Character>('characters', ref => ref.where('uid', '==', userId))
      .valueChanges();
  }
}
