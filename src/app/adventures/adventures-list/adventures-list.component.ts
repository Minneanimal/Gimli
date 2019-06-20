import { Component, OnInit } from '@angular/core';
import { AdventuresService } from '../../shared/services/adventures.service';
import { Observable } from 'rxjs';
import { Adventure } from '../../shared/models/adventure.model';

@Component({
  selector: 'app-adventures-list',
  templateUrl: './adventures-list.component.html',
  styleUrls: ['./adventures-list.component.css']
})
export class AdventuresListComponent implements OnInit {
  adventures: Observable<Adventure[]>;

  constructor(private adventuresService: AdventuresService) {
  }

  ngOnInit() {
    this.adventures = this.adventuresService.adventures;
  }

  onAdventureDeleted(adventureId: string) {
    this.adventuresService.deleteAdventure(adventureId);
  }
}
