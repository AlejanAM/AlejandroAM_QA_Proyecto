import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async presentToast(text:string) {
   const toast = await this.toastController.create({
     message: text,
     duration: 3000
   });
   toast.present();
 }

 async chatToast(text:string) {
   let toast = await this.toastController.create({
      message: text,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  async imgToast(text:string) {
    let toast = await this.toastController.create({
       message: text,
       position: 'bottom',
       duration: 2000
     });
     toast.present();
   }


  async informationToast(message, type, header) {
    const toast = await this.toastController.create({
      message: message,
      color: type,
      duration: 3500,
      animated: true,
      header: header,
    })
    toast.present();
  }
}
