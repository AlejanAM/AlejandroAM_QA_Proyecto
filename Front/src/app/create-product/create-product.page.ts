import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage'
import { ToastService } from '../services/toast.service';
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { BackService } from '../services/back.service';
import { infoProduct } from '../models/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  URLPublica: any;
  fileName = '';
  listCategory = [];
  nameProduct : string;
  description: string;
  price: number;
  category: any;
  infoProduct = new infoProduct();
  percentage: number;
  currentFileUpload = false;


  constructor(private afStorage: AngularFireStorage, private toast:ToastService, private back: BackService) { }

  ngOnInit() {
    this.back.getAllCategory()
    .subscribe((data:any)=>{
        this.listCategory = data.data
    });
  }

  upload(event) {
    try {
      this.fileName = event.target.files[0].name;
      this.currentFileUpload = true;
      const task = this.afStorage.upload(event.target.files[0].name, event.target.files[0])
      task.percentageChanges().subscribe(
        percentage => {
          this.percentage = Math.round(percentage);
        },
        error => {
          console.log(error);
        }
      );
      task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          var testURL = this.afStorage.ref(this.fileName);
          testURL.getDownloadURL().subscribe((URL) => {
            this.URLPublica = URL;
          });
        })
      ).subscribe();
    } catch (error) {
      this.toast.imgToast('Error al cargar la imagen');
    }
  }

  crearProducto(){
    this.infoProduct.img = this.URLPublica
    this.infoProduct.name = this.nameProduct
    this.infoProduct.description = this.description
    this.infoProduct.price = this.price
    this.infoProduct.category = this.category
    this.back.postProduct(this.infoProduct)
    .subscribe((data:any)=>{
      this.limpiar();
      this.toast.imgToast('Producto Creado Exitosamente!!');
    });

  }

  limpiar(){
    this.URLPublica = undefined;
    this.nameProduct = '';
    this.description = '';
    this.price = 0;
    this.category = null;
  }

}
