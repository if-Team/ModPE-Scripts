var ScriptName = "Script AutoLoad";
var Version = "dev-v0.3";
var VersionCode = "102";
var author = "CodeInside";

/**
 * —————Change Log—————
 * dev-v0.1(20150425)[100]
 * 	-develop start
 * 
 * dev-v0.2(20150426)[101]
 * 	-main Button
 * 	-main Window frame
 * 
 * dev-v0.3(20150427)[102]
 * 	-ScriptList
 * 	-Add, Back function
 * 	-preLoading GUI
 */

/**
 *Apache License, Version 2.0
 *
 *아파치 라이선스 버전 2.0
 *
 *==============================
 *Copyright (c) <2015> <CodeInside>
 *==============================
 *
 *Apache LicenseVersion 2.0, January 2004
 *
 *Apache License 버전 2.0(본 라이선스)의 적용을 받음. 이 파일을 사용하기 위해서는 반드시 본 라이선스를 따라야 합니다.본 라이선스의 사본은 다음 사이트에서 구할 수 있습니다.
 *
 *http://www.apache.org/licenses/LICENSE-2.0
 *
 *관련 법규나 서면 동의에 의해 구속되지 않는 한, 본 라이선스에따라 배포되는 소프트웨어는 어떠한 보증이나 조건도 명시적으로나 묵시적으로 설정되지 않는  “있는 그대로”의 상태로 배포됩니다. 본 라이선스가 허용하거나 제한하는 사항을 규정한 문언에 대해서는 라이선스를 참조하십시오.
 *
 */

var debugging = true;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory()/*.getAbsolutePath()*/;
var _MAIN_MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods/" + ScriptName);
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, ScriptName + ".dat");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), ScriptName + ".data")}
var DIP = FOUR * loadData(_MOD_DATA, "DIPS");
if(/*DIP + "" === "NaN"*/true){
	DIP = FOUR;
}
var TAG = "["+ScriptName+"] ";



var loadingLayout = new android.widget.LinearLayout(ctx);
loadingLayout.setOrientation(1);
loadingLayout.setGravity(android.view.Gravity.CENTER);
var loadingLayoutDrawable = new android.graphics.drawable.GradientDrawable();
loadingLayoutDrawable.mutate().setColor(android.graphics.Color.BLACK);
loadingLayoutDrawable.mutate().setAlpha(150);
loadingLayout.setBackgroundDrawable(loadingLayoutDrawable);
var loadingProgress = new android.widget.ProgressBar(ctx);
loadingLayout.addView(loadingProgress);
var loadingText = new android.widget.TextView(ctx);
loadingText.setText(TAG+"스크립트를 불러오는중입니다...");
loadingText.setGravity(android.view.Gravity.CENTER);
loadingLayout.addView(loadingText);
var loadingWindow = new android.widget.PopupWindow(loadingLayout, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, false);
uiThread(function() {
loadingWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
});



//마인크래프트 리소스
//NOT USED(TEXTURE PACK MISSING)
var mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
var mcpeAssets = mcpeCPC.getAssets();
//spritesheet.png 파일 접근
var mcpeSS;
try{
	mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//옛날 버전에 대한 호환성
	toasts(TAG+"Block Luncher 버전이 너무 낮습니다. \n텍스쳐팩을 불러올 수 없습니다.");
	mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
	toasts(TAG+"내부 텍스쳐팩에 액세스합니다.");
}
var mcpeSS_BF = android.graphics.BitmapFactory.decodeStream(mcpeSS);
//touchgui.png 파일 접근
var mcpeTG;
try {
	mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
var mcpeTG_BF = android.graphics.BitmapFactory.decodeStream(mcpeTG);
//배경(화면전체)
var mcpeBGRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 0, 16, 16);
var mcpeBG = android.graphics.Bitmap.createScaledBitmap(mcpeBGRaw, dp(32), dp(32), false);
var mcpeBG9 = ninePatch1(mcpeBG, dp(12), dp(12), dp(24), dp(24));
//배경
var mcpeBGTRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14);
var mcpeBGT = android.graphics.Bitmap.createScaledBitmap(mcpeBGTRaw, dp(32), dp(32), false);
var mcpeBGT9 = ninePatch1(mcpeBGT, dp(12), dp(12), dp(22), dp(22));
//타이틀바
var mcpeTitleBarRaw = android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25);
var mcpeTitleBar = android.graphics.Bitmap.createScaledBitmap(mcpeTitleBarRaw, dp(28), dp(50), false);
var mcpeTitleBar9 = ninePatch1(mcpeTitleBar, dp(6), dp(8), dp(46), dp(20));

