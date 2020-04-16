export default function(){
	var designWid=750;
	var deviceWidth=document.body.offsetWidth;
	var html=document.documentElement;
	var ratio=designWid/32;
	html.style.fontSize=deviceWidth/ratio+'px';
}
