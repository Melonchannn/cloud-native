import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  msg = {
    error: ''
  };

  constructor(private userService: UserService, private fb: FormBuilder, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.msg.error = '';

    const { username, password } = this.loginForm.controls;
    username.markAsDirty();
    username.updateValueAndValidity();
    password.markAsDirty();
    password.updateValueAndValidity();
    if (username.invalid || password.invalid) {
      return;
    }

    const data = new FormData();
    data.append('username', String(this.loginForm.value.username));
    data.append('password', String(this.loginForm.value.password));

    this.userService.login(data)
      .subscribe(res => {
      if (res.msg != 'ok') {
        this.msg.error = 'Invalid user name or password';
        return;
      }

      this.messageService.add({severity:'success', summary: 'Success', detail: 'Login success'});

      sessionStorage.setItem('userId', res.data[0].id);
      sessionStorage.setItem('username', res.data[0].username);

      setTimeout(() =>{
        window.location.href = '/#/home';
        window.location.reload();
      },2500)
    });
  }
}
