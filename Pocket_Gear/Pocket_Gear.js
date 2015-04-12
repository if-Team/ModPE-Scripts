var debugging = true;
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, ctx.getResources().getDisplayMetrics());
var _SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var _MAIN_MOD_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods");
var _MOD_DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods/Gear");
var _FONT = new java.io.File(_MAIN_MOD_DIR, "minecraft.ttf");
var _MOD_DATA = new java.io.File(_MOD_DIR, "data.json");
var _MOD_TEST = new java.io.File(_MOD_DIR, "test.txt");
function _MAP_DIR() {return new java.io.File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")};
function _MAP_STEP_DATA() {return new java.io.File(_MAP_DIR(), "gear.json")};


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
	var patch = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
	return patch;
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
};
function thread(fc) {
	return new java.lang.Thread(new java.lang.Runnable( {run: fc}))
};
function multiThread(fc) {
	if(Level.getWorldDir() !== null) {
		new java.lang.Thread(new java.lang.Runnable( {run: fc})).start()
	}else {
		uiThread(fc)
	}
};

if(!_FONT.exists()) {
	thread( function(){try {
		downloadFile(_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1");
	}catch(e) {
		showError(e);
	}}).start();
};

if(!_MOD_DIR.exists()) {
	_MOD_DIR.mkdirs();
}

if(!_MOD_DATA.exists()) {
	_MOD_DATA.createNewFile();
}

//Minecraft function
function newLevel(str) {
	Gear.newLevel(str);
}

function leaveGame() {
	Gear.leaveGame();
}

function modTick() {
	Gear.pedometerTick();
	Gear.textViewTick();
	Gear.autoSaveTick();
}

//PocketGear function
var Gear = {};
Gear.mainWindow = null;
Gear.saveCount = 0;
Gear.mod = 0;
//RECENT, OVERALL, CLOCK, INGAME_CLOCK
Gear.isRemote = false;
Gear.allowRemote = (loadData(_MOD_DATA, "ALLOW_REMOTE") == "true" ? true : false);
Gear.isWindowAlive = false;

Gear.layout = new android.widget.RelativeLayout(ctx);
Gear.layout.setBackgroundDrawable(mcpeBGT9);
Gear.layout.setPadding(dp(8), dp(8), dp(8), dp(8));

Gear.textView = new android.widget.TextView(ctx);
Gear.textView.setId(721);
Gear.textView_param = new android.widget.RelativeLayout.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.WRAP_CONTENT);
Gear.textView.setLayoutParams(Gear.textView_param);
Gear.textView.setBackgroundDrawable(mcpeTextView9);
Gear.textView.setPadding(dp(4), dp(4), dp(4), dp(4));
Gear.textView.setGravity(android.view.Gravity.RIGHT);
Gear.textView.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dp(10));
Gear.textView.setTextColor(android.graphics.Color.WHITE);
Gear.textView.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	Gear.textView.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
}
Gear.textView.setText("Loading...");
Gear.layout.addView(Gear.textView);

Gear.moveButton = new android.widget.Button(ctx);
Gear.moveButton.setId(722);
Gear.moveButton_param = new android.widget.RelativeLayout.LayoutParams(dp(42), dp(20));
Gear.moveButton_param.setMargins(0,dp(2),0,0);
Gear.moveButton_param.addRule(android.widget.RelativeLayout.BELOW, Gear.textView.getId());
Gear.moveButton.setLayoutParams(Gear.moveButton_param);
//Gear.moveButton.setAlpha(0);
Gear.moveButton.setPadding(dp(4),dp(1),0,0);
Gear.moveButton_drawable = new android.graphics.drawable.GradientDrawable();
Gear.moveButton_drawable.mutate().setColor(android.graphics.Color.rgb(0x3a, 0x39, 0x3a));
Gear.moveButton_drawable.setCornerRadius(10);
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
				Gear.mainWindow.update(Gear.Wx - dp(17), Gear.Wy - dp(30), Gear.mainWindow.getWidth(), Gear.mainWindow.getHeight(), true);
				debug("move" + Gear.Wx + " " + Gear.Wy);
			}catch(e) {
				showError(e);
			}});
			break;
		case android.view.MotionEvent.ACTION_UP:
			if(Level.getWorldDir() !== null) {
				saveData(_MOD_DATA, "WINDOW_X", Gear.Wx);
				saveData(_MOD_DATA, "WINDOW_Y", Gear.Wy);
			};
			break;
	}
	return true;
}}));
Gear.moveButton.setGravity(android.view.Gravity.CENTER);
Gear.moveButton.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dp(8));
Gear.moveButton.setTextColor(android.graphics.Color.WHITE);
Gear.moveButton.getPaint().setAntiAlias(false);
if(_FONT.exists()) {
	Gear.moveButton.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));}
