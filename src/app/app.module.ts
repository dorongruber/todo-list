import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    CalendarComponent,
    TaskslistComponent,
    BackgroundComponent,
    LoginComponent,
    RegisterComponent,
    CreatetaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatMenuModule,
    MatSidenavModule,
    MatBottomSheetModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    TaskService
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
