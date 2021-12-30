import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService, private fb:FormBuilder) { }


  formFields = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, Validators.email]]
  }) ;


  usersList: User[] = [];

  get fields() :any{
    return this.formFields.controls;
  }

  /**
   * Fetchin All Users
   */
  fetchUsers(){
    this.userService.getUsers().subscribe({

      next: (res: any) =>{
        
        console.log(res);
        this.usersList = res;
      },
      error: (error: any) =>{
        console.log(error);
      }
    });
  }

  /**
   * Add A User
   */
  addUser(nUser: User){
    this.userService.postUser(nUser).subscribe({

      next: ()=>{
        
        console.log(nUser);
        this.usersList.splice(0, 0, nUser);
      },
      error: (error: any)=>{
        
        console.log(error);
      }
      
    });
  }

  /**
   * Delete A User
   */
  deleteUser(dID: String, index: number){
    this.userService.deleteUser(dID).subscribe({

      next: ()=>{

        this.usersList.splice(index, 1);
      },
      error: (error:any)=>{

        console.log(error);
      }
    });
  }


  
  ngOnInit(): void {
    this.fetchUsers();
  }

}
