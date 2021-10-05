import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarUserExecuteComponent } from './components/calendar-user-execute/calendar-user-execute.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarService} from "./services/calendar.service";
import {HttpClientModule} from "@angular/common/http";
import {CalendarRepositoryService} from "./services/calendar.repository.service";
import {DatePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    CalendarUserExecuteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CalendarService,
    CalendarRepositoryService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
