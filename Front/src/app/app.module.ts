import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

//a
//import {MatExpansionModule} from '@angular/material/expansion';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ListMarketModalPage } from "./list-market-modal/list-market-modal.page";

//Envioronment
import { environment } from '../environments/environment';

//Services
import { BackService } from './services/back.service';
import { FirebaseService } from './services/firebase.service';
import { ToastService } from "./services/toast.service";
import { LoadSpinnerService } from "./services/load-spinner.service";
import { PassDataService } from "./services/pass-data.service";

// import firebase module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";

//Socket
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BackService,
    FirebaseService,
    ToastService, LoadSpinnerService, PassDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
