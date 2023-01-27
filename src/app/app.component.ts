import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Users {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'FrontTestApi';
  searchTerm: string = '';
  page = 1;
  pageSize = 4;
  collectionSize: number = 100;
  currentRate = 8;
  xUser: Users[] = [];
  allUsers: Users[] = [];
  pagesize= 4;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
        this.http.get<Users[]>('./assets/data/Users.json').subscribe((data: Users[]) => {
          debugger
          this.collectionSize = data.length;
          this.xUser = data;
          this.allUsers = this.xUser;
        });
}

    search(event: any): void {
      const searchFilter = event.target?.value;
      this.xUser = this.allUsers.filter((val) =>
        val.login.toLowerCase().includes(searchFilter)
      );
      this.collectionSize = this.xUser.length;
    }
}
