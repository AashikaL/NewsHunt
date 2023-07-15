import { Injectable } from '@angular/core';
import { Firestore, collectionData, getDoc, doc, setDoc, docData,  } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicePageService {

  constructor(private firestore: Firestore, public auth: AngularFireAuth) { }

  get() {
    console.log('service');
    const newsRef = collection(this.firestore, 'feeds');
    return collectionData(newsRef,{idField: 'docId'})
  }
  
  getById(docId: any): Observable<any> {
    const news = doc(this.firestore, `feeds/${docId}`);
    return docData(news,{idField: 'docId'}) as Observable<any>;
  }
  async add(news: any) {
    const addNewsRef = collection(this.firestore, 'feeds');
    return await addDoc(addNewsRef, news);
  }
  delete(news: any) {
    const deleteNews = doc(this.firestore, `feeds/${news.docId}`);
    return deleteDoc(deleteNews);
  }
  // delete(db:any){
  //   const cityRef = db.collection('feeds').
  // }
  async update(news: any) {
    const updateNews = doc(this.firestore, `feeds/${news.docId}`);
    return await updateDoc(updateNews, { heading: news.heading, publish: news.publish, author: news.author, content: news.content })
  }
  getOverview(news: any) {
    console.log('news id', news.docId);
    const items = collection(this.firestore, `feeds/${news.docId}`);
    return getDoc(doc(this.firestore, `feeds/${news.docId}`))
  }
  
  signInWithGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
  }
  signIn(user: { email: string, password: string }) {
    return this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }
  login(user: { email: string, password: string }) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }
  forgetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
  signOut() {
    return this.auth.signOut().then((val) => {
      window.alert('Logged out!');
    });
  }
}


