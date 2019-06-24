import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdventuresListComponent } from "./adventures/adventures-list/adventures-list.component";
import { AdventureDetailComponent } from "./adventures/adventure-detail/adventure-detail.component";
import { RoleplayComponent } from "./roleplay/roleplay.component";
import { AdventureNavComponent } from "./adventures/adventure-nav/adventure-nav.component";
import { CharacterListComponent } from "./characters/character-list/character-list.component";
import { LoginComponent } from "./auth/login/login.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "adventures",
    children: [
      {
        path: "",
        component: AdventuresListComponent
      },
      {
        path: ":id",
        component: AdventureNavComponent,
        children: [
          { path: "", component: AdventureDetailComponent },
          { path: "roleplay", component: RoleplayComponent },
          { path: "characters", component: CharacterListComponent}
        ]
      }
    ]
  },
  {
    path: "characters",
    component: CharacterListComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "adventures"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
