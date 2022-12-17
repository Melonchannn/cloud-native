import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../types';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class VideoService {
  constructor(private http: HttpClient) { }

  addVideo(data: any): Observable<Response> {
    return this.http.post<Response>('https://prod-16.centralus.logic.azure.com:443/workflows/b65e197093c242359726fdd70981f795/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=EoD_g1bSpReLUqlFxIw6xfqCjepSFErWi-XcZGMg_nE',data)
  }

  getAllVideo(pageNum: number, pageSize: number): Observable<Response> {
    return this.http.get<Response>('https://prod-28.centralus.logic.azure.com/workflows/28b209eb1c6e4671b7a2babe4c1f0005/triggers/manual/paths/invoke/'+ pageNum +'/'+ pageSize +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=kkUOIj_X4TUcICTcOlSPCGvPAJpJ9kwbDG4W_TaobFM')
  }

  getVideoDetail(videoId: any): Observable<Response> {
    return this.http.get<Response>('https://prod-13.centralus.logic.azure.com/workflows/3c8e73784f574596b85fb2b084492e80/triggers/manual/paths/invoke/'+ videoId +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xVPitWhsdabZFCPNBei3gxw4fUXNZpb8tsWWnPmGxZc')
  }

  getUserVideo(userId: any, pageNum: number, pageSize: number): Observable<Response> {
    return this.http.get<Response>('https://prod-30.centralus.logic.azure.com/workflows/9b9c8b3c425a4d5a967220a446c7aea2/triggers/manual/paths/invoke/'+ userId +'/'+ pageNum +'/'+ pageSize +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mpWLAgDOfObuaddgX9iOjuHx48mbI1h_bJlp9tMBxC4')
  }

  deleteVideo(videoId: any): Observable<Response> {
    return this.http.delete<Response>('https://prod-24.centralus.logic.azure.com/workflows/a029c6bf601e4184a7e1f4c1be50170f/triggers/manual/paths/invoke/'+ videoId +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6rOGDY7el1pIzkaeA3M51z6eJ72oCk-OZeTZpr8maZc')
  }

  updateVideo(videoId: any, data: any): Observable<Response> {
    // @ts-ignore
    return this.http.put<Response>('https://prod-13.centralus.logic.azure.com/workflows/d96a53300d1f41cba8fc18032f59725a/triggers/manual/paths/invoke/'+ videoId +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LIw5KvFvcUdcByiUVndM4Dow3wIBZlYPWz3JsWsfxl0', data)
  }
}
