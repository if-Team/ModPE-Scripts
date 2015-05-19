var ScriptName = "T(ick)P(er)S(econd)";
var Version = "v1";
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
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory();
var _MAIN_MOD_DIR = new java.io.File(_SD_CARD,   "games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(_MAIN_MOD_DIR, ScriptName);
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, "setting.json");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")};
function _MAP_STEP_DATA() {return new java.io.File(_MAP_DIR(), ScriptName + ".data")};

if(!_MOD_DIR.exists()) {
	_MOD_DIR.mkdirs();
}

if(!_MOD_DATA.exists()) {
	_MOD_DATA.createNewFile()
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
	return null;
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

var isOn = false;
var lastMs = 0;
var lastMsList = [];
var maxRecord = 20;
var c00 = android.graphics.Color.rgb(63, 63, 63);
var c01 = android.graphics.Color.rgb(111, 63, 63);
var c02 = android.graphics.Color.rgb(159, 63, 63);
var c03 = android.graphics.Color.rgb(207, 63, 63);
var c04 = android.graphics.Color.rgb(255, 63, 63);
var c05 = android.graphics.Color.rgb(255, 111, 63);
var c06 = android.graphics.Color.rgb(255, 159, 63);
var c07 = android.graphics.Color.rgb(255, 207, 63);
var c08 = android.graphics.Color.rgb(255, 255, 63);
var c09 = android.graphics.Color.rgb(207, 255, 63);
var c10 = android.graphics.Color.rgb(159, 255, 63);
var c11 = android.graphics.Color.rgb(111, 255, 63);
var c12 = android.graphics.Color.rgb(63, 255, 63);
var tpsTv_drawable_colors = [c00, c00];
var tpsTv = new android.widget.TextView(ctx);
tpsTv.setText("TPS: --.--");
tpsTv.setTransformationMethod(null);
tpsTv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
tpsTv.setShadowLayer(0.5, FOUR, FOUR, android.graphics.Color.DKGRAY);
tpsTv.setGravity(android.view.Gravity.LEFT);
tpsTv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, FOUR*11);
tpsTv.setTextColor(android.graphics.Color.WHITE);
var tpsTv_drawable = new android.graphics.drawable.GradientDrawable();
tpsTv_drawable.mutate().setStroke(FOUR*2, c00);
tpsTv_drawable.mutate().setOrientation(android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP);
tpsTv_drawable.mutate().setGradientType(android.graphics.drawable.GradientDrawable.RADIAL_GRADIENT);
tpsTv_drawable.mutate().setGradientRadius(FOUR*50);
tpsTv_drawable.mutate().setColors(tpsTv_drawable_colors);
tpsTv_drawable.setCornerRadius(FOUR*5);
tpsTv.setBackgroundDrawable(tpsTv_drawable);
var tpsTv_param = new android.widget.RelativeLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.MATCH_PARENT);
tpsTv.setLayoutParams(tpsTv_param);
tpsTv.setPadding(FOUR*4, FOUR*2, 0, FOUR*2);
var vx, vy, sx, sy, wx, wy;
tpsTv.setOnTouchListener(new android.view.View.OnTouchListener({ onTouch: function(view, event) {
	switch(event.action) {
		case android.view.MotionEvent.ACTION_DOWN:
				vx = event.getX();
				vy = event.getY();
				break;
		case android.view.MotionEvent.ACTION_MOVE:
			wx = event.getRawX() - vx;
			wy = event.getRawY() - vy;
			uiThread(function() {try {
				tpsWd.update(wx, wy, tpsWd.getWidth(), tpsWd.getHeight(), true);
			}catch(e) {
				print(e);
			}});
			break;
		case android.view.MotionEvent.ACTION_UP:
			saveData(_MOD_DATA, "WINDOW_X", wx);
			saveData(_MOD_DATA, "WINDOW_Y", wy);
			break;
	}
	return false;
}}));
tpsTv.setOnClickListener(new android.view.View.OnClickListener({onClick: function(view, event) {try {
	toast("=Copyright 2015 CodeInside=");
	ttsIt("Copyright Code Inside", 1, 1);
}catch(e) {
	print(e);
}}}));
var tpsWd = new android.widget.PopupWindow(tpsTv, FOUR*60, FOUR*20, false);

function TPS(ms) {
	var f = 1000 / (ms - lastMs);
	if(f <= 25) {
		lastMsList.push(f);
	}
	lastMs = ms;
	while(lastMsList.length > maxRecord) {
		lastMsList.shift()
	}
	var total = 0;
	for(var e = 0; e < lastMsList.length; e++) {
		total += lastMsList[e]
	}
	total /= lastMsList.length;
	total = Math.round(total*100)/100;
	var display;
	if(total > 20) {
		display = 20;
	}else {
		display = Math.ceil(total);
	}
	switch(display) {
		case 20:
			tpsTv_drawable_colors.unshift(c12);
			break;
		case 19:
			tpsTv_drawable_colors.unshift(c11);
			break;
		case 18:
			tpsTv_drawable_colors.unshift(c10);
			break;
		case 17:
			tpsTv_drawable_colors.unshift(c09);
			break;
		case 16:
			tpsTv_drawable_colors.unshift(c08);
			break;
		case 15:
			tpsTv_drawable_colors.unshift(c07);
			break;
		case 14:
			tpsTv_drawable_colors.unshift(c06);
			break;
		case 13:
			tpsTv_drawable_colors.unshift(c05);
			break;
		case 12:
			tpsTv_drawable_colors.unshift(c04);
			break;
		case 10:
			tpsTv_drawable_colors.unshift(c03);
			break;
		case 9:
			tpsTv_drawable_colors.unshift(c02);
			break;
		case 8:
			tpsTv_drawable_colors.unshift(c01);
			break;
		default:
			tpsTv_drawable_colors.unshift(c00);
	}
	while(tpsTv_drawable_colors.length > 10) {
		tpsTv_drawable_colors.pop();
	}
	uiThread(function() {
		if(lastMsList.length < maxRecord) {
			tpsTv.setText("TPS: --.--");
		}else {
			tpsTv.setText("TPS: " + total);
		}
		tpsTv_drawable.mutate().setColors(tpsTv_drawable_colors);
	});
};

function newLevel(str) {
	uiThread(function() {try {
		if(!isOn) {
			//tpsWd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, FOUR*40);
			tpsWd.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((loadData(_MOD_DATA, "WINDOW_X") == null || loadData(_MOD_DATA, "WINDOW_X") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getWidth() : loadData(_MOD_DATA, "WINDOW_X")), ((loadData(_MOD_DATA, "WINDOW_Y") == null || loadData(_MOD_DATA, "WINDOW_Y") == "undefined") ? FOUR*40 : loadData(_MOD_DATA, "WINDOW_Y")));
			isOn = true;
		}
	}catch(e) {
		print(e);
	}});
};

function modTick() {
	TPS(java.lang.System.currentTimeMillis());
};

function leaveGame() {
	uiThread(function() {
		if(isOn) {
			tpsWd.dismiss();
			isOn = false;
		}
	});
};