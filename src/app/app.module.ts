import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ShopContentComponent } from './shop-content/shop-content.component';
import { ShopItemComponent } from './shop-content/shop-item/shop-item.component';
import { HeaderComponent } from './header/header.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './order/payment/payment.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {FormsModule} from "@angular/forms";
import {LoginService} from "./login/login.service";
import {OrderService} from "./order/order.service";
import { OrderItemComponent } from './order/order-item/order-item.component';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './login/registration-form/registration-form.component';
import { ManageComponent } from './manage/manage.component';
import { ManageUsersComponent } from './manage/manage-users/manage-users.component';
import { ManageOrdersComponent } from './manage/manage-orders/manage-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopContentComponent,
    ShopItemComponent,
    HeaderComponent,
    OrderComponent,
    PaymentComponent,
    LoginFormComponent,
    ErrorPageComponent,
    OrderItemComponent,
    LoginComponent,
    RegistrationFormComponent,
    ManageComponent,
    ManageUsersComponent,
    ManageOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
