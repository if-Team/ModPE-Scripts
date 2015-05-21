var ScriptName = "T(ick)P(er)S(econd)";
var Version = "v3";
var author = ["CodeInside"];
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
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MAIN_MOD_DIR = new java.io.File(_SD_CARD,   "games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(_MAIN_MOD_DIR, ScriptName);
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, "setting.json");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_STEP_DATA() {return new java.io.File(_MAP_DIR(), ScriptName + ".data")}
var e = loadData(_MOD_DATA, "SCALE");
var dip = (e - 1) + "" == "NaN" ? 1 : e/10;
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics()) * dip;
var staticFOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
print(staticFOUR + " " + FOUR + " " + e);
var _nomedia = new java.io.File(_MOD_DIR, ".nomedia");
var _I_ci = new java.io.File(_MOD_DIR, "author.png");
var _L_ci = "https://m.box.com/file/30395265877/https%3A%2F%2Fapp.box.com%2Fs%2Fdqxi7lj6qwx0t0iktanfl7x5dczh5yr4/preview/preview.png";

if(!_MOD_DIR.exists()) {
	_MOD_DIR.mkdirs();
}

if(!_MOD_DATA.exists()) {
	_MOD_DATA.createNewFile()
}

if(!_nomedia.exists()) {
	_nomedia.createNewFile()
}

if(!_I_ci.exists()) {
	thread(function() {try {
		downloadFile(_I_ci, _L_ci)
	}catch(e) {
		//Nothing
	}}).start();
}

function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
}

function uiThread(fc) {
	return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))
}

var tts = new android.speech.tts.TextToSpeech (ctx, new android.speech.tts.TextToSpeech.OnInitListener ( {
	onInit: function (status) {
	}
}));

tts.setPitch(3);
tts.setLanguage(java.util.Locale.ENGLISH);
tts.setSpeechRate(1.5);

