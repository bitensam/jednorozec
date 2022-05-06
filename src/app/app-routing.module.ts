import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: async () =>
      (await import('./features/auth/auth.module')).AuthModule,
  },
  {
    path: 'dashboard',
    loadChildren: async () =>
      (await import('./features/dashboard/dashboard.module')).DashboardModule,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
