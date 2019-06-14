import { Component, OnInit } from '@angular/core';
import { AdventuresService } from '../shared/services/adventures.service';
import { Observable } from 'rxjs';
import { Adventure } from '../shared/models/adventure.model';

@Component({
  selector: 'app-adventures',
  templateUrl: './adventures.component.html',
  styleUrls: ['./adventures.component.css']
})
export class AdventuresComponent implements OnInit {
  adventures: Observable<Adventure[]>;

  constructor(private adventuresService: AdventuresService) {
  }

  ngOnInit() {
    this.adventures = this.adventuresService.adventures;
  }
}
