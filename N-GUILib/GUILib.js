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
 * 부가 함수 총괄 객체
 *
 * @since API 1
 * @author 아포카토맨
 * @namespace
 */
var Utils = {};

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
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStream(path));
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
		builder.setSpan(new android.text.style.ImageSpan(ctx, bitmap), i, i+1, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
	}
	return builder;
};