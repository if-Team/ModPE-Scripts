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
var FILE_SD_CARD = android.os.Environment.getExternalStorageDirectory();
var FILE_MOD_DIR = new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftpe/mods");
var FILE_MAIN_DIR = new java.io.File(FILE_MOD_DIR, className);
var FILE_FONT = new java.io.File(FILE_MOD_DIR, "minecraft.ttf");
var FILE_MAIN_DATA = new java.io.File(FILE_MAIN_DIR, "setting.json");
var FILE_TEST_DATA = new java.io.File(FILE_MAIN_DIR, "lastLog.txt");
var FILE_NO_MEDIA = new java.io.File(FILE_MAIN_DIR, ".nomedia");
function FILE_MAP_DIR() {return new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function FILE_MAP_DATA() {return new java.io.File(FILE_MAP_DIR(), className + ".json")}
if(!(FILE_MAIN_DIR.exists())) {
	FILE_MAIN_DIR.mkdirs();
	FILE_NO_MEDIA.createNewFile();
}
if(!(FILE_MAIN_DATA.exists())) {
	FILE_MAIN_DATA.createNewFile();
}
var DIP = PIXEL * loadData(FILE_MAIN_DATA, "DIPS");
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
var ArrayList = java.util.ArrayList;

var Assets = {}
Assets.R1_raw = Bitmap.createBitmap(6, 6, Bitmap.Config.ARGB_8888);
var w = Color.argb(200, 255, 255, 255);
var b = Color.argb(100, 0, 0, 255);
Assets.R1_pixel = [
b,b,b,b,b,w,
b,b,b,b,b,w,
b,b,b,b,b,w,
b,b,b,b,b,w,
b,b,b,b,b,w,
w,w,w,w,w,w
];
Assets.R1_raw.setPixels(Assets.R1_pixel, 0, 6, 0, 0, 6, 6);
Assets.R1 = Bitmap.createScaledBitmap(Assets.R1_raw, PIXEL*12, PIXEL*12, false);
Assets.button_raw = Bitmap.createBitmap(3, 3, Bitmap.Config.ARGB_8888);
var w = Color.parseColor("#ffffff");
var b = Color.parseColor("#0000ff");
Assets.button_pixel = [
w,w,w,
w,b,w,
w,w,w
];
Assets.button_raw.setPixels(Assets.button_pixel, 0, 3, 0, 0, 3, 3);
Assets.button = Bitmap.createScaledBitmap(Assets.button_raw, PIXEL*6, PIXEL*6, false);
Assets.button_9 = function() {
	return ninePatch1(Assets.button, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4);
}
Assets.buttonR_raw = Bitmap.createBitmap(3, 3, Bitmap.Config.ARGB_8888);
var w = Color.parseColor("#ffffff");
var b = Color.parseColor("#ff0000");
Assets.buttonR_pixel = [
w,w,w,
w,b,w,
w,w,w
];
Assets.buttonR_raw.setPixels(Assets.buttonR_pixel, 0, 3, 0, 0, 3, 3);
Assets.buttonR = Bitmap.createScaledBitmap(Assets.buttonR_raw, PIXEL*6, PIXEL*6, false);
Assets.buttonR_9 = function() {
	return ninePatch1(Assets.buttonR, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4);
}
Assets.bg = Bitmap.createScaledBitmap(BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/bg32.png")), PIXEL*64, PIXEL*64, false);

Assets.font_url = "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1";
Assets.sound_launch = new java.io.File(FILE_MAIN_DIR, "assets01.res");
Assets.sound_launch_url = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/ICBM/assets01.res";
Assets.sound_onAir = new java.io.File(FILE_MAIN_DIR, "assets03.res");
Assets.sound_onAir_url = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/ICBM/assets03.res";
Assets.sound_explode = new java.io.File(FILE_MAIN_DIR, "assets04.res");
Assets.sound_explode_url = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/ICBM/assets04.res";
Assets.sound_explode2 = new java.io.File(FILE_MAIN_DIR, "assets05.res");
Assets.sound_explode2_url = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/ICBM/assets05.res";
Assets.image_rocket = new java.io.File(FILE_MAIN_DIR, "assets06.res");
Assets.image_rocket_url = "https://raw.githubusercontent.com/CI-CodeInside/ModPE-Script/master/content/ICBM/assets06.res";

var nk = {};
nk.activeIsShow = false;
nk.activeWindow = null;
var pointEntData = [];
//pointEntData.push({ent: <object>, f: <function>, bn: <string>, b: <function>});
var rockets = [];
//로켓 정보가 맘에 안드시면 바꾸세요
//rockets.push({type: "NUCLEAR", ent: <object>, path: <pathArray>, currentPathIndex: <int>});

function preload() {
	new Thread(new Runnable({run: function() {try {
		if(Assets.sound_launch.exists() && Assets.sound_onAir.exists() && Assets.sound_explode.exists() && Assets.sound_explode2.exists() && Assets.image_rocket.exists()) {
			setTexture(Assets.image_rocket, "mob/nuclear.png");
		}else {
			loadScreen(true);
			uiThread(function() {try {
				nk.lProgress2.setMax(6);
				nk.lProgress2.setProgress(0);
			}catch(e) {
				showError(e);
			}});
			if(!downloadFile(FILE_FONT, Assets.font_url, nk.lProgress)) {
				toast(TAG + "can't download resources\nPlease check your Internet connection");
				return;
			}
			uiThread(function() {try {
				nk.lProgress2.setProgress(1);
				if(FILE_FONT.exists()) {
					nk.lText.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
				}
			}catch(e) {
				showError(e);
			}});
			if(!downloadFile(Assets.sound_launch, Assets.sound_launch_url, nk.lProgress)) {
				toast(TAG + "can't download resources\nPlease check your Internet connection");
				return;
			}
			uiThread(function() {try {
				nk.lProgress2.setProgress(2);
			}catch(e) {
				showError(e);
			}});
			if(!downloadFile(Assets.sound_onAir, Assets.sound_onAir_url, nk.lProgress)) {
				toast(TAG + "can't download resources\nPlease check your Internet connection");
				return;
			}
			uiThread(function() {try {
				nk.lProgress2.setProgress(3);
			}catch(e) {
				showError(e);
			}});
			if(!downloadFile(Assets.sound_explode, Assets.sound_explode_url, nk.lProgress)) {
				toast(TAG + "can't download resources\nPlease check your Internet connection");
				return;
			}
			uiThread(function() {try {
				nk.lProgress2.setProgress(4);
			}catch(e) {
				showError(e);
			}});
			if(!downloadFile(Assets.sound_explode2, Assets.sound_explode2_url, nk.lProgress)) {
				toast(TAG + "can't download resources\nPlease check your Internet connection");
				return;
			}
			uiThread(function() {try {
				nk.lProgress2.setProgress(5);
			}catch(e) {
				showError(e);
			}});
			if(!downloadFile(Assets.image_rocket, Assets.image_rocket_url, nk.lProgress)) {
				toast(TAG + "can't download resources\nPlease check your Internet connection");
				return;
			}
			uiThread(function() {try {
				nk.lProgress2.setProgress(6);
				nk.lText.setText(" " + TAG + "\n Download Complete");
			}catch(e) {
				showError(e);
			}});
			setTexture(Assets.image_rocket, "mob/nuclear.png");
			Thread.sleep(3000);
			loadScreen(false);
		}
	}catch(e) {
		showError(e);
	}}})).start();
}

function loadScreen(visible) {
	if(visible) {
		nk.lLayout = LinearLayout(ctx);
		nk.lLayout.setOrientation(1);
		nk.lLayout.setGravity(Gravity.CENTER);
		
		nk.ldraw = new BitmapDrawable(Assets.bg);
		nk.ldraw.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
		nk.lLayout.setBackgroundDrawable(nk.ldraw);
		nk.lText = new TextView(ctx);
		nk.lText.setGravity(Gravity.CENTER);
		nk.lText.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*16);
		if(FILE_FONT.exists()) {
			nk.lText.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
		}
		nk.lText.setTextColor(Color.WHITE);
		nk.lText.setShadowLayer(0.5, PIXEL, PIXEL, Color.DKGRAY);
		nk.lText.setText(" " + TAG + "\nDownloading resources files...");
		nk.lLayout.addView(nk.lText);
		
		nk.lProgress_for = new ClipDrawable(new ColorDrawable(Color.parseColor("#80ff80")), Gravity.LEFT, ClipDrawable.HORIZONTAL);
		nk.lProgress_back = new ColorDrawable(Color.parseColor("#808080"));
		
		nk.lProgress_for2 = new ClipDrawable(new ColorDrawable(Color.parseColor("#80ff80")), Gravity.LEFT, ClipDrawable.HORIZONTAL);
		nk.lProgress_back2 = new ColorDrawable(Color.parseColor("#808080"));
		
		nk.lProgress = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
		nk.lProgress.setProgress(0);
		nk.lProgress_draw = nk.lProgress.getProgressDrawable();
		nk.lProgress_draw.setDrawableByLayerId(android.R.id.progress, nk.lProgress_for);
		nk.lProgress_draw.setDrawableByLayerId(android.R.id.background, nk.lProgress_back);
		nk.lProgress_param = new LinearLayout.LayoutParams(PIXEL*200, PIXEL*5);
		nk.lProgress_param.setMargins(0, PIXEL*20, 0, 0);
		nk.lProgress.setLayoutParams(nk.lProgress_param);
		nk.lLayout.addView(nk.lProgress);
		
		nk.lProgress2 = new ProgressBar(ctx, null, android.R.attr.progressBarStyleHorizontal);
		nk.lProgress2.setProgress(0);
		nk.lProgress2_draw = nk.lProgress2.getProgressDrawable();
		nk.lProgress2_draw.setDrawableByLayerId(android.R.id.progress, nk.lProgress_for2);
		nk.lProgress2_draw.setDrawableByLayerId(android.R.id.background, nk.lProgress_back2);
		nk.lProgress2_param = new LinearLayout.LayoutParams(PIXEL*200, PIXEL*5);
		nk.lProgress2_param.setMargins(0, PIXEL*10, 0, 0);
		nk.lProgress2.setLayoutParams(nk.lProgress2_param);
		nk.lLayout.addView(nk.lProgress2);
		
		nk.lWindow = new PopupWindow(nk.lLayout, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT, false);
		uiThread(function() {try {
			nk.lWindow.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT|Gravity.TOP, 0, 0);
		}catch(e) {
			showError(e);
		}});
	}else {
		uiThread(function() {try {
			nk.lWindow.dismiss();
		}catch(e) {
			showError(e);
		}});
	}
}

