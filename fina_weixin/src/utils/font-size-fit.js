export default function(){
	var designWid=1080;
	var deviceWidth=document.body.offsetWidth;
	var html=document.documentElement;
	var ratio=designWid/47;
	html.style.fontSize=deviceWidth/ratio+'px';
}
