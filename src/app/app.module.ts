import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { AuthComponent } from './auth/auth.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { PageBodyComponent } from './page-body/page-body.component';
import { ItemStartComponent } from './item-start/item-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ItemComponent,
    ItemListComponent,
    ItemDetailComponent,
    AuthComponent,
    SearchBarComponent,
    PageBodyComponent,
    ItemStartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
