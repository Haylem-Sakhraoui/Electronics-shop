import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Table } from 'primeng/table';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Category } from '../../api/category';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';




@Component({
  selector: 'app-Crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class CrudComponent implements OnInit {
  product: any = {};
  products: any[] = [];
  selectedProducts: any[] = [];
  productForm: FormGroup;
  currentFileUpload: File | null = null;
  submitted = false;
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  cols: any[] = [];
  isEdit: boolean = false;

  categories: any[] = Object.keys(Category).map(key => ({ label: Category[key], value: key }));

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any[]) => {
      this.products = products;
    });
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      category: ['', Validators.required],
      image: ['']
    });
  
    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      this.currentFileUpload = event.target.files[0];
    }
  }

  saveProduct(): void {
    this.submitted = true;

    if (this.productForm.invalid || !this.currentFileUpload && !this.isEdit) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all fields and upload an image', life: 3000 });
      return;
    }

    const productDTO = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      category: this.productForm.controls['category'].value
    };

    const formData: FormData = new FormData();
    if (this.currentFileUpload) {
      formData.append('file', this.currentFileUpload);
    }
    formData.append('productDTO', new Blob([JSON.stringify(productDTO)], { type: 'application/json' }));

    if (this.isEdit) {
      this.productService.updateProductWithImage(this.product.id, formData).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.productForm.reset();
          this.submitted = false;
          this.currentFileUpload = null;
          this.productDialog = false;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Update Failed', life: 3000 });
        }
      );
    } else {
      this.productService.uploadProductWithImage(formData).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          this.productForm.reset();
          this.submitted = false;
          this.currentFileUpload = null;
          this.productDialog = false;
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Creation Failed', life: 3000 });
        }
      );
    }
  }
  
  

  openNew(): void {
    this.product = {};
    this.productDialog = true;
  }

  deleteSelectedProducts(): void {
    this.deleteProductsDialog = true;
  }


  editProduct(product: any): void {
    this.product = { ...product };
    this.productForm.patchValue(product);
    this.isEdit = true;
    this.productDialog = true;
  }

  deleteProduct(product: any): void {
    this.product = { ...product };
    this.deleteProductDialog = true;
  }

  confirmDeleteSelected(): void {
    this.deleteProductsDialog = false;
    // Implement deletion logic here
  }

  confirmDelete(): void {
    this.deleteProductDialog = false;
    // Implement deletion logic here
  }

  hideDialog(): void {
    this.productDialog = false;
    this.productForm.reset();
    this.currentFileUpload = null;
  }

  findIndexById(id: number): number {
    return this.products.findIndex((product: any) => product.id === id);
  }

  createId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}



/*export class CrudComponent implements OnInit {
  productDialog: boolean = false;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  cols: any[] = [];
  product: any = {};
  products: any[] = [];
  selectedProducts: any[] = [];
  submitted = false;


  public productForm: FormGroup;
  currentFileUpload: File | null = null;
  categories: any[] = Object.keys(Category).map(key => ({ label: Category[key], value: key }));

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products: any[]) => {
      this.products = products;
    });

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];

    this.productForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl(null, [Validators.required])
    });
  }

  selectFile(event: any): void {
    this.currentFileUpload = event.files[0];
  }

  saveProduct(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    const productDTO = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      category: this.productForm.controls['category'].value
    };

    this.productService.uploadProductWithImage(productDTO, this.currentFileUpload).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        this.productForm.reset();
        this.submitted = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Creation Failed', life: 3000 });
      }
    );
  }

  openNew(): void {
    this.product = {};
    this.productDialog = true;
  }

  deleteSelectedProducts(): void {
    this.deleteProductsDialog = true;
  }

  editProduct(product: any): void {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any): void {
    this.product = { ...product };
    this.deleteProductDialog = true;
  }

  confirmDeleteSelected(): void {
    this.deleteProductsDialog = false;
    // Implement deletion logic here
  }

  confirmDelete(): void {
    this.deleteProductDialog = false;
    // Implement deletion logic here
  }

  hideDialog(): void {
    this.productDialog = false;
    this.productForm.reset();
    this.currentFileUpload = null;
  }

  findIndexById(id: number): number {
    return this.products.findIndex((product: any) => product.id === id);
  }

  createId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  onGlobalFilter(event: Event): void {
    // Implement global filter logic here
  }
}
  */