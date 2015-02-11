var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx = ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

var images;
var reader = new java.io.BufferedReader(new java.io.InputStreamReader(pectx.getAssets().open("images/items.meta")));
eval("images = "+reader.readLine());
reader.close();
var items_opaque = android.graphics.BitmapFactory.decodeStream(pectx.getAssets().open("images/items-opaque.png"));
var width = items_opaque.getWidth();
var height = items_opaque.getHeight();

function getItemBitmap(data) {
	var result = null;
	images.forEach(function(element) {
		if(element.name == data[0]&&element.uvs[data[1]] != null) {
			var bgnX = element.uvs[data[1]][0]*width;
			var bgnY = element.uvs[data[1]][1]*height;
			var endX = element.uvs[data[1]][2]*width;
			var endY = element.uvs[data[1]][3]*height;
			result = android.graphics.Bitmap.createBitmap(items_opaque, bgnX, bgnY, endX-bgnX, endY-bgnY);
		}
	});
	return result;
}
