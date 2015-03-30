function useItem(x, y, z, i, b, s, id, bd) {
	for(var gy = 127; gy >= 0; gy--) {
        var blockId = Level.getTile(x, gy, z);
        var blockData = Level.getData(x, gy, z);

		if(blockId !== 0 && blockId !== 7) {
			Player.addItemInventory(blockId, 1, blockData);
			Level.destroyBlock(x, gy, z, false);
		}
	}
}