preload();



function newLevel(str) {
}

function procCmd(str) {
	var cmd = str.split(" ");
	switch(cmd[0]) {
		case "t":
			var ent = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 11, "mob/nuclear.png");
			Entity.setRenderType(ent, render.nuclear_R.renderType);
			pointEntData.push({ent: ent, f: function(e) {}, bn: "Setting", b: function() {showGui()}});
			break;
		case "t2":
			var ent = Level.spawnMob(Player.getX(), Player.getY(), Player.getZ(), 11, "mob/nuclear.png");
			Entity.setRenderType(ent, render.nuclear_R.renderType);
			forceRot(ent);
			rockets.push({type: "NUCLEAR", ent: ent, power: cmd[1]});
			bgs(null, null, null, ent, Assets.sound_launch, 30, 0.1, 1, false, function(e) {return bgsData[e].ent === null});
			bgs(null, null, null, ent, Assets.sound_onAir, 50, 0.5, 0.5, true, function(e) {if(bgsData[e].ent === null) {if(Math.sqrt(Math.pow(bgsData[e].x - Player.getX(), 2) + Math.pow(bgsData[e].y - Player.getY(), 2) + Math.pow(bgsData[e].z - Player.getZ(), 2)) < 50) {bgs(bgsData[e].x, bgsData[e].y, bgsData[e].z, null, Assets.sound_explode, 50, 0.05, 1, false, null)}else {bgs(bgsData[e].x, bgsData[e].y, bgsData[e].z, null, Assets.sound_explode2, 50, 0.02, 1, false, null)}return true}return false});
			break;
	}
}

