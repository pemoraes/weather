import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  public Consulta: any;
  public informacoes: any;
  public temp: any;
  public tempMinima: any;
  public tempMaxima: any;
  public notFound: any = null;

  constructor(
    private http: HttpClient,
    public rotaAtiva: ActivatedRoute) { 
    this.rotaAtiva.queryParams.subscribe((data)=>{
      this.Consulta = data.cep;
      this.verificarClima();
    });
  }

  ngOnInit() {}

verificarClima() {
   
    let url: string = "http://api.openweathermap.org/data/2.5/weather?q=" + this.Consulta + ",&appid=21bb2d53592ca837c5dc6883a580f7aa";

    this.http.get(url).subscribe((response: any)=>{
      this.notFound = null;
      this.informacoes = response;
      console.log(this.informacoes);

      this.temp = (this.informacoes.main.temp -273) * 5/9;
      this.temp = this.temp.toFixed(2);

      this.tempMinima = (this.informacoes.main.temp_min -273) * 5/9;
      this.tempMinima = this.tempMinima.toFixed(2);

      this.tempMaxima = (this.informacoes.main.temp_max -273) * 5/9;
      this.tempMaxima = this.tempMaxima.toFixed(2);
      
    }, 
    (error: any) => {
      console.error(error);
      this.notFound = "erro";
      this.informacoes = null;
    });
  }

}
