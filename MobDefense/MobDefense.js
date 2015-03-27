var ScriptName = "Code: Mob Defense";
var Version = "Beta 0.5v";
/*
—————Change Log—————
Beta 0.1(20150209)
	-테스트

Beta 0.2(20150210)
	-tpspawn, tpwatch, tpgame, stop 명령어 개선
	-(중요)난이도 개선
	-pause 명령어 픽스
	-죽은 플레이어는 관전실로 이동함
	-스폰중인 몹 하이라이트 표시(강화몹 생성시 깜박임)
	-Wave표시 정상화
	-대기실 유리 투명화
	-(중요)입장/준비 메시지 전광판으로 출력

Beta 0.3(20150213)
	-치명적인 전광판 튕김 현상 개선 시도
	-전광판 딜레이 늘림
	-(중요)새로운 전광판 타이핑 방식 적용
	-give 명령어 추가
	-heal 명령어 추가
	-gamemode 비밀명령어 추가 (gamemode 0,1)

Beta 0.4(20150214)
	-(중요)남은 Wave대기시간 표시 기능 추가
	-게임 긴급 중지가 늦어지는 오류 수정
	-맵 재구성과 일부 인테리어

Beta 0.5(20150215)
	-대기시간중 긴급중지도 가능함
	-(중요)21라운드 계획 시작
	-(중요)보스 추가 예정 계획 착안
	-(중요)보스 A.I작업중
	
Beta 0.6(20150326)
	-팀킬 방지
	-휴식시간 추가
	-forceclear 명령어 개선
	-코드 정리
	-쓰레드 최적화 시도
	-명령어 한글화
	-주석 일부 추가
*/

/**
*Apache License, Version 2.0
*
*아파치 라이선스 버전 2.0
*
*==============================
*Copyright (c) <2015> <CodeInside>
*==============================
*
*Apache LicenseVersion 2.0, January 2004
*
*Apache License 버전 2.0(본 라이선스)의 적용을 받음. 이 파일을 사용하기 위해서는 반드시 본 라이선스를 따라야 합니다.본 라이선스의 사본은 다음 사이트에서 구할 수 있습니다.
*
*http://www.apache.org/licenses/LICENSE-2.0
*
*관련 법규나 서면 동의에 의해 구속되지 않는 한, 본 라이선스에따라 배포되는 소프트웨어는 어떠한 보증이나 조건도 명시적으로나 묵시적으로 설정되지 않는  “있는 그대로”의 상태로 배포됩니다. 본 라이선스가 허용하거나 제한하는 사항을 규정한 문언에 대해서는 라이선스를 참조하십시오.
*
*/

/**버그 해결용 디버깅툴*/
var debuging = false;

/**디팬스 맵인지 확인*/
var running = false;
/**게임중인지 확인*/
var gaming = false;
/**모든 플레이어의 배열*/
var players = new Array();
/**게임을 진행중인 플레이어의 배열*/
var defenders = new Array();
/**죽은 플레이어를 임시보관하는 배열*/
var deaths = new Array();
/**게임에 사용할 변수들*/
var breaking = false;
var temp,temp2,temp3,temp4,temp5,tempArray,tempArray2,tempArray3,tempArray4,processing,mobSpawnLocX,mobSpawnLocZ,mob,skin,ent,ent2,entList,spawnLimit,pause;
var zombieHighlight, skeletonHighlight, spiderHighlight, zombiePigHighlight, silverfishHighlight, endermanHighlight;
/**2초마다 반복 점멸하는 신호*/
var highlightToggle = false;
/**정해진 숫자만큼 왕복*/
var tick20 = 0;
var tick40 = 0;
/**크래쉬 횟수*/
var crashCount = 0;
/**0.01초*/
var tick = 0;
/**2초동안의 합*/
var tack = 0;
/**최근 2초간 틱의 활성도 배열*/
var tock = new Array();

function newLevel(lvl){
	if(new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/CodeMobDefense").exists()){/**해당맵이 디팬스맵일경우*/
		new java.lang.Thread(new java.lang.Runnable({
			run: function(){
				try{
					clientMessage(ChatColor.GRAY + "[Info] Booting...");/**저사양 기기를 위한 대기시간*/
					running = true;
					mainTextBufferActivity();/**전광판 기능 활성화*/
					mainBackgroundActivity();/**상시 돌아가는 프로세스 시적*/
					delay(3000);
					clientMessage(ChatColor.GRAY + "Mob Defense Map - CodeInside");
					messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 1]);
					messageBuffer.push([2642, 97, 56, "X-", 80, 35, 15, 42, 0, "Mob Defense Map - CodeInside", 50]);/**메인 전광판에 메시지 출력*/
					clientMessage("Mob Defense Help : /defense");
					players = new Array();/**플레이어 배열을 재정의*/
				}catch(err){
					running = false;
					broadcast(ChatColor.DARK_RED + "[newLevel Error" + err.lineNumber + "] " + err);
				}
			}
		})).start();
	}
};

function leaveGame(){
	gaming = false;
	running = false;/**종료*/
};

/**사용 안함*/
/**function entityRemovedHook(ent){
	if(Player.isPlayer(ent)){
		for(var e in players){
			if(players[e] == ent){
				players.splice(e, 1);
				new java.lang.Thread(new java.lang.Runnable({run: function(){try{
					//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
					//messageBuffer.push([2642, 97, 56, "X-", 80, 35, 15, 42, 0, "Bye", 100]);
					//messageBuffer.push([2642, 89, 56, "X-", 80, 22, 0, 42, 0, Player.getName(e), 100]);
				}catch(err){
					broadcast(ChatColor.DARK_RED + "[ExitMsg Error" + err.lineNumber + "] " + err);
				}}})).start();
				break;
			}
		}
	}
};*/

function attackHook(attacker, victim) {
	if(Player.isPlayer(victim) && Player.isPlayer(attacker)) {
		preventDefault();/**팀킬 방지*/
	}
}

