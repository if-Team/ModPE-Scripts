const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const _DIR = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftpe/mods/Code_SOMI");
const _SKIN = new java.io.File(_DIR, "somi.part");
const _RENDERING = new java.io.File(_DIR, "somi.renderer");
const _AI = new java.io.File(_DIR, "somi.ai");
const _SOMI_DATA = new java.io.File(_DIR, "somiSetting.dat");
const _FONT = new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/mods/minecraft.ttf");
const _NO_MEDIA = new java.io.File(_DIR, ".nomedia");
const _MAP_ROOT = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftWorlds");
function _MAP_DIR() {return new java.io.File(_MAP_ROOT, Level.getWorldDir() + "/mod")};
function _MAP_FILE() {return new java.io.File(_MAP_DIR(), "somi.dat")};

var isOnline = false;
var scriptServerData = [];
var errorCount = 0;

if(!_FONT.exists()) {
	 _FONT.getParentFile().mkdirs();
	downloadFile(_FONT, "https://www.dropbox.com/s/y1o46b2jkbxwl3o/minecraft.ttf?dl=1");
}

loadServerData("https://github.com/if-Team/ModPE-Scripts/raw/master/SOMI/version");

toast(checkServerData("VERSION"));

if(!_SKIN.exists() || !_RENDERING.exists() || !_AI.exists() || !_SOMI_DATA.exists()) newStart();

try {
	var br = new java.io.BufferedReader(new java.io.FileReader(_AI));
	var len, content = "";
	while((len = br.readLine()) != null) {
		content += len;
	}
	br.close();
	eval(content);
}catch(e) {
	mcpeError("Somi A.I\nError", "A.I eval", e, "SOMI A.I이(가) 손상되었습니다\ngames/com.mojang/minecraftpe/mod/Code_SOMI\n\nError Line과 다음의 노란 메시지를 캡쳐해서 코드인사이드(CodeInside)에게 알려주세요");
}

try {
	if(checkServerData("VERSION_CODE") > versionCode) {
		downloadFile();
	}
}catch(e) {
}

if(_SKIN.exists()) copyFile(_SKIN, new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/net.zhuoweizhang.mcpelauncher.pro/files/textures/images/mob/somi.png"));

var codeHumanoid = Renderer.createHumanoidRenderer();
MyRenderType(codeHumanoid);

function MyRenderType(renderer) {try {
	var model=renderer.getModel();
	var head=model.getPart("head");
	var body=model.getPart("body");
	var rightArm=model.getPart("rightArm");
	var leftArm=model.getPart("leftArm");
	var rightLeg=model.getPart("rightLeg");
	var leftLeg=model.getPart("leftLeg");
	var br = new java.io.BufferedReader(new java.io.FileReader(_RENDERING));
	var len, content = "";
	while((len = br.readLine()) != null) {
		content += len;
	}
	br.close();
	eval(content);
}catch(e) {
	mcpeError("Somi A.I\nError", "renderer eval", e, "SOMI A.I이(가) 손상되었습니다\ngames/com.mojang/minecraftpe/mod/Code_SOMI\n\nError Line과 다음의 노란 메시지를 캡쳐해서 코드인사이드(CodeInside)에게 알려주세요");
}};

function newStart() {
	_DIR.delete();
	_DIR.mkdirs();
	_NO_MEDIA.createNewFile();
	_SOMI_DATA.createNewFile();
	if(!isOnline) {
		toast("No internet connection\ncan't download resource file");
		return;
	}
	if(checkServerData("MESSAGE_TYPE") == 3) {
		toast("[Warning]\nServer Blocked\n\n" + enterChange(checkServerData("MESSAGE")));
		return;
	}
	if(downloadFile(_SKIN, checkServerData("SKIN_DOWNLOAD_LINK"))) {
		saveData(_SOMI_DATA, "SKIN_VERSION", checkServerData("SKIN_VERSION"));
		saveData(_SOMI_DATA, "SKIN_VERSION_CODE", checkServerData("SKIN_VERSION_CODE"));
	}else toasts("[Download fail]\nsomi.part\n\nNo internet connection");
	if(downloadFile(_RENDERING, checkServerData("MODELING_DOWNLOAD_LINK"))) {
		saveData(_SOMI_DATA, "RENDERING_VERSION", checkServerData("RENDERING_VERSION"));
		saveData(_SOMI_DATA, "RENDERING_VERSION_CODE", checkServerData("MODELING_VERSION_CODE"));
	}else toasts("[Download fail]\nsomi.renderer\n\nNo internet connection");
	if(downloadFile(_AI, checkServerData("AI_DOWNLOAD_LINK"))) {
		saveData(_SOMI_DATA, "AI_VERSION", checkServerData("AI_VERSION"));
		saveData(_SOMI_DATA, "AI_VERSION_CODE", checkServerData("AI_VERSION_CODE"));
	}else toasts("[Download fail]\nsomi.ai\n\nNo internet connection");
};

function newLevel(str) {
	var type = parseInt(checkServerData("MESSAGE_TYPE"));
	if(type > 0) {
		var msg = checkServerData("MESSAGE") 
		if(msg !== loadData(_SOMI_DATA, "LAST_MESSAGE") || type !== 1) {
			clientMessage(enterChange(msg));
			saveData(_SOMI_DATA, "LAST_MESSAGE", msg);
		}
	}
	try{
		SomiNewLevel(str);
	}catch(e) {
	}
}

function leaveGame() {
	try{
		SomiLeaveGame();
	}catch(e) {
	}
}

function modTick() {
	try{
		SomiModTick();
	}catch(e) {
	}
}

function entityAddedHook(ent) {
	try{
		SomiEntityAddedHook(ent);
	}catch(e) {
	}
}

function entityRemovedHook(ent) {
	try{
		SomiEntityRemovedHook(ent);
	}catch(e) {
	}
}

function useItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage) {
	try{
		SomiUseItem(x, y, z, itemid, blockid, side, itemDamage, blockDamage);
	}catch(e) {
	}
}

