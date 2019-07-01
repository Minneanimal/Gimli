import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  @Output() characterDeleted = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  deleteCharacter(characterId: string) {
    this.characterDeleted.emit(characterId);
  }

  navigateToCharacter() {
    this.router.navigate([this.character.id], {relativeTo: this.route});
  }

}
