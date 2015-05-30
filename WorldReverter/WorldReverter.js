var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var list = [];
var BlockType = {PUT:0, BREAK:1};

function useItem(x,y,z,itemId,blockId,side,itemData,blockData) {
    if(itemId>255) return;
    switch(side) {
    case 0:
        y--;
        break;
    case 1:
        y++;
        break;
    case 2:
        z--;
        break;
    case 3:
        z++;
        break;
    case 4:
        x--;
        break;
    case 5:
        x++;
        break;
    default:
        clientMessage(ChatColor.RED+"Error! Side is unknown!");
        break;
    }
    list.push({type:BlockType.PUT, x:x, y:y, z:z, block:{id:itemId, data:itemData}});
}

function destroyBlock(x,y,z) {
    var blockId = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetTile(x,y,z);
    var blockData = net.zhuoweizhang.mcpelauncher.ScriptManager.nativeGetData(x,y,z);
    list.push({type:BlockType.BREAK, x:x, y:y, z:z, block:{id:blockId, data:blockData}});
}