function destroyBlock(x, y, z, side) {
	try{
		SomiDestroyBlock(x, y, z, side);
	}catch(e) {
	}
}

function startDestroyBlock(x, y, z, side) {
	try{
		SomiStartDestroyBlock(x, y, z, side);
	}catch(e) {
	}
}

function procCmd(str) {
	try{
		SomiProcCmd(str);
	}catch(e) {
	}
}

function attackHook(attacker, victim) {
	try{
		SomiAttackHook(attacker, victim);
	}catch(e) {
	}
}

function deathHook(attacker, victim) {
	try{
		SomiDeathHook(attacker, victim);
	}catch(e) {
	}
}

function blockEventHook(x, y, z, type, data) {
	try{
		SomiBlockEventHook(x, y, z, type, data);
	}catch(e) {
	}
	clientMessage("BE-"+type+" "+data);
}

function levelEventHook(player, eventType, x, y, z, data) {
	try{
		SomiLevelEventHook(player, eventType, x, y, z, data);
	}catch(e) {
	}
	clientMessage("LE-"+player+" "+eventType+" "+data);
}

function chatReceiveHook(str, sender) {
	try{
		SomiChatReceiveHook(str, sender);
	}catch(e) {
	}
}

function copyFile(file, dir){
	try{
		dir.getParentFile().mkdirs(); 
		bis = new java.io.BufferedInputStream(new java.io.FileInputStream(file));
		var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
		var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var count = 0;
		while((count = bis.read(buffer)) >= 0){
			bos.write(buffer, 0, count);
		}
		bis.close();
		bos.close();
	}catch(e){
		print(e);
	}
};

function loadServerData(scriptInfoUrl){
	try{
		var bufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(java.net.URL(scriptInfoUrl).openStream()));
		scriptServerData = [];
		var temp = "";
		while ((temp = bufferedReader.readLine()) != null) {
			scriptServerData.push(temp);;
		}
		bufferedReader.close();
		isOnline = true;
	}catch(e) {
		print(e);
		isOnline = false;
	}
}

function checkServerData(article){
	var temp = [];
	var temp2 = [];
	for each(var e in scriptServerData){
		temp.push(e.split(";")[0]);
		temp2.push(e.split(";")[1]);
	}
	for(var e in temp){
		if(temp[e] == article)
			return temp2[e];
	}
	return null;
}

function enterChange(str){
	try{
		var temp = str.split("¶"); 
	}catch(e){
		return str;
	}
	var temp2 = ""; 
	for(var e in temp){
		temp2 += temp[e]+"\n"
	}
	return temp2
};

function downloadFile(path, url) {
/*	new java.lang.Thread(new java.lang.Runnable({
		run: function(){*/
			try{
				var tempApiUrl = new java.net.URL(url);
				var tempApiUrlConn = tempApiUrl.openConnection();
				tempApiUrlConn.connect();
				var tempLength = tempApiUrlConn.getContentLength();
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
				//toast(e.lineNumber + " " + e);
				return false;
			}
/*		}
	})).start();*/
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
		if(tempReadString.split(":")[0] == article)
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
	outputStreamWriter.write(tempSaved + article + ":" + value);
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
	var tempSaved = "";
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
			}catch(e) {
				print(e);
			}
		}
	}
	));
};

function toasts(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_SHORT).show();
			}catch(e) {
				print(e);
			}
		}
	}
	));
};

