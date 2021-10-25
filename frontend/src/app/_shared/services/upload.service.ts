import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsUrl } from '../utils/utils-url';
import Swal from "sweetalert2";

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

  public imageCheckType(fileType: string): boolean{
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(fileType)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong image type, We only support .jpg .jpeg .png',
      });
      return false;
    }
    return true;
  }
}
