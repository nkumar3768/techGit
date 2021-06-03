import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotesComponent } from './notes/notes.component';
import {UserSignInComponent } from './user-sign-in/user-sign-in.component';

const routes: Routes = [
  // {path:'landing', component: LandingComponent},
  // { path: '',   redirectTo: '/landing', pathMatch: 'full' },
  // {path: 'notes', component: NotesComponent}

  {path:'signin', component: UserSignInComponent},
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
   {path:'landing', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
