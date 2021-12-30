import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService, private route:ActivatedRoute) { }

  user: User = {};

  ID: String = this.route.snapshot.params['id'];

  getUser(){
    this.userService.getUser(this.ID).subscribe({

      next: (res: any) =>{

        console.log(res);
        this.user = res;
      },
      error: (error: any) =>{

        console.log(error);
      }
    })
  }



  ngOnInit(): void {
    
    this.getUser();
  }

}
