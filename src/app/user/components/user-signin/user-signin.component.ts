import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logger } from 'src/app/core/helpers/logger.spec';
import { AddSnackService } from 'src/app/core/services/add-snack.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.scss'],
})
export class UserSigninComponent implements OnInit {
  public signinForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router //private snackBar: AddSnackService
  ) {}

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      login: [
        '', //Default value of login
        Validators.required,
      ],
      pass: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.userService.signin(this.signinForm.value);
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/', 'interns']);
      Logger.info('Got a user');
    } else {
      this.signinForm.reset();
      //this.snackBar.showSnackBar('Login or password false');
      /*      this.hasError = true;
      setTimeout(() => (this.hasError = false), 2500); */
    }
  }

  /*   public close(): void {
    this.hasError = false;
  } */
}
