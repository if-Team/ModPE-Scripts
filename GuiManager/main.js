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





var Minecraft = {
    
    setScreen: function(screen) {
        if(screen instanceof Screen) {
            screen.init();
            
            var context = Device.getContext();
            var layout = new android.widget.RelativeLayout(context);
            
            for(var index = 0; index < screen.viewList.length; index++) {
                var element = screen.viewList[index];
                var converted = ViewConverter["convert"+element.getClassName()];
                layout.addView(converted);
            }
        }
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
    this.parentGuiElement = null;
};

GuiElement.prototype.getClassName = function() {
    return "GuiElement";
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

GuiElement.prototype.getParentGuiElement = function() {
    return this.parentGuiElement;
};

GuiElement.prototype.setParentGuiElement = function(parent) {
    if(parent instanceof GuiElement)
        this.parentGuiElement = parent;
};





function Button(x, y, width, height, text) {
    GuiElement.call(this, x, y, width, height);
    
    if(typeof text === "string")
        this.text = text;
    else
        this.text = "";
}

ClassHelper.inherit(Button, GuiElement);

Button.prototype.getClassName = function() {
    return "Button";
};

Button.prototype.toString = function() {
    return "Button("+this.x+", "+this.y+", "+this.width+", "+this.height+", \""+this.text.replace(/\"/g, "\\\"")+"\")";
};





function GuiElementContainer(x, y, width, height) {
    GuiElement.call(this, x, y, width, height);
    
    this.children = new ArrayT(GuiElement);
}

ClassHelper.inherit(GuiElementContainer, GuiElement);

GuiElementContainer.prototype.getClassName = function() {
    return "GuiElementContainer";
};

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
    Button.call(this, x, y, width, height, text);
    
    if(width === null)
        this.width = Device.getWidth();
    if(height === null)
        this.height = Device.getHeight();
}

ClassHelper.inherit(Header, Button);

Header.prototype.getClassName = function() {
    return "Header";
};

Header.prototype.toString = function() {
    return "Header("+this.x+", "+this.y+", "+this.width+", "+this.height+", \""+this.text.replace(/\"/g, "\"")+"\")";
};





function Screen() {
    GuiElement.call(this, 0, 0, 0, 0);
    
    this.setSize(Device.getWidth(), Device.getHeight());
    
    this.viewList = new ArrayT(GuiElement);
}

ClassHelper.inherit(Screen, GuiElement);

Screen.prototype.getClassName = function() {
    return "Screen";
};

Screen.prototype.init = function() {
    return;
};

Screen.prototype.buttonClicked = function(button) {
    return;
};

Screen.prototype.pushElement = function(element) {
    if(element instanceof GuiElement) {
        element.setParentGuiElement(this);
        this.viewList.push(element);
    }
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





var ViewConverter = {
    
    convertButton: function(button) {
        if(!button instanceof Button)
            return null;
        
        var context = Device.getContext();
        var btn = new android.widget.Button(context);
        btn.setText(button.text);
        
        var params = new android.widget.RelativeLayout.LayoutParams(button.width, button.height);
        params.setMargins(button.x, button.y, 0, 0);
        btn.setLayoutParams(params);
        
        return btn;
    },
    
    convertHeader: function(header) {
        if(!header instanceof Header)
            return null;
            
        
    },
    
    convertGuiElementContainer: function(container) {
        if(!container instanceof GuiElementContainer)
            return null;
    }
    
};

/* Testing */
function MyScreen() {
    Screen.call(this);
    
    this.hdr = null;
    this.btn = null;
}

ClassHelper.inherit(MyScreen, Screen);

MyScreen.prototype.init = function() {
    this.btn = GuiElementFactory.createButton("text", 0, 0, 10, 10);
    
    this.pushElement(this.btn);
    
    this.hdr = GuiElementFactory.createHeader("Header");
    
    this.pushElement(this.hdr);
};

Minecraft.setScreen(new MyScreen());
