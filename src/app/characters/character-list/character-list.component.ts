import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Observable } from 'rxjs';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters$: Observable<Character[]>

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.characters$ = this.characterService.characters;
  }

  characterDeleted(characterId: string) {
    this.characterService.deleteCharacter(characterId);
  }
}
