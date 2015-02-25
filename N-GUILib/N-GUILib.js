///////////////////////////////////////////////      /* Copyright
//@@@@@@@//@@////@@//@@//@@//////@@//@@////////       * 2015.
//@@///////@@////@@//@@//@@//////////@@////////       * Affogatoman
//@@//@@@//@@////@@//@@//@@//////@@//@@@@@@@///       * all
//@@///@@//@@////@@//@@//@@//////@@//@@///@@@//       * rights
//@@@@@@@//@@@@@@@@//@@//@@@@@@//@@//@@@@@@@///       * reserved.
///////////////////////////////////////////////       */

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

var defaults = new Array(256);
var lengths = new Array(65536);
loadCache();

/* IMAGE SIZE VALUE */
const FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, ctx.getResources().getDisplayMetrics());

var str = new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"));
eval("meta = "+str+";");
var items_opaque = getImage("", "items-opaque", "");
var width = items_opaque.getWidth();
var height = items_opaque.getHeight();

/*--------------------------------------------------*/
var g = android.graphics.Color.parseColor("#52fc52");
var G = android.graphics.Color.parseColor("#114011");
var b = android.graphics.Color.parseColor("#6b6561");
var B = android.graphics.Color.parseColor("#3a353a");
var check = 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,g,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,g,0,G,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,g,0,G,0,0,
			 0,0,0,0,0,0,0,g,0,0,0,0,0,0,0,0,g,0,G,0,0,0,
			 0,0,0,0,0,0,0,g,G,0,0,0,0,0,0,g,0,G,0,0,0,0,
			 0,0,0,0,0,0,b,b,g,b,b,b,b,b,g,0,G,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,g,G,B,B,B,g,b,G,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,g,B,B,g,B,G,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,g,G,g,B,G,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,g,B,G,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,G,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,b,b,b,b,b,b,b,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var unchk = 
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,b,b,b,b,b,b,b,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,B,B,B,B,B,B,B,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,b,b,b,b,b,b,b,b,b,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
			 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var checkimg = android.graphics.Bitmap.createBitmap(22, 21, android.graphics.Bitmap.Config.ARGB_8888);
checkimg.setPixels(check, 0, 22, 0, 0, 22, 21);
checkimg = android.graphics.Bitmap.createScaledBitmap(checkimg, 22*FOUR, 21*FOUR, false);
var unchkimg = android.graphics.Bitmap.createBitmap(22, 21, android.graphics.Bitmap.Config.ARGB_8888);
unchkimg.setPixels(unchk, 0, 22, 0, 0, 22, 21);
unchkimg = android.graphics.Bitmap.createScaledBitmap(unchkimg, 22*FOUR, 21*FOUR, false);
/*--------------------------------------------------*/

var emptyimg = android.graphics.Bitmap.createBitmap(1, 1, android.graphics.Bitmap.Config.ARGB_8888);
var editxtimg = android.graphics.Bitmap.createBitmap(3, 3, android.graphics.Bitmap.Config.RGB_565);
editxtimg.eraseColor(android.graphics.Color.rgb(0x6b, 0x61, 0x62));
editxtimg.setPixel(1, 1, android.graphics.Color.rgb(0x3a, 0x35, 0x3a));
editxtimg = android.graphics.Bitmap.createScaledBitmap(editxtimg, 3*FOUR, 3*FOUR, false);

var popupimg = android.graphics.Bitmap.createBitmap(3, 3, android.graphics.Bitmap.Config.RGB_565);
popupimg.eraseColor(android.graphics.Color.WHITE);
popupimg.setPixel(1, 1, android.graphics.Color.BLACK);
popupimg = android.graphics.Bitmap.createScaledBitmap(popupimg, 3*FOUR, 3*FOUR, false);

var halfimg = android.graphics.Bitmap.createBitmap(1, 1, android.graphics.Bitmap.Config.ARGB_8888);
halfimg.eraseColor(android.graphics.Color.parseColor("#80000000"));

var dirtimg = android.graphics.Bitmap.createScaledBitmap(getImage("gui", "background", ""), 32*FOUR, 32*FOUR, false);

var edit_str, edit_shdow, edit_text;

var GUILib = {};
var wthnhet = [ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight()];
GUILib.deviceWidth = Math.max.apply(null, wthnhet)/FOUR;
GUILib.deviceHeight = Math.min.apply(null, wthnhet)/FOUR;

GUILib.VERTICAL = 1;
GUILib.HORIZONTAL = 0;

GUILib.Error = java.lang.Exception;

