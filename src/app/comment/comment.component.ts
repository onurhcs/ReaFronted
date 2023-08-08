import { Component } from '@angular/core';
import { ApiService } from "../../core/services/api/api.service";
import { Router } from "@angular/router";
import { Comment } from 'src/core/models/comment.model';
import { User } from 'src/core/models/user.model';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})

export class CommentComponent {
  constructor(private readonly apiService: ApiService, 
    private router: Router) { }


    users:User[] = [];
  comments: Comment[] = [];
  
  ngOnInit() {
    this.refresh()
  }
  
  refresh() {
    this.apiService.getAllEntities(Comment).subscribe((response) => {
      this.comments = response.data;
      console.log(this.comments)
    });
}
}