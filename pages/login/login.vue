<template>
	<div>
		<div class="titlehead">
			<div>
				<i class="el-icon-refresh icon1"></i>
				<i class="el-icon-plus icon2" @click="addProduct">添加</i>
				<i class="el-icon-delete-solid icon3" @click="pidelete">批量删除</i>
			</div>
			<div style="width:180px">
				<el-input v-model="select1" placeholder="搜索" size="mini" suffix-icon="el-icon-search"
					@change="selectChange"></el-input>
			</div>
		</div>

		<el-table :data="tableData" border stripe style="width: 100%" @selection-change="handleSelectionChange">
			>
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column prop="good_name" label="货物" width="400">
			</el-table-column>
			<el-table-column prop="price" label="价格">
			</el-table-column>
			<el-table-column prop="create_time" label="创建时间">

			</el-table-column>
			<el-table-column prop="update_time" label="更新时间">

			</el-table-column>
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
					<el-button type="text" size="small" @click="geditS(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page.sync="currentPage1" :page-size="pagenum" layout="total, prev, pager, next"
				:total="countmessage">
			</el-pagination>
		</div>

	
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible" class="haha" v-if="flag1">
			<el-form :model="form">
				<el-form-item label="商品名称:" :label-width="formLabelWidth">
					<el-input v-model="form.name" autocomplete="off"></el-input>
				</el-form-item>


				<el-form-item label="商品一级类:" :label-width="formLabelWidth">
					<el-select v-model="pidValue" multiple filterable remote reserve-keyword placeholder="请输入关键词"
						:remote-method="remoteMethod" :loading="loading" :multiple-limit="1">
						<el-option v-for="item in options" :key="item.good_type_id" :label="item.type_name"
							:value="item.type_name">
						</el-option>
					</el-select>
					<el-button @click="innerVisible=!innerVisible">新建一级标题</el-button>

					<el-dialog width="30%" title="添加一级标题" :visible.sync="innerVisible" append-to-body>
						
					</el-dialog>
				</el-form-item>


				<el-form-item label="商品二级类:" :label-width="formLabelWidth">
					<el-select v-model="value3" :multiple-limit="1" multiple filterable allow-create
						default-first-option placeholder="请选择文章标签">
						<el-option v-for="item in options3" :key="item.good_type_id" :label="item.type_name"
							:value="item.type_name">
						</el-option>
					</el-select>
					<el-button>新建二级标题</el-button>
				</el-form-item>

				<el-form-item label="商品价格:" :label-width="formLabelWidth">
					<el-input v-model="form.price" autocomplete="off"></el-input>
				</el-form-item>
				
				
				<el-form-item label="商品的封面:" :label-width="formLabelWidth">
					<view class="solids" @tap="ChooseImage(1)" v-if="imageUrl2.length == 0">
						<i  class="el-icon-plus avatar-uploader-icon"></i>
					</view>
					<view v-else class="solids" @tap="ChooseImage(1)" v-for="item,index in imageUrl2">
						<img v-if="item" :src="item" class="avatar">
					</view>
						
				</el-form-item>
				
				<el-form-item label="商品的轮播图:" :label-width="formLabelWidth">
					<view class="solids" @tap="ChooseImage(6)" v-if="imageUrlList.length == 0">
						<i  class="el-icon-plus avatar-uploader-icon"></i>
					</view>
					<view v-else class="solids" @tap="ChooseImage(6)" v-for="item,index in imageUrlList">
						<img v-if="item" :src="item" class="avatar">
					</view>
				</el-form-item>
				

				
				
				<el-form-item label="商品详情:" :label-width="formLabelWidth" class="dd">
					<robin-editor class="editor" 
					    @cancel="hideEditor" 
					    @save="saveEditor" 
					    v-model="html"
					    :imageUploader="uploadImg" 
					    :muiltImage="true">
					</robin-editor>
				</el-form-item>


				<el-form-item label="自定义SKU:" :label-width="formLabelWidth">
					
					<div class="zidiyi-form">
						<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
						  <el-form-item
						    prop="email"
						    label="sku属性:"
						    :rules="[
	
						    ]"
						  >
						    <el-input  value="颜色"></el-input>
							<el-input  value="内存"></el-input>
							<el-input  value="价格"></el-input>
							<!-- <el-input  value="价格" ></el-input> -->
							<el-button>操作</el-button>
						  </el-form-item>
						  <el-form-item
						    v-for="(domain, index) in dynamicValidateForm.domains"
						    :label="'sku' + index"
						    :key="domain.key"
						    :prop="'domains.' + index + '.value'"
						    :rules="{
						      required: true, message: '内容不能为空', trigger: 'blur'
						    }"
						  >
							
							<el-input v-model="domain.value"></el-input>
							<el-input v-model="domain.neic"></el-input>
							<el-input v-model="domain.price"></el-input>
						
							
						
							<el-button @click.prevent="removeDomain(domain)">删除</el-button>
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
						    <el-button @click="addDomain">新增款式</el-button>
						    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
						  </el-form-item>
						</el-form>
						
					</div>
				
				</el-form-item>
				
				<el-form-item label="自定义SKU2:" :label-width="formLabelWidth">
					<div>
						<div class="container222" style="width: 800px;">
							<sku v-model="value" action="http://localhost:8081/index.php" :sku-tree="skuTree" :on-fetch-group="fetchSkuTree"
								:on-fetch-sku="fetchSku" :on-create-group="createGroup" :on-create-sku="createSku" @on-change="change">
							</sku>
							<sku-table :data="value" :flatten="flatten" @on-change-data="handleChangeData"></sku-table>
							<br>
							<div @click="saveMessage">保存一下</div>
						</div>
							
					</div>
						
				</el-form-item>
				<el-form-item label="自定义SKU2明细:" :label-width="formLabelWidth">
						
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="uploadSomething">确 定</el-button>
			</div>

		</el-dialog>

	</div>

