import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UpdateComponent } from './views/update/update.component';
import { UserComponent } from './views/user/user.component';


const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'user/:id', component:UserComponent}, 
  {path: 'update/:id', component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
