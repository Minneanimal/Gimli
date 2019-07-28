import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CampaignListComponent } from './campaigns/campaign-list/campaign-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatStepperModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CampaignFormComponent } from './campaigns/campaign-form/campaign-form.component';
import { CampaignCardComponent } from './campaigns/campaign-card/campaign-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CampaignDetailComponent } from './campaigns/campaign-detail/campaign-detail.component';
import { CampaignNavComponent } from './campaigns/campaign-nav/campaign-nav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RoleplayComponent } from './roleplay/roleplay.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterCardComponent } from './characters/character-card/character-card.component';
import { CharacterListComponent } from './characters/character-list/character-list.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { CharacterFormComponent } from './characters/character-form/character-form.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { PostComponent } from './roleplay/post/post.component';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CampaignListComponent,
    CampaignFormComponent,
    CampaignCardComponent,
    CampaignDetailComponent,
    CampaignNavComponent,
    RoleplayComponent,
    CharactersComponent,
    CharacterCardComponent,
    CharacterListComponent,
    AuthComponent,
    LoginComponent,
    CharacterFormComponent,
    RegisterUserComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Gimli'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatTabsModule,
    MatStepperModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
