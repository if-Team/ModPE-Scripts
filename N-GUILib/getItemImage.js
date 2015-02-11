var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

var images;
var reader = new java.io.BufferedReader(new java.io.InputStreamReader(pectx.getAssets().open("images/items.meta")));
eval("images = "+reader.readLine());
reader.close();
var items_opaque = android.graphics.BitmapFactory.decodeStream(pectx.getAssets().open("images/items-opaque.png"));
var terrain_atlas = pectx.getAssets().open("images/terrain-atlas.tga");

function getItemBitmap(data) {
	var result = null;
	images.forEach(function(element) {
		if(element.name == data[0]&&element.uvs[data[1]] != null) {
			var bgnX = element.uvs[data[1]][0]*256;
			var bgnY = element.uvs[data[1]][1]*256;
			var endX = element.uvs[data[1]][2]*256;
			var endY = element.uvs[data[1]][3]*256;
			result = android.graphics.Bitmap.createBitmap(items_opaque, bgnX, bgnY, endX-bgnX, endY-bgnY);
		}
	});
	return result;
}

function getImage(is) {
	var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, is.available());
	is.read(buf);
	var bimg = android.graphics.BitmapFactory.decodeByteArray(buf, 0, buf.length);
	return bimg;
}

function useItem() {
	var b = new GUILib.GUIButton(0,0,128,64,"");
	b.btn.setImageBitmap(getImage(terrain_atlas));
	b.render();
}