//BUTTON
GUILib.GUIButton = function(x, y, width, height, msg, callback) {
	this.TYPE = "button";
	
	this.clicked = false;
	this.mainplate = new android.widget.RelativeLayout(ctx);
	this.pw = null;
	var spritesheet = getImage("gui", "spritesheet", '');
	var bm = android.graphics.Bitmap.createBitmap(spritesheet, 0, 32, 16, 8);
	var off = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 0, 0, 8, 8), 8*FOUR, 8*FOUR, false);
	var on = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 8, 0, 8, 8), 8*FOUR, 8*FOUR, false);
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = width*FOUR;
	this.height = height*FOUR;
	this.msg = msg;
	this.callback = callback;
	var btn = new android.widget.Button(ctx);
	btn.setBackgroundDrawable(ninePatch(on, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
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
					if(!that.clicked) {
						that.clicked = true;
						if(that.msg !== "") {
							shadow.setPadding(FOUR*2, FOUR*4, 0, 0);
				 			text.setPadding(0, FOUR*2, 0, 0);
							text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
						}
				 		btn.setBackgroundDrawable(ninePatch(off, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
					}
				break;
				case MotionEvent.ACTION_UP:
					if(that.clicked) {
						that.clicked = false;
						if(that.msg !== "") {
							shadow.setPadding(FOUR*2, FOUR*2, 0, 0);
							text.setPadding(0, 0, 0, 0);
							text.setColorFilter(android.graphics.Color.parseColor("#ffffff"), android.graphics.PorterDuff.Mode.MULTIPLY);
						}
						btn.setBackgroundDrawable(ninePatch(on, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
						if(!(event.getX()<0 || event.getY()<0 || event.getX()>width*FOUR || event.getY()>height*FOUR)) {
							if(callback != null)
								that.callback(that);
							Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 7, 7);
						}
					}
				break;
				case MotionEvent.ACTION_MOVE:
				if(event.getX()<0 || event.getY()<0 || event.getX()>width*FOUR || event.getY()>height*FOUR) {
					if(that.clicked) {
						that.clicked = false;
						if(that.msg !== "") {
							shadow.setPadding(FOUR*2, FOUR*2, 0, 0);
							text.setPadding(0, 0, 0, 0);
					 		text.setColorFilter(android.graphics.Color.parseColor("#ffffff"), android.graphics.PorterDuff.Mode.MULTIPLY);
						}
						btn.setBackgroundDrawable(ninePatch(on, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
						}
					} else if(!that.clicked) {
						that.clicked = true;
						if(that.msg !== "") {
						 text.setPadding(0, FOUR*2, 0, 0);
					 	 shadow.setPadding(FOUR*2, FOUR*4, 0, 0);
						 text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
					 	}
						btn.setBackgroundDrawable(ninePatch(off, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
					}
				break;
			}
			return true;
		}
	});
	text.setOnTouchListener(ontouch);
	text.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	text.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	shadow.setPadding(FOUR*2, FOUR*2, 0, 0);
	shadow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	this.mainplate.addView(shadow);
	this.image = btn;
	this.btn = text;
	this.shadow = shadow;
	this.mainplate.addView(text);
	if(this.msg !== "")
		drawFont(this.msg, this.btn, this.shadow);
}

//BUTTON METHODS
GUILib.GUIButton.prototype = {};
GUILib.GUIButton.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	 var that = this;
		ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.GUIButton.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.width, that.height);
	}}));
};
GUILib.GUIButton.prototype.setMessage = function(msg) {
	this.msg = msg;
	drawFont(this.msg, this.btn, this.shadow);
};
GUILib.GUIButton.prototype.getMessage = function() {
	return this.msg;
};
GUILib.GUIButton.prototype.render = function() {
	render(this);
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
	this.TYPE = "image_button";
	
	var that = this;
	this.main = new GUILib.GUIButton(x, y, width, height, "", callback);
	this.thread = new java.lang.Thread(new java.lang.Runnable({run: function() {
		while(1) {
			java.lang.Thread.sleep(50);
			that.clicked = that.main.clicked;
		}
	}}));
	this.thread.start();
	this.mainplate = this.main.mainplate;
	this.x = this.main.x;
	this.y = this.main.y;
	this.width = this.main.width;
	this.height = this.main.height;
	this.image = this.main.image;
	this.shadow = this.main.shadow;
	this.btn = this.main.btn;
	this.callback = this.main.callback;
	if(Array.isArray(bm))
		this.btn.setImageBitmap(getItemBitmap(bm));
	else if(typeof(bm) !== "string")
		this.btn.setImageBitmap(bm);
	else
		this.btn.setImageBitmap(eval(bm));
};

//IMAGEBUTTON METHODS
GUILib.ImageButton.prototype = {};
GUILib.ImageButton.prototype.setImage = function(bm) {
	if(Array.isArray(bm))
		this.btn.setImageBitmap(getItemBitmap(bm));
	else if(typeof(bm) !== "string")
		this.btn.setImageBitmap(bm);
	else
		this.btn.setImageBitmap(eval(bm));
};
GUILib.ImageButton.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.main.pw != null)
			that.main.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.ImageButton.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.main.pw != null)
			that.main.pw.update(that.width, that.height);
	}}));
};
GUILib.ImageButton.prototype.render = function() {
	render(this.main);
};
GUILib.ImageButton.prototype.stop = function() {
	var that = this;
	this.thread.interrupt();
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.main.pw.dismiss();
			that.main.pw = null;
		}}));
};

//EDITTEXT
GUILib.EditText = function(x, y, width, height, hint) {
	this.TYPE = "edittext";
	
	var layout = new android.widget.RelativeLayout(ctx);
	this.mainplate = layout;
	this.pw = null;
	this.text = "";
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = width*FOUR;
	this.height = height*FOUR;
	var back = new android.widget.TextView(ctx);
	back.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	back.setBackgroundDrawable(ninePatch(editxtimg, FOUR, FOUR, FOUR*2, FOUR*2));
	var edtxt = new android.widget.ImageView(ctx);
	edtxt.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	edtxt.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	edtxt.setPadding(FOUR*5, 0, 0, 0);
	var shadow = new android.widget.ImageView(ctx);
	shadow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	shadow.setPadding(FOUR*7, FOUR*2, 0, 0);
	shadow.setVisibility(android.view.View.INVISIBLE);
	shadow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	layout.addView(back);
	layout.addView(shadow);
	layout.addView(edtxt);
	var that = this;
	var onclick = new android.view.View.OnClickListener({
		onClick: function() {
			showEditPopup(edtxt, shadow, that.text, that);
		}
	});
	edtxt.setOnClickListener(onclick);
	back.setOnClickListener(onclick);
	this.edit = edtxt;
	this.shadow = shadow;
};

