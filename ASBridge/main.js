var Bridge = {
    thread: null,
    isThreadOpen: true,
    openFile: null,
    openFilePath: "/sdcard/scriptbridge.a_opened",
    dataFile: null,
    dataFilePath: "/sdcard/scriptbridge.bridge",
    sendFile: null,
    sendFilePath: "/sdcard/scriptbridge.s_opened",
    recieveCallback: function(data) {},
    
    open: function(callback) {
        if(Object.prototype.toString.call(callback) == "[object Function]")
            Bridge.recieveCallback = callback;
        Bridge.openFile = Bridge.openFile || new java.io.File(Bridge.openFilePath);
        Bridge.dataFile = Bridge.dataFile || new java.io.File(Bridge.dataFilePath);
        Bridge.sendFile = Bridge.sendFile || new java.io.File(Bridge.sendFilePath);
        Bridge.thread = Bridge.thread || new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                while(Bridge.isThreadOpen) {
                    java.lang.Thread.sleep(100);
                    
                    if(Bridge.openFile.exists()) {
                        Bridge.parseAndRun(Bridge.readFile());
                        
                        Bridge.openFile["delete"]();
                        Bridge.dataFile["delete"]();
                    }
                }
            }
        }));
        
        Bridge.thread.start();
    },
    
    close: function() {
        Bridge.isThreadOpen = false;
    },
    
    readFile: function() {
        var file = Bridge.dataFile;
        var br = new java.io.BufferedReader(new java.io.FileReader(file));
        var result = br.readLine();
        br.close();
        
        return result;
    },
    
    parseAndRun: function(data) {
        try {
            Bridge.recieveCallback(data);
        } catch(e) {
            print(e);
        }
    },
    
    send: function(dataStr) {
        Bridge.sendFile.createNewFile();
        
        var bw = new java.io.BufferedWriter(new java.io.FileWriter(Bridge.dataFile));
        bw.write(dataStr);
        bw.close();
    },
    
    setRecieveCallback: function(callback) {
        if(Object.prototype.toString.call(callback) == "[object Function]")
            Bridge.recieveCallback = callback;
    }
};

Bridge.open(function(data) {
    print(data);
});
