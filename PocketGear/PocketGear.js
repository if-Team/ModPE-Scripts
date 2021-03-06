var ScriptName = "Pocket Gear";
var Version = "v1";
var author = "CodeInside";

/**
 *—————Change Log—————
 *v1(20150415)
 *	-출시
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

var debugging = false;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var DIP = FOUR * loadData(_MOD_DATA, "DIPS");
if(DIP + "" === "NaN"){
	DIP = FOUR;
}
var _SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var _MAIN_MOD_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods/Gear");
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, "data.data");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_STEP_DATA() {return new java.io.File(_MAP_DIR(), "gear.data")}


//마인크래프트 리소스
//NOT USE(TEXTURE PACK MISSING)
var mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
var mcpeAssets = mcpeCPC.getAssets();
//spritesheet.png 파일 접근
var mcpeSS;
try{
	mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//옛날 버전에 대한 호환성
	mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
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
//꽉찬배경 나인패치
var mcpeBGRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 0, 16, 16);
var mcpeBG = android.graphics.Bitmap.createScaledBitmap(mcpeBGRaw, dp(32), dp(32), false);
var mcpeBG9 = ninePatch1(mcpeBG, dp(12), dp(12), dp(24), dp(24));
//배경 나인패치
var mcpeBGTRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14);
var mcpeBGT = android.graphics.Bitmap.createScaledBitmap(mcpeBGTRaw, dp(32), dp(32), false);
var mcpeBGT9 = ninePatch1(mcpeBGT, dp(12), dp(12), dp(22), dp(22));
//타이틀바 나인패치
var mcpeTitleBarRaw = android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25);
var mcpeTitleBar = android.graphics.Bitmap.createScaledBitmap(mcpeTitleBarRaw, dp(28), dp(50), false);
var mcpeTitleBar9 = ninePatch1(mcpeTitleBar, dp(8), dp(8), dp(20), dp(22));
//종료 버튼 나인패치
var mcpeExitRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18);
var mcpeExit = android.graphics.Bitmap.createScaledBitmap(mcpeExitRaw, 18*FOUR, 18*FOUR, false);
var mcpeExit9 = ninePatch1(mcpeExit, dp(6), dp(6), dp(30), dp(30));
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
//종료 버튼(클릭) 나인패치
var mcpeExitClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18);
var mcpeExitClick = android.graphics.Bitmap.createScaledBitmap(mcpeExitClickRaw, dp(36), dp(36), false);
var mcpeExitClick9 = ninePatch1(mcpeExitClick, dp(6), dp(6), dp(32), dp(32));
//버튼 나인패치
var mcpeBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8);
var mcpeBtn = android.graphics.Bitmap.createScaledBitmap(mcpeBtnRaw,dp(16),dp(16),false);
var mcpeBtn9 = ninePatch1(mcpeBtn,dp(6),dp(4),dp(14),dp(14));
//버튼(클릭) 나인패치
var mcpeBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8);
var mcpeBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeBtnClickRaw,dp(16),dp(16),false);
var mcpeBtnClick9 = ninePatch1(mcpeBtnClick,dp(4),dp(4),dp(12),dp(14));
//미니버튼 나인패치
var mcpeMiniBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7);
var mcpeMiniBtn = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnRaw,dp(16),dp(14),false);
var mcpeMiniBtn9 = ninePatch1(mcpeMiniBtn,dp(2),dp(2),dp(12),dp(14));
//미니버튼(클릭) 나인패치
var mcpeMiniBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7);
var mcpeMiniBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnClickRaw,dp(16),dp(14),false);
var mcpeMiniBtnClick9 = ninePatch1(mcpeMiniBtnClick,dp(4),dp(4),dp(12),dp(12));
//텍스트뷰 나인패치
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
	return dips*DIP; //parseInt(dips * ctx.getResources().getDisplayMetrics().density + 0.5);
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
}

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
}


/**
 * get Yaw
 *
 * @since 2014-??-??
 * @author ToonRaOn
 */

