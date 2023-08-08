import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Comment } from '@angular/compiler';
import { ApiService } from 'src/core/services/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  visible: boolean = false;

  currentUser!: User | null;

  comments: Comment[] = [];



  constructor(private readonly authService: AuthService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user: User | null) => {
      this.currentUser= user;
    });
  }

 
  refresh() {
    this.apiService.getAllEntities(Comment).subscribe((response) => {
      this.comments = response.data;
      console.log(this.comments)
    });
  }
  
  showDialog() {
      this.visible = true;
  }
}
