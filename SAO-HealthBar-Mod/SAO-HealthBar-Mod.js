/*
 * Copyright 2014-2015 Chalk
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

/**
 * @author Chalk <amato17@naver.com>
 * @since 2014-12-26
 * @version 0.1
 * @see https://github.com/ChalkPE/SAO-HealthBar-Mod
 */

var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var root = android.os.Environment.getExternalStorageDirectory();
var dataFolder = new java.io.File(root, "games/com.mojang/minecraftpe/sao-health-bar-mod");

var GUI = {};

var lastHealth = 0;
var running = false;
var tick = 5;

function dp(dips){
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function applyPatch(file){
    net.zhuoweizhang.mcpelauncher.PatchManager.getPatchManager(net.zhuoweizhang.mcpelauncher.ScriptManager.androidContext).setEnabled(file, true);
    net.zhuoweizhang.mcpelauncher.Utils.getPrefs(1).edit().putBoolean("force_prepatch", true).apply();
}

function makePatch(name, offsets){
    var file = new java.io.File(dataFolder, name + ".mod");
    var dos = new java.io.DataOutputStream(new java.io.FileOutputStream(file));
	dos.writeByte(0xFF);
	dos.writeByte(0x50);
	dos.writeByte(0x54);
	dos.writeByte(0x50);
	dos.writeByte(0x00);
	dos.writeByte(0x02);
	dos.writeByte(0x00);
	dos.writeByte(0x00);
	dos.writeByte(0x00);
	dos.writeByte(0x0E);
	dos.writeByte(0x00);
	dos.writeByte(0x00);
	dos.writeByte(0x00);
	dos.writeByte(0x14);
	//HEADER
	
	offsets.forEach(function(offset){
		dos.writeByte(0x00);
		offset.forEach(function(hex){
			dos.writeByte(hex);
		});
	});
	dos.close();
	
	return file;
}

function getMinecraftOptions(){
    var data = {};
    var file = new java.io.File(root, "games/com.mojang/minecraftpe/options.txt");
    
    try{
        var br = new java.io.BufferedReader(new java.io.FileReader(file), 4096);
        var read;
		
        while((read = br.readLine()) != null){
            var p = read.split(":");
            data[p[0]] = p[1];
        }
        br.close();
    }catch(e){}
    
    return data;
}

new java.lang.Thread({run: function(){
	if(!dataFolder.exists()){
		dataFolder.mkdirs();
		new java.io.File(dataFolder, ".nomedia").createNewFile();
	}
	
	var file = makePatch("sao-health-bar-mod", [
	    [0x1B,0xD2,0xA0, 0x70,0x47],
	    [0x37,0x6E,0xCC, 0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20]
	]);
	applyPatch(file);
	
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		android.widget.Toast.makeText(ctx, "Setting up resources - Please wait...", android.widget.Toast.LENGTH_SHORT).show();
	}}));
	
	downloadFile(new java.io.File(dataFolder, "sao-ui.otf"), "https://github.com/ChalkPE/SAO-HealthBar-Mod/raw/master/sao-ui.otf");
	downloadFile(new java.io.File(dataFolder, "you-are-dead.png"), "https://github.com/ChalkPE/SAO-HealthBar-Mod/raw/master/you-are-dead.png");
	
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
		
		var blockParam = new android.widget.LinearLayout.LayoutParams(dp(21), -1);
		blockParam.rightMargin = dp(2);
		
		var block = new android.widget.ImageView(ctx);
		block.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.parseColor("#80D0D0D0")));
		layout.addView(block, blockParam);
		
		var gradientLayout = new android.widget.LinearLayout(ctx);
		gradientLayout.setGravity(android.view.Gravity.CENTER_VERTICAL);
		gradientLayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
		gradientLayout.setPadding(dp(6), dp(6), dp(20), dp(6));
		
		var orientation = android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
		var colours = [android.graphics.Color.parseColor("#80D0D0D0"), android.graphics.Color.parseColor("#00D0D0D0")];
		
		var gradient = new android.graphics.drawable.GradientDrawable(orientation, colours);
		gradientLayout.setBackgroundDrawable(gradient);
		
		var nickname = getMinecraftOptions()["mp_username"].split(" ")[0];
		
		var font = android.graphics.Typeface.createFromFile(new java.io.File(dataFolder, "sao-ui.otf"));
		
		var text = new android.widget.TextView(ctx);
		text.setText((nickname.substring(0, 1) + "").toUpperCase() + nickname.substring(1).toLowerCase() + "  ");
		text.setTextColor(android.graphics.Color.WHITE);
		text.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 22);
		text.setShadowLayer(dp(3), 0, 0, android.graphics.Color.DKGRAY);
		text.setTypeface(font);
		
		GUI.deadSplash = new android.widget.ImageView(ctx);
		GUI.deadSplash.setImageBitmap(android.graphics.BitmapFactory.decodeFile(new java.io.File(dataFolder, "you-are-dead.png")));
		GUI.deadSplash.setScaleType(android.widget.ImageView.ScaleType.CENTER_INSIDE);
		
		GUI.deadWindow = new android.widget.PopupWindow(GUI.deadSplash);
		GUI.deadWindow.setWindowLayoutMode(-2, -2);
		
		GUI.sizeMap = {
			xoff: dp(6), yoff: dp(6),
		
			width: dp(280),
			height: dp(20)
		};

		GUI.frame = new android.widget.FrameLayout(ctx);
		
		GUI.bar = new android.widget.ImageView(ctx);
		GUI.bar.setImageBitmap(getGaugeBitmap(GUI.sizeMap, 0));
		
		GUI.border = new android.widget.ImageView(ctx);
		GUI.border.setImageBitmap(
				getBorderBitmap(GUI.sizeMap, [[android.graphics.Color.parseColor("#cdcdcd"), dp(4)],
		                                      [android.graphics.Color.parseColor("#303030"), dp(3)]]));
		
		GUI.frame.addView(GUI.bar);
		GUI.frame.addView(GUI.border);

		gradientLayout.addView(text);
		gradientLayout.addView(GUI.frame);
		
		layout.addView(gradientLayout);
		
		GUI.window = new android.widget.PopupWindow(layout);
		GUI.window.setWindowLayoutMode(-2, -2);
		
		android.widget.Toast.makeText(ctx, "© 2014-2015 ChalkPE. All rights reserved.\n\nSAO-HealthBar-Mod launched!", android.widget.Toast.LENGTH_SHORT).show();
	}}));
}}).start();

