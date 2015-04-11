var debugging = true;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var _MAIN_MOD_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods/Gear");
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _SETTING = new java.io.File(_MOD_DIR, "config.json");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")};
function _MAP_STEP_DATA() {return new java.io.File(_MAP_DIR(), "gear.json")};
var uiThread = function(fc) {return ctx.runOnUiThread(new java.lang.Runnable({run: fc}))};
var thread = function(fc) {return new java.lang.Thread(new java.lang.Runnable( {run: fc}))};

//마인크래프트 리소스
var mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);
var mcpeAssets = mcpeCPC.getAssets();
//spritesheet.png 파일 접근
var mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
var mcpeSS_BF = new android.graphics.BitmapFactory.decodeStream(mcpeSS);
//touchgui.png 파일 접근
var mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
var mcpeTG_BF = new android.graphics.BitmapFactory.decodeStream(mcpeTG);
//배경 나인패치
var mcpeBG = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF, 0, 0, 16, 16), dp(32), dp(32), false);
var mcpeBG9 = ninePatch1(mcpeBG, dp(12), dp(12), dp(24), dp(24));
//배경 나인패치
var mcpeBGT = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14), dp(32), dp(32), false);
var mcpeBGT9 = ninePatch1(mcpeBGT, dp(12), dp(12), dp(22), dp(22));
//타이틀바 나인패치
var mcpeTitleBar = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25), dp(28), dp(50), false);
var mcpeTitleBar9 = ninePatch1(mcpeTitleBar, dp(8), dp(8), dp(20), dp(22));
//종료 버튼 나인패치
var mcpeExit = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18), 18*FOUR, 18*FOUR, false);
var mcpeExit9 = ninePatch1(mcpeExit, dp(6), dp(6), dp(30), dp(30));
var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
mcpeExitB.setAntiAlias(false);
//종료 버튼(클릭) 나인패치
var mcpeExitClick = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18), dp(36), dp(36), false);
var mcpeExitClick9 = ninePatch1(mcpeExitClick, dp(6), dp(6), dp(32), dp(32));
//버튼 나인패치
var mcpeBtn = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8),dp(16),dp(16),false);
var mcpeBtn9 = ninePatch1(mcpeBtn,dp(6),dp(4),dp(14),dp(14));
//버튼(클릭) 나인패치
var mcpeBtnClick = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8),dp(16),dp(16),false);
var mcpeBtnClick9 = ninePatch1(mcpeBtnClick,dp(4),dp(4),dp(12),dp(14));
//미니버튼 나인패치
var mcpeMiniBtn = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,33,8,7),dp(16),dp(14),false);
var mcpeMiniBtn9 = ninePatch1(mcpeMiniBtn,dp(6),dp(2),dp(14),dp(12));
//미니버튼(클릭) 나인패치
var mcpeMiniBtnClick = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,7),dp(16),dp(14),false);
var mcpeMiniBtnClick9 = ninePatch1(mcpeMiniBtnClick,dp(4),dp(4),dp(12),dp(12));
//텍스트뷰 나인패치
var b = android.graphics.Color.parseColor("#6b6163");
var i = android.graphics.Color.parseColor("#3a393a");
var mcpeTextViewRaw = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
var mcpeTextView = android.graphics.Bitmap.createBitmap(6, 6, android.graphics.Bitmap.Config.ARGB_8888);
mcpeTextView.setPixels(mcpeTextViewRaw, 0, 6, 0, 0, 6, 6);
mcpeTextView = android.graphics.Bitmap.createScaledBitmap(mcpeTextView, dp(6), dp(6), false);
var mcpeTextView9 = ninePatch1(mcpeTextView, dp(3), dp(3), dp(4), dp(4));

//==============================
//-NinePatch JS
//Copyright® 2015 affogatoman(colombia2)
//==============================
function ninePatch1(bitmap, x, y, xx, yy, w, h){
	var NO_COLOR = 0x00000001;
	var buffer = java.nio.ByteBuffer.allocate(56).order(java.nio.ByteOrder.nativeOrder());
	buffer.put(0x01);
	buffer.put(0x02);
	buffer.put(0x02);
	buffer.put(0x02);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(0);
	buffer.putInt(y-1); 
	buffer.putInt(yy);
	buffer.putInt(x-1); 
	buffer.putInt(xx); 
	buffer.putInt(NO_COLOR);
	buffer.putInt(NO_COLOR); 
	var drawable = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), null);
	return drawable;
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
	var bm = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
	return patch;
}

