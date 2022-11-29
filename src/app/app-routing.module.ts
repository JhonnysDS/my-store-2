import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './website/pages/not-found/not-found.component';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