function modTick() {
	rocketManager();
	bgsManager();
	userPointedEntData();
}

function rocketManager() {
	for(var e = 0; e < rockets.length; e++) {
		switch(rockets[e].type) {
			case "NUCLEAR":
				var x = Entity.getX(rockets[e].ent);
				var y = Entity.getY(rockets[e].ent);
				var z = Entity.getZ(rockets[e].ent);
				if(Entity.getHealth(rockets[e].ent) <= -1) {
					rockets.splice(e, 1);
					continue;
				}
				//블럭에 닿으면 폭★발
				if(Level.getTile(x+1, y, z) !== 0 || Level.getTile(x-1, y, z) !== 0 || Level.getTile(x, y+1, z) !== 0 || Level.getTile(x, y-1, z) !== 0 || Level.getTile(x, y, z+1) !== 0 || Level.getTile(x, y, z-1) !== 0) {
					Level.explode(x, y, z, rockets[e].power);
					Entity.remove(rockets[e].ent);
					rockets.splice(e, 1);
					continue;
				}
				break;
		}
	}
}

function forceRot(ent) {
	thread(function() {
		while(Entity.getHealth(ent) > 0) {
			var x = Entity.getVelX(ent);
			var y = Entity.getVelY(ent);
			var z = Entity.getVelZ(ent);
			if(x === 0 && y === 0 && z === 0) {
				Entity.setRot(ent, 0, -90);
			}else {
				Entity.setRot(ent, locToYaw(x, y, z), locToPitch(x, y, z));
			}
			Thread.sleep(1);
		}
	}).start()
}



