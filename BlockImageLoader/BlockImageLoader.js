/**
 * @author affogatoman
 * @since 2015-7-12
 */

/**
 * @namespace
 */
BlockTypes = {
    CUBE: 0,
    STAIR: 1,
    SLAB: 2,
    SNOW: 3,
    CARPET: 4,
    TRAPDOOR: 5,
    FENCE: 6,
    PATHGRASS: 7,
    STONEWALL: 8,
    ENDPORTAL: 9,
    ENCHANTTABLE: 10,
    DAYLIGHTSENSOR: 11,
    BUTTON: 12
};

/**
 * @namespace
 */
var BlockImageLoader = {};

BlockImageLoader.TGA = null;

BlockImageLoader.META = null;

BlockImageLoader.META_MAPPED = null;

/**
 * @param {Bitmap} tga
 */
BlockImageLoader.init = function(tga) {
    if(tga instanceof android.graphics.Bitmap)
        BlockImageLoader.TGA = tga;
    
    if(BlockImageLoader.META == null)
        BlockImageLoader.META = eval(new java.lang.String(ModPE.getBytesFromTexturePack("images/terrain.meta"))+'');
        
    if(BlockImageLoader.META_MAPPED == null)
        BlockImageLoader.META_MAPPED = BlockImageLoader.META.map(function(e) {
            return e.name;
        });
        
    if(BlockImageLoader.TGA == null)
        BlockImageLoader.TGA = net.zhuoweizhang.mcpelauncher.texture.tga.TGALoader.load(ModPE.openInputStreamFromTexturePack("images/terrain-atlas.tga"), false);
};

/**
 * @param {String} name
 * @param {Number} data
 * @returns {Bitmap}
 */
BlockImageLoader.getBlockBitmap = function(name, data) {
    if(BlockImageLoader.META_MAPPED.indexOf(name) < 0)
        return android.graphics.Bitmap.createBitmap(1, 1, android.graphics.Bitmap.Config.RGB_565);
    var uvs = BlockImageLoader.META[BlockImageLoader.META_MAPPED.indexOf(name)].uvs[data];
    var x = uvs[0]*BlockImageLoader.TGA.getWidth();
    var y = uvs[1]*BlockImageLoader.TGA.getHeight();
    var width = uvs[2]*BlockImageLoader.TGA.getWidth()-x;
    width = Math.ceil(width);
    var height = uvs[3]*BlockImageLoader.TGA.getHeight()-y;
    height = Math.ceil(height);
    return android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(BlockImageLoader.TGA, x, y, width, height), 32, 32, false);
};

/**
 * Make cube-shaped image with three images
 * 
 * @param {Array} left
 * @param {Array} right
 * @param {Array} top
 * @param {Number} renderType
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.create = function(left, right, top, renderType, hasNoShadow) {
    if(BlockImageLoader.TGA == null || BlockImageLoader.META == null)
        throw new Error("BlockImageLoader hasn't been initialized");
    
    if(!Array.isArray(left) || !Array.isArray(right) || !Array.isArray(top))
        throw new Error("Illegal argument type");
    
    var temp = android.graphics.Bitmap.createBitmap(51, 57, android.graphics.Bitmap.Config.ARGB_8888);
    left = BlockImageLoader.getBlockBitmap(left[0], left[1]);
    right = BlockImageLoader.getBlockBitmap(right[0], right[1]);
    top = BlockImageLoader.getBlockBitmap(top[0], top[1]);
    
    switch(renderType) {
        case BlockTypes.CUBE:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 32);
            break;
        
        case BlockTypes.STAIR:
            temp = BlockImageLoader.createStair(left, right, top, temp, hasNoShadow);
            break;
        
        case BlockTypes.SLAB:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 16);
            break;
        
        case BlockTypes.SNOW:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 4);
            break;
        
        case BlockTypes.CARPET:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 2);
            break;
        
        case BlockTypes.TRAPDOOR:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 6);
            break;
            
        case BlockTypes.FENCE:
            temp = BlockImageLoader.createFence(left, right, top, temp, hasNoShadow);
            break;
            
        case BlockTypes.PATHGRASS:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 30);
            break;
            
        case BlockTypes.STONEWALL:
            temp = BlockImageLoader.createWall(left, right, top, temp, hasNoShadow);
            break;
            
        case BlockTypes.ENDPORTAL:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 26);
            break;
            
        case BlockTypes.ENCHANTTABLE:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 24);
            break;
            
        case BlockTypes.DAYLIGHTSENSOR:
            temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow, 12);
            break;
            
        case BlockTypes.BUTTON:
            temp = BlockImageLoader.createButton(left, right, top, temp, hasNoShadow);
            break;
            
        default:
            temp = android.graphics.Bitmap.createScaledBitmap(left, 64, 64, false);
            break;
    }
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @param {Number} height
 * @returns {Bitmap}
 */
