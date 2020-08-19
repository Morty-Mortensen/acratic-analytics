import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AccountingHomeComponent} from "./accounting-home/accounting-home.component";
import {FinanceHomeComponent} from "./finance-home/finance-home.component";
import {MarketingHomeComponent} from "./marketing-home/marketing-home.component";
import {AccountingWebToCsvComponent} from "./accounting-home/accounting-web-to-csv/accounting-web-to-csv.component";
import {MarketingCreateLogoComponent} from "./marketing-home/marketing-create-logo/marketing-create-logo.component";


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'accounting', component: AccountingHomeComponent,
        children: [
          { path: 'web-to-csv', component: AccountingWebToCsvComponent },
          { path: 'something else', component: AccountingWebToCsvComponent },
        ]
      },
      {
        path: 'finance', component: FinanceHomeComponent,
        children: [
          { path: 'personal finance', component: AccountingWebToCsvComponent },
        ]
      },
      {
        path: 'marketing', component: MarketingHomeComponent,
        children: [
          { path: 'create-logo', component: MarketingCreateLogoComponent }
        ]
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