function userPointedEntData() {try {
	var ent = Player.getPointedEntity();
	if(nk.lastPointEnt == null || !EntityFix.isEqual(nk.lastPointEnt, ent)) {
		nk.lastPointEnt = ent;
		activeButtonDismiss();
		for(var e = 0; e < pointEntData.length; e++) {
			if(Entity.getHealth(pointEntData[e].ent) <= 0) {
				pointEntData.splice(e, 1);
				continue;
			}
			if(EntityFix.isEqual(pointEntData[e].ent, ent)) {
				pointEntData[e].f(e);
				activeButton(pointEntData[e].bn, pointEntData[e].b);
			}
		}
	}
}catch(e) {
	showError(e);
}}



function activeButtonLoad() {try {
	if(nk.activeWindow == null) {
		nk.activeButton = new android.widget.Button(ctx);
		nk.activeButton.setText("Active");
		nk.activeButton.setTextColor(android.graphics.Color.WHITE);
		nk.activeButton.setTextSize(DIP*16);
		
		nk.activeWindow = new android.widget.PopupWindow(nk.activeButton, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, false);
	}
}catch(e) {
	showError(e);
}}
activeButtonLoad();

function activeButton(text, func) {
	activeButtonDismiss();
	uiThread(function() {try {
		nk.activeButton.setText(text);
		nk.activeButton.setOnClickListener(android.view.View.OnClickListener({
			onClick: func
		}));
		nk.activeWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER|android.view.Gravity.BOTTOM, 0, PIXEL*100);
		nk.activeIsShow = true;
	}catch(e) {
		showError(e);
	}});
}

function activeButtonDismiss() {
	if(nk.activeIsShow) {
		uiThread(function() {try {
			nk.activeWindow.dismiss();
		}catch(e) {
			showError(e);
		}})
		nk.activeIsShow = false;
	}
}


