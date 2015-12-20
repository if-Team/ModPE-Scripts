//무한밤 스크립트

var tick = 0;
var mode = true;
function modTick() {
	if(!mode) {
		return;
	}
	if(--tick <= 0) {
		tick = 500;
		Level.setTime(19200);
	}
}

function procCmd(cmd) {
	if(cmd == "nm") {
		if(mode) {
			mode = false;
			clientMessage("무한 밤모드 꺼짐");
			Level.setTime(0);
		}else {
			mode = true;
			clientMessage("무한 밤모드 켜짐");
			Level.setTime(19200);
		}
	}
}

function newLevel() {
	clientMessage("무한 밤모드를 끄거나 켜려면 /nm 을 입력하세요");
}