import { Component, OnDestroy } from '@angular/core';
import { CharacterService } from '../../shared/services/character.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Character } from '../../shared/models/character.model';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnDestroy {
  userId: string;
  destroyed$ = new Subject<void>();

  constructor(private characterService: CharacterService, private authService: AuthenticationService) {
    this.authService.user.pipe(takeUntil(this.destroyed$)).subscribe(user => this.userId = user.uid);
  }

  onSubmit() {
    const characterName = this.characterService.characterForm.value.name;
    const newCharacter: Character = {
      name: characterName,
      uid: this.userId
    };

    this.characterService.createCharacter(newCharacter);
  }
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
