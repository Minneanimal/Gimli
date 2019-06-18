import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdventuresService } from 'src/app/shared/services/adventures.service';
import { Adventure } from 'src/app/shared/models/adventure.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adventure-detail',
  templateUrl: './adventure-detail.component.html',
  styleUrls: ['./adventure-detail.component.css']
})
export class AdventureDetailComponent implements OnInit {
  adventure$: Observable<Adventure>;
  adventureId: string;

  constructor(private route: ActivatedRoute, private adventuresService: AdventuresService) {
     this.adventureId = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.adventure$ = this.adventuresService.getAdventure(this.adventureId);
  }

}