function mcpeTitleBar(layout) {
	var layoutA = new android.widget.RelativeLayout(ctx);
	var layoutC = new android.widget.RelativeLayout(ctx);
	layoutC.setBackgroundDrawable(ninePatch1(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeTG_BF, 153, 26, 8, 25), dp(16), dp(50), false), dp(4), dp(0), dp(46), dp(16)));
	layoutA.addView(layoutC);
	
	var layoutL = new android.view.View(ctx);
	layoutL.setBackgroundDrawable(ninePatch1(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 2, 25), dp(4), dp(50), false), dp(4), dp(0), dp(46), dp(2)));
	layoutA.addView(layoutL);
	
	ALIGN_PARENT_LEFT
	
	layout.addView(layoutA);
	return layoutC;
}

//메뉴
var mcpeScrollRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 20, 8, 8);
var mcpeScroll = android.graphics.Bitmap.createScaledBitmap(mcpeScrollRaw, dp(16), dp(16), false);
var mcpeScroll9 = ninePatch1(mcpeScroll, dp(6), dp(4), dp(10), dp(12));
//메뉴항목
var mcpeManuContentRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,20,32,8,8);
var mcpeManuContent = android.graphics.Bitmap.createScaledBitmap(mcpeManuContentRaw,dp(16),dp(16),false);
var mcpeManuContent9 = ninePatch1(mcpeManuContent,dp(2),dp(2),dp(14),dp(14));
//메뉴항목(선택됨)
var mcpeManuContentSelectRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,28,32,8,8);
var mcpeManuContentSelect = android.graphics.Bitmap.createScaledBitmap(mcpeManuContentSelectRaw,dp(16),dp(16),false);
var mcpeManuContentSelect9 = ninePatch1(mcpeManuContentSelect,dp(2),dp(2),dp(14),dp(14));
//종료 버튼
var mcpeExitRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18);
var mcpeExit = android.graphics.Bitmap.createScaledBitmap(mcpeExitRaw, 18*FOUR, 18*FOUR, false);
var mcpeExit9 = ninePatch1(mcpeExit, dp(6), dp(6), dp(30), dp(30));
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
//종료 버튼(클릭)
var mcpeExitClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18);
var mcpeExitClick = android.graphics.Bitmap.createScaledBitmap(mcpeExitClickRaw, dp(36), dp(36), false);
var mcpeExitClick9 = ninePatch1(mcpeExitClick, dp(6), dp(6), dp(32), dp(32));
//버튼
var mcpeBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8);
var mcpeBtn = android.graphics.Bitmap.createScaledBitmap(mcpeBtnRaw,dp(16),dp(16),false);
var mcpeBtn9 = ninePatch1(mcpeBtn,dp(6),dp(4),dp(14),dp(14));
//버튼(클릭)
var mcpeBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8);
var mcpeBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeBtnClickRaw,dp(16),dp(16),false);
var mcpeBtnClick9 = ninePatch1(mcpeBtnClick,dp(4),dp(4),dp(12),dp(14));
//미니버튼
var mcpeMiniBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7);
var mcpeMiniBtn = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnRaw,dp(16),dp(14),false);
var mcpeMiniBtn9 = ninePatch1(mcpeMiniBtn,dp(2),dp(2),dp(12),dp(14));
//미니버튼(클릭)
var mcpeMiniBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7);
var mcpeMiniBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnClickRaw,dp(16),dp(14),false);
var mcpeMiniBtnClick9 = ninePatch1(mcpeMiniBtnClick,dp(4),dp(4),dp(12),dp(12));
//텍스트뷰
var b = android.graphics.Color.parseColor("#6b6163");
var i = android.graphics.Color.parseColor("#3a393a");
var mcpeTextViewPixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
var mcpeTextViewRaw = android.graphics.Bitmap.createBitmap(6, 6, android.graphics.Bitmap.Config.ARGB_8888);
mcpeTextViewRaw.setPixels(mcpeTextViewPixel, 0, 6, 0, 0, 6, 6);
var mcpeTextView = android.graphics.Bitmap.createScaledBitmap(mcpeTextViewRaw, dp(6), dp(6), false);
var mcpeTextView9 = ninePatch1(mcpeTextView, dp(3), dp(3), dp(4), dp(4));
/*
var A = android.graphics.Color.parseColor("#d4cdc8");
var B = android.graphics.Color.parseColor("#bcb1aa");
var C = android.graphics.Color.parseColor("#868686");
var D = android.graphics.Color.parseColor("#28272a");
var E = android.graphics.Color.parseColor("#28272a");
var F = android.graphics.Color.parseColor("#8a7b76");
var G = android.graphics.Color.parseColor("#e9e5e1");
var H = android.graphics.Color.parseColor("#3a3a3a");


var mcpeBtnBG_EMPTY = [
B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,
B,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D,D,
C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D
]

[
B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,
B,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,H,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,H,H,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,H,H,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,G,H,H,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,G,H,H,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,H,F,F,F,F,F,F,F,F,D,D,
B,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D,D,
C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D
]

[
B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,
B,B,A,A,A,A,A,A,A,A,A,A,A,A,A,A,C,D,
B,B,F,F,F,F,F,F,F,F,F,F,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,G,F,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,G,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,G,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,G,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,G,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,G,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,G,H,F,F,F,D,D,
B,B,F,F,F,F,F,F,F,F,F,F,H,F,F,F,D,D,
B,C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D,D,
C,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,E,D
]*/


