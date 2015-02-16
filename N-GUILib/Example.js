//include "N-GUILib.js"

var back;
var btn;
var btn2;
var btn3;

function newLevel() {
	back = new GUILib.Background("DIRT");
	back.render(); //It must be rendered first because it's background
	
	btn = new GUILib.ImageButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 40, 96, 20, ["sword", 0], function(thiz) {
		print("이미지 버튼");
	});
	btn.render();
	
	btn2 = new GUILib.GUIButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 20, 96, 20, "버튼", function(thiz) {
		btn.stop();
		thiz.stop();
		btn3.stop();
		back.stop();
	});
	btn2.render();
	
	btn3 = new GUILib.EditText(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2, 96, 20);
	btn3.setText("回レ 回レ 回レ");
	btn3.render();
}
