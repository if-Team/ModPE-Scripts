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
 
Block.defineBlock(200, "Qurry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_bottom",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(201, "Qurry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_bottom",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(202, "Qurry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_bottom",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(203, "Qurry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_bottom",0]], 0, true, 0);
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
	if(itemId == 267){
		for(y = 127; y >= 0; y--){
			var tile = Level.getTile(x, y, z);
			var data = Level.getData(x, y, z);
			if(tile !== Tile.AIR && tile !== Tile.BEDROCK){
				Player.addItemInventory(tile, 1, data);
				Level.destroyBlock(x, y, z, false);
			}
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
