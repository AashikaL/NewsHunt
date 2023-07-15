import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePageService } from '../firebase-service-page.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  signupForm!: FormGroup;
  public email:any;
  public password:any;
  public name:any;
  constructor(private router: Router, public service: ServicePageService, private loadingController:LoadingController) { 
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

  }
 async singUp(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    console.log(this.signupForm.value)
    const userData = Object.assign(this.signupForm.value, {email: this.signupForm.value.email})
    this.service.signIn(userData).then((res:any)=>{
      this.router.navigate(['/login']);
    }).catch((error:any)=>{
      console.log(error);
    })
    }
   async signupWithGoogle(){
      const loading = await this.loadingController.create({
        //cssClass: 'my-custom-class',
        message: 'Please wait...',
        spinner: 'bubbles',
        duration: 2000,
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
      this.service.signInWithGoogle().then((res:any)=>{
        this.router.navigate(['/home']);
      }).catch((error:any)=>{
        console.log(error);
      })
    }
  }

 


