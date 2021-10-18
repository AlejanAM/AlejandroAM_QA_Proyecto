import { Component, OnInit } from '@angular/core';
import { BackService } from '../services/back.service';
@Component({
  selector: 'app-ver-lista',
  templateUrl: './ver-lista.page.html',
  styleUrls: ['./ver-lista.page.scss'],
})
export class VerListaPage implements OnInit {

  listMarket = [];

  datosUsuarioLoggedIn : any;

  constructor(public back: BackService,) { }

  ngOnInit() {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.back.getMarketList(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      this.listMarket = data.data.products;
    });
  }

}
