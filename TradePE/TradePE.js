//TODO: make
Trade = {};

Trade.showScreen = function() {
	var back = Utils.showBackground();
	var header = Utils.showHeader("Trade");
	var plus = Utils.showButton(30, 100, 50, 26, "       +1");
	var minus = Utils.showButton(30, 128, 50, 26, "       -1");
	var emerald = Utils.renderEmerald(38, 105, 1);
	var emerald2 = Utils.renderEmerald(38, 133, 1);
	var itemback = Utils.showItemBackground(35, 46);
	var emerald3 = Utils.renderEmerald(39, 50, 2);
	var arrow = Utils.renderArrow((Utils.getContext().getScreenWidth()/Utils.FOUR)/2-16, (Utils.getContext().getScreenHeight()/Utils.FOUR)/2);
	Utils.showButton(4, 4, 38, 18, "Back", function(thiz) {
		thiz.dismiss();
		plus.dismiss();
		minus.dismiss();
		emerald.dismiss();
		emerald2.dismiss();
		emerald3.dismiss();
		itemback.dismiss();
		header.dismiss();
		back.dismiss();
		arrow.dismiss();
	});
};

Utils = {};

Utils.getContext = function() {
	return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
};

Utils.createUiThread = function(func) {
	Utils.getContext().runOnUiThread(new java.lang.Runnable({
		run: function() {
			func(Utils.getContext());
		}
	}));
};

Utils.FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, Utils.getContext().getResources().getDisplayMetrics());

Utils.getTypeface = function() {
	return android.graphics.Typeface.createFromFile("/sdcard/아포카토맨/minecraft.ttf");
};

Utils.getSpritesheet = function() {
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
};

Utils.getTouchgui = function() {
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png"));
};

Utils.getGui = function() {
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/gui.png"));
};

Utils.trimImage = function(bitmap, x, y, width, height) {
	return android.graphics.Bitmap.createBitmap(bitmap, x, y, width, height);
};

Utils.getStretchedImage = function(bm, x, y, stretchWidth, stretchHeight, width, height) {
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

Utils.showBackground = function() {
	var back = new android.widget.PopupWindow(Utils.getContext());
	Utils.createUiThread(function(ctx) {
		back.setWidth(ctx.getScreenWidth());
		back.setHeight(ctx.getScreenHeight());
		var spritesheet = android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 0, 0, 16, 16), 16*Utils.FOUR, 16*Utils.FOUR, false);
		back.setBackgroundDrawable(Utils.getStretchedImage(spritesheet, 4*Utils.FOUR, 4*Utils.FOUR, 8*Utils.FOUR, 8*Utils.FOUR, ctx.getScreenWidth(), ctx.getScreenHeight()));
//		back.setFocusable(true);
		back.setContentView(new android.widget.TextView(ctx));
		back.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
	});
	return back;
};

