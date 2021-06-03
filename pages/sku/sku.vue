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
					// {
					// 	id: 3,
					// 	text: '蓝色'
					// },
					// {
					// 	id: 10,
					// 	text: '红色'
					// },
					// {
					// 	id: 30,
					// 	text: '土豪金'
					// },
					// {
					// 	id: 137,
					// 	text: '黑色'
					// },
					// {
					// 	id: 138,
					// 	text: '灰色'
					// },
					// {
					// 	id: 121,
					// 	text: 'xxl'
					// },
					// {
					// 	id: 94,
					// 	text: 'xxxl'
					// }
				],
				value: [
					// {
					// 	'id': 10740,
					// 	'text': '颜色',
					// 	'leaf': [{
					// 			'id': 3,
					// 			'text': '蓝色',
					// 			'is_show': false
					// 		},
					// 		{
					// 			'id': 10,
					// 			'text': '红色',
					// 			'is_show': false
					// 		}
					// 	]
					// },
					// {
					// 	'id': 40732,
					// 	'text': '尺寸',
					// 	'leaf': [{
					// 			'id': 121,
					// 			'text': 'xxl',
					// 			'is_show': false
					// 		},
					// 		{
					// 			'id': 94,
					// 			'text': 'xxxl',
					// 			'is_show': false
					// 		}
					// 	]
					// }
				],
				skuTree: [
					// {
					// 	id: 10740,
					// 	text: '颜色'
					// },
					// {
					// 	id: 40732,
					// 	text: '尺寸'
					// }
				],
				data: [],
				flatten: [
					// {
				// 		'skus': [{
				// 				'k_id': 10740,
				// 				'k': '颜色',
				// 				'v_id': 3,
				// 				'v': '蓝色'
				// 			},
				// 			{
				// 				'k_id': 40732,
				// 				'k': '尺寸',
				// 				'v_id': 121,
				// 				'v': 'xxl'
				// 			}
				// 		],
				// 		'price': 222222,
				// 		'stock': 12222,
				// 		'marked_price': 12312
				// 	},
				// 	{
				// 		'skus': [{
				// 				'k_id': 10740,
				// 				'k': '颜色',
				// 				'v_id': 3,
				// 				'v': '蓝色'
				// 			},
				// 			{
				// 				'k_id': 40732,
				// 				'k': '尺寸',
				// 				'v_id': 94,
				// 				'v': 'xxxl'
				// 			}
				// 		],
				// 		'price': 233333,
				// 		'stock': 222222,
				// 		'marked_price': 111111
				// 	},
				// 	{
				// 		'skus': [{
				// 				'k_id': 10740,
				// 				'k': '颜色',
				// 				'v_id': 10,
				// 				'v': '红色'
				// 			},
				// 			{
				// 				'k_id': 40732,
				// 				'k': '尺寸',
				// 				'v_id': 121,
				// 				'v': 'xxl'
				// 			}
				// 		]
				// 	},
				// 	{
				// 		'skus': [{
				// 				'k_id': 10740,
				// 				'k': '颜色',
				// 				'v_id': 10,
				// 				'v': '红色'
				// 			},
				// 			{
				// 				'k_id': 40732,
				// 				'k': '尺寸',
				// 				'v_id': 94,
				// 				'v': 'xxxl'
				// 			}
				// 		]
				// 	}
				]
			}
		},
		onLoad(){
				let that = this
				let a = localStorage.getItem('mesage')
				let mesage = JSON.parse(localStorage.getItem('mesage'))
				console.log(mesage)
				that.sku = mesage.sku
				console.log(mesage.sku)
				this.$set(that.sku)
				that.flatten =  mesage.data 
				that.data = mesage.data
				console.log(mesage.data)
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