function getYaw(x, y, z) {
	var apil = Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2));
	var apisinHorizontal = x/apil;
	var apicosHorizontal = z/apil;
	var apitanHorizontal = x/z;
	var apiacosHorizontal = Math.acos(z/apil)*180/Math.PI;
	var apiatanVertical = Math.atan(y/apil);
	var alpha = 0;
	if(apisinHorizontal > 0 && apicosHorizontal > 0 && apitanHorizontal > 0)
		alpha = 360 - apiacosHorizontal;
	else if(apisinHorizontal > 0 && apicosHorizontal < 0 && apitanHorizontal < 0) 
		alpha = 360 - apiacosHorizontal;
	else if(apisinHorizontal < 0 && apicosHorizontal < 0 && apitanHorizontal > 0) 
		alpha = apiacosHorizontal;
	else if(apisinHorizontal < 0 && apicosHorizontal > 0 && apitanHorizontal < 0) 
		alpha = apiacosHorizontal;
	else if(apicosHorizontal == 1) alpha = 0;
	else if(apisinHorizontal == 1) alpha = 90;
	else if(apicosHorizontal == -1) alpha = 180;
	else if(apisinHorizontal == -1) alpha = 270;
	else if(apisinHorizontal == 0 && apicosHorizontal == 1 && apitanHorizontal == 0) null;
	return alpha;
}


/**
 * View Side
 *
 * @since 2015-04-13
 * @author CodeInside
 */

function viewSide(yaw) {
	var temp = yaw % 360;
	if((temp >= 0 && temp < 11.25) || (temp >= 348.75 && temp < 360))
		return "북(Z+)";
	else if(temp >= 11.25 && temp < 33.75)
		return "북북동";
	else if(temp >= 33.75 && temp < 56.25)
		return "북동";
	else if(temp >= 56.25 && temp < 78.75)
		return "북동동";
	else if(temp >= 78.75 && temp < 101.25)
		return "동(-X)";
	else if(temp >= 101.25 && temp < 123.75)
		return "남동동";
	else if(temp >= 123.75 && temp < 146.25)
		return "남동";
	else if(temp >= 146.25 && temp < 168.75)
		return "남남동";
	else if(temp >= 168.75 && temp < 191.25)
		return "남(Z-)";
	else if(temp >= 191.25 && temp < 213.75)
		return "남남서";
	else if(temp >= 213.75 && temp < 236.25)
		return "남서";
	else if(temp >= 236.25 && temp < 258.75)
		return "남서서";
	else if(temp >= 258.75 && temp < 281.25)
		return "서(X+)";
	else if(temp >= 281.25 && temp < 303.75)
		return "북서서";
	else if(temp >= 303.75 && temp < 326.25)
		return "북서";
	else if(temp >= 326.25 && temp < 348.75)
		return "북북서";
	else
		return "NaY";
}

function viewSide2(yaw) {
	while(yaw < 0) {
		yaw += 360;
	}
	var temp = yaw % 360;
	if((temp >= 0 && temp < 15) || (temp >= 345 && temp < 360))
		return 12;
	else if(temp >= 15 && temp < 45)
		return 11;
	else if(temp >= 45 && temp < 75)
		return 10;
	else if(temp >= 75 && temp < 105)
		return 9;
	else if(temp >= 105 && temp < 135)
		return 8;
	else if(temp >= 135 && temp < 165)
		return 7;
	else if(temp >= 165 && temp < 195)
		return 6;
	else if(temp >= 195 && temp < 225)
		return 5;
	else if(temp >= 225 && temp < 255)
		return 4;
	else if(temp >= 255 && temp < 285)
		return 3;
	else if(temp >= 285 && temp < 315)
		return 2;
	else if(temp >= 315 && temp < 345)
		return 1;
	else
		return "NaY(" + yaw + ")";
}


/**
 * Battery Checker
 *
 * @since 2015-04-14
 * @author CodeInside
 */

var ifilter = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);

Battery = {};

Battery.isCharging = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
	return status == android.os.BatteryManager.BATTERY_STATUS_CHARGING;
};

Battery.isFullCharging = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
	return status == android.os.BatteryManager.BATTERY_STATUS_FULL;
};
	
Battery.plugType = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var chargePlug = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_PLUGGED, -1);
	var usbCharge = chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_USB;
	var acCharge = chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_AC;
	if(usbCharge) {
		return "USB"
	}else if(acCharge) {
		return "AC"
	}else {
		return null	
	}
};

Battery.level = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var level = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
	var scale = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
	return Math.round(level / scale * 100);
};

