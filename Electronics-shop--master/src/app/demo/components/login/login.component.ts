import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateRequest } from '../../api/authenticateRequest';
import { AuthService } from '../../service/auth.service';
import { ForgetPasswordRequest } from '../../api/forgetRequest';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    email!: string;
    password!: string;
    forgetDialog: boolean = false;
  
    constructor(private authService: AuthService, private router: Router) { }
  
    login() {
      const request: AuthenticateRequest = {
        email: this.email,
        password: this.password,
      };
  
      this.authService.login(request).subscribe({
        next: (res: any) => {
          console.log("response", res);
          console.log("Message ==> ", res.body.message);
          if (res.body.status == 200) {
            localStorage.setItem('logged', "true");
            console.log(res.body.token);
            this.authService.setToken(res.body.body.token);
            this.authService.retrieveUserConnected(res.body.body.token);
            console.log('test after login');
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          console.error('Authentication failed:', err);
        },
      });
    }
    forgetPassword(){
      const forgetRequest:ForgetPasswordRequest = {
        email: this.email
      }
      this.authService.forgetPassword(forgetRequest.email).subscribe({
        next: (res: any) => {
          console.log("response", res);
          console.log("Message ==> ", res.body.message);
          if (res.body.status == 200) {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.error('Authentication failed:', err);
        },
      });
      
      this.forgetDialog = false;
      }

      openNew(): void {
        this.forgetDialog = true;
      }
    }