function dp(dips) {
	return /*dips*DIP;*/parseInt(dips * ctx.getResources().getDisplayMetrics().density + 0.5);
}

function debug(str) {
	if(debugging) {
		if(Level.getWorldName() === null) {
			 ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		android.widget.Toast.makeText(ctx, "[Debug]\n" + str, android.widget.Toast.LENGTH_LONG).show();
			}}));
		}else {
			clientMessage("[debug] " + str);
		}
	}
}

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, "[Debug]\n" + e, android.widget.Toast.LENGTH_LONG).show();
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
		clientMessage(ChatColor.DARK_RED + "[" + ScriptName + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
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
} void(toast);

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

function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}
function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
}
function multiThread(fc) {
	if(Level.getWorldDir() !== null) {
		new java.lang.Thread(new java.lang.Runnable( {run: fc})).start()
	}else {
		uiThread(fc)
	}
}


//==============================
//-NinePatch JS
//Copyright® 2015 affogatoman(colombia2)
//==============================
/**
 * Nine Patch
 *
 * @since 2015-??-??
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
 * Change texture
 *
 * @since 2015-04-01
 * @author CodeInside
 */

function setTexture(prototypeFile, innerPath){
	try{
		var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/net.zhuoweizhang.mcpelauncher.pro/files/textures/images/" + innerPath);
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
	}catch(e){
		toasts(prototypeFile.getAbsolutePath() + " 리소스파일이 없습니다");
	}
}


/**
 * Download file
 *
 * @since 2015-01-10
 * @author CodeInside
 */

function downloadFile(path, url) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();

		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempTotal += tempCount;
			tempFos.write(tempData, 0, tempCount);
		}
		tempFos.flush();
		tempFos.close();
		tempBis.close();
		return true;
	}catch(e){
		debug(e.lineNumber + " " + e);
		return false;
	}
}


/**
 * save/load Data
 *
 * @since 2015-02-11
 * @author CodeInside
 */

function saveData(file, article, value) {
	//읽기
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "NoFile";
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
}

