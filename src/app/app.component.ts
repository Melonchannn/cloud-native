import { Component } from '@angular/core';
import {AddComponent} from "./pages/home/add/add.component";
import {DialogService} from "primeng/dynamicdialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cby';

  constructor(private dialogService: DialogService, private router: Router) { }

  user = sessionStorage.getItem('userId');

  show(): void {
    const ref = this.dialogService.open(AddComponent, {
      header: 'Release a video',
      width: '45%'
    });
  }

  logout(): void {
    sessionStorage.clear();
  }

  goUserInfo(userId2: any): void {
    this.router.navigate(['/userInfo'], { queryParams: { userId2: userId2, username2: sessionStorage.getItem('username') }});
    setTimeout(() =>{
      window.location.reload();
    },500)
  }
}
