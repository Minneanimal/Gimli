import { Component } from '@angular/core';
import { AdventuresService } from 'src/app/shared/services/adventures.service';

@Component({
  selector: 'app-adventure-form',
  templateUrl: './adventure-form.component.html',
  styleUrls: ['./adventure-form.component.css']
})
export class AdventureFormComponent {

  constructor(private adventureService: AdventuresService) {
  }

  onSubmit() {
    const newAdventure = this.adventureService.adventureForm.value;

    this.adventureService.createAdventure(newAdventure);
  }
}