var debuging = true;
function debug(a, b) {
	if(debuging) clientMessage(ChatColor.GRAY + "[Debug] " + a + " - " + b);
};

function debugT(a, b) {
	if(debuging) {
		ctx.runOnUiThread(new java.lang.Runnable( {
			run: function(){
				try{
					android.widget.Toast.makeText(ctx, "["+a+"]\n"+b, android.widget.Toast.LENGTH_SHORT).show();
				}catch(e) {
					print(e);
				}
			}
		}
		));
	}
};

var errorCount = 0;
function mcpeError(scriptName, codeNumber, errorMessage, addonMessage){ctx.runOnUiThread(new java.lang.Runnable({ run: function(){ try{
	function dip(dips) {
		return parseInt(dips  * ctx.getResources().getDisplayMetrics().density + 0.5);
	}
	function toast(str){ ctx.runOnUiThread(new java.lang.Runnable({ run: function(){ try{
		android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_LONG).show();
	}catch(e){
		//WTF?!
		//오류메시지 출력할 토스트가 고장이라니..
		print(e);
	}}}))};
	function createNinePatch(bitmap, x, y, xx, yy){
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
	var mcpeBG = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF, 34, 43, 14, 14), dip(32), dip(32), false);
	var mcpeBG9 = createNinePatch(mcpeBG, dip(12), dip(12), dip(22), dip(22));
	//타이틀바 나인패치
	var mcpeTitleBar = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeTG_BF, 150, 26, 14, 25), dip(28), dip(50), false);
	var mcpeTitleBar9 = createNinePatch(mcpeTitleBar, dip(8), dip(8), dip(20), dip(22));
	//종료 버튼 나인패치
	var mcpeExit = new android.graphics.Bitmap.createScaledBitmap(new android.graphics.Bitmap.createBitmap(mcpeSS_BF, 60, 0, 18, 18), dip(36), dip(36), false);
	var mcpeExit9 = createNinePatch(mcpeExit, dip(6), dip(6), dip(30), dip(30));
	var mcpeExitB = new android.graphics.drawable.BitmapDrawable(ctx.getResources(), mcpeExit);
	mcpeExitB.setAntiAlias(false);
	mcpeExitB.setGravity(android.view.Gravity.LEFT | android.view.Gravity.TOP);
	mcpeExitB.setTileModeXY(android.graphics.Shader.TileMode.valueOf("CLAMP"), android.graphics.Shader.TileMode.valueOf("CLAMP"));
	//종료 버튼(클릭) 나인패치
	var mcpeExitClick = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF, 78, 0, 18, 18), dip(36), dip(36), false);
	var mcpeExitClick9 = createNinePatch(mcpeExitClick, dip(6), dip(6), dip(32), dip(32));
	//버튼 나인패치
	var mcpeBtn = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF,8,32,8,8),dip(16),dip(16),false);
	var mcpeBtn9 = createNinePatch( mcpeBtn,dip(6),dip(4),dip(14),dip(14));
	//버튼(클릭) 나인패치
	var mcpeBtnClick = new android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(mcpeSS_BF,0,32,8,8),dip(16),dip(16),false);
	var mcpeBtnClick9 = createNinePatch( mcpeBtnClick,dip(4),dip(4),dip(12),dip(14));
	//메인 레이아웃
	var layout = new android.widget.LinearLayout(ctx);
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);
	layout.setBackgroundDrawable(mcpeBG9);
	//제목 레이아웃
	var layoutTitle = new android.widget.LinearLayout(ctx);
	layoutTitle.setOrientation(0);
	layoutTitle.setBackgroundDrawable(mcpeTitleBar9);
	layoutTitle.setGravity(android.view.Gravity.RIGHT | android.view.Gravity.TOP);
	layoutTitle.setPadding(dip(2), dip(2), dip(2), dip(2));
	//종료버튼 레이아웃
	layoutExit = new android.widget.RelativeLayout(ctx);
	layoutExit.setBackgroundDrawable(mcpeExit9);
	//제목 텍스트뷰
	var layoutMsg = new android.widget.TextView(ctx);
	layoutMsg.setText(scriptName+"("+(++errorCount)+")");
	layoutMsg.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dip(14));
		layoutMsg.setTextColor(android.graphics.Color.WHITE);
	//제목 텍스트뷰 - 그림자
	layoutMsg.setShadowLayer(1/Math.pow(10,10), dip(0.1*14), dip(0.1*14), android.graphics.Color.DKGRAY);
	//제목 텍스트뷰 - 폰트
	if(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf").exists()){
		layoutMsg.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
	}
	//제목 텍스트뷰 - 크기조절
	layoutMsg.setLayoutParams(new android.widget.LinearLayout.LayoutParams(dip(156), dip(50)));
	//제목 텍스트뷰 - 위치조절
	layoutMsg.setGravity(android.view.Gravity.CENTER | android.view.Gravity.CENTER);
	//종료 버튼
	var exitBtn = new android.widget.Button(ctx);
	exitBtn.setLayoutParams(android.widget.LinearLayout.LayoutParams(dip(32), dip(32)));
	exitBtn.setBackgroundColor(android.graphics.Color.argb(0,0,0,0));
	exitBtn.setOnClickListener(new android.view.View.OnClickListener({ onClick:
		function(dump){
			if(windowError != null){
				windowError.dismiss();
				windowError = null;
			}
		}
	}));
	try{
		exitBtn.setOnTouchListener( new android.view.View.OnTouchListener({ onTouch: 
			function(dump, event){
				switch(event.action){
					case android.view.MotionEvent.ACTION_DOWN:
						//버튼에 손댈때
						layoutExit.setBackgroundDrawable(mcpeExitClick9);
						break;
					case android.view.MotionEvent.ACTION_UP:
						//버튼에 손땔때
						layoutExit.setBackgroundDrawable(mcpeExit9);
						break;
				}
				return false;
			}
		}));
	}catch(e){
		toast("[Error]<Line:"+(e.lineNumber+1)+"> "+e);
	}
	//내용 스크롤 뷰
	var layoutManuScroll = new android.widget.ScrollView(ctx);
	layoutManuScroll.setLayoutParams(new android.widget.LinearLayout.LayoutParams(-1, dip(125)));
	//내용 라이너 레이아웃
	var layoutManuTop = new android.widget.LinearLayout(ctx);
	layoutManuTop.setOrientation(android.widget.LinearLayout.VERTICAL);
	layoutManuTop.setPadding(dip(8), dip(8), dip(8), dip(8));
	//내용 텍스트뷰
	var layoutInMsg = new android.widget.TextView(ctx);
	layoutInMsg.setText("[Error Line] "+codeNumber+"-"+errorMessage.lineNumber+"\n");
	layoutInMsg.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dip(10));
		layoutInMsg.setTextColor(android.graphics.Color.WHITE);
	//내용 텍스트뷰 - 그림자
	layoutInMsg.setShadowLayer(1/Math.pow(10,10), dip(0.1*10), dip(0.1*10), android.graphics.Color.DKGRAY);
	//내용 텍스트뷰 - 폰트
	if(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf").exists()){
		layoutInMsg.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
	}
	//경고내용 텍스트뷰
	var layoutIn2Msg = new android.widget.TextView(ctx);
	layoutIn2Msg.setText(errorMessage.toString());
	layoutIn2Msg.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dip(10));
	layoutIn2Msg.setTextColor(android.graphics.Color.YELLOW);
	//경고내용 텍스트뷰 - 그림자
	layoutIn2Msg.setShadowLayer(1/Math.pow(10,10), dip(0.1*10), dip(0.1*10), android.graphics.Color.DKGRAY);
	//경고내용 텍스트뷰 - 폰트
	if(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf").exists()){
		layoutIn2Msg.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
	}
	//추가내용 텍스트뷰
	var layoutIn3Msg = new android.widget.TextView(ctx);
	layoutIn3Msg.setText(addonMessage+"\n");
	layoutIn3Msg.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, dip(10));
	layoutIn3Msg.setTextColor(android.graphics.Color.WHITE);
	//추가내용 텍스트뷰 - 그림자
	layoutIn3Msg.setShadowLayer(1/Math.pow(10,10), dip(0.1*10), dip(0.1*10), android.graphics.Color.DKGRAY);
	//추가내용 텍스트뷰 - 폰트
	if(new java.io.File(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf").exists()){
		layoutIn3Msg.setTypeface(android.graphics.Typeface.createFromFile(android.os.Environment.getExternalStorageDirectory() + "/games/com.mojang/minecraftpe/Mods/minecraft.ttf"));
	}
	//레이아웃 조절
	layoutExit.addView(exitBtn);
	layoutTitle.addView(layoutMsg);
	layoutTitle.addView(layoutExit);
	layoutManuTop.addView(layoutInMsg);
	layoutManuTop.addView(layoutIn3Msg);
	layoutManuTop.addView(layoutIn2Msg);
	layoutManuScroll.addView(layoutManuTop);
	layout.addView(layoutTitle);
	layout.addView(layoutManuScroll);
	var windowError = new android.widget.PopupWindow(layout, dip(220) , dip(185) ,false);
	windowError.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER , 0, 0);
}catch(e){
	print("[Error]<line:"+(e.lineNumber)+"> "+e);
}}}))};