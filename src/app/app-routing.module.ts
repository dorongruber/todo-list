import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', component: BackgroundComponent,
children: [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
]},
  {path: 'main/:id', component: MainpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
