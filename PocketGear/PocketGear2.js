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

const className = "PocketGear";
const VERSION = "Indev_2.0";
const VERSION_CODE = 200;

var TAG = "[" + className + " " + VERSION + "] ";

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
//화면상의 1픽셀
var PIXEL = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, ctx.getResources().getDisplayMetrics());
//사용할 파일 함수들 선언
var FILE_SD_CARD = android.os.Environment.getExternalStorageDirectory();
var FILE_MOD_DIR = new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftpe/mods");
var FILE_MAIN_DIR = new java.io.File(FILE_MOD_DIR, className);
var FILE_FONT = new java.io.File(FILE_MOD_DIR, "minecraft.ttf");
var FILE_MAIN_DATA = new java.io.File(FILE_MAIN_DIR, "setting.json");
var FILE_TEST_DATA = new java.io.File(FILE_MAIN_DIR, "lastLog.txt");
var FILE_NO_MEDIA = new java.io.File(FILE_MAIN_DIR, ".nomedia");
//현재 들어간 맵의 데이터 파일 위치
function FILE_MAP_DIR() {return new java.io.File(FILE_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function FILE_MAP_DATA() {return new java.io.File(FILE_MAP_DIR(), className + ".json")}
//저장된 데이터로부터 픽셀의 스케일(GUI크기)불러오기
var DIP = PIXEL * loadData(FILE_MAIN_DATA, "DIPS");
//저장된 데이터가 없으면 기본 스케일로 조절
if(DIP == null || DIP == 0){
	DIP = PIXEL;
}
//첫 실행시 저장 폴더 생성
if(!(FILE_MAIN_DIR.exists())) {
	FILE_MAIN_DIR.mkdirs();
	FILE_NO_MEDIA.createNewFile();
}
//첫 실행시 데이터 파일 생성 및 기본정보 입력
if(!(FILE_MAIN_DATA.exists())) {
	FILE_MAIN_DATA.createNewFile();
	saveData(FILE_MAIN_DATA, "DIPS", 1);
	saveData(FILE_MAIN_DATA, "WINDOW_X", ctx.getWindowManager().getDefaultDisplay().getWidth() - DIP*200);
	saveData(FILE_MAIN_DATA, "WINDOW_Y", 0);
	saveData(FILE_MAIN_DATA, "WINDOW_W", DIP*160);
	saveData(FILE_MAIN_DATA, "WINDOW_H", DIP*100);
	saveData(FILE_MAIN_DATA, "BOOT&PLAY", true);
}

//사용할 자바, 안드로이드 함수 선언
var Byte = java.lang.Byte;
var Int = java.lang.Integer;
var Float = java.lang.Float;
var Double = java.lang.Double;
var Boolean = java.lang.Boolean;
var Long = java.lang.Long;
var Short = java.lang.Short;
var Context = android.content.Context;
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
var ScrollView = android.widget.ScrollView;
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
var Typeface = android.graphics.Typeface;
var ArrayList = java.util.ArrayList;
var Calendar = java.util.Calendar;
var GregorianCalendar = java.util.GregorianCalendar;

//길거나 자주써서 적기 귀찮은것을 커스텀 함수로 선언
var c = {};
c.m = ViewGroup.LayoutParams.MATCH_PARENT;
c.w = ViewGroup.LayoutParams.WRAP_CONTENT;
c.a = java.lang.reflect.Array.newInstance;
c.r = RelativeLayout;
c.l = LinearLayout;
c.p = android.util.TypedValue.COMPLEX_UNIT_PX;



//비트맵 파일과 미디어 파일
var Assets = {};
//구버전용 - 마인크래프트 패키지 보안 무시
Assets.mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", Context.CONTEXT_IGNORE_SECURITY);
//구버전용 - 마인크래프트 패키지로부터 자료얻기
Assets.mcpe = Assets.mcpeCPC.getAssets();
//spritesheet.png 파일 (마인크래프트 메뉴 이미지)
try{
	//ModPE함수로 얻기
	Assets.mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//실패시 구버전용 - 마인크래프트로부터 직접 파일 얻기
	Assets.mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
//얻은 InputStream을 비트맵트로 변환
Assets.mcpeSS_BF = BitmapFactory.decodeStream(Assets.mcpeSS);
//touchgui.png 파일 이하 반복
try {
	Assets.mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	Assets.mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
Assets.mcpeTG_BF = BitmapFactory.decodeStream(Assets.mcpeTG);

//꽉찬 배경화면 이미지 부분 자르기 (spritesheet.png 이미지의 x:0, y:0 부터 x:16, y:16까지 자르기)
Assets.fullBackground_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 0, 0, 16, 16);
//크기를 알맞게 조절(x: 0~16, y: 0~16을 딱 두배의 크기인 32*PIXEL로 변환시키는게 가장 보기 좋음)
Assets.fullBackground = Bitmap.createScaledBitmap(Assets.fullBackground_raw, PIXEL*32, PIXEL*32, false);
//알맞게 조절된 이미지를 자유자재로 늘릴 수 있게 나인패치하기(위쪽 PIXEL*12 왼쪽 PIXEL*12 아래쪽 PIXEL*24 오른쪽 PIXEL*24 사이에 있는 부분만 늘이고 나머지 부분 유지)
//(function으로 만드는 이유는 적용할때마다 새로 나인패치 안하면 나인패치가 같은 레이아웃끼리 꼬입니다)
Assets.fullBackground_9 = function() {return ninePatch1(Assets.fullBackground, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)};

//일반 배경 이미지 (위와 같음)
Assets.background_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 34, 43, 14, 14);
Assets.background = Bitmap.createScaledBitmap(Assets.background_raw, PIXEL*28, PIXEL*28, false);
Assets.background_9 = function() {return ninePatch1(Assets.background, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)};

//타이틀 바 이미지 (특수한 경우)
//(이미지를 보면 알겠지만 이미지가 조각으로 이루어져 있음. 이 이미지들을 합치는 작업이 필요함)
//타이틀 바 왼쪽 조각 이미지 잘라오기
Assets.title_left_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 150, 26, 2, 25);
//타이틀 바 왼쪽 조각 이미지로 부터 얻을 픽셀을 저장할 자바 Int Array (사이즈 50) 생성 (얻어올 픽셀이 50개)
Assets.title_left_pixel = new c.a(Int.TYPE, 50);
//타이틀 바 오른쪽 조각 이미지 잘라오기
Assets.title_right_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 162, 26, 2, 25);
//타이틀 바 오른쪽 조각의 배열(위와 같음)
Assets.title_right_pixel = new c.a(Int.TYPE, 50);
//타이틀 바 중심 조각 이미지 잘라오기
Assets.title_center_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 153, 26, 8, 25);
//타이틀 바 중심 조각의 배열(위와 같음)
Assets.title_center_pixel = new c.a(Int.TYPE, 200);
//타이틀 바 아래쪽 조각 이미지 잘라오기
Assets.title_bottom_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 153, 52, 8, 3);
//타이틀 바 아래쪽 조각의 배열(위와 같음)
Assets.title_bottom_pixel = new c.a(Int.TYPE, 24);
//왼쪽 조각 배열에 픽셀 저장
Assets.title_left_raw.getPixels(Assets.title_left_pixel, 0, 2, 0, 0, 2, 25);
//오른쪽 조각 배열에 픽셀 저장
Assets.title_right_raw.getPixels(Assets.title_right_pixel, 0, 2, 0, 0, 2, 25);
//중심 조각 배열에 픽셀 저장
Assets.title_center_raw.getPixels(Assets.title_center_pixel, 0, 8, 0, 0, 8, 25);
//아래쪽 조각 배열에 픽셀 저장
Assets.title_bottom_raw.getPixels(Assets.title_bottom_pixel, 0, 8, 0, 0, 8, 3);
//mergeArray를 이용한 왼쪽 조각과 중심조각을 "수평으로" 이어붙이기 (자세한건 function margeArray 참조)
Assets.title_pixel = margeArray(Assets.title_left_pixel, Assets.title_center_pixel, "HORIZONTAL", 2, 25, 8, 25, null);
//mergeArray를 이용한 좀전에 이어붙인 조각과 오른쪽 조각을 "수평으로" 이어붙이기 (자세한건 function margeArray 참조)
Assets.title_pixel = margeArray(Assets.title_pixel, Assets.title_right_pixel, "HORIZONTAL", 10, 25, 2, 25, null);
//mergeArray를 이용한 좀전에 이어붙인 조각과 아래쪽 조각을 "수직으로" 이어붙이기 (자세한건 function margeArray 참조)
Assets.title_pixel = margeArray(Assets.title_pixel, Assets.title_bottom_pixel, "VERTICAL", 12, 25, 8, 3, null);
//얻은 픽셀의 배열을 저장할 비트맵 생성
Assets.title_raw = Bitmap.createBitmap(12, 28, Bitmap.Config.ARGB_8888);
//픽셀 지정
Assets.title_raw.setPixels(Assets.title_pixel, 0, 12, 0, 0, 12, 28);
//알맞는 크기로 조절
Assets.title = Bitmap.createScaledBitmap(Assets.title_raw, PIXEL*24, PIXEL*56, false);
//원하는 만큼 늘릴 수 있게 나인패치
Assets.title_9 = function() {
	return ninePatch1(Assets.title, PIXEL*5, PIXEL*5, PIXEL*46, PIXEL*20);
};

//종료 버튼 이미지
Assets.exit_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 60, 0, 18, 18);
Assets.exit = Bitmap.createScaledBitmap(Assets.exit_raw, 18*PIXEL, 18*PIXEL, false);
Assets.exit_9 = function() {return ninePatch1(Assets.exit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)};

//종료 버튼(클릭시) 이미지
Assets.exitClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 78, 0, 18, 18);
Assets.exitClick = Bitmap.createScaledBitmap(Assets.exitClick_raw, PIXEL*36, PIXEL*36, false);
Assets.exitClick_9 = function() {return ninePatch1(Assets.exitClick, PIXEL*6, PIXEL*6, PIXEL*32, PIXEL*32)};