</template>



<script>
	import jinEdit from "../jin-edit/jin-edit.vue"
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
				flag1:false,
				sku: [
				],
				value: [
				],
				skuTree: [
				],
				data: [],
				flatten: [
				],
				
				good_id:"",//当前货物的id
				type_id: "",
				type_parent_id:"",
				
				html:"",
				
				dynamicValidateForm: {
				          domains: [],
		
				        },
	
				
				imageUrl2: [],
				
				imageUrlList:[],
				
				
				innerVisible: false,
				options3: [{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}],
				value3: [],
				options: [],
				pidValue: [],
				pid: [],
				list: [],
				loading: false,
				states: [],
				list2: [],
				
				// 下拉搜索
				select1: "",
				tableData: [],
				//这里是当前页第一页
				currentPage1: 1,
				//每一页的数量
				pagenum: 6,
				// 所有数据的总条数
				countmessage: 0,
				// 这里是所有的数据
				alltabledata: [],
				multipleSelection: [],
				tableData2: [],
				dialogTableVisible: true,
				dialogFormVisible: true,
				form: {
					name: '',
					price: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
					parent_id: '',
					pparent_id: ''
				},
				formLabelWidth: '130px',
				
			};
		},
		onLoad() {
			let that = this
			let a = localStorage.getItem('mesage')
			let mesage = JSON.parse(localStorage.getItem('mesage'))
			console.log(mesage,'neic')
			// that.sku = mesage.sku
			// this.$set(that.sku)
			// that.flatten =  mesage.data 
			// that.data = mesage.data
			// this.$set(that.data)
			// this.$forceUpdate()
			// that.value = mesage.value
			// that.skuTree =  mesage.skuTree
			// this.$forceUpdate()
			
	
			uni.request({
				url: "http://api_devs.wanxikeji.cn/api/admin/goodsTypeList",
				data: {
					token: localStorage.getItem('token'),
				},
				success: function(res) {
					console.log(res.data.data)
					that.list = res.data.data
					that.list2 = res.data.data
					let d = res.data.data.filter(res => {
						return res.good_type_id == 1615
					})
					console.log(d)

				}
			})

			this.countmessage = this.alltabledata.length;
			this.tableData = this.alltabledata.slice(0, this.pagenum);

			// 获取所有的数据
			uni.request({
				url: 'http://api_devs.wanxikeji.cn/api/admin/goodList',
				data: {
					token: localStorage.getItem('token'),
					page: "1",
					size: "1000"
				},
				success: function(res) {
					let c = res.data.data.data.filter(res => {
						res.create_time = new Date(parseInt(res.create_time) * 1000).toLocaleString()
							.replace(/:\d{1,2}$/, ' ')
						res.update_time = new Date(parseInt(res.update_time) * 1000).toLocaleString()
							.replace(/:\d{1,2}$/, ' ')
						return 1 > 0
					});
					that.alltabledata = c;
					that.countmessage = that.alltabledata.length;
					that.tableData = that.alltabledata.slice(0, that.pagenum);
				}
			})
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
			,
			addProduct(){
				let that = this
				that.good_id = ""
				that.form.name = "",
				that.type_id = "",
				that.type_parent_id ="",
				that.form.price = "",
				that.imageUrl2 = [],
				that.imageUrlList = [],
				that.html = "",
				that.value3 = [],
				that.pidValue = [],
				that.dynamicValidateForm.domains = [],
				// this.uploadSomething()
				that.dialogFormVisible = true
				
				
			},
			
			geditS(row){
				let that = this
				that.good_id = row.good_id //保存当前id
				that.dialogFormVisible = true
				uni.request({
					url: "http://api_devs.wanxikeji.cn/api/admin/goodInfo",
					data: {
						token: localStorage.getItem('token'),
						good_id: row.good_id
					},
					success: function(res) {
						console.log(res)
						let msg = res.data.data
						// that.saveMessage()
					
						// console.log(JSON.parse(JSON.parse(msg.info[0].colour)))
						let mesage = JSON.parse(JSON.parse(msg.info[0].colour))
							console.log(mesage,'取出来的')
							that.sku = mesage.sku
							console.log(that.sku,"这里是Sku")
							// that.$set(that.sku)
							that.flatten =  mesage.data 
							that.data = mesage.data
							// that.$set(that.data)
							that.$forceUpdate()
							that.value = mesage.value
							that.skuTree =  mesage.skuTree
							that.$forceUpdate()
							// console.log(that.data,that.sku,that.skuTree)
						
						that.flag1 = false
						setTimeout(function() {
							that.flag1 = true
						}, 100);
						
						// that.saveMessage()
						// localStorage.setItem("mesage",
						// 	JSON.stringify({
						// 		sku: mesage.sku, 
						// 		flatten: mesage.data, 
						// 		data: mesage.data,
						// 		skuTree: mesage.skuTree,
						// 		value: mesage.value
						// 	})
						// )
							// console.log(mesage,"mesage")
						
							
					
						
						
						
						
						
						that.value3 = [],
						that.pidValue = []
						
						console.log(res)
						
						
						console.log(JSON.parse(msg.info[0].imgs))
						console.log(JSON.parse(msg.info[0].edition))
						
						that.form.name = msg.good_name
						that.type_id = msg.type_id
						that.type_parent_id = msg.type_parent_id
						that.form.price = msg.price
						that.imageUrl2 = []
						that.imageUrl2[0] = msg.img
						that.imageUrlList = JSON.parse(JSON.parse(msg.info[0].imgs))
						that.dynamicValidateForm.domains = JSON.parse(JSON.parse(msg.info[0].edition)) 

						that.html = JSON.parse(msg.info[0].info) 
						
						
						
						let dd = that.list2.filter(res=>{
							return res.good_type_id == that.type_parent_id
						})
						let dd2 = that.list2.filter(res=>{
							return res.good_type_id == that.type_id
						})
	
						that.pidValue[0] = dd[0].type_name
						
						
						
						that.value3[0] = dd2[0].type_name
						that.$set(that.pidValue)
						
						that.$set(that.value3)
						
						
					}
				})
				
				
				console.log(row)
				
			},
			
			uploadSomething(){
				let that = this
				
				if(this.good_id != ""){
					
					that.sku = ""
					
					
						
					
					uni.request({
						url:"http://api_devs.wanxikeji.cn/api/admin/addModifyGood",
						data:{
							token: localStorage.getItem('token'),
							good_name: that.form.name,
							type_id: that.type_id,
							type_parent_id: that.type_parent_id,
							price: that.form.price,
							img: that.imageUrl2[0],
							imgs: JSON.stringify(that.imageUrlList),
							info: that.html,
							edition: JSON.stringify(that.dynamicValidateForm.domains),
							colour: JSON.stringify({sku: that.sku, flatten: that.data, data: that.data,skuTree: that.skuTree,value: that.value}),
							good_id: that.good_id
							
						},
						success:function(res){
							console.log(res)
							console.log("修改i成功")
						}
					})
				}else{
					uni.request({
						url:"http://api_devs.wanxikeji.cn/api/admin/addModifyGood",
						data:{
							token: localStorage.getItem('token'),
							good_name: that.form.name,
							type_id: that.type_id,
							type_parent_id: that.type_parent_id,
							price: that.form.price,
							img: that.imageUrl2[0],
							imgs: JSON.stringify(that.imageUrlList),
							info: that.html,
							colour: JSON.stringify({sku: that.sku, flatten: that.data, data: that.data,skuTree: that.skuTree,value: that.value}),
							edition: JSON.stringify(that.dynamicValidateForm.domains),
						},
						success:function(res){
							console.log(res)
							console.log("添加成功")
						}
					})
					
				}
				
				
				// 增加一条
			
				// this.dialogFormVisible = !this.dialogFormVisible
			},
			
			submitForm(formName) {
			        this.$refs[formName].validate((valid) => {
			          if (valid) {
			            alert('submit!');
			          } else {
			            console.log('error submit!!');
			            return false;
			          }
			        });
			      },
			      resetForm(formName) {
			        this.$refs[formName].resetFields();
			      },
			      removeDomain(item) {
			        var index = this.dynamicValidateForm.domains.indexOf(item)
			        if (index !== -1) {
			          this.dynamicValidateForm.domains.splice(index, 1)
			        }
			      },
			      addDomain() {
			        this.dynamicValidateForm.domains.push({
			          value: '',
			          key: Date.now()
			        });
			      },
			
			// 富文本操作
			uploadImg(img,callback){
				console.log(img)
				callback('http://api_devs.wanxikeji.cn/app/pic/20210601/20210601055706472.jpg')
				console.log("富文本上传图片")
			},
			hideEditor(){
				console.log("富文本取消")
			},
			saveEditor(){
				console.log("富文本保存")
			},
			// 上传图片
			ChooseImage(count = 1) {
			                let self = this;
			                uni.chooseImage({
			                    count: count, //可选择数量，默认9
			                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			                    sourceType: ['album', 'camera'], //从相册选择或从使用相机
			                    success: async (res) => {
			                        //上传图片大小限制
			                        for (let i = 0; i < res.tempFilePaths.length; i++) {
			                            if (res.tempFiles[0].size > 10 * 1024 * 1000) {  //上传图片大小限制
			                                uni.showToast({
			                                    title: "照片大小不能超过10MB",
			                                    icon: "none"
			                                });
			                                return
			                            }
			                        }
			                        try {
			                            uni.showLoading({
			                                title: "上传中...",
			                                mask: true
			                            });
										console.log(res.tempFilePaths,"路径")
			                            for (let i = 0; i < res.tempFilePaths.length; i++) {
			                                uni.uploadFile({
			                                    url: 'http://api_devs.wanxikeji.cn/api/savePic', //post请求的地址
			                                    filePath: res.tempFilePaths[i],
			                                    name: 'img',
			                                    formData: {
			                                        // 'username': this.userInfo.username  //formData是指除了图片以外，额外加的字段
			                                    },
			                                    success: (uploadFileRes) => {
													
													let data = JSON.parse(uploadFileRes.data).data
													let h = "http://api_devs.wanxikeji.cn/" + data
													if(count == 1){
														self.imageUrl2.push(h)
													}else{
														self.imageUrlList.push(h)
													}
																												
													
											
			                                    },
			                                    fail: (res) => {
			                                        console.log(res);
			                                    }
			                                })
			                            }
			                        } catch (e) {
			                            console.log(e);
			                        } finally {
			                            uni.hideLoading();
			                        }
			                    }
			                });
			            },
			

			
			changeValue(pid) {
				console.log(pid)
			},
			
			// 
			remoteMethod(query) {
				this.loading = true;
				setTimeout(() => {
					this.loading = false;
					this.options = this.list.filter(item => {
						return (item.type_name.toLowerCase()
							.indexOf(query.toLowerCase()) > -1 && item.parent_id == 0);
					});
					console.log(this.options)
				}, 200);

			},
			remoteMethod2(query) {
				if (query !== '') {
					this.loading2 = true;

					setTimeout(() => {
						this.loading2 = false;
						this.options2 = this.list2.filter(item => {
							return item.type_name.toLowerCase()
								.indexOf(query.toLowerCase()) > -1;
						});

					}, 200);
				} else {
					this.options2 = [];
				}
			},

			//点击批量删除
			pidelete() {
				this.multipleSelection.forEach((e) => {
					let index3 = -1;
					for (let i = 0; i < this.alltabledata.length; i++) {
						if (this.alltabledata[i].id == e.id) {
							index3 = i;
						}
					}
					if (index3 != -1) {
						this.alltabledata.splice(index3, 1);
						if (this.select1 == "") {
							let tableData3 = this.alltabledata.slice((this.currentPage1 - 1) * this.pagenum, this
								.currentPage1 * this.pagenum);
							if (tableData3.length == 0) {
								this.currentPage1--
								if (this.currentPage1 >= 1) {
									this.tableData = this.alltabledata.slice((this.currentPage1 - 1) * this
										.pagenum, this.currentPage1 * this.pagenum)
								}
							} else {
								this.tableData = tableData3
							}
							this.countmessage = this.alltabledata.length;
						} else {
							// this.tableData = this.tableData2.slice((this.currentPage1 - 1) * this.pagenum, this.currentPage1 * this.pagenum);

							let index4 = -1;
							for (let i = 0; i < this.tableData2.length; i++) {
								if (this.tableData2[i].id == e.id) {
									index4 = i;
								}
							}

							this.tableData2.splice(index4, 1);

							let tableData3 = this.tableData2.slice((this.currentPage1 - 1) * this.pagenum, this
								.currentPage1 * this.pagenum);
							console.log(tableData3, "这里是table3")
							if (tableData3.length == 0) {
								this.currentPage1--
								if (this.currentPage1 >= 1) {
									this.tableData = this.tableData2.slice((this.currentPage1 - 1) * this.pagenum,
										this.currentPage1 * this.pagenum)
								}
							} else {
								this.tableData = tableData3
							}
							this.countmessage = this.tableData2.length;
						}
					}
				});
				// console.log(this.multipleSelection)
			},
			//点击删除
			handleClick(row) {
				console.log(row)
				row.id = row.good_id
				// 线上删除文件
				uni.request({
					url:"http://api_devs.wanxikeji.cn/api/admin/deleteGood",
					data:{
						token: localStorage.getItem('token'),
						good_id:row.id
					},
					success:function(res){
						console.log(res)
						console.log('删除成功')
					}
				})
				
				
				let index1 = -1;
				for (let i = 0; i < this.alltabledata.length; i++) {
					if (this.alltabledata[i].id == row.id) {
						index1 = i;
					}
				}
				if (index1 != -1) {
					this.alltabledata.splice(index1, 1);
				}
				if (this.select1 != "") {
					let index2 = -1;
					for (let h = 0; h < this.tableData2.length; h++) {
						if (this.tableData2[h].id == row.id) {
							index2 = h;
						}
					}
					this.tableData2.splice(index2, 1);
					let tableData3 = this.tableData2.slice((this.currentPage1 - 1) * this.pagenum, this.currentPage1 * this
						.pagenum);

					if (tableData3.length == 0) {
						this.currentPage1--
						if (this.currentPage1 >= 1) {
							this.tableData = this.tableData2.slice((this.currentPage1 - 1) * this.pagenum, this
								.currentPage1 * this.pagenum)
						}
					} else {
						this.tableData = tableData3
					}

					this.countmessage = this.tableData2.length;
				} else {


					let tableData3 = this.alltabledata.slice(
						(this.currentPage1 - 1) * this.pagenum,
						this.currentPage1 * this.pagenum
					);
					if (tableData3.length == 0) {
						this.currentPage1--
						if (this.currentPage1 >= 1) {
							this.tableData = this.alltabledata.slice((this.currentPage1 - 1) * this.pagenum, this
								.currentPage1 * this.pagenum)
						}
					} else {
						this.tableData = tableData3
					}

					this.countmessage = this.alltabledata.length;
				}
			},

			//搜索功能
			selectChange(val) {
				this.tableData = [];
				for (let i = 0; i < this.alltabledata.length; i++) {
					if (this.alltabledata[i].good_name.indexOf(val) != -1) {
						this.tableData.push(this.alltabledata[i]);
					}
				}
				console.log(this.tableData);

				this.tableData2 = this.tableData;
				this.countmessage = this.tableData2.length;
				this.tableData = this.tableData2.slice(0, this.pagenum);
				console.log(this.countmessage);
				this.currentPage1 = 1
			},

			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},

			//页面跳转
			handleCurrentChange(val) {
				if (this.select1 == "") {
					console.log("空的");
					this.countmessage = this.alltabledata.length;
					this.currentPage1 = val;
					this.tableData = this.alltabledata.slice(
						(val - 1) * this.pagenum,
						val * this.pagenum
					);
				} else {
					console.log("不是空的");
					this.countmessage = this.tableData2.length;
					this.currentPage1 = val;
					this.tableData = this.tableData2.slice(
						(val - 1) * this.pagenum,
						val * this.pagenum
					);
				}
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			add1() {
				let that = this
				let id = this.options.filter(res => {
					return res.type_name == that.pidValue[0]
				})
				// console.log(id[0].parent_id,"父级id") // 一级id
				try {
					console.log(id[0].good_type_id, "当前类别一级id") //
					this.options3 = this.list2.filter(res => {
						return res.parent_id == id[0].good_type_id
					})

				} catch (e) {
					//TODO handle the exception
				}

				console.log(this.options3)
			}
		},

		watch: {
			
			pidValue() {
				console.log(this.pidValue[0])
				// this.value3 = []
				this.add1()
			},
			value3() {
				let that = this
				console.log(this.value3)
				let id = this.options3.filter(res => {
					return res.type_name == that.value3
				})
				try {
					console.log(id[0].good_type_id)
					console.log(id[0].parent_id)
					that.type_parent_id = id[0].parent_id
					that.type_id = id[0].good_type_id
				} catch (e) {
					//TODO handle the exception
				}

			}
		}
	}