function loadData(file, article) {
	//읽기
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "NoFile";
	}
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split("¶")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split("¶")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
}


/**
 * load/save Minecraft Setting
 *
 * @since 2015-04-12
 * @author CodeInside
 */

function saveSetting(article, value) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split(":")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + ":" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
	//this is not work
	net.zhuoweizhang.mcpelauncher.ScriptManager.requestGraphicsReset();
};

function loadSetting(article) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/options.txt"));
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split(":")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split(":")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
};

function newLevel(str) {
	SAL.mainBtnWindowShow(false);
};

function leaveGame() {
	SAL.mainBtnWindowShow(true);
}

if(!_MOD_DIR.exists()) {
	_MOD_DIR.mkdirs();
}

if(!_MOD_DATA.exists()) {
	_MOD_DATA.createNewFile();
}

/**
 * ScriptAutoLoad
 */
SAL = {};

SAL.manuListAdd = function(layout, views) {
	for(var e = 0; e < views.length; e++) {
		var btn = new android.widget.Button(ctx);
		btn.setText(views[e].name);
		btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
		btn.getPaint().setAntiAlias(false);
		if(_FONT.exists()) {
			btn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
		};
		btn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
		var btn_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, DIP*36);
		btn.setLayoutParams(btn_param);
		if(!views[e].isExist) {
			btn.setBackgroundColor(android.graphics.Color.parseColor("#700000"));
		}else {
			switch(views[e].mod) {
				case 0:
					btn.setBackgroundDrawable(mcpeManuContent9);
					break;
				case 1:
				case 2:
					btn.setBackgroundDrawable(mcpeManuContentSelect9);
					break;
				default:
					btn.setBackgroundColor(android.graphics.Color.parseColor("#000000"));
			}
		}
		btn.setOnClickListener(android.view.View.OnClickListener({
			onClick: function(view, event) {try {
				SAL.mainWindowShow(false);
			}catch(e) {
				showError(e);
			}}
		}));
		layout.addView(btn);
	}
};

SAL.loadScriptListData = function() {
	var list = loadData(_MOD_DATA, "MANU_LIST") !== null ? JSON.parse(loadData(_MOD_DATA, "MANU_LIST")) : [];
	for(var e = 0; e < list.length; e++) {
		var f = new java.io.File(list[e].path);
		if(f.exists() && f.isFile() && f.canRead()) {
			list[e].isExist = true;
		}else {
			list[e].isExist = false;
			if(f.exists() && f.isFile() && !f.canRead()) {
				toast(TAG + list[e].name + "는(은) 읽을 수 없는 파일입니다");
			}
		}
	}
	return SAL.setListIDs(list);
}

SAL.setListIDs = function(list) {
	for(var e = 0; e < list.length; e++) {
		try {
			if(!(list[e].ID >= 7220)) {
				list[e].ID = SAL.getListMaxID() + 1;
			}
		}catch(e) {
			list[e].ID = SAL.getListMaxID() + 1;
		}
	}
	return list;
}

SAL.reloadList = function() {
	SAL.list = SAL.loadScriptListData();
};

SAL.mainBtnMod = false;
SAL.mainBtnWindowAlive = false;
SAL.mainWindowAlive = false;
SAL.mX = 0;
SAL.mY = 0;
SAL.reloadList();


