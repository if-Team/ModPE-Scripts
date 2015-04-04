/*
 * Copyright 2015 Choseul
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

var Tile = {
    AIR: 0,
    BEDROCK: 7
};
/**
 * @since 2015-04-04
 * @author Choseul <chocoslime05@naver.com>
 */

var QuarryData = [];
입력방법 : push([mainX, mainY, mainZ, state, startX, startY, startZ, endX, endY, endZ, crainX, crainZ, crainC, drill, drillX, drillY, drillZ]);
/**
메인블럭 위치
QuarryData.X = new Array();
QuarryData.Y = new Array();
QuarryData.Z = new Array();
시작점
QuarryData.sX = new Array();
QuarryData.sY = new Array();
QuarryData.sZ = new Array();
끝점
QuarryData.eX = new Array();
QuarryData.eY = new Array();
QuarryData.eZ = new Array();
메인블럭 정보
QuarryData.fuel = new Array();
QuarryData.status = new Array();
QuarryData.slot = new Array();
수평 X축 크래인 위치
QuarryData.HX = new Array();
QuarryData.HXX = new Array();
QuarryData.HXY = new Array();
QuarryData.HXZ = new Array();
수평 X축 크래인 속도
QuarryData.HXvelX = new Array();
QuarryData.HXvelY = new Array();
QuarryData.HXvelZ = new Array();
수평 Z축 크래인 위치
QuarryData.HZ = new Array();
QuarryData.HZX = new Array();
QuarryData.HZY = new Array();
QuarryData.HZZ = new Array();
수평 Z축 크래인 속도
QuarryData.HZvelX = new Array();
QuarryData.HZvelY = new Array();
QuarryData.HZvelZ = new Array();
수평 크래인 연결부위
QuarryData.C = new Array();
QuarryData.CX = new Array();
QuarryData.CY = new Array();
QuarryData.CZ = new Array();
드릴 위치
QuarryData.D = new Array();
QuarryData.DX = new Array();
QuarryData.DY = new Array();
QuarryData.DZ = new Array();
드릴 속도
QuarryData.DvelX = new Array();
QuarryData.DvelY = new Array();
QuarryData.DvelZ = new Array();
*/

Block.defineBlock(200, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_bottom",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(201, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_bottom",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(202, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_bottom",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(203, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_bottom",0]], 0, true, 0);
Block.defineBlock(204, "Frame", [ ["cauldron_inner",0],["cauldron_inner",0],["cauldron_inner",0],["cauldron_inner",0], ["cauldron_inner",0],["cauldron_inner",0]], 0, false, 0);
Block.setRenderLayer(204,3);
Block.setLightOpacity(204, 1);
Player.addItemCreativeInv(201, 5, 0);
Player.addItemCreativeInv(204, 5, 0);

function viewSide(yaw) {
	var temp = yaw;
	while(temp >= 360)
		temp -= 360;
	while(temp < 0)
		temp += 360;
	if((temp >= 0 && temp < 45) || (temp >= 315 && temp < 360))
		return 200;//"북(Z+)";
	else if(temp >= 45 && temp < 135)
		return 203;//"동(-X)";
	else if(temp >= 135 && temp < 225)
		return 201;//"남(Z-)";
	else if(temp >= 225 && temp < 315)
		return 202;//"서(X+)";
	else
		return "NaY";
}

function useItem(x, y, z, itemId, blockId, side, itemDamage, blockDamage){
	for(y = 127; y >= 0; y--){
        var tile = Level.getTile(x, y, z);
        var data = Level.getData(x, y, z);
		if(tile !== Tile.AIR && tile !== Tile.BEDROCK){
			Player.addItemInventory(tile, 1, data);
			Level.destroyBlock(x, y, z, false);
		}
	}
	if(itemId === 201) {
		preventDefault();
		clientMessage(viewSide(Entity.getYaw(Player.getEntity())));
		var tx = x;
		var ty = y;
		var tz = z;
		switch(side) {
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
			Level.setTile(tx, ty, tz, viewSide(Entity.getYaw(Player.getEntity())), 0);
		}
	}
}

function setSkin(skinFile, skinName){
	try{
		var dir = new java.io.File(android.os.Environment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/net.zhuoweizhang.mcpelauncher.pro/files/textures/images/mobs/" + skinName + ".png");
		dir.getParentFile().mkdirs(); 
		bis = new java.io.BufferedInputStream(new java.io.FileInputStream(skinFile));
		var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(dir));
		var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
		var count = 0;
		while((count = bis.read(buffer)) >= 0){
			bos.write(buffer, 0, count);
		}
		bis.close();
		bos.close();
	}catch(e){
		print(skinName + " 스킨파일이 없습니다");
	}
};