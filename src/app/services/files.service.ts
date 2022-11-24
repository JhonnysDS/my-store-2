import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/Http';

import { map, tap } from 'rxjs/operators';
import {saveAs} from 'file-saver';
import { environment } from './../../environments/environment';

interface File{
  originalname: string,
  filename: string,
  location: string
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = `${environment.API_URL}/api/files`;

  constructor(
    private http: HttpClient,
  ) { }

 getFile(name: string, url: string, type: string){
    return this.http.get(url, {responseType: 'blob'})
    .pipe(
      tap(content => {
        const blob = new Blob([content], {type});
        saveAs(blob, name)
      }),
      map(()=> true)
    )
  }

  uploadFiles(file: Blob){
    const dto = new FormData();
    dto.append('file', file)
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, 
    // {
    // headers:{
    //   'content-type': "multipart/form-data"
    // }}
    )
  }

}