function ttsIt(str, pitch, speed) {
	tts.setPitch(pitch);
	tts.setSpeechRate(speed);
	tts.speak(str, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
}

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
	if(!file.exists()) {
		file.createNewFile()
	}
	try{
		var fileInputStream = new java.io.FileInputStream(file);
	}catch(e) {
		return "Can't read"
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
	return "Not found";
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

var TPS = {};
TPS.isOn = false;
TPS.lastMs = 0;
TPS.lastMsList = [];
TPS.maxRecord = 20;
TPS.c00 = android.graphics.Color.rgb(63, 63, 63);
TPS.c01 = android.graphics.Color.rgb(111, 63, 63);
TPS.c02 = android.graphics.Color.rgb(159, 63, 63);
TPS.c03 = android.graphics.Color.rgb(207, 63, 63);
TPS.c04 = android.graphics.Color.rgb(255, 63, 63);
TPS.c05 = android.graphics.Color.rgb(255, 111, 63);
TPS.c06 = android.graphics.Color.rgb(255, 159, 63);
TPS.c07 = android.graphics.Color.rgb(255, 207, 63);
TPS.c08 = android.graphics.Color.rgb(255, 255, 63);
TPS.c09 = android.graphics.Color.rgb(207, 255, 63);
TPS.c10 = android.graphics.Color.rgb(159, 255, 63);
TPS.c11 = android.graphics.Color.rgb(111, 255, 63);
TPS.c12 = android.graphics.Color.rgb(63, 255, 63);

TPS.load = function() {
	
TPS.locationFixation = loadData(_MOD_DATA, "LOCATION_FIXATION") == 1;
TPS.animation = loadData(_MOD_DATA, "ANIMATION") == 0;
TPS.type = loadData(_MOD_DATA, "TYPE")
	
TPS.tpsTv_drawable_colors = [TPS.c00, TPS.c00];
TPS.tpsTv = new android.widget.TextView(ctx);
TPS.tpsTv.setText("TPS: --.--");
TPS.tpsTv.setTransformationMethod(null);
TPS.tpsTv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
TPS.tpsTv.setShadowLayer(0.5, FOUR, FOUR, android.graphics.Color.DKGRAY);
TPS.tpsTv.setGravity(android.view.Gravity.LEFT);
TPS.tpsTv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, FOUR*11);
TPS.tpsTv.setTextColor(android.graphics.Color.WHITE);
TPS.tpsTv_drawable = new android.graphics.drawable.GradientDrawable();
TPS.tpsTv_drawable.mutate().setStroke(FOUR*2, TPS.c00);
TPS.tpsTv_drawable.mutate().setOrientation(android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP);
TPS.tpsTv_drawable.mutate().setGradientType(android.graphics.drawable.GradientDrawable.RADIAL_GRADIENT);
TPS.tpsTv_drawable.mutate().setGradientRadius(FOUR*50);
TPS.tpsTv_drawable.mutate().setColors(TPS.tpsTv_drawable_colors);
TPS.tpsTv_drawable.setCornerRadius(FOUR*5);
var e = loadData(_MOD_DATA, "ALPHA");
TPS.tpsTv_drawable.setAlpha((e - 1) + "" === "NaN" ? 255 : e);
TPS.tpsTv.setBackgroundDrawable(TPS.tpsTv_drawable);
TPS.tpsTv_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT);
TPS.tpsTv.setLayoutParams(TPS.tpsTv_param);
TPS.tpsTv.setPadding(FOUR*4, FOUR*2, 0, FOUR*2);
var vx, vy, sx, sy, wx, wy;
TPS.tpsTv.setOnTouchListener(new android.view.View.OnTouchListener({ onTouch: function(view, event) {
	if(!TPS.locationFixation) {
		switch(event.action) {
			case android.view.MotionEvent.ACTION_DOWN:
				vx = event.getX();
				vy = event.getY();
				TPS.hiddenX = event.getRawX();
				TPS.hiddenY = event.getRawY();
				TPS.hiddenDrag = 0;
				break;
			case android.view.MotionEvent.ACTION_MOVE:
				wx = event.getRawX() - vx;
				wy = event.getRawY() - vy;
				TPS.hiddenDrag += Math.sqrt(Math.pow(event.getRawX() - TPS.hiddenX, 2) + Math.pow(event.getRawY() - TPS.hiddenY, 2));
				TPS.hiddenX = event.getRawX();
				TPS.hiddenY = event.getRawY();
				uiThread(function() {try {
					TPS.tpsWd.update(wx, wy, TPS.tpsWd.getWidth(), TPS.tpsWd.getHeight(), true);
				}catch(e) {
					print(e);
				}});
				break;
			case android.view.MotionEvent.ACTION_UP:
				saveData(_MOD_DATA, "WINDOW_X", wx);
				saveData(_MOD_DATA, "WINDOW_Y", wy);
				if(TPS.hiddenDrag > 4096) {try {
					if(!_I_ci.exists()) {
						toast("Please connect internet to show EASTER EGG");
						return false;
					}
					toast("Long click to close it");
					TPS.hiddenManu();
				}catch(e) {
					print(e);
				}}
				break;
		}
	}
	return false;
}}));

TPS.tpsTv.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
	if(TPS.hiddenDrag > 10) return;
	TPS.tpsManu();
}catch(e) {
	print(e);
}}}));

TPS.tpsWd = new android.widget.PopupWindow(TPS.tpsTv, FOUR*62, FOUR*20, false);