//EDITTEXT METHODS
GUILib.EditText.prototype = {};
GUILib.EditText.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.EditText.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.width, that.height);
	}}));
};
GUILib.EditText.prototype.setText = function(text) {
	drawFont(text, this.edit, this.shadow, true, this.width);
	this.text = text;
};
GUILib.EditText.prototype.getText = function() {
	return this.text;
}
GUILib.EditText.prototype.render = function() {
	render(this);
};
GUILib.EditText.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};

//BACKGROUND
GUILib.Background = function(type) {
	this.TYPE = "background";
	
	this.pw = null;
	this.x = 0;
	this.y = 0;
	this.width = Math.max.apply(null, wthnhet)+100;
	this.height = Math.min.apply(null, wthnhet);
	var main = new android.widget.TextView(ctx);
	var img;
	switch(type) {
		case "DIRT":
			img = dirtimg;
			break;
		case "BLACK":
			img = android.graphics.Bitmap.createBitmap(1, 1, android.graphics.Bitmap.Config.RGB_565);
			break;
		case "HALF":
			img = halfimg;
			break;
	}
	var drawable = new android.graphics.drawable.BitmapDrawable(img);
	drawable.setColorFilter(android.graphics.Color.rgb(70, 70, 70), android.graphics.PorterDuff.Mode.MULTIPLY);
	drawable.setTileModeXY(android.graphics.Shader.TileMode.REPEAT, android.graphics.Shader.TileMode.REPEAT);
	main.setBackgroundDrawable(drawable);
	this.mainplate = main;
};

//BACKGROUND METHODS
GUILib.Background.prototype = {};
GUILib.Background.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};
GUILib.Background.prototype.render = function() {
	render(this);
};

//CONTROLBAR
GUILib.ControlBar = function(x, y, width, height, max, min, dotEnable) {
	this.TYPE = "control_bar";
	
	var layout = new android.widget.LinearLayout(ctx);
	this.mainplate = layout;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = width*FOUR;
	this.height = height*FOUR;
	this.pw = null;
	this.max = max;
	this.min = min;
	var seek = new android.widget.SeekBar(ctx);
	seek.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 17*FOUR));
	seek.setMax(100);
	seek.setThumb(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(_(getImage("gui","touchgui", ''), 225, 125, 11, 17), 11*2*FOUR, 17*2*FOUR, false)));
	setSeekBarBack(seek, max-min, this.width, this.height, dotEnable);
	seek.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
		onStopTrackingTouch: function(s) {
			var p = s.getProgress();
			var a = 100/((max-min)*2);
			for(var i = 0; i<=(max-min)*2; i++) {
				if(i%2 == 0&&p>(i-1)*a&&p<(i+1)*a) {
					s.setProgress(i*a);
					break;
				} else if(i%2 == 1&&p == i*a)
					s.setProgress((i+1)*a);
			}
		}
	}));
	layout.addView(seek);
	this.seek = seek;
};

//CONTROLBAR METHODS
GUILib.ControlBar.prototype = {};
GUILib.ControlBar.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.ControlBar.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.width, that.height);
	}}));
};
GUILib.ControlBar.prototype.getValue = function() {
	var p = this.seek.getProgress();
	var a = 100/((this.max-this.min));
	return Math.round(p/a)+this.min;
};
GUILib.ControlBar.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};
GUILib.ControlBar.prototype.render = function() {
	render(this);
};

//TOPBAR
GUILib.TopBar = function(x, y, width, height, title) {
	this.TYPE = "top_bar";
	
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = width*FOUR;
	this.height = height*FOUR;
	var text = new android.widget.ImageView(ctx);
	text.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	text.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	var shadow = new android.widget.ImageView(ctx);
	shadow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	shadow.setPadding(FOUR*2, FOUR*2, 0, 0);
	shadow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	var r = new android.widget.RelativeLayout(ctx);
	var image = new android.widget.TextView(ctx);
	image.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	image.setBackgroundDrawable(ninePatch(android.graphics.Bitmap.createScaledBitmap(getTopBarImg(), 12*FOUR, 28*FOUR, false), 2*FOUR, 2*FOUR, 22*FOUR, 10*FOUR));
	r.addView(image);
	r.addView(shadow);
	r.addView(text);
	drawFont(title, text, shadow);
	this.mainplate = r;
};

//TOPBAR METHODS
GUILib.TopBar.prototype = {};
GUILib.TopBar.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.TopBar.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.width, that.height);
	}}));
};
GUILib.TopBar.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};
GUILib.TopBar.prototype.render = function() {
	render(this);
};

//DELETEBUTTON
GUILib.DeleteButton = function(x, y, deletes, callback, button) {
	this.TYPE = "delete_button";
	
	this.isButton = button;
	this.pw = null;
	
	if(button != true) {
		var that = this;
		this.clicked = false;
		this.x = x*FOUR;
		this.y = y*FOUR;
		this.width = 18*FOUR;
		this.height = 18*FOUR;
		var btn = new android.widget.Button(ctx);
		this.mainplate = btn;
		var spritesheet = getImage("gui", "spritesheet", "");
		var on = new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(spritesheet, 60, 0, 18, 18), 18*FOUR, 18*FOUR, false));
		var off = new android.graphics.drawable.BitmalDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(spritesheet, 78, 0, 18, 18), 18*FOUR, 18*FOUR, false));
		var list = new android.graphics.drawable.StateListDrawable();
		list.addState([android.R.attr.state_pressed], off);
		
		btn.setOnClickListener(ontouch);
	} else {
		var that = this;
		var main = new GUILib.GUIButton(x, y, 38, 18, "Back", function(thiz) {
			deletes.forEach(function(e) {
				e.stop();
			});
			thiz.stop();
			if(callback != null)
				callback();
		});
		this.x = x*FOUR;
		this.y = y*FOUR;
		this.width = 38*FOUR;
		this.height = 18*FOUR;
		this.mainplate = main.mainplate;
		new java.lang.Thread(new java.lang.Runnable({run: function() {
			while(1) {
				java.lang.Thread(50);
				that.clicked = main.clicked;
			}
		}})).start();
		this.image = main.image;
		this.btn = main.btn;
		this.shadow = main.shadow;
		this.main = main;
	}
};

