import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../api/product';
import { SelectItem } from 'primeng/api';
import { User } from '../../api/user';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  user !: User; 
  products: Product[] = [];
  sortField: string = 'price';
  sortOrder: number = 1;
  sortOptions: SelectItem[] = [];
  cols: any[] = [];

  constructor(private productService: ProductService,private authService: AuthService) { }

  ngOnInit(): void {
  
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log("data" , data)
    });

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];

    this.sortOptions = [
      { label: 'Price Low to High', value: 'price' },
      { label: 'Price High to Low', value: '!price' },
      { label: 'Name A-Z', value: 'name' },
      { label: 'Name Z-A', value: '!name' }
    ];
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

onFilter(table: any, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
}
