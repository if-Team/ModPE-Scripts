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
            td = ds[0];
            ds[0] = ds[1];
            ds[1] = td;
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

const MESSAGE_USAGE = "Usage: /maze <width> <height> [blockId blockDamage blockHeight] [TurnPercent]";

/**
 * @callback newLevel
 * @requires ModPE
 */
function newLevel(){
    clientMessage("© 2015 ChalkPE. All rights reserved.");
}

/**
 * @callback procCmd
 * @requires ModPE
 * @param {string} str - The command string
 */
function procCmd(str){
    var cmd = str.split(" ");
    if(cmd.shift() === "maze"){
        var params = cmd.map(function(param){
            return parseInt(param, 10);
        });

        if(params.some(isNaN)){
            clientMessage("Error: parameter must be a number!");
            clientMessage(MESSAGE_USAGE);
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

        switch(cmd.length){
            default:
            case 0:
            case 1:
                clientMessage(MESSAGE_USAGE);
                return;

            case 3:
            case 4:
                clientMessage("Error: invalid parameter!");
                clientMessage(MESSAGE_USAGE);
                return;

            case 2:
                width = params[0];
                height = params[1];
                break;

            case 5:
                width = params[0];
                height = params[1];

                blockId = params[2];
                blockDamage = params[3];
                blockHeight = params[4];
                break;
                
            case 6:
                width = params[0];
                height = params[1];

                blockId = params[2];
                blockDamage = params[3];
                blockHeight = params[4];
                
                turn = params[5] / 100;
                break;
        }

        new java.lang.Thread({run: function(){
            buildMaze(ProcGen.maze({
                w: width, h: height,
                turn: turn,
                branch: 1,
                reconnect: 0,
                deadEnd: 0
            }), startX, startY, startZ, blockId, blockDamage, blockHeight);
            clientMessage("The maze has been created!")
        }}).start();
    }
}