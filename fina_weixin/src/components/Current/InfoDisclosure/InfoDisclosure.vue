<template>
	<div class="infoDisclusurView">
		<div class="wrapper" ref="wrapper">
			<div class="content">
				<img class="infoImg" src="../../../assets/images/info1.png" />
				<div class="listTitle">
					<img src="../../../assets/images/info2.png" />
					<span>关于我们</span>
					<img src="../../../assets/images/info2.png" />
				</div>
				
				<div class="aboutUs">
					<p>
						19理财是隶属于杭州盈强投资管理有限公司旗下的互联网金融服务平台，成立于2017年8月，由从事金融管理和互联网等行业多年的精英团队倾力打造。19理财网络借贷平台采用创新的技术和理念，通过互联网建立一个安全、高效、诚信的服务平台，使个体和个体之间通过互联网平台实现的直接借贷，规范了民间个人之间的借贷行为，使之更加安全、有效，使其阳光化、网络化、信息化、规范化。
					</p>
					<p>
						19理财秉承“诚信、共赢、联合、创新”的理念，以大数据、模型化、决策流、风控业务逻辑为导向，配以可操作性的决策引擎将传统信审模式与大数据风控有效结合，通过建立一个安全， 高效，诚信，互惠互助的网络借贷平台让个人和企业有机会得到更多的帮助和更好的服务，同时得到更高的收益和稳定的回报。
					</p>
				</div>
				<div class="comInfo">
				<div class="listTitle">
					<img src="../../../assets/images/info2.png" />
					<span>公司概况</span>
					<img src="../../../assets/images/info2.png" />
				</div>
				<div class="aboutUs companyPro">
					<table>
						<tr>
							<td>名称</td>
							<td>杭州盈强投资管理有限公司</td>
						</tr>
						<tr>
							<td>类型</td>
							<td>有限责任公司</td>
						</tr>
						<tr>
							<td>统一社会信用代码</td>
							<td>91330106MA28XGD47U</td>
						</tr>
						<tr>
							<td>注册资本</td>
							<td>5000万</td>
						</tr>
						<tr>
							<td>注册地址 </td>
							<td>浙江省杭州市西湖区西溪新座3幢403室</td>
						</tr>
						<tr>
							<td>成立日期</td>
							<td> 2017年8月30日</td>
						</tr>
						<tr>
							<td>经营期限 </td>
							<td> 长期</td>
						</tr>
						<tr>
							<td>经营状态 </td>
							<td> 开业</td>
						</tr>
						<tr>
							<td>法定代表人 </td>
							<td> 任典会</td>
						</tr>
						<tr>
							<td>监事 </td>
							<td> 叶从晓</td>
						</tr>
						<tr>
							<td>经营范围 </td>
							<td>
								第二类增值电信业务中的信息服务业务 （仅 限互联网信息服务）（范围详 见《增值电信业务经营许可证》，有 效期至2022年12月10日）。 实业投 资、投资管理、投资咨询、商务信息咨 询、财务管理、计算机网络技术开发、 技术咨询等。
							</td>
						</tr>
						<tr>
							<td>分支机构 </td>
							<td>无</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="listTitle">
					<img src="../../../assets/images/info2.png" />
					<span>组织架构</span>
					<img src="../../../assets/images/info2.png" />
				</div>
				<div class="conpanyOrg">
				<img class="conpanyOrgImg1" src="../../../assets/images/info3.png" />
				<div class="conpanyOrgImg2"> 
					<div>
						<img src="../../../assets/images/info4.png"/>
						<img src="../../../assets/images/info5.png"/>
					</div>
					
				</div>
				</div>
				<div class="companyEventcnt">
				<div class="listTitle">
					<img src="../../../assets/images/info2.png" />
					<span>公司重大事项</span>
					<img src="../../../assets/images/info2.png" />
				</div>
				<img class="conpanyEvent" src="../../../assets/images/info6.png" />
			</div>
			<div class="listTitle">
					<img src="../../../assets/images/info2.png" />
					<span>法人承诺书</span>
					<img src="../../../assets/images/info2.png" />
				</div>
				<img class="conpanyCommitment" src="../../../assets/images/info7.png" />
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Current',
		data() {
			return {}
		},
		mounted() {
			// this.$nextTick(() => {
			// 	this.scroll = new BScroll(this.$refs.wrapper, {
			// 		click: true
			// 	})
			// })
		}
	}
</script>

<style scoped>
	.infoDisclusurView {
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #f6f6f6;
		text-align: center;
	}
	
	.wrapper {
		height: 100%;
		background: #FFFFFF;
		overflow:auto;
	}
	
	.infoTitle {
		text-align: center;
		font-size: 20px;
		padding: 25px;
		font-weight: bold;
		font-family: "宋体";
	}
	
	.infoImg {
		width: 100%;
	}
	
	.listTitle {
		text-align: center;
		padding: 20px 0;
	}
	
	.listTitle img {
		margin: 0 10px;
		height: 10px;
		width: 10px;
	}
	
	.listTitle span {
		font-size: 18px;
		font-weight: 600;
		font-family: "宋体";
	}
	
	.aboutUs {
		margin: 0 20px;
		border-bottom: 1px dashed #d7d7d7;
		padding: 0 0 20px 0;
	}
	
	.aboutUs p {
		font-family: "微软雅黑";
		text-align: left;
		text-indent: 32px;
		font-size: 12px;
		color: #4A4A4A;
		line-height: 26px;
	}
	.comInfo{background: #FAFAFA;}
	.companyPro{margin: 0 20px;padding-bottom: 20px;}
	.companyPro table td{text-align: left;font-size: 12px;}
	.companyPro table tr td:nth-child(1){color:#A3A3A3;width: 100px;display: inline-block;}
    .companyPro table tr td:nth-child(2){color: #6E6E6E;}
    .conpanyOrg{border-bottom: 1px dashed #d7d7d7;}
    .conpanyOrg .conpanyOrgImg1{width: 90%;}
    .conpanyOrgImg2 div {overflow: hidden;}
    .conpanyOrgImg2 img{width: 40%;display: inline-block;margin: 20px 15px;}
     .conpanyOrgImg2 img:nth-child(1){float: left;}
    .conpanyOrgImg2 img:nth-child(2){float: right;}
    .conpanyEvent{width: 92%;padding-bottom: 20px;border-bottom: 1px dashed #d7d7d7;}
    .companyEventcnt{background: #FAFAFA;}
    .conpanyCommitment{width: 80%;padding-bottom: 20px;}
</style>