import { Component, OnInit } from '@angular/core';
import { ServicePageService } from '../firebase-service-page.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-overview',
  templateUrl: './news-overview.page.html',
  styleUrls: ['./news-overview.page.scss'],
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