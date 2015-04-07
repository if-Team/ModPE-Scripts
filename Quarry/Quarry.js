/*
 * Copyright 2015 Choseul, CodeInside, ChalkPE
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//DEBUG SETTING
var debugging = true;
var asynchronous = false;

//import
/**
 * @type {android.content.Context}
 */
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var File = java.io.File;

const _SD_CARD = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const _MAIN_DIR = new File(_SD_CARD, "games/com.mojang/minecraftpe/mods/Quarry");
const _NO_MEDIA = new File(_MAIN_DIR, ".nomedia");
const _BLOCK = new File(_MAIN_DIR, "terrain-atlas.tga");
const _BLOCK_URL = "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/Quarry/resource/terrain-atlas.tga";
const _DRILL = new File(_MAIN_DIR, "quarry_drill.png");
const _DRILL_URL = "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/Quarry/resource/quarry_drill.png";
const _CRANE = new File(_MAIN_DIR, "quarry_crane.png");
const _CRANE_URL = "https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/Quarry/resource/quarry_crane.png";
function _MAP_DIR() {return new File(_SD_CARD, "games/com.mojang/minecraftWorlds/" + Level.getWorldDir() + "/mods")}
function _MAP_QUARRY_DATA() {return new File(_MAP_DIR(), "quarry.json")}


var rendererDrill = Renderer.createHumanoidRenderer();
var rendererCrane = Renderer.createHumanoidRenderer();
var running = false;

scriptPreLoad();

var Tile = {
    AIR: 0,
    BEDROCK: 7,

    QUARRY_NORTH: 200,
    QUARRY_SOUTH: 201,
    QUARRY_WEST: 202,
    QUARRY_EAST: 203,

    FRAME: 204
};

var Quarry = {};
var QuarryData = [];
//push([[mainX, Y, Z], [mod, DataArray], [startX, Y, Z], [endX, Y, Z], [[DrillEnt, ConnectEnt, CraneXEnt, CraneZEnt], [DrillMountEnt, ConnectMountEnt, CraneXMountEnt, CraneZMountEnt]], [[DrillMountEntX, Y, Z], [ConnectMountEntX, Y, Z], [CraneXMountEntX, Y, Z], [CraneZMountEntX, Y, Z]], [TargetX, TargetY, TargetZ]])
//QurryMod: IDLE, BUILDING, BUILD, MINE, FIN

Block.defineBlock(Tile.QUARRY_NORTH, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_bottom",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(Tile.QUARRY_SOUTH, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_bottom",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(Tile.QUARRY_WEST,  "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_bottom",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(Tile.QUARRY_EAST,  "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_bottom",0]], 0, true, 0);
Block.defineBlock(Tile.FRAME, "Frame", [ ["cauldron_inner",0],["cauldron_inner",0],["cauldron_inner",0],["cauldron_inner",0], ["cauldron_inner",0],["cauldron_inner",0]], 0, false, 0);
Block.setRenderLayer(Tile.FRAME,3);
Block.setLightOpacity(Tile.FRAME, 1);
Player.addItemCreativeInv(Tile.QUARRY_SOUTH, 5, 0);
Player.addItemCreativeInv(Tile.FRAME, 5, 0);

function getQuarryId(yaw){
	var angle = yaw % 360;

	if((0 <= angle && angle < 45) || (315 <= angle && angle < 360)){
        return 200; //"북(Z+)";
    }else if(45 <= angle && angle < 135){
        return 203; //"동(-X)";
    }else if(135 <= angle && angle < 225){
        return 201; //"남(Z-)";
    }else if(225 <= angle && angle < 315){
        return 202; //"서(X+)";
    }else{
        return 0;
    }
}

/**
 * @since 2015-04-04
 * @author Choseul <chocoslime05@naver.com>
 */
function useItem(x, y, z, itemId, blockId, side, itemDamage, blockDamage){
    void(blockId); void(blockDamage); void(itemDamage);

	if(itemId == 267){
        new java.lang.Thread({
            run: function(){
                for( ; y >= 0; y--){
                    var tile = Level.getTile(x, y, z);
                    var data = Level.getData(x, y, z);

                    Player.addItemInventory(tile, 1, data);
                    Level.destroyBlock(x, y, z, false);

                    java.lang.Thread.sleep(3000);
                }
            }
        }).start();
    }else if(itemId === Tile.QUARRY_SOUTH){
		preventDefault();
		clientMessage(getQuarryId(Entity.getYaw(Player.getEntity())));

		var tx = x;
		var ty = y;
		var tz = z;

        switch(side){
			case 0:
				ty--;
				break;
			case 1:
				ty++;
				break;
			case 2:
				tz--;
				break;
			case 3:
				tz++;
				break;
			case 4:
				tx--;
				break;
			case 5:
				tx++;
				break;
			default:
				clientMessage("Unknown Side");
		}
		if(Level.getTile(tx, ty, tz) === 0) {
			Level.setTile(tx, ty, tz, getQuarryId(Entity.getYaw(Player.getEntity())), 0);
		}
	}
} void(useItem);

