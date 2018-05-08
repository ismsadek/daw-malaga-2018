<template>
	<div class="row">
		<div class="col-sm-12 col-md-6">
			<table class="table table-hover">
				<thead class="thead-default">
					<tr>
						<th>Size</th>
						<th>Price</th>
						<th>Add to basket</th>
					</tr>
				</thead>
				<tbody v-for = "item in menu" :key="item['.key']">
					<tr>
						<td><strong> {{ item.name }}</strong></td>
					</tr>
					<tr v-for = "option in item.options" :key="option['.key']">
						<td>{{option.size}}</td>
						<td>{{option.price}}</td>
						<td><button class="btn btn-sm btn-outline-success" 
							type="button"
							v-on:click="addToBasket(item, option)"
							>+</button></td>
					</tr>
				</tbody>
			</table>
		</div>

		<!--shopping cart-->
		<div class="col-sm-12 col-md-6">
			<div v-if="basket.length > 0">
				<table class="table">
					<thead class="thead-default">
						<tr>
							<th>Quantity</th>
							<th>Item</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody v-for = "item in basket" :key="item['.key']">
						<tr>
							<td>
								<button class="btn btn-sm btn-outline-danger" 
												type="button"
												v-on:click="decreaseQuantity(item)"
												>-</button>
								<span>{{ item.quantity }}</span>
								<button class="btn btn-sm btn-outline-success" 
												type="button"
												v-on:click="increaseQuantity(item)"
												>+</button>
							</td>
							<td>{{ item.name + " " + item.size}} </td>
							<td>{{ (item.price * item.quantity).toFixed(2)}}</td>
						</tr>
					</tbody>
				</table>
				<p>Order Total: {{total}}</p>
				<button :disabled="sending" class="btn btn-success btn-block" @click="processOrder()">Place Order</button>
			</div>
			<div v-else>
				{{ basketText }}
			</div>
		</div>
	</div>
</template>

<script>
	
	import {db} from '../firebase'
	import {auth} from '../firebase'

	export default {
		data() {
			return {
				sending :false,
				basket: [],
				basketText: 'Your basket is empty!',
				menu: []
			}
		},
		computed:{
			total(){
				var total = 0
				for(var a=0;a<this.basket.length;a++){
					total += this.basket[a].price * this.basket[a].quantity
				}
				return total
			},
			currentUserId(){
				if(auth.currentUser){
					return auth.currentUser.uid
				} else {
					return null
				}
			}
		},
		firebase:{
			menu:{
				source: db.ref("menu")
			},
			orders:{
				source: db.ref("orders")
			}
		},
		methods: {
			addToBasket(item, option) {
				var key = item[".key"]

				var found = this.basket.filter(
					function(element){
						return (element.key === key && element.size == option.size)
					}
				)

				var quantity = 1
				
				if(found.length!=0){
					found[0].quantity++
				}else{
					var newItem = {
						key,
						name: item.name,
						price: option.price,
						size: option.size, 
						quantity,
						client: this.currentUserId
					}
					this.basket.push(newItem)
				}
			},
			removeFromBasket(item){
				this.basket.splice(this.basket.indexOf(item), 1)
			},
			decreaseQuantity(item) {
				item.quantity--;
				if (item.quantity === 0) {
					this.removeFromBasket(item);
				}
			},
			increaseQuantity(item){
				item.quantity++;
			},
			processOrder(){
				this.sending = true
				this.basketText ="Pedido enviado"
				db.ref("orders").push(this.basket).then(()=>{
					this.sending = false
					this.basket = []
				})
			}
		}
	}
</script>

