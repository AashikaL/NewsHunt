import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsOverviewPageRoutingModule } from './news-overview-routing.module';

import { NewsOverviewPage } from './news-overview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsOverviewPageRoutingModule
  ],
  declarations: [NewsOverviewPage]
})
export class NewsOverviewPageModule {}
