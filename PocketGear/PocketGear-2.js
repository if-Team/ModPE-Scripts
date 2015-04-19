/*
 * Copyright 2015 CodeInside, ChalkPE
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
 * @type {string}
 */
const VERSION = "0.1-SNAPSHOT";

/**
 * @param {number} updateInterval
 * @constructor
 */
function Gear(updateInterval){
    /**
     * @type {number}
     */
    this.updateInterval = updateInterval;

    /**
     * @type {GearMenu[]}
     */
    this.menus = [];

    /**
     * @type {number}
     */
    this.currentIndex = 0;
}

Gear.prototype = {
    /**
     * @returns {number}
     */
    getUpdateInterval: function(){
        return this.updateInterval;
    },

    /**
     * @returns {GearMenu[]}
     */
    getMenus: function(){
        return this.menus;
    },

    /**
     * @param {GearMenu} menu
     * @returns {number}
     */
    indexOfMenu: function(menu){
        this.getMenus().forEach(function(element, index){
            if(element.equals(menu)){
                return index;
            }
        });
        return -1;
    },

    /**
     * @param {GearMenu} menu
     */
    addMenu: function(menu){
        if(!(menu instanceof GearMenu)){
            throw new TypeError("The parameter 'menu' must be instance of GearMenu.");
        }

        if(this.indexOfMenu(menu) >= 0){
            throw new ReferenceError("The menu '" + menu.toString() + "' is already in Gear.");
        }

        this.getMenus().push(menu);
    },

    /**
     * @param {GearMenu} menu
     */
    removeMenu: function(menu){
        if(!(menu instanceof GearMenu)){
            throw new TypeError("The parameter 'menu' must be instance of GearMenu.");
        }

        var index = this.indexOfMenu(menu);
        if(index < 0){
            throw new ReferenceError("The menu '" + menu.toString() + "' is not in Gear.");
        }

        this.getMenus().splice(index, 1);
    },

    /**
     * @returns {number}
     */
    getCurrentIndex: function(){
        return this.currentIndex;
    },

    /**
     * @returns {GearMenu}
     */
    getCurrentMenu: function(){
        return this.getMenus()[this.getCurrentIndex()];
    },

    /**
     * @param {string} text
     */
    setDisplay: function(text){
        //TODO: Implement this method
    },

    /**
     * @returns {string}
     */
    toString: function(){
        return "[Gear " + VERSION + "]";
    }
};

/**
 * @param {string} name
 * @constructor
 * @abstract
 */
function GearMenu(name){
    if(name === null){
        throw new ReferenceError("The parameter 'name' must not be null.");
    }
    this.name = name;
}

GearMenu.prototype = {
    /**
     * @returns {string}
     */
    getName: function(){
        return this.name;
    },

    /**
     * @param {Gear} gear
     * @abstract
     */
    tick: function(gear){
        throw new ReferenceError("This method is abstract.");
    },

    /**
     * @returns {string}
     */
    toString: function(){
        return "[GearMenu " + this.getName() + "]";
    },

    /**
     * @param another
     * @returns {boolean}
     */
    equals: function(another){
        return another instanceof GearMenu && this.name === another.name;
    }
};

/**
 * @param {string} name
 * @constructor
 * @extends GearMenu
 */
function TimeMenu(name){
    GearMenu.call(this, name);
}
TimeMenu.DATE_FORMAT = new java.text.SimpleDateFormat("hh:mm a"); //09:33 PM

TimeMenu.prototype = Object.create(GearMenu.prototype);
TimeMenu.prototype.constructor = TimeMenu;

/**
 * @param {Gear} gear
 */
TimeMenu.prototype.tick = function(gear){
    gear.setDisplay(TimeMenu.DATE_FORMAT.format(new java.util.Date()) + "");
};

//---------------------------------------------

const MAX_TICK = 20;
var tick = 0;

var gear = new Gear(10);
gear.addMenu(new TimeMenu("Time"));

function modTick(){
    if(++tick >= MAX_TICK){
        tick = 0;
    }

    if(tick % gear.getUpdateInterval() === 0){
        gear.getCurrentMenu().tick(gear);
    }
}