//DELETEBUTTON METHODS
GUILib.DeleteButton.prototype = {};
GUILib.DeleteButton.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};
GUILib.DeleteButton.prototype.render = function() {
	render((this.isButton == true ? this.main : this));
};

//GUISCROLL
GUILib.GUIScroll = function(x, y, height, childs) {
	var glowDrawableId = ctx.getResources().getIdentifier("overscroll_glow", "drawable", "android");
	var edgeDrawableId = ctx.getResources().getIdentifier("overscroll_edge", "drawable", "android");
	var androidGlow = ctx.getResources().getDrawable(glowDrawableId);
	var androidEdge = ctx.getResources().getDrawable(edgeDrawableId);
	androidGlow.setColorFilter(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.MULTIPLY);
	androidEdge.setColorFilter(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.MULTIPLY);
	
	this.TYPE = "scroll";
	
	childs.forEach(function(e) {
		if(e.TYPE == "scroll") {
			throw new GUILib.Error("GUIScroll 내에는 GUIScroll을 넣을 수 없습니다. You can't add GUIScroll to GUIScroll.");
			return;
		}
		if(e.TYPE == "delete_button") {
			throw new GUILib.Error("GUIScroll 내에는 DeleteButton을 넣을 수 없습니다. You can't add DeleteButton to GUIScroll.");
			return;
		}
	});
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = Math.max.apply(null, childs.map(function(e) { return e.width; }));
	this.height = height*FOUR;
	var spritesheet = getImage("gui", "spritesheet", '');
	var bm = android.graphics.Bitmap.createBitmap(spritesheet, 0, 32, 16, 8);
	var on = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 8, 0, 8, 8), 8*FOUR, 8*FOUR, false);
	var nineOn = ninePatch(on, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR);
	var scroll = new android.widget.ScrollView(ctx);
	scroll.setVerticalScrollBarEnabled(false);
	scroll.getViewTreeObserver().addOnScrollChangedListener(new android.view.ViewTreeObserver.OnScrollChangedListener({
		onScrollChanged: function() {
			var func = function(c) {
				c.forEach(function(e) {
					if((e.TYPE == "button" || e.TYPE == "image_button") && e.clicked == true) {
						if(e.TYPE == "button")
							e.clicked = false;
						if(e.TYPE == "image_button")
							e.main.clicked = false;
						e.image.setBackgroundDrawable(nineOn);
						e.btn.setColorFilter(android.graphics.Color.WHITE, android.graphics.PorterDuff.Mode.MULTIPLY);
						if(e.TYPE == "button") {
							e.btn.setPadding(0, FOUR, 0, 0);
							e.shadow.setPadding(2*FOUR, 3*FOUR, 0, 0);
						}
					} else if(e.TYPE == "group")
						func(e.children);
				});
			};
			func(childs);
		}
	}));
	var l = new android.widget.LinearLayout(ctx);
	l.setOrientation(android.widget.LinearLayout.VERTICAL);
	l.setGravity(android.view.Gravity.CENTER);
	scroll.addView(l);
	childs.forEach(function(e) {
		e.mainplate.setLayoutParams(new android.widget.LinearLayout.LayoutParams(e.width, e.height));
		l.addView(e.mainplate);
	});
	this.mainplate = scroll;
};

//GUISCROLL METHODS
GUILib.GUIScroll.prototype = {};
GUILib.GUIScroll.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.GUIScroll.prototype.setH = function(height) {
	this.height = height*FOUR;
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.width, that.height);
	}}));
};
GUILib.GUIScroll.prototype.render = function() {
	render(this);
};
GUILib.GUIScroll.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};

//GUIGROUP
GUILib.GUIGroup = function(x, y, orien, children) {
	this.TYPE = "group";
	
	var that = this;
	this.children = children
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	if(orien == GUILib.HORIZONTAL) {
		this.width = addAll(children.map(function(e) { return e.width; }));
		this.height = Math.max.apply(null, children.map(function(e) { return e.height; }));
	} else if(orien == GUILib.VERTICAL) {
		this.width = Math.max.apply(null, children.map(function(e) { return e.width; }));
		this.height = addAll(children.map(function(e) { return e.height; }));
	}
	var layout = new android.widget.LinearLayout(ctx);
	layout.setGravity(android.view.Gravity.CENTER);
	layout.setOrientation(orien);
	this.mainplate = layout;
	children.forEach(function(e) {
		e.mainplate.setLayoutParams(new android.widget.LinearLayout.LayoutParams(e.width, e.height));
		layout.addView(e.mainplate);
	});
};

//GUIGROUP METHODS
GUILib.GUIGroup.prototype = {};
GUILib.GUIGroup.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.GUIGroup.prototype.render = function() {
	render(this);
};
GUILib.GUIGroup.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};

//SWITCH
GUILib.Switch = function(x, y, callback) {
	this.TYPE = "switch";
	
	var that = this;
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = 38*FOUR;
	this.height = 19*FOUR;
	var toggle = new android.widget.ToggleButton(ctx);
	toggle.setText("");
	toggle.setTextOn("");
	toggle.setTextOff("");
	toggle.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
		onCheckedChanged: function(v, checked) {
			if(callback != null)
				callback(that, checked);
			if(checked)
				toggle.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(on));
			else
				toggle.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(off));
		}
	}));
	toggle.setOnTouchListener(new android.view.View.OnTouchListener({
		onTouch: function(v, e) {
			if(e.getAction() == android.view.MotionEvent.ACTION_DOWN)
				toggle.setChecked(!toggle.isChecked());
			return true;
		}
	}));
	var touchgui = getImage("gui", "touchgui", "");
	var off = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(touchgui, 160, 206, 38, 19), 38*FOUR, 19*FOUR, false);
	var on = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(touchgui, 198, 206, 38, 19), 38*FOUR, 19*FOUR, false);
	toggle.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(off));
	this.mainplate = toggle;
};

