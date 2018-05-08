<template>
	<form>
		<h3>Add a new pizza</h3>

		<div class="form-group row">
			<label for="" class="col-sm-3">Name</label>
			<div class="col-sm-9">
				<input type="text" name="" id="" class="form-control" v-model="newPizza.name" >
			</div>
		</div>

		<div class="form-group row">
			<label for="" class="col-sm-3">Description</label>
			<div class="col-sm-9">
				<textarea type="text" name="" id="" class="form-control" rows="5" v-model="newPizza.description"></textarea>
			</div>
		</div>

		<p><strong>Option 1:</strong></p>
		<div class="form-group row">
			<label for="" class="col-sm-3">Size('')</label>
			<div class="col-sm-9">
				<input type="text" name="" id="" class="form-control" v-model="newPizza.options[0].size">
			</div>
		</div>

		<div class="form-group row">
			<label for="" class="col-sm-3">Price</label>
			<div class="col-sm-9">
				<input type="text" name="" id="" class="form-control" v-model="newPizza.options[0].price">
			</div>
		</div>

		<p><strong>Option 2:</strong></p>
		<div class="form-group row">
			<label for="" class="col-sm-3">Size('')</label>
			<div class="col-sm-9">
				<input type="text" name="" id="" class="form-control" v-model="newPizza.options[1].size">
			</div>
		</div>

		<div class="form-group row">
			<label for="" class="col-sm-3">Price</label>
			<div class="col-sm-9">
				<input type="text" name="" id="" class="form-control" v-model="newPizza.options[1].price">
			</div>
		</div>
		<div class="form-group row">
			<button :disabled="sending" class="btn btn-success btn-block" type="button" v-on:click="addMenuItem()">Add New Pizza</button>
		</div>
	</form>
</template>
<script>
	
	import {db} from '../firebase'
	import {storage} from '../firebase'

	var storageRef = storage.ref();
	var pizzaPhotosRef = storage.ref('pizzas/fotos');

	export default {
		data(){
			return{
				sending: false,
				newPizza: {
					'photo': null,
					'name': null,
				  'description': null,
				  'options': [{
				    'size': null,
				    'price': null
				  	}, {
				    'size': null,
				    'price': null
				  }]
				}
			}
		},
		methods: {
			addMenuItem() {
				this.sending = true
				db.ref("menu").push(this.newPizza).then(()=>{
					this.sending = false
					this.newPizza =  {
						'photo': null,
						'name': null,
						'description': null,
						'options': [{
							'size': null,
							'price': null
							}, {
							'size': null,
							'price': null
						}]
					}
				})
			}
		}
	}
</script>
