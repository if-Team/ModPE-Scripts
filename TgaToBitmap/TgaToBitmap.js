function getImage(fileName) {
    var buf = ModPE.getBytesFromTexturePack(fileName);
    var width = buf[12]+buf[13]<<8;
    var height = buf[14]+buf[15]<<8;
    var pixels = java.lang.reflect.Array.newInstance(java.lang.Integer.TYPE, width*height);
    for(var i = 0; i<width*height*4; i+=4) {
        //clientMessage((i/(width*height*4)*100).toFixed(1));
        var a = buf[buf.length-1-i];
        var r = buf[buf.length-2-i];
        var g = buf[buf.length-3-i];
        var b = buf[buf.length-4-i];
        a = a<0 ? a+256 : a;
        r = r<0 ? r+256 : r;
        g = g<0 ? g+256 : g;
        b = b<0 ? b+256 : b;
        pixels[i/4] = android.graphics.Color.argb(a, r, g, b);
    }
    var tga = android.graphics.Bitmap.createBitmap(pixels, 0, width, width, height, android.graphics.Bitmap.Config.ARGB_8888);
    var matrix = new android.graphics.Matrix();
    matrix.setScale(-1, 1);
    return android.graphics.Bitmap.createBitmap(tga, 0, 0, width, height, matrix, false);
}

