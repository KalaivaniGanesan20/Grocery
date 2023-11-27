
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { AdminComponent } from './Admin/Admin.component';
import {ProductsComponent} from './products/products.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditProductsComponent } from './EditProducts/EditProducts.component';
import { AddToCartComponent } from './AddToCart/AddToCart.component';
import { HeaderComponent } from './header/header.component';
import { OfferComponent } from './offer/offer.component';
import { WeightPipe } from './weight.pipe';
import { CdTimerModule } from 'angular-cd-timer';
import { OfferpipePipe } from './offerpipe.pipe';
import { MyordersComponent } from './myorders/myorders.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { TokenInterceptor } from './token.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { ViewFeedbacksComponent } from './ViewFeedbacks/ViewFeedbacks.component';
import { QueriesComponent } from './Queries/Queries.component';
import { SearchComponent } from './search/search.component';
import { Order_detailsComponent } from './Order_details/Order_details.component';
import { Checkout_PageComponent } from './Checkout_Page/Checkout_Page.component';
import { Product_detailsComponent } from './Product_details/Product_details.component';
import{BrowserAnimationsModule}from '@angular/platform-browser/animations';
import{AutoCompleteModule}from 'primeng/autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaymentComponent } from './payment/payment.component';
import { ExceptionInterceptor } from './Exception.interceptor.service';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      AdminComponent,
      ProductsComponent,
      EditProductsComponent,
      AddToCartComponent,
      HeaderComponent,
      OfferComponent,
      WeightPipe,
      OfferpipePipe,
      MyordersComponent,
      FeedbackComponent,
      ProfileComponent,
      FeedbackComponent,
      ViewFeedbacksComponent,
      QueriesComponent,
      SearchComponent,
      Order_detailsComponent,
      Checkout_PageComponent,
      Product_detailsComponent,
      PaymentComponent,
   ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdTimerModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    MultiSelectModule,
    LoggerModule.forRoot({
      serverLoggingUrl:'http://localhost:3000/Logger',
      level:NgxLoggerLevel.TRACE,
      serverLogLevel:NgxLoggerLevel.ERROR,
      disableConsoleLogging:true
    })
  ],

  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ExceptionInterceptor,
      multi:true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
