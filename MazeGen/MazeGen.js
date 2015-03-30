/*
 * Copyright 2015 ChalkPE
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

// Globals
var ProcGen = {};

ProcGen.dir = ['up', 'down', 'left', 'right'];
ProcGen.oDir = { up: 'down', down: 'up', left: 'right', right: 'left' };

ProcGen.rand = function(max) {
    return Math.floor(max * Math.random());
};

ProcGen.maze = function(params) {
    // Initialize grid
    var grid = {};
    grid.data = [];
    grid.params = params;

    var h = grid.params.h;
    var w = grid.params.w;
    grid.size = h * w;
    grid.full = 0;
    var x;
    var y;
    for(x = 0; x < w; x++) {
        grid.data[x] = [];
        for(y = 0; y < h; y++) {
            grid.data[x][y] = { visited: false, up: false, down: false, left: false, right: false };
        }
    }

    // Start at a random position.
    x = ProcGen.rand(w);
    y = ProcGen.rand(h);
    var direction = ProcGen.dir[ProcGen.rand(4)];

    ProcGen._maze(grid, x, y, direction);

    return grid;
};

ProcGen._maze = function(grid, x, y, direction) {
    var turn = grid.params.turn;
    var branch = grid.params.branch;
    var reconnect = grid.params.reconnect;
    var deadEnd = grid.params.deadEnd;

    grid.full++;

    grid.data[x][y].visited = true;
    var newDirection = direction;

    if(Math.random() < deadEnd) return;

    // First, figure out what direction we're going.
    // We randomly decide whether to turn or not.  If not, we continue
    // on in the direction we're given.  Otherwise, we turn left or right.
    if(Math.random() < turn) {
        if(direction == 'up' || direction == 'down') {
            newDirection = (Math.random() < 0.5) ? 'left' : 'right';
        } else if(direction == 'left' || direction == 'right') {
            newDirection = (Math.random() < 0.5) ? 'up' : 'down';
        }
    }

    var dx = 0;
    var dy = 0;

    if(newDirection == 'up') {
        dy = -1;
    } else if(newDirection == 'down') {
        dy = 1;
    } else if(newDirection == 'left') {
        dx = -1;
    } else if(newDirection == 'right') {
        dx = 1;
    }

    if(!ProcGen._maze_visited(grid, x + dx, y + dy)) {
        grid.data[x][y][newDirection] = true;
        grid.data[x+dx][y+dy][ProcGen.oDir[newDirection]] = true;
        ProcGen._maze(grid, x + dx, y + dy, newDirection);
    } else if (Math.random() < reconnect && ProcGen._maze_in_bounds(grid, x + dx, y + dy)) {
        grid.data[x][y][newDirection] = true;
        grid.data[x+dx][y+dy][ProcGen.oDir[newDirection]] = true;
    } else {
        // If the new direction is blocked, then we should try the two other directions as well.
        var ds = [];
        for(var a = 0; a < 4; a++) {
            if(ProcGen.dir[a] != newDirection && ProcGen.dir[a] != ProcGen.oDir[direction]) {
                ds.push(ProcGen.dir[a]);
            }
        }

        if(Math.random() < 0.5) {
            var temp = ds[0];
            ds[0] = ds[1];
            ds[1] = temp;
        }

        for(i = 0; i < 2; i++) {
            dx = 0;
            dy = 0;
            var nd = ds[i];
            if(nd == 'up') {
                dy = -1;
            } else if(nd == 'down') {
                dy = 1;
            } else if(nd == 'left') {
                dx = -1;
            } else if(nd == 'right') {
                dx = 1;
            }

            if(!ProcGen._maze_visited(grid, x + dx, y + dy)) {
                grid.data[x][y][nd] = true;
                grid.data[x+dx][y+dy][ProcGen.oDir[nd]] = true;
                ProcGen._maze(grid, x + dx, y + dy, nd);
            }
        }
    }

    // Now handle branching paths
    // It's simplest here just to try all four directions.  At least two will always
    // be blocked, but that's fine.
    for(var i = 0; i < 4; i++) {
        if(Math.random() < branch) {
            dx = 0;
            dy = 0;
            nd = ProcGen.dir[i];

            if(nd == 'up') {
                dy = -1;
            } else if(nd == 'down') {
                dy = 1;
            } else if(nd == 'left') {
                dx = -1;
            } else if(nd == 'right') {
                dx = 1;
            }

            if(!ProcGen._maze_visited(grid, x + dx, y + dy)) {
                grid.data[x][y][nd] = true;
                grid.data[x+dx][y+dy][ProcGen.oDir[nd]] = true;
                ProcGen._maze(grid, x + dx, y + dy, nd);
            }
        }
    }
};

ProcGen._maze_visited = function(grid, x, y) {
    if(!ProcGen._maze_in_bounds(grid, x, y)) {
        return true;
    }
    return grid.data[x][y].visited;
};

ProcGen._maze_in_bounds = function(grid, x, y) {
    return !(x < 0 || x >= grid.params.w || y < 0 || y >= grid.params.h);

};

/**
 * Build a maze in the minecraft world!
 * @param {object} grid - The maze
 * @param {number} startX
 * @param {number} startY
 * @param {number} startZ
 * @param {number} [blockId = 42]
 * @param {number} [blockDamage = 0]
 * @param {number} [blockHeight = 3] - The height of maze
 */
