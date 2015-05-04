var ScriptName = "Script AutoLoad";
var Version = "v0.1";
var VersionCode = "105";
var author = "CodeInside";

/**
 * —————Change Log—————
 *(Sorry my english is horrible)
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
 * 
 * dev-v0.4(20150429)[103]
 * 	-ScriptInfo
 * 	-fix NinePatch
 *
 * dev-v0.5(20150504)[104]
 * 	-scriptEnabled function complete
 * 	-AutoLoad function complete
 * 	-File Explore window complete
 * 	-READY TO RELEASE
 *
 * beta-v0.1(20150505)[105]
 * 	-fix: no more repetition script
 * 	-fix: escape root folder in FileExplore
 * 	-if you use other file instead of JS file it can warning you
 * 	-can't use same name file in the same time
 *
 * v0.1(20150505)[106]
 * 	-RELEASE
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
loadingText.setText(TAG+"Reading script...");
loadingText.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
loadingText = toMcpeTextM(loadingText);
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
	toasts(TAG+"Block Luncher version is too low. \ncan't load texturepack.");
	mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
	toasts(TAG+"using interner texturepack.");
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
function mcpeBG9() {return ninePatch1(mcpeBG, dp(12), dp(12), dp(24), dp(24))};
//배경
var mcpeBGTRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14);
var mcpeBGT = android.graphics.Bitmap.createScaledBitmap(mcpeBGTRaw, dp(32), dp(32), false);
function mcpeBGT9() {return ninePatch1(mcpeBGT, dp(12), dp(12), dp(22), dp(22))};
//타이틀바
var mcpeTitleBarRaw = android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25);
var mcpeTitleBar = android.graphics.Bitmap.createScaledBitmap(mcpeTitleBarRaw, dp(28), dp(50), false);
function mcpeTitleBar9() {return ninePatch1(mcpeTitleBar, dp(6), dp(8), dp(46), dp(20))};

function mcpeTitleBar(layout) {
	var layoutA = new android.widget.RelativeLayout(ctx);
	var layoutC = new android.widget.RelativeLayout(ctx);
	layoutC.setBackgroundDrawable(ninePatch1(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeTG_BF, 153, 26, 8, 25), dp(16), dp(50), false), dp(4), dp(0), dp(46), dp(16)));
	layoutA.addView(layoutC);
	
	var layoutL = new android.view.View(ctx);
	layoutL.setBackgroundDrawable(ninePatch1(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 2, 25), dp(4), dp(50), false), dp(4), dp(0), dp(46), dp(2)));
	layoutA.addView(layoutL);
	
	layout.addView(layoutA);
	return layoutC;
}

//메뉴
var mcpeScrollRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 20, 8, 8);
var mcpeScroll = android.graphics.Bitmap.createScaledBitmap(mcpeScrollRaw, dp(16), dp(16), false);
function mcpeScroll9() {return ninePatch1(mcpeScroll, dp(6), dp(4), dp(10), dp(12))};
//메뉴항목
var mcpeManuContentRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,20,32,8,8);
var mcpeManuContent = android.graphics.Bitmap.createScaledBitmap(mcpeManuContentRaw,dp(16),dp(16),false);
function mcpeManuContent9() {return ninePatch1(mcpeManuContent,dp(2),dp(2),dp(14),dp(14))};
//메뉴항목(선택됨)
var mcpeManuContentSelectRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,28,32,8,8);
var mcpeManuContentSelect = android.graphics.Bitmap.createScaledBitmap(mcpeManuContentSelectRaw,dp(16),dp(16),false);
function mcpeManuContentSelect9() {return ninePatch1(mcpeManuContentSelect,dp(2),dp(2),dp(14),dp(14))};
//종료 버튼
var mcpeExitRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18);
var mcpeExit = android.graphics.Bitmap.createScaledBitmap(mcpeExitRaw, 18*FOUR, 18*FOUR, false);
function mcpeExit9() {return ninePatch1(mcpeExit, dp(6), dp(6), dp(30), dp(30))};
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
//종료 버튼(클릭)
var mcpeExitClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18);
var mcpeExitClick = android.graphics.Bitmap.createScaledBitmap(mcpeExitClickRaw, dp(36), dp(36), false);
function mcpeExitClick9() {return ninePatch1(mcpeExitClick, dp(6), dp(6), dp(32), dp(32))};
//버튼
var mcpeBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8);
var mcpeBtn = android.graphics.Bitmap.createScaledBitmap(mcpeBtnRaw,dp(16),dp(16),false);
function mcpeBtn9() {return ninePatch1(mcpeBtn,dp(6),dp(4),dp(14),dp(14))};
//버튼(클릭)
var mcpeBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8);
var mcpeBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeBtnClickRaw,dp(16),dp(16),false);
function mcpeBtnClick9() {return ninePatch1(mcpeBtnClick,dp(4),dp(4),dp(12),dp(14))};
//미니버튼
var mcpeMiniBtnRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7);
var mcpeMiniBtn = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnRaw,dp(16),dp(14),false);
function mcpeMiniBtn9() {return ninePatch1(mcpeMiniBtn,dp(2),dp(2),dp(12),dp(14))};
//미니버튼(클릭)
var mcpeMiniBtnClickRaw = android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7);
var mcpeMiniBtnClick = android.graphics.Bitmap.createScaledBitmap(mcpeMiniBtnClickRaw,dp(16),dp(14),false);
function mcpeMiniBtnClick9() { ninePatch1(mcpeMiniBtnClick,dp(4),dp(4),dp(12),dp(12))};
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
function mcpeTextView9() {return ninePatch1(mcpeTextView, dp(3), dp(3), dp(4), dp(4))};
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

function toMcpeTextS(TextView) {
	TextView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
	if(_FONT.exists()) {
		TextView.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"))
	};
TextView.setTransformationMethod(null);
TextView.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	TextView.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
	return TextView
};

function toMcpeTextM(TextView) {
	TextView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
	if(_FONT.exists()) {
		TextView.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"))
	};
TextView.setTransformationMethod(null);
TextView.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	TextView.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
	return TextView
};

function debug(str) {
	if(debugging) {
		if(Level.getWorldName() === null) {
			 ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		android.widget.Toast.makeText(ctx, "[Debug]\n" + str, android.widget.Toast.LENGTH_SHORT).show();
			}}));
		}else {
			clientMessage("[debug] " + str);
		}
	}
}

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, TAG + "<" + e.fileName + " - Error Line: " + e.lineNumber + "> " + e.message, android.widget.Toast.LENGTH_LONG).show();
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
		clientMessage(ChatColor.DARK_RED + TAG + "<" + " ERROR LINE: " + e.lineNumber + ">\n" + ChatColor.DARK_RED + c);
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

SAL.saveAll = function() {
	saveData(_MOD_DATA, "MANU_LIST", JSON.stringify(SAL.list));
}

SAL.manuListAdd = function(layout, views) {
	for(var e = 0; e < views.length; e++) {
		var btn = new android.widget.Button(ctx);
		btn.setText(views[e].name);
		btn.setTransformationMethod(null);
		btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
		btn.setId(views[e].ID);
		btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
		if(_FONT.exists()) {
			btn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
		};
		btn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
		btn.setPadding(DIP*2, DIP*2, DIP*2, DIP*2);
		var btn_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, DIP*36);
		btn.setLayoutParams(btn_param);
		if(!views[e].isExist) {
			btn.setBackgroundColor(android.graphics.Color.parseColor("#700000"));
		}else {
			switch(views[e].active) {
				case 0:
					btn.setBackgroundDrawable(mcpeManuContent9());
					break;
				case 1:
					btn.setBackgroundDrawable(mcpeManuContentSelect9());
					break;
				default:
					btn.setBackgroundColor(android.graphics.Color.parseColor("#000000"));
			}
		}
		btn.setOnClickListener(android.view.View.OnClickListener({
			onClick: function(view, event) {try {
				SAL.lastIndex = SAL.findDataNumByID(SAL.list, view.getId());
				SAL.mainSelectWindowReload();
				SAL.mainWindowShow(false);
				SAL.mainSelectWindowShow(true);
			}catch(e) {
				showError(e);
			}}
		}));
		layout.addView(btn);
	}
};

SAL.loadScriptListData = function() {

	for(var e = 0; e < SAL.list.length; e++) {
		var f = new java.io.File(SAL.list[e].path);
		if(f.exists() && f.isFile() && f.canRead()) {
			SAL.list[e].isExist = 1
		}else {
			SAL.list[e].isExist = 0;
			if(f.exists() && f.isFile() && !f.canRead()) {
				toast(TAG + SAL.list[e].name + "는(은) 읽을 수 없는 파일입니다")
			}
		}
		try {
			if(!(SAL.list[e].ID >= 7220)) {
				debug("setId" + SAL.getListMaxID(SAL.list));
				SAL.list[e].ID = SAL.getListMaxID(SAL.list) + 1
			}
		}catch(e) {
			SAL.list[e].ID = SAL.getListMaxID(SAL.list) + 1
		}
	}
	SAL.saveAll();
};

SAL.findDataNumByID = function(list, ID) {
	for(var e = 0; e < list.length; e++) {
		debug("findDataNumByID" + list[e].ID + " " + list[e].ID == ID);
		if(list[e].ID == ID) {
			return e
		}
	}
	return null
};

SAL.getListMaxID = function(list) {
	var num = 7220;
	for(var e = 0; e < list.length; e++) {
		try {
			if(list[e].ID > num) {
				num = list[e].ID
			}
		}catch(e) {}
	}
	return num
};

SAL.preActiveScript = function() {
	SAL.list = loadData(_MOD_DATA, "MANU_LIST") !== null ? JSON.parse(loadData(_MOD_DATA, "MANU_LIST")) : [];
	for(var e = 0; e < SAL.list.length; e++) {
		if(SAL.list[e].autoLoad == 1 && SAL.list[e].isExist == 1) {
			SAL.list[e].active = 1;
			SAL.activeScript(SAL.list[e].ID);
		}else {
			SAL.list[e].active = 0;
		}
	}
};

SAL.activeScript = function(id) {try {
	var num = SAL.findDataNumByID(SAL.list, id);
	toasts("Active: " + SAL.list[num].name)
	var file = new java.io.File(SAL.list[num].path);
	net.zhuoweizhang.mcpelauncher.ScriptManager.loadScript(new java.io.FileReader(file), SAL.list[num].name);
}catch(e) {
	showError(e);
}};

SAL.deactiveScript = function(id) {try {
	var num = SAL.findDataNumByID(SAL.list, id);
	toasts("Deactive: " + SAL.list[num].name);
	net.zhuoweizhang.mcpelauncher.ScriptManager.removeScript(SAL.list[num].name);
}catch(e) {
	showError(e);
}};

SAL.changeFileList = function(layout, path) {
	layout.removeAllViews();
	var backBtn = new android.widget.Button(ctx);
	backBtn.setText("..(" + path.getName() + ")");
	backBtn.setTransformationMethod(null);
	backBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	backBtn.setBackgroundDrawable(mcpeManuContent9());
	backBtn.setTextColor(android.graphics.Color.WHITE);
		backBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
	if(_FONT.exists()) {
		backBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
	};
	backBtn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
	var btn_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, DIP*36);
	backBtn.setLayoutParams(btn_param);
	backBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		if(SAL.lastPath.getParentFile() == null) {
			toast(TAG + "This is Root folder");
		}else {
			SAL.changeFileList(SAL.mainFileScrollLayout, SAL.lastPath.getParentFile());
		}
	}catch(e) {
		showError(e);
	}}
}));
	layout.addView(backBtn);
	
	var files = path.listFiles();
	for(var e = 0; e < files.length;e++) {
		if(files[e].isDirectory()) {
			var btn = new android.widget.Button(ctx);
			btn.setPadding(0,0,0,0);
			btn.setText(files[e].getName() + "");
			btn.setTransformationMethod(null);
			btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
			btn.setBackgroundDrawable(mcpeManuContent9());
			btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
			if(_FONT.exists()) {
				btn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
			};
			btn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
			var btn_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, DIP*36);
			btn.setLayoutParams(btn_param);
			btn.setTextColor(android.graphics.Color.WHITE);
			btn.setOnClickListener(android.view.View.OnClickListener({
				onClick: function(view, event) {try {
					SAL.changeFileList(SAL.mainFileScrollLayout, new java.io.File(SAL.lastPath.getPath(), view.getText()));
				}catch(e) {
					showError(e);
				}}
			}));
			layout.addView(btn);
		}
	}
	for(var e = 0; e < files.length;e++) {
		if(files[e].isFile()) {
			var btn = new android.widget.Button(ctx);
			btn.setPadding(0,0,0,0);
			btn.setText(files[e].getName() + "");
			btn.setTransformationMethod(null);
			btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
			btn.setBackgroundDrawable(mcpeManuContent9());
			btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
			if(_FONT.exists()) {
				btn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
			};
			btn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
			var btn_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, DIP*36);
			btn.setLayoutParams(btn_param);
			btn.setTextColor(android.graphics.Color.WHITE);
			btn.setOnClickListener(android.view.View.OnClickListener({
				onClick: function(view, event) {try {
					var file = new java.io.File(SAL.lastPath.getPath(), view.getText());
					for(var e = 0; e < SAL.list.length; e++) {
						if(SAL.list[e].name == view.getText()) {
							toast(TAG + "Already exist File name");
							return;
						}
					}
					var p = /.\.js/;
					if(!p.test(view.getText())) {
						toast(TAG + "This is not JavaScript file!\nit may cause CRASH");
					}
					SAL.list.push({name: file.getName() + "", active: 0, autoLoad: 0, isExist: (file.exists() && file.isFile() && file.canRead()) ? 1 : 0, ID: 0, path: SAL.lastPath.getPath() + "/" + view.getText() + ""});
					saveData(_MOD_DATA, "MANU_LIST", JSON.stringify(SAL.list));
					SAL.mainWindowShow(false);
					SAL.mainFileWindowShow(false);
					SAL.loadScriptListData();
					SAL.mainWindowLoad();
					SAL.mainWindowShow(true);
				}catch(e) {
					showError(e);
				}}
			}));
			layout.addView(btn);
		}
	}
	SAL.lastPath = path;
}

SAL.mainBtnMod = false;
SAL.mainBtnWindowAlive = false;
SAL.mainWindowAlive = false;
SAL.mainSelectWindowAlive = false;
SAL.mainFileWindowAlive = false;
SAL.mX = 0;
SAL.mY = 0;
SAL.lastIndex = null;


SAL.mainBtnWindowLoad = function() {

SAL.mainBtnLayout = new android.widget.RelativeLayout(ctx);
SAL.mainBtn = new android.widget.Button(ctx);
SAL.mainBtn.setPadding(0,0,0,0);
SAL.mainBtn.setText(ScriptName);
SAL.mainBtn.setTransformationMethod(null);
SAL.mainBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*11);
if(_FONT.exists()) {
	SAL.mainBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainBtn.setShadowLayer(1/Math.pow(10,10), DIP*10/7, DIP*10/7, android.graphics.Color.DKGRAY);
SAL.mainBtn.setId(7210);
SAL.mainBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*80, DIP*36);
SAL.mainBtn.setLayoutParams(SAL.mainBtn_param);
SAL.mainBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:
					SAL.wX = event.getX();
					SAL.wY = event.getY();
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.WHITE);
					view.setPadding(0, 0, 0, 0);
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
		if(!SAL.mainWindowAlive && !SAL.mainSelectWindowAlive && !SAL.mainFileWindowAlive) {
			SAL.mainWindowLoad();
			SAL.mainWindowShow(true);
		};
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainBtn.setOnLongClickListener(android.view.View.OnLongClickListener({
	onLongClick: function(view, event) {
		try {
			SAL.mainBtnMod = true;
			toasts("drag it!");
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
SAL.mainLayout.setBackgroundDrawable(mcpeBGT9());

SAL.mainTitleLayout = new android.widget.RelativeLayout(ctx);
//SAL.mainTitleLayout.setOrientation(0);
SAL.mainTitleLayout.setBackgroundDrawable(mcpeTitleBar9());
//SAL.mainTitleLayout.setGravity(android.view.Gravity.CENTER);

SAL.mainBackBtn = new android.widget.Button(ctx);
SAL.mainBackBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainBackBtn.setText("Back");
SAL.mainBackBtn.setTransformationMethod(null);
SAL.mainBackBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainBackBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainBackBtn.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainBackBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainBackBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainBackBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainBackBtn.setId(7211);
SAL.mainBackBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainBackBtn_param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT, -1);
SAL.mainBackBtn_param.addRule(android.widget.RelativeLayout.CENTER_VERTICAL, -1);
SAL.mainBackBtn_param.setMargins(DIP*10,0,0,0);
SAL.mainBackBtn.setLayoutParams(SAL.mainBackBtn_param);
SAL.mainBackBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.WHITE);
					view.setPadding(0, 0, 0, 0);
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
SAL.mainTitleText.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainTitleText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainTitleText.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainTitleText.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainTitleText.setTextColor(android.graphics.Color.WHITE);
SAL.mainTitleText.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainTitleText.setId(7212);
SAL.mainTitleText_param = new android.widget.RelativeLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
SAL.mainTitleText_param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT, -1);
SAL.mainTitleText_param.setMargins(0,0,0,0);
SAL.mainTitleText.setLayoutParams(SAL.mainTitleText_param);
SAL.mainTitleLayout.addView(SAL.mainTitleText);
SAL.mainLayout.addView(SAL.mainTitleLayout);

SAL.mainNewBtn = new android.widget.Button(ctx);
SAL.mainNewBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainNewBtn.setText("New");
SAL.mainNewBtn.setTransformationMethod(null);
SAL.mainNewBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainNewBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
if(_FONT.exists()) {
	SAL.mainNewBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainNewBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainNewBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainNewBtn.setId(7211);
SAL.mainNewBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainNewBtn_param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT, -1);
SAL.mainNewBtn_param.addRule(android.widget.RelativeLayout.CENTER_VERTICAL, -1);
SAL.mainNewBtn_param.setMargins(0,0,DIP*10,0);
SAL.mainNewBtn.setLayoutParams(SAL.mainNewBtn_param);
SAL.mainNewBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.WHITE);
					view.setPadding(0, 0, 0, 0);
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
		SAL.mainFileWindowShow(true);
		SAL.changeFileList(SAL.mainFileScrollLayout, _SD_CARD);
	}catch(e) {
		showError(e);
	}}
}));

SAL.mainNewBtn.setOnLongClickListener(android.view.View.OnLongClickListener({
	onLongClick: function(view, event) {try {
		SAL.addList();
		return false;
	}catch(e) {
		showError(e);
	}}
}));

SAL.mainTitleLayout.addView(SAL.mainNewBtn);

SAL.mainScroll_ex = new android.widget.RelativeLayout(ctx);
SAL.mainScroll_ex.setBackgroundDrawable(mcpeScroll9());
SAL.mainScroll_ex.setPadding(DIP*2, DIP*4, DIP*2, DIP*4);
SAL.mainScroll_ex_param = new android.widget.LinearLayout.LayoutParams(DIP*330, DIP*234);
SAL.mainScroll_ex_param.setMargins(DIP*10,DIP*6,DIP*10, DIP*10);
SAL.mainScroll_ex.setLayoutParams(SAL.mainScroll_ex_param);
SAL.mainScroll = new android.widget.ScrollView(ctx);
SAL.mainScroll_param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
SAL.mainScroll.setLayoutParams(SAL.mainScroll_param);
SAL.mainScrollLayout = new android.widget.LinearLayout(ctx);
SAL.mainScrollLayout.setPadding(0,0,0,0);
SAL.mainScrollLayout.setOrientation(1);
SAL.manuListAdd(SAL.mainScrollLayout, SAL.list);

SAL.mainScroll.addView(SAL.mainScrollLayout);

SAL.mainScroll_ex.addView(SAL.mainScroll);

SAL.mainLayout.addView(SAL.mainScroll_ex);

SAL.mainWindow = new android.widget.PopupWindow(SAL.mainLayout, DIP*350, DIP*300, false);
SAL.mainWindow.setSplitTouchEnabled(true);
SAL.mainWindow.setOutsideTouchable(false);
//SAL.mainWindow.setTouchable(false);

};



SAL.mainSelectWindowLoad = function() {

SAL.mainSwLayout = new android.widget.LinearLayout(ctx);
SAL.mainSwLayout.setOrientation(1);
SAL.mainSwLayout.setBackgroundDrawable(mcpeBGT9());

SAL.mainSwTitleLayout = new android.widget.RelativeLayout(ctx);
//SAL.mainSwTitleLayout.setOrientation(0);
SAL.mainSwTitleLayout.setBackgroundDrawable(mcpeTitleBar9());
//SAL.mainSwTitleLayout.setGravity(android.view.Gravity.CENTER);

SAL.mainSwBackBtn = new android.widget.Button(ctx);
SAL.mainSwBackBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainSwBackBtn.setText("Back");
SAL.mainSwBackBtn.setTransformationMethod(null);
SAL.mainSwBackBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainSwBackBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainSwBackBtn.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainSwBackBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainSwBackBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainSwBackBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainSwBackBtn.setId(7211);
SAL.mainSwBackBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainSwBackBtn_param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT, -1);
SAL.mainSwBackBtn_param.addRule(android.widget.RelativeLayout.CENTER_VERTICAL, -1);
SAL.mainSwBackBtn_param.setMargins(DIP*10,0,0,0);
SAL.mainSwBackBtn.setLayoutParams(SAL.mainSwBackBtn_param);
SAL.mainSwBackBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.WHITE);
					view.setPadding(0, 0, 0, 0);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.mainSwBackBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.mainSelectWindowShow(false);
		SAL.mainWindowShow(true);
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainSwTitleLayout.addView(SAL.mainSwBackBtn);

SAL.mainSwTitleText = new android.widget.TextView(ctx);
SAL.mainSwTitleText.setText("Script Info");
SAL.mainSwTitleText.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainSwTitleText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
SAL.mainSwTitleText.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	SAL.mainSwTitleText.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainSwTitleText.setTextColor(android.graphics.Color.WHITE);
SAL.mainSwTitleText.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainSwTitleText.setId(7215);
SAL.mainSwTitleText_param = new android.widget.RelativeLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
SAL.mainSwTitleText_param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT, -1);
SAL.mainSwTitleText_param.setMargins(0,0,0,0);
SAL.mainSwTitleText.setLayoutParams(SAL.mainSwTitleText_param);
SAL.mainSwTitleLayout.addView(SAL.mainSwTitleText);
SAL.mainSwLayout.addView(SAL.mainSwTitleLayout);

SAL.mainSwNewBtn = new android.widget.Button(ctx);
SAL.mainSwNewBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainSwNewBtn.setText("---");
SAL.mainSwNewBtn.setPadding(0,0,0,0);
SAL.mainSwNewBtn.setTransformationMethod(null);
SAL.mainSwNewBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainSwNewBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
if(_FONT.exists()) {
	SAL.mainSwNewBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainSwNewBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainSwNewBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainSwNewBtn.setId(7211);
SAL.mainSwNewBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*100, DIP*36);
SAL.mainSwNewBtn_param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT, -1);
SAL.mainSwNewBtn_param.addRule(android.widget.RelativeLayout.CENTER_VERTICAL, -1);
SAL.mainSwNewBtn_param.setMargins(0,0,DIP*10,0);
SAL.mainSwNewBtn.setLayoutParams(SAL.mainSwNewBtn_param);
SAL.mainSwNewBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:
					if(view.getText() != "Unknown") {
						view.setBackgroundDrawable(mcpeBtnClick9());
						view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
						view.setPadding(0, DIP*3, 0, 0);
					}
					break;
				case android.view.MotionEvent.ACTION_UP:
					if(view.getText() != "Unknown") {
						view.setBackgroundDrawable(mcpeBtn9());
						view.setTextColor(android.graphics.Color.WHITE);
						view.setPadding(0, 0, 0, 0);
					}
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.mainSwNewBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		if(SAL.list[SAL.lastIndex].isExist == 1) {
			if(SAL.list[SAL.lastIndex].active == 0) {
				SAL.list[SAL.lastIndex].active = 1;
				SAL.activeScript(SAL.list[SAL.lastIndex].ID);
			}else if(SAL.list[SAL.lastIndex].active == 1) {
				SAL.list[SAL.lastIndex].active = 0;
				SAL.deactiveScript(SAL.list[SAL.lastIndex].ID);
			}
		}
		SAL.mainSelectWindowReload();
		SAL.mainWindowLoad();
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainSwTitleLayout.addView(SAL.mainSwNewBtn);

SAL.mainSwScroll = new android.widget.ScrollView(ctx);
SAL.mainSwScroll_param = new android.widget.LinearLayout.LayoutParams(DIP*200, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
SAL.mainSwScroll.setLayoutParams(SAL.mainSwScroll_param);
SAL.mainSwScrollLayout = new android.widget.LinearLayout(ctx);
SAL.mainSwScrollLayout.setPadding(0, 0, 0, 0);
SAL.mainSwScrollLayout.setOrientation(0);
SAL.MMSLayout = new android.widget.LinearLayout(ctx);
SAL.MMSLayout.setOrientation(0);
SAL.MMSLayout2 = new android.widget.LinearLayout(ctx);
SAL.MMSLayout2.setOrientation(1);

SAL.MMSName = new android.widget.TextView(ctx);
SAL.MMSName = toMcpeTextM(SAL.MMSName);
SAL.MMSName.setTextColor(android.graphics.Color.WHITE);
SAL.MMS_param = new android.widget.LinearLayout.LayoutParams(DIP*200, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
SAL.MMS_param.setMargins(0, DIP*3, 0, DIP*6);
SAL.MMSName.setLayoutParams(SAL.MMS_param);
SAL.MMSLayout2.addView(SAL.MMSName);

SAL.MMSStateLayout = new android.widget.LinearLayout(ctx);
SAL.MMSStateLayout.setOrientation(0);

SAL.MMSState = new android.widget.TextView(ctx);
SAL.MMSState = toMcpeTextM(SAL.MMSState);
SAL.MMSState.setText("State: ");
SAL.MMSState.setTextColor(android.graphics.Color.WHITE);
SAL.MMSStateLayout.addView(SAL.MMSState);

SAL.MMSState2 = new android.widget.TextView(ctx);
SAL.MMSState2 = toMcpeTextM(SAL.MMSState2);
SAL.MMSStateLayout.addView(SAL.MMSState2);
SAL.MMSLayout2.addView(SAL.MMSStateLayout);

SAL.MMSPath = new android.widget.TextView(ctx);
SAL.MMSPath.setText("Path: -");
SAL.MMSPath.setTextColor(android.graphics.Color.WHITE);
SAL.MMSPath = toMcpeTextM(SAL.MMSPath);
SAL.MMSP_param = new android.widget.LinearLayout.LayoutParams(DIP*200, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
SAL.MMSP_param.setMargins(0, DIP*6, 0, DIP*3);
SAL.MMSPath.setLayoutParams(SAL.MMSP_param);
SAL.MMSLayout2.addView(SAL.MMSPath);

SAL.MMSLayout.addView(SAL.MMSLayout2);

SAL.mainSwScrollLayout.addView(SAL.MMSLayout);

SAL.MSBLayout = new android.widget.LinearLayout(ctx);
SAL.MSBLayout.setOrientation(1);

SAL.MSAB = new android.widget.Button(ctx);
SAL.MSAB.setPadding(0,0,0,0);
SAL.MSAB.setText("Auto Load");
SAL.MSAB.setTransformationMethod(null);
SAL.MSAB.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.MSAB.setTextColor(android.graphics.Color.WHITE);
SAL.MSAB = toMcpeTextM(SAL.MSAB);
SAL.MSAB.setBackgroundDrawable(mcpeBtn9());
SAL.MSAB_param = new android.widget.LinearLayout.LayoutParams(DIP*108, DIP*36);
SAL.MSAB_param.setMargins(DIP*10,DIP*6,DIP*10, DIP*10);
SAL.MSAB.setLayoutParams(SAL.MSAB_param);
SAL.MSAB.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					if(SAL.list[SAL.lastIndex].autoLoad == 1) {
						view.setBackgroundDrawable(mcpeBtn9());
						view.setPadding(0, 0, 0, 0);
					}
					view.setTextColor(android.graphics.Color.WHITE);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.MSAB.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		if(SAL.list[SAL.lastIndex].autoLoad == 0) {
			SAL.list[SAL.lastIndex].autoLoad = 1;
		}else {
			SAL.list[SAL.lastIndex].autoLoad = 0;
		}
		SAL.saveAll();
		SAL.mainSelectWindowReload();
	}catch(e) {
		showError(e);
	}}
}));
SAL.MSBLayout.addView(SAL.MSAB);

SAL.MSDB = new android.widget.Button(ctx);
SAL.MSDB.setText("Delete");
SAL.MSDB.setTransformationMethod(null);
SAL.MSDB.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.MSDB.setTextColor(android.graphics.Color.RED);
SAL.MSDB = toMcpeTextM(SAL.MSDB);
SAL.MSDB.setBackgroundDrawable(mcpeBtn9());
SAL.MSDB_param = new android.widget.LinearLayout.LayoutParams(DIP*108, DIP*36);
SAL.MSDB_param.setMargins(DIP*10,DIP*6,DIP*10, DIP*10);
SAL.MSDB.setLayoutParams(SAL.MSDB_param);
SAL.MSDB.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.RED);
					view.setPadding(0, 0, 0, 0);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.MSDB.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.list.splice(SAL.lastIndex, 1);
		SAL.saveAll();
		SAL.mainSelectWindowShow(false);
		SAL.mainWindowLoad();
		SAL.mainWindowShow(true);
	}catch(e) {
		showError(e);
	}}
}));
SAL.MSBLayout.addView(SAL.MSDB);

SAL.mainSwScroll.addView(SAL.mainSwScrollLayout);

SAL.mainSwContent = new android.widget.LinearLayout(ctx);
SAL.mainSwContent.setOrientation(0);
SAL.mainSwContent.setPadding(DIP*10,DIP*6,DIP*10, DIP*10);
SAL.mainSwContent.addView(SAL.mainSwScroll);
SAL.mainSwContent.addView(SAL.MSBLayout);

SAL.mainSwLayout.addView(SAL.mainSwContent);

SAL.mainSelectWindow = new android.widget.PopupWindow(SAL.mainSwLayout, DIP*350, DIP*170, false);
SAL.mainSelectWindow.setSplitTouchEnabled(true);
SAL.mainSelectWindow.setOutsideTouchable(false);

}



SAL.mainFileWindowLoad = function() {

SAL.mainFileLayout = new android.widget.LinearLayout(ctx);
SAL.mainFileLayout.setOrientation(1);
SAL.mainFileLayout.setBackgroundDrawable(mcpeBGT9());

SAL.mainFileTitleLayout = new android.widget.RelativeLayout(ctx);
//SAL.mainTitleLayout.setOrientation(0);
SAL.mainFileTitleLayout.setBackgroundDrawable(mcpeTitleBar9());
//SAL.mainTitleLayout.setGravity(android.view.Gravity.CENTER);

SAL.mainFileBackBtn = new android.widget.Button(ctx);
SAL.mainFileBackBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainFileBackBtn.setText("Back");
SAL.mainFileBackBtn.setTransformationMethod(null);
SAL.mainFileBackBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainFileBackBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
if(_FONT.exists()) {
	SAL.mainFileBackBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainFileBackBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainFileBackBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainFileBackBtn.setId(7211);
SAL.mainFileBackBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainFileBackBtn_param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT, -1);
SAL.mainFileBackBtn_param.addRule(android.widget.RelativeLayout.CENTER_VERTICAL, -1);
SAL.mainFileBackBtn_param.setMargins(DIP*10,0,0,0);
SAL.mainFileBackBtn.setLayoutParams(SAL.mainFileBackBtn_param);
SAL.mainFileBackBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.WHITE);
					view.setPadding(0, 0, 0, 0);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.mainFileBackBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.mainFileWindowShow(false);
	}catch(e) {
		showError(e);
	}}
}));
SAL.mainFileTitleLayout.addView(SAL.mainFileBackBtn);

SAL.mainFileTitleText = new android.widget.TextView(ctx);
SAL.mainFileTitleText.setText("Select Script...");
SAL.mainFileTitleText.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainFileTitleText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
if(_FONT.exists()) {
	SAL.mainFileTitleText.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainFileTitleText.setTextColor(android.graphics.Color.WHITE);
SAL.mainFileTitleText.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainFileTitleText.setId(7214);
SAL.mainFileTitleText_param = new android.widget.RelativeLayout.LayoutParams(android.view.ViewGroup.LayoutParams.WRAP_CONTENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
SAL.mainFileTitleText_param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT, -1);
SAL.mainFileTitleText_param.setMargins(0,0,0,0);
SAL.mainFileTitleText.setLayoutParams(SAL.mainFileTitleText_param);
SAL.mainFileTitleLayout.addView(SAL.mainFileTitleText);
SAL.mainFileLayout.addView(SAL.mainFileTitleLayout);

SAL.mainFileNewBtn = new android.widget.Button(ctx);
SAL.mainFileNewBtn.setBackgroundDrawable(mcpeBtn9());
SAL.mainFileNewBtn.setPadding(0,0,0,0);
SAL.mainFileNewBtn.setText("SD CARD");
SAL.mainFileNewBtn.setTransformationMethod(null);
SAL.mainFileNewBtn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
SAL.mainFileNewBtn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*16);
if(_FONT.exists()) {
	SAL.mainFileNewBtn.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
};
SAL.mainFileNewBtn.setTextColor(android.graphics.Color.WHITE);
SAL.mainFileNewBtn.setShadowLayer(1/Math.pow(10,10), DIP*12/7, DIP*12/7, android.graphics.Color.DKGRAY);
SAL.mainFileNewBtn.setId(7211);
SAL.mainFileNewBtn_param = new android.widget.RelativeLayout.LayoutParams(DIP*72, DIP*36);
SAL.mainFileNewBtn_param.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT, -1);
SAL.mainFileNewBtn_param.addRule(android.widget.RelativeLayout.CENTER_VERTICAL, -1);
SAL.mainFileNewBtn_param.setMargins(0,0,DIP*10,0);
SAL.mainFileNewBtn.setLayoutParams(SAL.mainFileNewBtn_param);
SAL.mainFileNewBtn.setOnTouchListener(android.view.View.OnTouchListener({
	onTouch: function(view, event) {
		try {
			switch(event.action){
				case android.view.MotionEvent.ACTION_DOWN:;
					view.setBackgroundDrawable(mcpeBtnClick9());
					view.setTextColor(android.graphics.Color.parseColor("#fbfa9a"));
					view.setPadding(0, DIP*3, 0, 0);
					break;
				case android.view.MotionEvent.ACTION_UP:
					view.setBackgroundDrawable(mcpeBtn9());
					view.setTextColor(android.graphics.Color.WHITE);
					view.setPadding(0, 0, 0, 0);
					break;
			}
		}catch(e) {
			showError(e);
		}
		return false;
	}
}));
SAL.mainFileNewBtn.setOnClickListener(android.view.View.OnClickListener({
	onClick: function(view, event) {try {
		SAL.changeFileList(SAL.mainFileScrollLayout, _SD_CARD);
	}catch(e) {
		showError(e);
	}}
}));
//SAL.mainFileTitleLayout.addView(SAL.mainFileNewBtn);

SAL.mainFileScroll_ex = new android.widget.RelativeLayout(ctx);
SAL.mainFileScroll_ex.setBackgroundDrawable(mcpeScroll9());
SAL.mainFileScroll_ex.setPadding(DIP*2, DIP*4, DIP*2, DIP*4);
SAL.mainFileScroll_ex_param = new android.widget.LinearLayout.LayoutParams(DIP*330, DIP*234);
SAL.mainFileScroll_ex_param.setMargins(DIP*10,DIP*6,DIP*10, DIP*10);
SAL.mainFileScroll_ex.setLayoutParams(SAL.mainFileScroll_ex_param);
SAL.mainFileScroll = new android.widget.ScrollView(ctx);
SAL.mainFileScroll_param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
SAL.mainFileScroll.setLayoutParams(SAL.mainFileScroll_param);
SAL.mainFileScrollLayout = new android.widget.LinearLayout(ctx);
SAL.mainFileScrollLayout.setPadding(0,0,0,0);
SAL.mainFileScrollLayout.setOrientation(1);
//SAL.manuListAdd(SAL.mainFileScrollLayout, SAL.list);

SAL.mainFileScroll.addView(SAL.mainFileScrollLayout);

SAL.mainFileScroll_ex.addView(SAL.mainFileScroll);

SAL.mainFileLayout.addView(SAL.mainFileScroll_ex);

SAL.mainFileWindow = new android.widget.PopupWindow(SAL.mainFileLayout, DIP*350, DIP*300, false);
SAL.mainFileWindow.setSplitTouchEnabled(true);
SAL.mainFileWindow.setOutsideTouchable(false);
//SAL.mainFileWindow.setTouchable(false);

};



SAL.mainSelectWindowReload = function() {

SAL.MMSName.setText("Name: " + SAL.list[SAL.lastIndex].name);
SAL.MMSPath.setText("Path: " + SAL.list[SAL.lastIndex].path);
var file = new java.io.File(SAL.list[SAL.lastIndex].path);
if(file.exists() && file.isFile()) {
	var e = SAL.list[SAL.lastIndex].active;
	if(e == 0) {
		SAL.mainSwNewBtn.setText("Active");
		SAL.mainSwNewBtn.setTextColor(android.graphics.Color.WHITE);
		SAL.MMSState2.setText("Disabled");
		SAL.MMSState2.setTextColor(android.graphics.Color.RED);
	}else if(e == 1) {
		SAL.mainSwNewBtn.setText("Deactive");
		SAL.mainSwNewBtn.setTextColor(android.graphics.Color.WHITE);
		SAL.MMSState2.setText("Enabled");
			SAL.MMSState2.setTextColor(android.graphics.Color.GREEN);
	}else {
		SAL.mainSwNewBtn.setText("Unknown");
		SAL.mainSwNewBtn.setTextColor(android.graphics.Color.parseColor("#bababa"));
		SAL.MMSState2.setText("Unknown");
		SAL.MMSState2.setTextColor(android.graphics.Color.BLUE);
	}
}else {
	if(!file.exists()) {
		SAL.mainSwNewBtn.setText("Unknown");
		SAL.mainSwNewBtn.setTextColor(android.graphics.Color.parseColor("#bababa"));
		SAL.MMSState2.setText("No File");
		SAL.MMSState2.setTextColor(android.graphics.Color.parseColor("#ff7000"));
	}else {
		SAL.mainSwNewBtn.setText("Unknown");
		SAL.mainSwNewBtn.setTextColor(android.graphics.Color.parseColor("#bababa"));
		SAL.MMSState2.setText("This is not File");
		SAL.MMSState2.setTextColor(android.graphics.Color.parseColor("#ff7000"));
	}
}
var e = SAL.list[SAL.lastIndex].autoLoad;
if(e == 0) {
	SAL.MSAB.setBackgroundDrawable(mcpeBtn9());
	SAL.MSAB.setPadding(0, 0, 0, 0);
}else if(e == 1) {
	SAL.MSAB.setBackgroundDrawable(mcpeBtnClick9());
	SAL.MSAB.setPadding(0, DIP*3, 0, 0);
}

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



SAL.mainSelectWindowShow = function(visible) {
	uiThread(function() {try {
		if(visible) {
			if(SAL.mainSelectWindowAlive) return;
			SAL.mainSelectWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
				SAL.mainSelectWindowReload();
			SAL.mainSelectWindowAlive = true;
		}else if(!visible) {
			if(!SAL.mainSelectWindowAlive) return;
			SAL.mainSelectWindow.dismiss();
			SAL.mainSelectWindowAlive = false;
			SAL.saveAll();
		}else {
			var e = {name:"Unknown visible"};
			showError(e);
		}
	}catch(e) {
		showError(e);
	}});
};



SAL.mainFileWindowShow = function(visible) {
	uiThread(function() {try {
		if(visible) {
			if(SAL.mainFileWindowAlive) return;
			SAL.mainFileWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
			SAL.mainFileWindowAlive = true;
		}else if(!visible) {
			if(!SAL.mainFileWindowAlive) return;
			SAL.mainFileWindow.dismiss();
			SAL.mainFileWindowAlive = false;
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
				SAL.list.push({name: file.getName() + "", active: 0, autoLoad: 0, isExist: (file.exists() && file.isFile() && file.canRead()) ? 1 : 0, ID: 0, path: SAL.addDialog_et.getText() + ""});
				saveData(_MOD_DATA, "MANU_LIST", JSON.stringify(SAL.list));
				SAL.mainWindowShow(false);
				SAL.loadScriptListData();
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
	loadingText.setText(TAG+"Checking Resources...");
});
if(!_FONT.exists()) {
	uiThread(function() {
		loadingText.setText(TAG+"Download Resources...");
	});
	if(!downloadFile(_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1")) {
		uiThread(function() {
			loadingText.setText(TAG+"fail...");
		});
		toast("[" + ScriptName + "]\n\ncan't download font resource\nmaybe internet disconnected");
		toasts("[" + ScriptName + "]\n\nUsing System font...");
	}
}



uiThread(function() { try{
	loadingText.setText(TAG+"Loading Layouts...");
	SAL.mainBtnWindowLoad();
	SAL.mainSelectWindowLoad();
	SAL.mainFileWindowLoad();
	loadingText.setText(TAG+"Loading Setting...");
	SAL.preActiveScript();
	SAL.loadScriptListData();
	SAL.mainBtnWindowShow(true);
	loadingWindow.dismiss();
}catch(e) {
	loadingText.setTextColor(android.graphics.Color.RED);
	loadingText.setText(TAG+"Critical Error!");
	showError(e);
}});