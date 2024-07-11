import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './demo/components/login/login.component';
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import { ProductComponent } from './demo/components/product/product.component';
import { CrudComponent } from './demo/components/crud/crud.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'product', component: ProductComponent },
    {path:'dashboard',component : DashboardComponent},
    {path:'admin',component: CrudComponent}
    
  
  ];
  
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
export class AppRoutingModule {
}
