var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var root = android.os.Environment.getExternalStorageDirectory().getAbsoluteFile();

var runOnUiThread = function(func) {
	ctx.runOnUiThread(new java.lang.Runnable({run: func}));
}

var info = {};

info.version = "0.1";
info.name = "PSYCHO - PASS | DOMINATOR Script";
info.maker = "Choseul (chocoslime)";
info.isKorean = true;

