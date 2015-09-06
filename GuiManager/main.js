var ClassHelper = {
    
    inherit: function(child, parent) {
        if(child instanceof Object && parent instanceof Object) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        }
    }
    
};





function ArrayT(type) {
    if(type !== null)
        this.__TYPE__ = type;
    else
        this.__TYPE__ = Object;
}

ClassHelper.inherit(ArrayT, Array);

ArrayT.prototype.push = function() {
    var type = this.__TYPE__;
    
    for(var index = 0; index < arguments.length; index++) {
        var arg = arguments[index];
        
        if(typeof arg === "boolean")
            arg = new Boolean(arg);
        else if(typeof arg === "string")
            arg = new String(arg);
        else if(typeof arg === "number")
            arg = new Number(arg);
        
        if(arg instanceof type)
            Array.prototype.push.call(this, arguments[index]);
    }
    
    return this.length;
};

ArrayT.prototype.unshift = function() {
    var type = this.__TYPE__;
    
    for(var index = 0; index < arguments.length; index++) {
        if(typeof arg === "boolean")
            arg = new Boolean(arg);
        else if(typeof arg === "string")
            arg = new String(arg);
        else if(typeof arg === "number")
            arg = new Number(arg);
        
        if(arg instanceof type)
            Array.prototype.unshift.call(this, arguments[index]);
    }
    
    return this.length;
};

ArrayT.prototype.remove = function(index) {
    if(index < 0)
        return null;
    
    if(this[index] === undefined)
        return null;
    
    return this.splice(index, 1);
};

ArrayT.prototype.toArray = function() {
    var arr = new Array();
    Array.prototype.push.apply(arr, this);
    return arr;
};





var Device = {
    getContext: function() {
        return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    },
    
    getWidth: function() {
        var context = Device.getContext();
        return context.getScreenWidth();
    },
    
    getHeight: function() {
        var context = Device.getContext();
        return context.getScreenHeight();
    }
};





function GuiElement(x, y, width, height) {
    if(typeof x === "number")
        this.x = x;
    else
        this.x = 0;
    
    if(typeof y === "number")
        this.y = y;
    else
        this.y = 0;
        
    if(typeof width === "number")
        this.width = width;
    else
        this.width = 20;
        
    if(typeof heght === "number")
        this.height = height;
    else
        this.height = 20;
        
    this.ninePatchLayer = null;
};

GuiElement.prototype.toString = function() {
    return "GuiElement("+this.x+", "+this.y+", "+this.width+", "+this.height+")";
};

GuiElement.prototype.setSize = function(width, height) {
    if(typeof width === "number")
        this.width = width >= 0 ? (isNaN(width) ? this.width : width) : this.width;
    if(typeof height === "number")
        this.height = height >= 0 ? (isNaN(height) ? this.height : height) : this.height;
};

GuiElement.prototype.moveTo = function(x, y) {
    if(typeof x === "number")
        this.x = x >= 0 ? (isNaN(x) ? this.x : x) : this.x;
    if(typeof y === "number")
        this.y = y >= 0 ? (isNaN(y) ? this.y : y) : this.y;
};





function Button(x, y, width, height, text) {
    GuiElement.call(this, x, y, width, height);
    
    if(typeof text === "string")
        this.text = text;
    else
        this.text = "";
}

ClassHelper.inherit(Button, GuiElement);

Button.prototype.toString = function() {
    return "Button("+this.x+", "+this.y+", "+this.width+", "+this.height+", \""+this.text.replace(/\"/g, "\\\"")+"\")";
};





function GuiElementContainer(x, y, width, height) {
    GuiElement.call(this, x, y, width, height);
    
    this.children = new ArrayT(GuiElement);
}

ClassHelper.inherit(GuiElementContainer, GuiElement);

GuiElementContainer.prototype.toString = function() {
    return "GuiElementContainer("+this.x+", "+this.y+", "+this.width+", "+this.height+")";
};

GuiElementContainer.prototype.addChild = function(element) {
    this.children.push(element);
};

GuiElementContainer.prototype.getIndexOfChild = function(element) {
    return this.children.indexOf(element);
};

GuiElementContainer.prototype.deleteChild = function(index) {
    return this.children.remove(index);
};

GuiElementContainer.prototype.getChildren = function() {
    return this.children;
};

GuiElementContainer.prototype.getChildrenSize = function() {
    return this.children.length;
};





function Header(x, y, width, height, text) {
    Button.call(x, y, width, height, text);
}

ClassHelper.inherit(Header, Button);

Header.prototype.toString = function() {
    return "Header("+this.x+", "+this.y+", "+this.width+", "+this.height+", \""+this.text.replace(/\"/g, "\\\"")+"\")";
};





function Screen() {
    GuiElement.call(this, 0, 0, 0, 0);
    
    this.setSize(Device.getWidth(), Device.getHeight());
    
    this.viewList = new ArrayT(GuiElement);
}

ClassHelper.inherit(Screen, GuiElement);

Screen.prototype.init = function() {
    return;
};





function NinePatchDescription(textureName) {
    this.textureName = textureName;
}





var GuiElementFactory = {
    
    createGuiElement: function(x, y, width, height) {
        return new GuiElement(x, y, width, height);
    },
    
    createButton: function(text, x, y, width, height) {
        return new Button(x, y, width, height, text);
    },
    
    createGuiElementContainer: function(x, y, width, height) {
        return new GuiElementContainer(x, y, width, height);
    },
    
    createHeader: function(text, x, y, width, height) {
        return new Header(x, y, width, height, text);
    }
    
};