//버튼 이미지
Assets.button_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,32,8,8);
Assets.button = Bitmap.createScaledBitmap(Assets.button_raw, PIXEL*16, PIXEL*16, false);
Assets.button_9 = function() {return ninePatch1(Assets.button, PIXEL*6, PIXEL*4, PIXEL*14, PIXEL*14)};

//버튼(클릭시) 이미지
Assets.buttonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,8);
Assets.buttonClick = Bitmap.createScaledBitmap(Assets.buttonClick_raw, PIXEL*16, PIXEL*16, false);
Assets.buttonClick_9 = function() {return ninePatch1(Assets.buttonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*14)};

//사용금지. 이미지 맞지 않음
Assets.miniButton_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,33,8,7);
Assets.miniButton = Bitmap.createScaledBitmap(Assets.miniButton_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButton_9 = function() {return ninePatch1(Assets.miniButton, PIXEL*2, PIXEL*2, PIXEL*12, PIXEL*14)};

//사용금지
Assets.miniButtonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,7);
Assets.miniButtonClick = Bitmap.createScaledBitmap(Assets.miniButtonClick_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButtonClick_9 = function() {return ninePatch1(Assets.miniButtonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*12)};

//텍스트뷰 배경 이미지
//마인크래프트에서 불러오는 파일에는 해당이미지가 없으므로 직접 이미지를 만듭니다
//사용할 색 지정
var b = Color.parseColor("#6b6163");
var i = Color.parseColor("#3a393a");
//직접 픽셀 그리기 (지금은 6x6 사이즈)
Assets.textView_pixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
//픽셀을 지정할 비트맵 생성
Assets.textView_raw = Bitmap.createBitmap(6, 6, Bitmap.Config.ARGB_8888);
//픽셀 지정
Assets.textView_raw.setPixels(Assets.textView_pixel, 0, 6, 0, 0, 6, 6);
//알맞게 크기 조절
Assets.textView = Bitmap.createScaledBitmap(Assets.textView_raw, PIXEL*6, PIXEL*6, false);
//나인패치
Assets.textView_9 = function() {return ninePatch1(Assets.textView, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4)};

//포켓기어용 버튼 이미지(위와 같음)
//(0은 빈(투명한)부분)
var w = Color.WHITE;
Assets.gearBtn_pixel = [
w,w,w,w,0,0,w,w,w,w,
w,w,w,w,0,0,w,w,w,w,
w,w,0,0,0,0,0,0,w,w,
w,w,0,0,0,0,0,0,w,w,
w,w,w,w,0,0,w,w,w,w,
w,w,w,w,0,0,w,w,w,w
];
Assets.gearBtn_raw = Bitmap.createBitmap(10, 6, Bitmap.Config.ARGB_8888);
Assets.gearBtn_raw.setPixels(Assets.gearBtn_pixel, 0, 10, 0, 0, 10, 6);
Assets.gearBtn = Bitmap.createScaledBitmap(Assets.gearBtn_raw, PIXEL*10, PIXEL*6, false);
Assets.gearBtn_9 = function() {return ninePatch1(Assets.gearBtn, PIXEL*3, PIXEL*5, PIXEL*4, PIXEL*6)};

//포켓기어용 버튼(클릭시) 이미지(위와 같음)
var w = Color.YELLOW;
Assets.gearBtnC_pixel = [
w,w,w,w,0,0,w,w,w,w,
w,w,w,w,0,0,w,w,w,w,
w,w,0,0,0,0,0,0,w,w,
w,w,0,0,0,0,0,0,w,w,
w,w,w,w,0,0,w,w,w,w,
w,w,w,w,0,0,w,w,w,w
];
Assets.gearBtnC_raw = Bitmap.createBitmap(10, 6, Bitmap.Config.ARGB_8888);
Assets.gearBtnC_raw.setPixels(Assets.gearBtnC_pixel, 0, 10, 0, 0, 10, 6);
Assets.gearBtnC = Bitmap.createScaledBitmap(Assets.gearBtnC_raw, PIXEL*10, PIXEL*6, false);
Assets.gearBtnC_9 = function() {return ninePatch1(Assets.gearBtnC, PIXEL*3, PIXEL*5, PIXEL*4, PIXEL*6)};

//마인크래프트 글씨체의 텍스트뷰 생성
function mcpeText(size, text, shadow) {
	var tv = new TextView(ctx);
	//롤리팝버전에서 글자 테마가 강제 설정되는거 무시
	tv.setTransformationMethod(null);
	tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(!shadow) {
	}else {
		tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	}
	tv.setTextColor(Color.WHITE);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*size);
	//폰트 파일이 있을때만 설정
	if(FILE_FONT.exists()) {
		tv.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	tv.setPadding(0, 0, 0, 0);
	tv.setLayoutParams(new c.l.LayoutParams(c.w, c.w));
	tv.setText(text);
	return tv;
}

function mcpeBtn() {
	
}

/**
 * Battery Checker
 *
 * @since 2015-04
 * @author CodeInside
 */

//휴대폰 배터리 정보
var ifilter = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);

Battery = {};

Battery.isCharging = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
	return status == android.os.BatteryManager.BATTERY_STATUS_CHARGING;
};

Battery.isFullCharging = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var status = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_STATUS, -1);
	return status == android.os.BatteryManager.BATTERY_STATUS_FULL;
};
	
Battery.plugType = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var chargePlug = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_PLUGGED, -1);
	if(chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_USB) {
		return "USB"
	}else if(chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_AC) {
		return "AC"
	}else if(chargePlug == android.os.BatteryManager.BATTERY_PLUGGED_WIRELESS) {
		return "WIRELESS"
	}else {
		return "UNKNOWN"
	}
};

Battery.level = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var level = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
	var scale = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_SCALE, -1);
	return Math.round(level / scale * 100);
};

Battery.temp = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var temp = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TEMPERATURE, -1);
	return Math.round(temp) / 10;
};

Battery.volt = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var volt = batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_VOLTAGE, -1);
	return volt / 1000;
};

Battery.tec = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	return batteryStatus.getIntExtra(android.os.BatteryManager.EXTRA_TECHNOLOGY, -1);
};

Battery.health = function() {
	var batteryStatus = ctx.registerReceiver(null, ifilter);
	var health = batteryStatus.getIntExtra(android.os.BatteryManager. EXTRA_HEALTH, -1);
	switch(health) {
		case android.os.BatteryManager.BATTERY_HEALTH_GOOD:
			return 0;//normal
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_DEAD:
			return 1;//battery life span is nearly end
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_COLD:
			return 2;//battery is too cold for work
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_OVERHEAT:
			return 3;//battery burning XD
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_OVER_VOLTAGE:
			return 4;//battery voltage is too high
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_UNKNOWNLURE:
			return 5;//unKnow!
			break;
		case android.os.BatteryManager.BATTERY_HEALTH_UNSPECIFIED_FAILURE:
			return 6;//I don't know why fail but something wrong.
			break;
		default:
			return -1;//i can't read it maybe your phone API version is higher
	}
};



//선언
var Gear = {};
Gear.onMap = false;
Gear.isRemote = false;
Gear.allowRemote = true;
Gear.windowAlive = false;
Gear.exit_q = false;
Gear.uiDelay = 0;
Gear.lastMill = java.lang.System.currentTimeMillis();
Gear.lastMillBuffer = 0;
Gear.currentGear = null;
Gear.thread = {isAlive: false};
Gear.loading = false;
Gear.onChargeMill = null;
Gear.onChargeLevel = null;
Gear.step = 0;
Gear.stepLock = 0;
Gear.autoSaveTick = 0;

//modTick과는 별도로 움직이는 "비동기 Thread" 생성
function AsynchronousModTick() {
	Gear.thread = new Thread(new Runnable({run: function() {try { //noinspection InfiniteLoopJS
		while(true) {
		if(Gear.uiDelay > 0) {
			Gear.uiDelay--;
		}
		/*
		var m = java.lang.System.currentTimeMillis();
		Gear.lastMillBuffer += (m - Gear.lastMill) - 50;
		Gear.lastMill = m;
		if(--Gear.lastMillBuffer < 0) {
			Gear.lastMillBuffer = 0;
		}
		if(Gear.lastMillBuffer > 1) {
			Gear.lastMillBuffer -= Math.ceil(Gear.lastMillBuffer/5);
			uiThread(function() {try {
				Gear.hdd_draw.mutate().setColor(Color.parseColor("#ffaf30"));
			}catch(e) {
			}});
		}else {
			uiThread(function() {try {
				Gear.hdd_draw.mutate().setColor(Color.parseColor("#000000"));
			}catch(e) {
			}});
		}
		*/
		
		if(Gear.currentGear !== null && Gear.loading) {try {
			Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].getTick();
			var level = Battery.level();
			var c = new GregorianCalendar();
			var am_pm = c.get(Calendar.AM_PM) === Calendar.AM ? "오전" : "오후";
			var hour = c.get(Calendar.HOUR);
			var min = c.get(Calendar.MINUTE);
			min = min < 10 ? "0" + min : min;
			uiThread(function() {try {
				Gear.info.setText(level + "%");
				Gear.clock1.setText(am_pm);
				Gear.clock2.setText(hour + ":" + min);
				if(level <= 5) {
					Gear.info.setTextColor(Color.RED);
				}else if(level <= 15) {
					Gear.info.setTextColor(Color.YELLOW);
				}else {
					Gear.info.setTextColor(Color.WHITE);
				}
			}catch(e) {
				showError(e);
			}});
		}catch(e) {
			toast("[ERROR] " + Gear.currentGear.toString() + "-" + Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].toString());
			showError(e);
		}}
		
		sleep(50);
	}}catch(e) {
		showError(e);
	}}}));
	Gear.thread.start();
}
AsynchronousModTick();

//기어를 모아두는 그룹
function GearGroup(name) {
	this.name = name;
	//{name: <string>, layoutLoad: <function>, child: <layout> header: <function>, tick: <function>, finish: <function>}
	this.menus = [];
	this.currentIndex = 0;
}