function procCmd(cmd){
	if(cmd.split(" ")[0] != "set") return;
	
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		try{
			var percent = eval(cmd.substring(cmd.indexOf(" ")));
			GUI.bar.setImageBitmap(getGaugeBitmap(GUI.sizeMap, percent));
		}catch(e){
			clientMessage(e.message);
		}
	}}));
}

function modTick(){
	var health = Entity.getHealth(Player.getEntity()) * 10;
	if(health > 200) health = 200;
	if(health < 0) health = 0;
	
	if((lastHealth != health) && !running){
		running = true;
		//clientMessage(lastHealth + " -> " + health);
		
		new java.lang.Thread({run: function(){
			var oldValue = lastHealth;
			var newValue = health;
			
			var diff = Math.abs(oldValue - newValue);
			var gauge = oldValue;
			
			lastHealth = health;
			
			while(true){
				java.lang.Thread.sleep(Math.floor(100 / diff));
				
				if(oldValue > newValue){
					gauge--;
					if(gauge < newValue) break;
				}else{
					gauge++;
					if(gauge > newValue) break;
				}
				
				ctx.runOnUiThread(new java.lang.Runnable({run: function(){
					GUI.bar.setImageBitmap(getGaugeBitmap(GUI.sizeMap, gauge / 200));
				}}));
			}
			
			if(oldValue > 0 && newValue == 0){
				ctx.runOnUiThread(new java.lang.Runnable({run: function(){
					GUI.window.dismiss();
					GUI.deadWindow.showAtLocation(ctx.getWindow().getDecorView(),
							android.view.Gravity.TOP | android.view.Gravity.CENTER, 0, dp(40));
				}}));
			}
			
			if(oldValue == 0 && newValue > 0){
				ctx.runOnUiThread(new java.lang.Runnable({run: function(){
					GUI.deadWindow.dismiss();
					newLevel();
				}}));
			}
			
			running = false;
		}}).start();
	}
}

