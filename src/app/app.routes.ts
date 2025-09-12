import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { MenuuComponent } from './menuu/menuu.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { OrderComponent } from './order/order.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'menu',component:MenuuComponent},
  {path:'detail',component:ProductDetailComponent},
  {path:'order',component:OrderComponent},
  {path: '',component:RegisterComponent},
]
