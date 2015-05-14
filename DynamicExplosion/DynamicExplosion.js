var ScriptName = "DynamicExplosion";
var Version = "v1";
var Author = "CodeInside";
var VersionCode = 101;

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
 
var TAG = "[" + ScriptName + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _MAIN_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory(), "games/com.mojang/minecraftpe/mods/" + ScriptName);

var downloadedFile = 0
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
loadingText.setText(TAG + "Reading script...");
loadingText.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
loadingText.setTextColor(android.graphics.Color.WHITE);
loadingText.setGravity(android.view.Gravity.CENTER);
loadingLayout.addView(loadingText);
var loadingWindow = new android.widget.PopupWindow(loadingLayout, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, false);
uiThread(function() {
loadingWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
});

if(!(new java.io.File(_MAIN_DIR, "explosionPE16.png")).exists()) {new java.lang.Thread(new java.lang.Runnable({run: function() {try {
	java.lang.Thread.sleep(1000);
	uiThread(function() {
		loadingText.setText(TAG + "download resources...");
	});
	_MAIN_DIR.delete();
	_MAIN_DIR.mkdirs();
	new java.io.File(_MAIN_DIR, 
".nomedia").createNewFile();
	if(downloadFile(new java.io.File(_MAIN_DIR, "explosionPE01.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE01.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE02.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE02.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE03.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE03.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE04.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE04.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE05.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE05.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE06.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE06.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE07.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE07.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE08.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE08.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE09.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE09.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE10.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE10.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE11.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE11.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE12.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE12.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE13.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE13.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE14.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE14.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE15.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE15.png") && downloadFile(new java.io.File(_MAIN_DIR, "explosionPE16.png"), "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/DynamicExplosion/resources/explosionPE16.png")) {
		setTextures();
		uiThread(function() {
			loadingWindow.dismiss()
		});
	}else {
		uiThread(function() {
			loadingText.setTextColor(android.graphics.Color.RED);
			loadingText.setText(TAG + "resources download fail\nPlease connect internet and reboot");
		});
		java.lang.Thread.sleep(5000);
		_MAIN_DIR.delete();
		uiThread(function() {
			loadingWindow.dismiss()
		});
	}
}catch(e) {
	showError(e);
	uiThread(function() {
		loadingText.setTextColor(android.graphics.Color.RED);
		loadingText.setText(TAG + "Error: " + e.lineNumber + "\n" + e.message);
		_MAIN_DIR.delete();
		java.lang.Thread.sleep(5000);
		loadingWindow.dismiss()
	});
}}})).start()}else {
	setTextures()
	uiThread(function() {
		loadingWindow.dismiss()
	});
};

function setTextures() {new java.lang.Thread(new java.lang.Runnable( {run: function() {try {
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE01.png"), "explosionPE/1.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE02.png"), "explosionPE/2.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE03.png"), "explosionPE/3.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE04.png"), "explosionPE/4.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE05.png"), "explosionPE/5.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE06.png"), "explosionPE/6.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE07.png"), "explosionPE/7.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE08.png"), "explosionPE/8.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE09.png"), "explosionPE/9.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE10.png"), "explosionPE/10.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE11.png"), "explosionPE/11.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE12.png"), "explosionPE/12.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE13.png"), "explosionPE/13.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE14.png"), "explosionPE/14.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE15.png"), "explosionPE/15.png");
	setTexture(new java.io.File(_MAIN_DIR, "explosionPE16.png"), "explosionPE/16.png");
}catch(e) {
	showError(e);
}}})).start()};

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
		clientMessage(ChatColor.DARK_RED + "[" + ScriptName + " ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
}
 
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
		toasts(prototypeFile.getName() + " 리소스파일이 없습니다");
	}
};

function downloadFile(path, url) {
	try{
		
		uiThread(function() {
			loadingText.setText(TAG + "download resources... (" + (++downloadedFile) + "/16)");
		});
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
		return false;
	}
};

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
};

function getPitch(x, y, z) {
	return -1 * Math.atan(y / Math.sqrt(Math.pow(x, 2)+Math.pow(z, 2))) * 180 / Math.PI;
};

function rangeEnt(a, b) {
	return Math.sqrt(Math.pow(Entity.getX(a) - Entity.getX(b), 2) + Math.pow(Entity.getY(a) - Entity.getY(b), 2) + Math.pow(Entity.getZ(a) - Entity.getZ(b), 2));
};

