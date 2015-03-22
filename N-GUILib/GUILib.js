/**
 * GUILib 총괄 객체
 *
 * @since API 1
 * @author 아포카토맨
 * @namespace
 */
var GUILib = {};

/**
 * API 버전을 얻습니다
 *
 * @since API 1
 * @author 아포카토맨
 * @return {Number} - API 버전
 */
GUILib.getApiVersion = function() {
	return 1;
};

/**
 * 에러 내용을 보여줍니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Error} e - 에러 객체
 */
GUILib.parseError = function(e) {
	print(e.name+" : "+e.message+" at #"+e.lineNumber);
};

/**
 * 현재 컨텍스트를 얻습니다
 *
 * @since API 1
 * @author 아포카토맨
 * @return {Context}
 */
GUILib.getContext = function() {
	return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
};





/**
 * GUILib 버튼클래스
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @param {String} text
 * @param {Function} callback
 * @class
 */
GUILib.Button = function(x, y, width, height, text, callback) {
	try {
		if((typeof x === "number" && !isNaN(x)) || (typeof y === "number" && !isNaN(y)) || (typeof width === "number" && !isNaN(width)) || (typeof height === "number" && !isNaN(height))) {
			this.x = x * Utils.FOUR;
			this.y = y * Utils.FOUR;
			this.width = width * Utils.FOUR;
			this.height = height * Utils.FOUR;
			var spritesheet = Utils.getImage("images/gui/spritesheet.png");
			var off = Utils.stretchImage(Utils.trimImage(spritesheet, 0, 32, 8, 8), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 4*Utils.FOUR, width*Utils.FOUR, height*Utils.FOUR);
			var on = Utils.stretchImage(Utils.trimImage(spritesheet, 8, 32, 8, 8), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 4*Utils.FOUR, width*Utils.FOUR, height*Utils.FOUR);
			this.mainplate = new android.widget.Button(GUILib.getContext());
			this.mainplate.setText(Utils.getStringBuilder(text));
			this.mainplate.setGravity(android.view.Gravity.CENTER);
			var list = new android.graphics.drawable.StateListDrawable();
			list.addState([android.R.attr.state_pressed], off);
			list.addState([], on);
			this.mainplate.setBackgroundDrawable(list);
		} else {
			throw new Error("Illegal argument error");
		}
	} catch(e) {
		GUILib.parseError(e);
	}
};

GUILib.Button.prototype = {};

/**
 * 버튼을 화면에 띄웁니다
 *
 * @since API 1
 * @author 아포카토맨
 */
GUILib.Button.prototype.render = function() {
	Utils.render(this);
};





/**
 * 부가 함수 총괄 객체
 *
 * @since API 1
 * @author 아포카토맨
 * @namespace
 */
var Utils = {};

/**
 * UI스레드내에서 함수를 실행합니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Function} func
 */
Utils.createUiThread = function(func) {
	GUILib.getContext().runOnUiThread(new java.lang.Runnable({
		run: function() {
			func();
		}
	}));
};

/**
 * 전달받은 객체를 화면에 띄워줍니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Object} clazz
 */
Utils.render = function(clazz) {
	Utils.createUiThread(function() {
		try {
			var pw = new android.widget.PopupWindow(GUILib.getContext());
			pw.setContentView(clazz.mainplate);
			pw.setWidth(clazz.width);
			pw.setHeight(clazz.height);
			pw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
			pw.showAtLocation(GUILib.getContext().getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, clazz.x, clazz.y);
		} catch(e) {
			GUILib.parseError(e);
		}
	});
};

/**
 * 2DP를 구합니다
 * 
 * @since API 1
 * @author 아포카토맨
 * @constant
 */
Utils.FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, GUILib.getContext().getResources().getDisplayMetrics());

/**
 * 이미지를 잘라줍니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Bitmap} bm
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Bitmap}
 */
Utils.trimImage = function(bm, x, y, width, height) {
	return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, x, y, width, height), width*Utils.FOUR, height*Utils.FOUR, false);
};

/**
 * 이미지를 늘린 비트맵 드로어블 객체를 얻습니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Bitmap} bm - 원본 비트맵 객체
 * @param {Number} x
 * @param {Number} y
 * @param {Number} stretchWidth
 * @param {Number} stretchHeight
 * @param {Number} width
 * @param {Number} height
 * @return {BitmapDrawable} - 늘려진 비트맵 드로어블 객체
 */
