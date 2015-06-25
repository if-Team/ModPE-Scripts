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

setTexture(new java.io.File(_SD_CARD, "Assets01.png"), "mob/nuclear.png");

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

function procCmd(str) {
	var cmd = str.split(" ");
	switch(cmd[0]) {
		case "t":
			var ent = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 11, "mob/nuclear.png");
			Entity.setRenderType(ent, render.nuclear_R.renderType);
			break;
	}
}


var render = {};

render.nuclear = function(renderer) {
	var model = renderer.getModel();
	var head = model.getPart("head").clear();
	var body = model.getPart("body").clear();
	var rightArm = model.getPart("rightArm").clear();
	var leftArm = model.getPart("leftArm").clear();
	var rightLeg = model.getPart("rightLeg").clear();
	var leftLeg = model.getPart("leftLeg").clear();
	
	head.setTextureSize(64, 64);
	head.setTextureOffset(32, 0, false);
	head.addBox(-4, -4, 12, 8, 8, 8, 4);
	head.setTextureOffset(0, 0, false);
	head.addBox(-4, -4, 4, 8, 8, 8, 4);
	head.addBox(-4, -4, 0, 8, 8, 8, 2);
	for(var e = 0; e < 8; e++) {
		head.addBox(-4, -4, -4 - (e*8), 8, 8, 8);
	}
	head.addBox(-4, -4, -60, 8, 8, 8, 2);
	head.addBox(-4, -4, -68, 8, 8, 8, 2);
	head.setTextureOffset(18, 16, false);
	for(var e = 0; e < 11; e++) {
		head.addBox(-0.5-(e/2), -0.5-(e/2), -80.5+e, 1+e, 1+e, 1);
	}
	head.setTextureOffset(0, 16, false);
	for(var e = 0; e < 8; e++) {
		//upside
		head.addBox(-0.5, -9-e, 8.5+(e*2), 1, 1+e, 1);
		head.addBox(-0.5, -9-e, 7.5+(e*2), 1, 1+e, 1);
		//downside
		head.addBox(-0.5, 8, 8.5+(e*2), 1, 1+e, 1);
		head.addBox(-0.5, 8, 7.5+(e*2), 1, 1+e, 1);
		//rightside
		head.addBox(8, -0.5, 8.5+(e*2), 1+e, 1, 1);
		head.addBox(8, -0.5, 7.5+(e*2), 1+e, 1, 1);
		//leftside
		head.addBox(-9-e, -0.5, 8.5+(e*2), 1+e, 1, 1);
		head.addBox(-9-e, -0.5, 7.5+(e*2), 1+e, 1, 1);
	}
}
render.nuclear_R = Renderer.createHumanoidRenderer();
render.nuclear(render.nuclear_R);



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

/**
 * Set texture
 *
 * @since 2015-04-01
 * @author CodeInside
 *
 * @param {File} prototypeFile
 * @param {string} innerPath
 */
 
function setTexture(prototypeFile, innerPath){
	try{
		var bl = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "Android/data/net.zhuoweizhang.mcpelauncher");
		var blPro = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "Android/data/net.zhuoweizhang.mcpelauncher.pro");
		var ex = false;
		if(bl.exists()) {
			var dir = new java.io.File(bl, "files/textures/images/" + innerPath);
			dir.getParentFile().mkdirs(); 
			var bis = new java.io.BufferedInputStream(new java.io.FileInputStream(prototypeFile));
			var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
			var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			var count;
			while((count = bis.read(buffer)) >= 0){
				bos.write(buffer, 0, count);
			}
			bis.close();
			bos.close();
			ex = true;
		}
		if(blPro.exists()) {
			var dir = new java.io.File(blPro, "files/textures/images/" + innerPath);
			dir.getParentFile().mkdirs(); 
			var bis = new java.io.BufferedInputStream(new java.io.FileInputStream(prototypeFile));
			var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
			var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			var count;
			while((count = bis.read(buffer)) >= 0){
				bos.write(buffer, 0, count);
			}
			bis.close();
			bos.close();
			ex = true;
		}
		if(!ex) {
			toast(TAG + prototypeFile.getName() + " can't find blocklauncher dir'");
		}
	}catch(e){
		toasts(prototypeFile.getName() + " is not exists");
	}
}