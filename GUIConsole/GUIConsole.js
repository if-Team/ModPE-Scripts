/**
 * @author ChalkPE <amato0617@gmail.com>
 * @since ‎2014‎-12‎-‎15‎ ‎20:31:53
 */

var GUIConsole = {
	ctx: com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
	ui: function(runFunc){GUIConsole.ctx.runOnUiThread(new java.lang.Runnable({run: runFunc}));},
	dp: function(dips){return Math.ceil(dips * GUIConsole.ctx.getResources().getDisplayMetrics().density);},
	
	Resources: {
		typeface: android.graphics.Typeface.MONOSPACE,
		
		uiColor: "#ff80cbc5",
		backgroundColor: "#60808080",
		buttonTextColor: "#ffffffff",
		
		logColor: "#ffffff",
		commandColor: "#0099ff",
		errorColor: "#ff5555",
		highlightColor: "#ffcc00",
		pointerColor: "#ffffff"
	},
	
	Skin: {
		original: {
			uiColor: "#ff80cbc5",
			backgroundColor: "#60808080",
			buttonTextColor: "#ffffffff",
	
			logColor: "#ffffff",
			commandColor: "#0099ff",
			errorColor: "#ff5555",
			highlightColor: "#ffcc00",
			pointerColor: "#ffffff"
		},
		green: {
			uiColor: "#80cb92",
			backgroundColor: "#cc000000",
			buttonTextColor: "#ffffffff",
	
			logColor: "#80cb92",
			commandColor: "#ffffff",
			errorColor: "#356e47",
			highlightColor: "#80cb92",
			pointerColor: "#80cb92"
		},
		red: {
			uiColor: "#cb8080",
			backgroundColor: "#cc000000",
			buttonTextColor: "#ffffffff",
	
			logColor: "#cb8080",
			commandColor: "#ffffff",
			errorColor: "#ff5555",
			highlightColor: "#cb8080",
			pointerColor: "#cb8080"
		},
		cyan: {
			uiColor: "#80cbc5",
			backgroundColor: "#cc000000",
			buttonTextColor: "#ffffffff",
	
			logColor: "#80cbc5",
			commandColor: "#ffffff",
			errorColor: "#55fffd",
			highlightColor: "#80cbc5",
			pointerColor: "#80cbc5"
		},
		lemon: {
			uiColor: "#cbc880",
			backgroundColor: "#cc000000",
			buttonTextColor: "#ffffffff",
	
			logColor: "#cbc880",
			commandColor: "#ffffff",
			errorColor: "#edff55",
			highlightColor: "#cbc880",
			pointerColor: "#cbc880"
		}
	},
	
	Callback: {
		onSystemCommand: function(cmd){
			//TODO: Implement command event
			var str = cmd.split(" ");
			switch(str.shift()){
				case "ping":
					GUIConsole.Console.append("Pong!");
					break;
				
				case "echo":
					GUIConsole.Console.append(str.join(" "));
					break;
				
				case "close":
				case "exit":
					GUIConsole.GUI.window.dismiss();
					break;
				
				case "skin":
					GUIConsole.GUI.setStyle(GUIConsole.Skin[str[0]] || GUIConsole.Resources);
					/* falls through */
					
				case "clear":
				case "cls":
					GUIConsole.Console.clear();
					break;
					
				case "resize":
					GUIConsole.GUI.extended = str[0] == "true";
					GUIConsole.GUI.updateWindow();
					break;
				
				default:
					if(typeof GUIConsole.Callback.onCommand == 'function'){
						GUIConsole.Callback.onCommand(cmd);
						return;
					}
					GUIConsole.Console.append('<font color="' + GUIConsole.Resources._errorColor + '">' + "[ERROR] NOT IMPLEMENTED</font>");
			}
		}
	},
	
	GUI: {
		extended: false,
		Values: {
			srad: GUIConsole.dp(2.5), sxoff: GUIConsole.dp(1), syoff: GUIConsole.dp(1),
			xoff: GUIConsole.dp(10), yoff: GUIConsole.dp(20), xlim: GUIConsole.dp(80),
			grav: android.view.Gravity.TOP | android.view.Gravity.LEFT,
			nhgt: 1 / 3.5, ehgt: 3 / 4
		},
		
		getParams: function(width, height, margin, left, top, right, bottom, gravity){
			var p = margin ? new android.widget.LinearLayout.LayoutParams(width, height, margin) : new android.widget.LinearLayout.LayoutParams(width, height);
			
			if(left) p.leftMargin = left; if(right) p.rightMargin = right; if(top) p.topMargin = top; if(bottom) p.bottomMargin = bottom;
			if(gravity) p.gravity = gravity;
			
			return p;
		},
		
		getRoundRectShape: function(r, color){
			var f = new java.lang.Float(r);
			var shape = new android.graphics.drawable.ShapeDrawable(new android.graphics.drawable.shapes.RoundRectShape([f, f, f, f, f, f, f, f], null, null));
			shape.getPaint().setColor(android.graphics.Color.parseColor(color));
			
			return shape;
		},
		
		create: function(style){GUIConsole.ui(function(){
			style = style || GUIConsole.Resources;
			
			GUIConsole.ctx.setTheme(android.R.style.Theme_Holo);
			GUIConsole.GUI.display = GUIConsole.ctx.getWindowManager().getDefaultDisplay();
		    
			GUIConsole.GUI.layout = new android.widget.FrameLayout(GUIConsole.ctx);
			
			GUIConsole.GUI.log = new android.widget.TextView(GUIConsole.ctx);
			GUIConsole.GUI.log.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 15);
			GUIConsole.GUI.log.setShadowLayer(GUIConsole.GUI.Values.srad, GUIConsole.GUI.Values.sxoff, GUIConsole.GUI.Values.syoff, android.graphics.Color.BLACK);
			GUIConsole.GUI.log.setPadding(GUIConsole.dp(7), GUIConsole.dp(7), GUIConsole.dp(7), GUIConsole.dp(7));
		    
			GUIConsole.GUI.scroll = new android.widget.ScrollView(GUIConsole.ctx);
			GUIConsole.GUI.scroll.addView(GUIConsole.GUI.log); 
			GUIConsole.GUI.layout.addView(GUIConsole.GUI.scroll, GUIConsole.GUI.getParams(-1, -1));
			
			var inputParam = new android.widget.FrameLayout.LayoutParams(-2, -2);
			inputParam.gravity = android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM;
			inputParam.topMargin = GUIConsole.dp(8); inputParam.bottomMargin = GUIConsole.dp(8); inputParam.rightMargin = GUIConsole.dp(8);
			
			GUIConsole.GUI.input = new android.widget.TextView(GUIConsole.ctx);
			GUIConsole.GUI.input.setText("CMD");
			GUIConsole.GUI.input.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 18);
			GUIConsole.GUI.input.setGravity(android.view.Gravity.CENTER);
			GUIConsole.GUI.input.setOnClickListener(new android.view.View.OnClickListener({onClick: GUIConsole.GUI.showCommand}));
			GUIConsole.GUI.input.setPadding(GUIConsole.dp(9), GUIConsole.dp(7), GUIConsole.dp(9), GUIConsole.dp(7));
			GUIConsole.GUI.layout.addView(GUIConsole.GUI.input, inputParam);
			
			
			GUIConsole.GUI.commandLayout = new android.widget.LinearLayout(GUIConsole.ctx);
			GUIConsole.GUI.commandLayout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
			GUIConsole.GUI.commandLayout.setGravity(android.view.Gravity.CENTER);
			GUIConsole.GUI.commandLayout.setPadding(GUIConsole.dp(7), GUIConsole.dp(10), GUIConsole.dp(7), GUIConsole.dp(10));
			
			GUIConsole.GUI.closeButton = new android.widget.TextView(GUIConsole.ctx);
			GUIConsole.GUI.closeButton.setText("CLOSE");
			GUIConsole.GUI.closeButton.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 18);
			GUIConsole.GUI.closeButton.setShadowLayer(GUIConsole.GUI.Values.srad, GUIConsole.GUI.Values.sxoff, GUIConsole.GUI.Values.syoff, android.graphics.Color.BLACK);
			GUIConsole.GUI.closeButton.setGravity(android.view.Gravity.CENTER);
			GUIConsole.GUI.closeButton.setOnClickListener(new android.view.View.OnClickListener({onClick: function(){
				GUIConsole.GUI.commandPopup.dismiss();
			}}));
			//GUIConsole.GUI.closeButton.setPadding(GUIConsole.dp(9), GUIConsole.dp(7), GUIConsole.dp(9), GUIConsole.dp(7));
			GUIConsole.GUI.commandLayout.addView(GUIConsole.GUI.closeButton, GUIConsole.GUI.getParams(-2, -2, 0, 0, 0, GUIConsole.dp(10)));
			
			GUIConsole.GUI.command = new android.widget.EditText(GUIConsole.ctx);
			GUIConsole.GUI.command.setHint("Input command...");
			GUIConsole.GUI.command.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 15);
			GUIConsole.GUI.command.setShadowLayer(GUIConsole.GUI.Values.srad, GUIConsole.GUI.Values.sxoff, GUIConsole.GUI.Values.syoff, android.graphics.Color.BLACK);
			GUIConsole.GUI.command.setSingleLine(true);
			GUIConsole.GUI.commandLayout.addView(GUIConsole.GUI.command, GUIConsole.GUI.getParams(-2, -2, 1.0));
			
			GUIConsole.GUI.enterCommand = new android.widget.TextView(GUIConsole.ctx);
			GUIConsole.GUI.enterCommand.setText("SEND");
			GUIConsole.GUI.enterCommand.setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 18);
			GUIConsole.GUI.enterCommand.setShadowLayer(GUIConsole.GUI.Values.srad, GUIConsole.GUI.Values.sxoff, GUIConsole.GUI.Values.syoff, android.graphics.Color.BLACK);
			GUIConsole.GUI.enterCommand.setGravity(android.view.Gravity.CENTER);
			GUIConsole.GUI.enterCommand.setOnClickListener(new android.view.View.OnClickListener({onClick: GUIConsole.GUI.onCommand}));
			//GUIConsole.GUI.enterCommand.setPadding(GUIConsole.dp(9), GUIConsole.dp(7), GUIConsole.dp(9), GUIConsole.dp(7));
			GUIConsole.GUI.commandLayout.addView(GUIConsole.GUI.enterCommand, GUIConsole.GUI.getParams(-2, -2, 0, GUIConsole.dp(10)));
			
			GUIConsole.GUI.setStyle(style);
			
			GUIConsole.GUI.window = new android.widget.PopupWindow(GUIConsole.GUI.layout, GUIConsole.GUI.display.getWidth() - GUIConsole.GUI.Values.xlim, GUIConsole.GUI.display.getHeight() * GUIConsole.GUI.Values.nhgt);
			GUIConsole.GUI.window.showAtLocation(GUIConsole.ctx.getWindow().getDecorView(), GUIConsole.GUI.Values.grav, GUIConsole.GUI.Values.xoff, GUIConsole.GUI.Values.yoff);
			
			GUIConsole.GUI.commandPopup = new android.widget.PopupWindow(GUIConsole.GUI.commandLayout, GUIConsole.GUI.display.getWidth() - GUIConsole.GUI.Values.xlim, -2);
			GUIConsole.GUI.commandPopup.setFocusable(true);
			
			GUIConsole.Console.clear();
		});},
		
		setStyle: function(res){
			res = res || {};
			
			GUIConsole.GUI.buttonBackgroud = GUIConsole.GUI.getRoundRectShape(GUIConsole.dp(3), res.uiColor || GUIConsole.Resources.uiColor);
			GUIConsole.GUI.background = GUIConsole.GUI.getRoundRectShape(GUIConsole.dp(9), res.backgroundColor || GUIConsole.Resources.backgroundColor);
			
			GUIConsole.GUI.log.setTextColor(android.graphics.Color.parseColor(res.logColor || GUIConsole.Resources.logColor));
			
			GUIConsole.GUI.scroll.setBackgroundDrawable(GUIConsole.GUI.background);
					
			GUIConsole.GUI.input.setTextColor(android.graphics.Color.parseColor(res.buttonTextColor || GUIConsole.Resources.buttonTextColor));
			GUIConsole.GUI.input.setBackgroundDrawable(GUIConsole.GUI.buttonBackgroud);
			
			GUIConsole.GUI.command.setTextColor(android.graphics.Color.parseColor(res.buttonTextColor || GUIConsole.Resources.buttonTextColor));
			GUIConsole.GUI.command.setHintTextColor(android.graphics.Color.parseColor(res.buttonTextColor || GUIConsole.Resources.buttonTextColor));
			GUIConsole.GUI.command.getBackground().setColorFilter(android.graphics.Color.parseColor(res.uiColor || GUIConsole.Resources.uiColor), android.graphics.PorterDuff.Mode.SRC_IN);
			
			GUIConsole.GUI.closeButton.setTextColor(android.graphics.Color.parseColor(res.buttonTextColor || GUIConsole.Resources.buttonTextColor));
			
			GUIConsole.GUI.enterCommand.setTextColor(android.graphics.Color.parseColor(res.buttonTextColor || GUIConsole.Resources.buttonTextColor));
			
			GUIConsole.GUI.setTypeface(res);
			
			GUIConsole.Resources._commandColor = res.commandColor || GUIConsole.Resources.commandColor;
			GUIConsole.Resources._errorColor = res.errorColor || GUIConsole.Resources.errorColor;
			GUIConsole.Resources._highlightColor = res.highlightColor || GUIConsole.Resources.highlightColor;
			GUIConsole.Resources._pointerColor = res.pointerColor || GUIConsole.Resources.pointerColor;
		},
		
		setTypeface: function(res){
			GUIConsole.GUI.log.setTypeface(res.typeface || GUIConsole.Resources.typeface);
			GUIConsole.GUI.input.setTypeface(res.typeface || GUIConsole.Resources.typeface);
			GUIConsole.GUI.command.setTypeface(res.typeface || GUIConsole.Resources.typeface);
			GUIConsole.GUI.closeButton.setTypeface(res.typeface || GUIConsole.Resources.typeface);
			GUIConsole.GUI.enterCommand.setTypeface(res.typeface || GUIConsole.Resources.typeface);
		},
		
		showCommand: function(view){
			GUIConsole.ui(function(){
				GUIConsole.GUI.commandPopup.showAtLocation(GUIConsole.ctx.getWindow().getDecorView(), GUIConsole.GUI.Values.grav, GUIConsole.GUI.Values.xoff, GUIConsole.GUI.Values.yoff + (GUIConsole.GUI.extended ? 0 : GUIConsole.GUI.window.getHeight()));
			});
		},
		
		updateWindow: function(){
			var winHeight = GUIConsole.GUI.extended ? GUIConsole.GUI.Values.ehgt : GUIConsole.GUI.Values.nhgt;
			var winY = GUIConsole.GUI.Values.yoff + (GUIConsole.GUI.extended ? GUIConsole.GUI.commandLayout.getHeight() - GUIConsole.dp(5) : 0);
			
			var param = GUIConsole.GUI.input.getLayoutParams();
			param.gravity = android.view.Gravity.RIGHT | (GUIConsole.GUI.extended ? android.view.Gravity.TOP : android.view.Gravity.BOTTOM);
			GUIConsole.GUI.input.setLayoutParams(param);
			
			GUIConsole.GUI.window.update(GUIConsole.GUI.Values.xoff, winY, -1, GUIConsole.GUI.display.getHeight() * winHeight);
			GUIConsole.GUI.commandPopup.dismiss();
		},
		
		onCommand: function(view){
			var cmd = GUIConsole.GUI.command.getText().toString() + "";
			if(cmd.length == 0) return;
			
			GUIConsole.GUI.command.setText("");
			GUIConsole.Console.append(java.lang.String.format(GUIConsole.Console.command, GUIConsole.Resources._pointerColor, GUIConsole.Resources._commandColor, cmd));
			
			GUIConsole.Callback.onSystemCommand(cmd);
		}
	},
	
	Console: {
		copyright: '<font color="%s">GUIConsole - Copyright (c) 2014 Chalk</font>',
		command: '<font color="%s">></font> <font color="%s">%s</font>',
		log: new java.lang.StringBuffer(1024),
		
		set: function(newText){
			GUIConsole.ui(function(){
				GUIConsole.GUI.log.setText(android.text.Html.fromHtml(newText));
			});
		},
		
		append: function(text){
			GUIConsole.Console.log.append("<br>");
			GUIConsole.Console.log.append(text);
			
			GUIConsole.Console.set(GUIConsole.Console.log.toString());
			
			new java.lang.Thread({run: function(){
				java.lang.Thread.sleep(150);
				GUIConsole.GUI.scroll.fullScroll(android.view.View.FOCUS_DOWN);
			}}).start();
		},
		
		clear: function(){
			GUIConsole.Console.log = new java.lang.StringBuffer(1024);
			GUIConsole.Console.log.append(java.lang.String.format(GUIConsole.Console.copyright, GUIConsole.Resources._highlightColor));
			
			GUIConsole.Console.set(GUIConsole.Console.log.toString());
		}
	}
};

/*********** FOR TEST ***********/
GUIConsole.GUI.create();
/*********** FOR TEST ***********/