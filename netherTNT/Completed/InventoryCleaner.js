/*이 스크립트의 제작자는 네더TNT이며 무단수정및 공유를 금지합니다.*/
var block=[1,2,3,4,5,7,12,13,14,15,16,17,18,19,20,21,22,24,35,41,42,43,44,45,46,47,48,49,53,56,57,60,67,73,74,79,80,82,86,87,89,91,95,98,103,108,109,112,114,128,134,135,136,155,156,157,158,170,173,246,247,248,249,253,254,255];
var deco=[6,8,9,10,11,26,27,30,31,32,37,38,39,40,50,51,54,58,59,61,62,63,64,65,66,68,71,78,81,83,85,92,96,101,102,104,105,107,126,139,141,142,171,244,245,247,321,330,323,324,338,355];
var tool=[256,257,258,259,261,267,268,269,270,271,272,273,274,275,276,277,278,279,281,283,284,285,286,290,291,292,293,294,325,328,329,345,347,359,383];
var armor=[298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317];
var food=[260,282,295,296,297,319,320,344,353,354,360,361,362,363,364,365,366,391,392,393,400,457,458,459];
var mineral=[263,264,265,266,318,331,348,406];
var others=[262,280,287,288,289,332,334,336,337,339,340,341,344,351,352,405,456];
var delay=0;
var inventorySlot=new Array();
var inventorySlotCount=new Array();
var inventorySlotData=new Array();
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var btnWindow = null;

function dip2px(ctx, dips){
return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function cleanInventory()
{
switch(delay){
case 0:
for(var i=9;i<=44;i++){
inventorySlot[inventorySlot.length]=Player.getInventorySlot(i);
inventorySlotCount[inventorySlotCount.length]=Player.getInventorySlotCount(i);
inventorySlotData[inventorySlotData.length]=Player.getInventorySlotData(i);
Player.clearInventorySlot(i);
}
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<block.length;b++){
if(inventorySlot[i]==block[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
delay+=1;
cleanInventory();
break;
case 1:
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<deco.length;b++){
if(inventorySlot[i]==deco[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
delay+=1;
cleanInventory();
break;
case 2:
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<tool.length;b++){
if(inventorySlot[i]==tool[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
delay+=1;
cleanInventory();
break;
case 3:
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<armor.length;b++){
if(inventorySlot[i]==armor[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
delay+=1;
cleanInventory();
break;
case 4:
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<food.length;b++){
if(inventorySlot[i]==food[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
delay+=1;
cleanInventory();
break;
case 5:
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<mineral.length;b++){
if(inventorySlot[i]==mineral[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
delay+=1;
cleanInventory();
break;
case 6:
for(var i=0;i<inventorySlot.length;i++){
for(var b=0;b<others.length;b++){
if(inventorySlot[i]==others[b])
addItemInventory(inventorySlot[i],inventorySlotCount[i],inventorySlotData[i]);
}
}
inventorySlot.splice(0,inventorySlot.length);
inventorySlotCount.splice(0,inventorySlotCount.length);
inventorySlotData.splice(0,inventorySlotData.length);
delay=0;
print("인벤토리 정리가 완료되었습니다.");
}
}

function print(msg) {
ctx.runOnUiThread(new java.lang.Runnable({run: function(){
android.widget.Toast.makeText(ctx, msg, android.widget.Toast.LENGTH_SHORT).show();
}}));
}

function newLevel(){
if(Level.getGameMode()==0){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
try{
btnWindow = new android.widget.PopupWindow();
var layout = new android.widget.RelativeLayout(ctx);
var button = new android.widget.Button(ctx);
button.setText("IC");
button.setOnClickListener(new android.view.View.OnClickListener({
onClick: function(viewarg) {
cleanInventory();
}}));
layout.addView(button);

btnWindow.setContentView(layout);
btnWindow.setWidth(dip2px(ctx, 48));
btnWindow.setHeight(dip2px(ctx, 48));
btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
btnWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.BOTTOM, 0, 0);
}catch(error){
print(error);
}
} }));
}
}

function leaveGame(){
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
if(btnWindow != null){
btnWindow.dismiss();
btnWindow = null;
}
}}));
}