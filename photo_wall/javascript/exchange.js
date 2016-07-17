// JavaScript Document
window.onload = function(){
	images = document.getElementsByTagName('img');	
	imagL = images.length;
	zIndex = 0;
	var top;
	var left;
	var oriPos = new Array();
	for(var i = 0; i < imagL; i++){
		top = images[i].offsetTop;
		left = images[i].offsetLeft;
		drag(images[i]);
		oriPos.push({
			top: top,
			left: left
		});
	}
	
	for(var i = 0; i < imagL; i++){
		drag(images[i]);
		images[i].style.position = 'absolute';
		images[i].style.left = oriPos[i].left + 'px';
		images[i].style.top = oriPos[i].top + 'px';
	}

	var bnt = document.getElementsByTagName('input')[0];
	bnt.onclick = function(){
		var arr = new Array();
		for (var i=0; i<imagL; i++) {
			arr.push(i);
		}
		arr.sort(function() {
			return Math.random() - 0.5;
		})
		for(var i = 0; i < imagL; i++){
			images[i].style.position = 'absolute';
			images[i].style.transition = 'left 2s, top 2s';
			images[i].style.left = oriPos[arr[i]].left + 'px';
			images[i].style.top = oriPos[arr[i]].top + 'px';
		}
	}
}