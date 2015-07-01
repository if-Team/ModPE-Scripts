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
var ArrayList = java.util.ArrayList;

var c = {};
c.m = ViewGroup.LayoutParams.MATCH_PARENT;
c.w = ViewGroup.LayoutParams.WRAP_CONTENT;
c.a = java.lang.reflect.Array.newInstance;
c.r = RelativeLayout;
c.l = LinearLayout;
c.p = android.util.TypedValue.COMPLEX_UNIT_PX;



var Assets = {};
//NOT USE(TEXTURE PACK MISSING)
Assets.mcpeCPC = ctx.createPackageContext("com.mojang.minecraftpe", Context.CONTEXT_IGNORE_SECURITY);
Assets.mcpe = Assets.mcpeCPC.getAssets();
//spritesheet.png
try{
	Assets.mcpeSS = ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png");
}catch(e) {
	//old version
	Assets.mcpeSS = mcpeAssets.open("images/gui/spritesheet.png");
}
Assets.mcpeSS_BF = BitmapFactory.decodeStream(Assets.mcpeSS);
//touchgui.png
try {
	Assets.mcpeTG = ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png");
}catch(e) {
	Assets.mcpeTG = mcpeAssets.open("images/gui/touchgui.png");
}
Assets.mcpeTG_BF = BitmapFactory.decodeStream(Assets.mcpeTG);

Assets.fullBackground_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 0, 0, 16, 16);
Assets.fullBackground = Bitmap.createScaledBitmap(Assets.fullBackground_raw, PIXEL*32, PIXEL*32, false);
Assets.fullBackground_9 = function() {return ninePatch1(Assets.fullBackground, PIXEL*12, PIXEL*12, PIXEL*24, PIXEL*24)}

Assets.background_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 34, 43, 14, 14);
Assets.background = Bitmap.createScaledBitmap(Assets.background_raw, PIXEL*28, PIXEL*28, false);
Assets.background_9 = function() {return ninePatch1(Assets.background, PIXEL*12, PIXEL*12, PIXEL*22, PIXEL*22)}

Assets.title_left_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 150, 26, 2, 25);
Assets.title_left_pixel = new c.a(Int.TYPE, 50);
Assets.title_right_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 162, 26, 2, 25);
Assets.title_right_pixel = new c.a(Int.TYPE, 50);
Assets.title_center_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 153, 26, 8, 25);
Assets.title_center_pixel = new c.a(Int.TYPE, 200);
Assets.title_bottom_raw = Bitmap.createBitmap(Assets.mcpeTG_BF, 153, 52, 8, 3);
Assets.title_bottom_pixel = new c.a(Int.TYPE, 24);
Assets.title_left_raw.getPixels(Assets.title_left_pixel, 0, 2, 0, 0, 2, 25);
Assets.title_right_raw.getPixels(Assets.title_right_pixel, 0, 2, 0, 0, 2, 25);
Assets.title_center_raw.getPixels(Assets.title_center_pixel, 0, 8, 0, 0, 8, 25);
Assets.title_bottom_raw.getPixels(Assets.title_bottom_pixel, 0, 8, 0, 0, 8, 3);
Assets.title_pixel = margeArray(Assets.title_left_pixel, Assets.title_center_pixel, "HORIZONTAL", 2, 25, 8, 25, null);
Assets.title_pixel = margeArray(Assets.title_pixel, Assets.title_right_pixel, "HORIZONTAL", 10, 25, 2, 25, null);
Assets.title_pixel = margeArray(Assets.title_pixel, Assets.title_bottom_pixel, "VERTICAL", 12, 25, 8, 3, null);
Assets.title_raw = Bitmap.createBitmap(12, 28, Bitmap.Config.ARGB_8888);
Assets.title_raw.setPixels(Assets.title_pixel, 0, 12, 0, 0, 12, 28);
Assets.title = Bitmap.createScaledBitmap(Assets.title_raw, PIXEL*24, PIXEL*56, false);
Assets.title_9 = function() {
	return ninePatch1(Assets.title, PIXEL*5, PIXEL*5, PIXEL*46, PIXEL*20);
}

Assets.exit_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 60, 0, 18, 18);
Assets.exit = Bitmap.createScaledBitmap(Assets.exit_raw, 18*PIXEL, 18*PIXEL, false);
Assets.exit_9 = function() {return ninePatch1(Assets.exit, PIXEL*6, PIXEL*6, PIXEL*30, PIXEL*30)}

Assets.exitClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF, 78, 0, 18, 18);
Assets.exitClick = Bitmap.createScaledBitmap(Assets.exitClick_raw, PIXEL*36, PIXEL*36, false);
Assets.exitClick_9 = function() {return ninePatch1(Assets.exitClick, PIXEL*6, PIXEL*6, PIXEL*32, PIXEL*32)}

