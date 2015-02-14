var context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var Renderer = android.opengl.GLSurfaceView.Renderer;
var GL10 = javax.microedition.khronos.opengles.GL10;
var GLU = android.opengl.GLU;
var GLSurfaceView = android.opengl.GLSurfaceView;
var Context = android.content.Context;

function getFloatBuffer(array)
{
	try{
		var tmp = new java.nio.ByteBuffer.allocateDirect(array.length*4);
		tmp.order(java.nio.ByteOrder.nativeOrder());
		var buffer = tmp.asFloatBuffer();
		buffer.put(array);
		buffer.position(0);
		return buffer;
	}catch(e)
	{
		print(e + "\n" + e.lineNumber);
	}
}
function getByteBuffer(array)
{
	try{
		var buffer = new java.nio.ByteBuffer.allocateDirect(array.length);
		buffer.put(array);
		buffer.position(0);
		return buffer;
	}catch(e)
	{
		print(e + "\n" + e.lineNumber);
	}
}

context.runOnUiThread(new java.lang.Runnable(
{
	run: function()
	{
		try{
			var layout = new android.widget.LinearLayout(context);
			layout.setOrientation(1);
			layout.setLayoutParams(new android.view.ViewGroup.LayoutParams(-1,-1));
			layout.setGravity(android.view.Gravity.LEFT);
			
			var xRot = 45;
			var yRot = 45;
			var block = {
				draw: function(gl,x,y,z)
				{
					try{
						var vertices = [
							x-0.5,y+0.5,z+0.5,
							x+0.5,y+0.5,z+0.5,
							x+0.5,y-0.5,z+0.5,
							x-0.5,y-0.5,z+0.5,
							
							x-0.5,y+0.5,z-0.5,
							x+0.5,y+0.5,z-0.5,
							x+0.5,y-0.5,z-0.5,
							x-0.5,y-0.5,z-0.5];
						var indices = [
							 0, 3, 2,
							 0, 1, 2,
							 0, 4, 7,
							 0, 3, 7,
							 4, 7, 6,
							 4, 5, 6,
							 5, 1, 2,
							 5, 6, 2,
							 0, 4, 5,
							 0, 1, 5,
							 3, 7, 6,
							 3, 2, 6];
						var colors = [
							1.0,  1.0,  1.0,  1.0,
							1.0,  1.0,  1.0,  1.0,
							0.5,  0.5,  0.5,  1.0,
							0.5,  0.5,  0.5,  1.0,
							1.0,  1.0,  1.0,  1.0,
							1.0,  1.0,  1.0,  1.0,
							0.5,  0.5,  0.5,  1.0,
							0.5,  0.5,  0.5,  1.0];
						var mVertexBuffer = getFloatBuffer(vertices);
						var mIndexBuffer = getByteBuffer(indices);
						var mColorBuffer = getFloatBuffer(colors);
						
						gl.glLoadIdentity();
						gl.glTranslatef(0,0,-15);
						gl.glFrontFace(GL10.GL_CW);
						gl.glColor4f(1.0,1.0,1.0,1.0);
						gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
						gl.glVertexPointer(3,GL10.GL_FLOAT,0,mVertexBuffer);
						gl.glEnableClientState(GL10.GL_COLOR_ARRAY);
						gl.glColorPointer(4,GL10.GL_FLOAT,0,mColorBuffer);
						gl.glRotatef(xRot,1,0,0);
						gl.glRotatef(yRot,0,1,0);
						gl.glDrawElements(GL10.GL_TRIANGLES,indices.length,GL10.GL_UNSIGNED_BYTE,mIndexBuffer);
						gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);
						gl.glDisableClientState(GL10.GL_COLOR_ARRAY);
					}catch(e)
					{
						print(e + "\n" + e.lineNumber);
					}
				}
			};
			var player = {
				draw: function(gl)
				{
					try{
						var vertices = [
							-0.5,-0.5, 0.5,
							 0.5,-0.5, 0.5,
							 0.5,-1.5, 0.5,
							-0.5,-1.5, 0.5,
							
							-0.5,-0.5,-0.5,
							 0.5,-0.5,-0.5,
							 0.5,-1.5,-0.5,
							-0.5,-1.5,-0.5];
						var indices = [
							 0, 3, 2,
							 0, 1, 2,
							 0, 4, 7,
							 0, 3, 7,
							 4, 7, 6,
							 4, 5, 6,
							 5, 1, 2,
							 5, 6, 2,
							 0, 4, 5,
							 0, 1, 5,
							 3, 7, 6,
							 3, 2, 6];
						var colors = [
							0.8,  0.8,  0.4,  1.0,
							0.8,  0.8,  0.4,  1.0,
							0.3,  0.3,  0.0,  1.0,
							0.3,  0.3,  0.0,  1.0,
							0.8,  0.8,  0.4,  1.0,
							0.8,  0.8,  0.4,  1.0,
							0.3,  0.3,  0.0,  1.0,
							0.3,  0.3,  0.0,  1.0];
						var mVertexBuffer = getFloatBuffer(vertices);
						var mIndexBuffer = getByteBuffer(indices);
						var mColorBuffer = getFloatBuffer(colors);
						
						gl.glLoadIdentity();
						gl.glTranslatef(0,0,-15);
						gl.glFrontFace(GL10.GL_CW);
						gl.glColor4f(0.8,0.8,0.4,1.0);
						gl.glEnableClientState(GL10.GL_VERTEX_ARRAY);
						gl.glVertexPointer(3,GL10.GL_FLOAT,0,mVertexBuffer);
						gl.glEnableClientState(GL10.GL_COLOR_ARRAY);
						gl.glColorPointer(4,GL10.GL_FLOAT,0,mColorBuffer);
						gl.glRotatef(xRot,1,0,0);
						gl.glRotatef(yRot,0,1,0);
						gl.glDrawElements(GL10.GL_TRIANGLES,indices.length,GL10.GL_UNSIGNED_BYTE,mIndexBuffer);
						gl.glDisableClientState(GL10.GL_VERTEX_ARRAY);
					}catch(e)
					{
						print(e + "\n" + e.lineNumber);
					}
				}
			};
			
			var surfaceView = GLSurfaceView(context);
			surfaceView.setRenderer(new Renderer(
			{
				onSurfaceCreated: function(gl,config)
				{
					gl.glShadeModel(GL10.GL_SMOOTH);
					gl.glClearColor(0.1,0.1,0.1,1.0);
					gl.glClearDepthf(1.0);
					gl.glEnable(GL10.GL_DEPTH_TEST);
					gl.glDepthFunc(GL10.GL_LEQUAL);
					gl.glHint(GL10.GL_PERSPECTIVE_CORRECTION_HINT,GL10.GL_NICEST);
				},
				onSurfaceChanged: function(gl,width,height)
				{
					gl.glViewport(0,0,width,height);
					gl.glMatrixMode(GL10.GL_PROJECTION);
					gl.glLoadIdentity();
					GLU.gluPerspective(gl,45.0,width/height,1.0,50.0);
					gl.glMatrixMode(GL10.GL_MODELVIEW);
					gl.glLoadIdentity();
				},
				onDrawFrame: function(gl)
				{
					try{
						gl.glClear(GL10.GL_COLOR_BUFFER_BIT|GL10.GL_DEPTH_BUFFER_BIT);
						gl.glLoadIdentity();
						gl.glTranslatef(0,0,-15);
						if(Player.getEntity())
						{
							player.draw(gl);
							yRot = Entity.getYaw(Player.getEntity())+180;
							playerX = Math.floor(Player.getX());
							playerY = Math.floor(Player.getY());
							playerZ = Math.floor(Player.getZ());
							for(var x = playerX-2;x <= playerX+2;x ++)
							{
								for(var y = playerY-3;y <= playerY+2;y ++)
								{
									for(var z = playerZ-2;z <= playerZ+2;z ++)
									{
										if(Level.getTile(x,y,z))
										{
											block.draw(gl,x-playerX,y-playerY,z-playerZ);
										}
									}
								}
							}
						}
					}catch(e)
					{
						print(e);
					}
				}
			}));
			surfaceView.setLayoutParams(new android.view.ViewGroup.LayoutParams(120*Math.ceil(context.getResources().getDisplayMetrics().density),120*Math.ceil(context.getResources().getDisplayMetrics().density)));
			
			layout.addView(surfaceView);
			
			context.addContentView(layout,new android.view.ViewGroup.LayoutParams(-1,-1));
		}catch(e)
		{
			print(e + "\n" + e.lineNumber);
		}
	}
}));