//SWITCH METHODS
GUILib.Switch.prototype = {};
GUILib.Switch.prototype.isChecked = function() {
	return this.mainplate.isChecked();
};
GUILib.Switch.prototype.setChecked = function(bool) {
	this.mainplate.setChecked(bool);
};
GUILib.Switch.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			that.pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.Switch.prototype.render = function() {
	render(this);
};
GUILib.Switch.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};

//WARNING POPUP
GUILib.WarningPopup = function(msg, dur) {
	this.TYPE = "warning_popup";
	
	var that = this;
	this.pw;
	this.x = (GUILib.deviceWidth*FOUR-184*FOUR)/2
	this.y = 2*FOUR;
	this.width = 184*FOUR;
	this.height = 28*FOUR;
	var shdow = new android.widget.ImageView(ctx);
	shdow.setPadding(2*FOUR, 2*FOUR, 0, 0);
	shdow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shdow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(this.width, this.height));
	shdow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	var text = new android.widget.ImageView(ctx);
	text.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	text.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(this.width, this.height));
	drawFont(msg, text, shdow);
	this.msg = msg;
	var l = new android.widget.RelativeLayout(ctx);
	var spritesheet = getImage("gui", "spritesheet", "");
	var back = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(spritesheet, 34, 43, 14, 14), 14*FOUR, 14*FOUR, false);
	l.setBackgroundDrawable(ninePatch(back, 2*FOUR, 2*FOUR, 11*FOUR, 11*FOUR));
	var down = new android.view.animation.TranslateAnimation(0, 0, -that.height, 0);
	down.setFillAfter(true);
	down.setDuration(300);
	var up = new android.view.animation.TranslateAnimation(android.view.animation.Animation.RELATIVE_TO_SELF, 0,
															android.view.animation.Animation.RELATIVE_TO_SELF, 0,
															android.view.animation.Animation.RELATIVE_TO_SELF, 0,
															android.view.animation.Animation.RELATIVE_TO_SELF, -1);
	up.setFillAfter(true);
	up.setDuration(300);
	l.addView(shdow);
	l.addView(text);
	l.setAnimation(down);
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
	new android.os.Handler().postDelayed(new java.lang.Runnable({run: function() {
		l.startAnimation(up);
		new android.os.Handler().postDelayed(new java.lang.Runnable({run: function() {
				that.pw.dismiss();
		}}), 300);
	}}), dur+300);
	new android.os.Handler().postDelayed(new java.lang.Runnable({run: function() {
		text.setColorFilter(android.graphics.Color.RED, android.graphics.PorterDuff.Mode.MULTIPLY);
		shdow.setColorFilter(android.graphics.Color.parseColor("#410000"), android.graphics.PorterDuff.Mode.MULTIPLY);
		new android.os.Handler().postDelayed(new java.lang.Runnable({run: function() {
			text.setColorFilter(android.graphics.Color.WHITE, android.graphics.PorterDuff.Mode.MULTIPLY);
			shdow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
		}}), 100);
	}}), dur-2000);
	}}));
	this.mainplate = l;
};

//WARNINGPOPUP MEHTODS
GUILib.WarningPopup.prototype = {};
GUILib.WarningPopup.prototype.render = function() {
	render(this);
};

//VISUALFONT
GUILib.VisualFont = function(x, y, text) {
	this.TYPE = "visualfont";
	
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = text.length*8*FOUR;
	this.height = 9*FOUR;
	var r = new android.widget.RelativeLayout(ctx);
	var tex = new android.widget.ImageView(ctx);
	tex.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	tex.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	var shadow = new android.widget.ImageView(ctx);
	shadow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	shadow.setPadding(2*FOUR, 2*FOUR, 0, 0);
	shadow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	drawFont(text, tex, shadow);
	r.addView(shadow);
	r.addView(tex);
	this.mainplate = r;
};

//CHECKBOX
GUILib.CheckBox = function(x, y, text, callback) {
	var text = new GUILib.VisualFont(0,0,text);
	this.TYPE = "checkbox";
	
	var that = this;
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = 22*FOUR+text.width;
	this.height = 21*FOUR;
	var toggle = new android.widget.CheckBox(ctx);
	this.toggle = toggle;
	toggle.setButtonDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
	toggle.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
		onCheckedChanged: function(v, checked) {
			if(callback != null)
				callback(that, checked);
			if(checked)
				toggle.setBackgroundDrawable(ninePatch(checkimg, 21*FOUR, 21*FOUR, 22*FOUR, 22*FOUR));
			else
				toggle.setBackgroundDrawable(ninePatch(unchkimg, 21*FOUR, 21*FOUR, 22*FOUR, 22*FOUR));
		}
	}));
	toggle.setOnTouchListener(new android.view.View.OnTouchListener({
		onTouch: function(v, e) {
			if(e.getAction() == android.view.MotionEvent.ACTION_DOWN)
				toggle.setChecked(!toggle.isChecked());
			return true;
		}
	}));
	toggle.setBackgroundDrawable(ninePatch(unchkimg, 21*FOUR, 21*FOUR, 22*FOUR, 22*FOUR));
	var group = new android.widget.LinearLayout(ctx);
	group.setOrientation(android.widget.LinearLayout.HORIZONTAL);
	group.addView(toggle);
	group.addView(text.mainplate);
	this.mainplate = group;
};

