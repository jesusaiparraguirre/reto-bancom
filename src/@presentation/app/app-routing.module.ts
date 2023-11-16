import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/@data/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'post', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'post',
    loadChildren: () => import('../post/post.module').then(m => m.PostPageModule),
  },
  {
    path: 'home',
    loadChildren: () => import('../app/app.module').then(m => m.AppModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
