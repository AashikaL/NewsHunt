import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicePageService } from '../firebase-service-page.service';
import { Router, RouterLink } from '@angular/router';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        RouterLink,
    ],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  constructor(private service: ServicePageService,private router:Router,private alertCtrl:AlertController, private loadingController: LoadingController) { 
    this.loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  }
  ngOnInit() {
  }
  async login(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    console.log(this.loginForm.value)
    const userData = Object.assign(this.loginForm.value, {email: this.loginForm.value.email})
    this.service.login(userData).then((res:any)=>{
      this.router.navigate(['/home']);
    }, async error => {
      const alert = await this.alertCtrl.create({
        message: 'Invalid email and password',
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      await alert.present();
    });
  }
async  loginWithGoogle(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    console.log('click')
    this.service.signInWithGoogle().then((res:any)=>{
      this.router.navigate(['/home']);
    }).catch((error:any)=>{
      console.log(error);
    })
  }

}
