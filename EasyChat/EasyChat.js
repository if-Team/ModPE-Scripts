/*
 * Copyright 2015 CodeInside
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const className = "EasyChat";
const VERSION = "Indev_0.1";
const VERSION_CODE = 100;

var TAG = "[" + className + " " + VERSION + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var FILE_SD_CARD = android.os.Environment.getExternalStorageDirectory();
var FILE_MOD_DIR = new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftpe/mods");
var FILE_MAIN_DIR = new java.io.File(FILE_MOD_DIR, className);
var FILE_FONT = new java.io.File(FILE_MOD_DIR, "minecraft.ttf");
var FILE_MAIN_DATA = new java.io.File(FILE_MAIN_DIR, "setting.json");
var FILE_TEST_DATA = new java.io.File(FILE_MAIN_DIR, "lastLog.txt");
var FILE_NO_MEDIA = new java.io.File(FILE_MAIN_DIR, ".nomedia");
function FILE_MAP_DIR() {return new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function FILE_MAP_DATA() {return new java.io.File(FILE_MAP_DIR(), className + ".json")}



var Byte = java.lang.Byte;
var Int = java.lang.Integer;
var Float = java.lang.Float;
var Double = java.lang.Double;
var Boolean = java.lang.Boolean;
var Long = java.lang.Long;
var Short = java.lang.Short;
var Context = android.content.Context;
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var AlertDialog = android.app.AlertDialog;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var FrameLayout = android.widget.FrameLayout;
var RelativeLayout = android.widget.RelativeLayout;
var LinearLayout = android.widget.LinearLayout;
var ScrollView = android.widget.ScrollView;
var HorizontalScrollView = android.widget.HorizontalScrollView;
var TextView = android.widget.TextView;
var Button = android.widget.Button;
var ImageView = android.widget.ImageView;
var EditText = android.widget.EditText;
var ProgressBar = android.widget.ProgressBar;
var PopupWindow = android.widget.PopupWindow;
var StateListDrawable = android.graphics.drawable.StateListDrawable;
var GradientDrawable = android.graphics.drawable.GradientDrawable;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var ColorDrawable = android.graphics.drawable.ColorDrawable;
var ClipDrawable = android.graphics.drawable.ClipDrawable;
var LayerDrawable = android.graphics.drawable.LayerDrawable;
var Bitmap = android.graphics.Bitmap;
var BitmapFactory = android.graphics.BitmapFactory;
var Color = android.graphics.Color;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var Path = android.graphics.Path;
var Shader = android.graphics.Shader;
var Matrix = android.graphics.Matrix;
var Typeface = android.graphics.Typeface;
var ArrayList = java.util.ArrayList;
var Calendar = java.util.Calendar;
var GregorianCalendar = java.util.GregorianCalendar;

var c = {};
c.m = ViewGroup.LayoutParams.MATCH_PARENT;
c.w = ViewGroup.LayoutParams.WRAP_CONTENT;
c.a = java.lang.reflect.Array.newInstance;
c.r = RelativeLayout;
c.l = LinearLayout;
c.p = android.util.TypedValue.COMPLEX_UNIT_PX;
c.s = net.zhuoweizhang.mcpelauncher.ScriptManager;



if(!FILE_FONT.exists()) {
	if(!downloadFile(FILE_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1")) {
		toast(TAG + "Font download fail. Setting default Font...");
	}
}

var DIP = PIXEL * (loadSetting("gfx_dpadscale")-1+2);
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}



var Assets = {};
//DO NOT USE(TEXTURE PACK MISSING)
Assets.mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", Context.CONTEXT_IGNORE_SECURITY);
Assets.mcpe = Assets.mcpeCPC.getAssets();
//spritesheet.png
try{
	Assets.mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//old version
	Assets.mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
Assets.mcpeSS_BF = BitmapFactory.decodeStream(Assets.mcpeSS);
//touchgui.png
try {
	Assets.mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	Assets.mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
Assets.mcpeTG_BF = BitmapFactory.decodeStream(Assets.mcpeTG);

Assets.fullBackground_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 0, 0, 16, 16);
Assets.fullBackground = Bitmap.createScaledBitmap(Assets.fullBackground_raw, PIXEL*32, PIXEL*32, false);
Assets.fullBackground_9 = function() {return ninePatch1(Assets.fullBackground, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)}

Assets.background_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 34, 43, 14, 14);
Assets.background = Bitmap.createScaledBitmap(Assets.background_raw, PIXEL*28, PIXEL*28, false);
Assets.background_9 = function() {return ninePatch1(Assets.background, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)}

Assets.exit_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 60, 0, 18, 18);
Assets.exit = Bitmap.createScaledBitmap(Assets.exit_raw, 18*PIXEL, 18*PIXEL, false);
Assets.exit_9 = function() {return ninePatch1(Assets.exit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)}

Assets.exitClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 78, 0, 18, 18);
Assets.exitClick = Bitmap.createScaledBitmap(Assets.exitClick_raw, PIXEL*36, PIXEL*36, false);
Assets.exitClick_9 = function() {return ninePatch1(Assets.exitClick, PIXEL*6, PIXEL*6, PIXEL*32, PIXEL*32)}

Assets.button_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,32,8,8);
Assets.button = Bitmap.createScaledBitmap(Assets.button_raw, PIXEL*16, PIXEL*16, false);
Assets.button_9 = function() {return ninePatch1(Assets.button, PIXEL*6, PIXEL*4, PIXEL*14, PIXEL*14)}

Assets.buttonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,8);
Assets.buttonClick = Bitmap.createScaledBitmap(Assets.buttonClick_raw, PIXEL*16, PIXEL*16, false);
Assets.buttonClick_9 = function() {return ninePatch1(Assets.buttonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*14)}

Assets.miniButton_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,33,8,7);
Assets.miniButton = Bitmap.createScaledBitmap(Assets.miniButton_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButton_9 = function() {return ninePatch1(Assets.miniButton, PIXEL*2, PIXEL*2, PIXEL*12, PIXEL*14)}

Assets.miniButtonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,7);
Assets.miniButtonClick = Bitmap.createScaledBitmap(Assets.miniButtonClick_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButtonClick_9 = function() {return ninePatch1(Assets.miniButtonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*12)}


var b = Color.parseColor("#6b6163");
var i = Color.parseColor("#3a393a");
Assets.textView_pixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
Assets.textView_raw = Bitmap.createBitmap(6, 6, Bitmap.Config.ARGB_8888);
Assets.textView_raw.setPixels(Assets.textView_pixel, 0, 6, 0, 0, 6, 6);
Assets.textView = Bitmap.createScaledBitmap(Assets.textView_raw, PIXEL*6, PIXEL*6, false);
Assets.textView_9 = function() {return ninePatch1(Assets.textView, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4)}

function mcpeText(size, text, shadow) {
	var tv = new TextView(ctx);
	tv.setTransformationMethod(null);
	tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(shadow) {
		tv.setShadowLayer(1/0xffffffff, PIXEL*1.3, PIXEL*1.3, Color.DKGRAY);
	}
	tv.setTextColor(Color.WHITE);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, size);
	if(FILE_FONT.exists()) {
		tv.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	tv.setPadding(0, 0, 0, 0);
	tv.setText(text);
	return tv;
}

function mcpeButton(size, text) {
	var btn = new Button(ctx);
	btn.setTransformationMethod(null);
	btn.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
	btn.setPadding(PIXEL*2, PIXEL*2, PIXEL*2, PIXEL*2);
	btn.setText(text);
	btn.setTextColor(Color.WHITE);
	btn.setTextSize(c.p, size);
	btn.setShadowLayer(1/0xffffffff, PIXEL*1.3, PIXEL*1.3, Color.DKGRAY);
	if(FILE_FONT.exists()) {
		btn.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	btn.setBackgroundDrawable(Assets.button_9());
	
	btn.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
		switch(event.action) {
			case MotionEvent.ACTION_DOWN:
			view.setBackgroundDrawable(Assets.buttonClick_9());
			view.setTextColor(Color.parseColor("#ffff50"));
			view.setPadding(PIXEL*2, PIXEL*3, PIXEL*2, PIXEL*2);
			break;
			case MotionEvent.ACTION_CANCEL:
			case MotionEvent.ACTION_UP:
			view.setBackgroundDrawable(Assets.button_9());
			view.setTextColor(Color.WHITE);
			view.setPadding(PIXEL*2, PIXEL*2, PIXEL*2, PIXEL*2);
			break;
		}
		return false;
	}catch(e) {
		showError(e);
		return false;
	}}}));
	
	return btn;
}

/**
 * Error report
 *
 * @since 2015-04
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, "[" + className + " ERROR LINE: " + e.lineNumber + "]" + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
		}}));
	}else {
		var t = (e + "").split(" ");
		var c = "";
		var temp = "";
		for(var l = 0; l < t.length; l++) {
			if(temp.split("").length > 30) {
				c += ("\n" + ChatColor.DARK_RED);
				temp = "";
			}
			c += t[l] + " ";
			temp += t[l];
		}
		clientMessage(ChatColor.DARK_RED + "[" + className + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
}



function toast(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_LONG).show();
			}catch(e) {}
		}
	}
	));
}

function toasts(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_SHORT).show();
			}catch(e) {}
		}
	}
	));
}

function broadcast(str){
	net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(str);
	//clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
}

function sleep(int){
	java.lang.Thread.sleep(int);
}

function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}
function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
}

//==============================
//-NinePatch JS
//Copyright® 2015 affogatoman(colombia2)
//==============================
/**
 * Nine Patch
 *
 * @since 2015
 * @author affogatoman
 */

