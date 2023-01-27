import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../users';

@Component({
  selector: 'app-reactivo',
  templateUrl: './reactivo.component.html',
  styleUrls: ['./reactivo.component.scss']
})

export class ReactivoComponent implements OnInit {
  searchTerm: string = '';
  page = 1;
  pageSize = 10;
  collectionSize: number = 100;
  currentRate = 8;
  xUsers: Users[] = [];
  allxUsers: Users[] = [];
  userName: string ='';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.http
    .get<Users[]>('./assets/data/Users.json')
    .subscribe((data: Users[]) => {
      this.collectionSize = data.length;
      this.xUsers = data;
      this.allxUsers = this.xUsers;
    });
  }

  search(event: any): void {
    const searchFilter = event.target?.value;
    if(searchFilter.length>=4)
    {
      this.xUsers = this.allxUsers.filter((val) => val.login.toLowerCase().includes(searchFilter));
    }
    else
    {
      this.http.get<Users[]>('./assets/data/Users.json').subscribe((data: Users[]) => {
      this.collectionSize = data.length;
      this.xUsers = data;
      this.allxUsers = this.xUsers;
    });
    }
    this.collectionSize = this.xUsers.length;
  }
}