function showGui() {
	nk.mGui = RelativeLayout(ctx);
	nk.mGui.setId(Math.floor(Math.random()*0xffff));
	nk.mGui.setPadding(0, 0, 0, 0);
	//nk.mGui.setGravity(Gravity.CENTER);
	
	nk.grid = new BitmapDrawable(Assets.R1);
	nk.grid.setTileModeXY(Shader.TileMode.REPEAT, Shader.TileMode.REPEAT);
	
	nk.side = new GradientDrawable();
	nk.side.mutate().setColor(Color.argb(0, 0, 0, 0));
	nk.side.mutate().setStroke(PIXEL*5, Color.WHITE);
	//nk.side.mutate().setCornerRadius(PIXEL*30);
	
	nk.layer = new LayerDrawable([nk.grid, nk.side]);
	
	nk.mGui.setBackgroundDrawable(nk.layer);
	
	nk.mBtn1 = new Button(ctx);
	nk.mBtn1.setId(Math.floor(Math.random()*0xffff));
	nk.mBtn1.setGravity(Gravity.CENTER);
	nk.mBtn1.setBackgroundDrawable(Assets.button_9());
	nk.mBtn1.setPadding(0, 0, 0, 0);
	nk.mBtn1.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*32);
	if(FILE_FONT.exists()) {
		nk.mBtn1.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	nk.mBtn1.setTextColor(Color.WHITE);
	nk.mBtn1.setText("▽");
	nk.mBtn1_param = new RelativeLayout.LayoutParams(PIXEL*32, PIXEL*32);
	nk.mBtn1_param.setMargins(PIXEL*32, 0, 0, PIXEL*32);
	nk.mBtn1_param.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, nk.mGui.getId());
	nk.mBtn1_param.addRule(RelativeLayout.ALIGN_PARENT_LEFT, nk.mGui.getId());
	nk.mBtn1.setLayoutParams(nk.mBtn1_param);
	nk.mGui.addView(nk.mBtn1);
	
	nk.mBtn2 = new Button(ctx);
	nk.mBtn2.setId(Math.floor(Math.random()*0xffff));
	nk.mBtn2.setGravity(Gravity.CENTER);
	nk.mBtn2.setBackgroundDrawable(Assets.button_9());
	nk.mBtn2.setPadding(0, 0, 0, 0);
	nk.mBtn2.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*32);
	if(FILE_FONT.exists()) {
		nk.mBtn2.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	nk.mBtn2.setTextColor(Color.WHITE);
	nk.mBtn2.setText("△");
	nk.mBtn2_param = new RelativeLayout.LayoutParams(PIXEL*32, PIXEL*32);
	nk.mBtn2_param.setMargins(PIXEL*32, 0, 0, PIXEL*16);
	nk.mBtn2_param.addRule(RelativeLayout.ABOVE, nk.mBtn1.getId());
	nk.mBtn2_param.addRule(RelativeLayout.ALIGN_PARENT_LEFT, nk.mGui.getId());
	nk.mBtn2.setLayoutParams(nk.mBtn2_param);
	nk.mGui.addView(nk.mBtn2);
	
	nk.mBtn3 = new Button(ctx);
	nk.mBtn3.setId(Math.floor(Math.random()*0xffff));
	nk.mBtn3.setGravity(Gravity.CENTER);
	nk.mBtn3.setBackgroundDrawable(Assets.button_9());
	nk.mBtn3.setPadding(0, 0, 0, 0);
	nk.mBtn3.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*32);
	if(FILE_FONT.exists()) {
		nk.mBtn3.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	nk.mBtn3.setTextColor(Color.WHITE);
	nk.mBtn3.setText("▷");
	nk.mBtn3_param = new RelativeLayout.LayoutParams(PIXEL*32, PIXEL*32);
	nk.mBtn3_param.setMargins(PIXEL*16, 0, 0, PIXEL*32);
	nk.mBtn3_param.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, nk.mGui.getId());
	nk.mBtn3_param.addRule(RelativeLayout.RIGHT_OF, nk.mBtn1.getId());
	nk.mBtn3.setLayoutParams(nk.mBtn3_param);
	nk.mGui.addView(nk.mBtn3);
	
	nk.mBtn4 = new Button(ctx);
	nk.mBtn4.setId(Math.floor(Math.random()*0xffff));
	nk.mBtn4.setGravity(Gravity.CENTER);
	nk.mBtn4.setBackgroundDrawable(Assets.button_9());
	nk.mBtn4.setPadding(0, 0, 0, 0);
	nk.mBtn4.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*32);
	if(FILE_FONT.exists()) {
		nk.mBtn4.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	nk.mBtn4.setTextColor(Color.WHITE);
	nk.mBtn4.setText("◁");
	nk.mBtn4_param = new RelativeLayout.LayoutParams(PIXEL*32, PIXEL*32);
	nk.mBtn4_param.setMargins(PIXEL*16, 0, 0, PIXEL*16);
	nk.mBtn4_param.addRule(RelativeLayout.ABOVE, nk.mBtn3.getId());
	nk.mBtn4_param.addRule(RelativeLayout.RIGHT_OF, nk.mBtn2.getId());
	nk.mBtn4.setLayoutParams(nk.mBtn4_param);
	nk.mGui.addView(nk.mBtn4);
	
	nk.mBtn5 = new Button(ctx);
	nk.mBtn5.setId(Math.floor(Math.random()*0xffff));
	nk.mBtn5.setGravity(Gravity.CENTER);
	nk.mBtn5.setBackgroundDrawable(Assets.buttonR_9());
	nk.mBtn5.setPadding(0, 0, 0, 0);
	nk.mBtn5.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, PIXEL*32);
	if(FILE_FONT.exists()) {
		nk.mBtn5.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	nk.mBtn5.setTextColor(Color.WHITE);
	nk.mBtn5.setText("");
	nk.mBtn5_param = new RelativeLayout.LayoutParams(PIXEL*60, PIXEL*80);
	nk.mBtn5_param.setMargins(0, 0, PIXEL*32, PIXEL*32);
	nk.mBtn5_param.addRule(RelativeLayout.ALIGN_PARENT_RIGHT, nk.mGui.getId());
	nk.mBtn5_param.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM, nk.mGui.getId());
	nk.mBtn5.setLayoutParams(nk.mBtn5_param);
	nk.mGui.addView(nk.mBtn5);
	
	nk.mWindow = new PopupWindow(nk.mGui, PIXEL*220, PIXEL*250, false);
	
	uiThread(function() { try{
		nk.mWindow.showAtLocation(ctx.getWindow().getDecorView(), Gravity.RIGHT|Gravity.BOTTOM, 0, 0);
	}catch(e) {
		showError(e);
	}});
	/*
	nk.frame = new FrameLayout(ctx);
	nk.frame.setPadding(0, 0, 0, 0);
	
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
	nk.gio.setPadding(0, 0, 0, 0);
	
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
	
	nk.side = new GradientDrawable();
	nk.side.mutate().setColor(Color.argb(0, 0, 0, 0));
	nk.side.mutate().mutate().setStroke(PIXEL*5, Color.RED);
	nk.frame.setForeground(nk.side);
	
	nk.window = new PopupWindow(nk.frame, PIXEL*200, PIXEL*150, false);
	
	uiThread(function() {
		nk.window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT|Gravity.TOP, 0, 0);
	});*/
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



