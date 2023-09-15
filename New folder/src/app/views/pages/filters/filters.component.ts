import { Component, EventEmitter, Output } from '@angular/core';
import { sizes ,Ram,SSD, os} from 'src/app/constant/helper';
import { ProductService } from '../../../product.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

 products: any[] = []; 
  filteredProducts: any[] = []; 
  selectedFilters: any = {};
  selectedScreenSize: string | null = null;
  selectedOperatingSystem: string | null = null;
  selectedRamCapacity: string | null = null;
  selectedSsdCapacity: string | null = null;
  showScreenOptions = false;
  oSOptions=false;
  RAMOptions=false;
  SSDOptions=false;
  selectedScreenSizes: string[] = [];
  selectedOS:string[] =[]
  selectedRam: string[] = []; 
  selectedSSD: string[] = [];
  screenSizeOptions= sizes;
  operatingSystemOptions=os;
  ramCapacityOptions=Ram;
  ssdCapacityOptions=SSD;
  @Output() screenSizeSelected = new EventEmitter<{ lowerBound: number; upperBound: number; }[]>();
  @Output() operatingSystemSelected = new EventEmitter<string[]>();
  @Output() ramCapacitySelected = new EventEmitter<string[]>();
  @Output() ssdCapacitySelected = new EventEmitter<string[]>();

  constructor(private productService: ProductService) {}
  
  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });
  }
  toggleScreenOptions(): void {
    this.showScreenOptions = !this.showScreenOptions;
  }
  toggleOS(): void {
    this.oSOptions =!this.oSOptions;
  }
  toggleRAM(): void {
    this.RAMOptions =!this.RAMOptions;
  }
  toggleSSD(): void {
    this.SSDOptions =!this.SSDOptions;
  }

  // Handle screen size change event

  onScreenSizeChange(event: any) {
    const selectedSizeLabels = this.screenSizeOptions
      .filter(size => event.target.checked && event.target.value === size.label)
      .map(size => size.label);
  
    const selectedSizes = selectedSizeLabels.map(label => {
      const sizeRange = label.split(' - ');
      const lowerBound = parseFloat(sizeRange[0].replace(' inches', ''));
      const upperBound = parseFloat(sizeRange[1].replace(' inches', ''));
      return { lowerBound, upperBound };
    });
  
    this.selectedScreenSizes = selectedSizeLabels;
    this.screenSizeSelected.emit(selectedSizes);
  }

  // Handle operating system change event
  onOperatingSystemChange(event: any) {
    const selectedOS = this.operatingSystemOptions
      .filter(os => event.target.checked && event.target.value === os.label)
      .map(os => os.label);
    this.selectedOS = selectedOS;
    this.operatingSystemSelected.emit(selectedOS);
  }
  
  onRamCapacityChange(event: any) {
    const selectedRam = this.ramCapacityOptions
      .filter(ram => event.target.checked && event.target.value === ram.label)
      .map(ram => ram.label);
    this.selectedRam = selectedRam;
    this.ramCapacitySelected.emit(selectedRam);
  }
  
  onSSDCapacityChange(event: any) {
    const selectedSSD = this.ssdCapacityOptions
      .filter(ssd => event.target.checked && event.target.value === ssd.label)
      .map(ssd => ssd.label);
    this.selectedSSD = selectedSSD;
    this.ssdCapacitySelected.emit(selectedSSD);
  }
}



