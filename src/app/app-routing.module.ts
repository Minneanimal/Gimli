import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignListComponent } from './campaigns/campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaigns/campaign-detail/campaign-detail.component';
import { RoleplayComponent } from './roleplay/roleplay.component';
import { CampaignNavComponent } from './campaigns/campaign-nav/campaign-nav.component';
import { CharacterListComponent } from './characters/character-list/character-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';

const routes: Routes = [
  { path: 'new-user', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'campaigns',
    children: [
      {
        path: '',
        component: CampaignListComponent
      },
      {
        path: ':id',
        component: CampaignNavComponent,
        children: [
          { path: '', component: CampaignDetailComponent },
          { path: 'roleplay', component: RoleplayComponent },
          { path: 'characters', component: CharacterListComponent}
        ]
      }
    ]
  },
  {
    path: 'characters',
    component: CharacterListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'campaigns'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
