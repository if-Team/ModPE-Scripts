/**
 * @author affogatoman
 * @since 2015-7-12
 */

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
	var uvs = BlockImageLoader.META[BlockImageLoader.META_MAPPED.indexOf(name)].uvs[data];
	var x = uvs[0]*BlockImageLoader.TGA.getWidth();
	var y = uvs[1]*BlockImageLoader.TGA.getHeight();
	var width = uvs[2]*BlockImageLoader.TGA.getWidth()-x;
	width = Math.ceil(width);
	var height = uvs[3]*BlockImageLoader.TGA.getHeight()-y;
	height = Math.ceil(height);
	return android.graphics.Bitmap.createBitmap(BlockImageLoader.TGA, x, y, width, height);
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
		case 10:
		temp = BlockImageLoader.createStair(left, right, top, temp, hasNoShadow);
		break;
		
		default:
		temp = BlockImageLoader.createCube(left, right, top, temp, hasNoShadow);
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
 */
BlockImageLoader.createCube = function(left, right, top, temp, hasNoShadow) {
    var createCubeLeft = function(src) {
        src = android.graphics.Bitmap.createScaledBitmap(src, 25, 32, false);
        var mSrc = [0, 0, 25, 0, 25, 32, 0, 32];
        var mDst = [0, 0, 25, 12, 25, 44, 0, 32];
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    var createCubeRight = function(src) {
        src = android.graphics.Bitmap.createScaledBitmap(src, 26, 32, false);
        var mSrc = [0, 0, 26, 0, 26, 32, 0, 32];
        var mDst = [0, 12, 26, 0, 26, 32, 0, 44]
        var mtrx = new android.graphics.Matrix();
        mtrx.setPolyToPoly(mSrc, 0, mDst, 0, 4);
        return android.graphics.Bitmap.createBitmap(src, 0, 0, src.getWidth(), src.getHeight(), mtrx, false);
    };
    
    var createCubeTop = function(src) {
        src = android.graphics.Bitmap.createScaledBitmap(src, 32, 32, false);
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
	canv.drawBitmap(top, 0, 0, null);
	return temp;
};

/**
 * @param {Bitmap} left
 * @param {Bitmap} right
 * @param {Bitmap} top
 * @param {Bitmap} temp
 * @param {Boolean} hasNoShadow
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
        var src = [0, 0, 26, 0, 26, 32, 0, 32];
        var dst = [0, 12, 26, 0, 26, 32, 0, 44];
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
        var dst = [0, 13.5, 26, 0, 38.5, 7.5, 12, 20];
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
    canvas.drawBitmap(right[0], 13, 7, p);
    canvas.drawBitmap(right[1], 25, temp.getHeight()-right[1].getHeight(), p);
    canvas.drawBitmap(top[0], 0, 0, null);
    canvas.drawBitmap(top[1], 13, 22, null);
    
    return temp;
};



BlockImageLoader.init();
