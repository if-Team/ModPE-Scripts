var ctx=com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var pectx=ctx.createPackageContext("com.mojang.minecraftpe", android.content.Context.CONTEXT_IGNORE_SECURITY);

//import android.graphics.*
var Bitmap=android.graphics.Bitmap;
var BitmapFactory=android.graphics.BitmapFactory;
var Canvas=andoid.graphics.Canvas;
var Color=android.grahics.Color;
var Path=android.graphics.Path;
var Typeface=android.graphics.Typeface;

//import android.widget.*;
var ImageView=android.widget.ImageView;
var LinearLayout=android.widget.LinearLayout;
var PopupWindow=android.widget.PopupWindow;
var TextView=android.widget.TextView(ctx);

//import java.io.File;
var File=java.io.File;

//import java.util.zip.ZipFile;
var ZipFile=java.util.zip.ZipFile;

var copyright="67 111 112 121 114 105 103 104 116 32 169 32 50 48 49 53 32 110 101 116 104 101 114 84 78 84 32 97 108 108 32 114 105 103 104 116 115 32 114 101 115 101 114 118 101 100 46".split(" ");
print(copyright.map(function(value){
    return String.fromCharCode(value);
}).join(""));
var inGame=false;
var tool={};
tool.item={};
tool.item.list=[268,269,270,271,290,272,273,274,275,291,283,284,285,286,294,267,256,257,258,292,276,277,278,279,293,259,261,359];
tool.item.maxDamage=[59,131,32,250,1561,64,384,238];
tool.item.textureCoord=[[6,14],[5,12],[13,9],[4,1],[11,7],[7,14],[6,12],[14,9],[5,1],[12,7],[9,14],[8,12],[16,9],[7,1],[14,7],[8,14],[7,12],[15,9],[6,1],[13,7],[10,14],[9,12],[1,10],[8,1],[15,7],[14,6],[13,2],[4,12]];
tool.armor={};
tool.armor.list=[298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317];
tool.armor.maxDamage=[55,80,75,65,165,240,225,194,165,240,225,195,363,528,495,429,77,112,105,91];
tool.armor.textureCoord=[[6,7],[12,3],[6,8],[4,2],[7,7],[13,3],[7,8],[5,2],[8,7],[14,3],[8,8],[6,2],[10,7],[16,3],[10,8],[8,2],[9,7],[15,3],[9,8],[7,2]];
tool.coord={};
tool.coord.X=0;
tool.coord.Y=1;
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
                if(Player.getArmorSlot(slot)){
                    setToolList(tool.type.ARMOR,Player.getArmorSlot(slot),slot);
                }
            }
            if(tool.item.list.indexOf(Player.getCarriedItem())>=0){
                setToolList(tool.type.ITEM,Player.getCarriedItem());
            }
            if(!inGame) return;
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
        if(window){
            window.dismiss();
        }
        window=new PopupWindow();
        var layout=new LinearLayout(ctx);
        layout.setOrientation(1);
        var items=getItems();
        for(var slot=0;slot<4;slot++){
            var subLayout=new LinearLayout(ctx);
            subLayout.setOrientation(0);
            var imageView=new ImageView(ctx);
            var textView=new TextView(ctx);
            if(slot<4){
                if(tool.using.armor[slot]){
                    var index=tool.armor.list.indexOf(tool.using.armor[slot]);
                    var bitmap=Bitmap.createBitmap(items,tool.armor.textureCoord[index][tool.coord.X]*16,tool.armor.textureCoord[index][tool.coord.Y]*16,16,16);
                    imageView.setImageBitmap(bitmap);
                    textView.setText((100-Player.getArmorSlotDamage(slot)/tool.armor.maxDamage[index]*100.toFixed(2))+"%");
                    textView.setTypeface(Typeface.createFromAsset(pectx.getAssets(),"fonts/minecraft.ttf"));
                    subLayout.addView(imageView);
                    subLayout.addView(textView);
                    layout.addView(subLayout);
                }
            }else{
                if(tool.using.item){
                    var index=tool.item.list.indexOf(tool.using.item);
                    var bitmap=Bitmap.createBitmap(items,tool.item.textureCoord[index][tool.coord.X]*16,tool.item.textureCoord[index][tool.coord.Y]*16,16,16);
                    imageView.setImageBitmap(bitmap);
                    textView.setText((100-Player.getCarriedItemData()/tool.item.maxDamage[index].toFixed(2))+"%");
                    textView.setTypeface(Typeface.createFromAsset(pectx.getAssets(),"fonts/minecraft.ttf"));
                    subLayout.addView(imageView);
                    subLayout.addView(textView);
                    layout.addView(subLayout);
                }
            }
        }
    }}));
}

function print(str){
    ctx.runOnUiThread(new java.lang.Runnable({run: function(){
        android.widget.Toast.makeText(ctx,str,android.widget.Toast.LENGTH_SHORT).show();
    }}));
}

//The source was provided by Affogatoman(colombia2).
function getItems(){
    var prefs=ctx.getSharedPreferences("mcpelauncherprefs",0);
    var prefs2=ctx.getSharedPreferences(ctx.getPackageName()+"_preferences",0);
    var mcimg=BitmapFactory.decodeStream(pectx.getAssets().open("images/items-opaque.png"));
    if(prefs.getString("texturePack","")!=""&&prefs2.getBoolean("zz_texture_pack_enable", false)) {
        var path=prefs.getString("texturePack","");
        if(!new File(path).exists())
            return mcimg;
        var zf=new ZipFile(new File(path));
        var tpimg=zf.getEntry("images/items-opaque.png");
        }
        return BitmapFactory.decodeStream(zf.getInputStream(tpimg));
    }else
        return mcimg;
}