SAL.mainBtnWindowLoad = function() {

SAL.mainBtnLayout = new android.widget.RelativeLayout(ctx);
SAL.mainBtn = new android.widget.Button(ctx);
SAL.mainBtn.setText(ScriptName);
SAL.mainBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
SAL.mainBtn.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainBtn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
SAL.mainBtn.setId(7210);
SAL.mainBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*80, DIP*36);
SAL.mainBtn.setLayoutParams(SAL.mainBtn_param);
SAL.mainBtn.setBackgroundDrawable(mcpeBtn9);
SAL.mainBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:
					SAL.wX = event.getX();
					SAL.wY = event.getY();
					view.setBackgroundDrawable(mcpeBtnClick9);
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9);
					view.setTextColor(android.graphics.Color.WHITE);
					SAL.mainBtnMod = false;
					saveData(_MOD_DATA, "BUTTON_WINDOW_X", SAL.mX);
					saveData(_MOD_DATA, "BUTTON_WINDOW_Y", SAL.mY);
					break;
				case android.view.MotionEvent.ACTION_MOVE:
					if(SAL.mainBtnMod) {
						uiThread(function() {try {
							SAL.mX = event.getRawX() - SAL.wX;
							SAL.mY = event.getRawY() - SAL.wY;
							SAL.mainBtnWindow.update(SAL.mX, SAL.mY, SAL.mainBtnWindow.getWidth(), SAL.mainBtnWindow.getHeight(), true);
						}catch(e) {
							showError(e);
						}});
					}
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));

SAL.mainBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.mainWindowLoad();
		SAL.mainWindowShow(true);
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainBtn.setOnLongClickListener(android.view.View.OnLongClickListener({
	onLongClick: function(view, event) {
		try {
			SAL.mainBtnMod = true;
			toasts("버튼을 이동할 위치로 드래그 하세요");
		}catch(e) {
			showError(e);
		}
		return true;
	}
}));
SAL.mainBtnLayout.addView(SAL.mainBtn);
SAL.mainBtnWindow = new android.widget.PopupWindow(SAL.mainBtnLayout, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, false);
SAL.mainBtnWindow.setSplitTouchEnabled(true);
SAL.mainBtnWindow.setOutsideTouchable(true);
//SAL.mainBtnWindow.setTouchable(false);

}



SAL.mainWindowLoad = function() {

SAL.mainLayout = new android.widget.LinearLayout(ctx);
SAL.mainLayout.setOrientation(1);
SAL.mainLayout.setBackgroundDrawable(mcpeBGT9);

SAL.mainTitleLayout = new android.widget.LinearLayout(ctx);
SAL.mainTitleLayout.setOrientation(0);
SAL.mainTitleLayout.setBackgroundDrawable(mcpeTitleBar9);
SAL.mainTitleLayout.setGravity(android.view.Gravity.CENTER);

SAL.mainBackBtn = new android.widget.Button(ctx);
SAL.mainBackBtn.setBackgroundDrawable(mcpeBtn9);
SAL.mainBackBtn.setText("Back");
SAL.mainBackBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainBackBtn.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainBackBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainBackBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainBackBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainBackBtn.setId(7211);
SAL.mainBackBtn_param = new android.widget.LinearLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainBackBtn_param.setMargins(0,0,0,0);
SAL.mainBackBtn.setLayoutParams(SAL.mainBackBtn_param);
SAL.mainBackBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9);
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9);
					view.setTextColor(android.graphics.Color.WHITE);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.mainBackBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.mainWindowShow(false);
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainTitleLayout.addView(SAL.mainBackBtn);

SAL.mainTitleText = new android.widget.TextView(ctx);
SAL.mainTitleText.setText(ScriptName);
SAL.mainTitleText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainTitleText.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainTitleText.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainTitleText.setTextColor(android.graphics.Color.WHITE);
SAL.mainTitleText.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainTitleText.setId(7212);
SAL.mainTitleText_param = new android.widget.LinearLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
SAL.mainTitleText_param.setMargins(DIP*20,0,DIP*20,0);
SAL.mainTitleText.setLayoutParams(SAL.mainTitleText_param);
SAL.mainTitleLayout.addView(SAL.mainTitleText);
SAL.mainLayout.addView(SAL.mainTitleLayout);

SAL.mainNewBtn = new android.widget.Button(ctx);
SAL.mainNewBtn.setBackgroundDrawable(mcpeBtn9);
SAL.mainNewBtn.setText("New");
SAL.mainNewBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainNewBtn.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainNewBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainNewBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainNewBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainNewBtn.setId(7211);
SAL.mainNewBtn_param = new android.widget.LinearLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainNewBtn_param.setMargins(0,0,0,0);
SAL.mainNewBtn.setLayoutParams(SAL.mainNewBtn_param);
SAL.mainNewBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9);
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9);
					view.setTextColor(android.graphics.Color.WHITE);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.mainNewBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.addList();
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainTitleLayout.addView(SAL.mainNewBtn);

