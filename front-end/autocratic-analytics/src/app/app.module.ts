import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { LogoComponent } from './logo/logo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NavBarLinksComponent } from './navigation/nav-bar/nav-bar-links/nav-bar-links.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { LoginNavComponent } from './navigation/login-nav/login-nav.component';
import { HomeComponent } from './home/home.component';
import { AccountingHomeComponent } from './accounting-home/accounting-home.component';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { MarketingHomeComponent } from './marketing-home/marketing-home.component';
import { AccountingWebToCsvComponent } from './accounting-home/accounting-web-to-csv/accounting-web-to-csv.component';
import { MarketingCreateLogoComponent } from './marketing-home/marketing-create-logo/marketing-create-logo.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LogoComponent,
    NavBarLinksComponent,
    SearchBarComponent,
    ProfileImageComponent,
    LoginNavComponent,
    HomeComponent,
    AccountingHomeComponent,
    FinanceHomeComponent,
    MarketingHomeComponent,
    AccountingWebToCsvComponent,
    MarketingCreateLogoComponent,
  ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatInputModule,
		ReactiveFormsModule,
		MatMenuModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
