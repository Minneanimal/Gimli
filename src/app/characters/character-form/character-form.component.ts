import { Component } from '@angular/core';
import { CharacterService } from '../../shared/services/character.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent {

  constructor(private characterService: CharacterService) {
  }

  onSubmit() {
    const newCharacter = this.characterService.characterForm.value;

    this.characterService.createCharacter(newCharacter);
  }
}
