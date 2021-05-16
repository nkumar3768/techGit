import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  {path:'landing', component: LandingComponent},
  { path: '',   redirectTo: '/landing', pathMatch: 'full' },
  {path: 'notes', component: NotesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }