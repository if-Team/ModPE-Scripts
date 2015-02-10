var elements = new Array();
var currentLength = 0;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
const four = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, ctx.getResources().getDisplayMetrics());
var shorts = "jkltIJT".split("");
var shorts2 = "!i:;".split("");
var affogatoman = true;

var GUILib = {};
GUILib.TODAY_HUMOR = "Copyright";
GUILib.DAILY_BEST = "2015.";
GUILib.RULI_WEB = "Affogatoman";
GUILib.HUMOR_UNIV = "all";
GUILib.DOG_DRIP = "rights";
GUILib.MCPE_KOREA = "reserved.";
var wthnhet = [ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight()];
GUILib.deviceWidth = Math.max.apply(null, wthnhet)/four;
GUILib.deviceHeight = Math.min.apply(null, wthnhet)/four;

//BUTTON
GUILib.GUIButton = function(x, y, width, height, msg, callback) {
	this.pw = true;
	var spritesheet = getImage("gui", "spritesheet", '');
	var bm = android.graphics.Bitmap.createBitmap(spritesheet, 0, 32, 16, 8);
	var off = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 0, 0, 8, 8), 8*four, 8*four, false);
	var on = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 8, 0, 8, 8), 8*four, 8*four, false);
	this.x = x*four;
	this.y = y*four;
	this.width = width*four;
	this.height = height*four;
	this.msg = msg;
	this.callback = callback;
	this.mainplate = new android.widget.RelativeLayout(ctx);
	var btn = new android.widget.Button(ctx);
	btn.setBackgroundDrawable(ninePatch(on, 3*four, 3*four, 5*four, 4*four));
	btn.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	this.mainplate.addView(btn);
	var text = new android.widget.ImageView(ctx);
	var shadow = new android.widget.ImageView(ctx);
	var that = this;
	var ontouch = new android.view.View.OnTouchListener({
		onTouch: function(view, event) {
			var MotionEvent = android.view.MotionEvent;
			switch(event.getAction()) {
				case MotionEvent.ACTION_DOWN:
					if(that.msg != "") {
						shadow.setPadding(four*2, four*4, 0, 0);
				 	text.setPadding(0, four*2, 0, 0);
						text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
					}
				 btn.setBackgroundDrawable(ninePatch(off, 3*four, 3*four, 5*four, 4*four));
				break;
				case MotionEvent.ACTION_UP:
					if(that.msg != "") {
					shadow.setPadding(four*2, four*2, 0, 0);
					text.setPadding(0, 0, 0, 0);
					text.setColorFilter(android.graphics.Color.parseColor("#ffffff"), android.graphics.PorterDuff.Mode.MULTIPLY);
					}
				 btn.setBackgroundDrawable(ninePatch(on, 3*four, 3*four, 5*four, 4*four));
					if(!(event.getX()<0 || event.getY()<0 || event.getX()>width*four || event.getY()>height*four)&&affogatoman) {
						if(callback != null)
							that.callback(that);
						Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 7, 7);
					}
				break;
				case MotionEvent.ACTION_MOVE:
				if(event.getX()<0 || event.getY()<0 || event.getX()>width*four || event.getY()>height*four) {
					if(that.msg != "") {
						shadow.setPadding(four*2, four*2, 0, 0);
						text.setPadding(0, 0, 0, 0);
					 text.setColorFilter(android.graphics.Color.parseColor("#ffffff"), android.graphics.PorterDuff.Mode.MULTIPLY);
					}
					btn.setBackgroundDrawable(ninePatch(on, 3*four, 3*four, 5*four, 4*four));
					} else {
						if(that.msg != "") {
						 text.setPadding(0, four*2, 0, 0);
					 	shadow.setPadding(four*2, four*4, 0, 0);
						 text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
					 }
						btn.setBackgroundDrawable(ninePatch(off, 3*four, 3*four, 5*four, 4*four));
					}
				break;
			}
			return true;
		}
	});
	text.setOnTouchListener(ontouch);
	text.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	text.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	if(this.msg != "")
		getBitmap(msg, text, shadow);
	shadow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	shadow.setPadding(four*2, four*2, 0, 0);
	shadow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	this.mainplate.addView(shadow);
	this.btn = text;
	this.shadow = shadow;
	this.mainplate.addView(text);
}

//BUTTON METHODS
GUILib.GUIButton.prototype = {};
GUILib.GUIButton.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*four);
	this.y = (y == -1 ? this.y : y*four);
	 var that = this;
		ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.GUIButton.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*four);
	this.height = (height == -1 ? this.height : height*four);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			pw.update(that.width, that.height);
	}}));
};
GUILib.GUIButton.prototype.setMessage = function(msg) {
	this.msg = msg;
	getBitmap(this.msg, this.btn, this.shadow);
};
GUILib.GUIButton.prototype.getMessage = function() {
	return this.msg;
};
GUILib.GUIButton.prototype.render = function() {
	if(this.pw)
		elements.push(this);
};
GUILib.GUIButton.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};

//IMAGEBUTTON
GUILib.ImageButton = function(x, y, width, height, bm, callback) {
	this.main = new GUILib.GUIButton(x, y, width, height, "", callback);
	this.x = this.main.x;
	this.y = this.main.y;
	this.width = this.main.width;
	this.height = this.main.height;
	this.image = this.main.btn;
	this.callback = this.main.callback;
	this.pw = true;
	if(typeof(bm) != "string")
		this.image.setImageBitmap(bm);
	else
		this.image.setImageBitmap(eval(bm));
};

//IMAGEBUTTON METHODS
GUILib.ImageButton.prototype = {};
GUILib.ImageButton.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*four);
	this.y = (y == -1 ? this.y : y*four);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.ImageButton.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*four);
	this.height = (height == -1 ? this.height : height*four);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			pw.update(that.width, that.height);
	}}));
};
GUILib.ImageButton.prototype.render = function() {
	if(this.pw)
		elements.push(this.main);
};
GUILib.ImageButton.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};

var _ = function(bitmap, x, y, width, height) {
	return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bitmap, x, y, width, height), width*four, height*four, false);
};
//mcpe internal images
var images = {};
images.setting = _(getImage("gui","touchgui", ''), 219, 0, 20, 20);
/*images.option1
images.option2
images.option3
images.option4
images.chatting
images.mapdelete*/

//reder checking source
new java.lang.Thread(new java.lang.Runnable({run: function() {
	while(1) {
		java.lang.Thread.sleep(50);
		if(elements.length>0) {
			if(currentLength<elements.length) {
				 elements.sort(function(i) {
				 	return (i.isBack ? -1 : 0);
				 }).forEach(function(element) {
					ctx.runOnUiThread(new java.lang.Runnable({run: function() {
						if(element.pw == true) {
							var pw = new android.widget.PopupWindow(ctx);
							element.pw = pw;
							pw.setContentView(element.mainplate);
							pw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
							pw.setWidth(element.width);
							pw.setHeight(element.height);
							pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, element.x, element.y );
						}
					}}));
				});
				 currentLength = elements.length;
			}
		 if(currentLength > elements.length)
			 currentLength = elements.length;
		}
	}
}})).start();

//get internal image bitmap source
function getImage(parent, file, add) {
	var prefs = ctx.getSharedPreferences("mcpelauncherprefs",0);
	var prefs2 = ctx.getSharedPreferences(ctx.getPackageName()+"_preferences",0);
	var mcimg = android.graphics.BitmapFactory.decodeStream(pectx.getAssets().open("images/"+parent+"/"+file+add+".png"));
	if(prefs.getString("texturePack","")!=""&&prefs2.getBoolean("zz_texture_pack_enable", false)) {
		var path = prefs.getString("texturePack","");
		if(!new java.io.File(path).exists())
			return mcimg;
		var zf = new java.util.zip.ZipFile(new java.io.File(path));
		var tpimg = zf.getEntry("images/"+parent+"/"+file+add+".png");
		if(tpimg == null) {
			//if folder is shorter
			if(zf.getEntry(parent+"/"+file+add+".png") != null)
				tpimg = zf.getEntry(parent+"/"+file+add+".png");
				//or shortest
			else if(zf.getEntry(file+add+".png") != null)
				tpimg = zf.getEntry(file+add+".png");
			else
				return mcimg;
		}
		return android.graphics.BitmapFactory.decodeStream(zf.getInputStream(tpimg));
	} else
		return mcimg;
}

