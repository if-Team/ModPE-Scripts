/*
 * Copyright 2015 if(Team);
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
 * @since 2015-02-24
 * @author ChalkPE <amato17@naver.com> 
 */
var Pool = {};
Pool.VERSION = "0.1";

//Pool.SubPackage.someMethod
//Pool.Constructor

Pool.Vector3 = function(x, y, z){
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.z = Math.floor(z);
};

Pool.Vector3.prototype = {};
Pool.Vector3.prototype.equals = function(x, y, z){
	if(x instanceof Pool.Vector3 && arguments.length === 1){
		return x.x === this.x && x.y === this.y && x.z === this.z
	}
	return Math.floor(x) === this.x && Math.floor(y) === this.y && Math.floor(z) === this.z;
};
Pool.Vector3.prototype.toString = function(){
	return "[" + [this.x, this.y, this.z].join(", ") + "]";
}
Pool.Vector3.prototype.set = function(x, y, z){
	if(typeof x === "number"){
		this.x = Math.floor(x);
	}
	if(typeof y === "number"){
		this.y = Math.floor(y);
	}
	if(typeof z === "number"){
		this.z = Math.floor(z);
	}
};


Pool.Canvas = {};

/**
 * @param begin {Pool.Vector3} 시작점의 위치
 * @param end {Pool.Vector3} 종료점의 위치
 * @param blockId {int} 선을 이룰 블럭의 ID 값
 * @param blockDamage {int} 선을 이룰 블럭의 데미지 값
 * @see Bresenham's line algorithm
 */
Pool.Canvas.drawLine = function(begin, end, blockId, blockDamage){
	if(begin.equals(end)){ //Point
		Level.setTile(begin.x, begin.y, begin.z, blockId, blockDamage);
	}else if(begin.x === end.x){
		Pool.Canvas.drawLine2D(begin.y, begin.z, end.y, end.z, begin.x, blockId, blockDamage);
	}else if(begin.y === end.y){
		Pool.Canvas.drawLine2D(begin.x, begin.z, end.x, end.z, begin.y, blockId, blockDamage);
	}else if(begin.z === end.z){
		Pool.Canvas.drawLine2D(begin.x, begin.y, end.x, end.y, begin.z, blockId, blockDamage);
	}else{
		Pool.Canvas.drawLine3D(begin.x, begin.y, begin.z, end.x, end.y, end.z, blockId, blockDamage);
	}
};

Pool.Canvas.drawLine2D = function(x0, y0, x1, y1, height, blockId, blockDamage){
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;
    
    while(true){
        Level.setTile(x0, height, y0, blockId, blockDamage);
        
        if((x0 == x1) && (y0 == y1)){
            break;
        }
        var e2 = 2 * err;
        if(e2 > -dy){
            err -= dy;
            x0 += sx;
        }
        if(e2 < dx){
            err += dx;
            y0 += sy;
        }
    }
}

Pool.Canvas.drawLine3D = function(x0, y0, z0, x1, y1, z1, blockId, blockDamage){
    var x0i = Math.floor(x0);
    var y0i = Math.floor(y0);
    var z0i = Math.floor(z0);
    
    var x1i = Math.floor(x1);
    var y1i = Math.floor(y1);
    var z1i = Math.floor(z1);
    
    var sx = (x1i > x0i) ? 1 : (x1i < x0i) ? -1 : 0;
    var sy = (y1i > y0i) ? 1 : (y1i < y0i) ? -1 : 0;
    var sz = (z1i > z0i) ? 1 : (z1i < z0i) ? -1 : 0;
    
    var x = x0i;
    var y = y0i;
    var z = z0i;
    
    var xp = x0i + (x1i > x0i ? 1 : 0);
    var yp = y0i + (y1i > y0i ? 1 : 0);
    var zp = z0i + (z1i > z0i ? 1 : 0);
    
    var vx = (x1 === x0) ? 1 : x1 - x0;
    var vy = (y1 === y0) ? 1 : y1 - y0;
    var vz = (z1 === z0) ? 1 : z1 - z0;
    
    var vxvy = vx * vy;
    var vxvz = vx * vz;
    var vyvz = vy * vz;
    
    var errx = (xp - x0) * vyvz;
    var erry = (yp - y0) * vxvz;
    var errz = (zp - z0) * vxvy;
    
    var derrx = sx * vyvz;
    var derry = sy * vxvz;
    var derrz = sz * vxvy;

    do{
        Level.setTile(x, y, z, blockId, blockDamage);
        
        if(x === x1i && y === y1i && z === z1i){
            break;
        }
        
        var xr = Math.abs(errx);
        var yr = Math.abs(erry);
        var zr = Math.abs(errz);
        
        if(sx !== 0 && (sy === 0 || xr < yr) && (sz === 0 || xr < zr)){
            x += sx;
            errx += derrx;
        }else if(sy !== 0 && (sz === 0 || yr < zr)){
            y += sy;
            erry += derry;
        }else if(sz !== 0){
            z += sz;
            errz += derrz;
        }
    }while(true);
}

function selectLevelHook(){
	var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    var ScriptableObject = org.mozilla.javascript.ScriptableObject;
    
	for(var i = 0; i < scripts.size(); i++) {
		var scope = scripts.get(i).scope;
		if(!ScriptableObject.hasProperty(scope, "Pool")){
			ScriptableObject.putProperty(scope, "Pool", Pool);
		}
	}
}