function buildMaze(grid, startX, startY, startZ, blockId, blockDamage, blockHeight){
    blockId = blockId || 42;
    blockDamage = blockDamage || 0;
    blockHeight = blockHeight || 3;

    for(var i = 0; i < grid.params.w; i++){
        for(var j = 0; j < grid.params.h; j++){
            var cell = grid.data[i][j];

            var x = startX + i * 2;
            var z = startZ + j * 2;

            for(var k = 0; k < blockHeight; k++){
                var y = startY + k;

                if(!cell.visited){
                    Level.setTile(x, startY - 1, z, blockId, blockDamage);
                }else if(!cell.up){
                    Level.setTile(x - 1, y, z - 1, blockId, blockDamage);
                    Level.setTile(x    , y, z - 1, blockId, blockDamage);
                    Level.setTile(x + 1, y, z - 1, blockId, blockDamage);
                }
                if(!cell.down){
                    Level.setTile(x - 1, y, z + 1, blockId, blockDamage);
                    Level.setTile(x    , y, z + 1, blockId, blockDamage);
                    Level.setTile(x + 1, y, z + 1, blockId, blockDamage);
                }
                if((i !== 0 || j !== 0) && (i !== grid.params.w - 1 || j !== grid.params.h - 1)){
                    if(!cell.left){
                        Level.setTile(x - 1, y, z - 1, blockId, blockDamage);
                        Level.setTile(x - 1, y, z    , blockId, blockDamage);
                        Level.setTile(x - 1, y, z + 1, blockId, blockDamage);
                    }
                    if(!cell.right){
                        Level.setTile(x + 1, y, z - 1, blockId, blockDamage);
                        Level.setTile(x + 1, y, z    , blockId, blockDamage);
                        Level.setTile(x + 1, y, z + 1, blockId, blockDamage);
                    }
                }
            }
        }
    }
}

/**
 * Wrapper class for resource
 * @param {object} [values]
 * @param {string} [defaultLocale]
 * @constructor
 */
function Resource(values, defaultLocale){
    this.values = values || {};
    this.defaultLocale = defaultLocale || Resource.CURRENT_LAUNGUAGE;
}

Resource.CURRENT_LAUNGUAGE = java.util.Locale.getDefault().getLanguage() + "";
Resource.DEFAULT_LANGUAGE = "en";

Resource.prototype = {
    toString: function(lang){
        var value = this.values[lang || this.defaultLocale] || this.values[Resource.DEFAULT_LANGUAGE];
        return value.toString();
    }
};

