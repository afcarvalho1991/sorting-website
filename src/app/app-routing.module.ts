import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }    from './home/home.component';
import { SorterComponent }  from './sorter/sorter.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = 
[
  { path: '',      redirectTo: '/home', pathMatch: 'full' },
  { path: 'home'  , component: HomeComponent},
  { path: 'sorter', component: SorterComponent},
  { path: 'about' , component: AboutComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }