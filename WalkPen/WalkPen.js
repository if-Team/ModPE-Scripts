var context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Thread = java.lang.Thread;
var Runnable = java.lang.Runnable;
var AlertDialog = android.app.AlertDialog;
var View = android.view.View;
var ViewGroup = android.view.ViewGroup;
var MotionEvent = android.view.MotionEvent;
var Gravity = android.view.Gravity;
var RelativeLayout = android.widget.RelativeLayout;
var LinearLayout = android.widget.LinearLayout;
var TextView = android.widget.TextView;
var Button = android.widget.Button;
var PopupWindow = android.widget.PopupWindow;
var StateListDrawable = android.graphics.drawable.StateListDrawable;
var GradientDrawable = android.graphics.drawable.GradientDrawable;
var BitmapDrawable = android.graphics.drawable.BitmapDrawable;
var Bitmap = android.graphics.Bitmap;
var Color = android.graphics.Color;
var Canvas = android.graphics.Canvas;
var Paint = android.graphics.Paint;
var ArrayList = java.util.ArrayList;

var pw;
var openable = true;
var moving = false;
var display =  context.getWindowManager().getDefaultDisplay();
var bcBmp;

function dp(v)
{
	return Math.ceil(v * context.getResources().getDisplayMetrics().density);
}

function newLevel()
{
	showButton();
}

function leaveGame()
{
	context.runOnUiThread(new Runnable(
	{
		run: function()
		{
			try{
				pw.dismiss();
			}catch(e)
			{
				
			}
		}
	}));
}

function PointObj(px,py)
{
	x = px;
	y = py;
}

function openBoard()
{
	openable = false;
	
	context.runOnUiThread(new Runnable(
	{
		run: function()
		{
			try{
				var mainPw;
				var boardPw;
				var points = new ArrayList();
				
				var layout = new LinearLayout(context);
				layout.setLayoutParams(new ViewGroup.LayoutParams(dp(250),ViewGroup.LayoutParams.WRAP_CONTENT));
				layout.setOrientation(LinearLayout.VERTICAL);
				layout.setGravity(Gravity.TOP);
				
				var bg = new TextView(context);
				bg.setWidth(dp(250));
				bg.setHeight(dp(250));
				bg.setBackgroundDrawable(new BitmapDrawable(bcBmp));
				
				var btnLayout = new LinearLayout(context);
				btnLayout.setLayoutParams(new ViewGroup.LayoutParams(dp(250),ViewGroup.LayoutParams.WRAP_CONTENT));
				btnLayout.setBackgroundColor(Color.WHITE);
				btnLayout.setOrientation(LinearLayout.HORIZONTAL);
				
				var cancelBtn = new TextView(context);
				cancelBtn.setWidth(dp(120));
				cancelBtn.setHeight(dp(30));
				cancelBtn.setBackgroundColor(Color.argb(255,180,180,180));
				cancelBtn.setGravity(Gravity.CENTER);
				cancelBtn.setTextColor(Color.argb(255,0,0,0));
				cancelBtn.setText("Cancel");
				cancelBtn.setOnClickListener(new View.OnClickListener(
				{
					onClick: function(v)
					{
						try{
							openable = true;
							mainPw.dismiss();
							boardPw.dismiss();
						}catch(e)
						{
							print(e + "\n" + e.lineNumber);
						}
					}
				}));
				
				var space = new TextView(context);
				space.setWidth(dp(10));
				space.setHeight(dp(30));
				
				var okBtn = new TextView(context);
				okBtn.setWidth(dp(120));
				okBtn.setHeight(dp(30));
				okBtn.setBackgroundColor(Color.argb(255,180,180,180));
				okBtn.setGravity(Gravity.CENTER);
				okBtn.setTextColor(Color.argb(255,0,0,0));
				okBtn.setText("Ok");
				okBtn.setOnClickListener(new View.OnClickListener(
				{
					onClick: function(v)
					{
						try{
							openable = true;
							mainPw.dismiss();
							boardPw.dismiss();
							movePlayer(points);
						}catch(e)
						{
							print(e + "\n" + e.lineNumber);
						}
					}
				}));
				
				btnLayout.addView(cancelBtn);
				btnLayout.addView(space);
				btnLayout.addView(okBtn);
				
				layout.addView(bg);
				layout.addView(btnLayout);
				
				
				
				mainPw = new PopupWindow();
				mainPw.setContentView(layout);
				mainPw.setWindowLayoutMode(-2,-2);
				mainPw.showAtLocation(context.getWindow().getDecorView(),Gravity.CENTER,0,0);
				
				var editable = true;
				var scale = 10;
				var x = 0;
				var y = 0;
				var bitmap = new Bitmap.createBitmap(dp(250),dp(250),Bitmap.Config.ARGB_8888);
				var paint = new Paint();
				paint.setARGB(255,0,0,0);
				var board = new TextView(context);
				board.setWidth(dp(250));
				board.setHeight(dp(250));
				board.setOnTouchListener(new View.OnTouchListener(
				{
					onTouch: function(v,event)
					{
						try{
							if(editable)
							{
								if(event.action==MotionEvent.ACTION_DOWN)
								{
									x = event.getX();
									y = event.getY();
								}else if(event.action==MotionEvent.ACTION_UP)
								{
									editable = false;
									return false;
								}else if(event.action==MotionEvent.ACTION_MOVE&&Math.sqrt(Math.pow(x-event.getX(),2)+Math.pow(x-event.getX(),2))>3)
								{
									var canvas = new Canvas(bitmap);
									var point = Math.abs(x-event.getX())+Math.abs(y-event.getY());
									for(var c = 0;c <= point;c++)
									{
										var rx = (event.getX() - ((event.getX()-x)*c/point));
										var ry = (event.getY() - ((event.getY()-y)*c/point));
										var p = {
											x: rx,
											y: ry
										}
										points.add(p);
										canvas.drawRect(rx-scale/2,ry-scale/2,rx+scale/2,ry+scale/2,paint);
									}
									var drawable = new BitmapDrawable(bitmap);
									board.setBackgroundDrawable(drawable);
									x = event.getX();
									y = event.getY();
								}
							}
							return false;
						}catch(e)
						{
							print(e + "\n" + e.lineNumber);
						}
						return false;
					}
				}));
				
				boardPw = new PopupWindow();
				boardPw.setContentView(board);
				boardPw.setWidth(dp(250));
				boardPw.setHeight(dp(250));
				boardPw.showAtLocation(context.getWindow().getDecorView(),Gravity.CENTER,0,-dp(15));
			}catch(e)
			{
				print(e + "\n" + e.lineNumber);
			}
		}
	}));
}