Battery.temp = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var temp = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TEMPERATURE, -1);
	return Math.round(temp) / 10;
};

Battery.volt = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var volt = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_VOLTAGE, -1);
	return volt / 1000;
};

Battery.tec = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var tec = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TECHNOLOGY, -1);
	return tec;
};

Battery.health = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var health = batteryStatus.getIntExtra(android.os.BatteryManager. EXTRA_HEALTH, -1);
	switch(health) {
		case android.os.BatteryManager.BATTERY_HEALTH_GOOD:
			return 0;//normal
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_DEAD:
			return 1;//battery life span is nearly end
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_COLD:
			return 2;//battery is too cold for work
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_OVERHEAT:
			return 3;//battery buning XD
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
			return 4;//battery voltage is too high
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE:
			return 5;//unKnow!
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE:
			return 6;//I don't know why fail but someting wrong.
			break;
		default:
			return -1;//i can't read it maybe your phone API version is higher
	}
};


/**
 * TextToSpeach
 *
 * @since 2015-04-??
 * @author Dark
 */

var tts = new android.speech.tts.TextToSpeech (ctx, new android.speech.tts.TextToSpeech.OnInitListener ( {
	onInit: function (status) {
		//tts.setLanguage(java.util.Locale.KOREAN);
	}
}), "com.samsung.SMT");

//var GearVoice = new android.speech.tts.Voice("GearVoice", java.util.Locale.KOREAN, android.speech.tts.Voice.QUALITY_NORMAL, android.speech.tts.Voice.LATENCY_NORMAL, false, "gear");

tts.setPitch(3);
tts.setLanguage(java.util.Locale.KOREAN);
tts.setSpeechRate(1.5);
//tts.setVoice(GearVoice);
//toast(tts.getEngines() + "");

