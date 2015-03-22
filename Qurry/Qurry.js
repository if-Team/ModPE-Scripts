function useItem(x, y, z, i, b, s, id, bd) {
	for(var gy = 127; gy >= 0; gy--) {
		if(Level.getTile(x, gy, z) != 0 && Level.getTile(x, gy, z) != 7) {
			addItemInventory(Level.getTile(x, gy, z), 1, Level.getTile(x, gy, z));
			Level.setTile(x, gy, z, 0)
		}
	}
}
