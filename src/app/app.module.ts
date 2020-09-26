import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CommonModule } from '@angular/common';
import { TaskslistComponent } from './taskslist/taskslist.component';
import { CreatetaskComponent } from './createtask/createtask.component';



@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    CalendarComponent,
    TaskslistComponent,
    CreatetaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
