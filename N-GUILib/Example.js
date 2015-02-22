//include "N-GUILib.js"

function useItem() {
	new java.lang.Thread(new java.lang.Runnable({run: function(){
	var back = new GUILib.Background("DIRT"); //Recommend DIRT type(It is more minecraftical!)
	var top = new GUILib.TopBar(0, 0, GUILib.deviceWidth, 28,"Top Bar");
	var b = new GUILib.GUIButton(0, 0, 96, 96, "헉");
	var btn = new GUILib.ImageButton(0, 0, 96, 20, ["apple", 0], function(thiz) {
			print(seek.getValue());
		});
	var group = new GUILib.GUIGroup(0, 0, GUILib.HORIZONTAL, [b, btn]);

	var btn2 = new GUILib.GUIButton(0, 0, 96, 20, "버튼", function(thiz) {
			print("Button");
		});
	var btn3 = new GUILib.EditText(0, 0, 96, 20);
	var seek = new GUILib.ControlBar(0, 0, 150, 20, 6, 1, true);
	var swit = new GUILib.Switch(0, 0, null);
	var check = new GUILib.CheckBox(0, 0, "체크박스");
	var visual = new GUILib.VisualFont(0, 0, "비주얼폰트");
	var scroll = new GUILib.GUIScroll(GUILib.deviceWidth/2 - 96, GUILib.deviceHeight/2-40, 80, [group, btn2, btn3, visual, swit, check, seek]);
	var x = new GUILib.DeleteButton(4, 4, [back, top, scroll], function() {
			print("Deleted");
		}, true);
	//Declare first for rendering speed!
	
	back.render(); //It must be rendered first because it's background
	top.render();
	scroll.render();
	x.render();
	
	var warn = new GUILib.WarningPopup("GUILib has been loaded.", 3500);
	warn.render();
	}})).start();
}
