import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from "@clr/angular";
import { LoginComponent } from './pages/passport/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from './pages/passport/register/register.component';
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { HomeComponent } from './pages/home/home.component';
import {PaginatorModule} from "primeng/paginator";
import {DialogService} from "primeng/dynamicdialog";
import { AddComponent } from './pages/home/add/add.component';
import {InputTextModule} from "primeng/inputtext";
import { DetailComponent } from './pages/home/detail/detail.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import { UserComponent } from './pages/user/user.component';
import {GalleriaModule} from "primeng/galleria";
import { EditComponent } from './pages/home/edit/edit.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddComponent,
    DetailComponent,
    UserComponent,
    EditComponent
  ],
    imports: [
        ClarityModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastModule,
        PaginatorModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        ConfirmPopupModule,
        GalleriaModule
    ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },MessageService, ConfirmationService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
