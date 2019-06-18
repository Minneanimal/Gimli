import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Adventure } from 'src/app/shared/models/adventure.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adventure-card',
  templateUrl: './adventure-card.component.html',
  styleUrls: ['./adventure-card.component.css']
})
export class AdventureCardComponent implements OnInit, AfterViewInit {
  @Input() adventure: Adventure;
  @Output() adventureDeleted = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.getElementsByClassName('mat-card-header-text')[0].setAttribute('style', 'margin: 0');
  }

  deleteAdventure(adventureId: string) {
    this.adventureDeleted.emit(adventureId);
  }

  navigateToAdventure() {
    this.router.navigate([this.adventure.adventureId], {relativeTo: this.route});
  }

}
