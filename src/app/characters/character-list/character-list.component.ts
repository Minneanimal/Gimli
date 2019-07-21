import { Component, OnInit } from '@angular/core';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Observable } from 'rxjs';
import { Character } from 'src/app/shared/models/character.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters$: Observable<Character[]>
  campaignId: string;

  constructor(private characterService: CharacterService, private route: ActivatedRoute) {
    this.campaignId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    console.log(this.campaignId);
    this.characters$ = this.characterService.getCharactersByCampaignId(this.campaignId);
  }

  onCharacterDeleted(characterId: string) {
    this.characterService.deleteCharacter(characterId);
  }


}
