var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var windowText,layoutText,scrollText;
var texts = [];
var maxText = 16;

if(debuging) createTextView();

function dp(dips) {
	return parseInt(dips * ctx.getResources().getDisplayMetrics().density + 0.5);
}

function createTextView() {ctx.runOnUiThread(new java.lang.Runnable({ run: function(){ try{
	scrollText = new android.widget.ScrollView(ctx);
	scrollText.fullScroll(130);
	layoutText = new android.widget.LinearLayout(ctx);
	layoutText.setOrientation(android.widget.LinearLayout.VERTICAL);
	layoutText.setGravity(android.view.Gravity.BOTTOM);
	scrollText.addView(layoutText);
	windowText = new android.widget.PopupWindow(scrollText, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight() ,false);
	windowText.setTouchable(false);
	windowText.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, 0, 0);
}catch(e) {
	print(e.lineNumber)
}}}))};


function addText(text, color) {ctx.runOnUiThread(new java.lang.Runnable({ run: function(){ try{
	if(texts.length >= maxText) {
		layoutText.removeView(texts.shift());
	}
	texts.push(new android.widget.Button(ctx));
	texts[texts.length-1].setBackgroundColor(android.graphics.Color.argb(50,0,0,0));
	texts[texts.length-1].setPadding(dp(1), 0, dp(1), 0);
	texts[texts.length-1].setGravity(android.view.Gravity.LEFT | android.view.Gravity.TOP);
	texts[texts.length-1].setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 10);
	texts[texts.length-1].setText(text + "");
	if(color != null) {
		texts[texts.length-1].setTextColor(color)
	}
	 layoutText.addView(texts[texts.length-1], android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dp(13));
}catch(e) {
	print(e.lineNumber)
}}}))};

function procCmd(str) {
	addText(str);
}

function modTick() {
	addText(Math.random() + "");
}