GearGroup.prototype = {
	toString: function() {
		return "[" + this.name + " group]";
	},
	
	getName: function() {
		return this.name;
	},
	
	getMenus: function() {
		return this.menus;
	},
	
	addMenu: function(menu) {
		if(!(menu instanceof GearMenu)){
			throw new TypeError("The parameter 'menu' must be instance of GearMenu.");
		}

		if(this.getIndexByMenu(menu) >= 0){
			throw new ReferenceError("The menu '" + menu.toString() + "' is already in Gear.");
		}

		this.getMenus().push(menu);
	},
	
	changeMenu: function(index) {try {
		if(isNaN(index) || index === null) {
			index = 0;
		}
		Gear.loading = false;
		try {
			Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].getFinish();
		}catch(e) {}
		Gear.currentGear.currentIndex = index;
		var e = Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].getLayout();
		if(e === false) {
			msg("[ERROR] " + Gear.toString() + "-" + Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].toString() + " layout load fail");
			return;
		}
		uiThread(function() {try {
			Gear.frame.removeAllViews();
			Gear.frame.addView(e);
		}catch(e) {
			showError(e);
		}});
		Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].getHeader();
		Gear.loading = true;
	}catch(e) {
		showError(e);
		toast("[ERROR] " + Gear.currentGear.toString() + "-" + Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].toString());
	}},
	
	getCurrentIndex: function() {
		return this.currentIndex;
	},
	
	getCurrentMenu: function() {
		return this.getMenus()[this.getCurrentIndex()];
	},
	
	getMenuByIndex: function(index) {
		if(this.menus.length <= index) {
			throw new ReferenceError(index + "is undefined index of " + this.name + " gear");
		}
		return this.menus[index];
	},
	
	getMenuByName: function(name) {
		for(var e = 0; e < this.menus.length; e++) {
			if(this.menus[e].name === name) {
				return this.menus[e];
			}
		}
		throw new ReferenceError("The name '" + name + "' is not in " + this.name + " gear");
	},
	
	getIndexByMenu: function(menu) {
		for(var e = 0; e < this.getMenus().length; e++) {
			if(menu == this.getMenus()[e]) {
				return e;
			}
		}
		return -1;
	},
	
	getIndexByName: function(name) {
		for(var e = 0; e < this.getMenus().length; e++) {
			if(name == this.getMenus()[e].name) {
				return e;
			}
		}
		return -1;
	}
};

//기어그룹에 들어가는 각각의 기능이 담긴 기어메뉴
function GearMenu(name) {
	this.name = name;
	this.header = function() {};
	this.tick = function() {};
	this.finish = function() {};
	this.layout = null;
}

GearMenu.prototype = {
	toString: function() {
		return "[" + this.name + " menu]";
	},
	
	getName: function() {
		return this.name;
	},
	
	isEqual: function(menu) {
		return (menu instanceof GearMenu) && (this.name === menu.name);
	},
	
	getLayout: function() {
		return this.layout();
	},
	
	getHeader: function() {
		this.header();
	},
	
	getTick: function() {
		this.tick();
	},
	
	getFinish: function() {
		this.finish();
	},
	
	setLayout: function(func) {
		this.layout = func;
	},
	
	setHeader: function(func) {
		this.header = func;
	},
	
	setTick: function(func) {
		this.tick = func;
	},
	
	setFinish: function(func) {
		this.finish = func;
	}
};

//기어메뉴로 부터 "Main"이라는 메뉴를 생성
Gear.menu_main = new GearMenu("Main");
//레이아웃 설정
Gear.menu_main.setLayout(function() {try {
	var l = new c.l(ctx);
	l.setOrientation(c.l.VERTICAL);
	l.setGravity(Gravity.CENTER);
	
	Gear.menu_ctn0 = new Button(ctx);
	Gear.menu_ctn0.setTransformationMethod(null);
	Gear.menu_ctn0.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
	Gear.menu_ctn0.setPadding(0,0,0,0);
	Gear.menu_ctn0.setText(Gear.currentGear.getName());
	Gear.menu_ctn0.setTextSize(c.p, DIP*10);
	Gear.menu_ctn0.setTextColor(Color.BLACK);
	if(FILE_FONT.exists()) {
		Gear.menu_ctn0.setTypeface(Typeface.createFromFile(FILE_FONT));
	}
	Gear.menu_ctn0.setBackgroundColor(Color.WHITE);
	Gear.menu_ctn0_p = new c.l.LayoutParams(DIP*100, DIP*16);
	Gear.menu_ctn0_p.setMargins(0, DIP*2, 0, 0);
	Gear.menu_ctn0.setLayoutParams(Gear.menu_ctn0_p);
	l.addView(Gear.menu_ctn0);
	
	//현재 설정된 기어그룹에 있는 메뉴들로 전환하는 버튼들을 자동으로 추가
	for(var e = 1; e < Gear.currentGear.getMenus().length; e++) {
		var b = new Button(ctx);
		b.setTransformationMethod(null);
		b.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
		b.setPadding(0,0,0,0);
		b.setText(Gear.currentGear.getMenus()[e].getName());
		b.setTextSize(c.p, DIP*10);
		b.setTextColor(Color.WHITE);
		if(FILE_FONT.exists()) {
			b.setTypeface(Typeface.createFromFile(FILE_FONT));
		}
		b.setBackgroundDrawable(Assets.gearBtn_9());
		b_p = new c.l.LayoutParams(DIP*100, DIP*16);
		b_p.setMargins(0, DIP*2, 0, 0);
		b.setLayoutParams(b_p);
		b.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
			switch(event.action) {
				//클릭할때 버튼의 이미지를 변경
				case MotionEvent.ACTION_DOWN:
				view.setBackgroundDrawable(Assets.gearBtnC_9());
				break;
				//클릭하고 나서 버튼의 이미지를 원래대로
				case MotionEvent.ACTION_UP:
				case MotionEvent.ACTION_CANCEL:
				view.setBackgroundDrawable(Assets.gearBtn_9());
				break;
			}
			return false;
		}catch(e) {
			showError(e);
			return false;
		}}}));
		b.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
			//클릭시 메뉴전환
			Gear.currentGear.changeMenu(Gear.currentGear.getIndexByName(view.getText()));
			saveData(FILE_MAIN_DATA, Gear.currentGear.getName(), Gear.currentGear.getCurrentIndex());
		}catch(e) {
			showError(e);
		}}}));
		l.addView(b);
	}
	
	return l;
}catch(e) {
	showError(e);
	return false;
}});

//시계 기어메뉴 생성
Gear.menu_clock = new GearMenu("Clock");
//레이아웃 지정
Gear.menu_clock.setLayout(function() {try {
	var l = new c.l(ctx);
	l.setOrientation(c.l.VERTICAL);
	l.setGravity(Gravity.CENTER);
	
	Gear.menu_ctn1 = new Button(ctx);
	Gear.menu_ctn1.setTransformationMethod(null);
	Gear.menu_ctn1.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	Gear.menu_ctn1.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	Gear.menu_ctn1.setTextColor(Color.WHITE);
	Gear.menu_ctn1.setTextSize(c.p, DIP*10);
	if(FILE_FONT.exists()) {
		Gear.menu_ctn1.setTypeface(Typeface.createFromFile(FILE_FONT));
	}
	Gear.menu_ctn1.setPadding(0, 0, 0, 0);
	Gear.menu_ctn1.setText("loading...");
	Gear.menu_ctn1.setBackgroundDrawable(Assets.gearBtn_9());
	Gear.menu_ctn1_p = new c.l.LayoutParams(DIP*100, DIP*16);
	Gear.menu_ctn1_p.setMargins(0, DIP*2, 0, DIP*2);
	Gear.menu_ctn1.setLayoutParams(Gear.menu_ctn1_p);
	//l.addView(Gear.menu_ctn1);
	
	var l2 = c.l(ctx);
	l2.setOrientation(c.l.HORIZONTAL);
	l2.setGravity(Gravity.BOTTOM|Gravity.CENTER);
	
	Gear.menu_ctn2 = mcpeText(10, "--");
	Gear.menu_ctn2_p = c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn2_p.setMargins(0, 0, DIP*2, 0);
	Gear.menu_ctn2.setLayoutParams(Gear.menu_ctn2_p);
	l2.addView(Gear.menu_ctn2);
	
	Gear.menu_ctn3 = mcpeText(16, "--:--:--");
	l2.addView(Gear.menu_ctn3);
	l.addView(l2);
	
	Gear.menu_ctn4 = mcpeText(10, "---- -- -- -");
	Gear.menu_ctn4_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn4_p.setMargins(0, DIP*2, 0, 0);
	Gear.menu_ctn4.setLayoutParams(Gear.menu_ctn4_p);
	l.addView(Gear.menu_ctn4);
	
	return l;
}catch(e) {
	showError(e);
	return false;
}});

//이 기어메뉴가 틱마다 할 행동지정
Gear.menu_clock.setTick(function() {
	var c = new GregorianCalendar();
	var am_pm = c.get(Calendar.AM_PM) === Calendar.AM ? "오전" : "오후";
	var hour = c.get(Calendar.HOUR);
	hour = hour < 10 ? "0" + hour : hour;
	var min = c.get(Calendar.MINUTE);
	min = min < 10 ? "0" + min : min;
	var sec = c.get(Calendar.SECOND);
	sec = sec < 10 ? "0" + sec : sec;
	var date = c.get(Calendar.DATE);
	var month = c.get(Calendar.MONTH) + 1;
	var year = c.get(Calendar.YEAR);
	var day;
	switch(c.get(Calendar.DAY_OF_WEEK)) {
		case Calendar.SUNDAY:
		day = "일";
		break;
		case Calendar.MONDAY:
		day = "월";
		break;
		case Calendar.TUESDAY:
		day = "화";
		break;
		case Calendar.WEDNESDAY:
		day = "수";
		break;
		case Calendar.THURSDAY:
		day = "목";
		break;
		case Calendar.FRIDAY:
		day = "금";
		break;
		case Calendar.SATURDAY:
		day = "토";
		break;
		default:
		day = "unKnown";
	}
	uiThread(function() {try {
		Gear.menu_ctn1.setText("loading...");
		Gear.menu_ctn2.setText(am_pm);
		Gear.menu_ctn3.setText(hour + ":" + min + ":" + sec);
		Gear.menu_ctn4.setText(year + "-" + month + "-" + date + " " + day);
	}catch(e) {
		showError(e);
	}});
});

