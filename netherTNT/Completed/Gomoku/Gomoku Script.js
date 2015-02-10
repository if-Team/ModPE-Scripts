var hello="99 108 105 101 110 116 77 101 115 115 97 103 101 40 67 104 97 116 67 111 108 111 114 46 71 82 69 69 78 43 34 71 111 109 111 107 117 32 83 99 114 105 112 116 32 98 121 32 78 101 116 104 101 116 84 78 84 34 41 59".split(" ");
var code="";
for each(var i in hello)
{
    code+=String.fromCharCode(i);
}
const gomokuTile=[143,144,145,146,147,148,149,150,151,152];
var isPlaying=false;
const black=0,white=1,blank=2;
var turn;
function newLevel()
{
    eval(code);
    Block.defineBlock(143,"Title.gomoku.name",[["piston_top_sticky",0],["nether_wart",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(144,"Title.gomoku.name",[["piston_top_sticky",0],["nether_wart",1],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(145,"Title.gomoku.name",[["piston_top_sticky",0],["nether_wart",2],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(146,"Title.gomoku.name",[["piston_top_sticky",0],["soul_sand",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(147,"Title.gomoku.name",[["piston_top_sticky",0],["cauldron_top",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(148,"Title.gomoku.name",[["piston_top_sticky",0],["cauldron_inner",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(149,"Title.gomoku.name",[["piston_top_sticky",0],["cauldron_side",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(150,"Title.gomoku.name",[["piston_top_sticky",0],["cauldron_bottom",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(151,"Title.gomoku.name",[["piston_top_sticky",0],["brewing_stand_base",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(152,"Title.gomoku.name",[["piston_top_sticky",0],["brewing_stand",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0],["piston_top_sticky",0]],1,false,13);
    Block.defineBlock(153,"Title.blackstone.name",[["trip_wire_source",0],["trip_wire_source",0],["trip_wire_source",0],["trip_wire_source",0],["trip_wire_source",0],["trip_wire_source",0]],1,false,13);
    Block.defineBlock(154,"Title.whitestone.name",[["command_block",0],["command_block",0],["command_block",0],["command_block",0],["command_block",0],["command_block",0]],1,false,13);
    Block.setShape(153,0,0,0,1,0.1,1);
    Block.setShape(154,0,0,0,1,0.1,1);
    ModPE.setItem(500,"blaze_rod",0,"gomoku maker");
    ModPE.setItem(501,"carrot_golden",0,"black stone");
    ModPE.setItem(502,"carrot_on_a_stick",0,"white stone");
    Player.addItemCreativeInv(500,5,0);
    Player.addItemCreativeInv(501,5,0);
    Player.addItemCreativeInv(502,5,0);
}
function procCmd(cmd)
{
    if(cmd=="give gomoku set")
    {
        if(Level.getGameMode()==0)
        {
            Level.dropItem(Player.getX(),Player.getY(),Player.getZ(),0,500,5,0);
            Level.dropItem(Player.getX(),Player.getY(),Player.getZ(),0,501,5,0);
            Level.dropItem(Player.getX(),Player.getY(),Player.getZ(),0,502,5,0);
            clientMessage(ChatColor.AQUA+"Gomoku set was given successfully.");
        }
        else
        {
            clientMessage(ChatColor.RED+"You can use this command in survival mode.");
        }
    }
}
function useItem(x,y,z,item,block)
{
    if(gomokuTile.indexOf(block)>0)
    {
        if(item!=500&&item!=501&&item!=502)
        {
            preventDefault();
            clientMessage(ChatColor.RED+"You can't put this item(block) on here");
        }
    }
    if(item==500)
    {
        if(gomokuTile.indexOf(block)<0)
        {
            if(Level.getGameMode()==0)
            {
                Entity.setCarriedItem(Player.getEntity(),500,Player.getCarriedItemCount()-1,0);
            }
            setTile(x,y+1,z,143);
            setTile(x+18,y+1,z,144);
            setTile(x,y+1,z+18,145);
            setTile(x+18,y+1,z+18,146);
            for(var makeX=x+1;makeX<x+18;makeX++)
            {
                setTile(makeX,y+1,z,150);
                setTile(makeX,y+1,z+18,149);
            }
            for(var makeZ=z+1;makeZ<z+18;makeZ++)
            {
                setTile(x,y+1,makeZ,152);
                setTile(x+18,y+1,makeZ,151);
            }
            for(var makeX=x+1;makeX<x+18;makeX++)
            {
                for(var makeZ=z+1;makeZ<z+18;makeZ++)
                {
                    setTile(makeX,y+1,makeZ,147);
                }
            }
            for(var makeX=x+3;makeX<x+16;makeX+=6)
            {
                for(var makeZ=z+3;makeZ<z+16;makeZ+=6)
                {
                    setTile(makeX,y+1,makeZ,148);
                }
            }
        }
        else
        if(!isPlaying)
        {
            isPlaying=true;
            clientMessage(ChatColor.AQUA+"The gomoku game was started.");
            turn=Math.floor(Math.random()*2);
            switch(turn)
            {
                case 0:
                clientMessage(ChatColor.BLACK+"Black's turn");
                break;
                case 1:
                clientMessage(ChatColor.WHITE+"White's turn");
                break;
            }
        }
        else
        {
            clientMessage(ChatColor.RED+"A game was already started.");
        }
    }
    if(item==501&&gomokuTile.indexOf(block)>=0)
    {
        if(isPlaying)
        {
            if(getTile(x,y+1,z)==0)
            {
                if(turn==black)
                {
                    setTile(x,y+1,z,153);
                    turn=white;
                    clientMessage(ChatColor.WHITE+"White's turn");
                    if(isMatched(x,y+1,z,153))
                    {
                        isPlaying=false;
                        clientMessage(ChatColor.GOLD+"Black won!");
                    }
                }
                else
                {
                    clientMessage(ChatColor.RED+"White's turn!");
                }
            }
        }
    }
    if(item==502&&gomokuTile.indexOf(block)>=0)
    {
        if(isPlaying)
        {
            if(getTile(x,y+1,z)==0)
            {
                if(turn==white)
                {
                    setTile(x,y+1,z,154);
                    turn=black;
                    clientMessage(ChatColor.BLACK+"Black's turn");
                    if(isMatched(x,y+1,z,154))
                    {
                        isPlaying=false;
                        clientMessage(ChatColor.GOLD+"White won!");
                    }
                }
                else
                {
                    clientMessage(ChatColor.RED+"Black's turn!");
                }
            }
        }
    }
}
function isMatched(x,y,z,color)
//black=153,white=154,blank=0
{
    var win=false;
    if(checkStone(x,y,z,color)>=5)
    {
        win=true;
    }
    return win;
}
function checkStone(x,y,z,color)
{
    var count=0;
    for(var number=-5;number<=0;number++)
    {
        for(var plus=0;plus<5;plus++)
        {
            if(getTile(x+plus+number,y,z+plus+number)==color)
            {
                count++;
            }
        }
        if(count<5)
        {
            count=0;
        }
        else
        {
            break;
        }
        for(var plus=0;plus<5;plus++)
        {
            if(getTile(x+plus+number,y,z-plus+number)==color)
            {
                count++;
            }
        }
        if(count<5)
        {
            count=0;
        }
        else
        {
            break;
        }
        for(var X=x;X<x+5;X++)
        {
            if(getTile(X+number,y,z)==color)
            {
                count++;
            }
        }
        if(count<5)
        {
            count=0;
        }
        else
        {
            break;
        }
        for(var Z=z;Z<z+5;Z++)
        {
            if(getTile(x,y,Z+number)==color)
            {
                count++;
            }
        }
        if(count<5)
        {
            count=0;
        }
        else
        {
            break;
        }
    }
    return count;
}