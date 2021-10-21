import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Models
import { infoUser } from '../models/infoUser';
//import { addPlayerModal } from '../models/addPlayerModal';
import { familyList } from '../models/familyList';
import { editFL } from '../models/editFL';
import { family } from '../models/family';
//Environment
import { environment } from '../../environments/environment';
import { removeMember } from '../models/removeMember';
import { addMember } from '../models/addMember';
import { productList } from '../models/productList';
import { infoProduct } from '../models/product';
import { addIdToFamily } from '../models/addIdToFamily';
import { productToList } from '../models/productToList';

@Injectable({
  providedIn: 'root',
})
export class BackService {

  constructor(private http: HttpClient) { }

  postPlayer(
    data: infoUser
  ) {
    return this.http.post(`${environment.urlRootBack}/savePlayerInformation`, data);
  }

  getAllPlayers(){
    return this.http.get(`${environment.urlRootBack}/getAllplayers`);
  }



  getFamilyByUser(
    uid:string
  ){
    return this.http.get(`${environment.urlRootBack}/getFamilyByUser?uid=${uid}`);
  }

  getFamilytByOwner(
    idFamilyOwner:string
  ){
    return this.http.get(`${environment.urlRootBack}/getFamilytByOwner?idFamilyOwner=${idFamilyOwner}`);
  }


  //Lista de amigos

  createF(
    data: familyList
  ){
    return this.http.post(`${environment.urlRootBack}/createdF`, data);
  }


  createProductList(
    idListOwner: any
  ){
    let test = {
      idListOwner: idListOwner
    }
    return this.http.post(`${environment.urlRootBack}/createProductList`, test);
  }

  getFL(
    idListOwner:string
  ){
    return this.http.get(`${environment.urlRootBack}/getMemberListByOwner?idListOwner=${idListOwner}`);
  }

  editFL(
    data: editFL
  ){
    return this.http.put(`${environment.urlRootBack}/editFriendList`, data);
  }

   getFamilyId(
    idFamilyOwner: string
  ){
    return this.http.get(`${environment.urlRootBack}/getFamilyId?idFamilyOwner=${idFamilyOwner}`);
  }

  addMember(
    data: addMember
  ){
      return this.http.put(`${environment.urlRootBack}/addMember`, data);
  }

  removeMember(
    data: removeMember
  ){
      return this.http.put(`${environment.urlRootBack}/removeMember`, data);
  }

  getAllCategory(){
    return this.http.get(`${environment.urlRootBack}/getAllCategory`);
  }

  getAllProduct(){
    return this.http.get(`${environment.urlRootBack}/getAllProduct`);
  }

  postProduct(
    data: infoProduct
  ) {
    return this.http.post(`${environment.urlRootBack}/createProduct`, data);
  }

  getProductListId(
   idListOwner: string
 ){
   return this.http.get(`${environment.urlRootBack}/getProductListId?idListOwner=${idListOwner}`);
 }

  addProductListId( data: addIdToFamily){
    return this.http.put(`${environment.urlRootBack}/addProductListId`, data);
  }

  addProductToList( data: productToList){
    return this.http.put(`${environment.urlRootBack}/addProduct`, data);
  }

  getMarketList(
   idListOwner: string
 ){
   return this.http.get(`${environment.urlRootBack}/getListMarket?idListOwner=${idListOwner}`);
 }

 sendMail(
  email: string
){
  return this.http.get(`${environment.urlRootBack}/sendEmail?email=${email}`);
}

}
