import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService
  ){}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  

  downloadPdf(){
    this.filesService.getFile('myPDF', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf' )
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file){
      this.filesService.uploadFiles(file)
      .subscribe(rta => {
        this.imgRta = rta.location;
  
      })
    }

  }
}
