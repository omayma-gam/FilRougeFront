import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuuComponent } from './menuu/menuu.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderComponent } from './order/order.component';
import { SimpleDishManagerComponent } from './simple-dish-manager/simple-dish-manager.component';
import { ConnectionTestComponent } from './connection-test/connection-test.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuuComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'order', component: OrderComponent },
  { path: 'simple-dishes', component: SimpleDishManagerComponent },
  { path: 'connection-test', component: ConnectionTestComponent },
  { path: '**', redirectTo: '' }
];