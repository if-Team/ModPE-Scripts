var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var windowWidth,windowHeight;
function dip2px(dips)
{
    return Math.ceil(dips*ctx.getResources().getDisplayMetrics().density);
}
var btnWindow,wpWindow;
var wTV=new Array();
var waypoint=new Array();

var hello="99 108 105 101 110 116 77 101 115 115 97 103 101 40 67 104 97 116 67 111 108 111 114 46 71 82 69 69 78 43 34 87 97 121 80 111 105 110 116 32 83 99 114 105 112 116 32 98 121 32 78 101 116 104 101 114 84 78 84 34 41 59".split(" ");
var code="";
for each(var i in hello)
{
    code+=String.fromCharCode(i);
}
function newLevel()
{
    eval(code);
    windowWidth=ctx.getWindowManager().getDefaultDisplay().getWidth();
    windowHeight=ctx.getWindowManager().getDefaultDisplay().getHeight();
    ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
    try
    {
        btnWindow=new android.widget.PopupWindow();
        var btnLayout=new android.widget.RelativeLayout(ctx);
        var nB=new android.widget.Button(ctx);
        nB.setText("New Waypoint");
        nB.setTextSize(10);
        nB.setOnClickListener(new android.view.View.OnClickListener({onClick:function(viewarg){
    newWaypoint();
}}));
        btnLayout.addView(nB);
        btnWindow.setContentView(btnLayout);
        btnWindow.setWidth(windowWidth/6);
        btnWindow.setHeight(dip2px(50));
        btnWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        btnWindow.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT|android.view.Gravity.BOTTOM,0,0);
    }
    catch(error)
    {
        print(error);
    }
    }}));
}
function newWaypoint()
{
    ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
    try
    {
        var layout=new android.widget.LinearLayout(ctx);
        layout.setOrientation(1);
        var nET=new android.widget.EditText(ctx);
        nET.setHint("name");
        layout.addView(nET);
        var xET=new android.widget.EditText(ctx);
        xET.setHint("X");
        xET.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
        layout.addView(xET);
        var zET=new android.widget.EditText(ctx);
        zET.setHint("Z");
        zET.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
        layout.addView(zET);
        var dialog=new android.app.AlertDialog.Builder(ctx);
        dialog.setTitle("new waypoint");
        dialog.setNegativeButton("cancel",null);
        dialog.setPositiveButton("make", new android.content.DialogInterface.OnClickListener({ onClick: function(d, which){ 
    waypoint.push([nET.getText(),Number(xET.getText()),Number(zET.getText())]);
    print("The waypoint was made successfully.");
    wUpdate();
}}));
        dialog.setView(layout);
        dialog.show();
    }
    catch(error)
    {
        print(error);
    }
    }}));
}
function wUpdate()
{
    ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
    try
    {
        if(wpWindow!=null)
        {
            wpWindow.dismiss();
        }
    wpWindow=new android.widget.PopupWindow();
        var wpLayout=new android.widget.LinearLayout(ctx);
        wpLayout.setOrientation(1);
        var scr=new android.widget.ScrollView(ctx);
        for(var i in wTV)
        {
            wTV.splice(i,1);
        }
        for(var i in waypoint)
        {
            wTV[i]=new android.widget.Button(ctx);
            wTV[i].setText(waypoint[i][0]+"["+getLength(waypoint[i][1],waypoint[i][2])+"m]");
            wTV[i].setOnClickListener(new android.view.View.OnClickListener({ onClick: function(viewarg) {
                wpLayout.removeView(viewarg);
                for(var c in waypoint)
                {
                    if(waypoint[c][0]==viewarg.getText().split("[")[0])
                    {
                        waypoint.splice(c,1);
                        print("The waypoint was removed successfully.");
                    }
                }
            }}));
            wpLayout.addView(wTV[i]);
        }
        scr.addView(wpLayout);
        wpWindow.setContentView(scr);
        wpWindow.setWidth(windowWidth/6);
        wpWindow.setHeight(windowHeight-dip2px(100));
        wpWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        wpWindow.showAtLocation(ctx.getWindow().getDecorView(),android.view.Gravity.RIGHT|android.view.Gravity.TOP,0,dip2px(50));
    }
    catch(error)
    {
        print(error);
    }
    }}));
}
function modTick()
{
    ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
    try
    {
        for(var i in waypoint)
        {
            wTV[i].setText(waypoint[i][0]+"["+getLength(waypoint[i][1],waypoint[i][2])+"m]");
        }
    }
    catch(error)
    {
        print(error);
    }
    }}));
}
function getLength(x,z)
{
    var playerX=Player.getX();
    var playerZ=Player.getZ();
    return Math.sqrt(Math.pow(playerX-x,2)+Math.pow(playerZ-z,2)).toFixed(2);
}
function leaveGame()
{
    ctx.runOnUiThread(new java.lang.Runnable({ run: function() {
    try
    {
        if(btnWindow!=null)
        {
            btnWindow.dismiss();
            btnWindow=null;
        }
        if(wpWindow!=null)
        {
            wpWindow.dismiss();
            wpWindow=null;
        }
    }
    catch(error)
    {
        print(error);
    }
    }}));
}