/**
 * Stereo BGS
 *
 * @since 2015-06
 * @author CodeInside
 *
 * @param (Int|Null) x
 * @param (Int|Null) y
 * @param (Int|Null) z
 * @param (Object|Null) ent
 * @param (File) file <music>
 * @param (Int) range <0~>
 * @param (Float) airResistanse <0~1>
 * @param (Float) vol <0~1>
 * @param (Boolean) loop
 * @param (Function|Null) stopFunc
 */
//IT IS VERY UNSTABLR, IT NEED A TEST

var bgsData = [];

function bgs(x, y, z, ent, file, range, airResistance, vol, loop, stopFunc) {try {
	var controler = android.media.MediaPlayer();
	controler.setDataSource(file.getAbsolutePath());
	controler.setLooping(loop);
	if(ent !== null) {
		x = Entity.getX(ent);
		y = Entity.getY(ent);
		z = Entity.getZ(ent);
	}
	var v = bgsMeasure(x, y, z, range, airResistance);
	controler.setVolume(v[0]*vol, v[1]*vol);
	controler.prepare();
	controler.start();
	bgsData.push({x: x, y: y, z: z, ent: ent, ct: controler, file: file, session: controler.getAudioSessionId(), vol: vol, range: range, airResistance: airResistance, loop: loop, stopFunc: stopFunc});
}catch(e) {
	showError(e);
}}

function bgsManager() {try {
	for(var e = 0; e < bgsData.length; e++) {
		if(!bgsData[e].ct.isPlaying()) {
			bgsData[e].ct.release();
			bgsData.splice(e, 1);
			continue;
		}
		if(bgsData[e].stopFunc !== null && bgsData[e].stopFunc(e)) {
			bgsData[e].ct.stop();
			bgsData[e].ct.release();
			bgsData.splice(e, 1);
			continue;
		}
		if(bgsData[e].ent !== null && Entity.getHealth(bgsData[e].ent) <= 0) {
			 bgsData[e].ent = null;
		}
		if(bgsData[e].ent !== null) {
			bgsData[e].x = Entity.getX(bgsData[e].ent);
			bgsData[e].y = Entity.getY(bgsData[e].ent);
			bgsData[e].z = Entity.getZ(bgsData[e].ent);
		}
		var v = bgsMeasure(bgsData[e].x, bgsData[e].y, bgsData[e].z, bgsData[e].range, bgsData[e].airResistance);
		bgsData[e].ct.setVolume(v[0]*bgsData[e].vol, v[1]*bgsData[e].vol);
	}
}catch(e) {
	showError(e);
}}

