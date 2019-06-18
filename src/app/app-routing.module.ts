import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdventuresComponent } from "./adventures/adventures.component";
import { AdventureDetailComponent } from './adventures/adventure-detail/adventure-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'adventures',
    component: AdventuresComponent,
  },
    {
      path: 'adventures/:id',
      component: AdventureDetailComponent
    },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'adventures'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
