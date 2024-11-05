import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ScienceComponent } from './quiz/science/science.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,pathMatch:'full'},
    {path:'quiz',children:[
        {path:'science/:questionId',component:ScienceComponent}
    ]},
    {path:'**',component:NotFoundComponent}
];
