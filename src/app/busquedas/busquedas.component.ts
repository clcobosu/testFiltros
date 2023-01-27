import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Users } from '../users';
import { forbiddenNameValidator } from '../shared/forbidden-name.directive';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.scss']
})

export class BusquedasComponent {
  Searching! : FormGroup;
  submitted = false;
  xUser!: Users;
  page = 1;
  pageSize = 10;
  collectionSize: number = 100;
  currentRate = 8;
  xUsers: Users[] = [];
  allxUsers: Users[] = [];
  userName: string ='';

  form: FormGroup = new FormGroup({
    fullname: new FormControl('')
  });


  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(4), forbiddenNameValidator(/doublevpartner/i)]]
      }
    );
    this.http
    .get<Users[]>('./assets/data/Users.json')
    .subscribe((data: Users[]) => {
      this.collectionSize = data.length;
      this.xUsers = data;
      this.allxUsers = this.xUsers;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const searchFilter = this.form.controls['fullname'].value;
    console.log(this.allxUsers);
    this.xUsers = this.allxUsers.filter((val) => val.login.toLowerCase().includes(searchFilter));
    this.collectionSize = this.xUsers.length;
  }
}