function dp(dips) {
	return parseInt(dips * ctx.getResources().getDisplayMetrics().density + 0.5);
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
		toasts(prototypeFile.getAbsolutePath() + " 리소스파일이 없습니다");
	}
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
		debug(e.lineNumber + " " + e);
		return false;
	}
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
		for(var l in t) {
			if(temp.split("").length > 30) {
				c+= ("\n" + ChatColor.DARK_RED)
				temp = "";
			}
			c += t[l] + " ";
			temp += t[l];
		}
		clientMessage(ChatColor.DARK_RED + "[Pedometer_Step ERROR LINE: " + e.lineNumber + "]\n" + ChatColor.DARK_RED + c);
	}
};

function saveData(file, article, value) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(file);
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
	var fileInputStream = new java.io.FileInputStream(file);
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

if(!_FONT.exists()) {
	thread( function(){try {
		downloadFile(_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1");
	}catch(e) {
		showError(e);
	}}).start();
};

//Pedometer_Step function
var Pms = {};
Pms.mainWindow = null;
Pms.saveCount = 0;
Pms.mod = 2;
//RECENT, OVERALL, CLOCK

Pms.layout = new android.widget.LinearLayout(ctx);
Pms.layout.setOrientation(1);
Pms.layout.setBackgroundDrawable(mcpeBGT9);
//Pms.layout.setPadding(dp(8), dp(8), dp(8), dp(8));

Pms.btnLayout = new android.widget.LinearLayout(ctx);
//Pms.btnLayout.setOrientation(0);
//Pms.btnLayout.setPadding(0,0,0,0);
//Pms.btnLayout.setGravity(android.view.Gravity.RIGHT|android.view.Gravity.TOP);
Pms.btnLayout_param = new android.widget.LinearLayout.LayoutParams(-2, -2);
//Pms.btnLayout_param.setMargins(0,dp(2),0,0);
Pms.btnLayout.setLayoutParams(Pms.btnLayout_param);

Pms.textView = new android.widget.TextView(ctx);
Pms.textView.setBackgroundDrawable(mcpeTextView9);
//Pms.textView.setPadding(dp(4), dp(4), dp(4), dp(4));
Pms.textView.setGravity(android.view.Gravity.RIGHT);
Pms.textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dp(10));
Pms.textView.setTextColor(android.graphics.Color.WHITE);
Pms.textView.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	Pms.textView.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
}
Pms.textView.setText("Loading...");
Pms.layout.addView(Pms.textView);

Pms.moveButton = new android.widget.Button(ctx);
Pms.moveButton_param = new android.widget.LinearLayout.LayoutParams(dp(40), dp(20));
Pms.moveButton_param.setMargins(0,0,0,0);
Pms.moveButton.setLayoutParams(Pms.moveButton_param);
//Pms.moveButton.setAlpha(0);
//Pms.moveButton.setPadding(dp(5),dp(3),0,dp(5));
Pms.moveButton.setBackgroundColor(android.graphics.Color.rgb(0x3a, 0x39, 0x3a));
Pms.moveButton.setOnTouchListener(new android.view.View.OnTouchListener({ onTouch: function(view, event) {
	switch(event.action) {
		case android.view.MotionEvent.ACTION_DOWN:
				Pms.viewX = event.getX();
				Pms.viewY = event.getY();
				break;
		case android.view.MotionEvent.ACTION_MOVE:
			var screenX = event.getRawX();
			var screenY = event.getRawY();
			var x = screenX - Pms.viewX;
			var y = screenY - Pms.viewY;
			uiThread(function() {try {
			Pms.mainWindow.update(x, y-dp(40), Pms.mainWindow.getWidth(), Pms.mainWindow.getHeight(), true);
			}catch(e) {
				showError(e);
			}});
			break;
		}
	return true;
}}));
Pms.moveButton.setGravity(android.view.Gravity.CENTER);
Pms.moveButton.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dp(8));
Pms.moveButton.setTextColor(android.graphics.Color.WHITE);
Pms.moveButton.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	Pms.moveButton.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));}
Pms.moveButton.setText("Gear");
Pms.btnLayout.addView(Pms.moveButton);

Pms.resetButton = new android.widget.Button(ctx);
Pms.resetButton.setBackgroundDrawable(mcpeMiniBtn9);
//Pms.resetButton.setWidth(dp(20));
//Pms.resetButton.setHeight(dp(20));
Pms.resetButton_param = new android.widget.LinearLayout.LayoutParams(dp(20), dp(20));
//Pms.resetButton_param.setMargins(dp(4),0,0,0);
Pms.resetButton.setLayoutParams(Pms.resetButton_param);
Pms.resetButton.setOnTouchListener( new android.view.View.OnTouchListener({ onTouch: 
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
Pms.resetButton.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
		Pms.currentStepLock = Pms.floorStep;
		uiThread(function() {try {
			Pms.mod = 0;
			Pms.textView.setTextColor(android.graphics.Color.WHITE);
			Pms.textView.setText((Pms.floorStep - Pms.currentStepLock) + "");
		}catch(e) {
			showError(e);
		}});
		saveData(_MAP_STEP_DATA(), "CURRENT_STEP_LOCK", Pms.currentStepLock);
	}catch(e) {
		showError(e);
	}}});
