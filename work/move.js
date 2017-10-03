/*
 	运动函数时间版
 	参数
 	obj:要运动的元素，obj
 	attr:样式名，str
 	duration:运动持续时间，num,单位毫秒
 	target:目标点，num
 	callBack:回调函数，运动结束后要做的事
 * 
 * */
function move(obj,attr,duration,target,callBack){
	/*
	 	b:运动的起始位置,直接获取
	 	c:要运动的距离，计算,target-b,目标点-开始位置
	 	d:duration,传入
	 	t:已运动的时间，计算，当前时间-运动开始时间
	 	0-300px
	 	3s
	 	b=0
	 	c=300-0=300
	 	d=3
	 	0+100*1
	 	当前时间应运动到的位置计算公式
	 	b+c/d*t
	 * 起始位置+运动距离/运动持续时间*已运动时间
	 * */
	var b = css(obj,attr);
	var c = target - b;
	var d = duration;
	//记录运动开始时的时间
	var start = new Date();
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		//当前时间
		var now = new Date();
		//已运动时间=当前时间-运动开始时间
		var t = now - start;
		//定时器不精准，不会正好到设定的时间点，所以限制下
		if(t>=d){
			t = d;
		}
		//当前运动到的位置计算
		var v = b+c/d*t;
		//赋值移动到当前应运动到的位置
		css(obj,attr,v);
		//到达设定时间，关闭定时器，如果有回调函数执行回调函数
		if(t==d){
			console.log(css(obj,attr))
			clearInterval(obj.timer);
			typeof callBack == 'function' && callBack.call(obj);
		}	
	},20)
}
function css(obj,attr,val){
	if(arguments.length==2){
		var v = parseFloat(getComputedStyle(obj)[attr]);
		if(attr == 'opacity'){
			v = Math.round(v*100);
		}
		return v;
	}
	if(attr == 'opacity'){
		val = val/100;
		obj.style[attr] = val;	
	}else{
		obj.style[attr] = val+'px';	
	}	
}