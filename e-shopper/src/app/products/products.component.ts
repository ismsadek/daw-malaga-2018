import { Component, OnInit } from '@angular/core';
import { ProductsService} from '../products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	products = null;
  constructor(private productsService: ProductsService) { 
  	productsService.getAll().subscribe(
  		data => {
  			this.products = data
  		});
  }

  ngOnInit() {
  }

}
