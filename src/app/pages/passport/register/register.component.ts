import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [Validators.required, Validators.minLength(6)]],
    });

  msg = {
    error: ''
  };

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  register(): void {
    this.msg.error = '';

    const { username, password, email } = this.registerForm.controls;
    username.markAsDirty();
    username.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    email.markAsDirty();
    email.updateValueAndValidity();
    if (username.invalid || password.invalid || email.invalid) {
      return;
    }

    if (this.registerForm.value.password != this.registerForm.value.confirm) {
      this.msg.error = 'The passwords entered twice do not match!'
      return;
    }

    const data = new FormData();
    data.append('username',String(this.registerForm.value.username));
    data.append('email',String(this.registerForm.value.email));
    data.append('password',String(this.registerForm.value.password));
    data.append('confirm',String(this.registerForm.value.confirm));

    this.userService.register(data)
      .subscribe(res => {
        if (res.msg != 'ok') {
          this.msg.error = 'Register failed, please check!'
        }
      });

    this.messageService.add({severity:'success', summary: 'Success', detail: 'Register success', sticky: true});

    setTimeout(() =>{
      this.router.navigateByUrl('/login');
    },2500)
  }
}
