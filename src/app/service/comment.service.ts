import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../types';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  constructor(private http: HttpClient) { }

  addComment(data: any): Observable<Response> {
    return this.http.post<Response>('https://prod-00.centralus.logic.azure.com:443/workflows/b15c9798852940d6a54bfecbdabc56c5/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=51QoK9xcevhqS_6Ikkgc0ALnKENGysVVnPNHPpq-BK8',data)
  }

  getComment(videoId: any): Observable<Response> {
    return this.http.get<Response>('https://prod-19.centralus.logic.azure.com/workflows/607a08788c63495d8797980d750178a5/triggers/manual/paths/invoke/'+ videoId +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=VtOx0Y8oyT136scOiJQyyjgVqaDZ4xqWUQhrBw_GfB0')
  }

  getVideoDetail(videoId: any): Observable<Response> {
    return this.http.get<Response>('https://prod-13.centralus.logic.azure.com/workflows/3c8e73784f574596b85fb2b084492e80/triggers/manual/paths/invoke/'+ videoId +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xVPitWhsdabZFCPNBei3gxw4fUXNZpb8tsWWnPmGxZc')
  }

  deleteComment(commentId: any): Observable<Response> {
    return this.http.delete<Response>('https://prod-07.centralus.logic.azure.com/workflows/1a67402a510d4fdea8bf9fc9bdd612d7/triggers/manual/paths/invoke/'+ commentId + '?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=u2mGD6aOI8HosBkq7dzxr7sY8fQb4yB3EftyfjyCTTg')
  }
}
