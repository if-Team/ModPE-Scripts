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

var elements = new Array();
var currentLength = 0;
var shorts = "jkltIJ".split("");
var shorts2 = ".,!i:;".split("");
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

//edittext
var edit_str, edit_shdow, edit_text;

var GUILib = {};
var wthnhet = [ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight()];
GUILib.deviceWidth = Math.max.apply(null, wthnhet)/FOUR;
GUILib.deviceHeight = Math.min.apply(null, wthnhet)/FOUR;

//BUTTON
GUILib.GUIButton = function(x, y, width, height, msg, callback) {
	this.pw = true;
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
	this.mainplate = new android.widget.RelativeLayout(ctx);
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
					if(that.msg !== "") {
						shadow.setPadding(FOUR*2, FOUR*4, 0, 0);
				 		text.setPadding(0, FOUR*2, 0, 0);
						text.setColorFilter(android.graphics.Color.parseColor("#ffff9c"), android.graphics.PorterDuff.Mode.MULTIPLY);
					}
				 	btn.setBackgroundDrawable(ninePatch(off, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
				break;
				case MotionEvent.ACTION_UP:
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
				break;
				case MotionEvent.ACTION_MOVE:
				if(event.getX()<0 || event.getY()<0 || event.getX()>width*FOUR || event.getY()>height*FOUR) {
					if(that.msg !== "") {
						shadow.setPadding(FOUR*2, FOUR*2, 0, 0);
						text.setPadding(0, 0, 0, 0);
					 	text.setColorFilter(android.graphics.Color.parseColor("#ffffff"), android.graphics.PorterDuff.Mode.MULTIPLY);
					}
					btn.setBackgroundDrawable(ninePatch(on, 3*FOUR, 3*FOUR, 5*FOUR, 4*FOUR));
					} else {
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
	if(this.msg !== "")
		drawFont(msg, text, shadow);
	shadow.setScaleType(android.widget.ImageView.ScaleType.CENTER);
	shadow.setColorFilter(android.graphics.Color.DKGRAY, android.graphics.PorterDuff.Mode.MULTIPLY);
	shadow.setPadding(FOUR*2, FOUR*2, 0, 0);
	shadow.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
	this.mainplate.addView(shadow);
	this.btn = text;
	this.shadow = shadow;
	this.mainplate.addView(text);
}

//BUTTON METHODS
GUILib.GUIButton.prototype = {};
GUILib.GUIButton.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	 var that = this;
		ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.GUIButton.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.pw != null)
			pw.update(that.width, that.height);
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
GUILib.GUIButton.prototype.dismiss = function() {
	this.stop();
}

//IMAGEBUTTON
GUILib.ImageButton = function(x, y, width, height, bm, callback) {
	this.main = new GUILib.GUIButton(x, y, width, height, "", callback);
	this.x = this.main.x;
	this.y = this.main.y;
	this.width = this.main.width;
	this.height = this.main.height;
	this.image = this.main.btn;
	this.callback = this.main.callback;
	if(Array.isArray(bm))
		this.image.setImageBitmap(getItemBitmap(bm));
	else if(typeof(bm) !== "string")
		this.image.setImageBitmap(bm);
	else
		this.image.setImageBitmap(eval(bm));
};

//IMAGEBUTTON METHODS
GUILib.ImageButton.prototype = {};
GUILib.ImageButton.prototype.setImage = function(bm) {
	if(Array.isArray(bm))
		this.image.setImageBitmap(getItemBitmap(bm));
	else if(typeof(bm) !== "string")
		this.image.setImageBitmap(bm);
	else
		this.image.setImageBitmap(eval(bm));
};
GUILib.ImageButton.prototype.setXY = function(x, y) {
	this.x = (x == -1 ? this.x : x*FOUR);
	this.y = (y == -1 ? this.y : y*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.main.pw != null)
			pw.update(that.x, that.y, -1, -1, true);
	}}));
};
GUILib.ImageButton.prototype.setWH = function(width, height) {
	this.width = (width == -1 ? this.width : width*FOUR);
	this.height = (height == -1 ? this.height : height*FOUR);
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
		if(that.main.pw != null)
			pw.update(that.width, that.height);
	}}));
};
GUILib.ImageButton.prototype.render = function() {
	if(this.main.pw)
		elements.push(this.main);
};
GUILib.ImageButton.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.main.pw.dismiss();
			that.main.pw = null;
		}}));
};
GUILib.ImageButton.prototype.dismiss = function() {
	this.stop();
}