//does string have non-ascii? (source was provided by Chalk(amato17))
function hasNonAscii(str) {
	return str.split('').some(function(e){
		return e >= String.fromCharCode(256);
});
}

//making ninepatch drawable source
function ninePatch(bitmap, top, left, bottom, right) {
	var getByteBuffer = function(top, left, bottom, right) {
		var NO_COLOR = 0x00000001;
		var buffer = java.nio.ByteBuffer.allocate(84).order(java.nio.ByteOrder.nativeOrder());
		buffer.put(0x01);
		buffer.put(0x02);
		buffer.put(0x02);
		buffer.put(0x09);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(0);
		buffer.putInt(left);
		buffer.putInt(right);
		buffer.putInt(top);
		buffer.putInt(bottom);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		buffer.putInt(NO_COLOR);
		return buffer;
	};
	var buffer = getByteBuffer(top, left, bottom, right);
	var patch = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
	return patch;
}

//drawing font source
//I want someone to upgrade this source...
//It is very very slow
function getBitmap(string, iv, shdow) {
	new java.lang.Thread(new java.lang.Runnable({run: function() {
	var has = hasNonAscii(string);
	var divide = function(a) {
		var b = 0;
		if (a > 256)
			b = a % 256;
		else
			b = a;
		return b + ":" + Math.floor(a / 256);
	};
	var bm = android.graphics.Bitmap.createBitmap(string.length*16+2, 18, android.graphics.Bitmap.Config.ARGB_8888);
	var canvas = new android.graphics.Canvas(bm);
	var width = 0;
	var p = new android.graphics.Paint();
		string.split('').forEach(function(element) {
			if(element != " ") {
				var i = divide(element.charCodeAt(0)).split(":");
				var x = (((parseInt(i[0], 10)) % 16)) * 16;
				var y = Math.floor(parseInt(i[0], 10) / 16) * 16;
				var num = parseInt(i[1], 10).toString(16).toUpperCase();
				if(num == "0")
					num = "00";
				var glyph = (has ? getImage("font", "glyph_", num) : android.graphics.Bitmap.createScaledBitmap(getImage("font", "default8", ''), 256, 256, false));
				p.setColorFilter(new android.graphics.LightingColorFilter(android.graphics.Color.parseColor("#dedfde"), 0));
				if(((element.charCodeAt(0)<123&&element.charCodeAt(0)>64) || (element.charCodeAt(0)<58&&element.charCodeAt(0)>47))&&has) {
					canvas.drawBitmap(android.graphics.Bitmap.createBitmap(glyph, x+1, y, 6, 16), width, 0, p);
					width-=8;
				} else
					canvas.drawBitmap(android.graphics.Bitmap.createBitmap(glyph, x, y, 16, 16), width, 0, p);
				if(has) {
					width+=16;
				} else {
					width+=12;
					if(shorts.indexOf(element)>=0)
						width-=4;
					if(shorts2.indexOf(element)>=0)
						width-=8;
					if(element == "l" || element == "f")
						width-=2;
					if(element == "k")
						width+=2;
					if(element == "j")
						width+=4;
					}
			} else
				width+=8;
		});
	var cbm = android.graphics.Bitmap.createBitmap(bm, 0, 0, width, bm.getHeight());
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		iv.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(cbm, cbm.getWidth()*four/2, cbm.getHeight()*four/2, false));
		shdow.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(cbm, cbm.getWidth()*four/2, cbm.getHeight()*four/2, false));
	}}));
	}})).start();
}

//registering object to other scripts
function selectLevelHook() {
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	for(var i = 0; i<scripts.size(); i++) {
		var script = scripts.get(i);
		var scope = script.scope;
		if(script.name == "N-GUILib.js")
			continue;
		org.mozilla.javascript.ScriptableObject.putProperty(scope, "GUILib", GUILib);
	}
}

