import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const API = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class ServicosService {

  id: any;

  constructor(private http: HttpClient) {}

  listarGrid() {
   return this.http.get(API + '/eventos')
  }

  selectFiltro(status:any) {
    return this.http.get(`${API}/eventos?statusConfiguracao.idStatus=${status}`)
  }

  dadosFiltro(dados:any) {
    return this.http.get(`${API}/eventos?codigoNome=${dados}`)
  }

  dadosFiltroNome(dados:any) {
    return this.http.get(`${API}/eventos?responsavel=${dados}`)
  }

  //http://localhost:3000/eventos?_page=1&_limit=2
  //<http://localhost:3000/eventos?_page=1&_limit=2>; rel="first", <http://localhost:3000/eventos?_page=2&_limit=2>; rel="next", <http://localhost:3000/eventos?_page=11&_limit=2>; rel="last"

  carregarPaginacao(pagina:any, valor: any) {
    return this.http.get(`${API}/eventos?_page=${pagina}&_limit=${valor}`)
  }

  proximaPagina(pagina:any, valor: any) {
    return this.http.get(`${API}/eventos?_page=${pagina}&_limit=${valor}`)
  }

  carregarItem() {
    return this.http.get(`${API}/eventos?id=${this.id}`)
  }

  public notificar(evento:any) {   
    this.id = evento.id
    this.carregarItem();
  }

  salvarEvento(id:number, body:any) {
    const url = `${API}/eventos/${id}`
    return this.http.patch(url, body)
  }
}
