import { Component, OnInit } from '@angular/core';
import { ServicePageService } from '../firebase-service-page.service';
import { Observable, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-news-overview',
    templateUrl: './news-overview.page.html',
    styleUrls: ['./news-overview.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        RouterLink,
        NgIf,
    ],
})
export class NewsOverviewPage {
  items$!: Observable<any[]>;
  news: any
  constructor(private service : ServicePageService,private router:Router) { 
    this.news = history.state.newsData;
  }
  SignOut(){
    this.service.signOut().then((res:any)=>{
      this.router.navigate(['/login'])
    })
  }

}