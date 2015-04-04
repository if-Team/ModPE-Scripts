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

Block.defineBlock(200, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_bottom",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(201, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_bottom",0], ["cauldron_side",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(202, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_bottom",0],["cauldron_side",0]], 0, true, 0);
Block.defineBlock(203, "Quarry", [ ["cauldron_side",0],["cauldron_top",0],["cauldron_side",0],["cauldron_side",0], ["cauldron_side",0],["cauldron_bottom",0]], 0, true, 0);
Block.defineBlock(204, "Frame", [ ["cauldron_inner",0],["cauldron_inner",0],["cauldron_inner",0],["cauldron_inner",0], ["cauldron_inner",0],["cauldron_inner",0]], 0, false, 0);
Block.setRenderLayer(204,3);
Block.setLightOpacity(204, 1);
Player.addItemCreativeInv(201, 5, 0);
Player.addItemCreativeInv(204, 5, 0);

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
	if(itemId == 267){
        new java.lang.Thread({
            run: function(){
                for(y = 127; y > 0; y--){
                    var tile = Level.getTile(x, y, z);
                    var data = Level.getData(x, y, z);

                    Player.addItemInventory(tile, 1, data);
                    Level.destroyBlock(x, y, z, false);
                    java.lang.Thread.sleep(2 * 1000);

                }
            }
        }).start();
    }else if(itemId === 201){
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
}