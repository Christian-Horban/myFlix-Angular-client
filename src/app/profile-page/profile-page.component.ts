import { Component, Input, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Defines the structure for a User.
 */
type User = {
  _id?: string;
  Username?: string;
  Password?: string;
  Email?: string;
  FavoriteMovies?: [];
};

/**
 * A component representing the user's profile page.
 */
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  /** Holds the user details */
  user: User = {};

  /** Holds user data to be updated */
  @Input() userData = { Username: '', Password: '', Email: '' };

  /**
   * Constructs the ProfilePageComponent.
   *
   * @param fetchApiData Service for fetching API data.
   * @param snackBar Snackbar service for showing notifications.
   * @param router Service for routing.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle method called on component initialization.
   */
  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;
    this.userData = {
      Username: user.Username || '',
      Email: user.Email || '',
      Password: '',
    };
  }

  /**
   * Retrieves the user data stored in localStorage.
   *
   * @returns The user data.
   */
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Updates the user data using the provided service and updates localStorage.
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.user = result;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000,
      });
    });
  }
}