function newLevel() {
	if(!_MAP_DIR().exists()) {
		_MAP_DIR().mkdir();
	}
	if(!_MAP_QUARRY_DATA().exists()) {
		_MAP_QUARRY_DATA().createNewFile();
	}else {
		QuarryData = JSON.parse(loadData(_MAP_QUARRY_DATA(), "MAIN"));
		if(QuarryData === null) {
			QuarryData = [];
		}
	}
	if(!asynchronousModTick.isAlive()) {
		running = true;
		asynchronousModTick.start()
	}
	Quarry.forceSetRot();
}

function leaveGame() {
	if(asynchronousModTick.isAlive()) {
		running = false;
		//asynchronousModTick.stop()
	}
	saveData(_MAP_QUARRY_DATA(), "MAIN", JSON.stringify(QuarryData));
	QuarryData = [];
} void(leaveGame);

function modTick() {
	if(!asynchronous) {
		mainQuarryActivity();
	}
} void(modTick);

var asynchronousModTick = new java.lang.Thread(new java.lang.Runnable({run: function() {try { while(running) {
	if(asynchronous) {
		mainQuarryActivity();
	}
	java.lang.Thread.sleep(50);
}}catch(e) {
	clientMessage("[asynchronousModTick Crash" + e.lineNumber + "] " + e);
	running = false;
}}}));

//====================
//Quarry progress Manager
//====================
function mainQuarryActivity() {
	//for(var q = 0; q < QuarryData.length; q++) {
	for(var q in QuarryData) {
		//for(var e = 0; e < QuarryData[q][4][1].length; e++) {
		for(var e in QuarryData[q][4][1]) {
			if(Entity.getEntityTypeId(QuarryData[q][4][1][e]) < 1) {
				debug(e + " null ent " + Entity.getEntityTypeId(QuarryData[q][4][1][e]));
				Quarry.craneRebuild(q);
			}
		}
		switch(QuarryData[q][1][0]) {
			case "IDLE":
				break;
			default:
				for(var e = 0; e < QuarryData[q][4][1].length; e++) {
					Entity.setVelX(QuarryData[q][4][1][e], 0);
					Entity.setVelY(QuarryData[q][4][1][e], 0);
					Entity.setVelZ(QuarryData[q][4][1][e], 0);
					Entity.setPosition(QuarryData[q][4][1][e], QuarryData[q][5][e][0], QuarryData[q][5][e][1], QuarryData[q][5][e][2]);
				}
		}
	}
}

Quarry.craneRebuild = function(q) {try {
	debug("Quarry.craneRebuild");
	for(var f = 0; f < 2; f++) {
		for(var e = 0; e < QuarryData[q][4][f].length; e++) {
			debug("remove crane " + QuarryData[q][4][f][e]);
			Entity.remove(QuarryData[q][4][f][e]);
		}
	}
	Quarry.createNewCrainEnt(q);
}catch(e) {
	clientMessage("[craneRebuild Crash" + e.lineNumber + "] " + e);
}};