function ttsIt(str, pitch, speed) {
	tts.setPitch(pitch);
	tts.setSpeechRate(speed);
	tts.speak(str, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
}

/*function chatHook (str) {
	tts.setPitch(1);
	tts.setSpeechRate(1);
	tts.speak (str, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
}*/

if(!_MOD_DIR.exists()) {
	_MOD_DIR.mkdirs();
}

if(!_MOD_DATA.exists()) {
	_MOD_DATA.createNewFile();
	toast("[Pocket Gear]\n\n첫 부팅을 환영합니다\n<Copyright® 2015 CodeInside>");
	//ttsIt("Pocket Gear 가동 합니다", 0.9, 0.9);
}

if(!_FONT.exists()) {
	if(!downloadFile(_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1")) {
		toast("[Pocket Gear]\n\n폰트를 다운로드하지 못했습니다\n아마도 인터넷이 연결되어 있지 않습니다");
		toasts("[Pocket Gear]\n\n시스템 폰트를 적용합니다...");
	}
}

//Minecraft function
function newLevel(str) {
	Gear.newLevel(str);
	Gear.loadPlayers();
	//Gear.newWeb("http://www.naver.com/");
}

function leaveGame() {
	Gear.leaveGame();
	Gear.players = [];
}

function modTick() {
	Gear.pedometerTick();
	Gear.textViewTick();
	Gear.autoSaveTick();
	if(++Gear.slowTick > 5) {
		Gear.slowTick = 0;
		Gear.slowModTick();
	}
	if(++Gear.slowestTick > 20) {
		Gear.slowestTick = 0;
		Gear.slowestModTick();
	}
}

function entityAddedHook(ent) {
	Gear.playerAdded(ent);
}

function entityRemovedHook(ent) {
	Gear.playerRemoved(ent);
}
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

Gear.newWeb = function(url) {
	uiThread(function() {try {
	Gear.webLayout = new android.widget.RelativeLayout(ctx);
	Gear.webLayout.setBackgroundDrawable(mcpeBGT9);
	Gear.webLayout.setPadding(DIP*8, DIP*8, DIP*8, DIP*8);

	Gear.webView = new android.webkit.WebView(ctx);
	Gear.webView.setWebChromeClient(new android.webkit.WebChromeClient());
	Gear.webView.setWebViewClient(new android.webkit.WebViewClient());
	Gear.webView_param = new android.widget.RelativeLayout.LayoutParams(DIP*300, DIP*200);
	Gear.webView_param.setMargins(0,0,0,0);
	Gear.webView.setLayoutParams(Gear.webView_param);
	Gear.webLayout.addView(Gear.webView);

	Gear.webWindow = new android.widget.PopupWindow(Gear.webLayout, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT, false);
	Gear.webWindow.setSplitTouchEnabled(true);
	Gear.webWindow.setOutsideTouchable(true);
	
	Gear.webView.loadUrl(url);
	Gear.webWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
	}catch(e) {
		showError(e)
	}})
};

function gearSetting() {uiThread(function() {try {
	Gear.mainDialog = new android.app.AlertDialog.Builder(ctx, 2); 
	Gear.mainDialog.setTitle("Gear");
	
	Gear.mainDialogScroll = new android.widget.ScrollView(ctx);
	
	Gear.mainDialogLayout = new android.widget.LinearLayout(ctx);
	Gear.mainDialogLayout.setOrientation(1);
	
	Gear.mod0 = new android.widget.Button(ctx);
	Gear.mod0.setText("Recent Pedometer");
	if(Gear.mod === 0) {
		Gear.mod0.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod0.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod0.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod0.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 0;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod0);
	
	Gear.mod1 = new android.widget.Button(ctx);
	Gear.mod1.setText("Overall Pedometer");
	if(Gear.mod === 1) {
		Gear.mod1.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod1.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod1.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod1.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 1;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod1);
	
	Gear.mod2 = new android.widget.Button(ctx);
	Gear.mod2.setText("Time");
	if(Gear.mod === 2) {
		Gear.mod2.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod2.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod2.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod2.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 2;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod2);
	
	Gear.mod3 = new android.widget.Button(ctx);
	Gear.mod3.setText("Minecraft Time");
	if(Gear.mod === 3) {
		Gear.mod3.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod3.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod3.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod3.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 3;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod3);
	
	Gear.mod4 = new android.widget.Button(ctx);
	Gear.mod4.setText("Nearest player info");
	if(Gear.mod === 4) {
		Gear.mod4.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod4.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod4.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod4.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 4;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod4);
	
	Gear.mod7 = new android.widget.Button(ctx);
	Gear.mod7.setText("Location");
	if(Gear.mod === 7) {
		Gear.mod7.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod7.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod7.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod7.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 7;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod7);
	
	Gear.mod8 = new android.widget.Button(ctx);
	Gear.mod8.setText("Chank, Biome");
	if(Gear.mod === 8) {
		Gear.mod8.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod8.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod8.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod8.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 8;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod8);
	
	 	Gear.mod10 = new android.widget.Button(ctx);
	Gear.mod10.setText("Battery");
	if(Gear.mod === 10) {
		Gear.mod10.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod10.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod10.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod10.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.reloadMainDialog();
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 10;
		Gear.mainWindowReset();
		saveData(_MOD_DATA, "MOD", Gear.mod);
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.mod10);
	
	Gear.settingBtn = new android.widget.Button(ctx);
	Gear.settingBtn.setText("Setting");
	Gear.settingBtn.setTextColor(android.graphics.Color.WHITE);
	Gear.settingBtn.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.settingBtn.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.setting();
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.settingBtn);
	
	Gear.helpBtn = new android.widget.Button(ctx);
	Gear.helpBtn.setText("Help");
	Gear.helpBtn.setTextColor(android.graphics.Color.WHITE);
	Gear.helpBtn.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.helpBtn.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.help();
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.mainDialogLayout.addView(Gear.helpBtn);
	
	Gear.mainDialogScroll.addView(Gear.mainDialogLayout);
	
	Gear.mainDialog.setView(Gear.mainDialogScroll);
	Gear.mainDialog.create();
	Gear.mainDialog.show();
}catch(e) {
	showError(e);
}})};

Gear.reloadMainDialog = function() {try {
	switch(Gear.mod) {
		case 0:
			Gear.mod0.setTextColor(android.graphics.Color.WHITE);
			break;
		case 1:
			Gear.mod1.setTextColor(android.graphics.Color.WHITE);
			break;
		case 2:
			Gear.mod2.setTextColor(android.graphics.Color.WHITE);
			break;
		case 3:
			Gear.mod3.setTextColor(android.graphics.Color.WHITE);
			break;
		case 4:
			Gear.mod4.setTextColor(android.graphics.Color.WHITE);
			break;
		case 5:
			Gear.mod5.setTextColor(android.graphics.Color.WHITE);
			break;
		case 6:
			Gear.mod6.setTextColor(android.graphics.Color.WHITE);
			break;
		case 7:
			Gear.mod7.setTextColor(android.graphics.Color.WHITE);
			break;
		case 8:
			Gear.mod8.setTextColor(android.graphics.Color.WHITE);
			break;
		case 9:
			Gear.mod9.setTextColor(android.graphics.Color.WHITE);
			break;
		case 10:
			Gear.mod10.setTextColor(android.graphics.Color.WHITE);
			break;
	}
}catch(e) {
	showError(e);
}};

Gear.setting = function() {uiThread(function() {try {
	Gear.settingDialog = new android.app.AlertDialog.Builder(ctx, 2); 
	Gear.settingDialog.setTitle("Gear setting");
	
	Gear.settingDialogScroll = new android.widget.ScrollView(ctx);
	
	Gear.settingDialogLayout = new android.widget.LinearLayout(ctx);
	Gear.settingDialogLayout.setOrientation(1);
	
	Gear.multiBtn = new android.widget.Button(ctx);
	Gear.multiBtn.setText("Visible in Multiplay");
	Gear.multiBtn.setTextColor(android.graphics.Color.WHITE);
	if(Gear.allowRemote) {
		Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLUE);
	}else {
		Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLACK);
	}
	Gear.multiBtn.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		if(Gear.allowRemote) {
			Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLACK);
			Gear.allowRemote = false;
			saveData(_MOD_DATA, "ALLOW_REMOTE", false);
		}else {
			Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLUE);
			Gear.allowRemote = true;
			saveData(_MOD_DATA, "ALLOW_REMOTE", true);
		}
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.settingDialogLayout.addView(Gear.multiBtn);
	
	Gear.settingDialogScroll.addView(Gear.settingDialogLayout);
	
	Gear.settingDialog.setView(Gear.settingDialogScroll);
	Gear.settingDialog.create();
	Gear.settingDialog.show();
}catch(e) {
	showError(e);
}})};

