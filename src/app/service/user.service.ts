import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Response } from '../types';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  register(data: any): Observable<Response> {
    return this.http.post<Response>('https://prod-09.centralus.logic.azure.com:443/workflows/714b8a1887e0420ea3cd052146d4cfc6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mbEllDT_tVbApJntHhEJHmKgMHfMNBcldFk1Xh0rUZY',data)
  }

  login(data: any): Observable<Response> {
    return this.http.post<Response>('https://prod-11.centralus.logic.azure.com:443/workflows/e781af87395543ada402b948996f8fbf/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q8xo4lI6seCkTy1orWGPQwF1axITa_X1fmMPsJOP4Ds',data)
  }

  follow(data: any): Observable<Response> {
    return this.http.post<Response>('https://prod-28.centralus.logic.azure.com:443/workflows/bb5e79864b524b57a7f52cdbb1558ebc/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=jB3zSKzZ-pVH74RSF4CXz7paQnWPX4Hk_r1SVMzyUiQ',data)
  }

  isFollowed(userId: any, userIdFollow: any): Observable<Response> {
    return this.http.get<Response>('https://prod-03.centralus.logic.azure.com/workflows/8e1a643db0fe4c47b8ebad2ff833ca9d/triggers/manual/paths/invoke/'+ userId +'/'+ userIdFollow +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=eVWEVAspP4jjafMr5sVBdZz9hByvDxAjyw_094ugeSw')
  }

  removeFollow(followId: any): Observable<Response> {
    return this.http.delete<Response>('https://prod-17.centralus.logic.azure.com/workflows/6fcd8081f9374c989c4e785470774ec3/triggers/manual/paths/invoke/'+ followId +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=loNQcRsTMYekRntoawAV0YPDvoIE7RJPvJE8NyvPgwQ')
  }

  getUserFollow(userId: any, pageNum: number, pageSize: number): Observable<Response> {
    return this.http.get<Response>('https://prod-30.centralus.logic.azure.com/workflows/6a54610232c744189bbe5bac15339d92/triggers/manual/paths/invoke/'+ userId +'/'+ pageNum +'/'+ pageSize +'?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=316rAyW6rToCfIpTrHYzXYWYM9SiJSmvDW7f-m5sBn8')
  }
}
