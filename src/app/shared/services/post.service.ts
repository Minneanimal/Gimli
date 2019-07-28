import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Post, PostData } from '../models/post.model';
import { Observable, combineLatest, of } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { Campaign } from '../models/campaign.model';
import { switchMap, map } from 'rxjs/operators';
import { CharacterService } from './character.service';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  private postDoc: AngularFirestoreDocument<Post>;
  posts: Observable<Post[]>;
  post: Observable<Post>;

  postForm = this.fb.group({
    body: [null, Validators.required]
    /*  state: [null, Validators.required], */
  });

  constructor(private db: AngularFirestore, private fb: FormBuilder) {
    this.postsCollection = db.collection('posts');
    this.posts = this.postsCollection.valueChanges({ idField: 'id' });
  }

  createPost(post: Post) {
    this.db
      .collection<Campaign>('campaigns')
      .doc<Campaign>(post.campaignId)
      .collection<Post>('chats').add(post);
  }

  getPost(id: string) {
    this.postDoc = this.postsCollection.doc<Post>('/' + id);
    this.post = this.postDoc.valueChanges();
    return this.post;
  }

  deletePost(id: string) {
    this.postsCollection.doc<Post>('/' + id).delete();
  }

  addNewPost(campaignId: string, characterId: string) {
    this.postsCollection.doc<Post>('/' + characterId).update({ campaignId });
  }

  getCampaignChat(campaignId: string): Observable<Post[]> {
      return this.db
      .collection<Campaign>('campaigns', ref => ref.orderBy('createdAt'))
      .doc<Campaign>(campaignId)
      .collection<Post>('chats')
      .valueChanges({ idField: 'id' });
    }

  joinUsersToPost(posts$: Observable<Post[]>) {
    let posts;
    return posts$.pipe(
      switchMap((p: Post[]) => {
        posts = p;
        const characterIds = [...new Set(posts.map(post => post.characterId))];
        console.log(characterIds);
        const characters = characterIds.map(charId =>
          this.db.doc(`characters/${charId}`).snapshotChanges()
          .pipe(
            map(doc => {
              return { id: doc.payload.id, ...doc.payload.data() };
            })
          )
        );
        return characters.length ? combineLatest(characters) : of([]);
      }),
      map((arr: Character[]) => {
        console.log(arr);
        posts = posts.map(v => {
          return { post: v, character: arr.find(c => c.id === v.characterId) };
        });
        console.log(posts);
        return posts;
      })
    );
  }
}
