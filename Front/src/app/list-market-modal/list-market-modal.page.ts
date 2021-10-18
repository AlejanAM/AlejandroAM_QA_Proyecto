import { Component, OnInit } from '@angular/core';
import { PassDataService } from '../services/pass-data.service';
import { ModalController, AlertController  } from '@ionic/angular';
import { BackService } from '../services/back.service';
import { addIdToFamily } from '../models/addIdToFamily';
import { productToList } from '../models/productToList';

@Component({
  selector: 'app-list-market-modal',
  templateUrl: './list-market-modal.page.html',
  styleUrls: ['./list-market-modal.page.scss'],
})
export class ListMarketModalPage implements OnInit {

  listMarket = [];

  datosUsuarioLoggedIn : any;

  addIdToFamily = new addIdToFamily();

  productToList = new productToList();

  constructor(public passData: PassDataService, public modalCtrl: ModalController,
    private alertCtrl: AlertController, public back: BackService) {

      this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));

    }

  ngOnInit() {
    this.listMarket = this.passData.getList();
  }

  decreaseListItem(product){
    this.passData.decreaseProduct(product);
  }

  increaseListItem(product){
    this.passData.addProduct(product);
  }

  removeListItem(product){
    this.passData.removeProduct(product);
  }

  getTotal(){
    return this.listMarket.reduce((i,j) => i + j.price * j.cantidad, 0);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async Save() {

   this.back.createProductList(this.datosUsuarioLoggedIn.user.uid)
   .subscribe((data:any)=>{
       localStorage.setItem('ProductList',JSON.stringify(data.data))
       this.addIdToFamily.idFamily = JSON.parse(localStorage.getItem('FamilyList'));
       this.addIdToFamily.idProductList = JSON.parse(localStorage.getItem('ProductList'));
       this.back.addProductListId(this.addIdToFamily)
       .subscribe((data:any)=>{
          this.addProducts();
       });
   });

   let alert = await this.alertCtrl.create({
     header: 'Lista guardada!',
     message: 'Se ha creado tu lista de mercado correctamente',
     buttons: ['OK']
   });
   alert.present().then(() => {
     this.modalCtrl.dismiss();
   });

 }

 addProducts(){
   this.productToList.idList = JSON.parse(localStorage.getItem('ProductList'));
   for (let item of this.listMarket) {
     this.productToList.proName = item.name;
     this.back.addProductToList(this.productToList)
     .subscribe((data:any)=>{
         console.log();
     });
   }
 }

}