TPS.tpsManu = function() {try {
	TPS.mdl = new android.app.AlertDialog.Builder(ctx); 
	TPS.mdl.setTitle("TPS Setting");
	
	TPS.msl = new android.widget.ScrollView(ctx);
	
	TPS.mll = new android.widget.LinearLayout(ctx);
	TPS.mll.setOrientation(1);
	
	TPS.msizeTv = new android.widget.TextView(ctx);
	TPS.msizeTv.setText("DIP size");
	TPS.msizeTv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, staticFOUR*16);
	TPS.mll.addView(TPS.msizeTv);
	
	TPS.msizeBar = new android.widget.SeekBar(ctx);
	TPS.msizeBar.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
	TPS.msizeBar.setMax(90);
	TPS.mprogress = loadData(_MOD_DATA, "SCALE");
	TPS.msizeBar.setProgress((TPS.mprogress - 1) + "" == "NaN" ? 0 : TPS.mprogress - 10);
	TPS.mll.addView(TPS.msizeBar);
	
	TPS.malphaTv = new android.widget.TextView(ctx);
	TPS.malphaTv.setText("Background alpha");
	TPS.malphaTv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, staticFOUR*16);
	TPS.mll.addView(TPS.malphaTv);
	
	TPS.malphaBar = new android.widget.SeekBar(ctx);
	TPS.malphaBar.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, -2));
	TPS.malphaBar.setMax(255);
	TPS.malphaProgress = loadData(_MOD_DATA, "ALPHA");
	TPS.malphaBar.setProgress((TPS.malphaProgress - 1) + "" == "NaN" ? 255 : TPS.malphaProgress);
	TPS.mll.addView(TPS.malphaBar);
	
	TPS.mstatic = new android.widget.Button(ctx);
	TPS.mstatic.setText("Location fixation");
	if(loadData(_MOD_DATA, "LOCATION_FIXATION") == 1) {
		TPS.mstatic.setTextColor(android.graphics.Color.YELLOW);
	}else {
		TPS.mstatic.setTextColor(android.graphics.Color.WHITE);
	}
	TPS.mstatic.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		if(loadData(_MOD_DATA, "LOCATION_FIXATION") == 1) {
			TPS.mstatic.setTextColor(android.graphics.Color.WHITE);
			saveData(_MOD_DATA, "LOCATION_FIXATION", 0)
		}else {
			TPS.mstatic.setTextColor(android.graphics.Color.YELLOW);
			saveData(_MOD_DATA, "LOCATION_FIXATION", 1)
		}
	}catch(e) {
		print(e);
	}}}));
	TPS.mll.addView(TPS.mstatic);
	
	TPS.mani = new android.widget.Button(ctx);
	TPS.mani.setText("Animation");
	if(loadData(_MOD_DATA, "ANIMATION") == 0) {
		TPS.mani.setTextColor(android.graphics.Color.WHITE);
	}else {
		TPS.mani.setTextColor(android.graphics.Color.YELLOW);
	}
	TPS.mani.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		if(loadData(_MOD_DATA, "ANIMATION") == 0) {
			TPS.mani.setTextColor(android.graphics.Color.YELLOW);
			saveData(_MOD_DATA, "ANIMATION", 1)
		}else {
			TPS.mani.setTextColor(android.graphics.Color.WHITE);
			saveData(_MOD_DATA, "ANIMATION", 0);
		}
	}catch(e) {
		print(e);
	}}}));
	TPS.mll.addView(TPS.mani);
	
	TPS.mtype = new android.widget.Button(ctx);
	TPS.mtype.setText("(t) <-> (%)");
	if(loadData(_MOD_DATA, "TYPE") == 1) {
		TPS.mtype.setTextColor(android.graphics.Color.YELLOW);
	}else {
		TPS.mtype.setTextColor(android.graphics.Color.WHITE);
	}
	TPS.mtype.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		if(loadData(_MOD_DATA, "TYPE") == 1) {
			TPS.mtype.setTextColor(android.graphics.Color.WHITE);
			saveData(_MOD_DATA, "TYPE", 0);
		}else {
			TPS.mtype.setTextColor(android.graphics.Color.YELLOW);
			saveData(_MOD_DATA, "TYPE", 1)
		}
	}catch(e) {
		print(e);
	}}}));
	TPS.mll.addView(TPS.mtype);
	
	TPS.mdl.setNegativeButton("Back", null);
	TPS.mdl.setPositiveButton("Save", new android.content.DialogInterface.OnClickListener({onClick: function() {try {
		saveData(_MOD_DATA, "SCALE", TPS.msizeBar.getProgress() + 10);
		var e = loadData(_MOD_DATA, "SCALE");
		var dip = (e - 1) + "" == "NaN" ? 1 : e/10;
		FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics()) * dip;
		saveData(_MOD_DATA, "ALPHA", TPS.malphaBar.getProgress());
		if(TPS.isOn) {
			uiThread(function() {
				TPS.tpsWd.dismiss();
				TPS.load();
				var x = loadData(_MOD_DATA, "WINDOW_X");
				var y = loadData(_MOD_DATA, "WINDOW_Y")
				TPS.tpsWd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((x - 1) + "" === "NaN" ? ctx.getWindowManager().getDefaultDisplay().getWidth() : x), ((y - 1) + "" === "NaN" ? FOUR*40 : y));
			})
		}else {
			TPS.load()
		}
	}catch(e) {
		print(e);
	}}}));
	
	TPS.msl.addView(TPS.mll);
	TPS.mdl.setView(TPS.msl);
	TPS.mdl.create().show();
}catch(e) {
	print(e);
}}

}

