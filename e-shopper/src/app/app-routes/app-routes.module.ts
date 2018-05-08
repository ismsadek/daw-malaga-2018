import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { ContactComponent } from '../contact/contact.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { LoginComponent } from '../login/login.component';


const appRoutes:Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'product-detail/:id', component: ProductDetailComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
    	enableTracing: true
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutesModule { }
