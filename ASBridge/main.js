var Bridge = {
    bridgeid: "",
    thread: null,
    isThreadOpen: true,
    openFile: null,
    openFilePath: "/sdcard/scriptbridge.a_opened",
    dataFile: null,
    dataFilePath: "/sdcard/scriptbridge.bridge",
    sendFile: null,
    sendFilePath: "/sdcard/scriptbridge.s_opened",
    recieveCallback: function(data) {},
    
    open: function(bridgeid, callback) {
        Bridge.bridgeid = bridgeid+"";
        if(typeof callback === "function")
            Bridge.recieveCallback = callback;
            
        //Initializing static variables
        Bridge.openFile = Bridge.openFile || new java.io.File(Bridge.openFilePath+"_"+bridgeid);
        Bridge.dataFile = Bridge.dataFile || new java.io.File(Bridge.dataFilePath+"_"+bridgeid);
        Bridge.sendFile = Bridge.sendFile || new java.io.File(Bridge.sendFilePath+"_"+bridgeid);
        
        Bridge.openFile["delete"]();
        Bridge.dataFile["delete"]();
        Bridge.sendFile["delete"]();
        
        Bridge.thread   = Bridge.thread   || new java.lang.Thread(new java.lang.Runnable({
            run: function() {
                while(Bridge.isThreadOpen) {
                    java.lang.Thread.sleep(100);
                    
                    if(Bridge.openFile.exists()) {     //If open check file has been created
                        Bridge.parseAndRun(Bridge.readFile());
                        
                        Bridge.openFile["delete"]();
                        Bridge.dataFile["delete"]();
                        //Deleting bridge files
                    }
                }
            }
        }));
        
        Bridge.thread.start();
    },
    
    close: function() {
        Bridge.isThreadOpen = false;
        
        Bridge.openFile["delete"]();
        Bridge.dataFile["delete"]();
        Bridge.sendFile["delete"]();
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
        if(typeof callback === "function")
            Bridge.recieveCallback = callback;
    },
    
    changeBridgeId: function(bridgeid) {
        Bridge.bridgeid = bridgeid+"";
        
        Bridge.openFile = new java.io.File(Bridge.openFilePath+"_"+bridgeid);
        Bridge.dataFile = new java.io.File(Bridge.dataFilePath+"_"+bridgeid);
        Bridge.sendFile = new java.io.File(Bridge.sendFilePath+"_"+bridgeid);
        Bridge.openFile["delete"]();
        Bridge.dataFile["delete"]();
        Bridge.sendFile["delete"]();
    }
};

Bridge.open("bridgeexample");
Bridge.setRecieveCallback(function(data) {
    print(data);
});
Bridge.send("heyhey");
Bridge.changeBridgeId("anotherid");
Bridge.send("hihi");
