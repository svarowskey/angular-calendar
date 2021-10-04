import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarUserExecuteComponent } from './components/calendar-user-execute/calendar-user-execute.component';
import {MomentPipe} from "./moment.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarService} from "./services/calendar.service";
import {HttpClientModule} from "@angular/common/http";
import {CalendarRepositoryService} from "./services/calendar.repository.service";

@NgModule({
  declarations: [
    AppComponent,
    CalendarUserExecuteComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CalendarService,
    CalendarRepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