</script>


<style scoped>
	
	/* 自定义表单 */
	
	.zidiyi-form {
		
	}
	
	
	.dd >>> .wrapper .header {
		position: relative !important;
	}
	.dd >>> .wrapper .toolbar {
		position: relative ; 
	}
	
	.dd >>> .container {
		    margin-top: 20px;
		height: 300px !important;
		border: 1px solid skyblue;
	}
	.dd >>> .header{
		    border: 1px solid rgba(0,0,0,0.1);
			top:20px
	}
	.haha >>> .el-form-item__content {
			display: flex;
			flex-wrap: wrap;
	}
	.zidiyi-form >>> .el-form-item__content {
		margin-left: 0;
		display: flex;
		flex-wrap: nowrap;
	}
	.haha >>> .el-dialog{
		width: 80%;
	}
	.solids {
		width: 200px;
		height: 200px;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.titlehead {
		display: flex;
		justify-content: space-between;
	}

	.icon1 {
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background-color: #2c3e50;
		color: #fff;
		border-radius: 6px;
	}

	.icon2 {
		background-color: #18bc9c;
		height: 30px;
		width: 70px;
		text-align: center;
		line-height: 30px;
		border-radius: 6px;
		color: white;
		font-size: 14px;
	}

	.icon3 {
		background-color: #ef8a80;
		color: #fff;
		height: 30px;
		line-height: 30px;
		padding: 0 6px;
		border-radius: 7px;
	}

	.block {
		text-align: right;
	}
</style>
