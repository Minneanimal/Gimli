import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user = this.afAuth.auth.currentUser;

  constructor(private afAuth: AngularFireAuth, private fb: FormBuilder) {}

  authForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
   /*  state: [null, Validators.required], */
  });

  loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider)
      .then(res => {
        resolve(res);
      });
    });
  }

  loginWithCredentials(credentials) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  register(credentials) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
      });
  }
}
