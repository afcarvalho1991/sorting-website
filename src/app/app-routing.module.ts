import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }    from './home/home.component';
import { SorterComponent }  from './sorter/sorter.component';


const routes: Routes = 
[
  { path: '',      redirectTo: '/home', pathMatch: 'full' },
  { path: 'home'  , component: HomeComponent},
  { path: 'sorter', component: SorterComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }