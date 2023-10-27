import { Component, Input, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { UserRegistrationService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((data) => {
      this.dialogRef.close();
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token);
      this.snackBar.open('you\'ve been logged in', 'OK', {
        duration: 2000
      });
    }, (data) => {
      this.snackBar.open(data, 'OK', {
        duration: 2000
      });
    })
  }

}