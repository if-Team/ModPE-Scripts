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

/**
 * Create a maze
 * @param {number} width
 * @param {number} height
 * @returns {number[][]} The maze
 * @see https://github.com/dstromberg2/maze-generator
 * @license None
 */
function createMaze(width, height){
    var totalCells = width * height;
    var cells = [];
    var unvis = [];
    for(var i = 0; i < height; i++){
        cells[i] = [];
        unvis[i] = [];
        for(var j = 0; j < width; j++){
            cells[i][j] = [0, 0, 0, 0];
            unvis[i][j] = true;
        }
    }

    var currentCell = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
    var path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;

    while(visited < totalCells){
        var pot = [[currentCell[0] - 1, currentCell[1]    , 0, 2],
                   [currentCell[0]    , currentCell[1] + 1, 1, 3],
                   [currentCell[0] + 1, currentCell[1]    , 2, 0],
                   [currentCell[0]    , currentCell[1] - 1, 3, 1]];
        var neighbors = [];

        for(var l = 0; l < 4; l++){
            if(pot[l][0] > -1 && pot[l][0] < height && pot[l][1] > -1 && pot[l][1] < width && unvis[pot[l][0]][pot[l][1]]){
                neighbors.push(pot[l]);
            }
        }

        if(neighbors.length){
            var next = neighbors[Math.floor(Math.random() * neighbors.length)];

            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;

            unvis[next[0]][next[1]] = false;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
            visited++;
        }else{
            currentCell = path.pop();
        }
    }
    return cells;
}
/**
 * Build a maze in the minecraft world!
 * @param {number[][]} maze - The maze
 * @param {number} startX
 * @param {number} startY
 * @param {number} startZ
 * @param {number} [blockId = 42]
 * @param {number} [blockDamage = 0]
 * @param {number} [blockHeight = 3] - The height of maze
 */
function buildMaze(maze, startX, startY, startZ, blockId, blockDamage, blockHeight){
    blockId = blockId || 42;
    blockDamage = blockDamage || 0;
    blockHeight = blockHeight || 3;

    for(var i = 0; i < maze.length; i++){
        for(var j = 0; j < maze[i].length; j++){
            var cell = maze[i][j];

            var x = startX + i * 2;
            var z = startZ + j * 2;
            for(var k = 0; k < blockHeight; k++){
                var y = startY + k;
                if(cell[0] === 0){ //top
                    Level.setTile(x - 1, y, z - 1, blockId, blockDamage);
                    Level.setTile(x    , y, z - 1, blockId, blockDamage);
                    Level.setTile(x + 1, y, z - 1, blockId, blockDamage);
                }
                if(cell[1] === 0){ //right
                    Level.setTile(x + 1, y, z - 1, blockId, blockDamage);
                    Level.setTile(x + 1, y, z    , blockId, blockDamage);
                    Level.setTile(x + 1, y, z + 1, blockId, blockDamage);
                }
                if(cell[2] === 0){ //bottom
                    Level.setTile(x - 1, y, z + 1, blockId, blockDamage);
                    Level.setTile(x    , y, z + 1, blockId, blockDamage);
                    Level.setTile(x + 1, y, z + 1, blockId, blockDamage);
                }
                if(cell[3] === 0){ //left
                    Level.setTile(x - 1, y, z - 1, blockId, blockDamage);
                    Level.setTile(x - 1, y, z    , blockId, blockDamage);
                    Level.setTile(x - 1, y, z + 1, blockId, blockDamage);
                }
            }
        }
    }
}

const MESSAGE_USAGE = "Usage: /maze <width> <height> [blockId blockDamage blockHeight]";

/**
 * @callback selectLevelHook
 * @requires ModPE
 */
function selectLevelHook(){
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
        cmd = cmd.map(parseInt);
        if(cmd.some(isNaN)){
            clientMessage("Error: parameter must be a number!");
            clientMessage(MESSAGE_USAGE);
            return;
        }

        var maze = [[]];
        var startX = Math.floor(Player.getX());
        var startY = Math.floor(Player.getY()) - 1;
        var startZ = Math.floor(Player.getZ());

        var blockId = 0;
        var blockDamage = 0;
        var blockHeight = 0;

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
                maze = createMaze(cmd[0], cmd[1]);
                break;

            case 5:
                maze = createMaze(cmd[0], cmd[1]);

                blockId = cmd[2];
                blockDamage = cmd[3];
                blockHeight = cmd[4];
                break;
        }

        new java.lang.Thread({run: function(){
            buildMaze(maze, startX, startY, startZ, blockId, blockDamage, blockHeight);
            clientMessage("The maze has been created!")
        }}).start();
    }
}