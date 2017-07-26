import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MakePaymentsComponent } from './make-payments/make-payments.component';
import { RequestPaymentsComponent } from './request-payments/request-payments.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { ViewBeneficiaryComponent } from './view-beneficiary/view-beneficiary.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';
import { QueriesComponent } from './queries/queries.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { RentReceiptsComponent } from './rent-receipts/rent-receipts.component';
import { ProfileComponent } from './profile/profile.component';
import { RewardsComponent } from './rewards/rewards.component';

// Second Navbar Routes
import { HouseRentComponent } from './house-rent/house-rent.component';
import { SchoolFeeComponent } from './school-fee/school-fee.component';
import { CollegeFeeComponent } from './college-fee/college-fee.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SendToBankComponent } from './send-to-bank/send-to-bank.component';
import { RequestLoanComponent } from './request-loan/request-loan.component';
import { PaymentComponentComponent } from './payment-component/payment-component.component';
import { PaymentResponseComponent } from './payment-response/payment-response.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './shared/guards/auth-guard.service';


export const router: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent  },
    {path: 'login/:ReferalCode', component: LoginComponent},
    {path: 'payment/:TransactionId', component: PaymentComponentComponent},
    {path: 'makepayments', component: MakePaymentsComponent , canActivate: [AuthGuard]},
    {path: 'requestpayments', component: RequestPaymentsComponent, canActivate: [AuthGuard] },
    {path: 'addbeneficiary', component: AddBeneficiaryComponent, canActivate: [AuthGuard] },
    {path: 'viewbeneficiary', component: ViewBeneficiaryComponent, canActivate: [AuthGuard] },
    {path: 'transactionhistory', component: TransactionHistoryComponent, canActivate: [AuthGuard] },
    {path: 'referafriend', component: ReferAFriendComponent, canActivate: [AuthGuard] },
    {path: 'queries', component: QueriesComponent, canActivate: [AuthGuard] },
    {path: 'generateinvoice', component: GenerateInvoiceComponent, canActivate: [AuthGuard] },
    {path: 'rentreceipts', component: RentReceiptsComponent, canActivate: [AuthGuard] },
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    {path: 'rewards', component: RewardsComponent, canActivate: [AuthGuard]},
    // second menu routes
    {path: 'houserent', component: HouseRentComponent, canActivate: [AuthGuard] },
    {path: 'houserent/:id', component: HouseRentComponent, canActivate: [AuthGuard] },
    {path: 'schoolfee', component: SchoolFeeComponent , canActivate: [AuthGuard]},
    {path: 'schoolfee/:id', component: SchoolFeeComponent, canActivate: [AuthGuard] },
    {path: 'collegefee/:id', component: CollegeFeeComponent, canActivate: [AuthGuard] },
    {path: 'collegefee', component: CollegeFeeComponent, canActivate: [AuthGuard] },
    {path: 'maintenance', component: MaintenanceComponent , canActivate: [AuthGuard]},
    {path: 'maintenance/:id', component: MaintenanceComponent, canActivate: [AuthGuard] },
    {path: 'sendtobank', component: SendToBankComponent, canActivate: [AuthGuard] },
    {path: 'sendtobank/:id', component: SendToBankComponent, canActivate: [AuthGuard] },
    {path: 'requestloan', component: RequestLoanComponent, canActivate: [AuthGuard] },
    {path: 'paymentresponse',component:PaymentResponseComponent, canActivate: [AuthGuard]},
    {path: 'changePassword',component:ChangePasswordComponent, canActivate: [AuthGuard]},
    {path: '**', component:MakePaymentsComponent,canActivate: [AuthGuard]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);