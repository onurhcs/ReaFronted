import { Component } from '@angular/core';
import { AuthService } from 'src/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/core/models/request/register-request.model';
import { ResponseStatus } from 'src/core/models/response/base-response.model';


@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})

export class SignupComponent {
  public registerRequest: RegisterRequest = <RegisterRequest>{};
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  async register() {
    let status = await this.authService.register(this.registerRequest);
    if (status == ResponseStatus.Ok) {
      await this.router.navigate(['../login']);
    } else if (status == ResponseStatus.Invalid)
      this.registerRequest.Password = '';
  }
}


