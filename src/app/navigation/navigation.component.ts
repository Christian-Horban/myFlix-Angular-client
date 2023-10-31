import { Component } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * A component representing the navigation bar.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavbarComponent {
  /**
   * Constructs the NavbarComponent.
   *
   * @param fetchApiData Service for fetching API data.
   * @param router Service for routing.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public router: Router
  ) {}

  /**
   * Logs out the user by removing user and token from localStorage and navigates to the welcome page.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }
}
