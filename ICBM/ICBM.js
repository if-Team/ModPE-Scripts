/*
 * Copyright 2015 [CodeInside, Dark]
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

const className = "ICBM";
const VERSION = "Indev_0.1";
const VERSION_CODE = 100;

var TAG = "[" + className + " " + VERSION + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods");
var _MAIN_DIR = new java.io.File(_MOD_DIR, className);
var _FONT = new java.io.File(_MOD_DIR, "minecraft.ttf");
var _MAIN_DATA = new java.io.File(_MAIN_DIR, "setting.json");
var _TEST_DATA = new java.io.File(_MAIN_DIR, "lastLog.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), className + ".json")}
if(!(_MAIN_DIR.exists())) {
	_MAIN_DIR.mkdirs();
}
if(!(_MAIN_DATA.exists())) {
	_MAIN_DATA.createNewFile();
}
var DIP = PIXEL * loadData(_MAIN_DATA, "DIPS");
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}
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
var TextView = android.widget.TextView;
var Button = android.widget.Button;
var ImageView = android.widget.ImageView;
var PopupWindow = android.widget.PopupWindow;
var StateListDrawable = android.graphics.drawable.StateListDrawable;
var GradientDrawable = android.graphics.drawable.GradientDrawable;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var Bitmap = android.graphics.Bitmap;
var Color = android.graphics.Color;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var Path = android.graphics.Path;
var Shader = android.graphics.Shader;
var ArrayList = java.util.ArrayList;

var Assets = {}
Assets.R1Raw = Bitmap.createBitmap(6, 6, Bitmap.Config.ARGB_8888);
var w = Color.argb(200, 255, 255, 255);
var b = Color.argb(100, 0, 0, 255);
Assets.R1Pixel = [
b,b,b,b,b,w,
b,b,b,b,b,w,
b,b,b,b,b,w,
b,b,b,b,b,w,
b,b,b,b,b,w,
w,w,w,w,w,w
];
Assets.R1Raw.setPixels(Assets.R1Pixel, 0, 6, 0, 0, 6, 6);
Assets.R1 = Bitmap.createScaledBitmap(Assets.R1Raw, PIXEL*12, PIXEL*12, false);

var nk = {};

function newLevel(str) {
	//이번에도 안되면 자살각
	nk.frame = new FrameLayout(ctx);
	
	//frame background
	nk.draw1 = new BitmapDrawable(Assets.R1);
	nk.draw1.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
	nk.frame.setBackgroundDrawable(nk.draw1);
	
	nk.shellPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
	nk.shellPaint.setStrokeWidth(PIXEL*3);
	nk.shellPaint.setARGB(200, 255, 255, 255);
	
	nk.gioPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
	nk.gioPaint.setStrokeWidth(PIXEL*5);
	nk.gioPaint.setARGB(200, 255, 255, 255);
	
	nk.gio = new ImageView(ctx);
	
	nk.gioBitmap = Bitmap.createBitmap(PIXEL*200, PIXEL*150, Bitmap.Config.ARGB_8888);
	
	nk.gioCanvas = new Canvas(nk.gioBitmap);
	
	nk.gioPath = new Path();
	nk.gioPath.setFillType(Path.FillType.WINDING);
	nk.gioPath.moveTo(0, 200);
	nk.gioPath.quadTo(100, 150, 200, 200);
	nk.gioCanvas.drawPath(nk.gioPath, nk.gioPaint);
	nk.gio.setImageBitmap(nk.gioBitmap);
	
	nk.graph = new ImageView(ctx);
	
	nk.graphBitmap = Bitmap.createBitmap(PIXEL*200, PIXEL*150, Bitmap.Config.ARGB_8888);
	nk.graphCanvas = new Canvas(nk.graphBitmap);
	nk.graphCanvas.drawLines([0, 150, 40, 100, 40, 100, 80, 70, 80, 70, 120, 50, 120, 50, 160, 70, 160, 70, 200, 100], nk.shellPaint);

	nk.graph.setImageBitmap(nk.graphBitmap);
	
	nk.frame.addView(nk.gio);
	nk.frame.addView(nk.graph);
	
	nk.window = new PopupWindow(nk.frame, PIXEL*200, PIXEL*150, false);
	
	uiThread(function() {
		nk.window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT|Gravity.TOP, 0, 0);
	});
}



/**
 * Error report
 *
 * @since 2015-04-??
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, TAG + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
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
	clientMessage("<" + Player.getName(Player.getEntity()) + "> " + str);
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



/**
 * save/load Data
 *
 * @since 2015-02-11
 * @author CodeInside
 */

function saveData(file, article, value) {
	if(!file.exists()) {
		file.createNewFile()
	}
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	outputStreamWriter.close();
	fileOutputStream.close();
	return true;
}

function loadData(file, article) {
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return false;
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString, str;
	while((tempRead = bufferedReader.readLine()) != null){
		tempString = tempRead + "";
		if(tempString.split("¶")[0] == article){
			str = tempString.split("¶")[1];
			if(tempString.split("¶")[2] == "n") {
				do {
					tempRead = bufferedReader.readLine();
					tempString = tempRead + "";
					str += "\n" + tempString.split("¶")[0];
				}while(tempString.split("¶")[1] == "n");
			}
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return str;
		}
	}
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	return null;
}