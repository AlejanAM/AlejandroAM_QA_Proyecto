import { Component } from '@angular/core';

//Models
import {infoUser} from '../models/infoUser';
//Service
import { BackService } from '../services/back.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  datosUsuarioLoggedIn : any;
  dataPlayer = new infoUser();

  constructor(private back: BackService, private firebaseService: FirebaseService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));

    if (this.datosUsuarioLoggedIn != null) {
      this.firebaseService.signOut();
    }
  }

}
