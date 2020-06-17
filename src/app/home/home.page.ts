import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public cep: any;

  constructor(
    public rota: Router
  ) {}

  enviaCep(){
    this.rota.navigate(['detalhes'], {queryParams: {cep: this.cep}});
  }

}
