import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(db: AngularFirestore, private fb: FormBuilder) {
    this.charactersCollection = db.collection('characters');
    this.characters = this.charactersCollection.valueChanges({ idField: 'id' });
  }

  createCharacter(character: Character) {
    this.charactersCollection.add(character).then(res => {}, err => console.log(err));
  }

  getCharacter(id: string) {
    this.characterDoc = this.charactersCollection.doc<Character>('/' + id);
    this.character = this.characterDoc.valueChanges();
    return this.character;
  }

  deleteCharacter(id: string) {
    this.charactersCollection.doc<Character>('/' + id).delete();
  }
}
