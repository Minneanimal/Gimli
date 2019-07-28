import { Character } from './character.model';

export interface Post {
    body: string;
    campaignId: string;
    id?: string;
    characterId: string;
    createdAt: number;
}

export interface PostData {
    post: Post;
    character: Character;
  }
