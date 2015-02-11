var btn;
var btn2;  //변수 생성

function newLevel() {
	var btn = new GUILib.ImageButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 40, 96, 20, ["sword", 0], function(thiz) {
		print("이미지 버튼");
	});
	//이미지 버튼
	btn.render();
	//렌더
	btn2 = new GUILib.GUIButton(GUILib.deviceWidth/2 - 48, GUILib.deviceHeight/2 - 20, 96, 20, "버튼", function(thiz) {
		print("버튼");
	});
	//버튼
	btn2.render();
	//렌더
}

function leaveGame() {
	btn.stop();
	btn2.stop();  //제거
}