Assets.button_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,32,8,8);
Assets.button = Bitmap.createScaledBitmap(Assets.button_raw, PIXEL*16, PIXEL*16, false);
Assets.button_9 = function() {return ninePatch1(Assets.button, PIXEL*6, PIXEL*4, PIXEL*14, PIXEL*14)}

Assets.buttonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,8);
Assets.buttonClick = Bitmap.createScaledBitmap(Assets.buttonClick_raw, PIXEL*16, PIXEL*16, false);
Assets.buttonClick_9 = function() {return ninePatch1(Assets.buttonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*14)}

Assets.miniButton_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,8,33,8,7);
Assets.miniButton = Bitmap.createScaledBitmap(Assets.miniButton_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButton_9 = function() {return ninePatch1(Assets.miniButton, PIXEL*2, PIXEL*2, PIXEL*12, PIXEL*14)}

Assets.miniButtonClick_raw = Bitmap.createBitmap(Assets.mcpeSS_BF,0,32,8,7);
Assets.miniButtonClick = Bitmap.createScaledBitmap(Assets.miniButtonClick_raw, PIXEL*16, PIXEL*14, false);
Assets.miniButtonClick_9 = function() {return ninePatch1(Assets.miniButtonClick, PIXEL*4, PIXEL*4, PIXEL*12, PIXEL*12)}


var b = Color.parseColor("#6b6163");
var i = Color.parseColor("#3a393a");
Assets.textView_pixel = [
b,b,b,b,b,b,
b,b,b,b,b,b,
b,b,i,i,b,b,
b,b,i,i,b,b,
b,b,b,b,b,b,
b,b,b,b,b,b
];
Assets.textView_raw = Bitmap.createBitmap(6, 6, Bitmap.Config.ARGB_8888);
Assets.textView_raw.setPixels(Assets.textView_pixel, 0, 6, 0, 0, 6, 6);
Assets.textView = Bitmap.createScaledBitmap(Assets.textView_raw, PIXEL*6, PIXEL*6, false);
Assets.textView_9 = function() {return ninePatch1(Assets.textView, PIXEL*3, PIXEL*3, PIXEL*4, PIXEL*4)}

function mcpeText(size, text, shadow) {
	var tv = new TextView(ctx);
	tv.setTransformationMethod(null);
	tv.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	if(shadow) {
		tv.setShadowLayer(1/0xffffffff, DIP*1.3, DIP*1.3, Color.DKGRAY);
	}
	tv.setTextColor(Color.WHITE);
	tv.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, DIP*size);
	if(FILE_FONT.exists()) {
		tv.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	tv.setPadding(0, 0, 0, 0);
	tv.setText(text);
	return tv;
}



var Gear = {};
Gear.onMap = false;
Gear.isRemote = false;
Gear.guiVis = false;

Gear.mainGuiLoad = function() {try {
/** Layout1
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
	Gear.layout = new RelativeLayout(ctx);
	Gear.layout.setBackgroundDrawable(Assets.background_9());
	
	Gear.content = new RelativeLayout(ctx);
	Gear.content.setId(randomId());
	Gear.content.setPadding(DIP*2, DIP*2, DIP*2, DIP*2);
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
	Gear.layout.addView(Gear.led);
	
	Gear.title = new RelativeLayout(ctx);
	Gear.title.setId(randomId());
	Gear.title.setPadding(0, 0, 0, DIP*2);
	
	Gear.title.setBackgroundColor(Color.BLACK);
	
	Gear.title_param = new RelativeLayout.LayoutParams(c.m, DIP*16);
	Gear.title_param.setMargins(0, 0, 0, 0);
	Gear.title.setLayoutParams(Gear.title_param);
	
	Gear.title_text = new TextView(ctx);
	Gear.title_text.setTransformationMethod(null);
	Gear.title_text.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
	Gear.title_text.setTextColor(Color.WHITE);
	Gear.title_text.setTextSize(c.p, DIP*8);
	if(FILE_FONT.exists()) {
		Gear.title_text.setTypeface(android.graphics.Typeface.createFromFile(FILE_FONT));
	};
	Gear.title_text.setPadding(0, 0, 0, 0);
	Gear.title_text.setGravity(Gravity.CENTER);
	Gear.title_text.setText("Gear");
	
	Gear.title_text_p = new c.r.LayoutParams(c.m, c.m);
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
	
	Gear.clock1 = mcpeText(6, "오전");
	Gear.clock1.setPadding(DIP*2, 0, DIP, 0);
	Gear.clock.addView(Gear.clock1);
	
	Gear.clock2 = mcpeText(8, "1:55");
	Gear.clock.addView(Gear.clock2);
	
	Gear.title.addView(Gear.clock);
	
	Gear.info = mcpeText(8, "59%");
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
		function(view, event) {
			switch(event) {
				ConstantsintACTION_CANCELConstant forgetActionMasked(): The current gesture has been aborted.intACTION_DOWNConstant forgetActionMasked(): A pressed gesture has started, the motion contains the initial starting location.intACTION_HOVER_ENTERConstant forgetActionMasked(): The pointer is not down but has entered the boundaries of a window or view.intACTION_HOVER_EXITConstant forgetActionMasked(): The pointer is not down but has exited the boundaries of a window or view.intACTION_HOVER_MOVEConstant forgetActionMasked(): A change happened but the pointer is not down (unlike ACTION_MOVE).intACTION_MASKBit mask of the parts of the action code that are the action itself.intACTION_MOVEConstant forgetActionMasked(): A change has happened during a press gesture (between ACTION_DOWNand ACTION_UP).intACTION_OUTSIDEConstant forgetActionMasked(): A movement has happened outside of the normal bounds of the UI element.intACTION_POINTER_1_DOWNThis constant was deprecated in API level 8. UseACTION_POINTER_INDEX_MASKto retrieve the data index associated withACTION_POINTER_DOWN.intACTION_POINTER_1_UPThis constant was deprecated in API level 8. UseACTION_POINTER_INDEX_MASKto retrieve the data index associated withACTION_POINTER_UP.intACTION_POINTER_2_DOWNThis constant was deprecated in API level 8. UseACTION_POINTER_INDEX_MASKto retrieve the data index associated withACTION_POINTER_DOWN.intACTION_POINTER_2_UPThis constant was deprecated in API level 8. UseACTION_POINTER_INDEX_MASKto retrieve the data index associated withACTION_POINTER_UP.intACTION_POINTER_3_DOWNThis constant was deprecated in API level 8. UseACTION_POINTER_INDEX_MASKto retrieve the data index associated withACTION_POINTER_DOWN.intACTION_POINTER_3_UPThis constant was deprecated in API level 8. UseACTION_POINTER_INDEX_MASKto retrieve the data index associated withACTION_POINTER_UP.intACTION_POINTER_DOWNConstant forgetActionMasked(): A non-primary pointer has gone down.intACTION_POINTER_ID_MASKThis constant was deprecated in API level 8. Renamed toACTION_POINTER_INDEX_MASKto match the actual data contained in these bits.intACTION_POINTER_ID_SHIFTThis constant was deprecated in API level 8. Renamed toACTION_POINTER_INDEX_SHIFTto match the actual data contained in these bits.intACTION_POINTER_INDEX_MASKBits in the action code that represent a pointer index, used with ACTION_POINTER_DOWNand ACTION_POINTER_UP.intACTION_POINTER_INDEX_SHIFT
				ACTION_SCROLL
				ACTION_UP
			}
		}
	});
	Gear.title.addView(Gear.titleCover);
	
	Gear.frame = new ScrollView(ctx);
	Gear.frame.setPadding(0, 0, 0, 0);
	Gear.frame.setId(randomId());
	Gear.frame_p = new c.r.LayoutParams(c.m, c.m);
	Gear.frame_p.setMargins(0, 0, 0, 0);
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
	
	Gear.window = new PopupWindow(Gear.layout, DIP*160, DIP*100, false);
}catch(e) {
	showError(e);
}}

ctx.runOnUiThread(new Runnable({run: function() { try{
	Gear.mainGuiLoad();
	Gear.window.showAtLocation(ctx.getWindow().getDecorView(), Gravity.CENTER, 0, 0);
}catch(e) {
	showError(e);
}}}));

function newLevel(str) {
	Gear.onMap = true;
}

function leaveGame() {
	Gear.onMap = false;
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
	var patch = new android.graphics.drawable.NinePatchDrawable(ctx.getResources(), bitmap, buffer.array(), new android.graphics.Rect(), "");
	//var bm = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
	return patch;
}

/**
 * Marge Array
 *
 * @since 2015-06
 * @author CodeInside
 *
 * @param (Array) arr1
 * @param (Array) arr2
 * @param (String) margeType <HORIZONTAL, VERTICAL>
 * @param (Int) width1
 * @param (Int) height1
 * @param (Int) width2
 * @param (Int) height2
 * @param (...) fillBlank
 * @return (Array) 
 */
function margeArray(arr1, arr2, margeType, width1, height1, width2, height2, fillBlank) {
	var arr = [];
	switch(margeType) {
		case "HORIZONTAL":
			var maxHeight = height1 >= height2 ? height1 : height2;
			for(var e = 0; e < maxHeight; e++) {
				if(e < height1) {
					for(var f = 0; f < width1; f++) {
						arr.push(arr1[(e*width1) + f]);
					}
				}else {
					for(var f = 0; f < width1; f++) {
						if(fillBlank === null) {
							arr.push(arr1[(width1*(height1-1)) + f]);
						}else {
							arr.push(fillBlank);
						}
					}
				}
				if(e < height2) {
					for(var f = 0; f < width2; f++) {
						arr.push(arr2[(e*width2) + f]);
					}
				}else {
					for(var f = 0; f < width2; f++) {
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
			for(var e = 0; e < height1 + height2; e++) {
				for(var f = 0; f < maxWidth; f++) {
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