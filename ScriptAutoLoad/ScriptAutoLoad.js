var ScriptName = "ScriptAutoLoad";
var Version = "dev-v0.1";
var VersionCode = "100";
var author = "CodeInside";

/**
 * —————Change Log—————
 * dev-v0.1(20150425)[100]
 * 	-시작
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
var _SD_CARD = android.os.Environment.getExternalStorageDirectory()/*.getAbsolutePath()*/;
var _MAIN_MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(_SD_CARD, "games/com.mojang/minecraftpe/mods/" + ScriptName);
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, ScriptName + ".dat");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_DATA() {return new java.io.File(_MAP_DIR(), ScriptName + ".data")}
var DIP = FOUR * loadData(_MOD_DATA, "DIPS");
if(DIP + "" === "NaN"){
	DIP = FOUR;
}


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

/**
 * ScriptAutoLoad
 */
 
 