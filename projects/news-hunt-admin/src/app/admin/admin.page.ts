import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Observable, tap } from 'rxjs';
import { ServicePageService } from 'src/app/firebase-service-page.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
   items :any[] =[];
  constructor(private service: ServicePageService,
    private loadingController: LoadingController,
    private alertctrl: AlertController,
    private modalCtrl: ModalController) {
      this.service.get().subscribe(res =>{
        this.items = res;
      })
     }
     ngOnInit() {
    }

 async openModal(item:any){
  console.log('feed',item.id)
    const modal = await this.modalCtrl.create({
    component: ModalPage,
    componentProps: {id: item.docId},
    breakpoints: [0, 0.5, 0.8],
    initialBreakpoint: 0.5,
  });
    modal.present()
  }

  async toAdd() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    const alter = await this.alertctrl.create({
      header: 'Add News',
      inputs: [{
        name: 'heading',
        placeholder: 'Heading',
        type: 'text'
      },
      {
        name: 'author',
        placeholder: 'author',
        type: 'text'
      },
      {
        name: 'content',
        placeholder: 'content',
        type: 'textarea'
      },
      {
        name: 'publish',
        placeholder: 'publish',
        type: 'text'
      },
      {
        name: 'image',
        placeholder: 'image',
        type: 'text'
      },],
      buttons: [{
        text: 'Cancel',
        role: 'Cancel'
      },
      {
        text: 'Add',
        handler: (res) => {
          console.log('ass',res);
          this.service.add({
            heading: res.heading,
            author: res.author,
            content: res.content,
            publish: res.publish,
            image: res.image,
          }).catch((error:any)=>{
            console.log(error);
          })
        }
      }]
    });
    await alter.present();
  }
  
}
