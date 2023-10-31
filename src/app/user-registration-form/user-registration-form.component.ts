import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * A component representing the user registration form.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /** Holds the user data for registration */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Constructs the UserRegistrationFormComponent.
   *
   * @param fetchApiData Service for fetching API data.
   * @param dialogRef Reference to the dialog opened.
   * @param snackBar Snackbar service for showing notifications.
   * @param router Service for routing.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle method called on component initialization.
   */
  ngOnInit(): void {}

  /**
   * Sends the user data to the backend for registration. On successful registration,
   * the user is automatically logged in, their data and token are stored in localStorage,
   * and the user is navigated to the movies page.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('user registered successfully!', 'OK', {
          duration: 2000,
        });

        // log user in and navigate to movies
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', result.token);
          this.router.navigate(['movies']);
        });
      },
      (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
