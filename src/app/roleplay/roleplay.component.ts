import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { Observable } from 'rxjs';
import { Post, PostData } from '../shared/models/post.model';
import { CharacterService } from '../shared/services/character.service';
import { Character } from '../shared/models/character.model';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';


@Component({
  selector: 'app-roleplay',
  templateUrl: './roleplay.component.html',
  styleUrls: ['./roleplay.component.css']
})
export class RoleplayComponent implements OnInit {
  currentCharacter$: Observable<Character>;
  posts$: Observable<Post[]>;
  campaignId: string;
  characters$: Observable<Character[]>;
  postData$: Observable<PostData[]>;
  posts: Post[];
  joinKeys: Character[];

  constructor(
    private postService: PostService,
    private characterService: CharacterService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    this.campaignId = this.route.parent.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.authService.user.subscribe(
      user =>
        (this.currentCharacter$ = this.characterService.getActiveCharacter(
          this.campaignId,
          user.uid
        ))
    );
    this.posts$ = this.postService.getCampaignChat(this.campaignId);
    this.postData$ = this.postService.joinUsersToPost(this.posts$);
  }

  onSubmit(character: Character) {
    const postBody = this.postService.postForm.value.body;
    const newPost: Post = {
      body: postBody,
      characterId: character.id,
      campaignId: character.currentCampaignId,
      createdAt: Date.now()
    };

    this.postService.createPost(newPost);
  }

  trackByCreated(i, post) {
    return post.post.createdAt;
  }
}