Gear.moveButton.setText("Gear");
Gear.layout.addView(Gear.moveButton);

Gear.resetButton = new android.widget.Button(ctx);
Gear.resetButton.setId(723);
Gear.resetButton.setBackgroundDrawable(mcpeMiniBtn9);
Gear.resetButton_param = new android.widget.RelativeLayout.LayoutParams(dp(20), dp(20));
Gear.resetButton_param.setMargins(dp(4),dp(2),0,0);
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
Gear.resetButton.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
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
	}}});
Gear.resetButton.setOnLongClickListener(new android.view.View.OnLongClickListener() {onLongClick: function(view, event) {try {
	gearSetting();
	return true;
}catch(e) {
	showError();
}}});
Gear.layout.addView(Gear.resetButton);

Gear.mainWindow = new android.widget.PopupWindow(Gear.layout, dp(82) , dp(55), false);
Gear.mainWindow.setSplitTouchEnabled(true);
Gear.mainWindow.setOutsideTouchable(true);
//Gear.mainWindow.setTouchable(false);

function gearSetting() {uiThread(function() {try {
	Gear.mainDialog = new android.app.AlertDialog.Builder(ctx, 2); 
	Gear.mainDialog.setTitle("Gear setting");
	
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
	Gear.mod0.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
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
		}
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.textView.setTextColor(android.graphics.Color.WHITE);
		Gear.mod = 0;
		Gear.textView.setText((Gear.floorStep - Gear.currentStepLock) + "");
		if(Level.getWorldDir() !== null) {
			saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
		}
	}catch(e) {
		errorShow(e);
	}}});
	Gear.mainDialogLayout.addView(Gear.mod0);
	
	Gear.mod1 = new android.widget.Button(ctx);
	Gear.mod1.setText("Overall Pedometer");
	if(Gear.mod === 1) {
		Gear.mod1.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod1.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod1.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod1.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
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
		}
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.textView.setTextColor(android.graphics.Color.YELLOW);
		Gear.mod = 1;
		Gear.textView.setText(Gear.floorStep + "");
		if(Level.getWorldDir() !== null) {
			saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
		}
	}catch(e) {
		errorShow(e);
	}}});
	Gear.mainDialogLayout.addView(Gear.mod1);
	
	Gear.mod2 = new android.widget.Button(ctx);
	Gear.mod2.setText("Time");
	if(Gear.mod === 2) {
		Gear.mod2.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod2.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod2.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod2.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
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
		}
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.textView.setText("Loading...");
		Gear.textView.setTextColor(android.graphics.Color.WHITE);
		Gear.mod = 2;
		if(Level.getWorldDir() !== null) {
			saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
		}
	}catch(e) {
		errorShow(e);
	}}});
	Gear.mainDialogLayout.addView(Gear.mod2);
	
	Gear.mod3 = new android.widget.Button(ctx);
	Gear.mod3.setText("Minecraft Time");
	if(Gear.mod === 3) {
		Gear.mod3.setTextColor(android.graphics.Color.YELLOW);
	}else {
		Gear.mod3.setTextColor(android.graphics.Color.WHITE);
	}
	Gear.mod3.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.mod3.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
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
		}
		view.setTextColor(android.graphics.Color.YELLOW);
		Gear.textView.setText("Loading...");
		Gear.textView.setTextColor(android.graphics.Color.WHITE);
		Gear.mod = 3;
		if(Level.getWorldDir() !== null) {
			saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
		}
	}catch(e) {
		errorShow(e);
	}}});
	Gear.mainDialogLayout.addView(Gear.mod3);
	
	Gear.multiBtn = new android.widget.Button(ctx);
	Gear.multiBtn.setText("Visible in Multiplay");
	Gear.multiBtn.setTextColor(android.graphics.Color.WHITE);
	if(Gear.allowRemote) {
		Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLUE);
	}else {
		Gear.multiBtn.setBackgroundColor(android.graphics.Color.BLACK);
	}
	Gear.multiBtn.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
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
	}}});
	Gear.mainDialogLayout.addView(Gear.multiBtn);
	
	Gear.authorBtn = new android.widget.Button(ctx);
	Gear.authorBtn.setText("Info");
	Gear.authorBtn.setTextColor(android.graphics.Color.WHITE);
	Gear.authorBtn.setBackgroundColor(android.graphics.Color.BLACK);
	Gear.authorBtn.setOnClickListener(new android.view.View.OnClickListener() {onClick: function(view, event) {try {
		print("hello");
	}catch(e) {
		errorShow(e);
	}}});
	Gear.mainDialogLayout.addView(Gear.authorBtn);
	
	Gear.mainDialogScroll.addView(Gear.mainDialogLayout);
	
	Gear.mainDialog.setView(Gear.mainDialogScroll);
	Gear.mainDialog.create();
	Gear.mainDialog.show();
}catch(e) {
	showError(e);
}})};

