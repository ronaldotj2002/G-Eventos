import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Md5 } from 'md5-typescript';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const USUARIOS: Usuario[] = [
  { "nome" : "Ronaldo", "senha" : Md5.init('12345') },
  { "nome" : "Ana", "senha" : Md5.init('54321') }, 
  { "nome" : "Davi", "senha" : Md5.init('6789') }
]

@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);
  usuarios: Usuario[] = USUARIOS;

  constructor(private router: Router) { 
    this.setLogado();
  }

  setLogado() {
    try {
      let USER_INFO = localStorage.getItem('USER_INFO');
      if(USER_INFO) {
        return true;
      }
      return false;
    } catch (error) {
      console.log('Error :', error);
      return false;
    }
  }

  login(usuario: Usuario) {
    let obj = {
      usuario_nome: usuario.nome,
      usuario_senha: usuario.senha
    };

    let usu = this.loginProvider(usuario);

    if(usu != null) {
      localStorage.setItem('USER_INFO', JSON.stringify(usuario));
      this.router.navigate(['eventos']);
      this.authState.next(true);
    }
  }

  loginProvider(usuario: Usuario){
    let usu = null;
    this.usuarios.forEach(x => {
      if(usuario.nome == x.nome && Md5.init(usuario.senha) == x.senha) {
        usu = x;
      } 
    });
    return usu;
  }

  

  estaAutenticado() {
    return this.authState.value;
  }
}