function newLevel(){
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		if(GUI.window == null){
			android.widget.Toast.makeText(ctx, "SAO-HealthBar-Mod didn't loaded! Please re-enter your world when done!", android.widget.Toast.LENGTH_SHORT).show();
			return;
		}
		
		GUI.window.showAtLocation(ctx.getWindow().getDecorView(),
				android.view.Gravity.TOP | android.view.Gravity.LEFT, dp(15), dp(15));
	}}));
}

function leaveGame(){
	lastHealth = 0;
	
	ctx.runOnUiThread(new java.lang.Runnable({run: function(){
		GUI.window.dismiss();
		GUI.bar.setImageBitmap(getGaugeBitmap(GUI.sizeMap, 0));
	}}));
}

function getFilledBitmap(map, colour){
	var bitmap = android.graphics.Bitmap.createBitmap(
			map.xoff * 2 + map.width,
			map.yoff * 2 + map.height,
			android.graphics.Bitmap.Config.ARGB_8888);
	
	var canvas = new android.graphics.Canvas(bitmap);
	
	var paint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
	paint.setStrokeJoin(android.graphics.Paint.Join.MITER);
	paint.setStyle(android.graphics.Paint.Style.FILL);
	paint.setColor(colour);
	
	/*
	 * a--------------b
	 * |       d-----c
	 * f------e
	 */
	var dgn = (map.height / 2) * (3 / 5);
	
	var path = new android.graphics.Path();
	/* a */ path.moveTo(map.xoff - dp(3),                       map.yoff - dp(3));
	/* b */ path.lineTo(map.xoff + dp(3) + map.width,           map.yoff - dp(3));
	/* c */ path.lineTo(map.xoff + dp(3) + map.width - dgn,     map.yoff + dp(3) + map.height / 2);
	/* d */ path.lineTo(map.xoff + dp(3) + map.width / 2 + dgn, map.yoff + dp(3) + map.height / 2);
	/* e */ path.lineTo(map.xoff + dp(3) + map.width / 2,       map.yoff + dp(3) + map.height);
	/* f */ path.lineTo(map.xoff - dp(3),                       map.yoff + dp(3) + map.height);
	/* a */ path.lineTo(map.xoff - dp(3),                       map.yoff - dp(3));
	path.close();
	
	canvas.drawPath(path, paint);
	
	return bitmap;
}

function getBorderBitmap(map, layers){
	var bitmap = android.graphics.Bitmap.createBitmap(
			map.xoff * 2 + map.width,
			map.yoff * 2 + map.height,
			android.graphics.Bitmap.Config.ARGB_8888);
	
	var canvas = new android.graphics.Canvas(bitmap);
	
	var paint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
	paint.setStrokeJoin(android.graphics.Paint.Join.MITER);
	paint.setStyle(android.graphics.Paint.Style.STROKE);
	
	/*
	 * a--------------b
	 * |       d-----c
	 * f------e
	 */
	var dgn = (map.height / 2) * (3 / 5);
	
	layers.forEach(function(layer){
		var path = new android.graphics.Path();
		/* a */ path.moveTo(map.xoff - layer[1] / 2,                       map.yoff - layer[1] / 2);
		/* b */ path.lineTo(map.xoff + layer[1] / 2 + map.width,           map.yoff - layer[1] / 2);
		/* c */ path.lineTo(map.xoff + layer[1] / 2 + map.width - dgn,     map.yoff + layer[1] / 2 + map.height / 2);
		/* d */ path.lineTo(map.xoff + layer[1] / 2 + map.width / 2 + dgn, map.yoff + layer[1] / 2 + map.height / 2);
		/* e */ path.lineTo(map.xoff + layer[1] / 2 + map.width / 2,       map.yoff + layer[1] / 2 + map.height);
		/* f */ path.lineTo(map.xoff - layer[1] / 2,                       map.yoff + layer[1] / 2 + map.height);
		/* a */ path.lineTo(map.xoff - layer[1] / 2,                       map.yoff - layer[1] / 2);
		path.close();
		
		paint.setColor(layer[0]);
		paint.setStrokeWidth(layer[1]);
		
		canvas.drawPath(path, paint);
	});
	
	return bitmap;
}

