import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { LoginComponent } from './demo/components/login/login.component';
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import { HeaderComponent } from './demo/components/header/header.component';
import { ProductComponent } from './demo/components/product/product.component';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { RatingModule } from 'primeng/rating';
import { LoginRoutingModule } from './demo/components/login/login-routing.module';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { CrudComponent } from './demo/components/crud/crud.component';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CrudRoutingModule } from './demo/components/crud/crud-routing.module';
import { TokenInterceptor } from './auth-intercepter.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import ConfirmDialogModule
import { SplitButtonModule } from 'primeng/splitbutton';







@NgModule({
    declarations: [AppComponent,LoginComponent,DashboardComponent,ProductComponent,CrudComponent,HeaderComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        SplitButtonModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'fill' } 
        }],
    bootstrap: [AppComponent],
})
export class AppModule {}
