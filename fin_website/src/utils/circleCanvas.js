export const initCircleCanvas=function (data){
	for(var i=0;i<data.length;i++){
		initCanvas(data[i].canvasId,data[i].num,data[i].word,data[i].time);
	}
	
	function initCanvas(canvasId,num,word,time){
		var canvas = document.getElementById(canvasId);
		var ctx = canvas.getContext('2d');
		var img=document.createElement('img');
		img.setAttribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEN0FCODI0MzI0QTExRThCNjJDOUU3NzgyQzFGOUQ2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEN0FCODI1MzI0QTExRThCNjJDOUU3NzgyQzFGOUQ2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEQ3QUI4MjIzMjRBMTFFOEI2MkM5RTc3ODJDMUY5RDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ3QUI4MjMzMjRBMTFFOEI2MkM5RTc3ODJDMUY5RDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6eeeoeAAAFY0lEQVR42uycW2xVRRSGVxspiYqGauShpdZqpTFiTUVjtAoaL6iIUdEHfMFEqkE0SryWBzVagvGWIOItyouiaPEGWjBeIyKC1dQqqbQq1hrjhRKlmLRo6v/v/W85NuecbtqzT8++rORLk9PTmTV/Z/asPbNmiv5pfdbyYEWgBpwMpoJqcBQ4HBwCDtb3+sCf4HfwPegE7WAr6ACDQTt6QIBlHwhmgdngPDV2M2gDm8AO8Cv4Q78zCXMoOAJUgmPBTHC3fvc2eAOsA38F8p8LoIecBK4Hl4PPwWqwXgKMxiolzpWqYw14XL0nZ1acw7LOAu+B10GXhgY/eyIHYpjKYFlnq2zW8Sr4UPUUjCDHgRbwDHgRHA2WgO4Ah2O36qgCz6vuFvkyZoKMB/eCjeADPTSfAv2WPxtQnTXygb7cJ9/yKkiVKj9R3C/nxsoG5AN9qZVvVfkSZA7YAlZpBum2wrFu+bRKPs4JetptBNeBC1VhIRpjlUfUS9Zo6l6Sa0EYWD0EzgGngR4rfNsqX98Ch4Fb/AR2focMxTgDzAiJGJ71yOcz/fYSP4LcoZ7BoKjXwme98v0icNNohwyjzQXqejstvLZTz71N6jXNI+khnLYeA5eGbJhkGz5sy6PZpuRMgpSAl8BdoNWiY616UXxZbfQtCKfXn8GTFj1jm35SG309Q44BC0GdRdcWqrc8p5fErD1kGXigwCLQICLaB/U8yTpk6vWi9LBF39jGKWpzRkEa9ZK0NwaC7FVbGzMJwlWoE8BKi4+tVJvr0gmyQGNqIEaCsK3LQcN/L21aUz1IUxHH1C8WL5tk7sr+ZNDv9RDG+Z/GUAxTm78AF6cOmUu0dhBX47vNLE8QrnWca+5WQVxtg7mr+Y4gfG70RTwQ8xOo/c0onYJwe3GzJUYN6ikIV6nbEj3sSzC1WC9zHYkejgbVFKQC/JjoYT+Acgoy0cK5VhpEPDKRgkwAuxM9HA0mJIKkESQx10q8wGy3eknczRkpiSD/F6SPguwCpYkejga9xYrjJyd6OPFYDwXhMnxNooejQWexYvjaRA9nbbWdgjDx5dRED0eDjRTkGz1hK2L+/OAuZhcFYVYNM4RnxliQ88H7XmBGY7LtZTEWhHkwa1MFeVNjaFIMxWCb64YKsge8AubFUJB5ant/qiC0FeamCZTE7IXuBvC090GqIJ+Br8HVMRKEbf3KUrKkhr7+M0/8NjAuBmKMU1ubUj8cKgizf7eDRTEQ5GZzT2x9lPphupSqG81NX3zBort5xUDsVnPTTS1bDzGpxnTM5RHuHcs0iXT6EYTGNOgycG0ExWjQckfaVO9MmcxMJLkCfKzZJyq5qgzA7jE3ryztQadsi8zfaY7mubbyCIjBNrymNn2b6UvD5bozb4JbnTxiwYN+Yc13L1UbVliWPPfheohnS8G75uaPlIZUjA1qw9Lhvux3X2aR7TtsWBYiMcps3+FEX7GVX0EGFcjwUPInYFoIxJgmX1fL98FcCuJZk5Rer0qKClCIIvnWIl+b9uePR7KV2ay1k7nmnsMvpKXHCvk0V1Fo8/4WMNK93S7N5VyxZ/bR7WO8bFAiH9rkU326KDRIQUyBzWJwurkH/ToUBY7PsxANqnuGfFlsozhdnovd/23gAnANuEpBT2PAQ4ll36ngkXXOlw/bRltwLtMheDPEdHPPtTGYa9fcPz9HkW65ynpHZVerrumqJzdP5ABvmGH+PLODmTLNC1WYZeBdqMK9oB3gN3NvlOnTgg0vTWGKF/eJKs3Noa3VQ5yfcbuEi8G8UGVPIFNUnq/cOQUcr4YemSJA6pU7u/STSXDb1Ru2WJ6u3PlXgAEAghkm+GnpSPcAAAAASUVORK5CYII=");

		//画布属性
		var mW = canvas.width=200;
		var mH = canvas.height=200;
		canvas.height=mH*4;
		canvas.width=mW*4;
		ctx.scale(4,4);//锯齿
		var lineWidth =2;
		var rangeValue=0;
		var nowRange = 0; //用于做一个临时的range
		//圆属性
		var r = mH / 2; //圆心
		var cR = r - 16 * lineWidth; //圆半径

		//Sin 曲线属性
		var sX = 0;
		// var sY = mH / 2;
		var axisLength = mW; //轴长
		var waveWidth = 0.045 ; //波浪宽度,数越小越宽 
		var waveHeight = 8; //波浪高度,数越大越高
		var speed = 0.08; //波浪速度，数越大速度越快
		var xOffset = 0; //波浪x偏移量

		ctx.lineWidth = lineWidth;
	
			//画圈函数
			var IsdrawCircled = false;
			var drawCircle = function(){
			ctx.beginPath();
			ctx.strokeStyle = '#fdcd9e';
			ctx.arc(r, r, cR, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(r, r, cR, 0, 2 * Math.PI);
			ctx.fillStyle = 'rgba(255,253,249,.26)';
			ctx.fill();
			ctx.beginPath();
			ctx.arc(r, r, cR+1.5, 0, 2 * Math.PI);
			ctx.clip();
			ctx.drawImage(img, 0, 0, 200, 200); // 在刚刚裁剪的园上画图
			ctx.restore(); // 还原状态
		}
		//画sin 曲线函数
		var drawSin = function(xOffset){
			var dY;
			ctx.save();
		
			var points=[]; //用于存放绘制Sin曲线的点
		
			ctx.beginPath();
			//在整个轴长上取点
			for(var x = sX; x < sX + axisLength; x += 20 / axisLength){
				//此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
				var y = -Math.sin((sX + x) * waveWidth + xOffset);
				
				if(Number(num)<=30){
					dY = mH * (1 - nowRange / 100 )-30;
				}else{
					dY = mH * (1 - nowRange / 100 );
				}
				points.push([x, dY + y * waveHeight]);
				ctx.lineTo(x, dY + y * waveHeight);  
			}
			
			//封闭路径
			ctx.lineTo(axisLength, mH);
			ctx.lineTo(sX, mH);
			ctx.lineTo(points[0][0],points[0][1]);
			var linearGradient1 = ctx.createLinearGradient(sX, mH,0,0);
			linearGradient1.addColorStop(0, 'rgb(245, 102, 0)');
			linearGradient1.addColorStop(1, 'rgb(254, 219, 179)'); 
			ctx.fillStyle = linearGradient1;
			ctx.fill();
			ctx.restore();
		};
		//写文本函数
		var drawWord = function(){
			ctx.save();
				var size = 0.2*cR;
				var timeStyle="#fff";
				if(num==0){
					timeStyle="b0b0b0";
				}
				ctx.font = size + 'px Microsoft Yahei';
				ctx.textAlign = 'center';
				ctx.fillStyle = "#b0b0b0";
				ctx.fillText(word, r, r + size / 2-50);
				ctx.font = size + 'px Microsoft Yahei';
				ctx.textAlign = 'center';
				ctx.fillStyle = timeStyle;
				ctx.fillText(time, r, r + size / 2+50);
				ctx.restore();
		};
		//写百分比文本函数
		var drawText = function(){
			ctx.save();
		
				var size = 0.3*cR;
				ctx.font = size + 'px Microsoft Yahei';
				ctx.textAlign = 'center';
				ctx.fillStyle = "#FD5924";
				if(num){
					ctx.fillText(num.toFixed(2) + '%', r, r + size / 2);
				}else{
					ctx.fillText('0.00%', r, r + size / 2);
				}
				ctx.restore();
		};
	
		var render = function(){
				var tmp;
				ctx.clearRect(0, 0, mW, mH);
				rangeValue = num;
				if(IsdrawCircled == false){
				drawCircle();
				}
				if(nowRange <= rangeValue){
					tmp = 1;
				nowRange += tmp;
		
				}
				if(nowRange > rangeValue){
					tmp = 1;
				nowRange -= tmp;
			
				}
				drawSin(xOffset);
				drawText();
				drawWord();
				xOffset += speed;
				requestAnimationFrame(render);
		}
		render();
		
	}
	
}
// export const initMsgAnimate=function (msgData){
// 		for(var j=0;j<msgData.length;j++){
// 			initMsg(msgData[j].divClass);
// 		}
// 		function initMsg(divClass){
// 			//获得当前
// 		    var $uList = $("."+divClass+" ul");
// 		    var timer = null;
// 		    //触摸清空定时器
// 		    $uList.hover(function() {
// 		        clearInterval(timer);
// 		    },
// 		    function() { //离开启动定时器
// 		        timer = setInterval(function() {
// 		            scrollList($uList);
// 		        },
// 		        1000);
// 		    }).trigger("mouseleave"); //自动触发触摸事件
// 		    //滚动动画
// 		    function scrollList(obj) {
// 		        //获得当前的高度
// 		        var scrollHeight = $("."+divClass+" li:first").height();
// 		        //滚动出一个的高度
// 		        $uList.stop().animate({
// 		            marginTop: -scrollHeight
// 		        },
// 		        1000,
// 		        function() {
// 		            //动画结束后，将当前marginTop置为初始值0状态，再将第一个拼接到末尾。
// 		            $uList.css({
// 		                marginTop: 0
// 		            }).find("li:first").appendTo($uList);
// 		        });
// 		    }
// 		}
// }
