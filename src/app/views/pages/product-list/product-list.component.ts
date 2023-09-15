import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../../product.service';
import { Product } from 'src/product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
 @Input() filteredProducts: Product[] = [];
  @Input() displayedProducts: any[] = [];
  @Output() loadMoreClicked = new EventEmitter<void>();
  products: any[] = []; 
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      // this.displayedProducts = this.products.slice(0, this.loadCount);
    }
    )}
    loadMore(): void {
      this.loadMoreClicked.emit();
    }
}
