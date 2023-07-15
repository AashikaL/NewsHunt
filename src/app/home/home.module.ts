import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { Firestore} from 'firebase/firestore';
import { ServicePageService } from '../firebase-service-page.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FormsModule,
  ],
  declarations: [HomePage],
  providers: [ServicePageService]
})
export class HomePageModule {}
