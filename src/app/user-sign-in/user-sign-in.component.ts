import { Component, OnInit } from '@angular/core';

import { ToastrService} from 'ngx-toastr';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.scss']
})
export class UserSignInComponent implements OnInit {

  constructor(private toastr: ToastrService,
              private router: Router) { }
  username = "";
  password = "";
  error: string;
  /**
   * By default reCapthca is hidden. It will be shown after a wrong password is entered.
   */
  recaptchaEnabled = false;
  recaptchaSiteKey?: string;
  showOnlyReCaptcha = false;
  failedLoginAttempts = 0;
  recaptchaToken = "";

  /**
   * If true, allows google login to catalog.
   */
  isGoogleSigninVisible = false;

  /**
   * If true, allows only google login to the catalog.
   */
  isOnlyGoogleSignin = false;

  /**
   * If true, the partner is using hosted domain login, and we need to hide the G logo.
   */
  isHostedDomain = false;

  ngOnInit(): void {
  }

  signIn(){
    if(this.username === '') return this.toastr.error("Please enter Username.");
    if(this.password === '') return this.toastr.error("Please enter Password.");
    if(this.username !== 'admin') return this.toastr.error('Please Enter valid credential');
    if(this.password !== 'admin$123') return this.toastr.error('Please Enter valid credential');
    this.router.navigateByUrl('/landing');
  }

}