Gear.help = function() {uiThread(function() {try {
	Gear.helpDialog = new android.app.AlertDialog.Builder(ctx, 2); 
	Gear.helpDialog.setTitle("Gear help");
	
	Gear.helpDialogScroll = new android.widget.ScrollView(ctx);
	
	Gear.helpDialogLayout = new android.widget.LinearLayout(ctx);
	Gear.helpDialogLayout.setOrientation(1);
	
	Gear.multiBtn = new android.widget.Button(ctx);
	Gear.multiBtn.setText(/*'"' + Gear.mod0.getText() + '" help'*/"Not able.");
	Gear.multiBtn.setTextColor(android.graphics.Color.WHITE);
	Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.multiBtn.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		Gear.textDialog("Title...", "Message...");
	}catch(e) {
		errorShow(e);
	}}}));
	Gear.helpDialogLayout.addView(Gear.multiBtn);
	
	Gear.helpDialogScroll.addView(Gear.helpDialogLayout);
	
	Gear.helpDialog.setView(Gear.helpDialogScroll);
	Gear.helpDialog.create();
	Gear.helpDialog.show();
}catch(e) {
	showError(e);
}})};

Gear.textDialog = function(title, text) {
	debug("new dialog: " + title);
	var temp = new android.app.AlertDialog.Builder(ctx, 2);
	temp.setTitle(title);
	var temp3 = new android.widget.ScrollView(ctx);
	var temp2 = new android.widget.TextView(ctx);
	temp2.setTextColor(android.graphics.Color.WHITE);
	temp2.setBackgroundColor(android.graphics.Color.BLACK);
	temp2.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
	temp2.setText(text);
	temp3.addView(temp2);
	temp.setView(temp3);
	temp.create().show();
};

Gear.mainWindowReset = function() {
	debug("main window reset");
	uiThread(function() {
		Gear.textView.setText("loading...");
		Gear.textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*10);
		if(Gear.mod === 1) {
			Gear.textView.setTextColor(android.graphics.Color.YELLOW)
		}else {
			Gear.textView.setTextColor(android.graphics.Color.WHITE)
		}
	});
};