SAL.mainScroll = new android.widget.ScrollView(ctx);
SAL.mainScroll.setBackgroundDrawable(mcpeScroll9);
SAL.mainScroll_param = new android.widget.LinearLayout.LayoutParams(DIP*330, DIP*234);
SAL.mainScroll_param.setMargins(DIP*10,DIP*6,DIP*10, DIP*10);
SAL.mainScroll.setLayoutParams(SAL.mainScroll_param);
SAL.mainScrollLayout = new android.widget.LinearLayout(ctx);
SAL.mainScrollLayout.setPadding(DIP, DIP*2, DIP, DIP*2);
SAL.mainScrollLayout.setOrientation(1);
SAL.manuListAdd(SAL.mainScrollLayout, SAL.list);

SAL.mainScroll.addView(SAL.mainScrollLayout);

SAL.mainLayout.addView(SAL.mainScroll);

SAL.mainWindow = new android.widget.PopupWindow(SAL.mainLayout, DIP*350, DIP*300, false);
SAL.mainWindow.setSplitTouchEnabled(true);
SAL.mainWindow.setOutsideTouchable(false);
//SAL.mainWindow.setTouchable(false);

};



SAL.mainBtnWindowShow = function(visible) {
	uiThread(function() {try {
		if(visible) {
			if(SAL.mainBtnWindowAlive) return;
			var loadX = loadData(_MOD_DATA, "BUTTON_WINDOW_X");
			var loadY = loadData(_MOD_DATA, "BUTTON_WINDOW_Y")
			SAL.mainBtnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((loadX == null || loadX == "NaN") ? 0 : loadX), ((loadY == null || loadY == "NaN") ? 0 : loadY));
			SAL.mainBtnWindowAlive = true;
		}else if(!visible) {
			if(!SAL.mainBtnWindowAlive) return;
			SAL.mainBtnWindow.dismiss();
			SAL.mainBtnWindowAlive = false;
		}else {
			var e = {name:"Unknown visible"};
			showError(e);
		}
	}catch(e) {
		showError(e);
	}});
};



SAL.mainWindowShow = function(visible) {
	uiThread(function() {try {
		if(visible) {
			SAL.reloadList();
			if(SAL.mainWindowAlive) return;
			SAL.mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
			SAL.mainWindowAlive = true;
		}else if(!visible) {
			if(!SAL.mainWindowAlive) return;
			SAL.mainWindow.dismiss();
			SAL.mainWindowAlive = false;
		}else {
			var e = {name:"Unknown visible"};
			showError(e);
		}
	}catch(e) {
		showError(e);
	}});
};



SAL.addList = function() {;
	uiThread(function() { try{
		SAL.addDialog = new android.app.AlertDialog.Builder(ctx);
		SAL.addDialog.setTitle("Script Path");
		
		SAL.addDialog_et = new android.widget.EditText(ctx);
		SAL.addDialog_et.setHint("path...");
		SAL.addDialog_et.setText(android.os.Environment.getExternalStorageDirectory().getAbsolutePath());
		SAL.addDialog.setView(SAL.addDialog_et);
		SAL.addDialog.setPositiveButton("add",new android.content.DialogInterface.OnClickListener( {onClick:
			function() {try {
				var file = new java.io.File(SAL.addDialog_et.getText())
				SAL.list.push({name: file.getName() + "", mod: 0, path: SAL.addDialog_et.getText() + ""});
				saveData(_MOD_DATA, "MANU_LIST", JSON.stringify(SAL.list));
				SAL.mainWindowShow(false);
				SAL.reloadList();
				SAL.mainWindowLoad();
				SAL.mainWindowShow(true);
			}catch(e){
				showError(e);
			}}
		}));
		SAL.addDialog.setNegativeButton("back", null);
		SAL.addDialog.create();
		SAL.addDialog.show();
	}catch(e) {
		showError(e);
	}});
}