//CHECKBOX METHODS
GUILib.CheckBox.prototype = {};
GUILib.CheckBox.prototype.setChecked = function(b) {
	this.toggle.setChecked(b);
};
GUILib.CheckBox.prototype.isChecked = function() {
	return this.toggle.isChecked();
}
GUILib.CheckBox.prototype.render = function() {
	render(this);
};
GUILib.CheckBox.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		that.pw.dismiss();
		that.pw = null;
	}}));
};

//WINDOW
GUILib.Window = function(x, y, width, height, view) {
	this.TYPE = "window";
	
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = width*FOUR+10*FOUR;
	this.height = height*FOUR;
	var window = new android.widget.PopupWindow(ctx);
	window.setWidth(this.width);
	window.setHeight(this.height);
	var spritesheet = getImage("gui", "spritesheet", "");
	var layout = new android.widget.LinearLayout(ctx);
	layout.setGravity(android.view.Gravity.CENTER);
	layout.addView(view.mainplate);
	layout.setPadding(3*FOUR, 3*FOUR, 3*FOUR, 3*FOUR);
	window.setContentView(layout);
	var back = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(spritesheet, 34, 43, 14, 14), 14*FOUR, 14*FOUR, false);
	window.setBackgroundDrawable(ninePatch(back, 2*FOUR, 2*FOUR, 11*FOUR, 11*FOUR));
	this.mainplate = window;
};

//WINDOW METHODS
GUILib.Window.prototype = {};
GUILib.Window.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(this.mainplate.isShowing())
			this.mainplate.update(that.x, that.y, -1, -1, false);
	}}));
};
GUILib.Window.prototype.setWH = function(w, h) {
	this.width = (w == -1 ? this.width : w*FOUR);
	this.height = (h == -1 ? this.height : h*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(this.mainplate.isShowing())
			this.mainplate.update(that.width, that.height);
	}}));
};
GUILib.Window.prototype.render = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		that.mainplate.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, that.x, that.y );
	}}));
};
GUILib.Window.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		that.mainplate.dismiss();
	}}));
};

var _ = function(bitmap, x, y, width, height) {
	return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bitmap, x, y, width, height), width*FOUR, height*FOUR, false);
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

//get item image from meta source
function getItemBitmap(data) {
	var result = null;
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
}

var forMakeCache = 1200;
function modTick() {
	if(forMakeCache++ == 1200) {
		makeCache();
		forMakeCache = 0;
	}
	if(edit_text === "")
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				drawFont("_", edit_str, edit_shdow, true, Math.max.apply(null, wthnhet)-76*FOUR-1);
			}
		}));
}

//render
function render(element) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			if(element.pw == null) {
				var pw = new android.widget.PopupWindow(ctx);
				element.pw = pw;
				pw.setContentView(element.mainplate);
				pw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
				pw.setWidth(element.width);
				pw.setHeight(element.height);
				pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, element.x, element.y );
			}
		}
	}));
}

//add all of things in array
function addAll(array) {
	var result = 0;
	for each(var i in array)
		result += i;
	return result;
}

//make top bar image
function getTopBarImg() {
	var touchgui = getImage("gui", "touchgui", "");
	var part = android.graphics.Bitmap.createBitmap(touchgui, 150, 26, 14, 29);
	var real = android.graphics.Bitmap.createBitmap(12, 28, android.graphics.Bitmap.Config.ARGB_8888);
	var canvas = new android.graphics.Canvas(real);
	canvas.drawBitmap(android.graphics.Bitmap.createBitmap(part, 0, 0, 2, 25),0, 0, null);
	canvas.drawBitmap(android.graphics.Bitmap.createBitmap(part, 3, 0, 8, 25),2, 0, null);
	canvas.drawBitmap(android.graphics.Bitmap.createBitmap(part, 12, 0, 2, 25),10, 0, null);
	canvas.drawBitmap(android.graphics.Bitmap.createBitmap(part, 3, 26, 8, 3),0, 25, null);
	canvas.drawBitmap(android.graphics.Bitmap.createBitmap(part, 3, 26, 4, 3),8, 25, null);
	return real;
}

//set seekbar background image source
function setSeekBarBack(seek, max, width, height, dot) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			var img = android.graphics.Bitmap.createBitmap(width+4*FOUR, 17*FOUR, android.graphics.Bitmap.Config.ARGB_8888);
			var canvas = new android.graphics.Canvas(img);
			var p = new android.graphics.Paint();
			p.setColor(android.graphics.Color.rgb(114, 114, 114));
			canvas.drawRect(2*FOUR, 7*FOUR, 2*FOUR+width, 10*FOUR, p);
			if(dot == true) {
				p.setColor(android.graphics.Color.parseColor("#919191"));
				for(var i = 0; i<=max; i++) {
					canvas.drawRect(i*(width/max), 5*FOUR, i*(width/max)+4*FOUR, 12*FOUR, p);
				}
			}
			seek.setThumbOffset(32);
			seek.setProgressDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
			seek.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(img));
		}
	}));
}

