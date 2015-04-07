var ScriptName = "Code: Modeling creator";
var Version = "Cell v2";
/**
*—————Change Log—————
*Cell v1(20150309)
*	-타입 "셀" 릴리즈
*
*Cell v2(20150312)
*	-모델링의 방향 설정기능 추가
* -모델링의 미세좌표 수정기능 추가
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

var Model = {};
var offsetX, offsetY, offsetZ, pos1X, pos1Y, pos1Z, pos2X, pos2Y, pos2Z, model, progress, lastCode, lastData, fileName;
var size = 1;
var side = "x+";
var modelType = "body";
var MAIN_PATH = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/games/com.mojang/minecraftpe/mods/Code_Modeling_creator");

if(!MAIN_PATH.exists())
	MAIN_PATH.mkdirs();

Model.offset = function(x, y, z) {
	offsetX = parseInt(x);
	offsetY = parseInt(y);
	offsetZ = parseInt(z);
	clientMessage(offsetX + " " + offsetY + " " + offsetZ);
}
Model.pos1 = function(x, y, z) {
	pos1X = parseInt(x);
	pos1Y = parseInt(y);
	pos1Z = parseInt(z);
	clientMessage(pos1X + " " + pos1Y + " " + pos1Z);
}
Model.pos2 = function(x, y, z) {
	pos2X = parseInt(x);
	pos2Y = parseInt(y);
	pos2Z = parseInt(z);
	clientMessage(pos2X + " " + pos2Y + " " + pos2Z);
}
Model.create = function() {
	new java.lang.Thread(new java.lang.Runnable( {run: function() {try {
	if(typeof offsetX != "number" || typeof pos1X != "number" || typeof pos2X != "number") {
		clientMessage("[Model] please set Pos first");
	}else if(typeof modelType == "undefined") {
		clientMessage("[Model] please set modelType");
	}else {
		clientMessage(typeof fileName);
		if(typeof fileName != "string"){
			var count = 1;
			var fileName = "unTitleModeling";
			while(new java.io.File(MAIN_PATH, fileName + count + ".txt").exists())
				count++;
			var fileName = fileName + count.toString();
		}
		model = "";
		clientMessage("[Model] start create Model file...");
		var OUTPUT = new java.io.File(MAIN_PATH, fileName + ".txt");
		if(pos1X <= pos2X) {
			var rX = pos1X;
			var sX = (pos1X - offsetX);
			var lX = (pos2X - pos1X);
		}else {
			var rX = pos2X;
			var sX = (pos2X - offsetX);
			var lX = (pos1X - pos2X);
		}
		if(pos1Y <= pos2Y) {
			var rY = pos1Y;
			var sY = (pos1Y - offsetY);
			var lY = (pos2Y - pos1Y);
		}else {
			var rY = pos2Y;
			var sY = (pos2Y - offsetY);
			var lY = (pos1Y - pos2Y);
		}
		if(pos1Z <= pos2Z) {
			var rZ = pos1Z;
			var sZ = (pos1Z - offsetZ);
			var lZ = (pos2Z - pos1Z);
		}else {
			var rZ = pos2Z;
			var sZ = (pos2Z - offsetZ);
			var lZ = (pos1Z - pos2Z);
		}
		if(typeof(size) != "number" || size < 1)
			size = 1;
		clientMessage("[Model] Xsize:" + lX + " Ysize:" + lY + " Zsize:" + lZ);
		if(!OUTPUT.exists())
			OUTPUT.delete();
		progress = 0;
		var bw = new java.io.BufferedWriter(new java.io.FileWriter(OUTPUT));
		bw.write("var X = 0;\n");
		bw.write("var Y = 0;\n");
		bw.write("var Z = 0;\n");
		for(var cY = 0; cY <= lY; cY++) {for(var cX = 0; cX <= lX; cX++) {for(var cZ = 0; cZ <= lZ; cZ++) {
			var tile = Level.getTile(rX + cX, rY + cY, rZ + cZ);
			var data = Level.getData(rX + cX, rY + cY, rZ + cZ);
			if(blankModel.indexOf(tile) == -1) {
				if(tile == lastCode && data == lastData) {
					switch(side) {
						case "x+":
							bw.write(modelType + ".addBox(" + (((sZ + cZ) * (1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sX + cX) * (-1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						case "x-":
							bw.write(modelType + ".addBox(" + (((sZ + cZ) * (-1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sX + cX) * (1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						case "z+":
							bw.write(modelType + ".addBox(" + (((sX + cX) * (1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sZ + cZ) * (-1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						case "z-":
							bw.write(modelType + ".addBox(" + (((sX + cX) * (-1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sZ + cZ) * (1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						default:
							clientMessage("[Error] 'get Side' Crash!");
					}
				}else {
					lastCode = tile;
					lastData = data;
					bw.write(modelType + ".setTextureOffset(" + colorOffsetX(tile, data) + ", " + colorOffsetY(tile, data) + ", true);\n");
					switch(side) {
						case "x+":
							bw.write(modelType + ".addBox(" + (((sZ + cZ) * (1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sX + cX) * (-1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						case "x-":
							bw.write(modelType + ".addBox(" + (((sZ + cZ) * (-1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sX + cX) * (1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						case "z+":
							bw.write(modelType + ".addBox(" + (((sX + cX) * (1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sZ + cZ) * (-1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						case "z-":
							bw.write(modelType + ".addBox(" + (((sX + cX) * (-1) * size) - ((size - 1) / 2)) + " + X, " + (((sY + cY) * (-1) * size) - ((size - 1) / 2)) + " + Y, " + (((sZ + cZ) * (1) * size) - ((size - 1) / 2)) + " + Z, 1, 1, 1, " + ((size - 1) / 2) + ");\n");
							break;
						default:
							clientMessage("[Error] 'get Side' Crash!");
					}
				}
				java.lang.Thread.sleep(1);
			}
			progress++;
			ModPE.showTipMessage(Math.round(progress * 100 / ((lX+1) * (lY+1) * (lZ+1))) + "%");
		}}}
		bw.close();
		clientMessage("[Model] save in: " + OUTPUT);
		clientMessage("[Model] finish");
	}
}catch(err){
	clientMessage(err);
}}})).start()};

function procCmd(str) {
	var cmd = str.split(" ");
	switch(cmd[0]) {
		case "offset":
			Model.offset(Player.getX(), Player.getY()-1, Player.getZ());
			clientMessage("[Model] set offset");
			break;
		case "pos1":
			Model.pos1(Player.getX(), Player.getY()-1, Player.getZ());
			clientMessage("[Model] set pos1");
			break;
		case "pos2":
			Model.pos2(Player.getX(), Player.getY()-1, Player.getZ());
			clientMessage("[Model] set pos2");
			break;
		case "type":
			modelType = cmd[1];
			clientMessage("[Model] set Type: " + cmd[1]);
			break;
		case "size":
			size = parseInt(cmd[1]);
clientMessage("[Model] set Size: " + size);
			break;
		case "side":
			switch(cmd[1]) {
				case "x+":
				case "x-":
				case "z+":
				case "z-":
					side = cmd[1]
					clientMessage("[Model] set Side: " + side);
					break;
				default:
					clientMessage("[Model] unknown side (try: x+, x-, z+, z-)");
					break;
			}
			break;
		case "create":
			fileName = cmd[1];
			Model.create();
			break;
	}
};

function colorOffsetX(id, data) {
	for each(var e in modelColor) {
		if(e.blockCode == id && e.blockData == data) 
			return e.colorOffsetX;
	}
	for each(var e in modelColor) {
		if(e.blockCode == id) 
			return e.colorOffsetX;
	}
	return -1;
};

function colorOffsetY(id, data) {
	for each(var e in modelColor) {
		if(e.blockCode == id && e.blockData == data) 
			return e.colorOffsetY;
	}
	for each(var e in modelColor) {
		if(e.blockCode == id) 
			return e.colorOffsetY;
	}
	return -1;
};

var modelColor = [
{blockName: "양털들", blockCode: 35, blockData: 0, colorOffsetX: 0, colorOffsetY: 0},
{blockName: 0, blockCode: 35, blockData: 1, colorOffsetX: 0, colorOffsetY: 2},
{blockName: 0, blockCode: 35, blockData: 2, colorOffsetX: 0, colorOffsetY: 4},
{blockName: 0, blockCode: 35, blockData: 3, colorOffsetX: 0, colorOffsetY: 6},
{blockName: 0, blockCode: 35, blockData: 4, colorOffsetX: 0, colorOffsetY: 8},
{blockName: 0, blockCode: 35, blockData: 5, colorOffsetX: 0, colorOffsetY: 10},
{blockName: 0, blockCode: 35, blockData: 6, colorOffsetX: 0, colorOffsetY: 12},
{blockName: 0, blockCode: 35, blockData: 7, colorOffsetX: 0, colorOffsetY: 14},
{blockName: 0, blockCode: 35, blockData: 8, colorOffsetX: 0, colorOffsetY: 16},
{blockName: 0, blockCode: 35, blockData: 9, colorOffsetX: 0, colorOffsetY: 18},
{blockName: 0, blockCode: 35, blockData: 10, colorOffsetX: 0, colorOffsetY: 20},
{blockName: 0, blockCode: 35, blockData: 11, colorOffsetX: 0, colorOffsetY: 22},
{blockName: 0, blockCode: 35, blockData: 12, colorOffsetX: 0, colorOffsetY: 24},
{blockName: 0, blockCode: 35, blockData: 13, colorOffsetX: 0, colorOffsetY: 26},
{blockName: 0, blockCode: 35, blockData: 14, colorOffsetX: 0, colorOffsetY: 28},
{blockName: 0, blockCode: 35, blockData: 15, colorOffsetX: 0, colorOffsetY: 30},
{blockName: "컬러점토", blockCode: 159, blockData: 0, colorOffsetX: 4, colorOffsetY: 0},
{blockName: 0, blockCode: 159, blockData: 1, colorOffsetX: 4, colorOffsetY: 2},
{blockName: 0, blockCode: 159, blockData: 2, colorOffsetX: 4, colorOffsetY: 4},
{blockName: 0, blockCode: 159, blockData: 3, colorOffsetX: 4, colorOffsetY: 6},
{blockName: 0, blockCode: 159, blockData: 4, colorOffsetX: 4, colorOffsetY: 8},
{blockName: 0, blockCode: 159, blockData: 5, colorOffsetX: 4, colorOffsetY: 10},
{blockName: 0, blockCode: 159, blockData: 6, colorOffsetX: 4, colorOffsetY: 12},
{blockName: 0, blockCode: 159, blockData: 7, colorOffsetX: 4, colorOffsetY: 14},
{blockName: 0, blockCode: 159, blockData: 8, colorOffsetX: 4, colorOffsetY: 16},
{blockName: 0, blockCode: 159, blockData: 9, colorOffsetX: 4, colorOffsetY: 18},
{blockName: 0, blockCode: 159, blockData: 10, colorOffsetX: 4, colorOffsetY: 20},
{blockName: 0, blockCode: 159, blockData: 11, colorOffsetX: 4, colorOffsetY: 22},
{blockName: 0, blockCode: 159, blockData: 12, colorOffsetX: 4, colorOffsetY: 24},
{blockName: 0, blockCode: 159, blockData: 13, colorOffsetX: 4, colorOffsetY: 26},
{blockName: 0, blockCode: 159, blockData: 14, colorOffsetX: 4, colorOffsetY: 28},
{blockName: 0, blockCode: 159, blockData: 15, colorOffsetX: 4, colorOffsetY: 30},
{blockName: "배드락", blockCode: 7, blockData: 0, colorOffsetX: 8, colorOffsetY: 0},
{blockName: "잔디", blockCode: 2, blockData: 0, colorOffsetX: 8, colorOffsetY: 2},
{blockName: "흙", blockCode: 3, blockData: 0, colorOffsetX: 8, colorOffsetY: 4},
{blockName: "모래", blockCode: 12, blockData: 0, colorOffsetX: 8, colorOffsetY: 6},
{blockName: "붉은모래", blockCode: 12, blockData: 1, colorOffsetX: 8, colorOffsetY: 8},
{blockName: "자갈", blockCode: 13, blockData: 0, colorOffsetX: 8, colorOffsetY: 10},
{blockName: "점토블럭", blockCode: 82, blockData: 0, colorOffsetX: 8, colorOffsetY: 12},
{blockName: "벽돌", blockCode: 45, blockData: 0, colorOffsetX: 8, colorOffsetY: 14},
{blockName: "철블럭", blockCode: 42, blockData: 0, colorOffsetX: 8, colorOffsetY: 16},
{blockName: "금블럭", blockCode: 41, blockData: 0, colorOffsetX: 8, colorOffsetY: 18},
{blockName: "다이아몬드블럭", blockCode: 57, blockData: 0, colorOffsetX: 8, colorOffsetY: 20},
{blockName: "석탄블럭", blockCode: 173, blockData: 0, colorOffsetX: 8, colorOffsetY: 22},
{blockName: "청금석블럭", blockCode: 22, blockData: 0, colorOffsetX: 8, colorOffsetY: 24},
{blockName: "에메랄드블럭", blockCode: 133, blockData: 0, colorOffsetX: 8, colorOffsetY: 26},
/*{blockName: "레드스톤블럭", blockCode: , blockData: , colorOffsetX: 8, colorOffsetY: 28},내가 이거 왜 넣은거지...*/
{blockName: "석영블럭", blockCode: 155, blockData: 0, colorOffsetX: 8, colorOffsetY: 30},
{blockName: "오크나무목재", blockCode: 5, blockData: 0, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무목재", blockCode: 5, blockData: 1, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무목재", blockCode: 5, blockData: 2, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무목재", blockCode: 5, blockData: 3, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무목재", blockCode: 5, blockData: 4, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무목재", blockCode: 5, blockData: 4, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "오크나무", blockCode: 17, blockData: 0, colorOffsetX: 12, colorOffsetY: 12},
{blockName: "가문비나무", blockCode: 17, blockData: 1, colorOffsetX: 12, colorOffsetY: 14},
{blockName: "자작나무", blockCode: 17, blockData: 2, colorOffsetX: 12, colorOffsetY: 16},
{blockName: "정글나무", blockCode: 17, blockData: 3, colorOffsetX: 12, colorOffsetY: 18},
{blockName: "아카시아나무", blockCode: 162, blockData: 0, colorOffsetX: 12, colorOffsetY: 20},
{blockName: "다크오크나무", blockCode: 162, blockData: 1, colorOffsetX: 12, colorOffsetY: 22},
{blockName: "돌", blockCode: 1, blockData: 0, colorOffsetX: 12, colorOffsetY: 24},
{blockName: "조약돌", blockCode: 4, blockData: 0, colorOffsetX: 12, colorOffsetY: 26},
{blockName: "이끼낀조약돌", blockCode: 48, blockData: 0, colorOffsetX: 12, colorOffsetY: 28},
{blockName: "석재벽돌", blockCode: 98, blockData: 0, colorOffsetX: 12, colorOffsetY: 30},
{blockName: "이끼낀석재벽돌", blockCode: 98, blockData: 1, colorOffsetX: 16, colorOffsetY: 0},
{blockName: "금간석재벽돌", blockCode: 98, blockData: 2, colorOffsetX: 16, colorOffsetY: 2},
{blockName: "화강암", blockCode: 1, blockData: 1, colorOffsetX: 16, colorOffsetY: 6},
{blockName: "제련된화강암", blockCode: 1, blockData: 2, colorOffsetX: 16, colorOffsetY: 6},
{blockName: "섬록암", blockCode: 1, blockData: 3, colorOffsetX: 16, colorOffsetY: 8},
{blockName: "제련된섬록암", blockCode: 1, blockData: 4, colorOffsetX: 16, colorOffsetY: 8},
{blockName: "안산암", blockCode: 1, blockData: 5, colorOffsetX: 16, colorOffsetY: 10},
{blockName: "제련된안산암", blockCode: 1, blockData: 6, colorOffsetX: 16, colorOffsetY: 10},
{blockName: "옵시디언", blockCode: 49, blockData: 0, colorOffsetX: 16, colorOffsetY: 12},
{blockName: "물", blockCode: 8, blockData: 0, colorOffsetX: 16, colorOffsetY: 14},
{blockName: "멈춘물", blockCode: 9, blockData: 0, colorOffsetX: 16, colorOffsetY: 14},
{blockName: "용암", blockCode: 10, blockData: 0, colorOffsetX: 16, colorOffsetY: 16},
{blockName: "멈춘용암", blockCode: 11, blockData: 0, colorOffsetX: 16, colorOffsetY: 16},
{blockName: "눈", blockCode: 80, blockData: 0, colorOffsetX: 16, colorOffsetY: 18},
{blockName: "얼음", blockCode: 79, blockData: 0, colorOffsetX: 16, colorOffsetY: 20},
{blockName: "선인장", blockCode: 81, blockData: 0, colorOffsetX: 16, colorOffsetY: 22},
{blockName: "사탕수수", blockCode: 83, blockData: 0, colorOffsetX: 16, colorOffsetY: 24},
{blockName: "농토", blockCode: 60, blockData: 0, colorOffsetX: 16, colorOffsetY: 26},
{blockName: "젖은농토", blockCode: 60, blockData: 1, colorOffsetX: 16, colorOffsetY: 26},
{blockName: "호박", blockCode: 86, blockData: 0, colorOffsetX: 16, colorOffsetY: 28},
{blockName: "잭오랜턴", blockCode: 91, blockData: 0, colorOffsetX: 28, colorOffsetY: 4},
{blockName: "수박", blockCode: 103, blockData: 0, colorOffsetX: 16, colorOffsetY: 30},
{blockName: "갈색버섯블럭", blockCode: 99, blockData: 0, colorOffsetX: 20, colorOffsetY: 0},
{blockName: "빨간버섯블럭", blockCode: 100, blockData: 0, colorOffsetX: 20, colorOffsetY: 2},
{blockName: "갈색버섯줄기블럭", blockCode: 99, blockData: 10, colorOffsetX: 20, colorOffsetY: 4},
{blockName: "빨간버섯줄기블럭", blockCode: 100, blockData: 10, colorOffsetX: 20, colorOffsetY: 4},
{blockName: "발광석", blockCode: 89, blockData: 0, colorOffsetX: 24, colorOffsetY: 28},
{blockName: "지옥돌", blockCode: 87, blockData: 0, colorOffsetX: 28, colorOffsetY: 0},
{blockName: "지옥벽돌", blockCode: 112, blockData: 0, colorOffsetX: 28, colorOffsetY: 2},
/*{blockName: "지옥벽돌울타리", blockCode: , blockData: , colorOffsetX: , colorOffsetY: },지옥벽돌울타리는 존재하지 않네요 ㄱ-*/
{blockName: "조약돌울타리", blockCode: 139, blockData: 0, colorOffsetX: 12, colorOffsetY: 26},
{blockName: "이끼낀조약돌울타리", blockCode: 139, blockData: 1, colorOffsetX: 12, colorOffsetY: 28},
{blockName: "오크나무울타리", blockCode: 85, blockData: 0, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무울타리", blockCode: 85, blockData: 1, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무울타리", blockCode: 85, blockData: 2, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무울타리", blockCode: 85, blockData: 3, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무울타리", blockCode: 85, blockData: 4, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무울타리", blockCode: 85, blockData: 5, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "오크나무울타리문", blockCode: 107, blockData: 0, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무울타리문", blockCode: 183, blockData: 0, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무울타리문", blockCode: 184, blockData: 0, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무울타리문", blockCode: 185, blockData: 0, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무울타리문", blockCode: 187, blockData: 0, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무울타리문", blockCode: 186, blockData: 0, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "오크나무계단", blockCode: 53, blockData: 0, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무계단", blockCode: 134, blockData: 0, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무계단", blockCode: 135, blockData: 0, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무계단", blockCode: 136, blockData: 0, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무계단", blockCode: 163, blockData: 0, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무계단", blockCode: 164, blockData: 0, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "오크나무반블럭", blockCode: 158, blockData: 0, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무반블럭", blockCode: 158, blockData: 1, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무반블럭", blockCode: 158, blockData: 2, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무반블럭", blockCode: 158, blockData: 3, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무반블럭", blockCode: 158, blockData: 4, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무반블럭", blockCode: 158, blockData: 55, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "오크나무반블럭2", blockCode: 158, blockData: 8, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무반블럭2", blockCode: 158, blockData: 9, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무반블럭2", blockCode: 158, blockData: 10, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무반블럭2", blockCode: 158, blockData: 11, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무반블럭2", blockCode: 158, blockData: 12, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무반블럭2", blockCode: 158, blockData: 13, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "오크나무반블럭3", blockCode: 157, blockData: 0, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "가문비나무반블럭3", blockCode: 157, blockData: 1, colorOffsetX: 12, colorOffsetY: 2},
{blockName: "자작나무반블럭3", blockCode: 157, blockData: 2, colorOffsetX: 12, colorOffsetY: 4},
{blockName: "정글나무반블럭3", blockCode: 157, blockData: 3, colorOffsetX: 12, colorOffsetY: 6},
{blockName: "아카시아나무반블럭3", blockCode: 157, blockData: 4, colorOffsetX: 12, colorOffsetY: 8},
{blockName: "다크오크나무반블럭3", blockCode: 157, blockData: 5, colorOffsetX: 12, colorOffsetY: 10},
{blockName: "돌벽돌반블럭", blockCode: 44, blockData: 0, colorOffsetX: 16, colorOffsetY: 4},
{blockName: "사암반블럭", blockCode: 44, blockData: 1, colorOffsetX: 8, colorOffsetY: 6},
{blockName: "나무반블럭", blockCode: 44, blockData: 2, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "조약돌반블럭", blockCode: 44, blockData: 3, colorOffsetX: 12, colorOffsetY: 26},
{blockName: "벽돌반블럭", blockCode: 44, blockData: 4, colorOffsetX: 8, colorOffsetY: 14},
{blockName: "석제벽돌반블럭", blockCode: 44, blockData: 5, colorOffsetX: 12, colorOffsetY: 30},
{blockName: "석영반블럭", blockCode: 44, blockData: 6, colorOffsetX: 8, colorOffsetY: 30},
{blockName: "돌벽돌반블럭2", blockCode: 44, blockData: 8, colorOffsetX: 16, colorOffsetY: 4},
{blockName: "사암반블럭2", blockCode: 44, blockData: 9, colorOffsetX: 8, colorOffsetY: 6},
{blockName: "나무반블럭2", blockCode: 44, blockData: 10, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "조약돌반블럭2", blockCode: 44, blockData: 11, colorOffsetX: 12, colorOffsetY: 26},
{blockName: "벽돌반블럭2", blockCode: 44, blockData: 12, colorOffsetX: 8, colorOffsetY: 14},
{blockName: "석제벽돌반블럭2", blockCode: 44, blockData: 13, colorOffsetX: 12, colorOffsetY: 30},
{blockName: "석영반블럭2", blockCode: 44, blockData: 14, colorOffsetX: 8, colorOffsetY: 30},
{blockName: "돌벽돌반블럭3", blockCode: 43, blockData: 0, colorOffsetX: 16, colorOffsetY: 4},
{blockName: "사암반블럭3", blockCode: 43, blockData: 1, colorOffsetX: 8, colorOffsetY: 6},
{blockName: "나무반블럭3", blockCode: 43, blockData: 2, colorOffsetX: 12, colorOffsetY: 0},
{blockName: "조약돌반블럭3", blockCode: 43, blockData: 3, colorOffsetX: 12, colorOffsetY: 26},
{blockName: "벽돌반블럭3", blockCode: 43, blockData: 4, colorOffsetX: 8, colorOffsetY: 14},
{blockName: "석제벽돌반블럭3", blockCode: 43, blockData: 5, colorOffsetX: 12, colorOffsetY: 30},
{blockName: "석영반블럭3", blockCode: 43, blockData: 6, colorOffsetX: 8, colorOffsetY: 30},
{blockName: "건초더미", blockCode: 170, blockData: 0, colorOffsetX: 20, colorOffsetY: 6},
{blockName: "균사체", blockCode: 110, blockData: 0, colorOffsetX: 20, colorOffsetY: 8},
{blockName: "부엽토", blockCode: 243, blockData: 0, colorOffsetX: 20, colorOffsetY: 10},
{blockName: "TNT", blockCode: 46, blockData: 0, colorOffsetX: 20, colorOffsetY: 12},
{blockName: "책장", blockCode: 47, blockData: 0, colorOffsetX: 20, colorOffsetY: 14},
{blockName: "몬스터스포너", blockCode: 52, blockData: 0, colorOffsetX: 20, colorOffsetY: 16},
{blockName: "창고", blockCode: 54, blockData: 0, colorOffsetX: 20, colorOffsetY: 18},
{blockName: "조합대", blockCode: 58, blockData: 0, colorOffsetX: 20, colorOffsetY: 20},
{blockName: "화로", blockCode: 61, blockData: 0, colorOffsetX: 20, colorOffsetY: 22},
{blockName: "작동중화로", blockCode: 62, blockData: 0, colorOffsetX: 20, colorOffsetY: 22},
{blockName: "엔더블럭", blockCode: 121, blockData: 0, colorOffsetX: 20, colorOffsetY: 24},
{blockName: "엔더포탈프레임", blockCode: 120, blockData: 0, colorOffsetX: 20, colorOffsetY: 24},
{blockName: "지옥돌계단", blockCode: 114, blockData: 0, colorOffsetX: 28, colorOffsetY: 2},
{blockName: "스톤커터", blockCode: 245, blockData: 0, colorOffsetX: 28, colorOffsetY: 6},
{blockName: "지옥반응기핵", blockCode: 247, blockData: 0, colorOffsetX: 20, colorOffsetY: 26},
{blockName: "작동중지옥반응기핵", blockCode: 247, blockData: 1, colorOffsetX: 20, colorOffsetY: 28},
{blockName: "완료된지옥반응기핵", blockCode: 247, blockData: 2, colorOffsetX: 20, colorOffsetY: 30},
{blockName: "빛나는옵시디언", blockCode: 246, blockData: 0, colorOffsetX: 24, colorOffsetY: 0},
{blockName: "사암", blockCode: 24, blockData: 0, colorOffsetX: 8, colorOffsetY: 6},
{blockName: "단단한점토블럭", blockCode: 172, blockData: 0, colorOffsetX: 28, colorOffsetY: 8},
{blockName: "스펀지", blockCode: 19, blockData: 0, colorOffsetX: 24, colorOffsetY: 30},
{blockName: "오크나무잎", blockCode: 18, blockData: 0, colorOffsetX: 24, colorOffsetY: 2},
{blockName: "가문비나무잎", blockCode: 18, blockData: 1, colorOffsetX: 24, colorOffsetY: 4},
{blockName: "자작나무잎", blockCode: 18, blockData: 2, colorOffsetX: 24, colorOffsetY: 6},
{blockName: "정글나무잎", blockCode: 18, blockData: 3, colorOffsetX: 24, colorOffsetY: 8},
{blockName: "아카시아나무잎", blockCode: 161, blockData: 0, colorOffsetX: 24, colorOffsetY: 10},
{blockName: "다크오크나무잎", blockCode: 161, blockData: 1, colorOffsetX: 24, colorOffsetY: 12},

/* 이  것을 사용해 새로운 블럭을 추가
{blockName: 0, blockCode: , blockData: , colorOffsetX: , colorOffsetY: },
{blockName: 0, blockCode: , blockData: , colorOffsetX: , colorOffsetY: },
*/
];

var blankModel = [0,6,20,26,27,30,31,32,37,38,39,40,50,51,59,63,64,65,66,68,71,78,83,92,95,96,101,102,104,105,106,111,126,127,141,142,175,244];
