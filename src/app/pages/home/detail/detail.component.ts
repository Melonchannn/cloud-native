import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../../../service/video.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CommentService} from "../../../service/comment.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  list: any[] = [];

  comment: any[] = [];

  recommend: any[] = [];

  username2 = '';

  userId2 = '';

  loading = true;

  loading2 = true;

  loading3 = true;

  isFollow = false;

  userId = sessionStorage.getItem('userId');
  username = sessionStorage.getItem('username');


  commentForm = this.fb.nonNullable.group({
    text: ['', [Validators.required]],
  });

  constructor(private router: Router, private confirmationService: ConfirmationService, private userService: UserService, private messageService: MessageService, private activatedRoute: ActivatedRoute, private videoService: VideoService, private fb: FormBuilder, private commentService: CommentService) { }

  ngOnInit(): void {
    this.getData();
    this.recommendVideo();
  }

  getData(): void {
    this.videoService.getVideoDetail(this.activatedRoute.snapshot.queryParams['videoId'])
      .subscribe(res => {
        this.list = res.data;
        this.username2 = res.data[0].username;
        this.userId2 = res.data[0].userId;
        this.isFollowed(res.data[0].userId);
        this.loading = false;
      });
  }

  getComment(): void {
    this.commentService.getComment(this.activatedRoute.snapshot.queryParams['videoId'])
      .subscribe(res => {
        this.comment = res.data;
        this.loading2 = false;
      });
  }

  post(): void {
    const { text } = this.commentForm.controls;
    text.markAsDirty();
    text.updateValueAndValidity();
    if (text.invalid) {
      return;
    }

    const data = new FormData();
    data.append('text', String(this.commentForm.value.text));
    data.append('userId', String(this.userId));
    data.append('username', String(this.username));
    data.append('videoId', String(this.activatedRoute.snapshot.queryParams['videoId']));
    data.append('videoName', String(this.list[0].videoName));

    this.commentService.addComment(data)
      .subscribe(res => {
        if (res.msg == 'ok') {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Post success'});
          this.loading2 = true;
          this.getComment();
        }
      })
  }

  follow(): void {
    const data = new FormData();
    data.append('userId', String(this.userId));
    data.append('userIdFollow', String(this.list[0].userId))
    data.append('userNameFollow', String(this.list[0].username));

    if (this.userId == null) {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Please login first'});
      return;
    }

    this.userService.follow(data)
      .subscribe(res => {
        if (res.msg == 'ok') {
          this.isFollow = true;
        }
      });
  }

  isFollowed(userIdFollow: any): void {
    this.userService.isFollowed(sessionStorage.getItem('userId'), userIdFollow)
      .subscribe(res => {
        if (res.msg == 'ok') {
          this.isFollow = true;
          return;
        }
      })
  }

  goDetail(id: any): void {
    this.router.navigate(['/home/detail'], { queryParams: { videoId: id }});
    setTimeout(() =>{
      window.location.reload();
    },500)
  }

  recommendVideo(): void {
    console.info(Math.floor(Math.random()*3))
    this.videoService.getAllVideo(Math.floor(Math.random()*3),6)
      .subscribe(res => {
        this.recommend = res.data;
        this.loading3 = false;
      });
  }

  deleteComment(event: Event,commentId: any): void {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Are you sure to delete the comment?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.commentService.deleteComment(commentId)
          .subscribe(res => {
            if (res.msg == 'ok') {
              this.messageService.add({severity:'success', summary:'Success', detail:'Delete success'});
              this.getComment();
            }
          });
      },
      reject: () => {
        this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
      }
    });
  }

  goUserInfo(userId2: any): void {
    this.router.navigate(['/userInfo'], { queryParams: { userId2: userId2, username2: this.username2 }});
  }
}
