import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './Admin/Admin.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AuthGuard } from './auth.guard';
import { EditProductsComponent } from './EditProducts/EditProducts.component';
import { AddToCartComponent } from './AddToCart/AddToCart.component';
import { OfferComponent } from './offer/offer.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { MyordersComponent } from './myorders/myorders.component';
import { RolebasedAuthenticateGuard } from './rolebased-authenticate.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { ViewFeedbacksComponent } from './ViewFeedbacks/ViewFeedbacks.component';
import { QueriesComponent } from './Queries/Queries.component';
import { Order_detailsComponent } from './Order_details/Order_details.component';
import { Checkout_PageComponent } from './Checkout_Page/Checkout_Page.component';
import { Product_detailsComponent } from './Product_details/Product_details.component';
const routes: Routes = [
  {path: '', component: HomeComponent,title:'HOME'},
  {path: 'Home', component: HomeComponent,title:'HOME'},
  {path: 'products',component: ProductsComponent,canActivate: [AuthGuard],title:'PRODUCTS'},
  {path: 'profile',component: ProfileComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'User' },title:'PROFILE'},
  {path: 'Editproducts',component: EditProductsComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'Admin' },},
  {path: 'AddToCart',component: AddToCartComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'User' },},
  {path: 'Admin',component: AdminComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'Admin' }, },
  {path: 'Login',component: LoginComponent},
  { path: 'Register',component: RegisterComponent},
  {path: 'offer',component: OfferComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'Admin' }, },
  {path: 'payment',component: PaymentComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard], data: { role: 'User' },},
  {path: 'myorder',component: MyordersComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'User' },},
  {path:'feedback/:paymentid',component:FeedbackComponent,canActivate: [AuthGuard]},
  {path:'viewfeedback',component:ViewFeedbacksComponent,canActivate: [AuthGuard, RolebasedAuthenticateGuard],data: { role: 'Admin' },},
  {path:'query',component:QueriesComponent},
  {path:'order_details/:id',component:Order_detailsComponent,canActivate: [AuthGuard]},
  {path:'checkout',component:Checkout_PageComponent,canActivate: [AuthGuard]},
  {path:'Product_details/:mysearch',component:Product_detailsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