function ninePatch1(bitmap, top, left, bottom, right, width, height) {
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
    return new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
}
function ninePatch2(bitmap, top, left, bottom, right, width, height) {
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
	//var bm = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
	return patch;
}

/**
 * Download file
 *
 * @since 2015-01
 * @author CodeInside
 * 
 * @param <File> path
 * @param <String> url
 * @param <ProgressBar|Null> progressBar
 */

function downloadFile(path, url, progressBar) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();
		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		if(progressBar !== null) {
			progressBar.setMax(tempApiUrlConn.getContentLength());
		}
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempFos.write(tempData, 0, tempCount);
			tempTotal += tempCount;
			if(progressBar !== null) {
				progressBar.setProgress(tempTotal);
			}
		}
		tempFos.flush();
		tempFos.close();
		tempBis.close();
		return true;
	}catch(e){
		return false;
	}
}

function loadSetting(article) {
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		if(tempReadString.split(":")[0] == article){
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	return null;
}



var ec = {};
ec.isAlive = false;

function loadMain() {try {
	ec.btn = mcpeButton(DIP*4, "Chat");
	ec.btn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		showDialog();
	}catch(e) {
		showError(e);
	}}}));
	ec.btn.setOnLongClickListener(View.OnLongClickListener({onLongClick: function(view, event) {try {
		view.setBackgroundDrawable(Assets.button_9());
		view.setTextColor(Color.WHITE);
		view.setPadding(PIXEL*2, PIXEL*2, PIXEL*2, PIXEL*2);
		hideAndShow();
		return true;
	}catch(e) {
		showError(e);
		return true;
	}}}));
	ec.window = new PopupWindow(ec.btn, DIP*20, DIP*20, false);
}catch(e) {
	showError(e);
}}

