import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private userService:UserService , private route:ActivatedRoute, private routing:Router, private fb:FormBuilder) { }

  formFields = this.fb.group({
    name:[''],
    company:['']
  });

  user:User = {};
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

  updateUser(nUser: User){
    
    this.userService.patchUser(this.ID, nUser).subscribe({

      next: ()=>{
        
        console.log(nUser);
        this.routing.navigateByUrl('/');
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