Quarry.createNewCrainEnt = function(q) {
	debug("Quarry.createNewCrainEnt" + q);
	var DRm = Level.spawnMob(QuarryData[q][2][0] + 1, QuarryData[q][3][1] - 1, QuarryData[q][2][2] + 1, 81, "mobs/char.png");
	var DR = Level.spawnMob(QuarryData[q][2][0] + 1, QuarryData[q][3][1] - 1, QuarryData[q][2][2] + 1, 11, "mobs/quarry_drill.png");
	Entity.setCollisionSize(DR, 0, 0);
	Entity.setCollisionSize(DRm, 0, 0);
	craneRenderType(rendererDrill, 1);
	Entity.setRenderType(DR, rendererDrill.renderType);
	Entity.setRot(DR, 0, 0);
	Entity.rideAnimal(DR, DRm);
	var CNm = Level.spawnMob(QuarryData[q][2][0] + 1, QuarryData[q][3][1], QuarryData[q][2][2] + 1, 81, "mobs/char.png");
	var CN = Level.spawnMob(QuarryData[q][2][0] + 1, QuarryData[q][3][1], QuarryData[q][2][2] + 1, 11, "mobs/quarry_crane.png");
	Entity.setCollisionSize(CN, 0, 0);
	Entity.setCollisionSize(CNm, 0, 0);
	craneRenderType(rendererCrane, 1);
	Entity.setRenderType(CN, rendererCrane.renderType);
	Entity.setRot(CN, 0, 0);
	Entity.rideAnimal(CN, CNm);
	var HXm = Level.spawnMob(QuarryData[q][2][0], QuarryData[q][3][1], QuarryData[q][2][2] + 1, 81, "mobs/char.png");
	var HX = Level.spawnMob(QuarryData[q][2][0], QuarryData[q][3][1], QuarryData[q][2][2] + 1, 11, "mobs/quarry_crane.png");
	Entity.setCollisionSize(HX, 0, 0);
	Entity.setCollisionSize(HXm, 0, 0);
	craneRenderType(rendererCrane, QuarryData[q][3][0] - QuarryData[q][2][0]);
	Entity.setRenderType(HX, rendererCrane.renderType);
	Entity.setRot(HX, 0, 0);
	Entity.rideAnimal(HX, HXm);
	var HZm = Level.spawnMob(QuarryData[q][2][0] + 1, QuarryData[q][3][1], QuarryData[q][2][2], 81, "mobs/char.png");
	var HZ = Level.spawnMob(QuarryData[q][2][0] + 1, QuarryData[q][3][1], QuarryData[q][2][2], 11, "mobs/quarry_crane.png");
	Entity.setCollisionSize(HZ, 0, 0);
	Entity.setCollisionSize(HZm, 0, 0);
	craneRenderType(rendererCrane, QuarryData[q][3][2] - QuarryData[q][2][2]);
	Entity.setRenderType(HZ, rendererCrane.renderType);
	Entity.setRot(HZ, 90, 0);
	Entity.rideAnimal(HZ, HZm);
	QuarryData[q][4][0] = [DR, CN, HX, HZ];
	QuarryData[q][4][1] = [DRm, CNm, HXm, HZm];
	QuarryData[q][5] = [[QuarryData[q][2][0] + 1, QuarryData[q][3][1] - 1, QuarryData[q][2][2] + 1], [QuarryData[q][2][0] + 1, QuarryData[q][3][1], QuarryData[q][2][2] + 1], [QuarryData[q][2][0], QuarryData[q][3][1], QuarryData[q][2][2] + 1], [QuarryData[q][2][0] + 1, QuarryData[q][3][1], QuarryData[q][2][2]]];
	debug(QuarryData[q][4]);
}

Quarry.forceSetRot = function() {new java.lang.Thread(new java.lang.Runnable( {run: function() {try { while(running) {
	for(var q = 0; q < QuarryData.length; q++) {
		for(var e = 0; e < QuarryData[q][4][0].length; e++) {
			Entity.setRot(QuarryData[q][4][0][e], 0, 0);
		}
	}
	java.lang.Thread.sleep(1);
}}catch(e) {
	clientMessage(e.lineNumber + " " + e);
}}})).start};

//====================
//Sub data management
//====================
function scriptPreLoad() {
	if(!_MAIN_DIR.exists()) {
		_MAIN_DIR.mkdirs();
		_NO_MEDIA.createNewFile();
	}
	if(_BLOCK.exists()) {
		setTexture(_BLOCK, "terrain-atlas.tga");
	}else {
		if(downloadFile(_BLOCK, _BLOCK_URL)) {
			setTexture(_BLOCK, "terrain-atlas.tga");
		}else {
            toasts("Error, please check internet connection");
		}
	}
	if(_DRILL.exists()) {
		setTexture(_DRILL, "mobs/quarry_drill.png");
	}else {
		if(downloadFile(_DRILL, _DRILL_URL)) {
			setTexture(_DRILL, "mobs/quarry_drill.png");
		}else {
            toasts("Error, please check internet connection");
		}
	}
	if(_CRANE.exists()) {
		setTexture(_CRANE, "mobs/quarry_crane.png");
	}else {
		if(downloadFile(_CRANE, _CRANE_URL)) {
			setTexture(_CRANE, "mobs/quarry_crane.png");
		}else {
            toasts("Error, please check internet connection");
		}
	}
}

