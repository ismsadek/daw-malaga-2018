import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductsService {

  
  constructor(private http: HttpClient) { }

  public getAll(){
  	return this.http.get('http://demo3746852.mockable.io/');	
	 
	
  }

  public getOneById(id){
  	return this.http.get(`http://demo3746852.mockable.io/${id}`);
  	
  }


}







