import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMarketModalPage } from './list-market-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ListMarketModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMarketModalPageRoutingModule {}
