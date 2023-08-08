import { Component } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { List } from 'src/core/models/list.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private readonly apiService: ApiService, 
    private router: Router) { }


    
    lists: List[] = [];
  
  ngOnInit() {
    this.refresh()
  }
  
  refresh() {
    this.apiService.getAllEntities(List).subscribe((response) => {
      this.lists = response.data;
      console.log(this.lists)
    });
}
}
