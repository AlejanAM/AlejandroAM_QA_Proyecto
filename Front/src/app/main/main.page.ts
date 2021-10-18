import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BackService } from '../services/back.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  datosUsuarioLoggedIn : any;

  hasFamily = false;
  family: any;
  idFamilyList:string;

  constructor(private menu: MenuController,private back: BackService, private router: Router, private toast:ToastService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.back.getFamilyId(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      localStorage.setItem('FamilyList',JSON.stringify(data.data))
    });
    this.back.getProductListId(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      localStorage.setItem('ProductList',JSON.stringify(data.data))
    });
  }

  ionViewWillEnter(){
    this.back.getFamilyId(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      localStorage.setItem('FamilyList',JSON.stringify(data.data))
    });
    this.back.getProductListId(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      localStorage.setItem('ProductList',JSON.stringify(data.data))
    });
    this.verify();
  }


  ngOnInit() {
    this.verify();

  }

  esto(){

    window.close();
    this.router.navigate(['/family-main']);
  }

  verify(){
    this.back.getFamilyByUser(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      if (data.data.length !== 0) {
        this.hasFamily = true;
        //this.family = data.data[0];
        this.getFamilyId(this.family.idFamilyOwner.uid);
      }
    });
    this.back.getFamilytByOwner(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      if (data.data.length !== 0) {
        this.hasFamily = true;
        //this.family = data.data;
        this.getFamilyId(this.datosUsuarioLoggedIn.user.uid);
      }
    });
  }

  getFamilyId(idFamilyOwner:string){
    this.back.getFamilyId(idFamilyOwner)
    .subscribe((data:any)=>{
      this.idFamilyList = data.data;
    });
  }

  goToCreateList(){
    this.router.navigate(['/lista-compra']);
  }

  goToCreateProduct(){
    this.router.navigate(['/create-product']);
  }

  goToList(){
    this.router.navigate(['/ver-lista']);
  }

}