uiThread(function() {try {
	if(!Gear.isWindowAlive && Gear.allowRemote) {
		Gear.mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((loadData(_MOD_DATA, "WINDOW_X") == null || loadData(_MOD_DATA, "WINDOW_X") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getWidth() - dp(82) : loadData(_MOD_DATA, "WINDOW_X") - dp(17)), ((loadData(_MOD_DATA, "WINDOW_Y") == null || loadData(_MOD_DATA, "WINDOW_Y") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getHeight() - dp(55) : loadData(_MOD_DATA, "WINDOW_Y") - dp(30)));
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
		Gear.mod = 0;
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
		Gear.mod = parseInt(loadData(_MAP_STEP_DATA(), "MOD"));
		if(Gear.mod + "" === "NaN") {
			Gear.mod = 0;
			if(Level.getWorldDir() !== null) {
				saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
			}
		}
		uiThread(function() {
			if(Gear.mod == 1) {
				 Gear.textView.setTextColor(android.graphics.Color.YELLOW);
			}else {
				Gear.textView.setTextColor(android.graphics.Color.WHITE);
			}
		});
	}
	
	uiThread(function() {try {
		if(!Gear.isWindowAlive) {
			Gear.mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT|android.view.Gravity.TOP, ((loadData(_MOD_DATA, "WINDOW_X") == null || loadData(_MOD_DATA, "WINDOW_X") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getWidth() - dp(82) : loadData(_MOD_DATA, "WINDOW_X") - dp(17)), ((loadData(_MOD_DATA, "WINDOW_Y") == null || loadData(_MOD_DATA, "WINDOW_Y") == "undefined") ? ctx.getWindowManager().getDefaultDisplay().getHeight() - dp(55) : loadData(_MOD_DATA, "WINDOW_Y") - dp(30)));
			Gear.isWindowAlive = true;
		}
	}catch(e) {
		showError(e);
	}});
}

Gear.leaveGame = function() {
	uiThread(function() {
		Gear.textView.setText("Loading...");
		Gear.textView.setTextColor(android.graphics.Color.WHITE);
	});
	Gear.isremote = false;
	if(Level.getWorldDir() !== null) {
		saveData(_MAP_STEP_DATA(), "STEP", Gear.floorStep);
		saveData(_MAP_STEP_DATA(), "MOD", Gear.mod);
	}
	if(Gear.mainWindow != null && !Gear.allowRemote && Gear.isWindowAlive) {
		uiThread(function() {try {
			Gear.mainWindow.dismiss();
			Gear.isWindowAlive = false;
		}catch(e) {
			showError(e);
		}});
	}
}

Gear.pedometerTick = function() {
	var x = Entity.getVelX(Player.getEntity());
	var z = Entity.getVelZ(Player.getEntity());
	if(x !== 0| z !== 0) {
		Gear.step += Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
		if(Math.floor(Gear.step) !== Gear.floorStep) {
			Gear.floorStep = Math.floor(Gear.step);
		}
	}
}

Gear.autoSaveTick = function() {
	if(++Gear.saveCount > 200 && Level.getWorldDir() !== null) {
		debug("Gear.autoSaveStep " + Gear.floorStep);
		Gear.saveCount = 0;
		thread(function() {
			saveData(_MAP_STEP_DATA(), "STEP", Gear.floorStep);
		}).start();
	}
}

Gear.textViewTick = function() {
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
			var time = new Date();
			var min = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
			uiThread(function() {try {
				Gear.textView.setText((time.getHours() < 12 ? "AM " : "PM ") + time.getHours()%12 + ":" + min);
			}catch(e) {
				showError(e);
			}});
			break;
		case 3:
			var time = Level.getTime() + 4800;
			var convert = Math.floor((time % 19200) * 1440 / 19200);
			var hour = Math.floor(convert / 60);
			var min = convert % 60;
			var minc = min < 10 ? "0" + min : min;
			uiThread(function() {try {
				Gear.textView.setText((hour < 12 ? "MAM " : "MPM ") + hour % 12 + ":" + minc);
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