uiThread(function() {try {
	if(!Gear.isWindowAlive && Gear.allowRemote) {
		Gear.mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((loadData(_MOD_DATA, "WINDOW_X") == null || loadData(_MOD_DATA, "WINDOW_X") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getWidth() - DIP-82 : loadData(_MOD_DATA, "WINDOW_X") - DIP*16), ((loadData(_MOD_DATA, "WINDOW_Y") == null || loadData(_MOD_DATA, "WINDOW_Y") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getHeight() - dp(55) : loadData(_MOD_DATA, "WINDOW_Y") - DIP*30));
		Gear.isWindowAlive = true;
	}
}catch(e) {
	showError(e);
}});

Gear.newLevel = function(str) {
	if(Level.getWorldDir() === null) {
		//MultiPlayer
		Gear.step = 0;
		Gear.floorStep = 0;
		Gear.currentStepLock = 0;
	}else {
		if(!_MAP_DIR().exists()) {
			_MAP_DIR().mkdir();
		}
		if(!_MAP_STEP_DATA().exists()) {
			_MAP_STEP_DATA().createNewFile();
		}
		Gear.step = parseInt(loadData(_MAP_STEP_DATA(), "STEP"));
		debug("Gear.overall " + Gear.step);
		if(Gear.step + "" == "NaN") {
			Gear.step = 0;
			if(Level.getWorldDir() !== null) {
				saveData(_MAP_STEP_DATA(), "STEP", 0);
			}
		}
		Gear.floorStep = Math.floor(Gear.step);
		Gear.currentStepLock = parseInt(loadData(_MAP_STEP_DATA(), "CURRENT_STEP_LOCK"));
		if(Gear.currentStepLock + "" === "NaN") {
			Gear.currentStepLock = 0;
			if(Level.getWorldDir() !== null) {
				saveData(_MAP_STEP_DATA(), "CURRENT_STEP_LOCK", Gear.currentStepLock);
			}
		}
	}
	Gear.mainWindowReset();
	uiThread(function() {try {
		if(!Gear.isWindowAlive) {
			Gear.mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((loadData(_MOD_DATA, "WINDOW_X") == null || loadData(_MOD_DATA, "WINDOW_X") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getWidth() - DIP*82 : loadData(_MOD_DATA, "WINDOW_X") - dp(17)), ((loadData(_MOD_DATA, "WINDOW_Y") == null || loadData(_MOD_DATA, "WINDOW_Y") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getHeight() - DIP*55 : loadData(_MOD_DATA, "WINDOW_Y") - DIP*30));
			Gear.isWindowAlive = true;
		}
	}catch(e) {
		showError(e);
	}});
};

Gear.leaveGame = function() {
	Gear.mainWindowReset();
	Gear.isRemote = false;
	if(Level.getWorldDir() !== null) {
		saveData(_MAP_STEP_DATA(), "STEP", Gear.floorStep);
	}
	saveData(_MOD_DATA, "MOD", Gear.mod);
	if(Gear.mainWindow != null && !Gear.allowRemote && Gear.isWindowAlive) {
		uiThread(function() {try {
			Gear.mainWindow.dismiss();
			Gear.isWindowAlive = false;
		}catch(e) {
			showError(e);
		}});
	}
};

Gear.pedometerTick = function() {
	var x = Entity.getVelX(Player.getEntity());
	var z = Entity.getVelZ(Player.getEntity());
	if(x !== 0 || z !== 0) {
		Gear.step += Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
		if(Math.floor(Gear.step) !== Gear.floorStep) {
			Gear.floorStep = Math.floor(Gear.step);
		}
	}
};

Gear.autoSaveTick = function() {
	if(++Gear.saveCount > 200 && Level.getWorldDir() !== null) {
		debug("Gear.autoSaveStep " + Gear.floorStep);
		Gear.saveCount = 0;
		thread(function() {
			saveData(_MAP_STEP_DATA(), "STEP", Gear.floorStep);
		}).start();
	}
};

Gear.textViewTick = function() {
    var time, min, x, y, z;
	switch(Gear.mod) {
		case 0:
			uiThread(function() {try {
				Gear.textView.setText((Gear.floorStep - Gear.currentStepLock) + "");
			}catch(e) {
				showError(e);
			}});
			break;
			
		case 1:
			uiThread(function() {try {
				Gear.textView.setText(Gear.floorStep + "");
			}catch(e) {
				showError(e);
			}});
			break;
		case 2:
			time = new Date();
			min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
			uiThread(function() {try {
				Gear.textView.setText((time.getHours() < 12 ? "AM " : "PM ") + time.getHours()%12 + ":" + min);
			}catch(e) {
				showError(e);
			}});
			break;
		case 3:
			time = Level.getTime() + 4800;
			var convert = Math.floor((time % 19200) * 1440 / 19200);
			var hour = Math.floor(convert / 60);
			min = convert % 60;
			var minc = min < 10 ? "0" + min : min;
			uiThread(function() {try {
				Gear.textView.setText((hour < 12 ? "MAM " : "MPM ") + hour % 12 + ":" + minc);
			}catch(e) {
				showError(e);
			}});
			break;
		case 7:
			x = Math.round(Player.getX()*100)/100;
			y = Math.round(Player.getY()*100)/100;
			z = Math.round(Player.getZ()*100)/100;
					uiThread(function(){try {Gear.textView.setText("X: "+x+"\nY: "+y+"\nZ: "+z)}catch(e) {showError(e)}});
			break;
		case 8:
			x = Math.round(Player.getX()*100)/100;
			y = Math.round(Player.getY()*100)/100;
			z = Math.round(Player.getZ()*100)/100;
					uiThread(function(){try {Gear.textView.setText(("chunkX: "+Math.floor(x/16)+"\nchunkZ: "+Math.floor(z/16)+"\n"+Level.getBiomeName(x,y,z)).toString())}catch(e) {showError(e)}});
			break;
		case 9:
			break;
	}
};

Gear.slowModTick = function() {
    var e, ent;
	switch(Gear.mod) {
		case 4:
			for(e = 0; e < Gear.players.length; e++) {
				ent = Gear.players[e];
				if(!Player.isPlayer(ent) || Gear.voidClip.indexOf(Level.getTile(Entity.getX(ent), Entity.getY(ent) + 0.6, Entity.getZ(ent))) === -1 || Player.getEntity() == ent) {
					Gear.players.splice(e, 1);
				}
			}
			Gear.playerRange = [];
			for(e = 0; e < Gear.players.length; e++) {
				ent = Gear.players[e];
				Gear.playerRange[e] = Math.sqrt(Math.pow(Player.getX() - Entity.getX(ent), 2) + Math.pow(Player.getY() - Entity.getY(ent), 2) + Math.pow(Player.getZ() - Entity.getZ(ent), 2));
			}
			Gear.playerRangeMin = Gear.playerRange.indexOf(Math.min.apply(null, Gear.playerRange));
			Gear.playerRangeMinEnt = Gear.players[Gear.playerRangeMin];
			Gear.playerRangeMinName = Player.getName(Gear.playerRangeMinEnt);
			if(Gear.playerRangeMinName.indexOf("[") < Gear.playerRangeMinName.indexOf("]") && Gear.playerRangeMinName.indexOf("]") !== Gear.playerRangeMinName.length - 1) {
				Gear.playerRangeMinName = Gear.playerRangeMinName.substring(Gear.playerRangeMinName.indexOf("]") + 1, Gear.playerRangeMinName.length - 1);
			}else if(Gear.playerRangeMinName.indexOf("<") < Gear.playerRangeMinName.indexOf(">") && Gear.playerRangeMinName.indexOf(">") !== Gear.playerRangeMinName.length - 1) {
				Gear.playerRangeMinName = Gear.playerRangeMinName.substring(Gear.playerRangeMinName.indexOf(">") + 1, Gear.playerRangeMinName.length - 1);
			}
			if(Gear.playerRangeMinName.length > 16) {
				Gear.playerRangeMinName = Gear.playerRangeMinName.substring(0, 15);
			}
			uiThread(function() {try {
				if(Gear.playerRangeMin === -1) {
					if(Gear.noPlayer < 20) {
						 Gear.textView.setTextColor(android.graphics.Color.RED);
						 Gear.noPlayer++;
					}else {
						 Gear.textView.setTextColor(android.graphics.Color.GRAY);
						 Gear.textView.setText("Scanning...");
					}
				} else {
					Gear.textView.setTextColor(android.graphics.Color.WHITE);
					var ryaw = getYaw(Entity.getX(Gear.playerRangeMinEnt) - Player.getX(), Entity.getY(Gear.playerRangeMinEnt) - Player.getY(), Entity.getZ(Gear.playerRangeMinEnt) - Player.getZ());
					var tyaw = (Entity.getYaw(Gear.playerRangeMinEnt) + 180) % 360;
					while(tyaw < 0) {
						tyaw += 360;
					}
					var ryawm = (ryaw + 350) % 360;
					var ryawM = (ryaw + 10) % 360;
					if((ryawm <= tyaw && ryawM > tyaw) || ((ryaw >= 350 || ryaw < 10) && (ryawm <= tyaw || ryawM > tyaw))) {
						Gear.textView.setTextColor(android.graphics.Color.YELLOW);
					}else {
						Gear.textView.setTextColor(android.graphics.Color.WHITE);
					}
					Gear.noPlayer = 0;
					debug(Math.round(ryaw) + " " + Math.round(tyaw));
					Gear.textView.setText(Gear.playerRangeMinName + "\n" + Entity.getHealth(Gear.players[Gear.playerRangeMin]) + "hp " + Math.floor(Gear.playerRange[Gear.playerRangeMin]) + "m" + "\n" + viewSide2(Entity.getYaw(Player.getEntity()) - ryaw) + "시 방향");
				}
			}catch(e) {
				showError(e);
			}});
			break;
		case 10:
			if(Battery.plugType() !== null) {
				Gear.extraInfo = "\n" + " charging…" + "\n<" + Battery.plugType() + ">";
			}else {
				Gear.extraInfo = "";
			}
			uiThread(function() {try {
				Gear.textView.setText("Level " + Battery.level() + "%\n" + (Math.round(Battery.volt()*10)/10) + "V " + Battery.temp() + "C°" + Gear.extraInfo);
			}catch(e) {
				showError(e);
			}});
			break;
	}
};

Gear.slowestModTick = function() {
	if(net.zhuoweizhang.mcpelauncher.ScriptManager.isRemote && !Gear.isRemote && Gear.allowRemote) {
		net.zhuoweizhang.mcpelauncher.ScriptManager.handleMessagePacketCallback("", "BlockLauncher, enable scripts, please and thank you");
		Gear.isRemote = true;
		newLevel("multi");
	}
	switch(Gear.mod) {
		case 4:
		case 5:
		case 6:
			try{
				Gear.temp = Entity.getAll();
				for(var e = 0; e < Gear.temp.length; e++) {
					var ent = Gear.temp[e];
					if(Player.isPlayer(ent) && Player.getEntity() != ent && Gear.players.indexOf(ent) < 0 && Gear.voidClip.indexOf(Level.getTile(Entity.getX(ent), Entity.getY(ent) + 0.6, Entity.getZ(ent))) !== -1) {
						Gear.players.push(ent);
					}
				}
			}catch(e) {
				Gear.mod = 2;
				clientMessage(ChatColor.DARK_RED + "[Pocket Gear] 플레이어 데이터를 읽을 수 없습니다.");
				clientMessage(ChatColor.DARK_RED + "[Pocket Gear] 혹시 Block Luncher의 버전이 너무 낮은가요?")
			}
			break;
	}
};

Gear.loadPlayers = function() {
	if(Gear.isMap) {
		try{
			Gear.temp2 = Entity.getAll();
			for(var e = 0; e < Gear.temp2.length; e++) {
				var ent = Gear.temp2[e];
				if(Player.isPlayer(ent) && Player.getEntity() !== ent) {
					Gear.players.push(ent);
				}
			}
		}catch(e) {
			clientMessage(ChatColor.DARK_RED + "[Pocket Gear] 플레이어 데이터를 읽을 수 없습니다.");
			clientMessage(ChatColor.DARK_RED + "[Pocket Gear] 혹시 Block Luncher의 버전이 너무 낮은가요?")
		}
	}
};

Gear.playerAdded = function(ent) {
/*	if(Player.isPlayer(ent) && Gear.players.indexOf(ent) == -1 && ent !== Player.getEntity()) {
		try {
			Gear.players.push(ent);
		}catch(e) {
			showError(e);
		}
	}*/
};

Gear.playerRemoved = function(ent) {
	if(Gear.players.indexOf(ent) < 1) {
		Gear.players.splice(Gear.players.indexOf(ent), 1);
	}
};