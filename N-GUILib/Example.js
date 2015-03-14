var progress;

function useItem(x, y, z) {
	new java.lang.Thread(new java.lang.Runnable({run: function(){
	var back = new GUILib.Background("DIRT"); //Recommend DIRT type(It is more minecraftical!)
	var top = new GUILib.TopBar(0, 0, GUILib.DEVICEWIDTH, 28,"Top Bar");
	var b = new GUILib.GUIButton(0, 0, 96, 96, "헉");
	var btn = new GUILib.ImageButton(0, 0, 96, 20, ["apple",0], function(thiz) {
		print(seek.getValue());
	});
	var group = new GUILib.GUIGroup(0, 0, GUILib.HORIZONTAL, [b, btn]);

	var btn2 = new GUILib.GUIButton(0, 0, 96, 20, "버튼", function(thiz) {
	});
	var btn3 = new GUILib.EditText(0, 0, 96, 20, "Hint Text");
	var seek = new GUILib.ControlBar(0, 0, 150, 20, 6, 1, true);
	var swit = new GUILib.Switch(0, 0, null);
	var check = new GUILib.CheckBox(0, 0, "체크박스");
	var visual = new GUILib.VisualFont(0, 0, "GUILib for ModPE 0.1 beta", 16);
	progress = new GUILib.ProgressBar(0, 0, 100);
	var scroll = new GUILib.GUIScroll(0, 0, 80, [group, btn2, btn3, visual, swit, check, progress, seek]);
	var window = new GUILib.Window(GUILib.DEVICEWIDTH/2 - 101, GUILib.DEVICEHEIGHT/2-40, 192, 80, scroll);
	var x = new GUILib.DeleteButton(4, 4, [back, top, window], function() {
		print("Deleted");
		progress = null;
	}, true);
	//Declare first for rendering speed!
	
	back.render(); //It must be rendered first because it's background
	top.render();
	window.render();
	x.render();
	
	var warn = new GUILib.WarningPopup("GUILib test window.", 3500);
	warn.render();
	}})).start();
}

var value = 0;
function modTick() {
	if(value == 100)
		value = 0;
	if(progress != null)
		progress.setValue(value++);
}
