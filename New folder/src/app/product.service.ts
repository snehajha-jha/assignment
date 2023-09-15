import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 private apiUrl = '/assets/db.json'; 

  constructor(private http: HttpClient) {}
 

  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  filterProducts(filters: any, products: any[]): any[] {
    return products.filter(product => {
      if (filters.screenSize) {
        const screenSizeFilters = filters.screenSize;
        const productScreenSize = parseFloat(product.ScreenSize.match(/\d+(\.\d+)?/)[0]);
        
        // Check if the product screen size falls within any of the filter ranges
        for (const filter of screenSizeFilters) {
          const lowerBound = parseFloat(filter.lowerBound.toString().match(/\d+(\.\d+)?/)[0]);
          const upperBound = parseFloat(filter.upperBound.toString().match(/\d+(\.\d+)?/)[0]);
          
          if (lowerBound <= productScreenSize && productScreenSize <= upperBound) {
            return true; 
          }
        }
        
        return false; 
      }
  
  
      if (filters.operatingSystem) {
        return filters.operatingSystem.includes(product.OS);
      }
      if (filters.ramCapacity) {
        return filters.ramCapacity.includes(product.RAM);
      }
      if (filters.ssdCapacity) {
        return filters.ssdCapacity.includes(product.SSD);
      }
      return true;
    });
  }
}