Pms.resetButton.setOnLongClickListener(new android.view.View.OnLongClickListener() {onLongClick: function(view, event) {try {
	print("test...");
	return true;
}catch(e) {
	showError();
}}});
Pms.btnLayout.addView(Pms.resetButton);

Pms.layout.addView(Pms.btnLayout);

Pms.mainWindow = new android.widget.PopupWindow(Pms.layout, dp(180) , dp(155), false);
Pms.mainWindow.setSplitTouchEnabled(true);
Pms.mainWindow.setOutsideTouchable(true);
//Pms.mainWindow.setTouchable(false);

Pms.mainDialog = new android.app.AlertDialog.Builder(ctx);
Pms.mainDialogScroll = new android.widget.ScrollView(ctx);
Pms.mainDialog.setTitle("Gear setting");
Pms.mainDialogLayout = new android.widget.LinearLayout(ctx);
Pms.mainDialogLayout.setOrientation(1);

function newLevel(str) {
	if(Level.getWorldDir() === null) {
		//MultiPlayer
		Pms.step = 0;
		Pms.floorStep = 0;
	}else {
		if(!_MAP_DIR().exists()) {
			_MAP_DIR().mkdir();
		}
		if(!_MAP_STEP_DATA().exists()) {
			_MAP_STEP_DATA().createNewFile();
		}
		Pms.step = parseInt(loadData(_MAP_STEP_DATA(), "STEP"));
		if(Pms.step + "" == "NaN") {
			Pms.step = 0;
			saveData(_MAP_STEP_DATA(), "STEP", 0);
		}
		Pms.floorStep = Math.floor(Pms.step);
		Pms.currentStepLock = parseInt(loadData(_MAP_STEP_DATA(), "CURRENT_STEP_LOCK"));
		if(Pms.currentStepLock + "" === "NaN") {
			Pms.currentStepLock = 0;
			saveData(_MAP_STEP_DATA(), "CURRENT_STEP_LOCK", Pms.currentStepLock);
		}
	}
	uiThread(function() {try {
		Pms.mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight());
		/*try {
			Pms.textView.setText((Pms.floorStep - Pms.currentStepLock) + "");
		}catch(e) {
		};*/
	}catch(e) {
		showError(e);
	}});
}

function leaveGame() {
	if(Pms.mainWindow != null) {
		uiThread(function() {try {
			Pms.mainWindow.dismiss();
			Pms.mainWindow = null;
		}catch(e) {
			showError(e);
		}});
	}
}

function modTick() {
	switch(Pms.mod) {
		case 0:
		case 1:
			var x = Entity.getVelX(Player.getEntity());
			var z = Entity.getVelZ(Player.getEntity());
			if(x !== 0| z !== 0) {
				Pms.step += Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
				if(Math.floor(Pms.step) !== Pms.floorStep) {
					Pms.floorStep = Math.floor(Pms.step);
					uiThread(function() {try {
						if(Pms.mod === 0) {
							Pms.textView.setText((Pms.floorStep - Pms.currentStepLock) + "");
						}else {
							Pms.textView.setText(Pms.floorStep + "");
						}
					}catch(e) {
						showError(e);
					}});
					if(Pms.saveCount++ > 200 && Level.getWorldDir() !== null) {
						Pms.saveCount = 0;
						thread(function() {
							saveData(_MAP_STEP_DATA(), "STEP", Pms.floorStep);
						}).start();
					}
				}
			}
			break;
		case 2:
			var time = new Date();
			uiThread(function() {try {
				Pms.textView.setText((time.getHours() < 12 ? "AM " : "PM ") + time.getHours()%12 + ":" + time.getMinutes());
			}catch(e) {
				showError(e);
			}});
			break;
	}
};

/**
TTS Test(Dark)
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get ();

var tts = new android.speech.tts.TextToSpeech (ctx, new android.speech.tts.TextToSpeech.OnInitListener ( {
	onInit: function (status) {
		tts.setLanguage (java.util.Locale.KOREAN);
	}
}));

tts.setPitch (float);
tts.setSpeechLanguage (float);
//속도

function chatHook (str) {
    tts.speak (str, android.speech.tts.TextToSpeech.QUEUE_FLUSH, null);
}
*/