function showMain(vis) {try {
	if(vis) {
		if(ec.isAlive) return;
		uiThread(function() {try {
			ec.window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT|Gravity.TOP, 0, 0);
			ec.isAlive = true;
		}catch(e) {
			showError(e);
		}});
	}else {
		if(!ec.isAlive) return;
		uiThread(function() {try {
			ec.window.dismiss();
			ec.isAlive = false
		}catch(e) {
			showError(e);
		}});
	}
}catch(e) {
	showError(e);
}}


function showDialog() {try {
	ec.dialog = new AlertDialog.Builder(ctx);
	ec.s = new ScrollView(ctx);
	ec.l = new c.l(ctx);
	ec.l.setOrientation(c.l.VERTICAL);
	ec.et = new EditText(ctx);
	//ec.et_w = android.text.TextWatcher.onTextChanged();
	//ec.et.addTextChangedListener(ec.et_w);
//android.view.accessibility.AccessibilityEvent
	ec.l.addView(ec.et);
	ec.s2 = new HorizontalScrollView(ctx);
	ec.l2 = new c.l(ctx);
	ec.l2.setOrientation(c.l.HORIZONTAL);
	
	ec.cf = new Button(ctx);
	ec.cf.setText("WHITE");
	ec.cf.setTextColor(Color.parseColor("#ffffff"));

ec.cf.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§f");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cf);
	
	ec.c0 = new Button(ctx);
	ec.c0.setText("BLACK");
	ec.c0.setTextColor(Color.parseColor("#000000"));

ec.c0.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§0");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c0);
	
	ec.c1 = new Button(ctx);
	ec.c1.setText("D_BLUE");
	ec.c1.setTextColor(Color.parseColor("#0000aa"));

ec.c1.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§1");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c1);
	
	ec.c2 = new Button(ctx);
	ec.c2.setText("D_GREEN");
	ec.c2.setTextColor(Color.parseColor("#00aa00"));

ec.c2.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§2");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c2);
	
	ec.c3 = new Button(ctx);
	ec.c3.setText("D_AQUA");
	ec.c3.setTextColor(Color.parseColor("#00aaaa"));

ec.c3.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§3");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c3);
	
	ec.c4 = new Button(ctx);
	ec.c4.setText("D_RED");
	ec.c4.setTextColor(Color.parseColor("#aa0000"));

ec.c4.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§4");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c4);
	
	ec.c5 = new Button(ctx);
	ec.c5.setText("D_PURPLE");
	ec.c5.setTextColor(Color.parseColor("#aa00aa"));

ec.c5.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§5");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c5);
	
	ec.c6 = new Button(ctx);
	ec.c6.setText("GOLD");
	ec.c6.setTextColor(Color.parseColor("#ffaa00"));

ec.c6.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§6");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c6);
	
	ec.c7 = new Button(ctx);
	ec.c7.setText("GRAY");
	ec.c7.setTextColor(Color.parseColor("#aaaaaa"));

ec.c7.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§7");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c7);
	
	ec.c8 = new Button(ctx);
	ec.c8.setText("D_GRAY");
	ec.c8.setTextColor(Color.parseColor("#555555"));

ec.c8.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§8");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c8);
	
	ec.c9 = new Button(ctx);
	ec.c9.setText("BLUE");
	ec.c9.setTextColor(Color.parseColor("#5555ff"));

ec.c9.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§9");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.c9);
	
	ec.ca = new Button(ctx);
	ec.ca.setText("GREEN");
	ec.ca.setTextColor(Color.parseColor("#55ff55"));

ec.ca.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§a");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.ca);
	
	ec.cb = new Button(ctx);
	ec.cb.setText("AQUA");
	ec.cb.setTextColor(Color.parseColor("#55ffff"));

ec.cb.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§b");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cb);
	
	ec.cc = new Button(ctx);
	ec.cc.setText("RED");
	ec.cc.setTextColor(Color.parseColor("#ff5555"));

ec.cc.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§c");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cc);
	
	ec.cd = new Button(ctx);
	ec.cd.setText("L_PURPLE");
	ec.cd.setTextColor(Color.parseColor("#ff55ff"));

ec.cd.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§d");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cd);
	
	ec.ce = new Button(ctx);
	ec.ce.setText("YELLOW");
	ec.ce.setTextColor(Color.parseColor("#ffff55"));

ec.ce.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§e");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.ce);
	
	ec.cl = new Button(ctx);
	ec.cl.setText("굵게");
	ec.cl.setTextColor(Color.WHITE);

ec.cl.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§l");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cl);
	
	ec.cm = new Button(ctx);
	ec.cm.setText("취소선");
	ec.cm.setTextColor(Color.WHITE);

ec.cm.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§m");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cm);
	
	ec.cn = new Button(ctx);
	ec.cn.setText("밑줄");
	ec.cn.setTextColor(Color.WHITE);

ec.cn.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§n");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cn);
	
	ec.co = new Button(ctx);
	ec.co.setText("기울기");
	ec.co.setTextColor(Color.WHITE);

ec.co.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§o");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.co);
	
	ec.ck = new Button(ctx);
	ec.ck.setText("RANDOM");
	ec.ck.setTextColor(Color.WHITE);

ec.ck.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§k");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.ck);
	
	ec.cr = new Button(ctx);
	ec.cr.setText("RESET");
	ec.cr.setTextColor(Color.WHITE);

ec.cr.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
		ec.et.setText(ec.et.getText() + "§r");
		ec.et.setSelection((ec.et.getText() + "").length);
	}catch(e) {
		showError(e);
	}}}));
	ec.l2.addView(ec.cr);
	
	ec.s2.addView(ec.l2);
	ec.l.addView(ec.s2);
	ec.s.addView(ec.l);
	ec.dialog.setView(ec.s);
	ec.dialog.setNegativeButton("Back", null);
	ec.dialog.setPositiveButton("Send", new android.content.DialogInterface.OnClickListener({onClick: function() {try {
		broadcast(ec.et.getText() + "");
	}catch(e) {
		showError(e);
	}}}));
	ec.dialog.create().show();
}catch(e) {
	showError(e);
}}

function hideAndShow() {try {
	thread(function() {try {
		showMain(false);
		sleep(3000);
		showMain(true);
	}catch(e) {
		showError(e);
	}}).start();
}catch(e) {
	showError(e);
}}

loadMain();
showMain(true);