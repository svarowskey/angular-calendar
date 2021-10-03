import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarUserExecuteComponent } from './components/calendar-user-execute/calendar-user-execute.component';
import { SelectorComponent } from './components/selector/selector.component';
import { OrganaizerComponent } from './components/organaizer/organaizer.component';
import {MomentPipe} from "./moment.pipe";

@NgModule({
  declarations: [
    AppComponent,
    CalendarUserExecuteComponent,
    SelectorComponent,
    OrganaizerComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
