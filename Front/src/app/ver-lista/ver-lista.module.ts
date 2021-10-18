import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerListaPageRoutingModule } from './ver-lista-routing.module';

import { VerListaPage } from './ver-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerListaPageRoutingModule
  ],
  declarations: [VerListaPage]
})
export class VerListaPageModule {}
