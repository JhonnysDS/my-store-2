import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService

  ){}

  ngOnInit(){
    //Verifica si el token existe para mantener logueado el usuario, aún cuando recargue la pagina
    const token = this.tokenService.getToken()
    
    if(token){
      this.authService.getProfile()
      .subscribe()
    }
  }

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
