import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController, IonicModule } from '@ionic/angular';

import { ServicePageService } from 'src/app/firebase-service-page.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        NgIf,
        FormsModule,
    ],
})
export class ModalPage implements OnInit {
  @Input() id: any;
  items: any = [];
  constructor(private service: ServicePageService, private modalCtrl: ModalController, private toastCtrl: ToastController) { }
  ngOnInit() {
    this.service.getById(this.id).subscribe(res => {
      this.items =res;
      console.log('id',this.id)
    })
    // this.items = this.data;
    // console.log('data', this.data);
  }
  async update() {
    console.log('update', this.items);
    await this.service.update(this.items);
    const toast = await this.toastCtrl.create({
      message: 'News updated!',
      duration: 1000
    })
    toast.present();
  }
  delete() {
    this.service.delete(this.items);
    this.modalCtrl.dismiss();
    console.log('delete', this.items)
  }

}
