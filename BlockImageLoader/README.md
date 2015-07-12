##How to use
- Copy all codes from BlockImageLoader.js
- Use BlockImageLoader.create method to get block image
- You must call BlockImageLoader.init once to use

##Info
- BlockImageLoader.init method's argument can be null or terrain-atlas bitmap
- BlockImageLoader.create method's is meta file data like ["stone", 0], ["dirt", 1]...

##Example
        BlockImageLoader.init() //You just call it once
        var stone_image = BlockImageLoader.create(["stone", 0], ["stone", 0], ["stone", 0], false); //It'll make stone image