function movePlayer(pointList)
{
	var oldX = pointList.get(1).x;
	var oldY = pointList.get(1).y;
	var yaw = Entity.getYaw(Player.getEntity()) - 450;
	moving = true;
	
	new Thread(new Runnable(
	{
		run: function()
		{
			try{
				for(var i = 2;i < pointList.size();i ++)
				{
					if(!moving)
					{
						break;
					}
					if(i==pointList.size()-1)
					{
						break;
					}
					Thread.sleep(25);
					var angle = yaw + Math.round(Math.atan2(pointList.get(i).y-oldY,pointList.get(i).x-oldX)*180/Math.PI);
					var sin = -Math.sin(angle/180*Math.PI);
					var cos = Math.cos(angle/180*Math.PI);
					var ent = Player.getEntity();
					//Entity.setRot(ent,angle,Entity.getPitch(ent));
					Entity.setVelX(ent,0.2*sin);
					Entity.setVelZ(ent,0.2*cos);
					oldX = pointList.get(i).x;
					oldY = pointList.get(i).y;
				}
				moving = false;
			}catch(e)
			{
				print(e + "\n" + e.lineNumber);
			}
		}
	})).start();
}

function showButton()
{
	context.runOnUiThread(new Runnable(
	{
		run: function()
		{
			try{
				bcBmp = new Bitmap.createBitmap(dp(250),dp(250),Bitmap.Config.ARGB_8888);
				var canvas = new Canvas(bcBmp);
				var bcP1 = new Paint();
				bcP1.setARGB(255,255,255,255);
				var bcP2 = new Paint();
				bcP2.setARGB(255,180,180,180);
				for(var x = 0;x < dp(250);x += dp(25))
				{
					for(var y = 0;y < dp(250);y += dp(25))
					{
					//	if(x%dp(5)==0&&y%dp(5)==0)
						{
						//	if(y<dp(250))
							{
								if(x%(dp(25)*2)==0)
								{
									if(y%(dp(25)*2)==0)
									{
										canvas.drawRect(x,y,x+dp(25),y+dp(25),bcP1);
									}else{
										canvas.drawRect(x,y,x+dp(25),y+dp(25),bcP2);
									}
								}else{
									if(y%(dp(25)*2)==0)
									{
										canvas.drawRect(x,y,x+dp(25),y+dp(25),bcP2);
									}else{
										canvas.drawRect(x,y,x+dp(25),y+dp(25),bcP1);
									}
								}
						//	}else{
						//		canvas.drawRect(x,y,x+dp(25),y+dp(25),bcP1);
							}
						}
					}
				}
				
				var clickDrawable = new GradientDrawable();
				clickDrawable.setColors([
											Color.argb(255,200,200,255),
											Color.argb(255,80,80,205)
										]);
				clickDrawable.setStroke(3,Color.argb(255,50,50,255));
				clickDrawable.setCornerRadius(dp(25));
				
				var noneDrawable = new GradientDrawable();
				noneDrawable.setColors([
											Color.argb(255,40,40,165),
											Color.argb(255,100,100,195)
										]);
				noneDrawable.setStroke(3,Color.argb(255,50,50,255));
				noneDrawable.setCornerRadius(dp(25));
				
				var stateDrawable = new StateListDrawable();
				stateDrawable.addState([android.R.attr.state_pressed],noneDrawable);
				stateDrawable.addState([-android.R.attr.state_pressed],clickDrawable);
				
				var btn = new TextView(context);
				btn.setWidth(dp(50));
				btn.setHeight(dp(50));
				btn.setBackgroundDrawable(stateDrawable);
				btn.setOnClickListener(new View.OnClickListener(
				{
					onClick: function(v)
					{
						try{
							if(openable)
							{
								if(moving)
								{
									moving = false;
								}else{
									openBoard();
								}
							}
						}catch(e)
						{
							print(e + "\n" + e.lineNumber);
						}
					}
				}));
				
				pw = new PopupWindow();
				pw.setContentView(btn);
				pw.setWidth(dp(50));
				pw.setHeight(dp(50));
				pw.showAtLocation(context.getWindow().getDecorView(),Gravity.LEFT|Gravity.BOTTOM,0,0);

			}catch(e)
			{
				print(e + "\n" + e.lineNumber);
			}
		}
	}));
}