//배터리 기어메뉴 생성
Gear.menu_battery = new GearMenu("Battery");
//기어메뉴에 레이아웃 지정
Gear.menu_battery.setLayout(function() {try {
	var l = c.l(ctx);
	l.setOrientation(c.l.VERTICAL);
	l.setGravity(Gravity.CENTER);
	
	var l2 = c.l(ctx);
	l2.setOrientation(c.l.HORIZONTAL);
	l2.setGravity(Gravity.BOTTOM|Gravity.CENTER);
	
	l2_p = new c.l.LayoutParams(c.w, c.w);
	l2_p.setMargins(0, DIP*2, 0, DIP*2);
	l2.setLayoutParams(l2_p);
	
	var l3 = c.l(ctx);
	l3.setOrientation(c.l.HORIZONTAL);
	l3.setGravity(Gravity.BOTTOM|Gravity.CENTER);
	
	l3_p = new c.l.LayoutParams(c.w, c.w);
	l3_p.setMargins(0, 0, DIP*4, 0);
	l3.setLayoutParams(l3_p);
	
	Gear.ctn1 = mcpeText(24, "--");
	l3.addView(Gear.ctn1);
	Gear.ctn2 = mcpeText(12, "%");
	l3.addView(Gear.ctn2);
	
	l2.addView(l3);
	
	var l4 = c.l(ctx);
	l4.setOrientation(c.l.VERTICAL);
	
	Gear.ctn3 = mcpeText(10, "--.-°C");
	l4.addView(Gear.ctn3);
	Gear.ctn4 = mcpeText(10, "--.- V");
	l4.addView(Gear.ctn4);
	
	l2.addView(l4);
	
	l.addView(l2);
	
	Gear.ctn5 = mcpeText(10, "loading...");
	l.addView(Gear.ctn5);
	
	Gear.ctn6 = mcpeText(10, "loading...");
	Gear.ctn6.setTextColor(Color.YELLOW);
	l.addView(Gear.ctn6);
	
	return l;
}catch(e) {
	showError(e);
	return false;
}});

//기어메뉴가 틱마다 할 행동을 지정
Gear.menu_battery.setTick(function() {
	var level = Battery.level() + "";
	var temp = Battery.temp() + "°C";
	var volt = Battery.volt() + "V";
	var TAG = "<" + Battery.plugType() + "> ";
	var charge = "";
	if(Battery.isCharging()) {
		if(Gear.onChargeMill === null) {
			Gear.onChargeMill = Date.now();
			Gear.onChargeLevel = Battery.level();
		}
		if(Battery.isFullCharging()) {
			charge = TAG + "충전 완료";
		}else if(Battery.level == 100) {
			charge = TAG + "충전중...\n(잠시후 완료)";
		}else if(Gear.onChargeLevel < Battery.level()) {
			var sec = Math.ceil((100 - Battery.level()) * (((Date.now() - Gear.onChargeMill) / 1000) / (Battery.level() - Gear.onChargeLevel)));
			var min = Math.floor(sec/60);
			var hour = Math.floor(min/60);
			min %= 60;
			hour %= 60;
			charge = TAG + "충전중...\n(" + hour + "시간 " + min + "분 남음)";
		}else if(Gear.onChargeLevel > Battery.level()) {
			charge = TAG + "역충전 경고";
			Gear.onChargeMill = null;
		}else {
			charge = TAG + "충전중...";
		}
	}else {
		Gear.onChargeMill = null;
		Gear.onChargeLevel = null;
	}
	uiThread(function() {try {
		Gear.ctn1.setText(level);
		Gear.ctn3.setText(temp);
		Gear.ctn4.setText(volt);
		switch(Battery.health()) {
			case 0:
			Gear.ctn5.setText("배터리 정상");
			Gear.ctn5.setTextColor(Color.WHITE);
			break;
			case 1:
			Gear.ctn5.setText("배터리 수명이 끝남");
			Gear.ctn5.setTextColor(Color.GRAY);
			break;
			case 2:
			Gear.ctn5.setText("배터리 온도 매우낮음");
			Gear.ctn5.setTextColor(Color.parseColor("#2050ff"));
			break;
			case 3:
			Gear.ctn5.setText("배터리 과열 경고");
			Gear.ctn5.setTextColor(Color.parseColor("#ff8020"));
			break;
			case 4:
			Gear.ctn5.setText("배터리 과전압 경고");
			Gear.ctn5.setTextColor(Color.parseColor("#ff7900"));
			break;
			default:
			Gear.ctn5.setText("알수 없는 오류");
			Gear.ctn5.setTextColor(Color.GRAY);
		}
		Gear.ctn6.setText(charge);
	}catch(e) {
		showError(e);
	}});
});

//마인크래프트 시계 기어메뉴
Gear.menu_clockM = new GearMenu("Mine Clock");
//기어메뉴의 레이아웃
Gear.menu_clockM.setLayout(function() {try {
	var l = new c.l(ctx);
	l.setOrientation(c.l.VERTICAL);
	l.setGravity(Gravity.CENTER);
	
	var l2 = c.l(ctx);
	l2.setOrientation(c.l.HORIZONTAL);
	l2.setGravity(Gravity.BOTTOM|Gravity.CENTER);
	var l2_p = new c.l.LayoutParams(c.w, c.w);
	l2_p.setMargins(0, DIP*2, 0, 0);
	l2.setLayoutParams(l2_p);
	
	Gear.menu_ctn2 = mcpeText(10, "--");
	Gear.menu_ctn2_p = c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn2_p.setMargins(0, 0, DIP*2, 0);
	Gear.menu_ctn2.setLayoutParams(Gear.menu_ctn2_p);
	l2.addView(Gear.menu_ctn2);
	
	Gear.menu_ctn3 = mcpeText(16, "--:--");
	l2.addView(Gear.menu_ctn3);
	l.addView(l2);
	
	Gear.menu_ctn4 = mcpeText(10, "");
	Gear.menu_ctn4.setPadding(DIP*2, DIP*2, DIP*2, DIP*2);
	Gear.menu_ctn4.setBackgroundColor(Color.WHITE);
	Gear.menu_ctn4.setTextColor(Color.BLACK);
	Gear.menu_ctn4_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn4_p.setMargins(0, DIP*2, 0, 0);
	Gear.menu_ctn4.setLayoutParams(Gear.menu_ctn4_p);
	l.addView(Gear.menu_ctn4);
	
	return l;
}catch(e) {
	showError(e);
	return false;
}});

//기어메뉴가 틱마다 할 행동 지정
Gear.menu_clockM.setTick(function() {
	var time = Level.getTime() + 4800;
	var convert = Math.floor((time % 19200) * 1440 / 19200);
	var hour = Math.floor(convert / 60);
	var am_pm = hour < 12 ? "오전" : "오후";
	hour %= 12;
	var min = convert % 60;
	min = min < 10 ? "0" + min : min;
	var day = Math.floor(time / 19200);
	
	uiThread(function() {try {
		Gear.menu_ctn2.setText(am_pm);
		Gear.menu_ctn3.setText(hour + ":" + min);
		Gear.menu_ctn4.setText(day + "일");
	}catch(e) {
		showError(e);
	}});
});

//플레이어 위치 기어메뉴
Gear.menu_loc = new GearMenu("Location");
//기어메뉴의 레이아웃
Gear.menu_loc.setLayout(function() {try {
	var l = new c.l(ctx);
	l.setOrientation(c.l.VERTICAL);
	l.setGravity(Gravity.LEFT);
	
	Gear.menu_ctn1 = mcpeText(10, "X: --");
	Gear.menu_ctn1_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn1_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn1.setLayoutParams(Gear.menu_ctn1_p);
	
	Gear.menu_ctn2 = mcpeText(10, "Y: --");
	Gear.menu_ctn2_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn2_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn2.setLayoutParams(Gear.menu_ctn2_p);
	
	Gear.menu_ctn3 = mcpeText(10, "Z: --");
	Gear.menu_ctn3_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn3_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn3.setLayoutParams(Gear.menu_ctn3_p);
	
	Gear.menu_ctn2_2 = mcpeText(10, "eyePos: --");
	Gear.menu_ctn2_2_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn2_2_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn2_2.setLayoutParams(Gear.menu_ctn2_2_p);
	
	Gear.menu_ctn4 = mcpeText(6, "Biome: --");
	Gear.menu_ctn4_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn4_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn4.setLayoutParams(Gear.menu_ctn4_p);
	
	Gear.menu_ctn5 = mcpeText(10, "LightLevel: --");
	Gear.menu_ctn5_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn5_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn5.setLayoutParams(Gear.menu_ctn5_p);
	
	Gear.menu_ctn6 = mcpeText(10, "chunkX: --");
	Gear.menu_ctn6_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn6_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn6.setLayoutParams(Gear.menu_ctn6_p);
	
	Gear.menu_ctn8 = mcpeText(10, "chunkZ: --");
	Gear.menu_ctn8_p = new c.l.LayoutParams(c.w, c.w);
	Gear.menu_ctn8_p.setMargins(DIP*2, DIP*2, 0, 0);
	Gear.menu_ctn8.setLayoutParams(Gear.menu_ctn8_p);
	
	l.addView(Gear.menu_ctn1);
	l.addView(Gear.menu_ctn2);
	l.addView(Gear.menu_ctn3);
	l.addView(Gear.menu_ctn2_2);
	l.addView(Gear.menu_ctn4);
	l.addView(Gear.menu_ctn5);
	l.addView(Gear.menu_ctn6);
	l.addView(Gear.menu_ctn8);
	
	return l;
}catch(e) {
	showError(e);
	return false;
}});

