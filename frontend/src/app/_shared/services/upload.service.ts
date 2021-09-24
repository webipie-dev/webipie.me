import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsUrl } from '../utils/utils-url';

@Injectable({
  providedIn: 'root'
})
export class UploadService{

  url = UtilsUrl.url;
  suffix = '/upload';
  constructor(protected http: HttpClient) {}

  cvUpload(body: any): Promise<any>{
    return this.http.post(this.url + this.suffix + '/cv', body).toPromise();
  }

  imageUpload(body: any): Promise<any>{
    return this.http.post(this.url + this.suffix + '/image', body).toPromise();
  }

  videoUpload(body: any): Promise<any>{
    return this.http.post(this.url + this.suffix + '/video', body).toPromise();
  }

  imageMultipleUpload(body: any): Promise<any>{
    return this.http.post(this.url + this.suffix + '/multi/image', body).toPromise();
  }
}