var R = {
    string: {
        script_name: new Resource({
            en: "MazeGen"
        }),
        copyright: new Resource({
            en: "© 2015 ChalkPE. All rights reserved."
        }),

        message_usage: new Resource({
            en: "Usage: /maze <width> <height> [blockId=42 blockDamage=0 blockHeight=3] [turnRate=50 reconnectionRate=0]",
            ko: "사용법: /maze <가로> <세로> [블럭ID=42 블럭데미지=0 블럭높이=3] [회전율=50 재연결률=0]",
            ja: "使用法: /maze <幅> <高さ> [ブロックID=42 ブロックデータ=0 ブロックの高さ=3] [回転率=50 再連結率=0]"
        }),
        message_created: new Resource({
            en: "The maze has been created!",
            ko: "미로가 생성되었습니다!",
            ja: "迷路が作成されました！"
        }),

        error_not_a_number: new Resource({
            en: "Error: parameter must be a integer!",
            ko: "오류: 인자는 정수여야 합니다!",
            ja: "エラー： パラメータは、整数である必要があります！"
        }),
        error_negative_number: new Resource({
            en: "Error: parameter must be a positive integer!",
            ko: "오류: 인자는 양의 정수여야 합니다!",
            ja: "エラー： パラメータは、正の整数である必要があります！"
        }),
        error_out_of_bounds: new Resource({
            en: "Error: One or more parameters are out of bound!",
            ko: "오류: 한 개 이상의 인자가 범위를 벗어났습니다!",
            ja: "エラー： 一つ以上のパラメータが範囲外です！"
        }),
        error_too_small: new Resource({
            en: "Error: The size of the maze is too small!",
            ko: "오류: 미로 크기가 너무 작습니다!",
            ja: "エラー： 迷路の大きが小さすぎます！"
        }),

        info_size: new Resource({
            en: "the size of the maze: %s * %s",
            ko: "미로 크기: %s * %s",
            ja: "迷路の大き: %s * %s"
        }),
        info_block: new Resource({
            en: "block: %s:%s, block height: %s",
            ko: "블럭: %s:%s, 블럭 높이: %s",
            ja: "ブロック: %s:%s, ブロックの高さ: %s"
        }),
        info_percent: new Resource({
            en: "turn: %s%%, reconnect: %s%%",
            ko: "회전율: %s%%, 재연결률: %s%%",
            ja: "回転率: %s%%, 再連結率: %s%%"
        })
    }
};

/**
 * Print a string
 * @param {string} str
 * @param {object[]} [args]
 */
function printLine(str, args){
    clientMessage("[" + R.string.script_name + "] " + (Array.isArray(args) ? java.lang.String.format(new java.lang.String(str), args) + "" : str));
}

/**
 * Returns number is negative
 * @param {number} num
 * @returns {boolean}
 */
function isNegative(num){
    return num < 0;
}

/**
 * @callback newLevel
 * @requires ModPE
 */
function newLevel(){
    clientMessage(R.string.copyright);
}

/**
 * @callback procCmd
 * @requires ModPE
 * @param {string} str - The command string
 */
function procCmd(str){
    var cmd = str.split(" ");
    if(cmd.shift().toLowerCase() === "maze"){
        var params = cmd.map(function(param){
            return parseInt(param, 10);
        });

        if(params.some(isNaN) || !params.every(isFinite)){
            printLine(R.string.error_not_a_number);
            return;
        }

        if(params.some(isNegative)){
            printLine(R.string.error_negative_number);
            return;
        }

        var width = 0;
        var height = 0;

        var startX = Math.floor(Player.getX());
        var startY = Math.floor(Player.getY()) - 1;
        var startZ = Math.floor(Player.getZ());

        var blockId = 0;
        var blockDamage = 0;
        var blockHeight = 0;

        var turn = 0.5;
        var reconnect = 0;

        if(cmd.length >= 2){
            var mapWidth = params[0];
            var mapHeight = params[1];

            if(mapWidth < 7 || mapHeight < 7){
                printLine(R.string.error_too_small);
                return;
            }

            width = Math.floor(mapWidth / 2) + (mapWidth % 2) - 1;
            height = Math.floor(mapHeight / 2) + (mapHeight % 2) - 1;

            printLine(R.string.info_size, [mapWidth, mapHeight]);

            if(cmd.length >= 5){
                blockId = params[2];
                blockDamage = params[3];
                blockHeight = params[4];

                if(blockId >= 256 || blockHeight >= 128){
                    printLine(R.string.error_out_of_bounds);
                    return;
                }

                printLine(R.string.info_block, [blockId, blockDamage, blockHeight]);

                if(cmd.length >= 7){
                    turn = params[5];
                    reconnect = params[6];

                    if(turn > 100){
                        turn = 100;
                    }
                    if(reconnect > 100){
                        reconnect = 100;
                    }

                    printLine(R.string.info_percent, [turn, reconnect]);
                }
            }

            new java.lang.Thread({run: function(){
                buildMaze(ProcGen.maze({
                    w: width, h: height,
                    turn: turn / 100,
                    reconnect: reconnect / 100,
                    branch: 1,
                    deadEnd: 0
                }), startX, startY, startZ, blockId, blockDamage, blockHeight);

                printLine(R.string.message_created);
            }}).start();
        }else{
            printLine(R.string.message_usage);
        }
    }
}

void(newLevel); void(procCmd);