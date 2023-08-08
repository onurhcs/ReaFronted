import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/core/services/api/api.service';
import { AuthService } from 'src/core/services/auth/auth.service';
import { User } from 'src/core/models/user.model';
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResponseStatus } from 'src/core/models/response/base-response.model';
import { RegisterRequest } from 'src/core/models/request/register-request.model';




@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.scss'],
  providers: [MessageService, ConfirmationService]
})



export class AlluserComponent implements OnInit {
  public registerRequest: RegisterRequest = <RegisterRequest>{};
  public searchName: string = '';

  userEditDialog: boolean = false;
  userAddDialog: boolean = false;

  UserToEdit: User | null = null;

  openModel: boolean = false;

  filteredUsers: User[] = [];

  makeAdmin: User | null = null;
  userPassword: string | null = null;



  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private readonly authService: AuthService,
    private messageService: MessageService
  ) { }

  searchPerson(searchKey: string) {
    this.filteredUsers = this.users.filter((user) => {
      const targetKey = user.fullName + ' ' + user.userName;
      return targetKey.includes(searchKey);
    });
  }

  users: User[] = [];
  ngOnInit() {
    this.refresh()
  }

  refresh() {
    this.apiService.getAllEntities(User).subscribe((response) => {
      this.users = response.data;
      this.filteredUsers = this.users;
      console.log(this.users)
    });

  }

  async register() {
    this.userAddDialog = true;
    let status = await this.authService.register(this.registerRequest);
    if (status == ResponseStatus.Ok) {
      this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı başarılı bir şekilde eklendi', life: 3000 });
      window.location.reload();
      await this.router.navigate(['/profile/allUser']);
    } else if (status == ResponseStatus.Invalid) {
      this.registerRequest.Password = '';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Kullanıcı eklenemedi' })
    }
    this.userAddDialog = false;
  }



  editUsers(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.userEditDialog = true;
        this.UserToEdit = response.data; 
      } else {
        console.error('Kullanıcı bulunamadı veya alınırken bir hata oluştu.');
      }
    }).catch((error) => {
      console.error('Kullanıcı alınırken bir hata oluştu:', error);
    });
  }

  updateToAdmin(id: number) {
    this.apiService.getEntityById<User>(id, User).then((response) => {
      if (response && response.data) {
        this.makeAdmin = response.data;
        if (this.makeAdmin.userType === 0) {
          this.makeAdmin.userType = 1; 
        } else if (this.makeAdmin.userType === 1) {
          this.makeAdmin.userType = 0; 
        }

        this.onUpdate(id, this.makeAdmin);
      } else {
        console.log("Kullanıcı bulunamadı veya bir hata oluştu.");
      }
    });
  }

 
  onUpdate(id: number, updatedUser: User) {
    this.update(id, updatedUser).then(response => {
      if (response?.status == ResponseStatus.Ok) {
        this.refresh();
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı güncelleme başarılı', life: 3000 });
        this.hideDialog(); 
      }
    }).catch((error) => {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    });
  }

  
  update(id: number, updatedUser: User) {
    return this.apiService.updateEntity(id, updatedUser, User);
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
    return this.apiService.deleteEntity(id, User);
  }

  hideDialog() {
    this.userEditDialog = false;
  }

  closeModal() {
    this.openModel = false;
  }

  modelOpen() {
    this.openModel = true;
  }

}
