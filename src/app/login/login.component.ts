import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Usuario } from '../model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: any;
  usuario: Usuario = new Usuario('', '');   

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required]
    })   
  }

  loginUser() {    
    const nome =  this.formLogin.get('nome').value;
    const senha =  this.formLogin.get('senha').value;
    this.authService.login(this.usuario= {nome: nome, senha: senha});
    console.log(this.usuario);
  }



}