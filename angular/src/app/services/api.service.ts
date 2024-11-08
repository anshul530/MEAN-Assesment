import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient, private LoaderService: LoaderService) { }

  getData(url: string) {
    this.LoaderService.showLoader();
    return this.http.get(environment.baseUrl + url, {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Cache-Control', 'no-cache').append('Access-Control-Allow-Credentials', 'true')
    });
  }

  postData(url: string, data?: any, type = "") {
    this.LoaderService.showLoader();
      return this.http.post(environment.baseUrl + url, data, {
        headers: new HttpHeaders().append('Content-Type', 'application/json').append('Cache-Control', 'no-cache').append('Access-Control-Allow-Credentials', 'true')
      });
  }

  handleError() {
    this.LoaderService.hideLoader();
  }


}