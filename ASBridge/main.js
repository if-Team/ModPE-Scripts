var Bridge = {};

Bridge.thread = null;
Bridge.isThreadOpen = true;
Bridge.openCheck = null;
Bridge.openCheckPath = "/sdcard/scriptbridge.a_opened";
Bridge.dataFile = null;
Bridge.dataFilePath = "/sdcard/scriptbridge.bridge";

Bridge.start = function() {
    Bridge.openCheck = Bridge.openCheck || new java.io.File(Bridge.openCheckPath);
    Bridge.dataFile = Bridge.dataFile || new java.io.File(Bridge.dataFilePath);
    
    Bridge.thread = Bridge.thread || new java.lang.Thread(new java.lang.Runnable({
        run: function() {
            while(Bridge.isThreadOpen) {
                java.lang.Thread.sleep(100);
                
                if(Bridge.openCheck.exists()) {
                    var data = Bridge.readFile();
                    Bridge.parseAndRun(data);
                    
                    Bridge.openCheck["delete"]();
                }
            }
        }
    }));
    
    Bridge.thread.start();
};

Bridge.close = function() {
    Bridge.isThreadOpen = false;
};

Bridge.readFile = function() {
    var file = Bridge.dataFile;
    var br = new java.io.BufferedReader(new java.io.FileReader(file));
    var result = br.readLine();
    br.close();
    
    return result;
};

Bridge.parseAndRun = function(data) {
    var args = data.split("@");
    var funcName = args.shift();
    try {
        eval(funcName + "(" + args[0] + ");");
    } catch(e) {
        print(e);
    }
};

Bridge.start();

function test(a, b) {
    print(a + b);
}
