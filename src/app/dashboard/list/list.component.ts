import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ApiService } from 'src/core/services/api/api.service';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { ListRequest } from 'src/core/models/request/List-request.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { List } from 'src/core/models/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class ListComponent implements OnInit {

  public listRequest: ListRequest = <ListRequest>{}
  
  
  filteredList: List[] = [];
  public searchListName: string = '';
  ListToEdit: List | null = null;
  ListAddDialog: boolean = false;
  ListEditDialog: boolean = false;
  openModel: boolean = false;

  constructor(private readonly apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    
  ) { }

  searchList(searchKey: string) {
    this.filteredList = this.Lists.filter((List) => {
      const targetKey = List.id + ' ' + List.taskName;
      return targetKey.includes(searchKey);
    });
  }

  Lists: List[] = [];
  ngOnInit() {
    this.refresh()
  }

  addNewList() {
    this.ListAddDialog = true;
  }

  openEditDialog(id: number) {
    this.apiService.getEntityById<List>(id, List).then((response) => {
      if (response && response.data) {
        this.ListEditDialog = true;
        this.ListToEdit = response.data; 
      } else {
        console.error('Yorum bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Yorum alınırken bir hata oluştu:', error);
    });
  }


  onUpdate(id: number, updatedList: List) {
    this.update(id, updatedList).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum güncelleme başarılı', life: 3000 });
        this.hideDialog(); 
      }
    }).catch((error) => {
      console.error('Yorum güncellenirken bir hata oluştu:', error);
    });
  }

  update(id: number, updatedList: List) {
    return this.apiService.updateEntity(id, updatedList, List);
  }

  hideDialog() {

  }

  refresh() {
    this.apiService.getAllEntities(List).subscribe((response) => {
      this.Lists = response.data;
      this.filteredList=this.Lists;
      console.log(this.Lists)
    });
  

  }

  modelOpen() {
    this.openModel = true;
  }

  closeModal() {
    this.openModel = false;
  }

  onCreate(entity: ListRequest) {
    this.createEntity<ListRequest>(entity, 'List').then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum ekleme başarılı', life: 3000 });
      }
    });
  }

  createEntity<TEntity>(entity: TEntity, entityType: string) {
    return this.apiService.createEntity<TEntity>(entity, entityType);
  }

  deleteList(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Yorum başarı ile silindi', life: 3000 });
      }
    })
  }

    deleteUsers(id: number) {
    this.delete(id).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde silindi', life: 3000 });
        this.openModel = false;
      }
    })
  }



  delete(id: number) {
    return this.apiService.deleteEntity(id, List);
  }
  
}