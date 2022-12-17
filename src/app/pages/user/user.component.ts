import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../service/video.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {EditComponent} from "../home/edit/edit.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  q = {
    pi: 1,
    ps: 18,
    total: 0,
  };

  q2 = {
    pi: 1,
    ps: 8,
    total: 0,
  };


  list: any[] = [];

  follows: any[] = [];

  userId = sessionStorage.getItem('userId');

  userId2 = this.activatedRoute.snapshot.queryParams['userId2'];

  username2 = this.activatedRoute.snapshot.queryParams['username2'];

  loading = true;

  constructor(private dialogService: DialogService, private confirmationService: ConfirmationService, private messageService: MessageService, private userService: UserService, private activatedRoute: ActivatedRoute, private videoService: VideoService, private router: Router) { }

  ngOnInit(): void {
    this.getUserVideo();
    this.getUserFollow();
  }

  getUserVideo(): void {
    this.videoService.getUserVideo(this.userId2,this.q.ps * (this.q.pi - 1), this.q.ps)
      .subscribe(res => {
        this.list = res.data;
        this.q.total = res.total;
        this.loading = false;
      });
  }

  getUserFollow(): void {
    this.userService.getUserFollow(this.userId2,this.q2.ps * (this.q2.pi - 1), this.q2.ps)
      .subscribe(res => {
        this.follows = res.data;
        this.q2.total = res.total;
      });
  }

  removeFollow(event: Event, followId: any): void {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Are you sure to cancel the following?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.removeFollow(followId)
          .subscribe(res => {
            if (res.msg == 'ok') {
              this.messageService.add({severity:'success', summary:'Success', detail:'Remove success'});
              this.getUserFollow();
            }
          });
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      }
    });
  }

  deleteVideo(event: Event, videoId: any): void {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Are you sure to delete the video?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.videoService.deleteVideo(videoId)
          .subscribe(res => {
            if (res.msg == 'ok') {
              this.messageService.add({severity:'success', summary:'Success', detail:'Delete success'});
              this.getUserVideo();
            }
          });
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      }
    });
  }

  show(videoId: any): void {
    const ref = this.dialogService.open(EditComponent, {
      header: 'Update video',
      width: '40%',
      data: videoId
    });
  }

  goDetail(id: any): void {
    this.router.navigate(['/home/detail'], { queryParams: { videoId: id }})
  }

  goUserInfo(userIdFollow: any, userNameFollow: any): void {
    this.router.navigate(['/userInfo'], { queryParams: { userId2: userIdFollow, username2: userNameFollow }});
    setTimeout(() =>{
      window.location.reload();
    },500)
  }

  paginate(event: { page: any; }) {
    this.q.pi = event.page + 1;
    this.getUserVideo();
  }

  paginate2(event: { page: any; }) {
    this.q2.pi = event.page + 1;
    this.getUserFollow();
  }
}
