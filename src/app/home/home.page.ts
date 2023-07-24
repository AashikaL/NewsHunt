import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServicePageService } from '../firebase-service-page.service';
import { Observable, tap, interval } from 'rxjs';
import { AlertController, LoadingController, IonicModule } from '@ionic/angular';
import { MediaMatcher } from '@angular/cdk/layout';
import { Route, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    providers: [ServicePageService],
    standalone: true,
    imports: [IonicModule, RouterLink, NgIf, NgFor]
})
export class HomePage implements OnInit, OnDestroy {
  skeletonItems: any[] = Array(5).fill({});
  isDarkMode: boolean = false;
  isPhoneView: boolean;
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  newsFeeds :any[] =[];
  constructor(private service: ServicePageService,
    private alertctrl: AlertController,
    private mediaMatcher: MediaMatcher,
    private router: Router,
    public loadingController: LoadingController) {
    this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 600px)');
    this.isPhoneView = this.mobileQuery.matches;
    this.mobileQueryListener = () => {
      this.isPhoneView = this.mobileQuery.matches;
    };
    this.service.get().subscribe(res =>{
      this.newsFeeds = res;
    });
  }
  darkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark', this.isDarkMode);
  }
  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }
  SignOut(){
    this.service.signOut().then((res:any)=>{
      this.router.navigate(['/login'])
    })
  }
  ngOnInit() {
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  async newPage(item: any) {
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      spinner: 'bubbles',
      duration: 2000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    this.router.navigate(['/news-overview'], { state: { newsData: item } });
  }
}
