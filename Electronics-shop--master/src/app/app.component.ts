import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

import { MatDialog } from '@angular/material/dialog';
import { CrudComponent } from './demo/components/crud/crud.component';
import { Product } from './demo/api/product';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private dialog: MatDialog) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
    openCrudDialog(product: Product): void {
        const dialogRef = this.dialog.open(CrudComponent, {
          width: '600px',
          data: { product }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      }
    
}