function procCmd(str){
	var cmd = str.split(" ");
	if(str == "defense" || str == "디펜스"){
		clientMessage("[/start | /시작] Game start");
		clientMessage("[/pause | /일시중지] Game pause");
		clientMessage("[/forceclear | /강제클리어] Game force clear");
		clientMessage("[/stop | /중지] Game Force Stop");
		clientMessage("[/tpspawn | /텔포스폰 <NAME>] Teleport Spawn");
		clientMessage("[/tpgame | /텔포게임 <NAME>] Teleport Defense Room");
		clientMessage("[/tpwatch | /텔포관전 <NAME>] Teleport Defense Watch");
		clientMessage("[/kill | /죽이기 <NAME>] Kill <NAME>");
		clientMessage("[/give | /주기 <NAME> <ID:DAMAGE:COUNT>] Give item");
		clientMessage("[/health | /회복 <NAME> <HP>] Health Change");
	}else if(str == "start" || str == "시작"){/**시작 명령어 입력시*/
		new java.lang.Thread(new java.lang.Runnable({
			run: function(){
				try{
					if(running && !gaming){/**디팬스 맵이고 게임이 시작되지 않았을때*/
						gaming = true;
						broadcast(ChatColor.YELLOW + "[Info] Game Start!");
						//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
						//messageBuffer.push([2642, 97, 56, "X-", 80, 35, 1, 42, 0, "Game Start!", 100]);
						mobDefenseMainActivity();/**게임 프로세스 시작*/
						for each(var e in defenders)
							teleport("LOBY", e);/**게임 종료후 모두 로비로 텔레포트*/
						defenders = [];
						gaming = false;/**게임 종료*/
					}else{
						clientMessage(ChatColor.RED + "[Error] Already Started.");
						clientMessage(ChatColor.RED + "If you want stop then type: /stop");/**게임이 이미 진행중일떄 명령어 입력시*/
					}
				}catch(err){/**에러 발생시*/
					gaming = false;
					for each(var e in defenders)
						teleport("LOBY", e);
broadcast(ChatColor.DARK_RED + "[mainThread Error" + err.lineNumber + "] " + err);
				}
				broadcast(ChatColor.GRAY + "[Info] game progress stop.");
				//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
				//messageBuffer.push([2642, 97, 56, "X-", 80, 35, 15, 42, 0, "Game progress stop", 100]);
			}
		})).start();
	}else if(str == "pause" || str == "일시정지"){
		if(gaming){
			if(pause){
				pause = false;
				broadcast(ChatColor.YELLOW + "[Info] Game release");
				//messageBuffer.push([2580, 10, -4, 2627, 70, -4, 0, 0, 100]);
			}else{
				pause = true;
				broadcast(ChatColor.YELLOW + "[Info] Game pause");
				//messageBuffer.push([2580, 10, -4, 2627, 70, -4, 0, 0, 100]);
				//messageBuffer.push([2627, 50, -4, "X-", 48, 89, 0, 159, 15, "Pause", 300]);
				}
		}else{
			clientMessage(ChatColor.DARK_RED + "[Error] Game is not Running");
			pause = false;
		}
	}else if(str == "forceclear" || str == "강제클리어"){/**강제 스테이지 클리너*/
		try{
			for each(var e in entList) {
				Entity.setHealth(e, 0);
			}
		}catch(err){
			broadcast(ChatColor.DARK_RED + "[ForceClear Error" + err.lineNumber + "] " + err);
		}
	}else if(cmd[0] == "tpspawn" || cmd[0] == "텔포스폰"){
		for each(var p in players){
			if(Player.getName(p) == cmd[1]){
				teleport("LOBY", p);
				broadcast(ChatColor.YELLOW + cmd[1] + " teleport SPAWN by admin");
				//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
				//messageBuffer.push([2642, 97, 56, "X-", 80, 22, 0, 42, 0, Player.getName(p), 100]);
				//messageBuffer.push([2642, 89, 56, "X-", 80, 35, 15, 42, 0, "teleport SPAWN by admin", 100]);
				return;
			}
		}
		clientMessage(ChatColor.RED + "Unknow Player: " + cmd[1]);
	}else if(cmd[0] == "tpgame" || cmd[0] == "텔포게임"){
		for each(var p in players){
			if(Player.getName(p) == cmd[1]){
				teleport("BATTLE", p);
				broadcast(ChatColor.YELLOW + cmd[1] + " teleport GAME by admin");
				//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
				//messageBuffer.push([2642, 97, 56, "X-", 80, 22, 0, 42, 0, Player.getName(p), 100]);
				//messageBuffer.push([2642, 89, 56, "X-", 80, 35, 15, 42, 0, "teleport GAME by admin", 100]);
				return;
			}
		}
		clientMessage(ChatColor.RED + "Unknow Player: " + cmd[1]);
	}else if(cmd[0] == "tpwatch" || cmd[0] == "텔포관전"){
		for each(var p in players){
			if(Player.getName(p) == cmd[1]){
				teleport("VIEW", p);
				broadcast(ChatColor.YELLOW + cmd[1] + " teleport WATCH by admin");
				//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
				//messageBuffer.push([2642, 97, 56, "X-", 80, 22, 0, 42, 0, Player.getName(p), 100]);
				//messageBuffer.push([2642, 89, 56, "X-", 80, 35, 15, 42, 0, "teleport WATCH by admin", 100]);
				return;
			}
		}
		clientMessage(ChatColor.RED + "Unknow Player: " + cmd[1]);
	}else if(str == "stop" || str == "중지"){
		if(gaming){
			gaming = false;
			broadcast(ChatColor.DARK_RED + "[Warning] Game Force Stoping. Please wait...");
		}else{
			clientMessage(ChatColor.DARK_RED + "[Error] Game is not Running");
		}
	}else if(cmd[0] == "kill" || cmd[0] == "죽이기/"){
		for each(var p in players){
			if(Player.getName(p) == cmd[1]){
				Entity.setHealth(p, 0);
				broadcast(ChatColor.YELLOW + cmd[1] + " kill by admin");
				return;
			}
		}
		clientMessage(ChatColor.RED + "Unknow Player: " + cmd[1]);
	}else if(cmd[0] == "give" || cmd[0] == "주기"){
		for each(var p in players){
			if(Player.getName(p) == cmd[1]){
				tempArray = cmd[2].split(":");
				Level.dropItem(Entity.getX(p), Entity.getY(p), Entity.getZ(p), 0, tempArray[0], tempArray[2], tempArray[1]);
				broadcast(ChatColor.YELLOW + "admin give " + cmd[2] + " to " + cmd[1]);
				return;
			}
		}
		clientMessage(ChatColor.RED + "Unknow Player: " + cmd[1]);
	}else if(cmd[0] == "health" || cmd[0] == "회복"){
		for each(var p in players){
			if(Player.getName(p) == cmd[1]){
				Entity.setHealth(p, parseInt(cmd[2]));
				broadcast(ChatColor.YELLOW + cmd[1] + " set health " + parseInt(cmd[2]) + " by admin");
				return;
			}
		}
		clientMessage(ChatColor.RED + "Unknow Player: " + cmd[1]);
	}else if(cmd[0] == "mod" || cmd[0] == "modlist" || cmd[0] == "script" || cmd[0] == "scriptlist"){
		broadcast(ChatColor.GRAY + "Mob Defense Map & Script - CodeInside");
	}else if(cmd[0] == "ciwrite") {
			messageBuffer.push([Math.floor(Player.getX()),Math.floor(Player.getY()),Math.floor(Player.getZ()),cmd[6],160,cmd[1],cmd[2],cmd[3],cmd[4],cmd[5], 100]);
	}else if(cmd[0] == "gamemode") {
		Level.setGamemode(parseInt(cmd[1]));
	}
};

function modTick() {
	var t = tick
	tock.push(t);
	tack += t;
	tick = 0;
	if(tock.length > 40)
		tack -= tock.shift();
	ModPE.showTipMessage(tack/10 + "(" + tack/2 + "%)");
}

function broadcast(str){
	net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSendChat(str);
	clientMessage(str);
};

function delay(int){
	java.lang.Thread.sleep(int);
};

function mainBackgroundActivity() {new java.lang.Thread(new java.lang.Runnable( {run: function() {try {
	while(running) {
		delay(10);
		tick++;
		if(++tick20 >= 100) {
			tick20 = 0;
			playerManager();
		}
		if(++tick40 >= 200) {
			tick40 = 0;
			highlightActivity();
		}
	}
}catch(e) {
	broadcast(ChatColor.DARK_RED + "[MainBackgroundActivity Error" + e.lineNumber + "] " + e);
	delay(1000);
	if(++crashCount <= 3) {
		broadcast(ChatColor.RED + "ERROR IGNORE - AUTO REBOOT...");
		delay(5000);
		mainBackgroundActivity();
	}else {
		runing = false;
		gaming = false;
		broadcast(ChatColor.DARK_RED + "CAN'T HOLD ON. SCRIPT CRASH");
		broadcast(ChatColor.GOLD + "please report Error Message to");
		broadcast(ChatColor.GOLD + "CodeInside(scgtdy7151@gmail.com)");
/**		delay(5000);
		broadcast(ChatColor.DARK_RED + "SERVER AUTO CLOSE please wait...");
		delay(10000);
		net.zhuoweizhang.mcpelauncher.ui.NerdyStuffActivity.forceRestart(com.mojang.minecraftpe.MainActivity.currentMainActivity.get());*/
	}
}}})).start()};

function playerManager(){
	var temp = Entity.getAll();
	for each(var e in temp){
		if(Player.isPlayer(e)){
			if(players.indexOf(e) == "-1"){
				players.push(e);
				debug("push", e);
				teleport("LOBY",e);
				messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
				messageBuffer.push([2642, 97, 56, "X-", 80, 35, 15, 42, 0, "Welcome", 100]);
				messageBuffer.push([2642, 89, 56, "X-", 80, 22, 0, 42, 0, Player.getName(e), 100]);
				break;
			}
		}else{
			if(!gaming){
				Entity.remove(e);
			}
		}
	}
	for(var e in players){
		if(!Player.isPlayer(players[e])) {
			players.splice(e, 1);
			debug("splice", players[e]);
			return;
		}
	}
	for each(var e in players){
		switch(Level.getTile(Entity.getX(e), Entity.getY(e) - 2, Entity.getZ(e))){
			case 173:
				if(!gaming){
					if(defenders.indexOf(e) == -1){
						defenders.push(e);
						teleport("READY", e);
						broadcast(ChatColor.YELLOW + "[" + defenders.length + "/" + players.length + "] " + Player.getName(e) + ChatColor.AQUA + " join Party");
						//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
						//messageBuffer.push([2642, 97, 56, "X-", 80, 22, 0, 42, 0, Player.getName(e), 100]);
						//messageBuffer.push([2642, 89, 56, "X-", 80, 35, 3, 42, 0, "Join Party ", 100]);
						//messageBuffer.push([2642, 81, 56, "X-", 80, 35, 15, 42, 0, "[" + defenders.length + "/" + players.length + "]", 100]);
						breaking = true;
					}else{
						defenders.splice(defenders.indexOf(e),1);
						teleport("LOBY", e);
					}
				}
				break;
			case 35:
				if(Level.getData(Entity.getX(e), Entity.getY(e) - 2, Entity.getZ(e)) == 15){
					teleport("LOBY", e);
				}
				if(gaming && Level.getData(Entity.getX(e), Entity.getY(e) - 2, Entity.getZ(e)) == 1){
					teleport("VIEW", e);
				}
				break;
			case 159:
				if(!gaming && Level.getData(Entity.getX(e) ,Entity.getY(e) - 2,Entity.getZ(e)) == 10){
					if(defenders.indexOf(e) == -1){
						defenders.push(e);
						teleport("READY", e);
					}else{
						defenders.splice(defenders.indexOf(e),1);
						teleport("LOBY", e);
						broadcast(ChatColor.YELLOW + "[" + defenders.length + "/" + players.length + "] " + Player.getName(e) + ChatColor.RED + " leave Party");
						//messageBuffer.push([2564, 58, 56, 2642, 97, 56, 42, 0, 100]);
						//messageBuffer.push([2642, 97, 56, "X-", 80, 22, 0, 42, 0, Player.getName(e), 100]);
						//messageBuffer.push([2642, 89, 56, "X-", 80, 35, 14, 42, 0, "Leave Party", 100]);
						//messageBuffer.push([2642, 81, 56, "X-", 80, 35, 15, 42, 0, "[" + defenders.length + "/" + players.length + "]", 100]);
						breaking = true;
					}
				}
				break;
		}
		if(breaking){
			breaking = false;
			break;
		}
	}
};

