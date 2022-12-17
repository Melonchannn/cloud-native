import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {VideoService} from "../../../service/video.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  releaseForm = this.fb.nonNullable.group({
    videoName: ['', [Validators.required]],
    imgFile: ['', [Validators.required]],
    videoFile: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  loading = false;

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, private messageService: MessageService, private videoService: VideoService) { }

  ngOnInit(): void {
  }

  release(): void {
    const { videoName, imgFile, videoFile, description } = this.releaseForm.controls;
    videoName.markAsDirty();
    videoName.updateValueAndValidity();
    imgFile.markAsDirty();
    imgFile.updateValueAndValidity();
    videoFile.markAsDirty();
    videoFile.updateValueAndValidity();
    description.markAsDirty();
    description.updateValueAndValidity();
    if (videoName.invalid || imgFile.invalid || videoFile.invalid|| description.invalid) {
      return;
    }

    this.loading = true;

    const video = $("#upVideo")[0] as HTMLInputElement
    const img = $("#upImg")[0] as HTMLInputElement

    const data = new FormData();
    data.append('videoName', String(this.releaseForm.value.videoName));
    // @ts-ignore
    data.append('img', img.files[0]);
    // @ts-ignore
    data.append('video', video.files[0]);
    data.append('description', String(this.releaseForm.value.description));
    data.append('userId', String(sessionStorage.getItem('userId')));

    this.videoService.addVideo(data)
      .subscribe(res => {
        if (res.msg == 'ok') {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Release success'});
          setTimeout(() =>{
            location.reload();
          },1000)
          return;
        }
    })
  }
}