BlockImageLoader.createCube = function(left, right, top, temp, hasNoShadow, height) {
    var createCubeLeft = function(src) {
        src = android.graphics.Bitmap.createBitmap(src, 0, 32-height, 32, height);
        src = android.graphics.Bitmap.createScaledBitmap(src, 25, height, false);
        var mSrc = [0, 0, 25, 0, 25, height, 0, height];
        var mDst = [0, 0, 25, 12, 25, 12+height, 0, height];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    var createCubeRight = function(src) {
        src = android.graphics.Bitmap.createBitmap(src, 0, 32-height, 32, height);
        src = android.graphics.Bitmap.createScaledBitmap(src, 26, height, false);
        var mSrc = [0, 0, 26, 0, 26, height, 0, height];
        var mDst = [0, 12, 26, 0, 26, height, 0, 12+height]
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    var createCubeTop = function(src) {
        var mSrc = [0, 0, 32, 0, 32, 32, 0, 32];
        var mDst = [0, 13.5, 25, 0, 51, 13.5, 25, 26];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    left = createCubeLeft(left);
    right = createCubeRight(right);
    top = createCubeTop(top);
    
    var canv = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
    canv.drawBitmap(left, 0, temp.getHeight()-left.getHeight(), p);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canv.drawBitmap(right, 25, temp.getHeight()-right.getHeight(), p);
    canv.drawBitmap(top, 0, 32-height, null);
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createStair = function(left, right, top, temp, hasNoShadow) {
    var createLeft = function(left) {
        left = android.graphics.Bitmap.createScaledBitmap(left, 25, 32, false);
        var src = [0, 0, 25, 0, 25, 32, 0, 32];
        var dst = [0, 0, 25, 12, 25, 44, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        return android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
    };
    
    var createRight = function(right) {
        right = android.graphics.Bitmap.createScaledBitmap(right, 26, 32, false);
        var first = android.graphics.Bitmap.createBitmap(right, 0, 0, 26, 16);
        var src = [0, 0, 26, 0, 26, 16, 0, 16];
        var dst = [0, 13, 26, 0, 26, 16, 0, 29];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        first = android.graphics.Bitmap.createBitmap(first, 0, 0, first.getWidth(), first.getHeight(), mtrx, false);
        
        var second = android.graphics.Bitmap.createBitmap(right, 0, 16, 26, 16);
        second = android.graphics.Bitmap.createBitmap(second, 0, 0, second.getWidth(), second.getHeight(), mtrx, false);
        
        return [first, second];
    };
    
    var createTop = function(top) {
        top = android.graphics.Bitmap.createScaledBitmap(top, 32, 32, false);
        var first = android.graphics.Bitmap.createBitmap(top, 0, 0, 32, 16);
        var src = [0, 0, 32, 0, 32, 16, 0, 16];
        var dst = [0, 13.5, 26, 0, 38.25, 6.5, 12.75, 19.5];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        first = android.graphics.Bitmap.createBitmap(first, 0, 0, first.getWidth(), first.getHeight(), mtrx, false);
        
        var second = android.graphics.Bitmap.createBitmap(top, 0, 16, 32, 16);
        second = android.graphics.Bitmap.createBitmap(second, 0, 0, second.getWidth(), second.getHeight(), mtrx, false);
        
        return [first, second];
    };
    
    left = createLeft(left);
    right = createRight(right);
    top = createTop(top);
    
    var canvas = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(left, 0, temp.getHeight()-left.getHeight(), p);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(right[0], 13, 6, p);
    canvas.drawBitmap(right[1], 25, temp.getHeight()-right[1].getHeight(), p);
    canvas.drawBitmap(top[0], 0, 0, null);
    canvas.drawBitmap(top[1], 13, 22, null);
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createFence = function(left, right, top, temp, hasNoShadow) {
    var createVert = function(left, right, top) {
        left = android.graphics.Bitmap.createBitmap(left, 12, 0, 8, 32);
        left = android.graphics.Bitmap.createScaledBitmap(left, 6, 32, false);
        var src = [0, 0, 6, 0, 6, 32, 0, 32];
        var dst = [0, 0, 6, 3, 6, 35, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        right = android.graphics.Bitmap.createBitmap(right, 12, 0, 8, 32);
        right = android.graphics.Bitmap.createScaledBitmap(right, 6, 32, false);
        src = [0, 0, 6, 0, 6, 32, 0, 32];
        dst = [0, 3, 6, 0, 6, 32, 0, 35];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        top = android.graphics.Bitmap.createBitmap(top, 12, 12, 8, 8);
        top = android.graphics.Bitmap.createScaledBitmap(top, 6, 6, false);
        src = [0, 0, 6, 0, 6, 6, 0, 5];
        dst = [0, 3, 6.5, 0, 12, 3, 3, 6.5];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        var temp = android.graphics.Bitmap.createBitmap(12, 38, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(temp);
        var p = android.graphics.Paint();
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(left, 0, 3, p);
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(right, 6, 3, p);
        canvas.drawBitmap(top, 0, 0, null);
        
        return temp;
    };
    
    var createHorz = function(left, right, top, type) {
        left = android.graphics.Bitmap.createBitmap(left, 0, 2+type*16, 32, 4);
        var src = [0, 0, 32, 0, 32, 4, 0, 4];
        var dst = [0, 0, 32, 16, 32, 20, 0, 4];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        right = android.graphics.Bitmap.createBitmap(right, 15, 2+type*16, 3, 4);
        src = [0, 0, 3, 0, 3, 4, 0, 4];
        dst = [0, 2, 3, 0, 3, 4, 0, 6];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        top = android.graphics.Bitmap.createBitmap(top, 15, 0, 2, 32);
        top = android.graphics.Bitmap.createScaledBitmap(top, 2, 35, false);
        src = [0, 0, 2, 0, 2, 35, 0, 35];
        dst = [0, 2, 5, 0, 35, 15, 32, 17];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        var temp = android.graphics.Bitmap.createBitmap(35, 22, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(temp);
        var p = android.graphics.Paint();
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(left, 0, 2, p);
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(right, 32, 16, p);
        canvas.drawBitmap(top, 0, 1, null);
        
        return temp;
    };
    
    var vert = createVert(left, right, top);
    var horz1 = createHorz(left, right, top, 0);
    var horz2 = createHorz(left, right, top, 1);
    
    var canvas = new android.graphics.Canvas(temp);
    canvas.drawBitmap(vert, 10, 5, null);
    canvas.drawBitmap(vert, temp.getWidth()-vert.getWidth()-10, temp.getHeight()-vert.getHeight()-5, null);
    canvas.drawBitmap(horz1, 8, 6, null);
    canvas.drawBitmap(horz2, 8, 21, null);
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createWall = function(left, right, top, temp, hasNoShadow) {
    var createVert = function(left, right, top) {
        left = android.graphics.Bitmap.createBitmap(left, 8, 0, 16, 32);
        left = android.graphics.Bitmap.createScaledBitmap(left, 13, 32, false);
        var src = [0, 0, 13, 0, 13, 32, 0, 32];
        var dst = [0, 0, 13, 6, 13, 38, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        right = android.graphics.Bitmap.createScaledBitmap(right, 13, 32, false);
        src = [0, 0, 13, 0, 13, 32, 0, 32];
        dst = [0, 6, 13, 0, 13, 32, 0, 38];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        top = android.graphics.Bitmap.createBitmap(top, 8, 8, 16, 16);
        top = android.graphics.Bitmap.createScaledBitmap(top, 13, 13, false);
        src = [0, 0, 13, 0, 13, 13, 0, 13];
        dst = [0, 6.5, 13.5, 0, 26, 6.5, 13.5, 13];
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        var temp = android.graphics.Bitmap.createBitmap(26, 44, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(temp);
        var p = new android.graphics.Paint();
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(left, 0, 6, p);
        if(hasNoShadow != false)
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(right, 13, 6, p);
        canvas.drawBitmap(top, 0, 0, null);
        
        return temp;
    };
    
    var createHorzRight = function(right) {
        right = android.graphics.Bitmap.createBitmap(right, 8, 8, 16, 24);
        right = android.graphics.Bitmap.createScaledBitmap(right, 11, 24, false);
        var src = [0, 0, 11, 0, 11, 24, 0, 24];
        var dst = [0, 6, 11, 0, 11, 24, 0, 30];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        return right;
    };
    
    var createHorzTop = function(top) {
        top = android.graphics.Bitmap.createBitmap(top, 8, 0, 16, 32);
        var src = [0, 32, 0, 0, 16, 0, 16, 32];
        var dst = [0, 6.5, 11, 0, 21, 5, 10, 11.5];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        return top;
    };
    
    var vert = createVert(left, right, top);
    var rightHorz = createHorzRight(right);
    var topHorz = createHorzTop(top);
    
    var canvas = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    canvas.drawBitmap(vert, temp.getWidth()-vert.getWidth(), 0, null);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(rightHorz, 26, 18, p);
    canvas.drawBitmap(topHorz, 16, 13, null);
    canvas.drawBitmap(vert, 0, temp.getHeight()-vert.getHeight(), null);
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createButton = function(left, right, top, temp, hasNoShadow) {
    var createLeft = function(left) {
        left = android.graphics.Bitmap.createBitmap(left, 10, 12, 12, 8);
        left = android.graphics.Bitmap.createScaledBitmap(left, 9, 8, false);
        var src = [0, 0, 9, 0, 9, 8, 0, 9];
        var dst = [0, 0, 9, 5, 9, 13, 0, 9];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        left = android.graphics.Bitmap.createBitmap(left, 0, 0, left.getWidth(), left.getHeight(), mtrx, false);
        
        return left;
    };
    
    var createRight = function(right) {
        right = android.graphics.Bitmap.createBitmap(right, 30, 12, 2, 8);
        right = android.graphics.Bitmap.createScaledBitmap(right, 4, 8, false);
        var src = [0, 0, 4, 0, 4, 8, 0, 8];
        var dst = [0, 2, 4, 0, 4, 8, 0, 10];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        right = android.graphics.Bitmap.createBitmap(right, 0, 0, right.getWidth(), right.getHeight(), mtrx, false);
        
        return right;
    };
    
    var createTop = function(top) {
        top = android.graphics.Bitmap.createBitmap(top, 10, 0, 12, 4);
        var src = [0, 0, 12, 0, 12, 4, 0, 4];
        var dst = [3, 0, 13, 5, 9, 7, 0, 2];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(src, 0, dst, 0, 4);
        top = android.graphics.Bitmap.createBitmap(top, 0, 0, top.getWidth(), top.getHeight(), mtrx, false);
        
        return top;
    };
    
    left = createLeft(left);
    right = createRight(right);
    top = createTop(top);
    
    var canvas = new android.graphics.Canvas(temp);
    var p = new android.graphics.Paint();
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-65, 255-65, 255-65), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(left, 5, (temp.getHeight()-left.getHeight())/2+4, p);
    if(hasNoShadow != false)
        p.setColorFilter(new android.graphics.PorterDuffColorFilter(android.graphics.Color.rgb(255-130, 255-130, 255-130), android.graphics.PorterDuff.Mode.MULTIPLY));
    canvas.drawBitmap(right, 14, (temp.getHeight()-left.getHeight())/2+8, p);
    canvas.drawBitmap(top, 5, (temp.getHeight()-left.getHeight())/2+2, null);
    
    return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Boolean} hasNoShadow
 * @returns {Bitmap}
 */
BlockImageLoader.createAnvil;





BlockImageLoader.init();

/** TESTING **/
/*
function useItem() {
    var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            var but = BlockImageLoader.create(["stone", 0], ["stone", 0], ["stone", 0], BlockTypes.BUTTON, true);
            but = android.graphics.Bitmap.createScaledBitmap(but, 510, 570, false);
            var imgv = new android.widget.ImageView(ctx);
            imgv.setImageBitmap(but);
            var pop = new android.widget.PopupWindow(ctx);
            pop.setWidth(510);
            pop.setHeight(570);
            pop.setFocusable(true);
            pop.setContentView(imgv);
            pop.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
        }
    }));
}
*/