function absRangeX(y, p) {
	return (-1 * Math.sin(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

function absRangeY(y, p) {
	return (Math.sin(-p / 180 * Math.PI));
};

function absRangeZ(y, p) {
	return (Math.cos(y / 180 * Math.PI) * Math.cos(p / 180 * Math.PI));
};

function absX(x, y, z) {
	return x / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absY(x, y, z) {
	return y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

function absZ(x, y, z) {
	return z / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
};

var DeData = [];

var shockWave_R = Renderer.createHumanoidRenderer();

function shockWave(renderer) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, true);
	body.addBox(-16, 0, 0, 32, 32, 0, 0);
};

shockWave(shockWave_R);

function explodeHook(e, x, y, z) {
/*	new java.lang.Thread(new java.lang.Runnable({run: function() {
		for(var e = 0; e < DeData.length; e++) {
			for(var f = 0; f < DeData[e].ent.length; f++) {
				if(Entity.getHealth(DeData[e].ent[f].ent) !== 744) {
					Entity.remove(DeData[e].ent[f].ent);
					DeData[e].ent.splice(f, 1);
				}
			}
		}
	}})).start();*/
	var fq = 0x05 + Math.ceil(Math.random() * 0x15);
	DeData.push({x: x, y: y, z: z, ent: [], maxEnt: 20, effectRate: 0.5, duration: fq, maxDuration: fq, range: 3.5});
};

function modTick() {
	for(var e = 0; e < DeData.length; e++) {
		for(var f = 0; f < DeData[e].ent.length; f++) {
			if(DeData[e].ent[f].mod >= 16) {
				Entity.remove(DeData[e].ent[f].ent);
				DeData[e].ent.splice(f, 1);
				continue;
			}
			DeData[e].ent[f].mod += 2;
			Entity.setMobSkin(DeData[e].ent[f].ent, "explosionPE/" + DeData[e].ent[f].mod + ".png");
			Entity.setHealth(DeData[e].ent[f].ent, 744);
			var px = Player.getX();
			var py = Player.getY();
			var pz = Player.getZ();
			var rx = absX(DeData[e].ent[f].x-px, DeData[e].ent[f].y-py, DeData[e].ent[f].z-pz);
			var ry = absY(DeData[e].ent[f].x-px, DeData[e].ent[f].y-py, DeData[e].ent[f].z-pz);
			var rz = absZ(DeData[e].ent[f].x-px, DeData[e].ent[f].y-py, DeData[e].ent[f].z-pz);
			Entity.setRot(eft, getYaw(-rx, ry, -rz), getPitch(-rx, ry, -rz));
			Entity.setPosition(DeData[e].ent[f].ent, DeData[e].ent[f].x, DeData[e].ent[f].y, DeData[e].ent[f].z);
			Entity.setVelX(DeData[e].ent[f].ent, -rx/10);
			Entity.setVelY(DeData[e].ent[f].ent, 0);
			Entity.setVelZ(DeData[e].ent[f].ent, -rz/10);
		}
		if(--DeData[e].duration > 0 && DeData[e].maxEnt > DeData[e].ent.length && DeData[e].effectRate >= Math.random()) {
			var x = (Math.random() * DeData[e].range * 2) - DeData[e].range + DeData[e].x;
			var y = (Math.random() * DeData[e].range * 2) - DeData[e].range + DeData[e].y;
			var z = (Math.random() * DeData[e].range * 2) - DeData[e].range + DeData[e].z;
			var px = Player.getX();
			var py = Player.getY();
			var pz = Player.getZ();
			var rx = absX(x-px, y-py, z-pz);
			var ry = absY(x-px, y-py, z-pz);
			var rz = absZ(x-px, y-py, z-pz);
			var eft = Level.spawnMob(x, y, z, 11, "explosionPE/2.png");
			Entity.setRenderType(eft, shockWave_R.renderType);
			Entity.setVelX(eft, -rx/10);
			Entity.setVelY(eft, 0);
			Entity.setVelZ(eft, -rz/10);
			Entity.setRot(eft, getYaw(-rx, ry, -rz), getPitch(-rx, ry, -rz));
			Entity.setCollisionSize(eft, 0, 0);
			Entity.setHealth(eft, 744);
			DeData[e].ent.push({ent: eft, x: x, y: y, z: z, mod: 2});
		}
		if(DeData[e].duration <= 0 && DeData[e].ent.length <= 0) {
			DeData.splice(e, 1)
		}
	}
};

function entityAddedHook(ent) {
	if(Entity.getHealth(ent) === 744) {
		Entity.remove(ent)
	}
}