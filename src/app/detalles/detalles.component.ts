import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../users';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  searchTerm: string = '';
  page = 1;
  pageSize = 10;
  collectionSize: number = 100;
  currentRate = 8;
  xUsers: Users[] = [];
  allxUsers: Users[] = [];
  userName: string ='';
  xUsuario! : string;


  constructor(private actRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.cargar();

    this.actRoute.paramMap.subscribe((params) => {
      this.xUsuario = params.get('login')!;
    });

    console.log(this.xUsuario);

    this.xUsers = this.allxUsers.filter((val) => val.login.toLowerCase().includes(this.xUsuario));

    this.collectionSize = this.xUsers.length;

  }

  cargar(){
      this.http
        .get<Users[]>('./assets/data/Users.json')
        .subscribe((data: Users[]) => {
          this.collectionSize = data.length;
          this.xUsers = data;
          this.allxUsers = this.xUsers;
        });
  }
}
