//include "N-GUILib.js"

var back;
var top;
var btn;
var btn2;
var btn3;
var seek;


function newLevel() {
	print(ModPE.getBytesFromTexturePack("images/terrain-atlas.tga")[2]);
	back = new GUILib.Background("DIRT");
	back.render(); //It must be rendered first because it's background
	
	top = new GUILib.TopBar(0, 0, GUILib.deviceWidth, 29,"Top Bar");
	top.render();
	
	btn = new GUILib.ImageButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 40, 96, 20, ["apple", 0], function(thiz) {
		print(seek.getValue());
	});
	btn.render();
	
	btn2 = new GUILib.GUIButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 20, 96, 20, "버튼", function(thiz) {
		btn.stop();
		thiz.stop();
		btn3.stop();
		back.stop();
		seek.stop();
		top.stop();
	});
	btn2.render();
	
	btn3 = new GUILib.EditText(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2, 96, 20);
	btn3.setText("回レ 回レ 回レ");
	btn3.render();
	
	seek = new GUILib.ControlBar(GUILib.deviceWidth/2 - 75, GUILib.deviceHeight/2 + 20, 150, 20, 6, 1, true);
	seek.render();
}
