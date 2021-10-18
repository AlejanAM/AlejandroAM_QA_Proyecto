import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListMarketModalPageRoutingModule } from './list-market-modal-routing.module';

import { ListMarketModalPage } from './list-market-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListMarketModalPageRoutingModule
  ],
  declarations: [ListMarketModalPage]
})
export class ListMarketModalPageModule {}