function stereoL(x, y, z, power) {
	var e = locToYaw(Player.getX() - x, Player.getY() - y, Player.getZ() - z);
	var t = e - Entity.getYaw(Player.getEntity()) + 180 - 10;
	if(t > 0) {
		t %= 360;
	}else {
		while(t < 0) {
			t += 360;
		}
	}
	if(t >= 0 && t <= 180) {
		return 1 - (Math.sin(t*Math.PI/180)/power);
	}else {
		return 1;
	}
}

function stereoR(x, y, z, power) {
	var e = locToYaw(Player.getX() - x, Player.getY() - y, Player.getZ() - z);
	var t = e - Entity.getYaw(Player.getEntity()) + 180 - 170;
	if(t > 0) {
		t %= 360;
	}else {
		while(t < 0) {
			t += 360;
		}
	}
	if(t >= 0 && t <= 180) {
		return 1 - (Math.sin(t*Math.PI/180)/power);
	}else {
		return 1;
	}
}

function bgsMeasure(x, y, z, range, airResistance) {
	var distance = Math.sqrt(Math.pow(Player.getY() - y, 2) + Math.pow(Player.getX() - x, 2) + Math.pow(Player.getZ() - z, 2));
	if(distance < range) {
		return [stereoL(x, y, z, 3 * (range/distance)), stereoR(x, y, z, 3 * (range/distance))];
	}else {
		if(Math.sqrt(distance - range) * airResistance > 1) {
			return [0, 0];
		}
		var l = stereoL(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
		var r = stereoR(x, y, z, 3) - (Math.sqrt(distance - range) * airResistance);
		if(l < 0) {
			l = 0;
		}
		if(r < 0) {
			r = 0;
		}
		return [l, r];
	}
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



function downloadFile(path, url, progressBar) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();
		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		if(progressBar !== null) {
			var max = tempApiUrlConn.getContentLength();
			uiThread(function() {try {
				progressBar.setMax(max);
			}catch(e) {
				showError(e);
			}});
		}
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempFos.write(tempData, 0, tempCount);
			tempTotal += tempCount;
			if(progressBar !== null) {
				uiThread(function() {try {
					progressBar.setProgress(tempTotal);
				}catch(e) {
					showError(e);
				}});
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

/**
 * Location(x, y, z) to Vector(yaw, pitch)
 *
 * @since 2015-01-??
 * @author ToonRaOn
 */

function locToYaw(x, y, z) {
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
};

function locToPitch(x, y, z) {
	return -1 * Math.atan(y / Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2))) * 180 / Math.PI;
};



/**
 * Entity range
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function rangeEnt(a, b) {
	return Math.sqrt(Math.pow(Entity.getX(a) - Entity.getX(b), 2) + Math.pow(Entity.getY(a) - Entity.getY(b), 2) + Math.pow(Entity.getZ(a) - Entity.getZ(b), 2));
};



/**
 * Vector(yaw, pitch) to Location(x, y, z)
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function vectorToX(y, p) {
	return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

function vectorToY(y, p) {
	return (Math.sin(-p / 180 * Math.PI));
};

function vectorToZ(y, p) {
	return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};



/**
 * Absolute range x, y, z
 *
 * @since 2015-01-??
 * @author CodeInside
 */

function absX(x, y, z) {
	return x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absY(x, y, z) {
	return y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absZ(x, y, z) {
	return z / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

EntityFix = {};

EntityFix.isEqual = function(obj1, obj2) {
	return Entity.getUniqueId(obj1) === Entity.getUniqueId(obj2);
}

EntityFix.findEnt = function(uniqId) {
	var list = Entity.getAll();
	var max = list.length;
	for(var e = 0; e < max; e++) {
		if(uniqId === Entity.getUniqueId(list[e])) {
			return list[e];
		}
	}
}