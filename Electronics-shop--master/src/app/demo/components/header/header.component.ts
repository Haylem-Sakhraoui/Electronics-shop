import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { User } from '../../api/user'; // Import the 'User' class

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user!: User;
  isLo
  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.retrieveUserConnected(this.authService.getToken()).subscribe((res:any) => {
      this.user = res;

    });
    this.checkTokenAvailability();
  }
  logOut() {
    this.authService.logout();
  }
  
  checkTokenAvailability() {
    const token = localStorage.getItem('token'); // Supposons que le token soit stocké dans le stockage local

    // Vérifiez si le token est disponible
    if (token) {
        this.isLoggedIn = true;
    } else {
        this.isLoggedIn = false;
    }
    }


}
