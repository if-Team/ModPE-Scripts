//TODO: make
Trade = {};

Utils = {};

Utils.getContext = function() {
	return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
};

Utils.createUiThread = function(func) {
	Utils.getContext().runOnUiThread(new java.lang.Runnable({
		run: function() {
			func(Utils.getContext());
		}
	}));
}

Utils.FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, Utils.getContext().getResources().getDisplayMetrics());

Utils.getSpritesheet = function() {
	return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
};

Utils.trimImage = function(bitmap, x, y, width, height) {
	return android.graphics.Bitmap.createBitmap(bitmap, x, y, width, height);
};

Utils.getStretchedImage = function(bm, x, y, stretchWidth, stretchHeight, width, height) {
	var blank = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
	var Bitmap = android.graphics.Bitmap;
	var part1 = Bitmap.createBitmap(bm, 0, 0, x, y);
	var part2 = Bitmap.createBitmap(bm, x, 0, stretchWidth, y);
	var part3 = Bitmap.createBitmap(bm, x+stretchWidth, 0, bm.getWidth()-x-stretchWidth, y);
	var part4 = Bitmap.createBitmap(bm, 0, y, x, stretchHeight);
	var part5 = Bitmap.createBitmap(bm, x, y, stretchWidth, stretchHeight);
	var part6 = Bitmap.createBitmap(bm, x+stretchWidth, y, bm.getWidth()-x-stretchWidth, stretchHeight);
	var part7 = Bitmap.createBitmap(bm, 0, y+stretchHeight, x, bm.getHeight()-y-stretchHeight);
	var part8 = Bitmap.createBitmap(bm, x, y+stretchHeight, stretchWidth, bm.getHeight()-y-stretchHeight);
	var part9 = Bitmap.createBitmap(bm, x+stretchWidth, y+stretchHeight, bm.getWidth()-x-stretchWidth, bm.getHeight()-y-stretchHeight);
	var canvas = new android.graphics.Canvas(blank);
	canvas.drawBitmap(part1, 0, 0, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part2, width-bm.getWidth()+stretchWidth, y, false), x, 0, null);
	canvas.drawBitmap(part3, width-bm.getWidth()+stretchWidth+x, 0, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part4, x, height-bm.getHeight()+stretchHeight, false), 0, y, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part5, width-bm.getWidth()+stretchWidth, height-bm.getHeight()+stretchHeight, false), x, y, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part6, part3.getWidth(), height-bm.getHeight()+stretchHeight, false), width-bm.getWidth()+stretchWidth+x, y, null);
	canvas.drawBitmap(part7, 0, height-bm.getHeight()+stretchHeight+y, null);
	canvas.drawBitmap(Bitmap.createScaledBitmap(part8, width-bm.getWidth()+stretchWidth, part7.getHeight(), false), x, height-bm.getHeight()+stretchHeight+y, null);
	canvas.drawBitmap(part9, width-bm.getWidth()+stretchWidth+x, height-bm.getHeight()+stretchHeight+y, null);
	
	return new android.graphics.drawable.BitmapDrawable(blank);
}

Utils.showBackground = function() {
	Utils.createUiThread(function(ctx) {
		var back = new android.widget.PopupWindow(ctx);
		back.setWidth(ctx.getScreenWidth());
		back.setHeight(ctx.getScreenHeight());
		var spritesheet = android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 0, 0, 16, 16), 16*Utils.FOUR, 16*Utils.FOUR, false);
		back.setBackgroundDrawable(Utils.getStretchedImage(spritesheet, 4*Utils.FOUR, 4*Utils.FOUR, 8*Utils.FOUR, 8*Utils.FOUR, ctx.getScreenWidth(), ctx.getScreenHeight()));
		back.setFocusable(true);
		back.setContentView(new android.widget.TextView(ctx));
		back.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
	});
};
