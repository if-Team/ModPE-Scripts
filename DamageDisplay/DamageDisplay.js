var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx=ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

//import android.graphics.*
var Bitmap=android.graphics.Bitmap;
var Canvas=andoid.graphics.Canvas;
var Color=android.grahics.Color;
var Path=android.graphics.Path;

//import android.widget.*;
var ImageView=android.widget.ImageView;
var LinearLayout=android.widget.LinearLayout;
var PopupWindow=android.widget.PopupWindow;

var copyright="67 111 112 121 114 105 103 104 116 32 169 32 50 48 49 53 32 110 101 116 104 101 114 84 78 84 32 97 108 108 32 114 105 103 104 116 115 32 114 101 115 101 114 118 101 100 46".split(" ");
print(copyright.map(function(value){
    return String.fromCharCode(value);
}).join(""));
var inGame=false;
var tool={};
tool.list=[268,269,270,272,290,272,273,274,275,291,283,284,285,286,294,267,256,257,258,292,276,277,278,279,293,259,261,359];
tool.coord={};
tool.coord.X=0;
tool.coord.Y=1;
tool.items={};
tool.items.leather={};
tool.items.leather.code=[0,0,0,0,0,298,299,300,301];
tool.items.leather.maxDamage=[0,0,0,0,0,55,80,75,65];
tool.items.leather.textureCoord=[0,0,0,0,0,[6,7],[12,3],[6,8],[4,2]];
tool.items.wood={};
tool.items.wood.code=[268,269,270,272,290,0,0,0,0];
tool.items.wood.maxDamage=[59,59,59,59,59,0,0,0,0];
tool.items.wood.textureCoord=[[6,14],[5,12],[13,9],[4,1],[11,7],0,0,0,0];
tool.items.stone={};
tool.items.stone.code=[272,273,274,275,291,0,0,0,0];
tool.items.stone.maxDamage=[131,131,131,131,131,0,0,0,0];
tool.items.stone.textureCoord=[[7,14],[6,12],[14,9],[5,1],[12,7],0,0,0,0];
tool.items.gold={};
tool.items.gold.code=[283,284,285,286,294,314,315,316,317];
tool.items.gold.maxDamage=[32,32,32,32,32,77,112,105,91];
tool.items.gold.textureCoord=[[9,14],[8,12],[16,9],[7,1],[14,7],[9,7],[15,3],[9,8],[7,2]];
tool.items.chain={};
tool.items.chain.code=[0,0,0,0,0,302,303,304,305];
tool.items.chain.maxDamage=[0,0,0,0,0,165,240,225,194];
tool.items.chain.textureCoord=[0,0,0,0,0,[7,7],[13,3],[7,8],[5,2]];
tool.items.iron={};
tool.items.iron.code=[267,256,257,258,292,306,307,308,309];
tool.items.iron.maxDamage=[250,250,250,250,250,165,240,225,195];
tool.items.iron.textureCoord=[[8,14],[7,12],[15,9],[6,1],[13,7],[8,7],[14,3],[8,8],[6,2]];
tool.items.diamond={};
tool.items.diamond.code=[276,277,278,279,293,310,311,312,313];
tool.items.diamond.maxDamage=[1561,1561,1561,1561,363,528,495,429];
tool.items.diamond.textureCoord=[[10,14],[9,12],[1,10],[8,1],[15,7],[16,3],[10,8],[8,2]];
tool.items.others={};
tool.items.others.code=[259,261,359];
tool.items.others.maxDamage=[64,384,238];
tool.items.others.textureCoord=[[14,6],[13,2],[4,12]];
tool.class={};
tool.class.SWORD=0;
tool.class.SHOVER=1;
tool.class.PICKAXE=2;
tool.class.AXE=3;
tool.class.HOE=4;
tool.class.HELMET=5;
tool.class.CHESTPLATE=6;
tool.class.LEGGINGS=7;
tool.class.BOOTS=8;
tool.class.others={};
tool.class.others.FLINT_AND_STEEL=0;
tool.class.others.BOW=1;
tool.class.others.SCISSORS=2;
tool.type={};
tool.type.ITEM=0;
tool.type.ARMOR=1;
tool.using={};
tool.using.item=0;
tool.using.armor=[0,0,0,0];

function newLevel(){
    inGame=true;
    checkTool();
}
function leaveGame(){
    inGame=false;
}
function checkTool(){
    new java.lang.Thread(new java.lang.Runnable({run:function(){
        while(true){
            for(var slot=0;slot<3;slot++){
                if(!Player.getArmorSlot(slot)){
                    setToolList(tool.type.ARMOR,Player.getArmorSlot(slot),slot);
                }
            }
            if(tool.list.indexOf(Player.getCarriedItem())>=0){
                setToolList(tool.type.ITEM,Player.getCarriedItem());
            }
            if(!inGame) break;
            java.lang.Thread.sleep(100);
        }
    }})).start();
}
function setToolList(type,item,slot){
    switch(type){
        case tool.type.ITEM:
            tool.using.item=item;
        break;
        case tool.type.ARMOR:
            tool.using.armor[slot]=item;
        break;
    }
}
var window;
function setProgress(){
    ctx.runOnUiThread(new java.lang.Runnable({run:function(){
        window=new PopupWindow();
        var layout=new LinearLayout(ctx);
        layout.setOrientation(1);
    }}));
}

function print(str){
    ctx.runOnUiThread(new java.lang.Runnable({run: function(){
        android.widget.Toast.makeText(ctx,str,android.widget.Toast.LENGTH_SHORT).show();
    }}));
}

//The source was provided by Affocatoman(colombia2).
function getImage(parent, file, add) {
    var prefs = ctx.getSharedPreferences("mcpelauncherprefs",0);
    var prefs2 = ctx.getSharedPreferences(ctx.getPackageName()+"_preferences",0);
    var mcimg = android.graphics.BitmapFactory.decodeStream(pectx.getAssets().open("images/"+parent+"/"+file+add+".png"));
    if(prefs.getString("texturePack","")!=""&&prefs2.getBoolean("zz_texture_pack_enable", false)) {
        var path = prefs.getString("texturePack","");
        if(!new java.io.File(path).exists())
            return mcimg;
        var zf = new java.util.zip.ZipFile(new java.io.File(path));
        var tpimg = zf.getEntry("images/"+parent+"/"+file+add+".png");
        if(tpimg == null) {
            //if folder is shorter
            if(zf.getEntry(parent+"/"+file+add+".png") != null)
                tpimg = zf.getEntry(parent+"/"+file+add+".png");
                //or shortest
            else if(zf.getEntry(file+add+".png") != null)
                tpimg = zf.getEntry(file+add+".png");
            else
                return mcimg;
        }
        return android.graphics.BitmapFactory.decodeStream(zf.getInputStream(tpimg));
    } else
        return mcimg;
}