import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * A component representing the user login form.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /** Holds the user data for login */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Constructs the UserLoginFormComponent.
   *
   * @param fetchApiData Service for fetching API data.
   * @param dialogRef Reference to the dialog opened.
   * @param snackBar Snackbar service for showing notifications.
   * @param router Service for routing.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle method called on component initialization.
   */
  ngOnInit(): void {}

  /**
   * Sends the user data to the backend for authentication. On successful login,
   * user data and token are stored in localStorage and the user is navigated to the movies page.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        this.snackBar.open('user logged in successfully!', 'OK', {
          duration: 2000,
        });

        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
