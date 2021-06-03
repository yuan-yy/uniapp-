<template>

	<div class="container" style="width: 800px;">
		<sku v-model="value" action="http://localhost:8081/index.php" :sku-tree="skuTree" :on-fetch-group="fetchSkuTree"
			:on-fetch-sku="fetchSku" :on-create-group="createGroup" :on-create-sku="createSku" @on-change="change">
		</sku>
		<sku-table :data="value" :flatten="flatten" @on-change-data="handleChangeData"></sku-table>
		<br>
		<div @click="saveMessage">保存一下</div>
	</div>
	
	
</template>


<script>
	import 'element-vue-sku/lib/sku.css'
	import {
		Sku,
		SkuTable
	} from 'element-vue-sku'
	import {
		flatten
	} from 'element-vue-sku'
	import {
		isEqual
	} from 'element-vue-sku'
	export default {
		components:{
			Sku,
			SkuTable,
			flatten,
			isEqual
		},
		data() {
			return {
				sku: [
				],
				value: [
				],
				skuTree: [
				],
				data: [],
				flatten: [
				]
			}
		},
		onLoad(){
				let that = this
				let a = localStorage.getItem('mesage')
				let mesage = JSON.parse(localStorage.getItem('mesage'))
				that.sku = mesage.sku
				this.$set(that.sku)
				that.flatten =  mesage.data 
				that.data = mesage.data
				this.$set(that.data)
				this.$forceUpdate()
				that.value = mesage.value
				that.skuTree =  mesage.skuTree
				this.$forceUpdate()
		},
		methods: {
			
			saveMessage(){
				let that = this
				localStorage.setItem("mesage",
					JSON.stringify({
					sku: that.sku, 
					flatten: that.data, 
					data: that.data,
					skuTree: that.skuTree,
					value: that.value
					})
				)
			},
			
			fetchSkuTree() {
				let that = this
				return new Promise(resolve => {
					resolve(that.skuTree)
				})
			},

			fetchSku(id) {
				let that = this
				return new Promise(resolve => {
					resolve(that.sku)
				})
			},

			createGroup(text) {
				return new Promise((resolve, reject) => {
					if (text) {
						resolve(parseInt(Math.random() * 100, 10) + 1)
					} else {
						reject(new Error())
					}
				})
			},

			createSku(data) {
				return new Promise((resolve, reject) => {
					console.log(data)
					resolve(data.data.map(item => {
						return {
							id: parseInt(Math.random() * 100, 10) + parseInt(Math.random() * 100, 10),
							text: item
						}
					}))
				})
			},

			change(data) {},

			handleChangeData(data) {
				console.log(123)
				this.data = data
			}
		
		
		
		}
	}
</script>

<style>
</style>
