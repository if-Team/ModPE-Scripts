///////////////////////////////////////////////      /* Copyright
//@@@@@@@//@@////@@//@@//@@//////@@//@@////////       * 2015.
//@@///////@@////@@//@@//@@//////////@@////////       * Affogatoman
//@@//@@@//@@////@@//@@//@@//////@@//@@@@@@@///       * all
//@@///@@//@@////@@//@@//@@//////@@//@@///@@@//       * rights
//@@@@@@@//@@@@@@@@//@@//@@@@@@//@@//@@@@@@@///       * reserved.
///////////////////////////////////////////////       */

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

const FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, ctx.getResources().getDisplayMetrics());

var reader = new java.io.BufferedReader(new java.io.InputStreamReader(getImage("", "items.meta", "", true)));
eval("meta = "+reader.readLine()+";");
reader.close();
var items_opaque = getImage("", "items-opaque", "");
var width = items_opaque.getWidth();
var height = items_opaque.getHeight();
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

var x_text = new android.widget.ImageView(ctx);
var x_shdow = new android.widget.ImageView(ctx);
drawFont("Back", x_text, x_shdow); //Draw beforehand to render immediately

var GUILib = {};
var wthnhet = [ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight()];
GUILib.deviceWidth = Math.max.apply(null, wthnhet)/FOUR;
GUILib.deviceHeight = Math.min.apply(null, wthnhet)/FOUR;

GUILib.VERTICAL = 1;
GUILib.HORIZONTAL = 0;

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
	new java.lang.Thread(new java.lang.Runnable({run: function() {
		while(1)
			that.clicked = that.main.clicked;
	}})).start();
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
	seek.setLayoutParams(new android.widget.LinearLayout.LayoutParams(this.width, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
	seek.setMax(100);
	seek.setThumb(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(_(getImage("gui","touchgui", ''), 225, 125, 11, 17), 11*FOUR*FOUR/2, 17*FOUR*FOUR/2, false)));
	setSeekBarBack(seek, max-min, this.width, dotEnable);
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
	
	var that = this;
	this.clicked = false;
	this.isButton = button;
	var r = new android.widget.RelativeLayout(ctx);
	this.mainplate = r;
	this.pw = null;
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = (button == true ? 38*FOUR : 18*FOUR);
	this.height = 18*FOUR;
	var btn = new android.widget.Button(ctx);
	this.image = btn;
	btn.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(this.width, this.height));
	r.addView(btn);
	var spritesheet = getImage("gui", "spritesheet", "");
	var bm = android.graphics.Bitmap.createBitmap(spritesheet, 0, 32, 16, 8);
	var btn_off = ninePatch(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 0, 0, 8, 8), 8*FOUR, 8*FOUR, false), 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR);
	var btn_on = ninePatch(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bm, 8, 0, 8, 8), 8*FOUR, 8*FOUR, false), 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR);
	var on = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(spritesheet, 60, 0, 18, 18), 18*FOUR, 18*FOUR, false);
	var off = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(spritesheet, 78, 0, 18, 18), 18*FOUR, 18*FOUR, false);
	btn.setBackgroundDrawable((button == true ? btn_on : new android.graphics.drawable.BitmapDrawable(on)));
	var ontouch = new android.view.View.OnTouchListener({
		onTouch: function(v, event) {
			switch(event.getAction()) {
				case android.view.MotionEvent.ACTION_DOWN:
					if(!that.clicked) {
						that.clicked = true;
						x_text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
						x_text.setPadding(0, 2*FOUR, 0, 0);
						x_shdow.setPadding(2*FOUR, 4*FOUR, 0, 0);
						btn.setBackgroundDrawable((button == true ? btn_off : new android.graphics.drawable.BitmapDrawable(off)));
					}
					break;
				case android.view.MotionEvent.ACTION_MOVE:
					if((event.getX()<0 || event.getY()<0 || event.getX()>that.width || event.getY()>18*FOUR)) {
						if(that.clicked) {
							that.clicked = false;
							x_text.setColorFilter(android.graphics.Color.WHITE, android.graphics.PorterDuff.Mode.MULTIPLY);
							x_text.setPadding(0, 0, 0, 0);
							x_shdow.setPadding(2*FOUR, 2*FOUR, 0, 0);
							btn.setBackgroundDrawable((button == true ? btn_on : new android.graphics.drawable.BitmapDrawable(on)));
						}
					} else if(!that.clicked) {
						that.clicked = true;
						x_text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
						x_text.setPadding(0, 2*FOUR, 0, 0);
						x_shdow.setPadding(2*FOUR, 4*FOUR, 0, 0);
						btn.setBackgroundDrawable((button == true ? btn_off : new android.graphics.drawable.BitmapDrawable(off)));
					}
					break;
				case android.view.MotionEvent.ACTION_UP:
					if(that.clicked) {
						that.clicked = false;
						if(!(event.getX()<0 || event.getY()<0 || event.getX()>that.width || event.getY()>18*FOUR)) {
							deletes.forEach(function(e) {
								e.stop();
							});
							that.stop();
							r.removeView(x_shdow);
							r.removeView(x_text);
							Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 7, 7);
							if(callback != null)
								callback();
						}
					}
					break;
			}
			return true;
		}
	});
	if(button != true)
		btn.setOnTouchListener(ontouch);
	else {
		x_text.setOnTouchListener(ontouch);
		r.addView(x_shdow);
		r.addView(x_text);
		x_shdow.setPadding(2*FOUR, 2*FOUR, 0, 0);
		x_shdow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
		x_shdow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
		x_text.setScaleType(android.widget.ImageView.ScaleType.CENTER);
		x_shdow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(38*FOUR, 18*FOUR));
		x_text.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(38*FOUR, 18*FOUR));
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
	render(this);
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
						e.btn.setPadding(0, FOUR, 0, 0);
						e.shadow.setPadding(2*FOUR, 3*FOUR, 0, 0);
					} else if(e.TYPE == "delete_button" && e.isButton == true && e.clicked == true) {
						e.clicked = false;
						e.image.setBackgroundDrawable(nineOn);
						x_text.setColorFilter(android.graphics.Color.WHITE, android.graphics.PorterDuff.Mode.MULTIPLY);
						x_text.setPadding(0, FOUR, 0, 0);
						x_shdow.setPadding(2*FOUR, 3*FOUR, 0, 0);
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
	//scroll.requestDisallowInterceptTouchEvent(true);
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
	var on = android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(touchgui, 198, 206, 38, 19), 38*FOUR, 19*FOUR, false);;
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

