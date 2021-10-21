import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { identity } from 'rxjs';
import { addMember } from '../models/addMember';
import { family } from '../models/family';
import { familyList } from '../models/familyList';
import { productList } from '../models/productList';
import { removeMember } from '../models/removeMember';
import { BackService } from '../services/back.service';
import { ToastService } from '../services/toast.service';
import { LoadSpinnerService } from '../services/load-spinner.service';


@Component({
  selector: 'app-family-main',
  templateUrl: './family-main.page.html',
  styleUrls: ['./family-main.page.scss'],
})
export class FamilyMainPage implements OnInit {
  listName:string;

  text = "";
  text2 = "";

  datosUsuarioLoggedIn : any;

  idFamilyList:string;
  usersFiltered = [];
  usersNoFiltered = [];
  friendList:any;
  toRemove = new removeMember();
  toAdd = new addMember();
  toCreate = new familyList();

  productList = new productList();

  userCreator = false;
  userMember = false;
  family: any;
  private showMembers: boolean = false;

  constructor(private back: BackService, private router: Router,
     private toast:ToastService, private loadSpineer: LoadSpinnerService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.allPersons()
    this.verify();
  }

  toggleD() {
    this.showMembers = !this.showMembers;
  }

  verify(){
    this.back.getFamilytByOwner(this.datosUsuarioLoggedIn.user.uid)
    .subscribe((data:any)=>{
      if (data.data.length !== 0) {
        this.userCreator = true;
        this.family = data.data;
        this.getFamilyId(this.datosUsuarioLoggedIn.user.uid);
      }else{
        this.back.getFamilyByUser(this.datosUsuarioLoggedIn.user.uid)
        .subscribe((data:any)=>{
          if (data.data.length !== 0) {
            this.userMember = true;
            this.family = data.data[0];
            this.getFamilyId(this.family.idFamilyOwner.uid);
          }

        });
      }
    });

  }

  createProductList() {
    var id ="";
    this.productList.idListOwner = this.datosUsuarioLoggedIn.user.uid;
      this.back.createProductList(this.productList)
      .subscribe((data:any)=>{
        if (data.success) {
          id = data.data;
        }
        this.toast.informationToast('Lista de productos creada exitosamente','success','');
      })
      

      return id;
  }


  createFamily(){
    let s = false;
    if(this.text2==""){
        this.toast.informationToast('Ingrese un nombre de familia','warning','Campo vacío:');
    }else {
        this.toCreate.idFamilyOwner = this.datosUsuarioLoggedIn.user.uid;
        this.toCreate.listName = this.text2;
        this.toCreate.idProduct = "";
        this.loadSpineer.presentLoading("Loading...", 2000);
        this.back.createF(this.toCreate)
        .subscribe((data:any)=>{
          if (data.success) {
            this.toast.informationToast('Famlia creada exitosamente:','success','');
            this.userCreator = false;
            this.userMember = false;
            this.verify();
          }else{
            this.toast.informationToast('Fallo de sistema','danger','Error: Fallo al crear familia');
          }
        });
      }
  }

  deletMember(id:string, name :string){
    this.toRemove.idFamilyList = this.idFamilyList;
    this.toRemove.uid = id;
    this.back.removeMember(this.toRemove)
    .subscribe((data:any)=>{
      if (data['success']) {
        this.toast.informationToast('Usuario eliminado exitosamente:','succes','');
        this.filterPlayeyrs();
      }else{
        this.toast.informationToast('Fallo de sistema','danger','Error: No se ha podido eliminar');
      }
      this.verify();
    });
  }

  addMember(id:string){
    this.toAdd.idFamily = this.idFamilyList;
    this.toAdd.member = id;
    this.back.addMember(this.toAdd)
    .subscribe((data:any)=>{
      if (data['success']) {
        this.toast.informationToast('Usuario añadido exitosamente:','succes','');
        this.filterPlayeyrs();
      }else{
        this.toast.informationToast('Fallo de sistema','danger','Error: No se ha podido añadir');
      }
      this.verify();
    });
  }


  getFamilyId(idFamilyOwner:string){
    this.back.getFamilyId(idFamilyOwner)
    .subscribe((data:any)=>{
      this.idFamilyList = data.data;
    });
  }

  filterPlayeyrs()
  {
    this.usersFiltered = [];
    this.back.getAllPlayers()
    .subscribe((data:any)=>{
      data.users.forEach(async user => {
        if (user.displayName == this.text) {
          this.usersFiltered.push(user)
        }
        this.usersFiltered = this.usersFiltered;
    })
    });
  }

  allPersons(){
    this.usersNoFiltered = [];
    this.back.getAllPlayers()
    .subscribe((data:any)=>{
        this.usersNoFiltered = data.users;
    });
  }

  test($event){
    this.usersFiltered = [];
    this.usersNoFiltered.forEach(async user => {
      if (user.displayName == (this.text)){
      //if (user.displayName.includes(this.text)){
        this.usersFiltered.push(user)
      }
    });
  }
}