//기어메뉴가 틱마다 할 행동 지정
Gear.menu_loc.setTick(function() {try {
	var x = Player.getX();
	var y = Player.getY();
	var z = Player.getZ();
	var cx = Math.floor(x/16);
	var cz = Math.floor(z/16);
	var px = parseInt(Math.floor(x*100))/100;
	var py = parseInt(Math.floor(y*100))/100;
	var pz = parseInt(Math.floor(z*100))/100;
	var biome = Level.getBiomeName(x, z);
	var b = Level.getBrightness(x, y, z);
	var ep = Math.floor(y+1);
	var cex = x;
	var cez = z;
	while(cex < 0) {
		cex += 16;
	}
	while(cez < 0) {
		cez += 16;
	}
	cex %= 16;
	cez %= 16;
	
	uiThread(function() {try {
		Gear.menu_ctn1.setText("X: " + px);
		Gear.menu_ctn2.setText("Y: " + py);
		Gear.menu_ctn3.setText("Z: " + pz);
		Gear.menu_ctn2_2.setText("EyePos: " + ep);
		Gear.menu_ctn4.setText("Biome: " + biome);
		Gear.menu_ctn5.setText("LightLevel: " + b);
		Gear.menu_ctn6.setText("chunkX: " + cx + "(" + Math.floor(cex) + ")");
		Gear.menu_ctn8.setText("chunkZ: " + cz + "(" + Math.floor(cez) + ")");
	}catch(e) {
		showError(e);
	}});
}catch(e) {
	showError(e);
}});

Gear.menu_pedometer = new GearMenu("Pedometer");
Gear.menu_pedometer.setLayout(function() {try {
	var l = new c.l(ctx);
	l.setOrientation(c.l.VERTICAL);
	l.setGravity(Gravity.CENTER);
	
	var l2 = new c.l(ctx);
	l2.setOrientation(c.l.HORIZONTAL);
	l2.setGravity(Gravity.BOTTOM|Gravity.RIGHT);
	l2_p = new c.l.LayoutParams(c.m, c.w);
	l2_p.setMargins(DIP*2, DIP*2, DIP*2, DIP*2);
	l2.setLayoutParams(l2_p);
	
	Gear.menu_ctn1 = mcpeText(10, "---,---,---");
	l2.addView(Gear.menu_ctn1);
	
	Gear.menu_ctn2 = new Button(ctx);
	Gear.menu_ctn2.setTransformationMethod(null);
	Gear.menu_ctn2.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
	Gear.menu_ctn2.setTextSize(c.p, DIP*10);
	Gear.menu_ctn2.setTextColor(Color.WHITE);
	if(FILE_FONT.exists()) {
		Gear.menu_ctn2.setTypeface(Typeface.createFromFile(FILE_FONT));
	}
	Gear.menu_ctn2.setPadding(0, 0, 0, 0);
	Gear.menu_ctn2.setText("R");
	Gear.menu_ctn2.setBackgroundDrawable(Assets.gearBtn_9());
	Gear.menu_ctn2_p = new c.l.LayoutParams(DIP*16, DIP*16);
	Gear.menu_ctn2_p.setMargins(DIP*2, 0, DIP*2, 0);
	Gear.menu_ctn2.setLayoutParams(Gear.menu_ctn2_p);
	Gear.menu_ctn2.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
			switch(event.action) {
				//클릭할때 버튼의 이미지를 변경
				case MotionEvent.ACTION_DOWN:
				view.setBackgroundDrawable(Assets.gearBtnC_9());
				break;
				//클릭하고 나서 버튼의 이미지를 원래대로
				case MotionEvent.ACTION_UP:
				case MotionEvent.ACTION_CANCEL:
				view.setBackgroundDrawable(Assets.gearBtn_9());
				break;
			}
			return false;
		}catch(e) {
			showError(e);
			return false;
		}}}));
		Gear.menu_ctn2.setOnClickListener(View.OnClickListener({onClick: function(view, event) {try {
				Gear.stepLock = Math.floor(Gear.step);
				saveData(FILE_MAP_DATA(), "STEP_LOCK", Gear.stepLock);
				saveData(FILE_MAP_DATA(), "STEP", Math.floor(Gear.step) + "");
		}catch(e) {
			showError(e);
		}}}));
	l2.addView(Gear.menu_ctn2);
	l.addView(l2);
	
	Gear.menu_ctn3 = mcpeText(8, "Total: ---,---,---");
	Gear.menu_ctn3.setTextColor(Color.YELLOW);
	l.addView(Gear.menu_ctn3);
	
	
	
	return l;
}catch(e) {
	showError(e);
}});

Gear.menu_pedometer.setTick(function() {try {
	var s = Math.floor(Gear.step - Gear.stepLock) + "";
	var ss = s.split("");
	var str = "";

    var e;
	for(e = 0; e < ss.length; e++) {
		str += ss[e];
		if(((ss.length - e) % 3) == 1 && (ss.length -e) != 1) {
			str += ",";
		}
	}
	
	var s2 = Math.floor(Gear.step) + "";
	var ss2 = s2.split("");
	var str2 = "";
	for(e = 0; e < ss2.length; e++) {
		str2 += ss2[e];
		if(((ss2.length - e) % 3) == 1 && (ss2.length -e) != 1) {
			str2 += ",";
		}
	}
	uiThread(function() {try {
		Gear.menu_ctn1.setText(str);
		Gear.menu_ctn3.setText("Total: " + str2);
	}catch(e) {
		showError(e);
	}});
}catch(e) {
	showError(e);
}});

//타이틀 화면에서의 기어그룹 생성
Gear.group_onTitle = new GearGroup("Title Screen");
Gear.group_onTitle.addMenu(Gear.menu_main);
Gear.group_onTitle.addMenu(Gear.menu_clock);
Gear.group_onTitle.addMenu(Gear.menu_battery);

//싱글플레이에서 기어그룹 생성
Gear.group_inGame = new GearGroup("Single Play");
Gear.group_inGame.addMenu(Gear.menu_main);
Gear.group_inGame.addMenu(Gear.menu_clockM);
Gear.group_inGame.addMenu(Gear.menu_loc);
Gear.group_inGame.addMenu(Gear.menu_pedometer);
Gear.group_inGame.addMenu(Gear.menu_clock);
Gear.group_inGame.addMenu(Gear.menu_battery);


