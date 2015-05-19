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

var isOn = false;
var lastMs = 0;
var lastMsList = [];
var maxRecord = 20;
var tpsTv = new android.widget.TextView(ctx);
tpsTv.setText("TPS: --.--");
tpsTv.setGravity(android.view.Gravity.LEFT);
tpsTv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, FOUR*11);
tpsTv.setTextColor(android.graphics.Color.WHITE);
var tpsTv_drawable = new android.graphics.drawable.GradientDrawable();
tpsTv_drawable.mutate().setColor(android.graphics.Color.rgb(0x3a, 0x39, 0x3a));
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
	uiThread(function() {
		if(lastMsList.length < maxRecord) {
			tpsTv.setText("TPS: --.--");
		}else {
			tpsTv.setText("TPS: " + total);
		}
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