//show edittext popup source
function showEditPopup(text, shadow, str, that) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			/*
			EditText(a)
			--------
			Text(b)
			--------
			Shadow(c)
			*/
			var done = new GUILib.GUIButton(GUILib.deviceWidth-66, 0, 66, 37, "Done", function(thiz) {
				black.dismiss();
				pw.dismiss();
			});
			var black = new android.widget.PopupWindow(ctx);
			black.setContentView(new android.widget.TextView(ctx));
			black.setWidth(Math.max.apply(null, wthnhet)+10);
			black.setHeight(Math.min.apply(null, wthnhet)+10);
			black.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			black.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
			done.render();
			var textpart = new android.widget.RelativeLayout(ctx);
			var a = new android.widget.EditText(ctx);
			a.requestFocus();
			a.setImeOptions(android.view.inputmethod.EditorInfo.IME_FLAG_NO_EXTRACT_UI);
			a.setSingleLine(true);
			a.setOnEditorActionListener(new android.widget.TextView.OnEditorActionListener({
				onEditorAction: function(view, actionId, event) {
					pw.dismiss();
					return false;
				}
			}));
			a.setFocusable(true);
			a.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
			a.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
			a.setTextColor(android.graphics.Color.TRANSPARENT);
			a.setCursorVisible(false);
			a.addTextChangedListener(new android.text.TextWatcher({
				afterTextChanged: function(s) {
					edit_text = s+"";
					if((s+"").length>0)
						drawFont(s + "", b, c, true, Math.max.apply(null, wthnhet)-76*FOUR);
				}
			}));
			var b = new android.widget.ImageView(ctx);
			edit_str = b;
			b.setScaleType(android.widget.ImageView.ScaleType.CENTER);
			var c = new android.widget.ImageView(ctx);
			c.setVisibility(android.view.View.INVISIBLE);
			edit_shdow = c;
			c.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
			c.setScaleType(android.widget.ImageView.ScaleType.CENTER);
			textpart.addView(c);
			textpart.addView(b);
			textpart.addView(a);
			if(str !== "") {
				a.setText(str);
				drawFont(str, b, c, true, Math.max.apply(null, wthnhet)-76*FOUR);
			}
			var pw = new android.widget.PopupWindow(ctx);
			pw.setContentView(textpart);
			pw.setWidth(Math.max.apply(null, wthnhet)-76*FOUR);
			pw.setHeight(17*FOUR);
			pw.setBackgroundDrawable(ninePatch(popupimg, FOUR, FOUR, FOUR*2, FOUR*2));
			pw.setFocusable(true);
			pw.setOnDismissListener(new android.widget.PopupWindow.OnDismissListener({
				onDismiss: function() {
					if(edit_text !== "")
						drawFont(edit_text, text, shadow, true, text.getParent().getWidth());
					else {
						text.setImageBitmap(emptyimg);
						shadow.setImageBitmap(emptyimg);
					}
					that.text = (edit_text == null ? "" : edit_text);
					edit_text = null;
					black.dismiss();
					done.stop();
				}
			}));
			pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 5*FOUR, 20*FOUR);
		}
	}));
}

//get internal image bitmap source
function getImage(parent, file, add, raw) {
	var stream = ModPE.openInputStreamFromTexturePack("images/"+parent+(parent == "" ? "" : "/")+file+add+(raw == true ? "" : ".png"));
	if(raw != true)
		return android.graphics.BitmapFactory.decodeStream(stream);
	else
		return stream;
}

//does string have non-ascii? (source was provided by Chalk(amato17))
function hasNonAscii(str) {
	if(typeof str === "string")
		return str.split('').some(function(e){
			return e >= String.fromCharCode(256);
		});
	return true;
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
	patch.getPaint().setAntiAlias(false);
	patch.getPaint().setDither(false);
	patch.getPaint().setFilterBitmap(false);
	return patch;
}

//checking bitmap font length source
function checkLength(bitmap) {
	var start = -1, end = 0;
	var arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var Color = android.graphics.Color;
	arr.forEach(function(i) {
		if(Color.alpha(bitmap.getPixel(i, 0))>0 ||
		   Color.alpha(bitmap.getPixel(i, 1))>0 ||
		   Color.alpha(bitmap.getPixel(i, 2))>0 ||
	 	   Color.alpha(bitmap.getPixel(i, 3))>0 ||
		   Color.alpha(bitmap.getPixel(i, 4))>0 ||
		   Color.alpha(bitmap.getPixel(i, 5))>0 ||
		   Color.alpha(bitmap.getPixel(i, 6))>0 ||
		   Color.alpha(bitmap.getPixel(i, 7))>0 ||
		   Color.alpha(bitmap.getPixel(i, 8))>0 ||
		   Color.alpha(bitmap.getPixel(i, 9))>0 ||
		   Color.alpha(bitmap.getPixel(i, 10))>0 ||
		   Color.alpha(bitmap.getPixel(i, 11))>0 ||
		   Color.alpha(bitmap.getPixel(i, 12))>0 ||
		   Color.alpha(bitmap.getPixel(i, 13))>0 ||
		   Color.alpha(bitmap.getPixel(i, 14))>0 ||
		   Color.alpha(bitmap.getPixel(i, 15))>0) {
			if(start == -1)
				start = i;
			if(start>=0)
				end = i;
		}
	});
	return [start, end];
}