function setTexture(prototypeFile, innerPath){
	try{
		var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/net.zhuoweizhang.mcpelauncher.pro/files/textures/images/" + innerPath);
		dir.getParentFile().mkdirs(); 
		var bis = new java.io.BufferedInputStream(new java.io.FileInputStream(prototypeFile));
		var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
		var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var count;
		while((count = bis.read(buffer)) >= 0){
			bos.write(buffer, 0, count);
		}
		bis.close();
		bos.close();
	}catch(e){
        toasts(prototypeFile.getAbsolutePath() + " 리소스파일이 없습니다");
	}
}

function downloadFile(path, url) {
	try{
		var tempApiUrl = new java.net.URL(url);
		var tempApiUrlConn = tempApiUrl.openConnection();
		tempApiUrlConn.connect();

		var tempBis = new java.io.BufferedInputStream(tempApiUrl.openStream());
		var tempFos = new java.io.FileOutputStream(path);
		var tempData = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var tempTotal = 0, tempCount;
		while ((tempCount = tempBis.read(tempData)) != -1) {
			tempTotal += tempCount;
			tempFos.write(tempData, 0, tempCount);
		}
		tempFos.flush();
		tempFos.close();
		tempBis.close();
		return true;
	}catch(e){
		debug(e.lineNumber + " " + e);
		return false;
	}
}

function debug(str) {
	if(debugging) {
		/**if(Level.getWorldName() === null) {
			 ctx.runOnUiThread(new java.lang.Runnable({ run: function(){
		android.widget.Toast.makeText(ctx, "[Debug]\n" + str, android.widget.Toast.LENGTH_LONG).show();
			}}));
		}else {
			clientMessage("[debug] " + str);
		}*/
		addText(str);
	}
}

function saveData(file, article, value) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(file);
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;
	var tempSaved = "";
	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//지금 새로 저장할 데이터는 읽지 않기
		if(tempReadString.split("¶")[0] == article)
			continue;
		tempSaved += tempReadString + "\n";
	}
	//읽어오기 완료
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//쓰기
	var fileOutputStream = new java.io.FileOutputStream(file);
	var outputStreamWriter = new java.io.OutputStreamWriter(fileOutputStream);
	outputStreamWriter.write(tempSaved + article + "¶" + value);
	//쓰기 완료
	outputStreamWriter.close();
	fileOutputStream.close();
}

function loadData(file, article) {
	//읽기
	var fileInputStream = new java.io.FileInputStream(file);
	var inputStreamReader = new java.io.InputStreamReader(fileInputStream);
	var bufferedReader = new java.io.BufferedReader(inputStreamReader);
	var tempRead, tempReadString;

	while((tempRead = bufferedReader.readLine()) != null){
		tempReadString = tempRead.toString();
		//불러올 데이터 찾기
		if(tempReadString.split("¶")[0] == article){
			//찾았으면 끝내고 반환
			fileInputStream.close();
			inputStreamReader.close();
			bufferedReader.close();
			return tempReadString.split("¶")[1];
		}
	}
	//못 찾음
	fileInputStream.close();
	inputStreamReader.close();
	bufferedReader.close();
	//없으면 반환
	return null;
}

function toast(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_LONG).show();
			}catch(e) {}
		}
	}
	));
} void(toast);

function toasts(str) {
	ctx.runOnUiThread(new java.lang.Runnable( {
		run: function(){
			try{
				android.widget.Toast.makeText(ctx, str, android.widget.Toast.LENGTH_SHORT).show();
			}catch(e) {}
		}
	}
	));
}

//====================
//Models
//====================
function drillRenderType(renderer, length) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(32, 0, false);
	body.addBox(-2,0,-2,4,16,4);
	body.setTextureOffset(0, 0, true);
	for(var e = length; e > 0; e--) {
		body.addBox(-4,e*(-16),-4,8,16,8);
	}
} void(drillRenderType);

function craneRenderType(renderer, length) {
	var model=renderer.getModel();
	var head=model.getPart("head").clear();
	var body=model.getPart("body").clear();
	var rightArm=model.getPart("rightArm").clear();
	var leftArm=model.getPart("leftArm").clear();
	var rightLeg=model.getPart("rightLeg").clear();
	var leftLeg=model.getPart("leftLeg").clear();
	body.setTextureOffset(0, 0, true);
	for(var e = length; e > 0; e--) {
		body.addBox(-e*16,-4,-4,16,8,8);
	}
}