//메인창 불러오기
Gear.mainGuiLoad = function() {try {
/** 사용하지 않는 이전 테마
	Gear.layout = new RelativeLayout(ctx);
	Gear.layout.setBackgroundDrawable(Assets.background_9());
	
	Gear.title = new RelativeLayout(ctx);
	Gear.title.setId(randomId());
	Gear.title.setPadding(DIP*2, DIP*2, DIP*2, DIP*2);
	
	Gear.title.setBackgroundDrawable(Assets.title_9());
	
	Gear.title_param = new RelativeLayout.LayoutParams(c.m, DIP*30);
	Gear.title_param.setMargins(0, 0, 0, DIP);
	Gear.title.setLayoutParams(Gear.title_param);
	Gear.layout.addView(Gear.title);
	
	Gear.led = new LinearLayout(ctx);
	Gear.title_text = new TextView(ctx);
	Gear.title_btn = new Button(ctx);
	
	Gear.led.setOrientation(LinearLayout.HORIZONTAL);
	Gear.led.setGravity(Gravity.CENTER|Gravity.LEFT);
	Gear.led_param = new RelativeLayout.LayoutParams(DIP*16, DIP*16);
	Gear.led_param.setMargins(DIP*4, DIP*4, 0, 0);
	Gear.led_param.addRule(RelativeLayout.ALIGN_PARENT_LEFT, Gear.title.getId());
	Gear.led.setLayoutParams(Gear.led_param);
	
	Gear.power = new ImageView(ctx);
	Gear.power_draw = new GradientDrawable();
	Gear.power_draw.setCornerRadius(DIP);
	Gear.power_draw.setColor(Color.parseColor("#00ff00"));
	Gear.power.setImageDrawable(Gear.power_draw);
	Gear.power_param = new LinearLayout.LayoutParams(DIP*4, DIP*8);
	Gear.power_param.setMargins(DIP*2, 0, 0, 0);
	Gear.power.setLayoutParams(Gear.power_param);
	Gear.led.addView(Gear.power);
	Gear.title.addView(Gear.led);
	
	Gear.title_btn.setTransformationMethod(null);
	Gear.title_btn.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	Gear.title_btn.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	Gear.title_btn.setTextColor(Color.WHITE);
	Gear.title_btn.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*8);
	if(FILE_FONT.exists()) {
		Gear.title_btn.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	Gear.title_btn.setPadding(0, 0, 0, 0);
	Gear.title_btn.setGravity(Gravity.CENTER);
	Gear.title_btn.setBackgroundDrawable(Assets.button_9());
	Gear.title_btn.setText("");
	
	Gear.title_btn_param = new RelativeLayout.LayoutParams(DIP*16, DIP*16);
	Gear.title_btn_param.setMargins(0, DIP*4, DIP*4, 0);
	Gear.title_btn_param.addRule(RelativeLayout.ALIGN_PARENT_RIGHT, Gear.title.getId());
	Gear.title_btn.setLayoutParams(Gear.title_btn_param);
	Gear.title.addView(Gear.title_btn);
	
	Gear.title_text.setTransformationMethod(null);
	Gear.title_text.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	Gear.title_text.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	Gear.title_text.setTextColor(Color.WHITE);
	Gear.title_text.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*8);
	if(FILE_FONT.exists()) {
		Gear.title_text.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	Gear.title_text.setPadding(0, 0, 0, 0);
	Gear.title_text.setGravity(Gravity.CENTER);
	Gear.title_text.setText("Gear");
	
	Gear.title_text_param = new LinearLayout.LayoutParams(c.m, DIP*26);
	Gear.title_text.setLayoutParams(Gear.title_text_param);
	Gear.title.addView(Gear.title_text);
	
	Gear.content = new RelativeLayout(ctx);
	Gear.content.setId(randomId());
	Gear.content.setBackgroundDrawable(Assets.textView_9());
	
	Gear.content_param = new RelativeLayout.LayoutParams(c.m, c.m);
	Gear.content_param.setMargins(DIP*8, 0, DIP*8, DIP*8);
	Gear.content_param.addRule(RelativeLayout.BELOW, Gear.title.getId());
	Gear.content.setLayoutParams(Gear.content_param);
	
	Gear.cText = mcpeText(16, "Welcome back");
	Gear.cText.setId(randomId());
	Gear.cText_p = new RelativeLayout.LayoutParams(c.w, c.w);
	Gear.cText_p.addRule(RelativeLayout.CENTER_IN_PARENT, Gear.content.getId());
	Gear.cText.setLayoutParams(Gear.cText_p);
	Gear.content.addView(Gear.cText);
	
	Gear.cText2 = mcpeText(11, "now loading...");
	Gear.cText2.setTextColor(Color.parseColor("#999999"));
	Gear.cText2.setPadding(DIP*10, DIP*2, 0, 0);
	Gear.cText2_p = new RelativeLayout.LayoutParams(c.w, c.w);
	Gear.cText2_p.addRule(RelativeLayout.BELOW, Gear.cText.getId());
	Gear.cText2.setLayoutParams(Gear.cText2_p);
	Gear.content.addView(Gear.cText2);
	
	Gear.layout.addView(Gear.content);
	
	Gear.window = new PopupWindow(Gear.layout, DIP*160, DIP*100, false);
*/

	//가장 상위의 레이아웃
	Gear.layout = new RelativeLayout(ctx);
	//랜덤 아이디 부여
	Gear.layout.setId(randomId());
	Gear.layout.setBackgroundDrawable(Assets.background_9());
	
	//위쪽 부분 (창 드래그를 위한 투명버튼)
	Gear.lt = new Button(ctx);
	Gear.lt.setBackgroundColor(Color.argb(0, 0,0,0));
	
	Gear.lt_p = new c.r.LayoutParams(c.m, DIP*8);
	Gear.lt_p.setMargins(0, 0, 0, 0);
	Gear.lt_p.addRule(c.r.ALIGN_PARENT_TOP, Gear.layout.getId());
	Gear.lt.setLayoutParams(Gear.lt_p);
	
	//창의 위쪽에 있는 이 버튼을 누르고 드래드시 창을 이동시킴
	Gear.lt.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
        var x, y, w, h;
		switch(event.action) {
			case MotionEvent.ACTION_DOWN:
                Gear.rx = event.getRawX();
                Gear.ry = event.getRawY();
                Gear.ex = event.getX();
                Gear.ey = event.getY();
                Gear.wx = loadData(FILE_MAIN_DATA, "WINDOW_X");
                Gear.wy = loadData(FILE_MAIN_DATA, "WINDOW_Y");
                Gear.ww = Gear.window.getWidth();
                Gear.wh = Gear.window.getHeight();
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                break;
			case MotionEvent.ACTION_MOVE:
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                x = Gear.rx - Gear.ex + Gear.cx;
                y = Gear.ry - Gear.ey + Gear.cy;
                w = Gear.ww;
                h = Gear.wh;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                /*if(Gear.uiDelay <= 0) {
                    Gear.window.update(Gear.rx - Gear.ex, Gear.ry - Gear.ey - Gear.cy, Gear.ww, Gear.wh + Gear.cy);
                    Gear.uiDelay = 4;
                }*/
                Gear.window.update(x, y, w, h);
                break;
			case MotionEvent.ACTION_UP:
                x = Gear.rx - Gear.ex + Gear.cx;
                y = Gear.ry - Gear.ey + Gear.cy;
                w = Gear.ww;
                h = Gear.wh;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                Gear.window.update(x, y, w, h);
                saveData(FILE_MAIN_DATA, "WINDOW_X", x);
                saveData(FILE_MAIN_DATA, "WINDOW_Y", y);
                break;
		}
		return false;
	}catch(e) {
		showError(e);
		return false;
	}}}));
	Gear.layout.addView(Gear.lt);
	
	//왼쪽 부분 (창 드래그를 위한 투명버튼)
	Gear.ll = new Button(ctx);
	Gear.ll.setBackgroundColor(Color.argb(0, 0, 0, 0));
	
	Gear.ll_p = new c.r.LayoutParams(DIP*8, c.m);
	Gear.ll_p.setMargins(0, 0, 0, 0);
	Gear.ll_p.addRule(c.r.ALIGN_PARENT_LEFT, Gear.layout.getId());
	Gear.ll.setLayoutParams(Gear.ll_p);
	
	//창의 왼쪽에 있는 이 버튼을 누르고 드래드시 창을 왼쪽으로 확장/축소 시킴
	Gear.ll.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
        var x, y, w, h;
		switch(event.action) {
			case MotionEvent.ACTION_DOWN:
                Gear.rx = event.getRawX();
                Gear.ry = event.getRawY();
                Gear.ex = event.getX();
                Gear.ey = event.getY();
                Gear.wx = loadData(FILE_MAIN_DATA, "WINDOW_X");
                Gear.wy = loadData(FILE_MAIN_DATA, "WINDOW_Y");
                Gear.ww = Gear.window.getWidth();
                Gear.wh = Gear.window.getHeight();
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                break;
			case MotionEvent.ACTION_MOVE:
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                x = Gear.rx - Gear.ex + Gear.cx;
                y = Gear.wy;
                w = Gear.ww - Gear.cx;
                h = Gear.wh;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                if(Gear.uiDelay <= 0) {
                    Gear.window.update(x, y, w, h);
                    Gear.uiDelay = 4;
                }
                break;
			case MotionEvent.ACTION_UP:
                x = Gear.rx - Gear.ex + Gear.cx;
                y = Gear.wy;
                w = Gear.ww - Gear.cx;
                h = Gear.wh;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                Gear.window.update(x, y, w, h);
                saveData(FILE_MAIN_DATA, "WINDOW_X", x);
                saveData(FILE_MAIN_DATA, "WINDOW_W", w);
                break;
		}
		return false;
	}catch(e) {
		showError(e);
		return false;
	}}}));
	Gear.layout.addView(Gear.ll);
	
	Gear.lr = new Button(ctx);
	Gear.lr.setBackgroundColor(Color.argb(0, 0, 0, 0));
	
	Gear.lr_p = new c.r.LayoutParams(DIP*8, c.m);
	Gear.lr_p.setMargins(0, 0, 0, 0);
	Gear.lr_p.addRule(c.r.ALIGN_PARENT_RIGHT, Gear.layout.getId());
	Gear.lr.setLayoutParams(Gear.lr_p);
	
	Gear.lr.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
        var x, y, w, h;
		switch(event.action) {
			case MotionEvent.ACTION_DOWN:
                Gear.rx = event.getRawX();
                Gear.ry = event.getRawY();
                Gear.ex = event.getX();
                Gear.ey = event.getY();
                Gear.wx = loadData(FILE_MAIN_DATA, "WINDOW_X");
                Gear.wy = loadData(FILE_MAIN_DATA, "WINDOW_Y");
                Gear.ww = Gear.window.getWidth();
                Gear.wh = Gear.window.getHeight();
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                break;
			case MotionEvent.ACTION_MOVE:
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                x = Gear.wx;
                y = Gear.wy;
                w = Gear.ww + Gear.cx;
                h = Gear.wh;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                if(Gear.uiDelay <= 0) {
                    Gear.window.update(x, y, w, h);
                    Gear.uiDelay = 4;
                }
                break;
			case MotionEvent.ACTION_UP:
                x = Gear.wx;
                y = Gear.wy;
                w = Gear.ww + Gear.cx;
                h = Gear.wh;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                Gear.window.update(x, y, w, h);
                saveData(FILE_MAIN_DATA, "WINDOW_W", w);
                break;
		}
		return false;
	}catch(e) {
		showError(e);
		return false;
	}}}));
	Gear.layout.addView(Gear.lr);
	
	Gear.lb = new Button(ctx);
	Gear.lb.setBackgroundColor(Color.argb(0, 0, 0, 0));
	
	Gear.lb_p = new c.r.LayoutParams(c.m, DIP*8);
	Gear.lb_p.setMargins(0, 0, 0, 0);
	Gear.lb_p.addRule(c.r.ALIGN_PARENT_BOTTOM, Gear.layout.getId());
	Gear.lb.setLayoutParams(Gear.lb_p);
	
	Gear.lb.setOnTouchListener(View.OnTouchListener({onTouch: function(view, event) {try {
        var x, y, w, h;
		switch(event.action) {
			case MotionEvent.ACTION_DOWN:
                Gear.rx = event.getRawX();
                Gear.ry = event.getRawY();
                Gear.ex = event.getX();
                Gear.ey = event.getY();
                Gear.wx = loadData(FILE_MAIN_DATA, "WINDOW_X");
                Gear.wy = loadData(FILE_MAIN_DATA, "WINDOW_Y");
                Gear.ww = Gear.window.getWidth();
                Gear.wh = Gear.window.getHeight();
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                break;
			case MotionEvent.ACTION_MOVE:
                Gear.cx = event.getRawX() - Gear.rx;
                Gear.cy = event.getRawY() - Gear.ry;
                x = Gear.wx;
                y = Gear.wy;
                w = Gear.ww;
                h = Gear.wh + Gear.cy;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                if(Gear.uiDelay <= 0) {
                    Gear.window.update(x, y, w, h);
                    Gear.uiDelay = 4;
                }
                break;
			case MotionEvent.ACTION_UP:
                x = Gear.wx;
                y = Gear.wy;
                w = Gear.ww;
                h = Gear.wh + Gear.cy;
                if(w < DIP*122) {
                    w = DIP*122;
                }
                if(h < DIP*36) {
                    h = DIP*36;
                }
                Gear.window.update(x, y, w, h);
                saveData(FILE_MAIN_DATA, "WINDOW_H", h);
                break;
		}
		return false;
	}catch(e) {
		showError(e);
		return false;
	}}}));
	Gear.layout.addView(Gear.lb);
	
	Gear.content = new RelativeLayout(ctx);
	Gear.content.setId(randomId());
	Gear.content.setBackgroundDrawable(Assets.textView_9());
	
	Gear.content_param = new RelativeLayout.LayoutParams(c.m, c.m);
	Gear.content_param.setMargins(DIP*8, DIP*8, DIP*8, DIP*8);
	Gear.content.setLayoutParams(Gear.content_param);
	
	Gear.led = new LinearLayout(ctx);
	Gear.led.setOrientation(LinearLayout.HORIZONTAL);
	Gear.led.setGravity(Gravity.TOP|Gravity.LEFT);
	Gear.led_param = new RelativeLayout.LayoutParams(DIP*64, DIP*16);
	Gear.led_param.setMargins(0, 0, 0, 0);
	Gear.led_param.addRule(RelativeLayout.ALIGN_PARENT_LEFT, Gear.layout.getId());
	Gear.led_param.addRule(RelativeLayout.ALIGN_PARENT_TOP, Gear.layout.getId());
	Gear.led.setLayoutParams(Gear.led_param);
	
	Gear.power = new ImageView(ctx);
	Gear.power_draw = new GradientDrawable();
	Gear.power_draw.setCornerRadius(DIP);
	Gear.power_draw.setColor(Color.parseColor("#00ff00"));
	Gear.power.setImageDrawable(Gear.power_draw);
	Gear.power_param = new LinearLayout.LayoutParams(DIP*4, DIP*8);
	Gear.power_param.setMargins(DIP*8, 0, 0, 0);
	Gear.power.setLayoutParams(Gear.power_param);
	Gear.led.addView(Gear.power);
	
	Gear.hdd = new ImageView(ctx);
	Gear.hdd_draw = new GradientDrawable();
	Gear.hdd_draw.setCornerRadius(DIP);
	Gear.hdd_draw.setColor(Color.parseColor("#000000"));
	Gear.hdd.setImageDrawable(Gear.hdd_draw);
	Gear.hdd_param = new LinearLayout.LayoutParams(DIP*4, DIP*8);
	Gear.hdd_param.setMargins(DIP*4, 0, 0, 0);
	Gear.hdd.setLayoutParams(Gear.hdd_param);
	Gear.led.addView(Gear.hdd);
	
	Gear.layout.addView(Gear.led);
	
	Gear.title = new RelativeLayout(ctx);
	Gear.title.setId(randomId());
	Gear.title.setPadding(0, 0, 0, 0);
	
	Gear.title.setBackgroundColor(Color.BLACK);
	
	Gear.title_param = new RelativeLayout.LayoutParams(c.m, DIP*16);
	Gear.title_param.setMargins(DIP*2, DIP*2, DIP*2, 0);
	Gear.title.setLayoutParams(Gear.title_param);
	
	Gear.title_text = new TextView(ctx);
	Gear.title_text.setTransformationMethod(null);
	Gear.title_text.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	Gear.title_text.setTextColor(Color.WHITE);
	Gear.title_text.setTextSize(c.p, DIP*8);
	if(FILE_FONT.exists()) {
		Gear.title_text.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	}
	Gear.title_text.setPadding(0, 0, 0, 0);
	Gear.title_text.setGravity(Gravity.CENTER);
	Gear.title_text.setText("Gear");
	
	Gear.title_text_p = new c.r.LayoutParams(c.m, c.m);
	Gear.title_text_p.setMargins(0, 0, 0, 0);
	Gear.title_text_p.addRule(c.r.CENTER_IN_PARENT, Gear.title.getId());
	Gear.title_text.setLayoutParams(Gear.title_text_p);
	Gear.title.addView(Gear.title_text);
	Gear.content.addView(Gear.title);
	
	Gear.clock = new c.l(ctx);
	Gear.clock.setOrientation(c.l.HORIZONTAL);
	Gear.clock.setPadding(0, 0, 0, 0);
	Gear.clock.setGravity(Gravity.LEFT|Gravity.BOTTOM);
	
	Gear.clock_p = new c.r.LayoutParams(c.w, c.w);
	Gear.clock_p.setMargins(0, 0, 0, 0);
	Gear.clock_p.addRule(c.r.CENTER_VERTICAL, Gear.title.getId());
	Gear.clock_p.addRule(c.r.ALIGN_PARENT_LEFT, Gear.title.getId());
	Gear.clock.setLayoutParams(Gear.clock_p);
	
	Gear.clock1 = mcpeText(6, "--");
	Gear.clock1.setPadding(DIP*2, 0, DIP, 0);
	Gear.clock.addView(Gear.clock1);
	
	Gear.clock2 = mcpeText(8, "--:--");
	Gear.clock.addView(Gear.clock2);
	
	Gear.title.addView(Gear.clock);
	
	Gear.info = mcpeText(8, "--%");
	Gear.info.setPadding(0, 0, DIP*2, 0);
	Gear.info_p = new c.r.LayoutParams(c.w, c.w);
	Gear.info_p.addRule(c.r.CENTER_VERTICAL, Gear.title.getId());
	Gear.info_p.addRule(c.r.ALIGN_PARENT_RIGHT, Gear.title.getId());
	Gear.info.setLayoutParams(Gear.info_p);
	Gear.title.addView(Gear.info);
	
	Gear.titleCover = new Button(ctx);
	Gear.titleCover.setBackgroundColor(Color.argb(0, 0, 0, 0));
	Gear.titleCover_p = new c.r.LayoutParams(c.m, c.m);
	Gear.titleCover_p.setMargins(0, 0, 0, 0);
	Gear.titleCover.setLayoutParams(Gear.titleCover_p);
	Gear.titleCover.setOnTouchListener(View.OnTouchListener({ onTouch:
		function(view, event) {try {
            var x, y, rx, ry;
			switch(event.action) {
				case MotionEvent.ACTION_DOWN:
                    gearChecker();
                    Gear.eventX = event.getX();
                    Gear.eventY = event.getY();
                    Gear.eventType = null;
                    break;
				case MotionEvent.ACTION_MOVE:
                    x = event.getX();
                    y = event.getY();
                    rx = x - Gear.eventX;
                    ry = y - Gear.eventY;
                    switch(Gear.eventType) {
                        case 0:
                            if(ry > DIP*20) {
                                Gear.title_text.setText("당겨서 메뉴");
                            }else if(ry < -DIP*20) {
                                Gear.title_text.setText("당겨서 종료");
                            }else {
                                Gear.title_text.setText("Gear");
                            }
                            break;
                        case 1:
                            var size = view.getWidth() - DIP*20;
                            var power = (parseInt(x*100 / size)+1);
                            if(power < 1) {
                                power = 1;
                            }else if(power > 100) {
                                power = 100;
                            }
                            try {
                                var p = ctx.getWindow().getAttributes();
                                if(typeof p.screenBrightness === "number") {
                                    p.screenBrightness = power/100;
                                    ctx.getWindow().setAttributes(p);
                                    Gear.title_text.setText("밝기 " + power + "%");
                                }else {
                                    Gear.title_text.setText("지원안함");
                                }
                            }catch(e) {
                                showError(e);
                            }
                            break;
                        default:
                            if(Math.abs(ry) > 20*DIP) {
                                Gear.eventType = 0;
                            }else if(Math.abs(rx) > 20*DIP) {
                                Gear.eventType = 1;
                            }
                    }
                    break;
				case MotionEvent.ACTION_UP:
                    x = event.getX();
                    y = event.getY();
                    rx = x - Gear.eventX;
                    ry = y - Gear.eventY;
                    if(Gear.eventType === 0 && ry > 20) {
                        Gear.currentGear.changeMenu(Gear.currentGear.getIndexByName("Main"));
                        saveData(FILE_MAIN_DATA, Gear.currentGear.getName(), 0);
                    }else if(Gear.eventType === 0 && ry < -10 ) {
                        if(Gear.exit_q == false) {
                            Gear.title_text.setText("종료?");
                            Gear.exit_q = true;
                        }else {
                            showGear(false);
                            msg("포켓기어를 종료합니다");
                            msg("다시 켜실려면 '/gear' 를 입력하세요");
                            Gear.exit_q = false;
                            Gear.title_text.setText("Gear");
                        }
                        break;
                    }
                    Gear.title_text.setText("Gear");
                    Gear.exit_q = false;
                    break;
			}
		}catch(e) {
			showError(e);
		}return false}
		
	}));
	Gear.title.addView(Gear.titleCover);
	
	Gear.frame = new ScrollView(ctx);
	Gear.frame.setPadding(0, 0, 0, 0);
	Gear.frame.setId(randomId());
	Gear.frame_p = new c.r.LayoutParams(c.m, c.m);
	Gear.frame_p.setMargins(DIP*2, 0, DIP*2, DIP*2);
	Gear.frame_p.addRule(c.r.BELOW, Gear.title.getId());
	Gear.frame.setLayoutParams(Gear.frame_p);
	Gear.content.addView(Gear.frame);
	
	Gear.hello = new c.l(ctx);
	Gear.hello.setOrientation(c.l.VERTICAL);
	Gear.hello.setGravity(Gravity.CENTER);
	Gear.hello1 = mcpeText(16, "Pocket");
	Gear.hello1.setGravity(Gravity.CENTER);
	Gear.hello1.setPadding(0, DIP*2, 0, DIP);
	Gear.hello.addView(Gear.hello1);
	Gear.hello2 = mcpeText(16, "Gear");
	Gear.hello2.setGravity(Gravity.CENTER);
	Gear.hello.addView(Gear.hello2);
	Gear.hello3 = mcpeText(10, "loading...");
	Gear.hello3.setGravity(Gravity.CENTER);
	Gear.hello3.setPadding(0, DIP*3, 0, 0);
	Gear.hello3.setTextColor(Color.GRAY);
	Gear.hello.addView(Gear.hello3);
	Gear.frame.addView(Gear.hello);
	
	Gear.layout.addView(Gear.content);
	
	var w = loadData(FILE_MAIN_DATA, "WINDOW_W");
	if(w == null || isNaN(w)) {
		w = DIP*160;
		saveData(FILE_MAIN_DATA, "WINDOW_W", DIP*160);
		msg("데이터 손상 감지: 'WINDOW_W'\n복구를 시도중...");
	}
	var h = loadData(FILE_MAIN_DATA, "WINDOW_H");
	if(h == null || isNaN(h)) {
		h = DIP*100;
		saveData(FILE_MAIN_DATA, "WINDOW_H", DIP*100);
		msg("데이터 손상 감지: 'WINDOW_H'\n복구를 시도중...");
	}
	Gear.window = new PopupWindow(Gear.layout, w, h, false);
}catch(e) {
	showError(e);
}};

