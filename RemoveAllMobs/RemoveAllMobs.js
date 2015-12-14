var tick = 0;
var run = false;

function getTarget() {
	var ae = Entity.getAll();
	var size = ae.length;
	var target = [];
	for(var e = 0; e < size; e++){
		var ent = ae[e];
		var id = Entity.getEntityTypeId(ent);
		if(id > 0 && id < 63) {
			target.push(ent);
		}
	}
	return target;
}

function modTick() {
	if(!run) {
		return;
	}
	if(++tick > 20) {
		tick = 0;
		var target = getTarget();
		for(var e = 0; e < target.length; e++) {
			Entity.remove(target[e]);
		}
	}
}

function newLevel() {
	clientMessage(ChatColor.GRAY + "몹자동삭제를 켜기/끄기 하시려면 '/md'를 입력하세요");
	if(Level.getGameMode() === 1) {
		run = true;
		clientMessage(ChatColor.GRAY + "크리에이티브에서는 몹자동삭제가 자동으로 실행됩니다");
	}
}

function leaveGame() {
	run = false;
	tick = 0;
}

function procCmd(cmd) {
	if(cmd == "md") {
		if(run) {
			run = false;
			clientMessage(ChatColor.GRAY + "몹자동삭제가 " + ChatColor.DARK_RED + "중지" + ChatColor.GRAY + "되었습니다");
		}else {
			run = true;
			clientMessage(ChatColor.GRAY + "몹자동삭제가 " + ChatColor.AQUA + "실행" + ChatColor.GRAY + "되었습니다");
		}
	}
}