TPS.hiddenManu = function() {

TPS.hrun = true;
TPS.htv_drawable_colors = [TPS.c00, TPS.c00, TPS.c00,TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00,TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00,TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00,TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00, TPS.c00];
TPS.cr = Math.floor(Math.random() * 256);
TPS.cg = Math.floor(Math.random() * 256);
TPS.cb = Math.floor(Math.random() * 256);
TPS.hmodTick();

TPS.hrl = new android.widget.RelativeLayout(ctx);
TPS.hrl.setGravity(android.view.Gravity.CENTER);

TPS.hexit = new android.widget.Button(ctx);
TPS.hexit.setBackgroundColor(0);
TPS.hexit_param = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
TPS.hexit.setLayoutParams(TPS.hexit_param);
TPS.hexit.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
		TPS.cr = Math.floor(Math.random() * 256);
		TPS.cg = Math.floor(Math.random() * 256);
		TPS.cb = Math.floor(Math.random() * 256);
	}catch(e) {
		print(e);
	}}}));
TPS.hexit.setOnLongClickListener(new android.view.View.OnLongClickListener({onLongClick: function(view, event) {try {
	TPS.hwd.dismiss();
	TPS.hrun = false;
	return true;
}catch(e) {
	print(e);
	return true;
}}}));
TPS.hrl.addView(TPS.hexit);

TPS.hiv = new android.widget.ImageView(ctx);
TPS.hivb = android.graphics.BitmapFactory.decodeFile(_I_ci.getAbsolutePath());
TPS.hivb2 = android.graphics.Bitmap.createScaledBitmap(TPS.hivb, staticFOUR*240, staticFOUR*240, false);
TPS.hiv.setImageBitmap(TPS.hivb2);
TPS.hiv.setId(Math.ceil(Math.random() * 1000000));
TPS.hiv_param = new android.widget.RelativeLayout.LayoutParams(staticFOUR * 240, staticFOUR * 240);
TPS.hiv_param.setMargins(staticFOUR*130, 0, staticFOUR*130, 0);
TPS.hiv_param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT, TPS.hiv.getId());
TPS.hiv.setLayoutParams(TPS.hiv_param);
TPS.hrl.addView(TPS.hiv);

TPS.htv = new android.widget.TextView(ctx);
TPS.htv.setText("=Copyright 2015 CodeInside=");
TPS.htv.setTransformationMethod(null);
TPS.htv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
TPS.htv.setShadowLayer(0.5, staticFOUR, staticFOUR, android.graphics.Color.DKGRAY);
TPS.htv.setGravity(android.view.Gravity.CENTER);
TPS.htv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, staticFOUR*30);
TPS.htv.setTextColor(android.graphics.Color.WHITE);
TPS.htv_drawable = new android.graphics.drawable.GradientDrawable();
TPS.htv_drawable.mutate().setStroke(staticFOUR*4, TPS.c00);
TPS.htv_drawable.mutate().setOrientation(android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP);
TPS.htv_drawable.mutate().setGradientType(android.graphics.drawable.GradientDrawable.RADIAL_GRADIENT);
TPS.htv_drawable.mutate().setGradientRadius(staticFOUR*250);
TPS.htv_drawable.mutate().setColors(TPS.htv_drawable_colors);
TPS.htv_drawable.setCornerRadius(staticFOUR*10);
TPS.htv.setBackgroundDrawable(TPS.htv_drawable);
TPS.htv_param = new android.widget.RelativeLayout.LayoutParams(staticFOUR * 500, staticFOUR * 60);
TPS.htv_param.setMargins(0, staticFOUR * 0, 0, 0);
TPS.htv_param.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT, TPS.hiv.getId());
TPS.htv_param.addRule(android.widget.RelativeLayout.BELOW, TPS.hiv.getId());
TPS.htv.setLayoutParams(TPS.htv_param);
TPS.htv.setPadding(0, 0, 0, 0);
TPS.hrl.addView(TPS.htv);

TPS.hwd = new android.widget.PopupWindow(TPS.hrl, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, false);

TPS.hwd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, 0, 0);

}

TPS.hmodTick = function() {
	thread(function() {try {
		while(TPS.hrun) {
			java.lang.Thread.sleep(50);
			TPS.htv_drawable_colors.unshift(android.graphics.Color.rgb(TPS.cr, TPS.cg, TPS.cb));
			while(TPS.htv_drawable_colors.length > 50) {
				TPS.htv_drawable_colors.pop();
			}
			uiThread(function() {try {
				TPS.htv_drawable.mutate().setColors(TPS.htv_drawable_colors);
			}catch(e) {
				//None
				print(e);
			}});
		}
	}catch(e) {
		//None
		print(e);
	}}).start();
};

