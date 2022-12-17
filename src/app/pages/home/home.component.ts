import { Component, OnInit } from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {VideoService} from "../../service/video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  q = {
    pi: 1,
    ps: 6,
    total: 0,
  };

  loading = true;

  user = sessionStorage.getItem('userId');

  list: any[] = [];

  list2: any[] = [];

  constructor(private dialogService: DialogService, private videoService: VideoService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.videoService.getAllVideo(this.q.ps * (this.q.pi - 1), this.q.ps)
      .subscribe(res => {
        this.list = res.data;
        this.list2 = this.list.slice(0,3);
        this.q.total = res.total;
        this.loading = false;
      });
  }

  goDetail(id: any): void {
    this.router.navigate(['/home/detail'], { queryParams: { videoId: id }})
  }

  paginate(event: { page: any; }) {
    this.q.pi = event.page + 1;
    this.getData();
  }

}