//EDITTEXT
GUILib.EditText = function(x, y, width, height, hint) {
	this.pw = true;
	this.text = "";
	this.x = x*FOUR;
	this.y = y*FOUR;
	this.width = width*FOUR;
	this.height = height*FOUR;
	var layout = new android.widget.RelativeLayout(ctx);
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
	this.mainplate = layout;
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
GUILib.EditText.prototype.setText = function(text) {
	drawFont(text, this.edit, this.shadow, true, this.width);
	this.text = text;
};
GUILib.EditText.prototype.getText = function() {
	return this.text;
}
GUILib.EditText.prototype.render = function() {
	if(this.pw)
		elements.push(this);
};
GUILib.EditText.prototype.stop = function() {
	var that = this;
	ctx.runOnUiThread(new java.lang.Runnable({run: function() {
			that.pw.dismiss();
			that.pw = null;
		}}));
};
GUILib.EditText.prototype.dismiss = function() {
	this.stop();
}

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

//reder checking source
new java.lang.Thread(new java.lang.Runnable({run: function() {
	while(1) {
		java.lang.Thread.sleep(50);
		if(edit_text === "")
			ctx.runOnUiThread(new java.lang.Runnable({
				run: function() {
					drawFont("_", edit_str, edit_shdow, true, Math.max.apply(null, wthnhet)-76*FOUR-1);
				/*	edit_str.setImageBitmap(emptyimg);
					edit_shdow.setImageBitmap(emptyimg);*/
				}
			}));
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
		 if(currentLength>elements.length)
			 currentLength = elements.length;
		}
	}
}})).start();

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
			var black = new android.widget.PopupWindow(ctx);
			black.setContentView(new android.widget.TextView(ctx));
			black.setWidth(Math.max.apply(null, wthnhet)+10);
			black.setHeight(Math.min.apply(null, wthnhet)+10);
			black.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.BLACK));
			black.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
			var done = new GUILib.GUIButton(GUILib.deviceWidth-66, 0, 66, 37, "Done", function(thiz) {
				black.dismiss();
				pw.dismiss();
			});
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
	var prefs = ctx.getSharedPreferences("mcpelauncherprefs",0);
	var prefs2 = ctx.getSharedPreferences(ctx.getPackageName()+"_preferences",0);
	var mcimg = (raw == true ? pectx.getAssets().open("images/"+parent+(parent == "" ? "" : "/")+file+add) : android.graphics.BitmapFactory.decodeStream(pectx.getAssets().open("images/"+parent+(parent == "" ? "" : "/")+file+add+".png")));
	if(prefs.getString("texturePack","NULL") !== "NULL"&&prefs2.getBoolean("zz_texture_pack_enable", false)) {
		var path = prefs.getString("texturePack","");
		if(!new java.io.File(path).exists())
			return mcimg;
		var zf = new java.util.zip.ZipFile(new java.io.File(path));
		var tpimg = zf.getEntry("images/"+parent+(parent === "" ? "" : "/")+file+add+(raw == true ? "" : ".png"));
		if(tpimg == null) {
			//if folder is shorter
			if(zf.getEntry(parent+(parent === "" ? "" : "/")+file+add+(raw == true ? "" : ".png")) != null)
				tpimg = zf.getEntry(parent+(parent === "" ? "" : "/")+file+add+(raw == true ? "" : ".png"));
			//or shortest
			else if(zf.getEntry(file+add+(raw == true ? "" : ".png")) != null)
				tpimg = zf.getEntry(file+add+(raw == true ? "" : ".png"));
			else
				return mcimg;
		}
		return (raw == true ? zf.getInputStream(tpimg) : android.graphics.BitmapFactory.decodeStream(zf.getInputStream(tpimg)));
	} else
		return mcimg;
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
	return patch;
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
				if(((element.charCodeAt(0)<123&&element.charCodeAt(0)>64) || (element.charCodeAt(0)<58&&element.charCodeAt(0)>47))&&has) {
					canvas.drawBitmap(android.graphics.Bitmap.createBitmap(glyph, x+1, y, 6, 16), width, 0, p);
					width-=8;
				} else
					canvas.drawBitmap(android.graphics.Bitmap.createBitmap(glyph, x, y, 16, 16), width, 0, p);
				if(has)
					width+=16;
				else {
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

