import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	products = null;
  constructor(private productsService: ProductsService,
  						private route: ActivatedRoute,
  						private router: Router){
  	let id = route.snapshot.params['id']
  	this.products = productsService.getAll().subscribe(
  		data => { 
        this.products.filter( (item) => {return item.id == id})[0] || null  

  	});
  	if(this.products === null) router.navigate(['404']);
 }

  ngOnInit() {
  }

}



