import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {HttpModule, Http, RequestOptions} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule } from '@angular/forms';
import {JsonpModule} from '@angular/http';

import { routes }  from './app.routes';
import { SharedModule } from './shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { RequestPaymentsComponent } from './request-payments/request-payments.component';
import { LoginComponent } from './login/login.component';
import { MakePaymentsComponent } from './make-payments/make-payments.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SecondMenuComponent } from './second-menu/second-menu.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';
import { QueriesComponent } from './queries/queries.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { RentReceiptsComponent } from './rent-receipts/rent-receipts.component';
import { HouseRentComponent } from './house-rent/house-rent.component';
import { SchoolFeeComponent } from './school-fee/school-fee.component';
import { CollegeFeeComponent } from './college-fee/college-fee.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SendToBankComponent } from './send-to-bank/send-to-bank.component';
import { RequestLoanComponent } from './request-loan/request-loan.component';
import { ViewBeneficiaryComponent } from './view-beneficiary/view-beneficiary.component';
import { ProfileComponent } from './profile/profile.component';
import { TabFilterPipe } from './transaction-history/tab-filter.pipe';
import { SearchFilterPipe } from './transaction-history/search-filter.pipe';
import { PaymentComponentComponent } from './payment-component/payment-component.component';
import { PaymentResponseComponent } from './payment-response/payment-response.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RewardsComponent } from './rewards/rewards.component';
import { AuthGuard } from './shared/guards/auth-guard.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import {ShareModule} from 'ng2share/share.module';
import { ClickOutside } from './navbar/click-outside.directive';


@NgModule({ 
  declarations: [
    AppComponent,
    RequestPaymentsComponent,
    LoginComponent,
    MakePaymentsComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    SecondMenuComponent,
    AddBeneficiaryComponent,
    TransactionHistoryComponent,
    ReferAFriendComponent,
    QueriesComponent,
    GenerateInvoiceComponent,
    RentReceiptsComponent,
    HouseRentComponent,
    SchoolFeeComponent,
    CollegeFeeComponent,
    MaintenanceComponent,
    SendToBankComponent,
    RequestLoanComponent,
    ViewBeneficiaryComponent,
    ProfileComponent,
    TabFilterPipe,
    SearchFilterPipe,
    PaymentComponentComponent,
    PaymentResponseComponent,
    ChangePasswordComponent,
    RewardsComponent,
    ClickOutside
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routes,
    FormsModule,
    SharedModule,
    JsonpModule,
    ShareModule,
    AngularFontAwesomeModule
      ],
   providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