function mobDefenseMainActivity(){
	for(var cx = 2593; cx <= 2614; cx++){
		for(var cz = -40; cz <= -19; cz++){
			if(Level.getTile(cx, 44, cz) != 43 || Level.getData(cx, 44, cz) != 7)
				Level.setTile(cx, 44, cz, 43, 7);
		}
	}
	messageBuffer.push([2579, 10, -4, 2628, 73, -4, 0, 0, 100]);
	delay(1000);
	highlight("ZOMBIE", "OFF");
	highlight("SKELETON", "OFF");
	highlight("SPIDER", "OFF");
	highlight("ZOMBIE_PIG", "OFF");
	highlight("SILVER_FISH", "OFF");
	highlight("ENDER_MAN", "OFF");
	for(var e = 0; e < 3; e++){
		Level.setTile(2622 + e, 44, -58, 0, 0);
		Level.setTile(2581 + e, 44, -58, 0, 0);
		Level.setTile(2622 + e, 60, -58, 0, 0);
		Level.setTile(2581 + e, 60, -58, 0, 0);
	}
	delay(3000);
	playerHPManager();
	for each(var e in defenders)
		teleport("BATTLE", e);
	delay(3000);
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
/*1 round*/
	processing = true;
	highlight("ZOMBIE", "ON");
	giveDefenders(["299:0:1", "269:-1000:1", "357:0:16"]);
	broadcast(ChatColor.AQUA + "[Info] Get Ready!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Ready!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 1");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 1", 700]);
	delay(3000);
	spawnLimit = 3 + (2 * defenders.length);
	defenseMobSpawner(["ZOMBIE:3:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
/*2 round*/
	processing = true;
	highlight("ZOMBIE", "ON");
	giveDefenders(["300:0:1", "270:-1000:1", "262:0:32"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 2");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 2", 700]);
	delay(3000);
	spawnLimit = 3 + (2 * defenders.length);
	defenseMobSpawner(["ZOMBIE:20:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
/*3 round*/
	processing = true;
	highlight("SKELETON", "ON");
	giveDefenders(["301:0:1", "271:-1000:1", "260:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 3");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 3", 700]);
	delay(3000);
	spawnLimit = 3 + (2 * defenders.length);
	defenseMobSpawner(["SKELETON:16:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SKELETON", "OFF");
/*4 round*/
	processing = true;
	highlight("SPIDER", "ON");
	giveDefenders(["298:0:1", "268:-1000:1", "320:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 4");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 4", 700]);
	delay(3000);
	spawnLimit = 3 + (2 * defenders.length);
	defenseMobSpawner(["SPIDER:14:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SPIDER", "OFF");
/*5 round*/
	processing = true;
	highlight("ZOMBIE_PIG", "ON");
	giveDefenders(["315:0:1", "284:-1000:1", "261:0:1"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 5");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 5", 700]);
	delay(3000);
	spawnLimit = 3 + (2 * defenders.length);
	defenseMobSpawner(["ZOMBIE_PIG:20:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE_PIG", "OFF");
/*6 round*/
	processing = true;
	highlight("SILVER_FISH", "ON");
	giveDefenders(["316:0:1", "285:-1000:1", "262:0:32"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 6");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 6", 700]);
	delay(3000);
	spawnLimit = 5 + (5 * defenders.length);
	defenseMobSpawner(["SILVER_FISH:5:"+(30*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SILVER_FISH", "OFF");
/*7 round*/
	processing = true;
	highlight("ENDER_MAN", "ON");
	giveDefenders(["317:0:1", "286:-1000:1", "459:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 7");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 7", 700]);
	delay(3000);
	spawnLimit = 2 + (1 * defenders.length);
	defenseMobSpawner(["ENDER_MAN:40:"+(5*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ENDER_MAN", "OFF");
/*8 round*/
	processing = true;
	highlight("SKELETON", "ON");
	highlight("SPIDER", "ON");
	giveDefenders(["314:0:1", "283:-1000:1", "360:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 8");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 8", 700]);
	delay(3000);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["SKELETON:16:"+(5*defenders.length), "SPIDER:14:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SKELETON", "OFF");
	highlight("SPIDER", "OFF");
/*9 round*/
	processing = true;
	highlight("ZOMBIE", "ON");
	highlight("ZOMBIE_PIG", "ON");
	giveDefenders(["303:0:1", "273:-1000:1", "457:0:16"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 9");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 9", 700]);
	delay(3000);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["ZOMBIE:20:"+(10*defenders.length), "ZOMBIE_PIG:20:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
	highlight("ZOMBIE_PIG", "OFF");
/*10 round*/
	processing = true;
	highlight("SPIDER", "ON");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["304:0:1", "274:-1000:1", "354:0:1"]);
	broadcast(ChatColor.AQUA + "[Info] break time!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "break!", 700]);
	stageDelay(60000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 10");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 10", 700]);
	delay(3000);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["SPIDER:14:"+(10*defenders.length), "SILVER_FISH:5:"+(30*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SPIDER", "OFF");
	highlight("SILVER_FISH", "OFF");
/*11 round*/
	processing = true;
	highlight("SPIDER", "ON");
	highlight("ENDER_MAN", "ON");
	giveDefenders(["305:0:1", "275:-1000:1", "297:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 11");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 11", 700]);
	delay(3000);
	spawnLimit = 3 + (2 * defenders.length);
	defenseMobSpawner(["SPIDER:14:"+(10*defenders.length), "ENDER_MAN:40:"+(8*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SPIDER", "OFF");
	highlight("ENDER_MAN", "OFF");
/*12 round*/
	processing = true;
	highlight("SKELETON", "ON");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["302:0:1", "272:-1000:1", "369:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 12");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 12", 700]);
	spawnLimit = 5 + (3 * defenders.length);
	delay(3000);
	defenseMobSpawner(["SKELETON:16:"+(15*defenders.length), "SILVER_FISH:5:"+(30*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SKELETON", "OFF");
	highlight("SILVER_FISH", "OFF");
/*13 round*/
	processing = true;
	highlight("ZOMBIE", "FLASHING");
	giveDefenders(["307:0:1", "256:-1000:1", "262:0:32"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 13");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 13", 700]);
	delay(3000);
	spawnLimit = 1 + (1 * defenders.length);
	defenseMobSpawner(["ZOMBIE:80:"+(5*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
/*14 round*/
	processing = true;
	highlight("ZOMBIE", "FLASHING");
	highlight("SPIDER", "ON");
	highlight("ZOMBIE_PIG", "ON");
	giveDefenders(["308:0:1", "257:-1000:1", "391:0:16"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 14");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 14", 700]);
	delay(3009);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["ZOMBIE:80:"+(5*defenders.length), "SPIDER:14:"+(10*defenders.length), "ZOMBIE_PIG:20:"+(10*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
	highlight("SPIDER", "OFF");
	highlight("ZOMBIE_PIG", "OFF");
/*15 round*/
	processing = true;
	highlight("ZOMBIE_PIG", "FLASHING");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["309:0:1", "258:-1000:1", "282:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 15");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 15", 700]);
	delay(3000);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["ZOMBIE_PIG:80:"+(10*defenders.length), "SILVER_FISH:5:"+(20*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE_PIG", "OFF");
	highlight("SILVER_FISH", "OFF");
/*16 round*/
	processing = true;
	highlight("SPIDER", "ON");
	highlight("ENDER_MAN", "ON");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["306:0:1", "267:-1000:1", "393:0:8"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 16");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 16", 700]);
	delay(3000);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["SPIDER:14:"+(30*defenders.length), "ENDER_MAN:40:"+(10*defenders.length), "SILVER_FISH:5:"+(30*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("SPIDER", "OFF");
	highlight("ENDER_MAN", "OFF");
	highlight("SILVER_FISH", "OFF");
/*17 round*/
	processing = true;
	highlight("ZOMBIE", "FLASHING");
	highlight("SKELETON", "FLASHING");
	highlight("SPIDER", "FLASHING");
	highlight("ZOMBIE_PIG", "FLASHING");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["311:0:1", "277:-1000:1", "360:0:32"]);
	broadcast(ChatColor.YELLOW + "[Info] Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 17");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 17", 700]);
	delay(3000);
	spawnLimit = 5 + (3 * defenders.length);
	defenseMobSpawner(["ZOMBIE:80:"+(5*defenders.length), "SKELETON:64:"+(5*defenders.length), "SPIDER:56:"+(5*defenders.length), "ZOMBIE_PIG:80:"+(5*defenders.length), "SILVER_FISH:20:"+(5*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
	highlight("SKELETON", "OFF");
	highlight("SPIDER", "OFF");
	highlight("ZOMBIE_PIG", "OFF");
	highlight("SILVER_FISH", "OFF");
/*18 round*/
	processing = true;
	highlight("ZOMBIE", "ON");
	highlight("SKELETON", "ON");
	highlight("ENDER_MAN", "FLASHING");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["312:0:1", "278:-1000:1", "262:0:32"]);
	broadcast(ChatColor.YELLOW + "[Info] Wave Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 18");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 18", 700]);
	delay(3000);
	spawnLimit = 10 + (5 * defenders.length);
	defenseMobSpawner(["ZOMBIE:20:"+(30*defenders.length), "SKELETON:16:"+(30*defenders.length), "ENDER_MAN:160:"+(5*defenders.length),"SILVER_FISH:5:"+(40*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
	highlight("SKELETON", "OFF");
	highlight("ENDER_MAN", "OFF");
	highlight("SILVER_FISH", "OFF");
/*19 round*/
	processing = true;
	highlight("ZOMBIE", "FLASHING");
	highlight("SPIDER", "FLASHING");
	highlight("ENDER_MAN", "FLASHING");
	highlight("SILVER_FISH", "FLASHING");
	giveDefenders(["313:0:1", "279:-1000:1", "392:0:16"]);
	broadcast(ChatColor.YELLOW + "[Info] Clear!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "Clear!", 700]);
	stageDelay(30000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.GOLD + "[Warning] Wave 19");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 19", 700]);
	delay(3000);
	spawnLimit = 10 + (5 * defenders.length);
	defenseMobSpawner(["ZOMBIE:80:"+(20*defenders.length), "SPIDER:56:"+(20*defenders.length), "ENDER_MAN:160:"+(10*defenders.length), "SILVER_FISH:20:"+(50*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
	highlight("SPIDER", "OFF");
	highlight("ENDER_MAN", "OFF");
	highlight("SILVER_FISH", "OFF");
/*20 round*/
	processing = true;
	highlight("ZOMBIE", "ON");
	highlight("SKELETON", "ON");
	highlight("SPIDER", "ON");
	highlight("ZOMBIE_PIG", "ON");
	highlight("ENDER_MAN", "ON");
	highlight("SILVER_FISH", "ON");
	giveDefenders(["310:0:1", "276:-1000:1", "354:0:1", "400:0:32", "383:14:10"]);
	broadcast(ChatColor.AQUA + "[Info] break time!");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "break!", 700]);
	stageDelay(60000);
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	broadcast(ChatColor.RED + "[Critical Warning] Wave 20");
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 246, 0, 159, 15, "Wave 20", 700]);
	delay(3000);
	spawnLimit = 20 + (10 * defenders.length);
	defenseMobSpawner(["ZOMBIE:20:"+(50*defenders.length), "SKELETON:16:"+(50*defenders.length), "SPIDER:14:"+(50*defenders.length), "ZOMBIE_PIG:20:"+(50*defenders.length), "ENDER_MAN:40:"+(30*defenders.length), "SILVER_FISH:5:"+(100*defenders.length)]);
	while(processing){
		delay(5000);
		if(!gaming) return;
	}
	highlight("ZOMBIE", "OFF");
	highlight("SKELETON", "OFF");
	highlight("SPIDER", "OFF");
	highlight("ZOMBIE_PIG", "OFF");
	highlight("ENDER_MAN", "OFF");
	highlight("SILVER_FISH", "OFF");
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	messageBuffer.push([2585, 51, -77, 2623, 58, -77, 159, 15, 100]);
	messageBuffer.push([2585, 58, -77, "X+", 150, 89, 0, 159, 15, "WIN!", 700]);
	broadcast(ChatColor.GOLD + "WIN!");
	broadcast(ChatColor.GRAY + "will be teleport in 10sec...");
	delay(10000);
	return;
};

function playerHPManager(){
	new java.lang.Thread(new java.lang.Runnable({
		run: function(){
			try{
				while(gaming){
					if(defenders.length == 0){
						broadcast(ChatColor.DARK_RED + "GAME OVER");
						gaming = false;
					}
					java.lang.Thread.sleep(100);
					for(var e in defenders){
						if(Entity.getHealth(defenders[e]) < 1){
							broadcast(ChatColor.RED + Player.getName(defenders[e]) + " down! Left: " + (defenders.length - 1));
							//messageBuffer.push([2580, 10, -4, 2627, 70, -4, 0, 0, 100]);
							//messageBuffer.push([2627, 58, -4, "X-", 48, 246, 0, 159, 15, Player.getName(defenders[e]), 300]);
							//messageBuffer.push([2627, 50, -4, "X-", 48, 246, 0, 159, 15, "die! Left: " + (defenders.length - 1), 300]);
							deaths.push(defenders[e]);
							defenders.splice(e, 1);
							break;
						}
					}
					for(var e in deaths){
						if(Entity.getHealth(deaths[e]) > 0){
						teleport("VIEW", deaths[e]);
						deaths.splice(e, 1);
						}
					}
				}
			}catch(err){
				broadcast(ChatColor.DARK_RED + "[HpManager Error" + err.lineNumber + "] " + err);
				gaming = false;
			}
		}
	})).start();
};

function teleport(place, ent){
	switch(place){
		case "LOBY":
			var rid = Level.spawnMob(2599 + (10 * Math.random()), 67, 0 + (8 * Math.random()), 81);
			Entity.rideAnimal(ent, rid);
			Entity.remove(rid);
			break;
		case "READY":
			var rid = Level.spawnMob(2621 + (4 * Math.random()), 67, 17 + (4 * Math.random()), 81);
			Entity.rideAnimal(ent, rid);
			Entity.remove(rid);
			break;
		case "BATTLE":
			var rid = Level.spawnMob(2595 + (18 * Math.random()), 47, -38 + (18 * Math.random()), 81);
			Entity.rideAnimal(ent, rid);
			Entity.remove(rid);
			break;
		case "VIEW":
			var rid = Level.spawnMob(2598 + (12 * Math.random()), 63, -35 + (12 * Math.random()), 81);
			Entity.rideAnimal(ent, rid);
			Entity.remove(rid);
			break;
	}
};

function giveDefenders(ary){
	tempGive = new Array();
	for each(var i in ary){
		tempArray = i.split(":");
		for each(var t in defenders){
			Level.dropItem(Entity.getX(t), Entity.getY(t), Entity.getZ(t), 0, tempArray[0], tempArray[2], tempArray[1]);
		}
	}
};

function stageDelay(maxTime){
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	for(var e = 0; e < 3; e++){
		Level.setTile(2622 + e, 44, -58, 1, 0);
		Level.setTile(2581 + e, 44, -58, 1, 0);
	}
	for(var e = 0; e < 15; e++){
		for(var f = 0; f < 3; f++){
			Level.setTile(2622 + f, 60, -58, 12, 1);
			Level.setTile(2581 + f, 60, -58, 12, 1);
		}
		delay(Math.ceil(maxTime / 15));
		if(!gaming) return;
		while(pause){
			delay(1000);
			if(!gaming)
				return;
		}
	}
	for(var e = 0; e < 3; e++){
		Level.setTile(2622 + e, 44, -58, 0, 0);
		Level.setTile(2581 + e, 44, -58, 0, 0);
	}
	if(!gaming) return;
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
};

function highlightActivity(){
	try{
		if(highlightToggle) {
			if(zombieHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2583 + e, 43, -78, 35, 15);
			}
			if(skeletonHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2590 + e, 43, -78, 35, 15);
			}
			if(spiderHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2597 + e, 43, -78, 35, 15);
			}
			if(zombiePigHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2604 + e, 43, -78, 35, 15);
			}
			if(silverfishHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2611 + e, 43, -78, 35, 15);
			}
			if(endermanHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2618 + e, 43, -78, 35, 15);
			}
		}else {
			if(zombieHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2583 + e, 43, -78, 89, 0);
			}
			if(skeletonHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2590 + e, 43, -78, 89, 0);
			}
			if(spiderHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2597 + e, 43, -78, 89, 0);
			}
			if(zombiePigHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2604 + e, 43, -78, 89, 0);
			}
			if(silverfishHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2611 + e, 43, -78, 89, 0);
			}
			if(endermanHighlight){
				for(var e = 0; e < 6; e++)
					Level.setTile(2618 + e, 43, -78, 89, 0);
			}
		}
	}catch(e) {
		broadcast(ChatColor.DARK_RED + "[Highlight Error" + e.lineNumber + "] " + e);
	}
};

function highlight(target, status){try{
	switch(target){
		case "ZOMBIE":
			if(status == "ON"){
				for(var e = 0; e < 6; e++)
					Level.setTile(2583 + e, 43, -78, 89, 0);
			}else if(status == "OFF"){
				zombieHighlight = false;
				for(var e = 0; e < 6; e++)
					Level.setTile(2583 + e, 43, -78, 35, 15);
			}else if(status == "FLASHING"){
				zombieHighlight = true;
			}
			break;
		case "SKELETON":
			if(status == "ON"){
				for(var e = 0; e < 6; e++)
					Level.setTile(2590 + e, 43, -78, 89, 0);
			}else if(status == "OFF"){
				skeletonHighlight = false;
				for(var e = 0; e < 6; e++)
					Level.setTile(2590 + e, 43, -78, 35, 15);
			}else if(status == "FLASHING"){
				skeletonHighlight = true;
			}
			break;
		case "SPIDER":
			if(status == "ON"){
				for(var e = 0; e < 6; e++)
					Level.setTile(2597 + e, 43, -78, 89, 0);
			}else if(status == "OFF"){
				spiderHighlight = false;
				for(var e = 0; e < 6; e++)
					Level.setTile(2597 + e, 43, -78, 35, 15);
			}else if(status == "FLASHING"){
				spiderHighlight = true;
			}
			break;
		case "ZOMBIE_PIG":
			if(status == "ON"){
				for(var e = 0; e < 6; e++)
					Level.setTile(2604 + e, 43, -78, 89, 0);
			}else if(status == "OFF"){
				zombiePigHighlight = false;
				for(var e = 0; e < 6; e++)
					Level.setTile(2604 + e, 43, -78, 35, 15);
			}else if(status == "FLASHING"){
				zombiePigHighlight = true;
			}
			break;
		case "SILVER_FISH":
			if(status == "ON"){
				for(var e = 0; e < 6; e++)
					Level.setTile(2611 + e, 43, -78, 89, 0);
			}else if(status == "OFF"){
				silverfishHighlight = false;
				for(var e = 0; e < 6; e++)
					Level.setTile(2611 + e, 43, -78, 35, 15);
			}else if(status == "FLASHING"){
				silverfishHighlight = true;
			}
			break;
		case "ENDER_MAN":
			if(status == "ON"){
				for(var e = 0; e < 6; e++)
					Level.setTile(2618 + e, 43, -78, 89, 0);
			}else if(status == "OFF"){
				endermanHighlight = false;
				for(var e = 0; e < 6; e++)
					Level.setTile(2618 + e, 43, -78, 35, 15);
			}else if(status == "FLASHING"){
				endermanHighlight = true;
			}
			break;
	}
}catch(err){
	broadcast(ChatColor.DARK_RED + "[Flashing Error" + err.lineNumber + "] " + err);
}};

function defenseMobSpawner(ary){new java.lang.Thread(new java.lang.Runnable({run: function(){try{
	debug("Run", "defense_spawner","");
	tempArray = new Array();
	tempArray2 = new Array();
	tempArray3 = new Array();
	for each(var m in ary){
		tempArray.push(m.split(":")[0]);
		tempArray2.push(m.split(":")[1]);
		tempArray3.push(m.split(":")[2]);
	}
	mobSpawnLocX = new Array();
	mobSpawnLocZ = new Array();
	temp = defenders.length;
	debug("Info", "Set Glowstone Point","");
	for(var d = temp + 1;d > 0;d--){
		if(Level.getTile(temp2 = Math.round(2595 + (18 * Math.random())), 44, temp3 = Math.round(-38 + (18 * Math.random()))) == 43){
			mobSpawnLocX.push(temp2);
			mobSpawnLocZ.push(temp3);
			for(var gx = temp2 - 1; gx <= temp2 + 1; gx++){
				for(var gz = temp3 - 1; gz <= temp3 + 1; gz++){
					Level.setTile(gx ,44, gz, 246, 0);
				}
			}
			Level.setTile(temp2, 44, temp3, 247, 1);
		}else{
			d++;
			debug("Warning", "Loc Occur","");
			delay(50);
		}
	}
	debug("Info", "Finish ready", "");
	delay(3000);
	while(pause){
		delay(1000);
		if(!gaming)
			return;
	}
	entList = new Array();
	while(tempArray.length != 0 || entList.length != 0){
		for(var m in entList){
			if(Entity.getHealth(entList[m]) < 1){
				debug("Info", "Mob down", entList[m]);
				entList.splice(m, 1);
			}
		}
		for(var l in tempArray){
			if(tempArray3[l] < 1){
				debug("Info", "Finish spawn", tempArray[l]);
				tempArray.splice(l, 1);
				tempArray2.splice(l, 1);
				tempArray3.splice(l, 1);
			}else if(entList.length < spawnLimit && Math.random() < 0.2){
				temp4 = Math.floor(mobSpawnLocX.length * Math.random());
				switch(tempArray[l]){
					case "ZOMBIE":
						mob = 32;
						skin = "mob/zombie.png";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						tempArray3[l]--;
						break;
					case "SKELETON":
						mob = 34;
						skin = "mob/skeleton.png";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						tempArray3[l]--;
						break;
					case "SPIDER":
						mob = 35;
						skin = "mob/spider.tga";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						tempArray3[l]--;
						break;
					case "ZOMBIE_PIG":
						mob = 36;
						skin = "mob/pigzombie.png";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						tempArray3[l]--;
						break;
					case "SILVER_FISH":

						mob = 39;
						skin = "mob/silverfish.png";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						tempArray3[l]--;
						break;
					case "ENDER_MAN":
						mob = 38;
						skin = "mob/enderman.tga";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						tempArray3[l]--;
						break;
					case "SPIDER_JOCKEY":
						mob = 34;
						skin = "mob/skeleton.png";
						ent = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						mob = 35;
						skin = "mob/spider.tga";
						ent2 = Level.spawnMob(mobSpawnLocX[temp4] + Math.random(), 46, mobSpawnLocZ[temp4] + Math.random(), mob, skin);
						Entity.setHealth(ent, tempArray2[l]);
						Entity.setHealth(ent2, tempArray2[l]);
						spiderJockeyAI(ent, ent2);
						debug("Info", "Spawn" + tempArray[l], ent);
						entList.push(ent);
						entList.push(ent2);
						tempArray3[l]--;
						break;
					default:
						clientMessage(ChatColor.DARK_RED + "[Error] Mob Type is Unknown: " + tempArray[1]);
						debug("Error", "Mob Type isn't register", tempArray[1]);
						return;
				}
			}
			delay(100);
			while(pause){
				delay(1000);
				if(!gaming)
					return;
			}
		}
	}
	debug("Info", "Remove Glowstone...", "");
	for(var d in mobSpawnLocX){
		for(var gx = mobSpawnLocX[d] - 1; gx <= mobSpawnLocX[d] + 1; gx++){
			for(var gz = mobSpawnLocZ[d] - 1; gz <= mobSpawnLocZ[d] + 1; gz++){
				Level.setTile(gx ,44, gz, 43, 7);
			}
		}
	}
	debug("End", "Finish", "");
	processing = false;
}catch(err){
	clientMessage(err);
	gaming = false;
}}})).start();};

function spiderJockeyAI(rider, mount){new java.lang.Thread(new java.lang.Runnable({run: function(){try{
	Entity.rideAnimal(rider, mount);
	while(Entity.getHealth(rider) > 0 && Entity.getHealth(mount) > 0){
		if(temp != temp2){
			Entity.setHealth(rider, Math.floor((Entity.getHealth(rider) + Entity.getHealth(mount)) / 2));
			Entity.setHealth(mount, Math.floor((Entity.getHealth(rider) + Entity.getHealth(mount)) / 2));
		}
		java.lang.Thread.sleep(200);
	}
	Entity.setHealth(rider, 0);
	Entity.setHealth(mount, 0);
}catch(err){
	broadcast(ChatColor.DARK_RED + "[SpiderJockey Error" + err.lineNumber + "] " + err);
}}})).start()};

function defenderBuff(effect, power, duration) {try {
	switch(effect) {
		case "HEAL":
			break;
		case "SHILD":
			break;
		case "KNOCKBACK":
			break;
		default:
			broadcast("[defenderBuff Error] Unkown effect type: " + effect);
	}
}catch(e) {
	broadcast(ChatColor.DARK_RED + "[DefenderBuff Error" + e.lineNumber + "] " + e);
}};

/*
==============================
==============================
3D Text function - CodeInside
==============================
==============================
*/

var C_InputString = new Array();
var messageBuffer = new Array();
var writting = false;
var ClDelay = false;
var C_WordLocX,C_LineLocY,C_WordLocZ,C_PixelX,C_PixelZ,C_WriteSide,C_WriteSidePM,C_TypingDelay,C_WordMaxY,C_MaxSize,C_StartLineLoc;

function mainTextBufferActivity(){new java.lang.Thread(new java.lang.Runnable({run: function(){try{
	while(running){
		delay(500);
		if(!writting && messageBuffer.length > 0){
			debug("MessageBuffer", "loading", messageBuffer.length);
			tempMsg = messageBuffer.shift();
			if(tempMsg.length == 11){
				text3d(tempMsg[0], tempMsg[1], tempMsg[2], tempMsg[3], tempMsg[4], tempMsg[5], tempMsg[6], tempMsg[7], tempMsg[8], tempMsg[9], tempMsg[10]);
			}else if(tempMsg.length == 9){
				textClean(tempMsg[0], tempMsg[1], tempMsg[2], tempMsg[3], tempMsg[4], tempMsg[5], tempMsg[6], tempMsg[7], tempMsg[8]);
			}else{
				clientMessage(ChatColor.DARK_RED + "[Error] MessageBuffer get unknow Code:");
				clientMessage(ChatColor.DARK_RED + tempMsg);
			}
		}
	}
}catch(err){
	clientMessage("[Write]" + err);
}}})).start()};

function text3d(x,y,z,side,maxLength,textColor,textColorData, backgroundColor, backgroundColorData, string, textDelay){new java.lang.Thread(new java.lang.Runnable({run: function(){try{
	writting = true;
	debug("3dText",string,textColor);
	C_TypingDelay = textDelay;
	C_WordLocX = x;
	C_LineLocY = y;
	C_WordLocZ = z;
	switch(side){
		case "X+":
			C_WriteSide = "x";
			C_WriteSidePM = 1;
			C_StartLineLoc = C_WordLocX;
			break;
		case "X-":
			C_WriteSide = "x";
			C_WriteSidePM = -1;
			C_StartLineLoc = C_WordLocX;
			break;
		case "Z+":
			C_WriteSide = "z";
			C_WriteSidePM = 1;
			C_StartLineLoc = C_WordLocZ;
			break;
		case "Z-":
			C_WriteSide = "z";
			C_WriteSidePM = -1;
			C_StartLineLoc = C_WordLocZ;
			break;
		default:
			return;
	}
	C_InputString = string.split("");
	C_MaxSize = maxLength;
	C_WordMaxY = 0;
	for(var CwordNum in C_InputString){
		if(C_InputString[CwordNum] == "¶"){
			C_LineLocY = C_LineLocY - C_WordMaxY - 1;
		}else{
			for each(var Cshape in StringCore){
				if(Cshape.t == C_InputString[CwordNum]){
					debug("write", C_InputString[CwordNum], C_WordLocX + ", " + C_WordLocZ);
					if(Cshape.y > C_WordMaxY)
						C_WordMaxY = Cshape.y;
					for(var CshapeLineNum in Cshape.s){
						Cpixel = Cshape.s[CshapeLineNum].split("");
						C_PixelX = C_WordLocX;
						C_PixelZ = C_WordLocZ;
						for(var CpixelNum in Cpixel){
							if(Cpixel[CpixelNum] == "@"){
								if(C_WriteSide == "x"){
									Level.setTile(C_PixelX, C_LineLocY - CshapeLineNum, C_WordLocZ, textColor, textColorData);
									C_PixelX = C_PixelX + C_WriteSidePM;
								}else if(C_WriteSide == "z"){
									Level.setTile(C_WordLocX, C_LineLocY - CshapeLineNum, C_PixelZ, textColor, textColorData);
									C_PixelZ = C_PixelZ + C_WriteSidePM;
								}
							}else{
								if(C_WriteSide == "x"){
									Level.setTile(C_PixelX, C_LineLocY - CshapeLineNum, C_WordLocZ, backgroundColor, backgroundColorData);
									C_PixelX = C_PixelX + C_WriteSidePM;
								}else if(C_WriteSide == "z"){
									Level.setTile(C_WordLocX, C_LineLocY - CshapeLineNum, C_PixelZ, backgroundColor, backgroundColorData);
									C_PixelZ = C_PixelZ + C_WriteSidePM;
								}
							}
						}
					}
					if(C_WriteSide == "x"){
						C_WordLocX = C_PixelX;
						if(Math.abs(C_WordLocX + (Cpixel.length * C_WriteSidePM) - C_StartLineLoc) > C_MaxSize){
							C_WordLocX = C_StartLineLoc;
							C_LineLocY = C_LineLocY - C_WordMaxY - 1;
						}
					}else if(C_WriteSide == "z"){
						C_WordLocZ = C_PixelZ;
						if(Math.abs(C_WordLocZ + (Cpixel.length * C_WriteSidePM) - C_StartLineLoc) > C_MaxSize){
							C_WordLocZ = C_StartLineLoc;
							C_LineLocY = C_LineLocY - C_WordMaxY - 1;
						}
					}
					delay(C_TypingDelay);
				}
			}
		}
	}
	writting = false;
}catch(err){
	clientMessage("[Write]" + err);
}}})).start()};

function textClean(sx,sy,sz,ex,ey,ez,block,data,dly){new java.lang.Thread(new java.lang.Runnable({run: function(){try{
	writting = true;
	for(var cy = sy; cy <= ey; cy++){
		for(var cz = sz; cz <= ez; cz++){
			for(var cx = sx; cx <= ex; cx++){
				if(Level.getTile(cx, cy, cz) != block || Level.getData(cx, cy, cz) != data){
					Level.setTile(cx, cy, cz, block, data);
					ClDelay = true;
				}
			}
		}
		if(ClDelay){
			delay(dly);
			ClDelay = false;
		}
	}
	writting = false;
}catch(err){
	clientMessage("[Clean]" + err);
}}})).start()};

var StringCore = [
	{t: " ", y: 7, s: [
"---",
"---",
"---",
"---",
"---",
"---",
"---",
]},
	{t: "a", y: 7, s: [
"------",
"------",
"-@@---",
"@--@--",
"@--@--",
"@--@--",
"-@@-@-",
]},
	{t: "b", y: 7, s: [
"@----",
"@----",
"@----",
"@@@@-",
"@--@-",
"@--@-",
"@@@@-",
]},
	{t: "c", y: 7, s: [
"-----",
"-----",
"@@@@-",
"@----",
"@----",
"@----",
"@@@@-",
]},
	{t: "d", y: 7, s: [
"---@-",
"---@-",
"---@-",
"@@@@-",
"@--@-",
"@--@-",
"@@@@-",
]},
	{t: "e", y: 7, s: [
"------",
"------",
"-@@@--",
"@---@-",
"@@@@@-",
"@-----",
"-@@@--",
]},
	{t: "f", y: 7, s: [
"-----",
"-----",
"-@@@-",
"@----",
"@@@--",
"@----",
"@----",
]},
	{t: "g", y: 8, s: [
"-----",
"-----",
"@@@@-",
"@--@-",
"@@@@-",
"---@-",
"@--@-",
"@@@@-",
]},
	{t: "h", y: 7, s: [
"@----",
"@----",
"@----",
"@@@@-",
"@--@-",
"@--@-",
"@--@-",
]},
	{t: "i", y: 7, s: [
"--",
"--",
"@-",
"--",
"@-",
"@-",
"@-",
]},
	{t: "j", y: 7, s: [
"----",
"----",
"--@-",
"----",
"--@-",
"@-@-",
"-@--",
]},
	{t: "k", y: 7, s: [
"@----",
"@----",
"@--@-",
"@-@--",
"@@---",
"@-@--",
"@--@-",

]},
	{t: "l", y: 7, s: [
"--",
"--",
"@-",
"@-",
"@-",
"@-",
"@-",
]},
	{t: "m", y: 7, s: [
"------",
"------",
"@@@@@-",
"@-@-@-",
"@-@-@-",
"@-@-@-",
"@-@-@-",
]},
	{t: "n", y: 7, s: [
"----",
"----",
"@@@-",
"@-@-",
"@-@-",
"@-@-",
"@-@-",
]},
	{t: "o", y: 7, s: [
"-----",
"-----",
"@@@@-",
"@--@-",
"@--@-",
"@--@-",
"@@@@-",
]},
	{t: "p", y: 7, s: [
"----",
"----",
"@@@-",
"@-@-",
"@@@-",
"@---",
"@---",
]},
	{t: "q", y: 7, s: [
"----",
"----",
"@@@-",
"@-@-",
"@@@-",
"--@-",
"--@-",
]},
	{t: "r", y: 7, s: [
"---",
"---",
"@@-",
"@--",
"@--",
"@--",
"@--",
]},
	{t: "s", y: 7, s: [
"----",
"----",
"@@@-",
"@---",
"@@@-",
"--@-",
"@@@-",
]},
	{t: "t", y: 7, s: [
"----",
"----",
"-@--",
"@@@-",
"-@--",
"-@--",
"-@--",
]},
	{t: "u", y: 7, s: [
"----",
"----",
"@-@-",
"@-@-",
"@-@-",
"@-@-",
"@@@-",
]},
	{t: "v", y: 7, s: [
"----",
"----",
"@-@-",
"@-@-",
"@-@-",
"@-@-",
"-@--",
]},
	{t: "w", y: 7, s: [
"------",
"------",
"@-@-@-",
"@-@-@-",
"@-@-@-",
"@-@-@-",
"@@@@@-",
]},
	{t: "x", y: 7, s: [
"----",
"----",
"@-@-",
"@-@-",
"-@--",
"@-@-",
"@-@-",
]},
	{t: "y", y: 7, s: [
"----",
"----",
"@-@-",
"@-@-",
"-@--",
"-@--",
"@---",
]},
	{t: "z", y: 7, s: [
"------",
"------",
"@@@@@-",
"---@--",
"--@---",
"-@----",
"@@@@@-",
]},
	{t: "A", y: 7, s: [
"--@---",
"-@-@--",
"@---@-",
"@@@@@-",
"@---@-",
"@---@-",
"@---@-",
]},
	{t: "B", y: 7, s: [
"@@@@--",
"@---@-",
"@---@-",
"@@@@--",
"@---@-",
"@---@-",
"@@@@--",
]},
	{t: "C", y: 7, s: [
"@@@@@-",
"@-----",
"@-----",
"@-----",
"@-----",
"@-----",
"@@@@@-",
]},
	{t: "D", y: 7, s: [
"@@@@--",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@@@@--",
]},
	{t: "E", y: 7, s: [
"@@@@@-",
"@-----",
"@-----",
"@@@@@-",
"@-----",
"@-----",
"@@@@@-",
]},
	{t: "F", y: 7, s: [
"@@@@@-",
"@-----",
"@-----",
"@@@@--",
"@-----",
"@-----",
"@-----",
]},
	{t: "G", y: 7, s: [
"@@@@@-",
"@-----",
"@-----",
"@--@@-",
"@---@-",
"@---@-",
"@@@@@-",
]},
	{t: "H", y: 7, s: [
"@---@-",
"@---@-",
"@---@-",
"@@@@@-",
"@---@-",
"@---@-",
"@---@-",
]},
	{t: "I", y: 7, s: [
"@@@-",
"-@--",
"-@--",
"-@--",
"-@--",
"-@--",
"@@@-",
]},
	{t: "J", y: 7, s: [
"@@@@-",
"--@--",
"--@--",
"--@--",
"--@--",
"@-@--",
"@@@--",
]},
	{t: "K", y: 7, s: [
"@---@-",
"@--@--",
"@-@---",
"@@----",
"@-@---",
"@--@--",
"@---@-",
]},
	{t: "L", y: 7, s: [
"@-----",
"@-----",
"@-----",
"@-----",
"@-----",
"@-----",
"@@@@@-",
]},
	{t: "M", y: 7, s: [
"@---@-",
"@@-@@-",
"@@-@@-",
"@-@-@-",
"@-@-@-",
"@---@-",
"@---@-",
]},
	{t: "N", y: 7, s: [
"@---@-",
"@@--@-",
"@@--@-",
"@-@-@-",
"@--@@-",
"@--@@-",
"@---@-",
]},
	{t: "O", y: 7, s: [
"@@@@@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@@@@@-",
]},
	{t: "P", y: 7, s: [
"@@@@@-",
"@---@-",
"@---@-",
"@@@@@-",
"@-----",
"@-----",
"@-----",
]},
	{t: "Q", y: 7, s: [
"@@@@@-",
"@---@-",
"@---@-",
"@---@-",
"@-@-@-",
"@--@@-",
"@@@@@-",
]},
	{t: "R", y: 7, s: [
"@@@@--",
"@---@-",
"@---@-",
"@@@@--",
"@---@-",
"@---@-",
"@---@-",
]},
	{t: "S", y: 7, s: [
"@@@@@-",
"@-----",
"@-----",
"@@@@@-",
"----@-",
"----@-",
"@@@@@-",
]},
	{t: "T", y: 7, s: [
"@@@@@-",
"--@---",
"--@---",
"--@---",
"--@---",
"--@---",
"--@---",
]},
	{t: "U", y: 7, s: [
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@@@@@-",
]},
	{t: "V", y: 7, s: [
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"-@-@--",
"--@---",
]},
	{t: "W", y: 7, s: [
"@---@-",
"@---@-",
"@-@-@-",
"@-@-@-",
"@@-@@-",
"@@-@@-",
"@---@-",
]},
	{t: "X", y: 7, s: [
"@---@-",
"@---@-",
"-@-@--",
"--@---",
"-@-@--",
"@---@-",
"@---@-",
]},
	{t: "Y", y: 7, s: [
"@---@-",
"@---@-",
"-@-@--",
"--@---",
"--@---",
"--@---",
"--@---",
]},
	{t: "Z", y: 7, s: [
"@@@@@-",
"----@-",
"---@--",
"--@---",
"-@----",
"@-----",
"@@@@@-",
]},
	{t: "1", y: 7, s: [
"-@--",
"@@--",
"-@--",
"-@--",
"-@--",
"-@--",
"@@@-",
]},
	{t: "2", y: 7, s: [
"-@@@--",
"@---@-",
"----@-",
"---@--",
"--@---",
"-@----",
"@@@@@-",
]},
	{t: "3", y: 7, s: [
"-@@@--",
"@---@-",
"----@-",
"-@@@--",
"----@-",
"@---@-",
"-@@@--",
]},
	{t: "4", y: 7, s: [
"---@--",
"--@@--",
"-@-@--",
"@--@--",
"@@@@@-",
"---@--",
"---@--",
]},
	{t: "5", y: 7, s: [
"@@@@@-",
"@-----",
"@-----",
"@@@@--",
"----@-",
"----@-",
"@@@@--",
]},
	{t: "6", y: 7, s: [
"-@@@--",
"@-----",
"@-----",
"@@@@--",
"@---@-",
"@---@-",
"-@@@--",
]},
	{t: "7", y: 7, s: [
"@@@@@-",
"----@-",
"---@--",
"--@---",
"--@---",
"--@---",
"--@---",
]},
	{t: "8", y: 7, s: [
"-@@@--",
"@---@-",
"@---@-",
"-@@@--",
"@---@-",
"@---@-",
"-@@@--",
]},
	{t: "9", y: 7, s: [
"-@@@--",
"@---@-",
"@---@-",
"-@@@--",
"----@-",
"----@-",
"-@@@--",
]},
	{t: "0", y: 7, s: [
"-@@@--",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"-@@@--",
]},
	{t: "@", y: 7, s: [
"-@@@@--",
"@----@-",
"@-@--@-",
"@@-@-@-",
"@-@-@@-",
"@----@-",
"-@@@@--",
]},
	{t: "#", y: 7, s: [
"-@-@--",
"-@-@--",
"@@@@@-",
"-@-@--",
"-@-@--",
"@@@@@-",
"-@-@--",
]},
	{t: "$", y: 7, s: [
"--@---",
"@@@@@-",
"@-@---",
"@@@@@-",
"--@-@-",
"@@@@@-",
"--@---",
]},
	{t: "%", y: 7, s: [
"@@@---@-",
"@-@--@--",
"@@@-@---",
"---@----",
"--@-@@@-",
"-@--@-@-",
"@---@@@-",
]},
	{t: "&", y: 7, s: [
"-@@@--",
"-@-@--",
"-@@---",
"@-@---",
"@--@-@",
"@---@-",
"-@@@-@",
]},
	{t: "-", y: 7, s: [
"------",
"------",
"------",
"@@@@@-",
"------",
"------",
"------",
]},
	{t: "+", y: 7, s: [
"------",
"--@---",
"--@---",
"@@@@@-",
"--@---",
"--@---",
"------",
]},
	{t: "(", y: 7, s: [
"-@-",
"@--",
"@--",
"@--",
"@--",
"@--",
"-@-",
]},
	{t: ")", y: 7, s: [
"@--",
"-@-",
"-@-",
"-@-",
"-@-",
"-@-",
"@--",
]},
	{t: "*", y: 7, s: [
"------",
"------",
"--@---",
"@@@@@-",
"-@-@--",
"------",
"------",
]},
	{t: '"', y: 7, s: [
"@-@-",
"@-@-",
"----",
"----",
"----",
"----",
"----",
]},
	{t: "'", y: 7, s: [
"@-",
"@-",
"--",
"--",
"--",
"--",
"--",
]},
	{t: ":", y: 7, s: [
"--",
"@-",
"@-",
"--",
"@-",
"@-",
"--",
]},
	{t: "!", y: 7, s: [
"@-",
"@-",
"@-",
"@-",
"@-",
"--",
"@-",
]},
	{t: "?", y: 7, s: [
"@@@-",
"@-@-",
"--@-",
"-@--",
"-@--",
"----",
"-@--",
]},
	{t: "/", y: 7, s: [
"--@-",
"--@-",
"-@--",
"-@--",
"-@--",
"@---",
"@---",
]},
	{t: ",", y: 7, s: [
"--",
"--",
"--",
"--",
"--",
"@-",
"@-",
]},
	{t: ".", y: 7, s: [
"--",
"--",
"--",
"--",
"--",
"--",
"@-",
]},
	{t: "_", y: 7, s: [
"------",
"------",
"------",
"------",
"------",
"------",
"@@@@@-",

]},
	{t: "~", y: 7, s: [
"------",
"------",
"-@----",
"@-@-@-",
"---@--",
"------",
"------",
]},
	{t: "`", y: 7, s: [
"@-",
"@-",
"--",
"--",
"--",
"--",
"--",
]},
	{t: "|", y: 7, s: [
"@-",
"@-",
"@-",
"@-",
"@-",
"@-",
"@-",
]},
	{t: "•", y: 7, s: [
"---",
"---",
"---",
"@@-",
"@@-",
"---",
"---",
]},
	{t: "√", y: 7, s: [
"--@@@-",
"--@---",
"--@---",
"--@---",
"@-@---",
"-@----",
]},
	{t: "Π", y: 7, s: [
"@@@@@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
"@---@-",
]},
	{t: "÷", y: 7, s: [
"------",
"--@---",
"------",
"@@@@@-",
"------",
"--@---",
"------",
]},
	{t: "×", y: 7, s: [
"------",
"@---@-",
"-@-@--",
"--@---",
"-@-@--",
"@---@-",
"------",
]},
	{t: "¶", y: 7, s: [
"@@@-@-",
"@@@-@-",
"@@@-@-",
"--@-@-",
"--@-@-",
"--@-@-",
"--@-@-",
]},
	{t: "∆", y: 7, s: [
"--@---",
"--@---",
"-@-@--",
"-@-@--",
"@---@-",
"@---@-",
"@@@@@-",
]},
	{t: "£", y: 7, s: [
"--@@--",
"-@----",
"-@----",
"@@@@--",
"-@----",
"-@----",
"@@@@@-",
]},
	{t: "¢", y: 7, s: [
"--@---",
"@@@@@-",
"@-----",
"@-----",
"@-----",
"@@@@@-",
"--@---",
]},
	{t: "€", y: 7, s: [
"--@@@-",
"-@----",
"@@@@--",
"-@----",
"@@@@--",
"-@----",
"--@@@-",
]},
	{t: "¥", y: 7, s: [
"@-@-",
"@-@-",
"-@--",
"@@@-",
"-@--",
"@@@-",
"-@--",
]},
	{t: "^", y: 7, s: [
"-@--",
"@-@-",
"----",
"----",
"----",
"----",
"----",

]},
	{t: "°", y: 7, s: [
"-@--",
"@-@-",
"-@--",
"----",
"----",
"----",
"----",
]},
	{t: "=", y: 7, s: [
"------",
"------",
"@@@@@-",
"------",
"@@@@@-",
"------",
"------",
]},
	{t: "{", y: 7, s: [
"--@-",
"-@--",
"-@--",
"@---",
"-@--",
"-@--",
"--@-",
]},
	{t: "}", y: 7, s: [
"@---",
"-@--",
"-@--",
"--@-",
"-@--",
"-@--",
"@---",
]},
	{t: "©", y: 7, s: [
"@@-",
"@@-",
"---",
"---",
"---",
"---",
"---",
]},
	{t: "®", y: 7, s: [
"@@-",
"@@-",
"---",
"---",
"---",
"---",
"---",
]},
	{t: "™", y: 7, s: [
"@@@-@@@@@-",
"-@--@-@-@-",
"-@--@-@-@-",
"----------",
"----------",
"----------",
"----------",
]},
	{t: "℅", y: 7, s: [
"@@----@-",
"@----@--",
"@@--@---",
"---@----",
"--@-@@@-",
"-@--@-@-",
"@---@@@-",
]},
	{t: "[", y: 7, s: [
"@@@-",
"@---",
"@---",
"@---",
"@---",
"@---",
"@@@-",
]},
	{t: "]", y: 7, s: [
"@@@-",
"--@-",
"--@-",
"--@-",
"--@-",
"--@-",
"@@@-",
]},
	{t: "<", y: 7, s: [
"---@-",
"--@--",
"-@---",
"@----",
"-@---",
"--@--",
"---@-",
]},
	{t: ">", y: 7, s: [
"@----",
"-@---",
"--@--",
"---@-",
"--@--",
"-@---",
"@----",
]},
	{t: "≠", y: 7, s: [
"------",
"---@--",
"@@@@@-",
"--@---",
"@@@@@-",
"-@----",
"------",
]},
	{t: "∞", y: 7, s: [
"------",
"------",
"-@-@--",
"@-@-@-",
"-@-@--",
"------",
"------",
]},
	{t: "≈", y: 7, s: [
"-@----",
"@-@-@-",
"---@--",
"------",
"-@----",
"@-@-@-",
"---@--",
]},
	{t: "«", y: 7, s: [
"---@--@-",
"--@--@--",
"-@--@---",
"@--@----",
"-@--@---",
"--@--@--",
"---@--@-",
]},
	{t: "»", y: 7, s: [
"@--@----",
"-@--@---",
"--@--@--",
"---@--@-",
"--@--@--",
"-@--@---",
"@--@----",
]},
	{t: "≤", y: 7, s: [
"---@--",
"--@---",
"-@----",
"--@---",
"---@--",
"------",
"@@@@@-",
]},
	{t: "≥", y: 7, s: [
"-@----",
"--@---",
"---@--",
"--@---",
"-@----",
"------",
"@@@@@-",
]},
	{t: "‹", y: 7, s: [
"----",
"--@-",
"-@--",
"@---",
"-@--",
"--@-",
"----",
]},
	{t: "›", y: 7, s: [
"----",
"@---",
"-@--",
"--@-",
"-@--",
"@---",
"----",
]},
	{t: "∅", y: 7, s: [
"@@@@@-",
"@--@@-",
"@-@-@-",
"@-@-@-",
"@-@-@-",
"@@--@-",
"@@@@@-",
]},
	{t: "₱", y: 7, s: [
"@@@@@-",
"@---@-",
"@@@@@-",
"@---@-",
"@@@@@-",
"@-----",
"@-----",
]},
	{t: "₩", y: 7, s: [
"-@---@---@--",
"-@---@---@--",
"@@@@@@@@@@@-",
"-@---@---@--",
"--@-@-@-@---",
"--@-@-@-@---",
"---@---@----",
]},
	{t: "‰", y: 7, s: [
"@@@---@----",
"@-@--@-----",
"@@@-@------",
"---@-------",
"--@-@@@@@@-",
"-@--@-@@-@-",
"@---@@@@@@-",
]},
	{t: "—", y: 7, s: [
"------",
"------",
"------",
"@@@@@@",
"------",
"------",
"------",
]},
	{t: "–", y: 7, s: [
"------",
"------",
"------",
"@@@@@-",
"------",
"------",
"------",
]},
	{t: "±", y: 7, s: [
"------",
"--@---",
"--@---",
"@@@@@-",
"--@---",
"@@@@@-",
"------",
]},
	{t: "†", y: 7, s: [
"--@---",
"--@---",
"-@@@--",
"--@---",
"--@---",
"--@---",
"--@---",
]},
	{t: "‡", y: 7, s: [
"--@---",
"-@@@--",
"--@---",
"--@---",
"--@---",
"-@@@--",
"--@---",
]},
	{t: "“", y: 7, s: [
"@-@-",
"@-@-",
"----",
"----",
"----",
"----",
"----",
]},
	{t: "”", y: 7, s: [
"@-@-",
"@-@-",
"----",
"----",
"----",
"----",
"----",
]},
	{t: "˝", y: 7, s: [
"-@----",
"@-@-@-",
"---@--",
"------",
"------",
"------",
"------",
]},
	{t: "¡", y: 7, s: [
"@-",
"--",
"@-",
"@-",
"@-",
"@-",
"@-",
]},
	{t: "¿", y: 7, s: [
"-@--",
"----",
"-@--",
"-@--",
"@---",
"@-@-",
"-@--",
]},
	{t: "ß", y: 7, s: [
"-@@@--",
"@---@-",
"@---@-",
"@@-@--",
"@---@-",
"@---@-",
"@@@@--",
]},
	{t: "ç", y: 7, s: [
"-@@@@-",
"@-----",
"@-----",
"@-----",
"-@@@@-",
"--@---",
"-@----",
]},
	{t: "§", y: 7, s: [
"@@@@@-",
"@-----",
"@@@@@-",
"@---@-",
"@@@@@-",
"----@-",
"@@@@@-",
]},
];

var segmentCore = [
	{t: "@1", y: 5, s: [
"--@-",
"--@-",
"--@-",
"--@-",
"--@-",
]},
	{t: "@2", y: 5, s: [
"@@@-",
"--@-",
"@@@-",
"@---",
"@@@-",
]},
	{t: "@3", y: 5, s: [
"@@@-",
"--@-",
"@@@-",
"--@-",
"@@@-",
]},
	{t: "@4", y: 5, s: [
"@-@-",
"@-@-",
"@@@-",
"--@-",
"--@-",
]},
	{t: "@5", y: 5, s: [
"@@@-",
"@---",
"@@@-",
"--@-",
"@@@-",
]},
	{t: "@6", y: 5, s: [
"@@@-",
"@---",
"@@@-",
"@-@-",
"@@@-",
]},
	{t: "@7", y: 5, s: [
"@@@-",
"@-@-",
"@-@-",
"--@-",
"--@-",
]},
	{t: "@8", y: 5, s: [
"@@@-",
"@-@-",
"@@@-",
"@-@-",
"@@@-",
]},
	{t: "@9", y: 5, s: [
"@@@-",
"@-@-",
"@@@-",
"--@-",
"@@@-",
]},
	{t: "@0", y: 5, s: [
"@@@-",
"@-@-",
"@-@-",
"@-@-",
"@@@-",
]},
];

function debug(a,b,c){
	if(debuging){
		clientMessage("[Code] <"+a+">: "+b+" - "+c);
	}
};