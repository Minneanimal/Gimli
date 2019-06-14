import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Adventure } from '../models/adventure.model';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.css']
})
export class AdventuresComponent implements OnInit {
  adventuresollection: AngularFirestoreCollection<Adventure>;
  adventures: Observable<Adventure[]>;

  constructor(db: AngularFirestore) {
    this.adventuresollection = db.collection('adventures');
    this.adventures = this.adventuresollection.valueChanges();
  }

  ngOnInit() {
  }

  addAdventure(adventure: Adventure) {
    this.adventuresollection.add(adventure);
  }

}