//====================
//test dump
//====================
/**
var px, py, pz, et;
function attackHook(at, victim) {
	craneRenderType(rendererCrane, 10);
	Entity.setMobSkin(victim, "mobs/quarry_crane.png");
	//Entity.setRenderType(victim, rendererCrane.renderType);
	px = Entity.getX(victim);
	py = Entity.getY(victim);
	pz = Entity.getZ(victim);
	et = victim;
	var sc = Level.spawnMob(px, py, pz, 81, "mobs/char.png");
	Entity.rideAnimal(et, sc);
	new java.lang.Thread(new java.lang.Runnable({run: function() { while(Entity.getHealth(et) > 0) {
		Entity.setVelX(sc, 0);
		Entity.setVelY(sc, 0);
		Entity.setVelZ(sc, 0);
		Entity.setPosition(sc, px, py, pz);
		//Entity.setRot(et, 0,0);
		java.lang.Thread.sleep(1);
	}}})).start();
}
*/

/**
function modTick() {
	for(var e in QuarryData) {
		 if(Entity.getEntityTypeId(QuarryData[e][10]) < 1 || Entity.getEntityTypeId(QuarryData[e][11]) < 1 || Entity.getEntityTypeId(QuarryData[e][12]) < 1 || Entity.getEntityTypeId(QuarryData[e][13]) < 1 || Entity.getEntityTypeId(QuarryData[e][14]) < 1 || Entity.getEntityTypeId(QuarryData[e][15]) < 1) {
		 	QuarryData.splice(e, 1);
		}else {
			if(Math.hypot(QuarryData[e][16] - Entity.getX(QuarryData[e][11]), QuarryData[e][17] - Entity.getX(QuarryData[e][13]), QuarryData[e][18] - Entity.getX(QuarryData[e][15])) > 0.1) {
				Entity.setVelX();
				Entity.setVelY();
				Entity.setVelZ();
			}
		}
	}
}
*/

/**
QuarryData.MainBlock = {};
QuarryData.MainBlock.DataArray = {};
QuarryData.Mod = {};
QuarryData.StartPos = {};
QuarryData.EndPos = {};
QuarryData.Drill = {};
QuarryData.CraneCenter = {};
QuarryData.CraneX = {};
QuarryData.CraneZ = {};
QuarryData.Target = {};
*/

function procCmd(str) {
	debug(str);
	var cmd = str.split(" ");
	if(cmd[0] === "qd") {
		debug("add");
		QuarryData.push([[], [], [Player.getX()-4, Player.getY()-2, Player.getZ()+1], [Player.getX()+4, Player.getY()+3, Player.getZ()+10], [[-1], [-1]], []]);
	}
	if(cmd[0] === "qd2") {
		Quarry.craneRebuild(0);
	}
	if(cmd[0] === "qd3") {
		debug(Entity.getEntityTypeId(-1));
	}
}

//====================
//Debug function
//====================

var windowText,layoutText,scrollText;
var texts = [];
var maxText = 16;

if(debugging) createTextView();

function dp(dips) {
	return parseInt(dips * ctx.getResources().getDisplayMetrics().density + 0.5);
}

function createTextView() {ctx.runOnUiThread(new java.lang.Runnable({ run: function(){ try{
	scrollText = new android.widget.ScrollView(ctx);
	scrollText.fullScroll(130);
	layoutText = new android.widget.LinearLayout(ctx);
	layoutText.setOrientation(android.widget.LinearLayout.VERTICAL);
	layoutText.setGravity(android.view.Gravity.BOTTOM);
	scrollText.addView(layoutText);
	windowText = new android.widget.PopupWindow(scrollText, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight() ,false);
	windowText.setTouchable(false);
	windowText.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT, 0, 0);
}catch(e) {
    toasts(e.lineNumber);
}}}))}


function addText(text, color) {ctx.runOnUiThread(new java.lang.Runnable({ run: function(){ try{
	if(texts.length >= maxText) {
		layoutText.removeView(texts.shift());
	}
	texts.push(new android.widget.Button(ctx));
	texts[texts.length-1].setBackgroundColor(android.graphics.Color.argb(50,0,0,0));
	texts[texts.length-1].setPadding(dp(1), 0, dp(1), 0);
	texts[texts.length-1].setGravity(android.view.Gravity.LEFT | android.view.Gravity.TOP);
	texts[texts.length-1].setTextSize(android.util.TypedValue.COMPLEX_UNIT_DIP, 10);
	texts[texts.length-1].setText(text + "");
	if(color != null) {
		texts[texts.length-1].setTextColor(color)
	}
	 layoutText.addView(texts[texts.length-1], android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dp(13));
}catch(e) {
    toasts(e.lineNumber);
}}}))}