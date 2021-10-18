import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
//Models
import {infoUser} from '../models/infoUser';
//Service
import { BackService } from '../services/back.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 datosUsuarioLoggedIn : any;
 email = "";
 password = "";
 dataUser = new infoUser();
 errorMessage = ''; // validation error handle
 error: { name: string, message: string} = {name: '', message: ''}; // control error firebase

  constructor(private firebaseService: FirebaseService, private router: Router, private backService: BackService) {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    if (this.datosUsuarioLoggedIn != null) {
      this.firebaseService.signOut();
    }
  }

  ngOnInit() {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = {name : '' , message:''};
  }

  validateFormLogin(email,password){
    if (email.length === 0 ) {
      this.errorMessage = "Please enter the email";
      return false;
    }
    if (password.length === 0 ) {
      this.errorMessage = "Please enter the password";
      return false;
    }
    if (password.length < 6) {
      this.errorMessage = "The password must be at least 6 characters";
      return false;
    }
    this.errorMessage = "";
    return true;
  }

  onSigninFacebook(){
  this.clearErrorMessage();
  this.firebaseService.loginWithFacebook()
  .then(() => {
    this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
    this.dataUser.uid = this.datosUsuarioLoggedIn.user.uid;
    this.dataUser.displayName = this.datosUsuarioLoggedIn.user.displayName;
    this.dataUser.email = this.datosUsuarioLoggedIn.user.email;
    this.backService.postPlayer(this.dataUser);
    this.router.navigate(['/main'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
  }

  onSigninGoogle(){
    this.clearErrorMessage();
    this.firebaseService.loginWithGoogle()
    .then(() => {
      this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
      this.dataUser.uid = this.datosUsuarioLoggedIn.user.uid;
      this.dataUser.displayName = this.datosUsuarioLoggedIn.user.displayName;
      this.dataUser.email = this.datosUsuarioLoggedIn.user.email;
      this.backService.postPlayer(this.dataUser)
        .subscribe((data:any)=>{
          if (data.FamilyList == undefined) {
            //localStorage.setItem('FamilyList',JSON.stringify(''))
            localStorage.setItem('ListName',JSON.stringify(''))
          }else {
            localStorage.setItem('FamilyList',JSON.stringify(data.FamilyList))
            localStorage.setItem('ListName',JSON.stringify(data.ListName))
          }
        });
      this.router.navigate(['/main'])
    }).catch(_error => {
      this.error = _error
      this.router.navigate(['/login'])
    })
  }

  onSignin(){
    this.clearErrorMessage();
    if (this.validateFormLogin(this.email, this.password)) {
      this.firebaseService.loginWithEmail(this.email, this.password)
      .then(() => {
        this.datosUsuarioLoggedIn = JSON.parse(localStorage.getItem('user'));
        this.dataUser.uid = this.datosUsuarioLoggedIn.user.uid;
        this.dataUser.displayName = this.datosUsuarioLoggedIn.user.displayName;
        this.dataUser.email = this.datosUsuarioLoggedIn.user.email;
        this.backService.postPlayer(this.dataUser)
          .subscribe((data:any)=>{
            if (data.FamilyList == undefined) {
              localStorage.setItem('FamilyList',JSON.stringify(''))
              localStorage.setItem('ListName',JSON.stringify(''))
            }else {
              localStorage.setItem('FamilyList',JSON.stringify(data.FamilyList))
              localStorage.setItem('ListName',JSON.stringify(data.FamilyName))
            }
          });
        this.router.navigate(['/main'])
      }).catch(_error => {
        this.error = _error
        this.router.navigate(['/login'])
      })
    }
  }


}