Gear.mainGuiLoad();

function showGear(vis) {
ctx.runOnUiThread(new Runnable({run: function() { try{
	if(vis && !Gear.windowAlive) {
		var x = loadData(FILE_MAIN_DATA, "WINDOW_X");
		if(x == null || isNaN(x)) {
			x = 0;
			saveData(FILE_MAIN_DATA, "WINDOW_X", 0);
			msg("데이터 손상 감지: 'WINDOW_X'\n복구 시도중...");
		}
		var y = loadData(FILE_MAIN_DATA, "WINDOW_Y");
		if(y == null || isNaN(y)) {
			y = 0;
			saveData(FILE_MAIN_DATA, "WINDOW_Y", 0);
			msg("데이터 손상 감지: 'WINDOW_Y'\n복구 시도중...");
		}
		Gear.window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.LEFT|Gravity.TOP, x, y);
		Gear.windowAlive = true;
	}else if(!vis && Gear.windowAlive) {
		Gear.window.dismiss();
		Gear.windowAlive = false;
	}
}catch(e) {
	showError(e);
}}}));
}

function gearFirstLoad() {try {
	Gear.currentGear = Gear.group_onTitle;
	Gear.frame.removeAllViews();
	Gear.currentGear.currentIndex = parseInt(loadData(FILE_MAIN_DATA, Gear.group_onTitle.getName()));
	var e = Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].getLayout();
	if(e === false) {
		msg("[ERROR] " + Gear.toString() + "-" + Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].toString() + " layout load fail");
	}
	Gear.frame.addView(e);
	Gear.currentGear.getMenus()[Gear.currentGear.getCurrentIndex()].getHeader();
	Gear.loading = true;
}catch(e) {
	showError(e);
}}
		
