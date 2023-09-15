import { Component } from '@angular/core';
import { ProductService } from '../../../product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
 filteredProducts: any[] = [];
  products: any[] = [];
  loadCount = 4;
  loadedProductCount = 0;
  displayedProducts: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.updateFilteredProducts({});
      this.loadedProductCount = this.loadCount;
      this.updateDisplayedProducts();
    });
  }

  onScreenSizeSelected(sizes: { lowerBound: number; upperBound: number; }[]) {
    const filters = {
      screenSize: sizes
    };
    this.updateFilteredProducts(filters);
  }

  onOperatingSystemSelected(selectedOS: string[]) {
    this.updateFilteredProducts({ operatingSystem: selectedOS });
  }

  onRamCapacitySelected(selectedRam: string[]) {
    this.updateFilteredProducts({ ramCapacity: selectedRam });
  }

  onSSDCapacitySelected(selectedSSD: string[]) {
    this.updateFilteredProducts({ ssdCapacity: selectedSSD });
  }

  updateFilteredProducts(filters: any) {
    this.filteredProducts = this.productService.filterProducts(filters, this.products);
    this.loadedProductCount = this.loadCount;
    this.updateDisplayedProducts();
  }
  
  updateDisplayedProducts() {
    this.displayedProducts = this.filteredProducts.slice(0, this.loadedProductCount);
  }

  loadMore() {
    this.loadedProductCount += this.loadCount;
    if (this.loadedProductCount >= this.filteredProducts.length) {
      // All items have been loaded
      this.loadedProductCount = this.filteredProducts.length;
    }
    this.updateDisplayedProducts();
  }
}