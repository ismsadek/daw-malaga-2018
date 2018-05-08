<template>
	<div>
		<p>Admin Zone <button @click="logout">Salir</button></p>
		<div class="row">
			<div class="col-sm-12 col-md-6">
				<!--new pizza component-->
				<NewPizza/>
			</div>
			<div class="col-sm-12 col-md-6">
				<h3>Menú:</h3>
				<table class="table table-hover">
					<thead class="thead-default">
						<tr>
							<th>Item</th>
							<th>Remove from menu</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in menu" :key="item['.key']">
							<td>{{item.name}}</td>
							<td><button class="btn btn-sm btn-outline-danger" 
													@click="removeMenu(item)">x</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
			
		<div class="row">
			<div class="col-sm-12">
				<!--Current Orders-->
				<h3>Current Orders</h3>
				<table class="table table-hover">
					<thead class="thead-default">
						<tr>
							<th>Item</th>
							<th>Size</th>
							<th>Quantity</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody v-for="(item,index) in orders" :key="item['.key']">
						<div class="order-number">
							<strong><em>Order Number: {{index+1}}</em></strong>
							<button class="btn btn-sm btn-outline-danger" @click="removeOrder(item)">x</button>
						</div>
						<tr v-for="pizza in item['.value']" :key="pizza['.key']">
							<td>{{pizza.name}}</td>
							<td>{{pizza.size}}</td>
							<td>{{pizza.quantity}}</td>
							<td>{{(pizza.quantity * pizza.price).toFixed(2)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>

	import NewPizza from './NewPizza'
	import {db} from '../firebase'
	import {auth} from '../firebase'
	export default {
		data(){
			return{
				menu: [],
				orders: []
			}
		},
		firebase:{
			menu:{
				source: db.ref("menu")
			},
			orders:{
				source: db.ref("orders"),
				asArray: true
			}
		},
		components: {
			NewPizza
		},
		methods:{
			logout(){
				auth.signOut().then(()=>{
					this.$router.replace("login")
				})
			},
			removeMenu(item){
				this.$firebaseRefs.menu.child(item['.key']).remove()
				item.remove()
			},
			removeOrder(item){
				this.$firebaseRefs.orders.child(item['.key']).remove()
				item.remove()
			}
		}
	}
</script>