if(parseBoolean(loadData(FILE_MAIN_DATA, "BOOT&PLAY"))) {
	showGear(true);
}

gearFirstLoad();

function gearChecker() {
	if(net.zhuoweizhang.mcpelauncher.ScriptManager.isRemote && !Gear.isRemote && Gear.allowRemote) {
		net.zhuoweizhang.mcpelauncher.ScriptManager.handleMessagePacketCallback("", "BlockLauncher, enable scripts, please and thank you");
		Gear.isRemote = true;
		newLevel("multi");
	}
	if(!Gear.thread.isAlive) {
		AsynchronousModTick();
		msg("Gear rebooted");
	}
}

function newLevel(str) {
	Gear.onMap = true;
	if(net.zhuoweizhang.mcpelauncher.ScriptManager.isRemote) {
		gearChecker();
	}else {
		Gear.currentGear.changeMenu(0);
		Gear.currentGear = Gear.group_inGame;
		Gear.currentGear.changeMenu(parseInt(loadData(FILE_MAIN_DATA, Gear.group_inGame.getName())));
		if(FILE_MAP_DATA().exists()) {
			Gear.step = parseInt(loadData(FILE_MAP_DATA(), "STEP"));
			Gear.stepLock = parseInt(loadData(FILE_MAP_DATA(), "STEP_LOCK"));
			if(isNaN(Gear.step)) {
				Gear.step = 0;
				saveData(FILE_MAP_DATA(), "STEP", 0);
			}
			if(isNaN(Gear.stepLock)) {
				Gear.stepLock = 0;
				saveData(FILE_MAP_DATA(), "STEP_LOCK", 0);
			}
		}else {
			FILE_MAP_DIR().mkdirs();
			FILE_MAP_DATA().createNewFile();
			saveData(FILE_MAP_DATA(), "STEP", 0);
			saveData(FILE_MAP_DATA(), "STEP_LOCK", 0);
			Gear.step = 0;
			Gear.stepLock = 0;
		}
	}
}

function leaveGame() {
	if(!Gear.isRemote) {
		saveData(FILE_MAP_DATA(), "STEP", Math.floor(Gear.step));
	}
	Gear.onMap = false;
	Gear.isRemote = true;
	Gear.currentGear.changeMenu(0);
	Gear.currentGear = Gear.group_onTitle;
	Gear.currentGear.changeMenu(parseInt(loadData(FILE_MAIN_DATA, Gear.group_onTitle.getName())));
	uiThread(function() {try {
		Gear.hdd_draw.mutate().setColor(Color.parseColor("#000000"));
	}catch(e) {}});
}

function procCmd(str) {
	var cmd = str.split(" ");
	switch(cmd[0]) {
		case "gear":
		showGear(true);
		break;
	}
}

function modTick() {
	try {
		if(!net.zhuoweizhang.mcpelauncher.ScriptManager.isRemote) {
			var x = Entity.getVelX(Player.getEntity());
			var z = Entity.getVelZ(Player.getEntity());
			if(x !== 0 || z !== 0) {
				Gear.step += Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
			}
			if(++Gear.autoSaveTick > 200) {
				Gear.autoSaveTick = 0;
				saveData(FILE_MAP_DATA(), "STEP", Math.floor(Gear.step) + "");
			}
		}
		var m = java.lang.System.currentTimeMillis();
		Gear.lastMillBuffer += (m - Gear.lastMill) - 50;
		Gear.lastMill = m;
		if(--Gear.lastMillBuffer < 0) {
			Gear.lastMillBuffer = 0;
		}
		if(Gear.lastMillBuffer > 20) {
			Gear.lastMillBuffer -= Math.ceil(Gear.lastMillBuffer/5);
			uiThread(function() {try {
				Gear.hdd_draw.mutate().setColor(Color.parseColor("#ffaf30"));
			}catch(e) {
			}});
		}else {
			uiThread(function() {try {
				Gear.hdd_draw.mutate().setColor(Color.parseColor("#000000"));
			}catch(e) {
			}});
		}
	}catch(e) {
		showError(e);
	}
}



function parseBoolean(b) {
	return (b == "true" || b == 1 || b == "yes");
}



function msg(str) {
	if(Gear.onMap) {
		clientMessage(ChatColor.YELLOW + TAG + str);
	}else {
		if(str.length < 20) {
			toasts(TAG + str);
		}else {
			toast(TAG + str);
		}
	}
}



function randomId() {
	return Math.floor(Math.random()*0xffffff);
}



/**
 * Error report
 *
 * @since 2015-04
 * @author CodeInside
 *
 * @param {error} e
 */

function showError(e) {
	if(Level.getWorldName() === null) {
		ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
	android.widget.Toast.makeText(ctx, "[" + className + " ERROR LINE: " + e.lineNumber + "]" + "\n" + e, android.widget.Toast.LENGTH_LONG).show();
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
 * debug
 *
 * @since 2014-12
 * @author CodeInside
 */
 
var debugging = false;
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
 * @since 2015-02
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
	return new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
}

/**
 * Marge Array
 *
 * @since 2015-06
 * @author CodeInside
 *
 * @param {Array} arr1
 * @param {Array} arr2
 * @param {String} margeType <HORIZONTAL, VERTICAL>
 * @param {Number} width1
 * @param {Number} height1
 * @param {Number} width2
 * @param {Number} height2
 * @param {...} fillBlank
 * @return {Array} 
 */
function margeArray(arr1, arr2, margeType, width1, height1, width2, height2, fillBlank) {
	var arr = [];

    var e, f;
	switch(margeType) {
		case "HORIZONTAL":
			var maxHeight = height1 >= height2 ? height1 : height2;
			for(e = 0; e < maxHeight; e++) {
				if(e < height1) {
					for(f = 0; f < width1; f++) {
						arr.push(arr1[(e*width1) + f]);
					}
				}else {
					for(f = 0; f < width1; f++) {
						if(fillBlank === null) {
							arr.push(arr1[(width1*(height1-1)) + f]);
						}else {
							arr.push(fillBlank);
						}
					}
				}
				if(e < height2) {
					for(f = 0; f < width2; f++) {
						arr.push(arr2[(e*width2) + f]);
					}
				}else {
					for(f = 0; f < width2; f++) {
						if(fillBlank === null) {
							arr.push(arr2[(width2*(height2-1)) + f]);
						}else {
							arr.push(fillBlank);
						}
					}
				}
			}
			break;
		case "VERTICAL":
			var maxWidth = width1 >= width2 ? width1 : width2;
			for(e = 0; e < height1 + height2; e++) {
				for(f = 0; f < maxWidth; f++) {
					if(e < height1) {
						if(f < width1) {
							arr.push(arr1[(e*width1) + f]);
						}else {
							if(fillBlank === null) {
								arr.push(arr1[((e+1)*width1) - 1]);
							}else {
								arr.push(fillBlank);
							}
						}
					}else {
						if(f < width2) {
							arr.push(arr2[((e-height1)*width2) + f]);
						}else {
							if(fillBlank === null) {
								arr.push(arr2[((e-height1+1)*width2) - 1]);
							}else {
								arr.push(fillBlank);
							}
						}
					}
				}
			}
			break;
		default:
			print("Unknown margeType: " + margeType);
	}
	return arr;
}