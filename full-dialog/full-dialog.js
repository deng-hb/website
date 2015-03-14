/*!
 *  full-dialog.js by denghb
 *  2014-8-10 1:10
 *  update 2015-03-14
 *  note:
 *     新增配置{'id',fun close,fun ok}
 */

var fullDialog = function(id) {
	return new full_dialog(id);
};
 
var full_dialog = function(id)
{
	this.init(id);
};
full_dialog.prototype = {
	// 自己的
	window : null,
	// 自己的
	document : null,
	// 初始化
	init : function(id) {
		// 变量
		var dialog = null,
		_this = this,
		style = null;
		try {
			// 判断是否有父窗体
			if(window.top != window.self){
				_this.window = top.window;
				_this.document = top.document;
				//try{
				//	_this.document.body.appendChild(document.getElementById(id));
				//}catch(e){
					// IE 6-7 error
				    var elem = document.getElementById(id),
   					div = _this.document.createElement('div');
					div.id = id;
					div.innerHTML = elem.innerHTML;
					_this.document.body.appendChild(div);

					// 移除
					elem.parentNode.removeChild(elem);

				//}
			}else{
				_this.window = window;
				_this.document = document;
			}
			dialog = _this.document.getElementById(id);
			style = dialog.style;
			
		} catch (e) {
			alert('ID:"' + id + '" Not found');
			return;
		}
		// 保存dialog
		_this.dialog = dialog;

		// 添加关闭按钮
		_this.closeButton();

		style.display = 'none';
		style.overflow = 'auto';
		style.position = 'absolute';
		style.left = 0;

		style.background = '#eee';
		style.margin = 0;

		// 销毁对象
		dialog = null;
		style = null;

	},
	// dialog
	dialog : null,
	// 添加关闭按钮
	closeButton : function() {
		var _this = this, dialog = _this.dialog,
		close = _this.document.createElement('div'),
		x = _this.document.createTextNode('×'),
		style = close.style;

		// 样式
		style.position = 'fixed';
		style.right = '20px';
		style.top = '10px';

		style.fontSize = '2em';
		style.width = '1em';
		style.height = '1em';

		style.float = 'right';
		style.cursor = 'pointer';
		//style.fontFamily = 'Comic Sans MS';
		style.fontWeight = 'bold';
		style.color = '#666';

		close.appendChild(x);
		dialog.appendChild(close);

		// 点击
		close.onclick = function() {
			_this.hide();
		};

		// 鼠标移入
		close.onmouseover = function() {
			style.color = '#ddd';
		};

		// 鼠标移出
		close.onmouseout = function() {
			style.color = '#666';
		};
	},
	// 可视宽度
	width : function() {
		var _this = this;
		return _this.window.innerWidth || _this.document.documentElement.clientWidth
				|| _this.document.body.clientWidth
	},
	// 可视高度
	height : function() {
		var _this = this;
		return _this.window.innerHeight || _this.document.documentElement.clientHeight
				|| _this.document.body.clientHeight
	},
	// 滚动条高度
	scrollTop : function() {
		var _this = this;
		return _this.window.scrollY || _this.window.pageYOffset || _this.document.documentElement.scrollTop
				|| _this.document.body.scrolltop || 0
	},
	// 显示
	show : function() {

		// 获取参数
		var _this = this, dialog = _this.dialog, style = dialog.style, scroll_top = _this.scrollTop(),
		width = _this.width(), height = _this.height();
		// 隐藏窗体的滚动条
		_this.document.body.style.overflow = 'hidden';

		// 设置初始显示样式
		style.opacity = 0;
		style.display = 'block';
		
		style.width = width + 'px';
		style.height = height + 'px';
		// 设置层级
		var dialog_show = _this.getFullDialogShow(),
		dialog_show_length = dialog_show.length;
		if(0 < dialog_show_length){
			// 获取最大zIndex
			var zIndex = 0;
			for(var i = 0;i < dialog_show_length;i++){
				
				var style1 = dialog_show[i].style;
				if(i+1 < dialog_show_length){
					var style2 = dialog_show[i].style;
					if(parseInt(style1.zIndex) > parseInt(style2.zIndex)){
						zIndex = style1.zIndex;
					}else{
						zIndex = style2.zIndex;
					}

				}else{
					zIndex = style1.zIndex;
				}
			}
			style.zIndex = parseInt(zIndex) + 100;
		}else{
			style.zIndex = 9999;
		}

		// 设置一个Class
		dialog.setAttribute('class', 'full-dialog-show');

		// 设置动画
		var i = 0, j = scroll_top + 200;
		var s = setInterval(function() {
			style.opacity = i;
			i += 0.1;

			j -= 20;
			style.top = j + 'px';

			if (1 == parseInt(i)) {
				clearInterval(s);
				style.opacity = 1;
				style.top = scroll_top + 'px';
			}

		}, 10);
		return false;
	},
	// 隐藏
	hide : function() {
		var _this = this, dialog = _this.dialog, scroll_top = _this.scrollTop(), style = dialog.style;

		var i = 0, j = 1;
		var s = setInterval(function() {
			style.top = (scroll_top + i) + "px";
			i += 10;

			style.opacity = j;
			j -= 0.1;
			if (100 == parseInt(i)) {
				clearInterval(s);
				style.opacity = 0;
				style.display = 'none';
				dialog.removeAttribute('class');
				// 判断是否只有一个dialog处于显示状态
				var dialog_show = _this.getFullDialogShow();	
				if(1 > dialog_show.length){
					_this.document.body.style.overflow = 'auto';
				}
			}
		}, 10);
		return false;
	},
	//  重置填充
	resize : function() {
		var _this = this;
		if(window.top != window.self){
			_this.window = top.window;
			_this.document = top.document;
		}else{
			_this.window = window;
			_this.document = document;
		}
		var dialog_show = _this.getFullDialogShow(),
		dialog_show_length = dialog_show.length;
		if(0 < dialog_show_length){
			for(var i=0;i< dialog_show_length;i++){
				var style = dialog_show[i].style,width = _this.width(), height = _this.height();
				style.width = width + 'px';
				style.height = height + 'px';
			}
		}
	},
	// 判断IE
	isIE : "ActiveXObject" in window,
	// 得到显示中的dialog
	getFullDialogShow : function(){
		return this.document.getElementsByClassName('full-dialog-show');
	}
};

window.onresize = function() {
	full_dialog.prototype.resize();
};

if(!document.getElementsByClassName){
    document.getElementsByClassName = function(className, element){
        var children = (element || document).getElementsByTagName('*');
        var elements = new Array();
        for (var i=0; i<children.length; i++){
            var child = children[i];
            var classNames = child.className.split(' ');
            for (var j=0; j<classNames.length; j++){
                if (classNames[j] == className){ 
                    elements.push(child);
                    break;
                }
            }
        } 
        return elements;
    };
}