function getGaugeBitmap(map, gauge){
	
	var bitmap = android.graphics.Bitmap.createBitmap(
			map.xoff * 2 + map.width,
			map.yoff * 2 + map.height,
			android.graphics.Bitmap.Config.ARGB_8888);
	
	var canvas = new android.graphics.Canvas(bitmap);
	
	var paint = new android.graphics.Paint(android.graphics.Paint.ANTI_ALIAS_FLAG);
	paint.setStrokeJoin(android.graphics.Paint.Join.MITER);
	paint.setStyle(android.graphics.Paint.Style.FILL);
	
	map._xoff = map.xoff; // + dp(2);
	map._yoff = map.yoff; // + dp(2);
	
	map._width = map.width; // - dp(4);
	map._height = map.height; //- dp(4);
	
	var dgn = (map._height / 2) * (3 / 5);
	
	var mode = 0;
	var startColor = android.graphics.Color.TRANSPARENT;
	var endColor = android.graphics.Color.TRANSPARENT;
	
	if(gauge >= (map._width / 2 + dgn * 2) / map._width){
		mode = 3; //GREEN
		
		startColor = android.graphics.Color.parseColor("#609705");
		endColor = android.graphics.Color.parseColor("#7abe1b");
	}else if(gauge >= (map._width / 4.5) / map._width){
		mode = 2; //YELLOW
		
		startColor = android.graphics.Color.parseColor("#918a16");
		endColor = android.graphics.Color.parseColor("#b9b62b");
	}else if(gauge >= ((dgn * 2) / map._width)){
		mode = 1; //RED
		
		startColor = android.graphics.Color.parseColor("#9e0838");
		endColor = android.graphics.Color.parseColor("#bd1e54");
	}else{
		mode = 0; //TRIANGLE-RED
		
		startColor = android.graphics.Color.parseColor("#9e0838");
		endColor = android.graphics.Color.parseColor("#bd1e54");
	}
	
	paint.setShader(new android.graphics.LinearGradient(
			0, 0,
			0, map._yoff + map._height,
			startColor,
			endColor,
			android.graphics.Shader.TileMode.CLAMP));
	
	/*
	 * a--------------b
	 * E       d-----c
	 * f------e
	 */
	
	var path = new android.graphics.Path();
	/* a */ path.moveTo(map._xoff, map._yoff);
	/* b */ path.lineTo(map._xoff + map._width * gauge, map._yoff);
	
	switch(mode){
	case 3:
	/* c */ path.lineTo(map._xoff + map._width * gauge - dgn,     map._yoff + map._height / 2);
	/* d */ path.lineTo(map._xoff + map._width / 2 + dgn,         map._yoff + map._height / 2);
	/* e */ path.lineTo(map._xoff + map._width / 2,               map._yoff + map._height);
	/* f */ path.lineTo(map._xoff,                                map._yoff + map._height);
	break;
	
	case 2:
	case 1:
	/* e */ path.lineTo(map._xoff + map._width * gauge - dgn * 2, map._yoff + map._height);
	/* f */ path.lineTo(map._xoff,                                map._yoff + map._height);
	break;
	
	case 0:
	/* E */ path.lineTo(map._xoff, map._yoff + map._height * (gauge / (dgn * 2 / map._width)));
	break;
	}
	
	/* a */ path.lineTo(map._xoff, map._yoff);
	path.close();
	
	canvas.drawPath(path, paint);
	return bitmap;
}

function downloadFile(file, url){
    try{
    	if(file.exists()) return;
    	
        url = new java.net.URL(url);
        
        var bis = new java.io.BufferedInputStream(url.openStream());
        var bos = new java.io.FileOutputStream(file);
        var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
        var count = 0;
        
        while((count = bis.read(buf)) >= 0){
            bos.write(buf, 0, count);
        }
        
        bos.flush();
        bos.close();
        bis.close();
    }catch(e){
    	
    }
}
