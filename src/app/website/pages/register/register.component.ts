import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { onExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, onExit {

  constructor() { }

  ngOnInit(): void {
  }


  //Importamos el guardian, y la interfaz del exit para manejor el guardian con logica
  //desde este componente
  onExit(){
    const rta = confirm('Logic from component, are you sure to leave this site?');
    return rta;
  }
}
