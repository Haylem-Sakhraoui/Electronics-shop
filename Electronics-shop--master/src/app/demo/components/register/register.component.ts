import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router'; // Import the correct module for Router
import { RegisterRequest } from '../../api/registerRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  firstName!:string
  lastName!:string
  email!: string;
  password!: string;
  
    constructor(private authService: AuthService, private router: Router) { }
  
    register() {
      const request: RegisterRequest = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
  
      this.authService.register(request).subscribe({
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
    }
  

}
