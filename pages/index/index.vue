<template>
	<view class="content">
		<view class="mod-new-reg-bg">
			<h1>商城后台管理</h1>
			<view class="login-box">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<view class="login-tittle"><span>{{tittle}}</span></view>
					<el-form-item class="user" prop="name">
						<el-input placeholder="账号" v-model="ruleForm.name" class="text-input"></el-input>
					</el-form-item>
					<el-form-item class="pss" prop="pass">
						<el-input class="text-input" placeholder="密码" v-model="ruleForm.pass" show-password></el-input>
					</el-form-item>
					<el-form-item class="pss " prop="conpass" v-if="queren" style="
    margin-top: -22px">
						<el-input class="text-input" placeholder="确认密码" v-model="ruleForm.conpass" show-password>
						</el-input>
					</el-form-item>
					<view class="btn">
						<el-button @click="open('ruleForm')" v-if="!queren" style="margin-top:5px; margin-bottom: 5px;">登录</el-button>
						<el-button @click="qued('ruleForm')" v-if="queren">确定</el-button>
						<el-button @click="login" v-if="queren">前去登录</el-button>
					</view>
					<view class="foot">
						<view class="logincode" @click="setuser" v-if="!queren">立即注册</view>
					</view>
				</el-form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				dialogVisible: true,
				queren: false,
				tittle: '账号登陆',
				userdata: {},
				ruleForm: {
					name: '',
					pass: '',
					conpass: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入账号名称',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					conpass: [{
							required: true,
							message: '确认密码',
							trigger: 'blur'
						},
						{
							validator: validatePass2,
							trigger: 'blur'
						}
					]
				}
			}
		},

		onLoad(e) {
			console.log(e.id); //打印出上个页面传递的参数。
			console.log(e.name); //打印出上个页面传递的参数。
		},
		methods: {
			
			login(){
				this.queren = !this.queren
			},
			
			//修改注册页面
			setuser() {
				this.tittle = '注册账号';
				this.queren = !this.queren;
			},
			dian() {
				console.log("点击")
			},
			// 注册
			qued(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log("!!")
						const requestTask3 = uni.request({
							url: 'http://api_devs.wanxikeji.cn/api/admin/register',
							data: {
								name: this.ruleForm.name,
								pw: this.ruleForm.pass,
								token: localStorage.getItem("token")
							},
							success: function(res) {
								if (res.data.code == 2000) {
									alert("注册成功")
								}
								if (res.data.code == 2010) {
									// this.tittle = '账号登陆';
									// this.queren = !this.queren;
									this.$forceUpdate(this.tittle,'账号登陆') 
									// console.log(this.tittle)
									alert('用户已存在')
									
								}
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			// 登录
			open(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm.name, this.ruleForm.pass);
						const requestTask1 = uni.request({
							url: 'http://api_devs.wanxikeji.cn/api/admin/login',
							data: {
								name: this.ruleForm.name,
								pw: this.ruleForm.pass
							},
							success: function(res) {
								if (res.data.code == 2000) {
									console.log(res.data.data);
									var token = res.data.data.token
									localStorage.setItem("token", token)
									console.log(token)
									uni.navigateTo({
										url: '/pages/login/login'
									});
								}
					
								if (res.data.code == 2010) {
									alert("密码或用户名错误")
								}
							}
						});
					}
				})

			}


		},

	}
</script>

<style>
	.text-input>>>.el-input__suffix {
		margin-top: 10px;
		right: 8px;
		-webkit-transition: all .3s;
		transition: all .3s;
	}

	.user>>>.el-form-item__error,
	.pss>>>.el-form-item__error {
		color: #F56C6C;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		top: 100%;
		/* left: 0; */
		top: 114%;
		left: -60px;
	}

	.user span,
	.pss span {
		color: red;
		font-size: 12px;
		/* text-align: left; */
		margin-left: -214px;
	}

	h1 {
		position: relative;
		color: #f0f6ff;
		top: 90px;
		text-align: center;
	}

	.logincode {
		display: inline-block;
		width: 90px;
		text-align: center;
		margin: 0;
		font-size: 14px;
		cursor: pointer;
	}

	.foot {
		color: #2e82ff;
		height: 60px;
		line-height: 60px;
		background: #f0f6ff;
		padding: 0 28px;
		position: relative;
		text-align: center;
	}

	.btn {
		position: relative;
		/* left: 28px;
		padding: 42px 0; */
		display: flex;
		justify-content: center;
		flex-direction: column;
		    padding: 2px 28px;
	}

	.btn>>>.el-button {
	}

	button {
		display: block;
		height: 40px;
		width: 300px;
		font-size: 16px;
		font-weight: 800;
		cursor: pointer;
		color: #fff;
		background: #3f89ec;
		border: 0;

	}



	button:hover {
		background-color: #f2f4f7;
		color: #4490f7;
		;
	}

	.text-input>>>.el-input__inner {
		height: 37px;
	}

	input {
		background: none;
		outline: none;
		border: 1px solid rgb(148, 146, 146);
	}

	input:focus {
		border: 1px solid rgb(214, 214, 214)
	}

	button:focus {
		color: #fff;
		border-color: #c6e2ff;
		background-color: #4490f7;
	}

	.text-input {
		display: block;
		position: relative;
		height: 20px;
		padding: 10px 8px;
		-webkit-transition: .3s;
		transition: .3s;
		font-size: 14px;
		color: #666;
		width: 300px;
		margin: auto;
		margin-top: 32px;
		margin-left: -80px;
	}

	.login-tittle {
		font-size: 16px;
		height: 32px;
		line-height: 76px;
		color: #000;
		margin-top: 1px;
		margin-bottom: 15px;
		text-align: center;
	}

	.mod-new-reg-bg {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: url(../../static/wallhaven-0w9wdx.jpg) no-repeat;
		background-size: cover;
	}

	.login-box {
		margin: auto;
		top: 50%;
		margin-top: 200px;
		width: 356px;
		background: rgba(255, 255, 255, .9);
	}
</style>
