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
 * @author ChalkPE <amato0617@gmail.com>
 * @since 2015-04-01
 */

var TimeLapse = {};
TimeLapse.VERSION = 0;
TimeLapse.VERSION_NAME = "0.0";

/**
 * 3D 좌표에 대한 래퍼 클래스입니다.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @constructor
 */
var Vector3 = function(x, y, z){
	this.x = x;
	this.y = y;
	this.z = z;
};

/**
 * 두 백터를 정렬합니다.
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Array}
 */
Vector3.sort = function(a, b){
    var begin = new Vector3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
    var end = new Vector3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
    return [begin, end];
};

Vector3.prototype = {
    /**
     * 객체의 문자열 표현을 리턴합니다.
     * @returns {string}
     */
    toString: function(){
        return "[" + this.x + ", " + this.y + ", "  + this.z + "]";
    },

    /**
     * 전달받은 객체가 이 객체와 동일한지 비교합니다.
     * @param {Object} another
     * @returns {boolean}
     */
    equals: function(another){
        return another instanceof Vector3 && this.x === another.x && this.y === another.y && this.z === another.z;
    }
};

/**
 * 동선을 표현하는 클래스입니다.
 * @param {Vector3} begin - 시작 지점
 * @param {Vector3} end - 종료 지점
 * @param {boolean} lockYaw - 참일 경우, 엔티티의 수평 시선을 종료 지점으로 고정합니다
 * @param {boolean} lockPitch - 참일 경우, 엔티티의 수직 시선을 종료 지점으로 고정합니다
 * @constructor
 */
var Movement = function(begin, end, lockYaw, lockPitch){
    var sorted = Vector3.sort(begin, end);

    this.begin = sorted[0];
    this.end = sorted[1];

    this.lockYaw = lockYaw;
    this.lockPitch = lockPitch;
};

Movement.prototype = {
    /**
     * 전달받은 엔티티를 동선에 따라 움직이게 합니다. 쓰레드에서 작업합니다.
     * @param {number} entity
     */
    move: function(entity){
        var __move = this.__move;
        new java.lang.Thread({run: function(){
            __move(entity);
        }}).start();
    },

    /**
     * 전달받은 엔티티를 처음 지점부터 끝 지점까지 직진하게 합니다.
     * @param {number} entity
     * @private
     */
    __move: function(entity){
        var xDistance = this.end.x - this.begin.x;
        var yDistance = this.end.y - this.begin.y;
        var zDistance = this.end.z - this.begin.z;
        var distance = Math.hypot(xDistance, yDistance, zDistance);

        for(var dist = 0; dist <= distance; dist++){
            var x = this.begin.x + xDistance * dist / distance;
            var y = this.begin.y + yDistance * dist / distance;
            var z = this.begin.z + zDistance * dist / distance;

            Level.setPosition(entity, x + 0.5, y + 0.5, z + 0.5);

            if(this.lockYaw){
                //Entity.setRot(ent, atan2(zDistance, xDistance), pitch);
                //TODO: Implements this feature
            }
        }
    }
};

/**
 * @param {number} degrees
 * @returns {number}
 */
function sin(degrees){
    return Math.sin(toRadians(degrees));
}

/**
 * @param {number} degrees
 * @returns {number}
 */
function cos(degrees){
    return Math.cos(toRadians(degrees));
}

/**
 * @param {number} degrees
 * @returns {number}
 */
function tan(degrees){
    return Math.tan(toRadians(degrees));
}

/**
 * @param {number} y
 * @param {number} x
 * @returns {number}
 */
function atan2(y, x){
    return toDegrees(Math.atan2(y, x));
}

/**
 * @param {number} degrees
 * @returns {number}
 */
function toRadians(degrees){
    return degrees * Math.PI / 180;
}

/**
 * @param {number} radians
 * @returns {number}
 */
function toDegrees(radians){
    return radians / Math.PI * 180;
}

Math.hypot = Math.hypot || function(){
    var y = 0;
    for(var i = 0; i < arguments.length; i++){
        if(arguments[i] === Infinity || arguments[i] === -Infinity){
            return Infinity;
        }
        y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
};