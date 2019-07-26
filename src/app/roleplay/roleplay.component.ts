import { Component, OnInit } from "@angular/core";
import { PostService } from "../shared/services/post.service";
import { Observable } from "rxjs";
import { Post } from "../shared/models/post.model";
import { CharacterService } from "../shared/services/character.service";
import { Character } from "../shared/models/character.model";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: "app-roleplay",
  templateUrl: "./roleplay.component.html",
  styleUrls: ["./roleplay.component.css"]
})
export class RoleplayComponent implements OnInit {
  posts$: Observable<Post[]>;
  currentCharacter$: Observable<Character>;
  campaignId: string;
  characters$: Observable<Character[]>;
  postData$: { post: Post; character: Character };

  constructor(
    private postService: PostService,
    private characterService: CharacterService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.campaignId = this.route.parent.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.posts$ = this.postService.getCampaignChat(this.campaignId);
    this.authService.user.subscribe(user => this.currentCharacter$ = this.characterService.getActiveCharacter(this.campaignId, user.uid));
  }

  onSubmit(character: Character) {
    const postBody = this.postService.postForm.value.body;
    const newPost: Post = {
      body: postBody,
      characterId: character.uid,
      campaignId: character.currentCampaignId,
      characterName: character.name
    };

    this.postService.createPost(newPost);
  }
}
