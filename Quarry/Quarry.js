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
Object.freeze(Tile);

/**
 * @since 2015-04-04
 * @author Choseul <chocoslime05@naver.com>
 */
function useItem(x, y, z, itemId, blockId, side, itemDamage, blockDamage){
	for(y = 127; y >= 0; y--){
        var tile = Level.getTile(x, y, z);
        var data = Level.getData(x, y, z);

		if(tile !== Tile.AIR && tile !== Tile.BEDROCK){
			Player.addItemInventory(tile, 1, data);
			Level.destroyBlock(x, y, z, false);
		}
	}
}
void(useItem);