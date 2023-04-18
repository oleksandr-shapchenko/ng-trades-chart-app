import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'trades',
    loadChildren: () => import('./feature-modules/trades/trades.module').then((m) => m.TradesModule)
  },
  { path: '**', redirectTo: 'trades' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