//drawing font source
//I want someone to upgrade this source...
//It is very very slow
function drawFont(string, iv, shdow, isEdit, wi) {
	if(typeof string !== "string")
		return;
	if(isEdit && wi == Math.max.apply(null, wthnhet)-76*FOUR)
		string = string + "_";
	new java.lang.Thread(new java.lang.Runnable({run: function() {
		var has = hasNonAscii(string);
		try{
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
			if(element !== " ") {
				var i = divide(element.charCodeAt(0)).split(":");
				var x = (((parseInt(i[0], 10)) % 16)) * 16;
				var y = Math.floor(parseInt(i[0], 10) / 16) * 16;
				var num = parseInt(i[1], 10).toString(16).toUpperCase();
				if((num+"").length === 1)
					num = "0"+num;
				var glyph = (has ? getImage("font", "glyph_", num) : android.graphics.Bitmap.createScaledBitmap(getImage("font", "default8", ''), 256, 256, false));
				p.setColorFilter(new android.graphics.LightingColorFilter(android.graphics.Color.parseColor("#dedfde"), 0));
				var st = android.graphics.Bitmap.createBitmap(glyph, x, y, 16, 16);
				if(element>="가"&&element<="힣")
					var length = [0, 15];
				else if(lengths[element.charCodeAt(0)] != null && has)
					var length = lengths[element.charCodeAt(0)];
				else if(defaults[element.charCodeAt(0)] != null && !has)
					var length = defaults[element.charCodeAt(0)];
				else {
					var length = checkLength(st);
					if(has)
						lengths[element.charCodeAt(0)] = length;
					else
						defaults[element.charCodeAt(0)] = length;
				}
				canvas.drawBitmap(android.graphics.Bitmap.createBitmap(st, length[0], 0, length[1]-length[0]+1, 16), width, 0, p);
				width+=((element>="가"&&element<="힣") ? 16 : length[1]-length[0]+3);
			} else
				width+=8;
		});
		var cbm = android.graphics.Bitmap.createBitmap(bm, 0, 0, width, bm.getHeight());
		ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			iv.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(cbm, cbm.getWidth()*FOUR/2, cbm.getHeight()*FOUR/2, false));
			shdow.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(cbm, cbm.getWidth()*FOUR/2, cbm.getHeight()*FOUR/2, false));
			if(isEdit == true) {
				var w = (wi == null ? iv.getWidth() : wi);
				if(w>cbm.getWidth()*FOUR/2) {
					iv.setPadding(FOUR*5, 0, 0 ,0);
					shdow.setPadding(FOUR*7, FOUR*2, 0, 0);
					iv.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(cbm.getWidth()*FOUR/2+FOUR*5, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
					shdow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(cbm.getWidth()*FOUR/2+FOUR*5, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
				} else {
					iv.setPadding(FOUR*3, 0, 0 ,0);
					shdow.setPadding(FOUR*5, FOUR*2, 0, 0);
					iv.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
					shdow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
					iv.setImageBitmap(android.graphics.Bitmap.createBitmap(android.graphics.Bitmap.createScaledBitmap(cbm, cbm.getWidth()*FOUR/2, cbm.getHeight()*FOUR/2, false), 0, 0, w-FOUR*10, cbm.getHeight()*FOUR/2));
					shdow.setImageBitmap(android.graphics.Bitmap.createBitmap(android.graphics.Bitmap.createScaledBitmap(cbm, cbm.getWidth()*FOUR/2, cbm.getHeight()*FOUR/2, false), 0, 0, w-FOUR*10, cbm.getHeight()*FOUR/2));
				}
			}
		}}));
		}catch(e) {
			clientMessage(e+e.lineNumber);
		}
	}})).start();
}

//registering object to other scripts
function selectLevelHook() {
	var loaded = 0;
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	for(var i = 0; i<scripts.size(); i++) {
		var script = scripts.get(i);
		var scope = script.scope;
		if(org.mozilla.javascript.ScriptableObject.hasProperty(scope, "GUILib"))
			continue;
		loaded = 1;
		org.mozilla.javascript.ScriptableObject.putProperty(scope, "GUILib", GUILib);
	}
	if(loaded) {
		var warn = new GUILib.WarningPopup("GUILib이 로드되었습니다.", 2000);
		warn.render();
	}
}

function makeCache() {
	new java.lang.Thread(new java.lang.Runnable({run: function() {
		var texture = getTextureName();
		var file = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "아포카토맨/GUILib/"+texture+".cache");
		file.getParentFile().mkdirs();
		var writer = new java.io.BufferedWriter(new java.io.FileWriter(file));
		var ds = [], dss = "", ls = [], lss = "";
		defaults.filter(function(e, i) {
			if(e!=null) {
				ds.push(((i == 39 || i == 92) ? "\\" : "") + String.fromCharCode(i));
				dss+=(",["+e+"]");
				return true;
			}
			return false;
		});
		lengths.filter(function(e, i) {
			if(e!=null) {
				ls.push(((i == 39 || i == 92) ? "\\" : "") + String.fromCharCode(i));
				lss+=(",["+e+"]");
				return true;
			}
			return false;
		});
		var result = "['"+ds.join("")+"',["+dss.replace(",","")+"]];\n['"+ls.join("")+"',["+lss.replace(",","")+"]];";
		writer.write(result);
		writer.close();
	}})).start();
}

function loadCache() {
	new java.lang.Thread(new java.lang.Runnable({run: function() {
		var texture = getTextureName();
		var file = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "아포카토맨/GUILib/"+texture+".cache");
		if(file.exists()) {
			var reader = new java.io.BufferedReader(new java.io.FileReader(file));
			var def = eval(reader.readLine()+"");
			def[0].split("").forEach(function(e, i) {
				defaults[e.charCodeAt(0)] = def[1][i];
			});
			var len = eval(reader.readLine()+"");
			len[0].split("").forEach(function(e, i) {
				lengths[e.charCodeAt(0)] = len[1][i];
			});
			reader.close();
		}
	}})).start();
}

function getTextureName() {
	var pref = ctx.getSharedPreferences("mcpelauncherprefs", 0);
	var pref2 = ctx.getSharedPreferences(ctx.getPackageName()+"_preferences", 0);
	if(pref.getString("texturePack", "NULL") !== "NULL" && pref2.getBoolean("zz_texture_pack_enable", false)) {
		var spl = pref.getString("texturePack", "").split("/");
		return spl[spl.length-1].replace(".zip", "");
	} else
		return "default";
}

function getGrandParent(v) {
	if(v.getParent() == null)
		return v;
	return getGrandParent(v.getParent());
}

/*    EOF    */
