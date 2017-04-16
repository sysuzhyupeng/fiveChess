var config = require('./config');
function FiveChess(chess_num, chess_grid_length){
    //棋盘每个格子的长度
    this.chess_grid_length = chess_grid_length;
    //棋盘为 chess_num * chess_num
    this.chess_num = chess_num;
    // 如果不使用多一层背景画布，在擦除原来的棋子之后会留下透明背景
    this.chess_bg = document.getElementById('chess_bg') || '';
    // 棋盘dom节点引用
    this.chess = document.getElementById('chess-board');
    //是否已经结束
    this.is_over = false;
    //赢法计数
    this.win_count = 0;
    //赢法数组
    this.wins = [];
    //黑棋赢法统计数组
    this.black_win = [];
    //白棋赢法统计数组
    this.white_win = [];
    //轮到谁下，黑棋为true
    this.chess_turn = true;
    //下棋的总步数
    this.total_step = 0;
    //保存每次下棋位置的栈
    this.stack_arr = [];
    //栈上的指针
    this.stack_index = -1;
    //棋盘上所有位置的数组，数组中值为1是黑棋，值为2是白棋，0是没有棋子
    this.chessBoard = [];
    //是否可以撤销悔棋
    this.is_able_cancel = false;
}
FiveChess.prototype = {
    init: function(){
        if(this.chess == '') {
            alert('棋盘不存在');
            return false;
        }
        //计算所有赢法数组
        this.computeCount();
        //初始化棋盘上所有位置的数组
        this.initChessArray();
        //画出棋盘
        this.drawChessBoard();
        //绑定棋盘上的点击事件
        this.bindEvent();
    },
    initChessArray: function(){
        this.chessBoard = [];
        for(var i = 0, len = this.chess_num; i < len; i++){
            this.chessBoard[i] = [];
            for(var j = 0, len = this.chess_num; j < len; j++){
                //0是没有棋子
                this.chessBoard[i][j] = 0;
            }
        }
    },
    //画出棋盘
    drawChessBoard: function(){
        var chess = this.chess_bg;
        var context = chess.getContext('2d');
        for(var i = 0; i < this.chess_num; i++){
            //留下0.5 * this.chess_grid_length的间隔，可以放下第一个和最后一个棋子
            context.moveTo((0.5 + i) * this.chess_grid_length, this.chess_num);
            context.lineTo((0.5 + i) * this.chess_grid_length, (this.chess_grid_length - 1) * this.chess_num);
            context.stroke();
            context.moveTo(0.5 * this.chess_grid_length, (0.5 + i) * this.chess_grid_length);
            context.lineTo((this.chess_grid_length - 1) * this.chess_num, (0.5 + i) * this.chess_grid_length);
            context.stroke();
            context.strokeStyle = '#bfbfbf';
        }
    },
    //计算所有赢法数组
    //当我们判断五子棋是否赢的时候，其实是看是否有五个坐标(i, j)连成一条线
    //那么赢法数组就是对于可能赢的五个坐标分成一组
    //如[0][0]{1}，[0][1]{1}，[0][2]{1}，[0][3]{1}，[0][4]{1}，前两维数组代表坐标，将赢法和这组坐标关联
    //最后一维表示第几种赢法，由于赢法不重复，这里考虑用对象节省空间
    //在[i, j]下了一步棋，所有关于[i, j]的赢法都要更新计数
    //一旦黑棋在[i, j]下了一步棋，所有关于[i, j]的赢法都被黑棋占领
    computeCount: function(){
        //初始化一个js三维数组
        for(var i = 0; i < this.chess_num + 1; i++){
            this.wins[i] = [];
            for(var j = 0; j < this.chess_num + 1; j++){
                this.wins[i][j] = {};
            }
        }
        //竖线
        for(var i = 0; i < this.chess_num; i++){
            //i代表某一行
            for(var j = 0; j < this.chess_num - 4; j++){
                for(var k = 0; k < 5; k++){
                    this.wins[i][j+k][this.win_count] = true;
                }
                this.win_count++;
            }
        }
        //横线
        for(var i = 0; i < this.chess_num; i++){
            for(var j = 0; j < this.chess_num - 4; j++){
                for(var k = 0; k < 5; k++){
                    this.wins[j+k][i][this.win_count] = true;
                }
                this.win_count++;
            }
        }
        //斜线
        for(var i = 0; i < this.chess_num - 4; i++){
            //i代表某一列
            for(var j = 0; j < this.chess_num - 4; j++){
                for(var k = 0; k < 5; k++){
                    this.wins[j+k][i+k][this.win_count] = true;
                }
                this.win_count++;
            }
        }
        //反斜线
        for(var i = 0; i < this.chess_num - 4; i++){
            //i代表某一列
            for(var j = this.chess_num - 1; j > 3; j--){
                for(var k = 0; k < 5; k++){
                    this.wins[i+k][j-k][this.win_count] = true;
                }
                this.win_count++;
            }
        }
        this.initWinArray();
    },
    initWinArray: function(){
        //win_count用来记录赢法
        for(var i = 0; i < this.win_count; i++){
            this.black_win[i] = 0;
            this.white_win[i] = 0;
        }
    },
    bindEvent: function(){
        var that = this;
        var chess = this.chess;
        //绑定棋盘上的点击事件
        chess.onclick = function(e){
            //如果已经结束则跳出
            if(that.is_over){
                return false;
            }
            //下了一步新棋不能撤销悔棋
            that.is_able_cancel = false;
            var x = e.offsetX;
            var y = e.offsetY;
            var i = Math.floor(x / that.chess_grid_length);
            var j = Math.floor(y / that.chess_grid_length);
            //将下棋的操作分离出来，因为撤销悔棋相当于下一次棋
            that.stepFall(i, j);
        }
        //绑定悔棋和撤销悔棋
        that.bindBtnEvent();
    },
    stepFall: function(i, j){
        if(this.chessBoard[i][j] == 0) {
            //更新位置栈
            this.updateStack(i, j);
            //落子的UI实现
            this.oneStep(i, j);
            if(this.chess_turn){
                //黑棋
                this.chessBoard[i][j] = 1;
            } else {
                //白棋
                this.chessBoard[i][j] = 2;
            }
            //对目前的形势进行胜负计算
            this.computeWinner(i, j);
            //总步数++
            this.total_step++;
            //反转下棋顺序
            this.chess_turn = !this.chess_turn;
        }
    },
    //更新位置栈
    updateStack: function(i, j){
        var position = [i, j];
        var len = this.stack_arr.length;
        this.stack_index++;
        if(this.total_step < len){
            //当我们进行了若干悔棋和撤销悔棋的操作(悔棋多于撤销悔棋)
            //我们总步数和步数栈不一致的时候
            //stack_index指向的是当前的步数
            this.stack_arr[this.stack_index] = position;
        } else {
            //当我们总步数和步数栈一致的时候，只需要直接把新的位置push进步数栈
            this.stack_arr.push(position);
        }
    },
    //对目前的形势进行胜负计算的更新
    computeWinner: function(i, j){
        for(var k = 0; k < this.win_count; k++){
            if(this.wins[i][j][k]){
                if(this.chess_turn){
                    this.black_win[k]++;
                    //黑棋占据了i,j 白棋的在这个分组的值直接设为100(不可能获胜的值)
                    this.white_win[k] = 100;
                } else {
                    this.white_win[k]++;
                    this.black_win[k] = 100;
                }
                if(this.black_win[k] == 5){
                    this.is_over = true;
                    //禁用所有按钮
                    this.unbindEvent();
                    alert('黑棋赢了');
                    //避免六子弹出两次提示
                    break;
                }
                if(this.white_win[k] == 5){
                    this.is_over = true;
                    //禁用所有按钮
                    this.unbindEvent();
                    alert('白棋赢了');
                    //避免六子弹出两次提示
                    break;
                }
            }
        }
    },
    //回退刚才的胜负计算
    backWinner: function(i, j){
        for(var k = 0; k < this.win_count; k++){
            if(this.wins[i][j][k]){
                if(this.chess_turn){
                    this.black_win[k]--;
                    this.white_win[k] = 0;
                } else {
                    this.white_win[k]--;
                    this.black_win[k] = 0;
                }
            }
        }
    },
    //绑定悔棋和撤销悔棋的点击事件
    bindBtnEvent: function(){
        var that = this;
        var regret = document.getElementById('regret');
        var cancel = document.getElementById('cancel');
        regret.onclick = function(){
            //悔棋的操作
            that.regretOperate();
        }
        cancel.onclick = function(){
            //撤销悔棋的操作
            that.cancelOperate();
        }
    },
    //撤销悔棋的操作
    cancelOperate: function(){
        var that = this;
        //撤销悔棋设定为必须在上一步是悔棋的情况下
        if(that.stack_index == that.stack_arr.length - 1 || !that.is_able_cancel){
            alert('无法撤销悔棋');
            return false;
        }
        var position = that.stack_arr[that.stack_index + 1];
        var i = position[0];
        var j = position[1];
        that.stepFall(i, j);
    },
    //悔棋的操作
    //因为不涉及人机对战，那么这里悔棋设定为撤回刚下的棋子
    //这时要对上一步的下的棋进行逆操作
    regretOperate: function(){
        if(this.total_step < 1){
            alert('无法悔棋');
            return false;
        }
        //悔棋过可以再撤销
        this.is_able_cancel = true;
        //对上一步的下的棋进行逆操作
        var position = this.stack_arr[this.stack_index];
        var i = position[0];
        var j = position[1];
        this.chess_turn = !this.chess_turn;
        this.backWinner(i, j);
        this.backStep(i, j);
        this.chessBoard[i][j] = 0;
        this.stack_index--;
        this.total_step--;
    },
    //撤销落子的UI实现
    backStep: function(i, j){
        var chess = this.chess;
        var context = chess.getContext('2d');
        context.beginPath();
        context.clearRect(i * this.chess_grid_length, j * this.chess_grid_length, this.chess_grid_length, this.chess_grid_length);
        context.closePath();
        /*
            不采用背景画布采用擦除实现会留下一个透明背景
            context.beginPath();
            context.moveTo(i * this.chess_grid_length, (j + 0.5) * this.chess_grid_length);
            context.lineTo((i + 1) * this.chess_grid_length, (j + 0.5) * this.chess_grid_length);
            context.moveTo((i + 0.5) * this.chess_grid_length, j * this.chess_grid_length);
            context.lineTo((i + 0.5) * this.chess_grid_length, (j + 1) * this.chess_grid_length);
            context.strokeStyle = '#bfbfbf';
            context.stroke();
            context.closePath();
        */
    },
    //落子的UI实现
    oneStep: function(i, j){
        var chess = this.chess;
        var context = chess.getContext('2d');
        context.beginPath();
        context.arc((i + 0.5) * this.chess_grid_length,  (j + 0.5) * this.chess_grid_length, 13, 0, 2 * Math.PI);
        context.closePath();
        var gradient = context.createRadialGradient((i + 0.5) * this.chess_grid_length + 2,  (j + 0.5) * this.chess_grid_length -2 , 13, this.chess_num + i * this.chess_grid_length + 2, this.chess_num + j * this.chess_grid_length -2, 0);
        if(this.chess_turn){
            gradient.addColorStop(0, '#0a0a0a');
            gradient.addColorStop(1, '#635766');
        } else {
            gradient.addColorStop(0, '#d1d1d1');
            gradient.addColorStop(1, '#f9f9f9');
        }
        context.fillStyle = gradient;
        context.fill();
    },
    unbindEvent: function(){
        var that = this;
        var regret = document.getElementById('regret');
        var cancel = document.getElementById('cancel');
        var chess = this.chess;
        //绑定棋盘上的点击事件
        chess.onclick = function(e){
            alert('棋局已结束');
        }
        regret.onclick = function(){
            alert('棋局已结束');
        }
        cancel.onclick = function(){
            //撤销悔棋的操作
            alert('棋局已结束');
        }
    }
}
var fiveChess = new FiveChess(config.chess_num, config.chess_grid_length);
module.exports = fiveChess;