TPS.TPS = function(ms) {
	var f = 1000 / (ms - TPS.lastMs);
	if(f <= 25) {
		TPS.lastMsList.push(f);
	}
	TPS.lastMs = ms;
	while(TPS.lastMsList.length > TPS.maxRecord) {
		TPS.lastMsList.shift()
	}
	var total = 0;
	for(var e = 0; e < TPS.lastMsList.length; e++) {
		total += TPS.lastMsList[e]
	}
	total /= TPS.lastMsList.length;
	var per = Math.round(total*5) + "%";
	total = Math.round(total*100)/100;
	if(total > 20) {
		TPS.tpsTv_drawable_colors.unshift(android.graphics.Color.rgb(63, 255, 63));
	}else if(total > 15) {
		TPS.tpsTv_drawable_colors.unshift(android.graphics.Color.rgb(63 - (192 * (total - 20) / 5), 255, 63));
	}else if(total > 10) {
		TPS.tpsTv_drawable_colors.unshift(android.graphics.Color.rgb(255, 255 + (192 * (total - 15) / 5), 63));
	}else if(total > 5) {
		TPS.tpsTv_drawable_colors.unshift(android.graphics.Color.rgb(255 + (192 * (total - 10) /5), 63, 63));
	}else {
		TPS.tpsTv_drawable_colors.unshift(android.graphics.Color.rgb(63, 63, 63));
	}
	/*var display;
	if(total > 20) {
		display = 20;
	}else {
		display = Math.ceil(total);
	}
	if(!TPS.animation) {
		switch(display) {
			case 20:
				TPS.tpsTv_drawable_colors.unshift(TPS.c12);
				break;
			case 19:
				TPS.tpsTv_drawable_colors.unshift(TPS.c11);
				break;
			case 18:
				TPS.tpsTv_drawable_colors.unshift(TPS.c10);
				break;
			case 17:
				TPS.tpsTv_drawable_colors.unshift(TPS.c09);
				break;
			case 16:
				TPS.tpsTv_drawable_colors.unshift(TPS.c08);
				break;
			case 15:
				TPS.tpsTv_drawable_colors.unshift(TPS.c07);
				break;
			case 14:
				TPS.tpsTv_drawable_colors.unshift(TPS.c06);
				break;
			case 13:
				TPS.tpsTv_drawable_colors.unshift(TPS.c05);
				break;
			case 12:
				TPS.tpsTv_drawable_colors.unshift(TPS.c04);
				break;
			case 11:
				TPS.tpsTv_drawable_colors.unshift(TPS.c03);
				break;
			case 10:
				TPS.tpsTv_drawable_colors.unshift(TPS.c02);
				break;
			case 9:
				TPS.tpsTv_drawable_colors.unshift(TPS.c01);
				break;
			default:
				TPS.tpsTv_drawable_colors.unshift(TPS.c00);
		}
	}*/
	while(TPS.tpsTv_drawable_colors.length > TPS.maxRecord) {
		TPS.tpsTv_drawable_colors.pop();
	}
	uiThread(function() {try {
		if(TPS.lastMsList.length < TPS.maxRecord) {
			TPS.tpsTv.setText("TPS: --.--");
		}else {
			if(TPS.type == 1) {
				TPS.tpsTv.setText("TPS: " + per);
			}else {
				TPS.tpsTv.setText("TPS: " + total);
			}
		}
		if(!TPS.animation) {
			TPS.tpsTv_drawable.mutate().setColors(TPS.tpsTv_drawable_colors);
		}
	}catch(e) {
		//print(e);
	}});
};

TPS.load();

function newLevel(str) {
	uiThread(function() {try {
		if(!TPS.isOn) {
			//tpsWd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, FOUR*40);
			var x = loadData(_MOD_DATA, "WINDOW_X");
			var y = loadData(_MOD_DATA, "WINDOW_Y")
			TPS.tpsWd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((x - 1) + "" === "NaN" ? ctx.getWindowManager().getDefaultDisplay().getWidth() : x), ((y - 1) + "" === "NaN" ? FOUR*40 : y));
			TPS.isOn = true;
		}
	}catch(e) {
		print(e);
	}});
};

function modTick() {
	TPS.TPS(java.lang.System.currentTimeMillis());
};

function leaveGame() {
	uiThread(function() {
		if(TPS.isOn) {
			TPS.tpsWd.dismiss();
			TPS.isOn = false;
		}
	});
};