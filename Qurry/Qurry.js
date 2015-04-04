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



/**
 * @since 2015-04-04
 * @author Choseul <chocoslime05@naver.com> 
 */

function useItem(x, y, z, i, b, s, id, bd) {
	for(var gy = 127; gy >= 0; gy--) {
        var blockId = Level.getTile(x, gy, z);
        var blockData = Level.getData(x, gy, z);

		if(blockId !== 0 && blockId !== 7) {
			Player.addItemInventory(blockId, 1, blockData);
			Level.destroyBlock(x, gy, z, false);
		}
	}
}
