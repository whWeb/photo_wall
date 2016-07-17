// JavaScript Document
function drag(obj){
	var disX = 0;
	var disY = 0;
	var closeObj = null;
	var left = 0;
	var top = 0;
	obj.onmousedown = function(ev){
		left = obj.style.left;
		top = obj.style.top;
		var ev = ev || window.ev;
		obj.style.zIndex = zIndex++;
		disX = ev.clientX - obj.offsetLeft;
		disY = ev.clientY - obj.offsetTop;
		document.onmousemove = function(ev){
			var ev = ev || window.ev;
			obj.style.transition = '';
			obj.style.left = ev.clientX - disX + 'px';  
			obj.style.top = ev.clientY - disY + 'px';
			var clArr = new Array();
			for(var i = 0; i < imagL; i ++){
				if(obj != images[i] ){
					var b = checkCls(obj, images[i]);       
					if(b){ clArr.push(images[i]);}  //检查是否和obj碰撞，并将碰撞的元素存入clArr
				}
			}
			closeObj = getCloseObj(obj, clArr);
			for (var i=0; i<imagL; i++) {
				images[i].style.border = '0px solid red';
			}
			if(closeObj){
				closeObj.style.border = '1px solid red';
			}
		}
		document.onmouseup = function(ev){
			document.onmousemove = null;
			document.onmouseup = null;
			if(closeObj){
				obj.style.left = closeObj.style.left;
				obj.style.top = closeObj.style.top;
				closeObj.style.left = left;
				closeObj.style.top = top;
				closeObj.style.border = '0px solid red';
			}else{
				obj.style.left = left;
				obj.style.top = top;						
			}	
		}
		return false;	                //阻止默认事件
	}
}

function checkCls(obj1, obj2){
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;
	
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj1.offsetHeight;
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj1.offsetWidth;	
	
	if(T2 > B1 || L2 > R1 || R2 < L1 || B2 < T1){
		return false;
	}else{
		return true;
	}		
}

function getCloseObj(obj, clArr){
	var min = 100000;
	var closeObj = null;
	for(var i = 0; i < clArr.length; i++){
		var a = obj.offsetLeft + obj.offsetWidth - (clArr[i].offsetLeft + clArr[i].offsetWidth);
		var b = obj.offsetTop + obj.offsetHeight - (clArr[i].offsetTop + clArr[i].offsetHeight);
		var c = Math.sqrt(a*a + b*b);
		if(c < min){
			min = c;
			closeObj = clArr[i];
		}
	}
	return closeObj;
}
