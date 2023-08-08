import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { TableModule } from 'primeng/table';
import { SignupComponent } from './singup/singup.component';
import { JwtInterceptor } from 'src/core/services/interceptor/jwt.interceptor';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { DashnavbarComponent } from './dashboard/dashnavbar/dashnavbar.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AlluserComponent } from './dashboard/alluser/alluser.component';
import { CommentComponent } from './comment/comment.component';
import { DashcommentComponent } from './dashboard/dashcomment/dashcomment.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ListComponent } from './dashboard/list/list.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    HeaderComponent,
    DashnavbarComponent,
    SidebarComponent,
    AlluserComponent,
    CommentComponent,
    DashcommentComponent,
    ProfileComponent,
    ListComponent,
    MainComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    MenuModule,
    ToolbarModule,
    BrowserAnimationsModule
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