uiThread(function() {
	loadingText.setText(TAG+"리소스 체크중...");
});
if(!_FONT.exists()) {
	uiThread(function() {
		loadingText.setText(TAG+"리소스 다운로드중...");
	});
	if(!downloadFile(_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1")) {
		uiThread(function() {
			loadingText.setText(TAG+"실패...");
		});
		toast("[" + ScriptName + "]\n\n폰트를 다운로드하지 못했습니다\n아마도 인터넷이 연결되어 있지 않습니다");
		toasts("[" + ScriptName + "]\n\n시스템 폰트를 적용합니다...");
	}else {
		uiThread(function() {
			loadingText.setText(TAG+"다운 완료");
		});
	}
}



uiThread(function() {
	java.lang.Thread.sleep(100);
	loadingText.setText(TAG+"레이아웃 로딩중...");
	SAL.mainBtnWindowLoad();
	SAL.mainBtnWindowShow(true);
	loadingWindow.dismiss();
});

/*
 //PocketGear function
var Gear = {};
Gear.mainWindow = null;
Gear.saveCount = 0;
Gear.mod = parseInt(loadData(_MOD_DATA, "MOD"));
if(Gear.mod + "" === "NaN") {
	Gear.mod = 0;
	saveData(_MOD_DATA, "MOD", Gear.mod);
}
//RECENT, OVERALL, CLOCK, INGAME_CLOCK
Gear.isRemote = false;
Gear.allowRemote = (loadData(_MOD_DATA, "ALLOW_REMOTE") == "true");
Gear.isWindowAlive = false;
Gear.players = [];
Gear.chattyPlayers = [];
Gear.slowTick = 0;
Gear.slowestTick = 0;
Gear.noPlayer = 0;
Gear.voidClip = [0,6,8,9,10,11,26,27,30,31,32,37,38,39,40,50,51,59,63,64,65,66,68,71,78,83,92,95,96,104,105,106,111,126,127,141,142,175,244];

Gear.layout = new android.widget.RelativeLayout(ctx);
Gear.layout.setBackgroundDrawable(mcpeBGT9);
Gear.layout.setPadding(DIP*8, DIP*8, DIP*8, DIP*8);

Gear.textView = new android.widget.TextView(ctx);
Gear.textView.setId(721);
Gear.textView_param = new android.widget.RelativeLayout.LayoutParams(DIP*80, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
Gear.textView.setLayoutParams(Gear.textView_param);
Gear.textView.setBackgroundDrawable(mcpeTextView9);
Gear.textView.setPadding(DIP*4, DIP*4, DIP*4, DIP*4);
Gear.textView.setGravity(android.view.Gravity.RIGHT);
Gear.textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*10);
Gear.textView.setTextColor(android.graphics.Color.WHITE);
Gear.textView.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	Gear.textView.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
}
Gear.textView.setText("Idle mode");
Gear.layout.addView(Gear.textView);

Gear.moveButton = new android.widget.Button(ctx);
Gear.moveButton.setId(722);
Gear.moveButton_param = new android.widget.RelativeLayout.LayoutParams(DIP*56, DIP*20);
Gear.moveButton_param.setMargins(0,DIP*2,0,0);
Gear.moveButton_param.addRule(android.widget.RelativeLayout.BELOW, Gear.textView.getId());
Gear.moveButton.setLayoutParams(Gear.moveButton_param);
//Gear.moveButton.setAlpha(0);
Gear.moveButton.setPadding(DIP*4,DIP,0,0);
Gear.moveButton_drawable = new android.graphics.drawable.GradientDrawable();
Gear.moveButton_drawable.mutate().setColor(android.graphics.Color.rgb(0x3a, 0x39, 0x3a));
Gear.moveButton_drawable.setCornerRadius(DIP*5);
Gear.moveButton.setBackgroundDrawable(Gear.moveButton_drawable);
Gear.moveButton.setOnTouchListener(new android.view.View.OnTouchListener({ onTouch: function(view, event) {
	switch(event.action) {
		case android.view.MotionEvent.ACTION_DOWN:
				Gear.viewX = event.getX();
				Gear.viewY = event.getY();
				break;
		case android.view.MotionEvent.ACTION_MOVE:
			Gear.screenX = event.getRawX();
			Gear.screenY = event.getRawY();
			Gear.Wx = Gear.screenX - Gear.viewX;
			Gear.Wy = Gear.screenY - Gear.viewY;
			uiThread(function() {try {
				Gear.mainWindow.update(Gear.Wx - DIP*17, Gear.Wy - DIP*30, Gear.mainWindow.getWidth(), Gear.mainWindow.getHeight(), true);
				debug("move" + Gear.Wx + " " + Gear.Wy);
			}catch(e) {
				showError(e);
			}});
			break;
		case android.view.MotionEvent.ACTION_UP:
			saveData(_MOD_DATA, "WINDOW_X", Gear.Wx);
			saveData(_MOD_DATA, "WINDOW_Y", Gear.Wy);
			break;
	}
	return true;
}}));
Gear.moveButton.setGravity(android.view.Gravity.CENTER);
Gear.moveButton.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*8);
Gear.moveButton.setTextColor(android.graphics.Color.WHITE);
Gear.moveButton.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	Gear.moveButton.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));}
Gear.moveButton.setText("Gear");
Gear.layout.addView(Gear.moveButton);

Gear.resetButton = new android.widget.Button(ctx);
Gear.resetButton.setId(723);
Gear.resetButton.setBackgroundDrawable(mcpeMiniBtn9);
Gear.resetButton_param = new android.widget.RelativeLayout.LayoutParams(DIP*20, DIP*20);
Gear.resetButton_param.setMargins(DIP*4,DIP*2,0,0);
Gear.resetButton_param.addRule(android.widget.RelativeLayout.BELOW, Gear.textView.getId());
Gear.resetButton_param.addRule(android.widget.RelativeLayout.RIGHT_OF, Gear.moveButton.getId());
Gear.resetButton.setLayoutParams(Gear.resetButton_param);
Gear.resetButton.setOnTouchListener( new android.view.View.OnTouchListener({ onTouch: 
	function(view, event){
		switch(event.action){
			case android.view.MotionEvent.ACTION_DOWN:
				//버튼에 손댈때
				view.setBackgroundDrawable(mcpeMiniBtnClick9);
				break;
			case android.view.MotionEvent.ACTION_UP:
				//버튼에 손땔때
				view.setBackgroundDrawable(mcpeMiniBtn9);
				break;
		}
		return false;
	}
}));
Gear.resetButton.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.currentStepLock = Gear.floorStep;
		uiThread(function() {try {
			if(Gear.mod !== 0) {
				Gear.mod = 0;
				saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
			}
			Gear.textView.setTextColor(android.graphics.Color.WHITE);
			Gear.textView.setText((Gear.floorStep - Gear.currentStepLock) + "");
		}catch(e) {
			showError(e);
		}});
		saveData(_MAP_STEP_DATA(), "CURRENT_STEP_LOCK", Gear.currentStepLock);
		if(net.zhuoweizhang.mcpelauncher.ScriptManager.isRemote && !Gear.isRemote && Gear.allowRemote) {
		net.zhuoweizhang.mcpelauncher.ScriptManager.handleMessagePacketCallback("", "BlockLauncher, enable scripts, please and thank you");
		Gear.isRemote = true;
		newLevel("multi");
		}
	}catch(e) {
		showError(e);
	}}}));
Gear.resetButton.setOnLongClickListener(new android.view.View.OnLongClickListener({onLongClick: function(view, event) {try {
	gearSetting();
	return true;
}catch(e) {
	showError();
}}}));
Gear.layout.addView(Gear.resetButton);

Gear.mainWindow = new android.widget.PopupWindow(Gear.layout, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, false);
Gear.mainWindow.setSplitTouchEnabled(true);
Gear.mainWindow.setOutsideTouchable(true);
//Gear.mainWindow.setTouchable(false);
*/