Utils.stretchImage = function(bm, x, y, stretchWidth, stretchHeight, width, height) {
	var blank = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
	var Bitmap = android.graphics.Bitmap;
	var part1 = Bitmap.createBitmap(bm, 0, 0, x, y);
	var part2 = Bitmap.createBitmap(bm, x, 0, stretchWidth, y);
	var part3 = Bitmap.createBitmap(bm, x+stretchWidth, 0, bm.getWidth()-x-stretchWidth, y);
	var part4 = Bitmap.createBitmap(bm, 0, y, x, stretchHeight);
	var part5 = Bitmap.createBitmap(bm, x, y, stretchWidth, stretchHeight);
	var part6 = Bitmap.createBitmap(bm, x+stretchWidth, y, bm.getWidth()-x-stretchWidth, stretchHeight);
	var part7 = Bitmap.createBitmap(bm, 0, y+stretchHeight, x, bm.getHeight()-y-stretchHeight);
	var part8 = Bitmap.createBitmap(bm, x, y+stretchHeight, stretchWidth, bm.getHeight()-y-stretchHeight);
	var part9 = Bitmap.createBitmap(bm, x+stretchWidth, y+stretchHeight, bm.getWidth()-x-stretchWidth, bm.getHeight()-y-stretchHeight);
	var canvas = new android.graphics.Canvas(blank);
	canvas.drawBitmap(part1, 0, 0, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part2, width-bm.getWidth()+stretchWidth, y, false), x, 0, null);
	canvas.drawBitmap(part3, width-bm.getWidth()+stretchWidth+x, 0, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part4, x, height-bm.getHeight()+stretchHeight, false), 0, y, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part5, width-bm.getWidth()+stretchWidth, height-bm.getHeight()+stretchHeight, false), x, y, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part6, part3.getWidth(), height-bm.getHeight()+stretchHeight, false), width-bm.getWidth()+stretchWidth+x, y, null);
	canvas.drawBitmap(part7, 0, height-bm.getHeight()+stretchHeight+y, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part8, width-bm.getWidth()+stretchWidth, part7.getHeight(), false), x, height-bm.getHeight()+stretchHeight+y, null);
	canvas.drawBitmap(part9, width-bm.getWidth()+stretchWidth+x, height-bm.getHeight()+stretchHeight+y, null);
	
	return new android.graphics.drawable.BitmapDrawable(blank);
};

/**
 * 문자열이 아스키코드가 아닌 문자의 포함 여부를 얻습니다
 *
 * @since API 1
 * @author Chalk(amato17)
 * @param {String} str
 * @return {Boolean} - 아스키코드가 아닌 문자의 포함여부
 */
Utils.hasNonAscii = function(str) {
	if(typeof str === "string")
		return str.split('').some(function(e){
			return e >= String.fromCharCode(256);
		});
	return true;
};

/**
 * 마인크래프트 내장 이미지의 비트맵 객체를 얻습니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {String} path - 이미지의 경로
 * @return {Bitmap} - 이미지의 비트맵 객체
 */
Utils.getImage = function(path) {
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack(path));
};

/**
 * 마인크래프트 아이템 이미지를 얻습니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {Array} data
 * @return {Bitmap} - 아이템 이미지의 비트맵 객체
 */
Utils.getItemBitmap = function(data) {
	try {
		if(!Array.isArray(data))
			throw new Error("Illegal argument error");
		eval("var meta = "+new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"))+"");
		var result = null;
		var items_opaque = Utils.getImage("images/items-opaque.png");
		var width = items_opaque.getWidth();
		var height = items_opaque.getHeight();
		meta.forEach(function(element) {
			if(element.name == data[0]&&element.uvs[data[1]] != null) {
				var bgnX = element.uvs[data[1]][0]*width;
				var bgnY = element.uvs[data[1]][1]*height;
				var endX = element.uvs[data[1]][2]*width;
				var endY = element.uvs[data[1]][3]*height;
				result = android.graphics.Bitmap.createBitmap(items_opaque, bgnX, bgnY, endX-bgnX, endY-bgnY);
			}
		});
		return android.graphics.Bitmap.createScaledBitmap(result, result.getWidth()*FOUR, result.getHeight()*FOUR, false);
	} catch(e) {
		GUILib.parseError(e);
	}
};

/**
 * 텍스트를 마인크래프트 폰트로 바꿔줍니다
 *
 * @since API 1
 * @author 아포카토맨
 * @param {String} text - 바꿀 텍스트
 * @return {SpannableStringBuilder} - 바뀐 텍스트
 */
Utils.getStringBuilder = function(text) {
	var divide = function(a) {
		var b = 0;
		if (a > 256)
			b = a % 256;
		else
			b = a;
		return [b, Math.floor(a / 256)];	
	};
	var builder = new android.text.SpannableStringBuilder(text);
	for(var i = 0; i < text.length; i++) {
		var d = divide(text.charCodeAt(i));
		var x = (((parseInt(d[0], 10)) % 16)) * 16;
		var y = Math.floor(parseInt(d[0], 10) / 16) * 16;
		var num = parseInt(d[1], 10).toString(16).toUpperCase();
		var bitmap = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(Utils.getImage("images/font/glyph_"+num+".png"), x, y, 16, 16), 32, 32, false);
		builder.setSpan(new android.text.style.ImageSpan(GUILib.getContext(), bitmap), i, i+1, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
	}
	return builder;
};





/**
 * GUILib 객체를 다른 스크립트에 등록합니다
 */
function selectLevelHook() {
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	for(var i = 0; i < scripts.size(); i++) {
		var script = scripts.get(i);
		var scope = script.scope;
		if(org.mozilla.javascript.ScriptableObject.hasProperty(scope, "GUILib"))
			continue;
		org.mozilla.javascript.ScriptableObject.putProperty(scope, "GUILib", GUILib);
	}
}