Utils.showHeader = function(text) {
	var pw = new android.widget.PopupWindow(Utils.getContext());
	Utils.createUiThread(function(ctx) {
		var vert = new android.widget.LinearLayout(ctx);
		vert.setOrientation(android.widget.LinearLayout.VERTICAL);
		var horiz = new android.widget.LinearLayout(ctx);
		horiz.setOrientation(android.widget.LinearLayout.HORIZONTAL);
		var left = new android.view.View(ctx);
		var header = Utils.trimImage(Utils.getTouchgui(), 150, 26, 14, 29);
		left.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 0, 0, 2, 25), Utils.FOUR*2, Utils.FOUR*25, false)));
		left.setLayoutParams(new android.widget.LinearLayout.LayoutParams(Utils.FOUR*2, Utils.FOUR*25));
		horiz.addView(left);
		var center = new android.widget.TextView(ctx);
		center.setTypeface(Utils.getTypeface());
		center.setGravity(android.view.Gravity.CENTER);
		center.setTextSize(16);
		center.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
		center.setText(text);
		center.setShadowLayer(0.00001, Utils.FOUR, Utils.FOUR, android.graphics.Color.DKGRAY);
		center.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 3, 0, 8, 25), ctx.getScreenWidth()-Utils.FOUR*4, Utils.FOUR*25, false)));
		center.setLayoutParams(new android.widget.LinearLayout.LayoutParams(ctx.getScreenWidth()-Utils.FOUR*4, Utils.FOUR*25));
		horiz.addView(center);
		var right = new android.view.View(ctx);
		right.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 12, 0, 2, 25), Utils.FOUR*2, Utils.FOUR*25, false)));
		right.setLayoutParams(new android.widget.LinearLayout.LayoutParams(Utils.FOUR*2, Utils.FOUR*25));
		horiz.addView(right);
		vert.addView(horiz);
		var down = new android.view.View(ctx);
		down.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 3, 26, 8, 3), ctx.getScreenWidth(), Utils.FOUR*3, false)));
		down.setLayoutParams(new android.widget.LinearLayout.LayoutParams(ctx.getScreenWidth(), Utils.FOUR*3));
		vert.addView(down);
		pw.setWidth(ctx.getScreenWidth());
		pw.setHeight(28*Utils.FOUR);
		pw.setContentView(vert);
//		pw.setFocusable(true);
		pw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
		pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP, 0, 0);
	});
	return pw;
};

Utils.showButton = function(x, y, width, height, text, onclick) {
	var pw = new android.widget.PopupWindow(Utils.getContext());
	Utils.createUiThread(function(ctx) {
		var button = new android.widget.Button(ctx);
		var list = new android.graphics.drawable.StateListDrawable();
		list.addState([android.R.attr.state_pressed], Utils.getStretchedImage(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 0, 32, 8, 8), 8*Utils.FOUR, 8*Utils.FOUR, false), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 4*Utils.FOUR, width*Utils.FOUR, height*Utils.FOUR));
		list.addState([], Utils.getStretchedImage(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 8, 32, 8, 8), 8*Utils.FOUR, 8*Utils.FOUR, false), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 4*Utils.FOUR, width*Utils.FOUR, height*Utils.FOUR));
		button.setBackgroundDrawable(list);
		button.setText(text);
		button.setTypeface(Utils.getTypeface());
		button.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
		button.setTextSize(16);
		var current = false;
		button.setOnTouchListener(new android.view.View.OnTouchListener({
			onTouch: function(view, event) {
				switch(event.getAction()) {
					case android.view.MotionEvent.ACTION_DOWN:
						view.setTextColor(android.graphics.Color.parseColor("#ffffa1"));
					break;
					case android.view.MotionEvent.ACTION_MOVE:
						if(event.getX() < 0 || event.getY() <0 || event.getX() > width*Utils.FOUR || event.getY() > height*Utils.FOUR) {
							view.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
							current = true;
						} else if(!current)
							view.setTextColor(android.graphics.Color.parseColor("#ffffa1"));
					break;
					case android.view.MotionEvent.ACTION_UP:
						view.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
						if(current == false && !(event.getX() < 0 || event.getY() <0 || event.getX() > width*Utils.FOUR || event.getY() > height*Utils.FOUR)) {
							if(typeof onclick === "function")
								onclick(pw);
						}
						current = false;
					break;
				}
				return false;
			}
		}));
		button.setShadowLayer(0.00001, Utils.FOUR, Utils.FOUR, android.graphics.Color.DKGRAY);
		pw.setContentView(button);
		pw.setWidth(width*Utils.FOUR);
		pw.setHeight(height*Utils.FOUR);
//		pw.setFocusable(true);
		pw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
		pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, x*Utils.FOUR, y*Utils.FOUR);
	});
	return pw;
};

