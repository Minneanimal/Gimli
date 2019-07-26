import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@angular/fire/firestore';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { Campaign } from '../models/campaign.model';

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
      .collection<Campaign>('campaigns')
      .doc<Campaign>(campaignId)
      .collection<Post>('chats')
      .valueChanges({ idField: 'id' });
    }
}
