import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShopContentComponent} from "./shop-content/shop-content.component";
import {ErrorPageComponent} from './error-page/error-page.component';
import {PaymentComponent} from "./order/payment/payment.component";
import {OrderComponent} from "./order/order.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationFormComponent} from "./login/registration-form/registration-form.component";

const routes: Routes = [
  {path: 'shop', component: ShopContentComponent},
  {path: '', redirectTo: 'shop', pathMatch: 'full'},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found :(  !' } },
  {path: 'order', component: OrderComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationFormComponent},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
