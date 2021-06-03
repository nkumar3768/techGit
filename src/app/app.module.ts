import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { TooltipModule } from 'ng2-tooltip-directive';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import {DemoMaterialModule} from './material-module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { UserSignInComponent } from './user-sign-in/user-sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    HeaderComponent,
    LandingComponent,
    UserSignInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    DragDropModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    DemoMaterialModule,
    MatExpansionModule,
    ToastrModule.forRoot({
      timeOut:2000,
      preventDuplicates: true
    }),
  ],
  providers: [],
  exports: [MatExpansionModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
