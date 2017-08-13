// require('../resource/dom.css');
//加载less或者css文件均可
require('../resource/dom.less');
var fiveChess = require('./fiveChess');
//Dom版本和canvas版本主要区别在UI上，只需要对canvas版本的UI方法进行重写
fiveChess.bindEvent = function() {
	var that = this;
	var chess = this.chess;
	//在棋盘父元素将冒泡的点击事件捕获
	chess.onclick = function(e) {
			var target = e.target;
			var target_class_name = target.className;
			if (target_class_name == 'grid' || target_class_name == 'line-grid') {
				var x = e.offsetX;
				var y = e.offsetY;
				var i = 0,
					j = 0;
				var li_arr = chess.getElementsByTagName('li');
				for (var k = 0; k < li_arr.length; k++) {
					if (li_arr[k] == target) {
						//判断li点击的位置，如果在中线右边就将坐标加1
						i = x > (that.chess_grid_length / 2) ? k % (that.chess_num - 1) + 1 : k % (that.chess_num - 1);
						j = y > (that.chess_grid_length / 2) ? Math.floor(k / (that.chess_num - 1)) + 1 : Math.floor(k / (that.chess_num - 1));
						break;
					}
				}
				that.stepFall(i, j);
			}
		}
		//绑定悔棋和撤销悔棋
	that.bindBtnEvent();
}
fiveChess.drawChessBoard = function() {
	var chess_board = this.chess;
	//使用fragment一次性加载方便，如果性能最佳应使用innerHTML
	var fragment = document.createDocumentFragment();
	for (var i = 0, len = this.chess_num - 1; i < len; i++) {
		var ul = document.createElement('ul');
		ul.className = 'line';
		for (var j = 0, len = this.chess_num - 1; j < len; j++) {
			(function(j) {
				var li = document.createElement('li');
				if (i == 0) {
					//第一行的li需要多一个上边界，nth-child在IE8以下不兼容
					//不能使用ul的border，会导致事件冒泡判断坐标的条件分支过多
					li.className = 'line-grid';
				} else {
					li.className = 'grid';
				}
				ul.appendChild(li);
			})(j)
		}
		fragment.appendChild(ul);
	}
	chess_board.appendChild(fragment);
	this.bindEvent();
}
fiveChess.oneStep = function(i, j) {
	var chess_board = this.chess;
	var div = document.createElement('div');
	div.style.left = (i - 0.5) * this.chess_grid_length + 'px';
	div.style.top = (j - 0.5) * this.chess_grid_length + 'px';
	div.className = 'chess';
	if (this.chess_turn) {
		div.className += ' chess-black';
	} else {
		div.className += ' chess-white';
	}
	chess_board.appendChild(div);
}
fiveChess.backStep = function(i, j) {
	var left = (i - 0.5) * this.chess_grid_length + 'px';
	var top = (j - 0.5) * this.chess_grid_length + 'px';
	var chess_board = this.chess;
	var chess = chess_board.getElementsByClassName('chess');
	var test = this.chess_turn ? /chess-black/ : /chess-white/;
	for (var i = 0, len = chess.length; i < len; i++) {
		var item = chess[i];
		if (item.style.left.trim() == left.trim() && item.style.top.trim() == top.trim()) {
			//将dom节点直接去除
			item.parentElement.removeChild(item);
			// item.className = item.className.replace(test, '').trim();
			break;
		}
	}
}

fiveChess.init();
module.exports = fiveChess;