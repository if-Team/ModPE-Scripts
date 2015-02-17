//include "N-GUILib.js"

var back;
var top;
var btn;
var btn2;
var btn3;
var seek;
var x;

function newLevel() {
	back = new GUILib.Background("DIRT"); //Recommend DIRT type(It is more minecraftical!)
	back.render(); //It must be rendered first because it's background
	
	top = new GUILib.TopBar(0, 0, GUILib.deviceWidth, 29,"Top Bar");
	top.render();
	
	btn = new GUILib.ImageButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 40, 96, 20, ["apple", 0], function(thiz) {
		print(seek.getValue());
	});
	btn.render();
	
	btn2 = new GUILib.GUIButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 20, 96, 20, "버튼", function(thiz) {
		print("Button");
	});
	btn2.render();
	
	btn3 = new GUILib.EditText(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2, 96, 20);
	btn3.render();
	
	seek = new GUILib.ControlBar(GUILib.deviceWidth/2 - 75, GUILib.deviceHeight/2 + 20, 150, 20, 6, 1, true);
	seek.render();
	
	x = new GUILib.DeleteButton(GUILib.deviceWidth-20, 2, [btn, btn2, btn3, back, top, seek], function() {
		print("Deleted");
	});
	x.render(); //It should be rendered last because the views should not be undefined.(Or make objects first)
}
