import { Component, OnInit, OnDestroy } from "@angular/core";
import { CharacterService } from "src/app/shared/services/character.service";
import { Observable, Subject } from "rxjs";
import { Character } from "src/app/shared/models/character.model";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../shared/services/authentication.service";
import { switchMap, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-character-list",
  templateUrl: "./character-list.component.html",
  styleUrls: ["./character-list.component.css"]
})
export class CharacterListComponent implements OnInit, OnDestroy {
  characters$: Observable<Character[]>;
  campaignId: string;
  userId: string;

  destroyed$ = new Subject<void>();

  constructor(
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.campaignId = this.route.parent.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    console.log(this.campaignId);
    if (this.campaignId !== null) {
      this.characters$ = this.characterService.getCharactersByCampaignId(
        this.campaignId
      );
    } else {
      this.authService.user.pipe(
        takeUntil(this.destroyed$)
      ).subscribe(user => this.characters$ = this.characterService.getCharactersByUserId(user.uid));
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  onCharacterDeleted(characterId: string) {
    this.characterService.deleteCharacter(characterId);
  }
}
