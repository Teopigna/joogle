import { AuthGuard } from './auth/auth.guard';
import { ItemStartComponent } from './item-start/item-start.component';
import { AuthComponent } from './auth/auth.component';

import { PageBodyComponent } from './page-body/page-body.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path: '', component: PageBodyComponent,
        children: [
            {path: '', component: ItemStartComponent},
            {path: 'new', component: ItemDetailComponent, canActivate:[AuthGuard]},
            {path: 'edit/:index', component: ItemDetailComponent, canActivate:[AuthGuard]}
        ]
    },
    {path: 'auth', component: AuthComponent},
    {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