Utils.renderEmerald = function(x, y, scale) {
	var pw = new android.widget.PopupWindow(Utils.getContext());
	Utils.createUiThread(function(ctx) {
		var str = new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"));
		var items = android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/items-opaque.png"));
		eval("var meta = "+str+";");
		var arr = meta.map(function(e) {
			return e.name;
		});
		var uvs = meta[arr.indexOf("emerald")].uvs[0];
		var emerald = android.graphics.Bitmap.createBitmap(items, uvs[0]*items.getWidth(), uvs[1]*items.getHeight(), uvs[2]*items.getWidth()-uvs[0]*items.getWidth(), uvs[3]*items.getHeight()-uvs[1]*items.getHeight());
		emerald = android.graphics.Bitmap.createScaledBitmap(emerald, emerald.getWidth()*Utils.FOUR*scale, emerald.getHeight()*Utils.FOUR*scale, false);
		var view = new android.view.View(ctx);
		view.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(emerald));
		pw.setContentView(view);
		pw.setWidth(emerald.getWidth());
		pw.setHeight(emerald.getHeight());
		pw.setBackgroundDrawable(null);
		pw.setTouchable(false);
		pw.setOutsideTouchable(true);
		pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, x*Utils.FOUR, y*Utils.FOUR);
	});
	return pw;
};

Utils.showItemBackground = function(x, y) {
	var pw = new android.widget.PopupWindow(Utils.getContext());
	Utils.createUiThread(function(ctx) {
		var view = new android.view.View(ctx);
		view.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getGui(), Utils.getGui().getWidth()*0.78125, Utils.getGui().getHeight()*0.1796875, Utils.getGui().getWidth()*0.0625, Utils.getGui().getWidth()*0.0625), 40*Utils.FOUR, 40*Utils.FOUR, false)));
		pw.setContentView(view);
		pw.setWidth(40*Utils.FOUR);
		pw.setHeight(40*Utils.FOUR);
//		pw.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getGui(), 200, 46, 16, 16), 32*Utils.FOUR, 32*Utils.FOUR, false)));
		pw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
		pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, x*Utils.FOUR, y*Utils.FOUR);
	});
	return pw;
};

Utils.renderArrow = function(x, y) {
	var w = android.graphics.Color.WHITE;
	var b = android.graphics.Color.parseColor("#23000000");
	var pixels = [0,0,0,0,0,0,0,0,0,0,0,0,w,0,0,0,
				  0,0,0,0,0,0,0,0,0,0,0,0,w,w,0,0,
				  0,0,0,0,0,0,0,0,0,0,0,0,w,w,w,0,
				  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
				  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
				  b,b,b,b,b,b,b,b,b,b,b,b,w,w,w,b,
				  0,0,0,0,0,0,0,0,0,0,0,0,w,w,b,0,
				  0,0,0,w,0,0,0,0,0,0,0,0,w,b,0,0,
				  0,0,w,w,0,0,0,0,0,0,0,0,b,0,0,0,
				  0,w,w,w,0,0,0,0,0,0,0,0,0,0,0,0,
				  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
				  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
				  b,w,w,w,b,b,b,b,b,b,b,b,b,b,b,b,
				  0,b,w,w,0,0,0,0,0,0,0,0,0,0,0,0,
				  0,0,b,w,0,0,0,0,0,0,0,0,0,0,0,0,
				  0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0];
	var bitmap = android.graphics.Bitmap.createBitmap(pixels, 0, 16, 16, 16, android.graphics.Bitmap.Config.ARGB_8888);
	var pw = new android.widget.PopupWindow(Utils.getContext());
	Utils.createUiThread(function(ctx) {
		pw.setContentView(new android.view.View(ctx));
		pw.setWidth(16*Utils.FOUR);
		pw.setHeight(16*Utils.FOUR);
		pw.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(bitmap, 16*Utils.FOUR, 16*Utils.FOUR, false)));
		pw.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, x*Utils.FOUR, y*Utils.FOUR);
	});
	return pw;
};



function useItem() {
	Trade.showScreen();
}