//edtxt checking source
new java.lang.Thread(new java.lang.Runnable({
	run: function() {
		while(1) {
			java.lang.Thread.sleep(50);
			if(edit_text === "")
				ctx.runOnUiThread(new java.lang.Runnable({
					run: function() {
						drawFont("_", edit_str, edit_shdow, true, Math.max.apply(null, wthnhet)-76*FOUR-1);
					}
				}));
			}
	}
})).start();

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
function setSeekBarBack(seek, max, width, dot) {
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			var img = android.graphics.Bitmap.createBitmap(width+4*FOUR, 7*FOUR, android.graphics.Bitmap.Config.ARGB_8888);
			var canvas = new android.graphics.Canvas(img);
			var p = new android.graphics.Paint();
			p.setColor(android.graphics.Color.rgb(114, 114, 114));
			canvas.drawRect(2*FOUR, 2*FOUR, 2*FOUR+width, 5*FOUR, p);
			if(dot == true) {
				p.setColor(android.graphics.Color.parseColor("#919191"));
				for(var i = 0; i<=max; i++) {
					canvas.drawRect(i*(width/max), 0, i*(width/max)+4*FOUR, 7*FOUR, p);
				}
			}
			seek.setProgressDrawable(new android.graphics.drawable.BitmapDrawable(img));
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
				else
					var length = checkLength(st);
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
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
	for(var i = 0; i<scripts.size(); i++) {
		var script = scripts.get(i);
		var scope = script.scope;
		if(org.mozilla.javascript.ScriptableObject.hasProperty(scope, "GUILib"))
			continue;
		org.mozilla.javascript.ScriptableObject.putProperty(scope, "GUILib", GUILib);
	}
}

/*    EOF    */

