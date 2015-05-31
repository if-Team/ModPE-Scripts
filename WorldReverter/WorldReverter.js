/*
 * Copyright 2015 Hanarin
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
 * @type {android.content.Context}
 */
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

/**
 * @type {BlockHistory[]}
 */
var stack = [];

/**
 * @param {BlockHistory.Type} type
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} blockId
 * @param {number} blockData
 * @constructor
 */
function BlockHistory(type, x, y, z, blockId, blockData) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.z = z;
    this.blockId = blockId;
    this.blockData = blockData;
}

/**
 * @type {{PLACE: string, BREAK: string}}
 * @typedef {string} BlockHistory.Type
 */
BlockHistory.Type = {
    PLACE: "PLACE", BREAK: "BREAK"
};

BlockHistory.prototype = {
    toString: function() {
        return "{type: " + this.type + ", location: [" + this.x + ", " + this.y + ", " + this.z + "], block: " + this.blockId + ":" + this.blockData + "}";
    },

    revert: function() {
        //TODO: Implement this method
    }
};

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} itemId
 * @param {number} blockId
 * @param {number} side
 * @param {number} itemData
 * @param {number} blockData
 */
function useItem(x, y, z, itemId, blockId, side, itemData, blockData) {
    if(itemId >= 256){
        return;
    }

    switch(side) {
        case 0:
            y--;
            break;

        case 1:
            y++;
            break;

        case 2:
            z--;
            break;

        case 3:
            z++;
            break;

        case 4:
            x--;
            break;

        case 5:
            x++;
            break;

        default:
            clientMessage(ChatColor.RED + "[ERROR] unknown side!");
            break;
    }

    onBlockPlace(x, y, z, itemId, itemData);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} side
 */
function destroyBlock(x, y, z, side) {
    var blockId = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetTile(x, y, z);
    var blockData = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetData(x, y, z);

    onBlockBreak(x, y, z, blockId, blockData);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} blockId
 * @param {number} blockData
 */
function onBlockPlace(x, y, z, blockId, blockData) {
    stack.push(new BlockHistory(BlockHistory.Type.PLACE, x, y, z, blockId, blockData));
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} blockId
 * @param {number} blockData
 */
function onBlockBreak(x, y, z, blockId, blockData) {
    stack.push(new BlockHistory(BlockHistory.Type.BREAK, x, y, z, blockId, blockData));
}

void(useItem); void(destroyBlock);
