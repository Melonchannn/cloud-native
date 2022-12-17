import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {VideoService} from "../../../service/video.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  updateForm = this.fb.nonNullable.group({
    videoName: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  loading = false;

  constructor(public config: DynamicDialogConfig, private fb: FormBuilder, public ref: DynamicDialogRef, private messageService: MessageService, private videoService: VideoService) { }

  ngOnInit(): void {
  }

  updateVideo() {
    const { videoName, description } = this.updateForm.controls;
    videoName.markAsDirty();
    videoName.updateValueAndValidity();
    description.markAsDirty();
    description.updateValueAndValidity();
    if (videoName.invalid || description.invalid) {
      return;
    }

    this.loading = true;

    const data = new FormData();
    data.append('videoName', String(this.updateForm.value.videoName));
    data.append('description', String(this.updateForm.value.description));

    this.videoService.updateVideo(this.config.data, data)
      .subscribe(res => {
        if (res.msg == 'ok') {
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Update success'});
          this.loading = false;
          setTimeout(() =>{
            location.reload();
          },1000)
          return;
        }
      });
  }
}
