Trade = {};

//Variables
Trade.PAGE = 0;
Trade.EME_COUNT = 0;
Trade.META = null;
Trade.META_MAPPED = null;
Trade.SELLER = null;
Trade.TRADING = null;
Trade.CUR_HEALTH = null;
Trade.CUR_LANG = null;

Trade.debug = false;

Trade.getVersion = function() {
    return "Indev 1.3.3"
};

//Trade items
Trade.Items = {
    butcher: {
        name: ["item.beefCooked.name", "item.porkchopCooked.name", "item.helmetCloth.name", "item.chestplateCloth.name", "item.leggingsCloth.name", "item.bootsCloth.name", "item.beefRaw.name", "item.porkchopRaw.name", "item.coal.name", "item.ingotGold.name"],
        meta: [["beef_cooked",0], ["porkchop_cooked",0], ["helmet", 0], ["chestplate", 0], ["leggings", 0], ["boots", 0], ["beef_raw", 0], ["porkchop_raw", 0], ["coal", 0], ["gold_ingot", 0]],
        id: [364, 320, 298, 299, 300, 301, 363, 319, 263, 266],
        dam: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cost: [1, 1, 2, 4, 2, 2, 1, 1, 1, 1],
        count: [6, 6, 1, 1, 1, 1, 15, 15, 20, 8]
    },
    farmer: {
        name: ["item.apple.name", "item.bread.name", "item.chickenCooked.name", "item.cookie.name", "item.melon.name", "item.arrow.name", "item.flintAndSteel.name", "item.shears.name", "item.chickenRaw.name", "item.wheat.name", "item.fish.cod.cooked.name"],
        meta: [["apple",0], ["bread", 0], ["chicken_cooked", 0], ["cookie", 0], ["melon", 0], ["arrow", 0], ["flint_and_steel", 0], ["shears", 0], ["chicken_raw", 0], ["wheat", 0], ["fish_cooked", 0]],
        id: [260, 297, 366, 357, 369, 262, 259, 359, 365, 296, 350],
        dam: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cost: [1, 1, 1, 1, 1, 1, 3, 3, 1, 1, 1],
        count: [6, 3, 7, 9, 6, 5, 1, 1, 16, 19, 11]
    },
    librarian: {
        name: ["item.compass.name", "item.clock.name", "item.paper.name", "item.book.name", "item.ingotGold.name"],
        meta: [["compass_item", 0], ["clock_item", 0], ["paper", 0], ["book_normal", 0], ["gold_ingot", 0]],
        id: [345, 347, 339, 340, 266],
        dam: [0, 0, 0, 0, 0],
        cost: [11, 11, 1, 1, 1],
        count: [1, 1, 25, 13, 8]
    },
    priest: {
        name: ["item.redstone.name", "item.ingotGold.name"],
        meta: [["redstone_dust", 0], ["gold_ingot", 0]],
        id: [331, 266],
        dam: [0, 0],
        cost: [1, 1],
        count: [3, 8]
    },
    smith: {
        name: ["item.helmetDiamond.name", "item.chestplateDiamond.name", "item.leggingsDiamond.name", "item.bootsDiamond.name", "item.swordDiamond.name", "item.pickaxeDiamond.name", "item.hatchetDiamond.name", "item.shovelDiamond.name", "item.hoeDiamond.name", "item.helmetChain.name", "item.chestplateChain.name", "item.leggingsChain.name", "item.bootsChain.name", "item.helmetIron.name", "item.chestplateIron.name", "item.leggingsIron.name", "item.bootsIron.name", "item.swordIron.name", "item.pickaxeIron.name", "item.hatchetIron.name", "item.shovelIron.name", "item.hoeIron.name", "item.diamond.name", "item.ingotIron.name", "item.ingotGold.name", "item.coal.name"],
        meta: [["helmet", 4], ["chestplate", 4], ["leggings", 4], ["boots", 4], ["sword", 4], ["pickaxe", 4], ["axe", 4], ["shovel", 4], ["hoe", 4], ["helmet", 1], ["chestplate", 1], ["leggings", 1], ["boots", 1], ["helmet", 2], ["chestplate", 2], ["leggings", 2], ["boots", 2], ["sword", 2], ["pickaxe", 2], ["axe", 2], ["shovel", 2], ["hoe", 2], ["diamond", 0], ["iron_ingot", 0], ["gold_ingot", 0], ["coal", 0]],
        id: [310, 311, 312, 313, 276, 278, 279, 277, 293, 302, 303, 304, 305, 306, 307, 308, 309, 267, 257, 258, 256, 292, 264, 265, 266, 263],
        dam: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        cost: [7, 17, 12, 7, 12, 10, 10, 7, 7, 5, 12, 9, 5, 4, 11, 8, 4, 8, 7, 6, 4, 4, 1, 1, 1, 1],
        count: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 8, 8, 20]
    }
};

//Gui
Trade.INTERACTPW = {};
Trade.MAINPW = {};
Trade.NAME = {};
Trade.VILLAGER = {};
Trade.ITEMBACK = {};
Trade.COST = {};
Trade.COUNT = {};
Trade.DIRT = {};
Trade.WARNING_TOAST = null;

Trade.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);

    var back = Utils.showBackground();
    mainLayout.addView(back);
    var dirt = Utils.showBackground("dirt");
    mainLayout.addView(dirt);
    var header = Utils.showHeader(R.string.trade)[0];
    mainLayout.addView(header);
    var itemback = Utils.showItemBackground(59, 65);
    mainLayout.addView(itemback);
    var item = Utils.getItemImage("emerald", 0);
    itemback.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(item, 16*Utils.FOUR*1.6, 16*Utils.FOUR*1.6, false));
    var cost = Utils.justText("", 63, 67);
    mainLayout.addView(cost);
    var arrow = Utils.renderArrow(ctx.getScreenWidth()/Utils.FOUR/2-8, 77);
    mainLayout.addView(arrow);
    var left = Utils.showButton(25, 60, 18, 50, "<", function(view) {
        Utils.minusPage(view);
        Utils.updateTradeList(name, itemback2, cost, count);
    }, true, false);
    mainLayout.addView(left);
    var right = Utils.showButton(ctx.getScreenWidth()/Utils.FOUR-43, 60, 18, 50, ">", function(view) {
        Utils.plusPage(view);
        Utils.updateTradeList(name, itemback2, cost, count);
    }, true, false);
    mainLayout.addView(right);
    var buy = Utils.showButton(25, ctx.getScreenHeight()/Utils.FOUR-42, (ctx.getScreenWidth()/Utils.FOUR-72)/2, 32, R.string.buy, function() {
        Utils.buyThing();
    }, true, false);
    mainLayout.addView(buy);
    var sell = Utils.showButton(47+(ctx.getScreenWidth()/Utils.FOUR-72)/2, ctx.getScreenHeight()/Utils.FOUR-42, (ctx.getScreenWidth()/Utils.FOUR-72)/2, 32, R.string.sell, function() {
        Utils.sellThing();
    }, true, false);
    mainLayout.addView(sell);
    if(Trade.debug) {
        var debug = Utils.justText("DEBUGGING MODE", 4, 32);
        mainLayout.addView(debug);
    }
    var itemback2 = Utils.showItemBackground(ctx.getScreenWidth()/Utils.FOUR-99, 65);
    mainLayout.addView(itemback2);
    var count = Utils.justText("", ctx.getScreenWidth()/Utils.FOUR-95, 67);
    mainLayout.addView(count);
    var dismiss = Utils.showButton(4, 4, 38, 18, R.string.back, function() {
        mainPw.dismiss();
    }, false, false);
    mainLayout.addView(dismiss);
    var help = Utils.showButton(ctx.getScreenWidth()/Utils.FOUR-22, 4, 18, 18, "?", function() {
        Help.showScreen();
    }, false, true);
    mainLayout.addView(help);
    var name = Utils.justText("", ctx.getScreenWidth()/Utils.FOUR-133, 40, 108);
    mainLayout.addView(name);
    var villager = Utils.justText("", 25, 40, 108);
    mainLayout.addView(villager);
    mainPw.setContentView(mainLayout);
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setOnDismissListener(new android.widget.PopupWindow.OnDismissListener({
        onDismiss: function() {
            Trade.onScreenEnd();
        }
    }));
    var txt = Lang.getData(R.string.not_enough_emerald);
    if(Utils.hasNonAscii(txt))
        Utils.getStringBuilder(txt, "#ff0000", 1.5, "#410000");
    
    txt = Lang.getData(R.string.not_enough_item);
    if(Utils.hasNonAscii(txt))
        Utils.getStringBuilder(txt, "#ff0000", 1.5, "#410000");
    Trade.DIRT[Trade.CUR_LANG] = dirt;
    Trade.MAINPW[Trade.CUR_LANG] = mainPw;
    Trade.NAME[Trade.CUR_LANG] = name;
    Trade.VILLAGER[Trade.CUR_LANG] = villager;
    Trade.ITEMBACK[Trade.CUR_LANG] = itemback2;
    Trade.COST[Trade.CUR_LANG] = cost;
    Trade.COUNT[Trade.CUR_LANG] = count;
};

Trade.showScreen = function() {
    Trade.TRADING = true;
    Trade.EME_COUNT = Utils.getAllItems(388, 0);
    Utils.createUiThread(function(ctx) {
        var name = Utils.getVillagerType(Trade.SELLER);
        var type = Lang.getData("entity.Villager."+(name == "priest" ? "cleric" : (name == "smith" ? "tool" : name)));
        Trade.VILLAGER[Trade.CUR_LANG].setText(Utils.hasNonAscii(type) ? Utils.getStringBuilder(type, "#e1e1e1")[0] : type);
        if(Options.Options.TRADE)
            Trade.DIRT[Trade.CUR_LANG].setVisibility(android.view.View.GONE);
        Utils.updateTradeList(Trade.NAME[Trade.CUR_LANG], Trade.ITEMBACK[Trade.CUR_LANG], Trade.COST[Trade.CUR_LANG], Trade.COUNT[Trade.CUR_LANG]);
        Trade.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

Trade.onScreenEnd = function() {
    Trade.TRADING = false;
    Trade.PAGE = 0;
    if(Utils.isWarning())
        Trade.WARNING_TOAST.cancel();
};

Help = {};

Help.MAINPW = {};
Help.DIRT = {};

Help.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);
    
   
    var back = Utils.showBackground();
    mainLayout.addView(back);
    var dirt = Utils.showBackground("dirt");
    mainLayout.addView(dirt);
    var head = Utils.showHeader(R.string.about)[0];
    mainLayout.addView(head);
    var dismiss = Utils.showButton(4, 4, 38, 18, R.string.back, function() {
        mainPw.dismiss();
    }, false, false);
    mainLayout.addView(dismiss);
    var gotwitter = Utils.showButton(7, ctx.getScreenHeight()/Utils.FOUR-30, (ctx.getScreenWidth()/Utils.FOUR-22)/3, 24, "Twitter", function() {
        Easter.goToURL("http://twitter.com/dfak0557");
    }, true, false);
    mainLayout.addView(gotwitter);
    var gomk = Utils.showButton(11+(ctx.getScreenWidth()/Utils.FOUR-22)/3, ctx.getScreenHeight()/Utils.FOUR-30, (ctx.getScreenWidth()/Utils.FOUR-22)/3, 24, "MCPE KOREA" , function() {
        Easter.goToURL("http://mcpekorea.com");
    }, true, false);
    mainLayout.addView(gomk);
    var gogithub = Utils.showButton(15+2*((ctx.getScreenWidth()/Utils.FOUR-22)/3), ctx.getScreenHeight()/Utils.FOUR-30, (ctx.getScreenWidth()/Utils.FOUR-22)/3, 24, "if(Team); GitHub" , function() {
        Easter.goToURL("http://github.com/if-Team");
    }, true, false);
    mainLayout.addView(gogithub);
    var name = Utils.justText("TradePE", 8, 32);
    name.setTextColor(android.graphics.Color.YELLOW);
    var version = Utils.justText("v"+Trade.getVersion(), 8, 44);
    var madeby = Utils.justText("Made by Affogatoman", 8, 56);
    mainLayout.addView(name);
    mainLayout.addView(version);
    mainLayout.addView(madeby);
    var check = Utils.showButton(ctx.getScreenWidth()/Utils.FOUR-66, 32, 60, 36, R.string.check_update, function() {
        Update.check();
    }, false, true);
    mainLayout.addView(check);
    var thanksto = Utils.showButton(7, ctx.getScreenHeight()/Utils.FOUR-58, 110, 24, R.string.special_thanks, function() {
        SpecialThanks.showScreen();
    }, false, false);
    mainLayout.addView(thanksto);
    var edit = Utils.showImageButton(ctx.getScreenWidth()/Utils.FOUR-35, ctx.getScreenHeight()/Utils.FOUR-63, 28, 28, "image.edit", function() {
        Options.showScreen();
    });
    mainLayout.addView(edit);
    mainPw.setContentView(mainLayout);
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    Help.MAINPW[Trade.CUR_LANG] = mainPw;
    Help.DIRT[Trade.CUR_LANG] = dirt;
};

Help.showScreen = function() {
    Utils.createUiThread(function(ctx) {
        if(Options.Options.HELP)
            Help.DIRT[Trade.CUR_LANG].setVisibility(android.view.View.GONE);
        Help.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

Update = {};

Update.MAINPW = {};
Update.DIRT = {};
Update.NEWVER = {};

Update.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);
    
    var back = Utils.showBackground();
    mainLayout.addView(back);
    var dirt = Utils.showBackground("dirt");
    mainLayout.addView(dirt);
    var head = Utils.showHeader(R.string.new_found_1)[0];
    mainLayout.addView(head);
    var dismiss = Utils.showButton(4, 4, 38, 18, R.string.back, function() {
        mainPw.dismiss();
    }, false, false);
    mainLayout.addView(dismiss);
    var text = Utils.justText(R.string.new_found_2, 0, 48, ctx.getScreenWidth()/Utils.FOUR);
    mainLayout.addView(text);
    var text2 = Utils.justText("", 0, 75, ctx.getScreenWidth()/Utils.FOUR);
    text2.setTextColor(android.graphics.Color.YELLOW);
    text2.setShadowLayer(0.0001, Utils.FOUR, Utils.FOUR, android.graphics.Color.rgb(65, 65, 0));
    mainLayout.addView(text2);
    var later = Utils.showButton(7, ctx.getScreenHeight()/Utils.FOUR-30, (ctx.getScreenWidth()/Utils.FOUR-18)/2, 24, R.string.later, function() {
        mainPw.dismiss();
    }, true, false);
    mainLayout.addView(later);
    var yes = Utils.showButton(11+(ctx.getScreenWidth()/Utils.FOUR-18)/2, ctx.getScreenHeight()/Utils.FOUR-30, (ctx.getScreenWidth()/Utils.FOUR-18)/2, 24, R.string.yes, function() {
        Update.update();
    }, true, false);
    mainLayout.addView(yes);
    mainPw.setContentView(mainLayout);
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    Update.MAINPW[Trade.CUR_LANG] = mainPw;
    Update.DIRT[Trade.CUR_LANG] = dirt;
    Update.NEWVER[Trade.CUR_LANG] = text2;
};

Update.showScreen = function(version) {
    Utils.createUiThread(function(ctx) {
        var text = "v"+Trade.getVersion()+" -> v"+version;
        Update.NEWVER[Trade.CUR_LANG].setText(text);
        if(Options.Options.UPDATE)
            Update.DIRT[Trade.CUR_LANG].setVisibility(android.view.View.GONE);
        Update.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

Update.check = function() {
    new java.lang.Thread(new java.lang.Runnable({
        run: function() {
            try {
                Loading.showScreen();
                var url = new java.net.URL("https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/TradePE/version");
                var stream = url.openConnection().getInputStream();
                var version = new java.io.BufferedReader(new java.io.InputStreamReader(stream)).readLine();
                if(version != Trade.getVersion())
                    Update.showScreen(version);
                Loading.killScreen();
            } catch(e) {
                Loading.killScreen();
                NoInternet.showScreen();
                //NO INTERNET CONNECTION
            }
        }
    })).start();
};

Update.update = function() {
    var ctx = Utils.getContext();
    new java.lang.Thread(new java.lang.Runnable({
        run: function() {
            try {
                Loading.showScreen();
                if(android.os.Build.VERSION.SDK_INT > 9) {
                    var policy = new android.os.StrictMode.ThreadPolicy.Builder().permitAll().build();
                    android.os.StrictMode.setThreadPolicy(policy);
                }
                var url = new java.net.URL("https://raw.githubusercontent.com/if-Team/ModPE-Scripts/master/TradePE/main.js").openConnection().getInputStream();
                var bis = new java.io.BufferedInputStream(url);
                var target = new java.io.File("/data/data/"+ctx.getPackageName()+"/app_modscripts/"+Utils.getMyScriptName());
                var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(target));
                var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
                var read = 0;
                while((read = bis.read(buf)) >= 0)
                    bos.write(buf, 0, read);
                bis.close();
                bos.close();
                Update.finished();
            } catch(e) {
                Loading.killScreen();
                NoInternet.showScreen();
                //NO INTERNET CONNECTION
            }
        }
    })).start();
};

Update.finished = function() {
    Utils.createUiThread(function(ctx) {
        android.widget.Toast.makeText(ctx, "Rebooting blocklauncher...", 1).show();
        new android.os.Handler().postDelayed(new java.lang.Runnable({
            run: function() {
                var i = ctx.getPackageManager().getLaunchIntentForPackage(ctx.getPackageName());
                i.addFlags(android.content.Intent.FLAG_ACTIVITY_CLEAR_TOP);
                ctx.startActivity(i);
            }
        }), 700);
    });
};

SpecialThanks = {};

SpecialThanks.MAINPW = {};
SpecialThanks.DIRT = {};

SpecialThanks.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);
    
    var back = Utils.showBackground();
    mainLayout.addView(back);
    var dirt = Utils.showBackground("dirt");
    mainLayout.addView(dirt);
    var head = Utils.showHeader(R.string.special_thanks)[0];
    mainLayout.addView(head);
    var dismiss = Utils.showButton(4, 4, 38, 18, R.string.back, function() {
        mainPw.dismiss();
    }, false, false);
    mainLayout.addView(dismiss);
    mainPw.setContentView(mainLayout);
    
    var people = "<p><b>ChalkPE</b> - <i>JP Translator</i><br><b>@desno365</b> - <i>IT Translator</i><br><b>@TaQultO_988</b> - <i>ES Translator</i><br><b>@block_zone</b> - <i>RU Translator</i><br><b>@eu_sozin</b> - <i>PT Translator</i><br><b>@jnjnnjzch</b> - <i>CH Translator</i><br><b>@Adrian113162</b> - <i>FR Translator</i><br><b>@serhat50014</b> - <i>DE Translator</i></p>";
    var text = Utils.justText("", 0, 32, ctx.getScreenWidth()/Utils.FOUR);
    text.setText(android.text.Html.fromHtml(people));
    mainLayout.addView(text);
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    SpecialThanks.MAINPW[Trade.CUR_LANG] = mainPw;
    SpecialThanks.DIRT[Trade.CUR_LANG] = dirt;
};

SpecialThanks.showScreen = function() {
    Utils.createUiThread(function(ctx) {
        if(Options.Options.SPECIAL)
            SpecialThanks.DIRT[Trade.CUR_LANG].setVisibility(android.view.View.GONE);
        SpecialThanks.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

Loading = {};

Loading.MAINPW = {};

Loading.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);
    
    var text = ["/", "-", "\\", "|"];
    var view = Utils.justText("", 0, (ctx.getScreenHeight()/Utils.FOUR-16)/2, ctx.getScreenWidth()/Utils.FOUR);
    mainLayout.addView(view);
    var n = 0;
    new java.lang.Thread(new java.lang.Runnable({
        run: function() {
            while(true) {
                Utils.createUiThread(function() {
                    view.setText(text[n]);
                });
                if(n<3)
                    n++;
                else
                    n = 0;
                java.lang.Thread.sleep(200);
            }
        }
    })).start();
    
    mainPw.setContentView(mainLayout);
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(144, 0, 0, 0)));
    Loading.MAINPW[Trade.CUR_LANG] = mainPw;
};

Loading.showScreen = function() {
    Utils.createUiThread(function(ctx) {
        while(Loading.MAINPW[Trade.CUR_LANG] == 0); //WAITING FOR INIT COMPLETE
        Loading.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

Loading.killScreen = function() {
    Utils.createUiThread(function() {
        if(Loading.MAINPW[Trade.CUR_LANG].isShowing())
            Loading.MAINPW[Trade.CUR_LANG].dismiss();
    });
};

Options = {};

Options.Options = {
    TRADE: 1,
    HELP: 1,
    UPDATE: 1,
    SPECIAL: 0,
    OPTIONS: 0,
    NOINTERNET: 0
};

Options.toggleOption = function(screen, dat) {
    Options.Options[screen] = dat;
    if(screen == "TRADE")
        Trade.DIRT[Trade.CUR_LANG].setVisibility(dat == 1 ? android.view.View.GONE : android.view.View.VISIBLE);
    else if(screen == "HELP")
        Help.DIRT[Trade.CUR_LANG].setVisibility(dat == 1 ? android.view.View.GONE : android.view.View.VISIBLE);
    else if(screen == "UPDATE")
        Update.DIRT[Trade.CUR_LANG].setVisibility(dat == 1 ? android.view.View.GONE : android.view.View.VISIBLE);
    else if(screen == "SPECIAL")
        SpecialThanks.DIRT[Trade.CUR_LANG].setVisibility(dat == 1 ? android.view.View.GONE : android.view.View.VISIBLE);
    else if(screen == "OPTIONS")
        Options.DIRT[Trade.CUR_LANG].setVisibility(dat == 1 ? android.view.View.GONE : android.view.View.VISIBLE);
    else if(screen == "NOINTERNET")
        NoInternet.DIRT[Trade.CUR_LANG].setVisibility(dat == 1 ? android.view.View.GONE : android.view.View.VISIBLE);
    Options.saveOption();
};

Options.saveOption = function() {
    var file = new java.io.File("/sdcard/Affogatoman/TradePE/options.txt");
    file.getParentFile().mkdirs();
    var bw = new java.io.BufferedWriter(new java.io.FileWriter(file));
    bw.write(JSON.stringify(Options.Options));
    bw.close();
};

Options.loadOption = function() {
    var file = new java.io.File("/sdcard/Affogatoman/TradePE/options.txt");
    if(!file.exists())
        Options.saveOption();
    var br = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file)));
    Options.Options = JSON.parse(br.readLine());
    br.close();
};

Options.MAINPW = {};
Options.DIRT = {};

Options.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);
    
    var screens = [Trade, Help, Update, SpecialThanks, Options, NoInternet];
    var options = ["TRADE", "HELP", "UPDATE", "SPECIAL", "OPTIONS", "NONTERNET"];
    var current = 0;
    
    var back = Utils.showBackground();
    mainLayout.addView(back);
    var dirt = Utils.showBackground("dirt");
    mainLayout.addView(dirt);
    var head = Utils.showHeader(R.string.options)[0];
    mainLayout.addView(head);
    var dismiss = Utils.showButton(4, 4, 38, 18, R.string.back, function() {
        mainPw.dismiss();
    }, false, false);
    mainLayout.addView(dismiss);
    var rect = Utils.drawRect(32, 32, ctx.getScreenWidth()/Utils.FOUR-64, ctx.getScreenHeight()/Utils.FOUR-36, "#808080");
    mainLayout.addView(rect);
    var left = Utils.showButton(4, ctx.getScreenHeight()/Utils.FOUR-102, 24, 70, "<", function() {
        Options.toggleOption("OPTIONS", (Options.Options.OPTIONS == 0 ? 1 : 0));
    }, true, false);
    mainLayout.addView(left);
    var right = Utils.showButton(ctx.getScreenWidth()/Utils.FOUR-28, ctx.getScreenHeight()/Utils.FOUR-102, 24, 70, ">", function() {
        
    }, true, false);
    mainLayout.addView(right);
    
    mainPw.setContentView(mainLayout);
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
    Options.MAINPW[Trade.CUR_LANG] = mainPw;
    Options.DIRT[Trade.CUR_LANG] = dirt;
};

Options.showScreen = function() {
    Utils.createUiThread(function(ctx) {
        if(Options.Options.OPTIONS)
            Options.DIRT[Trade.CUR_LANG].setVisibility(android.view.View.GONE);
        Options.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

NoInternet = {};

NoInternet.MAINPW = {};
NoInternet.DIRT = {};

NoInternet.init = function() {
    var ctx = Utils.getContext();
    var mainPw = new android.widget.PopupWindow(ctx);
    var mainLayout = new android.widget.RelativeLayout(ctx);
    
    var back = Utils.showBackground();
    mainLayout.addView(back);
    var dirt = Utils.showBackground("dirt");
    mainLayout.addView(dirt);
    var ok = Utils.showButton((ctx.getScreenWidth()/Utils.FOUR-100)/2, 100, 100, 24, R.string.yes, function() {
        mainPw.dismiss();
    }, true, false);
    mainLayout.addView(ok);
    var text = Utils.justText(R.string.no_internet, 0, 60, ctx.getScreenWidth()/Utils.FOUR);
    mainLayout.addView(text);
    
    mainPw.setContentView(mainLayout);
    mainPw.setWidth(ctx.getScreenWidth());
    mainPw.setHeight(ctx.getScreenHeight());
    mainPw.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(144, 0, 0, 0)));
    NoInternet.MAINPW[Trade.CUR_LANG] = mainPw;
    NoInternet.DIRT[Trade.CUR_LANG] = dirt;
    Init.INITIALIZING = true;
};

NoInternet.showScreen = function() {
    Utils.createUiThread(function(ctx) {
        if(Options.Options.NOINTERNET)
            NoInternet.DIRT[Trade.CUR_LANG].setVisibility(android.view.View.GONE);
        NoInternet.MAINPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
    });
};

Utils = {};

Utils.getContext = function() {
    return com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
};

Utils.createUiThread = function(func) {
    Utils.getContext().runOnUiThread(new java.lang.Runnable({
        run: function() {
            func(Utils.getContext());
        }
    }));
};

Utils.FOUR = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 2, Utils.getContext().getResources().getDisplayMetrics());

Utils.hasFontFile = function() {
    return new java.io.File("/sdcard/Affogatoman/font.ttf").exists();
};

Utils.getMyScriptName = function() {
    var scripts = net.zhuoweizhang.mcpelauncher.ScriptManager.scripts;
    for(var i = 0; i < scripts.size(); i++) {
        var script = scripts.get(i);
        var scope = script.scope;
        if(org.mozilla.javascript.ScriptableObject.hasProperty(scope, "Trade") && org.mozilla.javascript.ScriptableObject.hasProperty(scope, "Utils") && org.mozilla.javascript.ScriptableObject.hasProperty(scope, "Help"))
            return script.name;
	}
};

Utils.downloadFontFile = function() {
    if(Utils.hasFontFile())
        return;
    else {
        var url = new java.net.URL("https://www.dropbox.com/s/ky1nj2pms00vb5t/font.ttf?dl=1").openConnection().getInputStream();
        var bis = new java.io.BufferedInputStream(url);
        var target = new java.io.File("/sdcard/Affogatoman/font.ttf");
        target.getParentFile().mkdirs();
        var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(target));
        var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
        var read = 0;
        while((read = bis.read(buf)) >= 0)
            bos.write(buf, 0, read);
        bis.close();
        bos.close();
    }
};

Utils.getTypeface = function() {
    return android.graphics.Typeface.createFromFile("/sdcard/Affogatoman/font.ttf");
};

Utils.getSpritesheet = function() {
    return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/spritesheet.png"));
};

Utils.getTouchgui = function() {
    return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/touchgui.png"));
};

Utils.getGui = function() {
    return android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/gui.png"));
};

Utils.trimImage = function(bitmap, x, y, width, height) {
    return android.graphics.Bitmap.createBitmap(bitmap, x, y, width, height);
};

Utils.plusPage = function(view) {
    var type = Utils.getVillagerType(Trade.SELLER);
    if(Trade.PAGE != Trade.Items[type].id.length-1)
        Trade.PAGE++;
};

Utils.minusPage = function(view) {
    if(Trade.PAGE != 0)
        Trade.PAGE--;
};

Utils.drawRect = function(x, y, width, height, color) {
    var view = new android.view.View(Utils.getContext());
    var params = new android.widget.RelativeLayout.LayoutParams(width*Utils.FOUR, height*Utils.FOUR);
    params.setMargins(x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    view.setLayoutParams(params);
    view.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.parseColor(color)));
    return view;
};

Utils.getStretchedImage = function(bm, x, y, stretchWidth, stretchHeight, width, height) {
    var blank = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
    var Bitmap = android.graphics.Bitmap;
    var part1 = Bitmap.createBitmap(bm, 0, 0, x, y);
    var part2 = Bitmap.createBitmap(bm, x, 0, stretchWidth, y);
    var part3 = Bitmap.createBitmap(bm, x+stretchWidth, 0, bm.getWidth()-x-stretchWidth, y);
    var part4 = Bitmap.createBitmap(bm, 0, y, x, stretchHeight);
    var part5 = Bitmap.createBitmap(bm, x, y, stretchWidth, stretchHeight);
    var part6 = Bitmap.createBitmap(bm, x+stretchWidth, y, bm.getWidth()-x-stretchWidth, stretchHeight);
    var part7 = Bitmap.createBitmap(bm, 0, y+stretchHeight, x, bm.getHeight()-y-stretchHeight);
    var part8 = Bitmap.createBitmap(bm, x, y+stretchHeight, stretchWidth, bm.getHeight()-y-stretchHeight);
    var part9 = Bitmap.createBitmap(bm, x+stretchWidth, y+stretchHeight, bm.getWidth()-x-stretchWidth, bm.getHeight()-y-stretchHeight);
    var canvas = new android.graphics.Canvas(blank);
    canvas.drawBitmap(part1, 0, 0, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part2, width-bm.getWidth()+stretchWidth, y, false), x, 0, null);
    canvas.drawBitmap(part3, width-bm.getWidth()+stretchWidth+x, 0, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part4, x, height-bm.getHeight()+stretchHeight, false), 0, y, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part5, width-bm.getWidth()+stretchWidth, height-bm.getHeight()+stretchHeight, false), x, y, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part6, part3.getWidth(), height-bm.getHeight()+stretchHeight, false), width-bm.getWidth()+stretchWidth+x, y, null);
    canvas.drawBitmap(part7, 0, height-bm.getHeight()+stretchHeight+y, null);
    canvas.drawBitmap(Bitmap.createScaledBitmap(part8, width-bm.getWidth()+stretchWidth, part7.getHeight(), false), x, height-bm.getHeight()+stretchHeight+y, null);
    canvas.drawBitmap(part9, width-bm.getWidth()+stretchWidth+x, height-bm.getHeight()+stretchHeight+y, null);

    return new android.graphics.drawable.BitmapDrawable(blank);
};

Utils.showBackground = function(type, x, y, width, height) {
    var back = new android.view.View(Utils.getContext());
    x = x == null ? 0 : x*Utils.FOUR;
    y = y == null ? 0 : y*Utils.FOUR;
    width = width == null ? Utils.getContext().getScreenWidth() : width*Utils.FOUR;
    height = height == null ? Utils.getContext().getScreenHeight() : height*Utils.FOUR;
    var params = new android.widget.RelativeLayout.LayoutParams(width, height);
    params.setMargins(x, y, 0, 0);
    back.setLayoutParams(params);
    if(type == null) {
        var spritesheet = android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 0, 0, 16, 16), 16*Utils.FOUR, 16*Utils.FOUR, false);
        back.setBackgroundDrawable(Utils.getStretchedImage(spritesheet, 4*Utils.FOUR, 4*Utils.FOUR, 8*Utils.FOUR, 8*Utils.FOUR, Utils.getContext().getScreenWidth(), Utils.getContext().getScreenHeight()));
    } else if(type == "dirt") {
        var image = new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/gui/background.png")), 32*Utils.FOUR, 32*Utils.FOUR, false));
        image.setColorFilter(android.graphics.Color.rgb(70, 70, 70), android.graphics.PorterDuff.Mode.MULTIPLY);
        image.setTileModeXY(android.graphics.Shader.TileMode.REPEAT, android.graphics.Shader.TileMode.REPEAT);
        back.setBackgroundDrawable(image);
    }
    return back;
};

Utils.showHeader = function(text, width) {
    text = Lang.getData(text);
    var ctx = Utils.getContext();
    width = width == null ? ctx.getScreenWidth() : width*Utils.FOUR;
    var vert = new android.widget.LinearLayout(ctx);
    vert.setOrientation(android.widget.LinearLayout.VERTICAL);
    var horiz = new android.widget.LinearLayout(ctx);
    horiz.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var left = new android.view.View(ctx);
    var header = Utils.trimImage(Utils.getTouchgui(), 150, 26, 14, 29);
    left.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 0, 0, 2, 25), Utils.FOUR*2, Utils.FOUR*25, false)));
    left.setLayoutParams(new android.widget.LinearLayout.LayoutParams(Utils.FOUR*2, Utils.FOUR*25));
    horiz.addView(left);
    var center = new android.widget.TextView(ctx);
    center.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
    center.setTypeface(Utils.getTypeface());
    center.setGravity(android.view.Gravity.CENTER);
    center.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, 8*Utils.FOUR);
    center.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
    if(Utils.hasNonAscii(text))
        text = Utils.getStringBuilder(text, "#e1e1e1")[0];
    center.setText(text);
    center.setShadowLayer(0.00001, Utils.FOUR, Utils.FOUR, android.graphics.Color.DKGRAY);
    center.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 3, 0, 8, 25), width-Utils.FOUR*4, Utils.FOUR*25, false)));
    center.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width-Utils.FOUR*4, Utils.FOUR*25));
    horiz.addView(center);
    var right = new android.view.View(ctx);
    right.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 12, 0, 2, 25), Utils.FOUR*2, Utils.FOUR*25, false)));
    right.setLayoutParams(new android.widget.LinearLayout.LayoutParams(Utils.FOUR*2, Utils.FOUR*25));
    horiz.addView(right);
    vert.addView(horiz);
    var down = new android.view.View(ctx);
    down.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(header, 3, 26, 8, 3), width, Utils.FOUR*3, false)));
    down.setLayoutParams(new android.widget.LinearLayout.LayoutParams(width, Utils.FOUR*3));
    vert.addView(down);
    vert.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(width, 28*Utils.FOUR));
    return [vert, text];
};

Utils.showButton = function(x, y, width, height, text, onclick, isWidthLocked, isRight) {
    text = Lang.getData(text);
    var ctx = Utils.getContext();
    var button = new android.widget.Button(ctx);
    if(Utils.hasNonAscii(text))
        button.setPadding(0, 0, 0, 0);
    else
        button.setPadding(0, 0, 0, Utils.FOUR);
    button.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
    if(Utils.hasNonAscii(text)) {
        var builder = Utils.getStringBuilder(text, "#e1e1e1");
        var unclicked = builder[0];
        button.setText(unclicked);
        var clicked = Utils.getStringBuilder(text, "#ffffa1")[0];
    } else
        button.setText(text);
    if(isWidthLocked != true)
        var new_width = Utils.hasNonAscii(text) ? builder[1] : Utils.getStringLength(text);
    var params = new android.widget.RelativeLayout.LayoutParams(isWidthLocked == true ? width*Utils.FOUR : new_width, height*Utils.FOUR);
    params.setMargins(isRight == true ? (x+width)*Utils.FOUR-new_width : x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    button.setLayoutParams(params);
    var clicked_image = Utils.getStretchedImage(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 0, 32, 8, 8), 8*Utils.FOUR, 8*Utils.FOUR, false), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 4*Utils.FOUR, isWidthLocked ? width*Utils.FOUR : new_width, height*Utils.FOUR);
    var unclicked_image = Utils.getStretchedImage(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 8, 32, 8, 8), 8*Utils.FOUR, 8*Utils.FOUR, false), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 4*Utils.FOUR, isWidthLocked ? width*Utils.FOUR : new_width, height*Utils.FOUR);
    button.setBackgroundDrawable(unclicked_image);
    button.setTypeface(Utils.getTypeface());
    button.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
    button.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, 8*Utils.FOUR);
    if(text.indexOf("\n") < 0)
        button.setSingleLine(true);
    var current = false;
    button.setOnTouchListener(new android.view.View.OnTouchListener({
        onTouch: function(view, event) {
            if(!view.isClickable()) {
                if(!(event.getX() < 0 || event.getY() <0 || event.getX() > (isWidthLocked == true ? width*Utils.FOUR : new_width)|| event.getY() > height*Utils.FOUR)) {
                    if(event.getAction() == android.view.MotionEvent.ACTION_UP)
                        Utils.clickSound();
                }
                return true;
            }
            switch(event.getAction()) {
                case android.view.MotionEvent.ACTION_DOWN:
                    view.setTextColor(android.graphics.Color.parseColor("#ffffa1"));
                    if(Utils.hasNonAscii(text))
                        view.setPadding(0, 2*Utils.FOUR, 0, 0);
                    else
                        view.setPadding(0, Utils.FOUR, 0, 0);
                    view.setBackgroundDrawable(clicked_image);
                    if(Utils.hasNonAscii(text))
                        button.setText(clicked);
                    break;
                case android.view.MotionEvent.ACTION_MOVE:
                    if(event.getX() < 0 || event.getY() <0 || event.getX() > (isWidthLocked == true ? width*Utils.FOUR : new_width) || event.getY() > height*Utils.FOUR) {
                        view.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
                        if(Utils.hasNonAscii(text))
                            view.setPadding(0, 0, 0, 0);
                        else
                            view.setPadding(0, 0, 0, Utils.FOUR);
                        view.setBackgroundDrawable(unclicked_image);
                        if(Utils.hasNonAscii(text))
                            button.setText(unclicked);
                        current = true;
                    } else if(!current) {
                        if(Utils.hasNonAscii(text))
                            button.setText(clicked);
                        view.setTextColor(android.graphics.Color.parseColor("#ffffa1"));
                        if(Utils.hasNonAscii(text))
                            view.setPadding(0, 2*Utils.FOUR, 0, 0);
                        else
                            view.setPadding(0, Utils.FOUR, 0, 0);
                        view.setBackgroundDrawable(clicked_image);
                    }
                    break;
                case android.view.MotionEvent.ACTION_UP:
                    view.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
                    if(Utils.hasNonAscii(text))
                        view.setPadding(0, 0, 0, 0);
                    else
                        view.setPadding(0, 0, 0, Utils.FOUR);
                    view.setBackgroundDrawable(unclicked_image);
                    if(Utils.hasNonAscii(text))
                        view.setText(unclicked);
                    if(current == false && !(event.getX() < 0 || event.getY() <0 || event.getX() > (isWidthLocked == true ? width*Utils.FOUR : new_width) || event.getY() > height*Utils.FOUR)) {
                        if(typeof onclick === "function")
                            onclick(button);
                            Utils.clickSound();
                    }
                    current = false;
                    break;
            }
            return false;
        }
    }));
    button.setShadowLayer(0.00001, Utils.FOUR, Utils.FOUR, android.graphics.Color.DKGRAY);
    return button;
};

Utils.showImageButton = function(x, y, width, height, image, onclick) {
    var ctx = Utils.getContext();
    var layout = new android.widget.RelativeLayout(ctx);
    var params = new android.widget.RelativeLayout.LayoutParams(width*Utils.FOUR, height*Utils.FOUR);
    params.setMargins(x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    layout.setLayoutParams(params);
    
    var clicked_back = Utils.getStretchedImage(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 120, 0, 8, 67), 8*Utils.FOUR, 67*Utils.FOUR, false), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 63*Utils.FOUR, width*Utils.FOUR, height*Utils.FOUR);
    var unclicked_back = Utils.getStretchedImage(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getSpritesheet(), 112, 0, 8, 67), 8*Utils.FOUR, 67*Utils.FOUR, false), 2*Utils.FOUR, 2*Utils.FOUR, 4*Utils.FOUR, 63*Utils.FOUR, width*Utils.FOUR, height*Utils.FOUR);
    var button = new android.widget.Button(ctx);
    button.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(width*Utils.FOUR, height*Utils.FOUR));
    button.setBackgroundDrawable(unclicked_back);
    layout.addView(button);
    
    if(image == "image.edit") {
        var clicked_image = android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getGui(), 182, 21, 11, 11), 10.5*Utils.FOUR, 10.5*Utils.FOUR, false);
        var unclicked_image = android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getGui(), 182, 21, 11, 11), 11*Utils.FOUR, 11*Utils.FOUR, false);
    }
    var imagev = new android.widget.ImageView(ctx);
    imagev.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(width*Utils.FOUR, height*Utils.FOUR));
    layout.addView(imagev);
    imagev.setScaleType(android.widget.ImageView.ScaleType.CENTER);
    imagev.setImageBitmap(unclicked_image);
    imagev.setClickable(true);
    var current = false;
    imagev.setOnTouchListener(new android.view.View.OnTouchListener({
        onTouch: function(view, event) {
            switch(event.getAction()) {
                case android.view.MotionEvent.ACTION_DOWN:
                    button.setBackgroundDrawable(clicked_back);
                    imagev.setImageBitmap(clicked_image);
                    break;
                case android.view.MotionEvent.ACTION_MOVE:
                    if(event.getX() < 0 || event.getY() <0 || event.getX() > width*Utils.FOUR || event.getY() > height*Utils.FOUR) {
                        button.setBackgroundDrawable(unclicked_back);
                        imagev.setImageBitmap(unclicked_image);
                        current = true;
                    } else if(!current) {
                        button.setBackgroundDrawable(clicked_back);
                        imagev.setImageBitmap(clicked_image);
                    }
                    break;
                case android.view.MotionEvent.ACTION_UP:
                    button.setBackgroundDrawable(unclicked_back);
                    imagev.setImageBitmap(unclicked_image);
                    if(current == false && !(event.getX() < 0 || event.getY() <0 || event.getX() > width*Utils.FOUR || event.getY() > height*Utils.FOUR)) {
                        if(typeof onclick === "function")
                            onclick(button);
                            Utils.clickSound();
                    }
                    current = false;
                    break;
            }
            return false;
        }
    }));
    
    return layout;
};

Utils.renderItem = function(name, data, x, y, scale) {
    var item = Utils.getItemImage(name, data);
    item = android.graphics.Bitmap.createScaledBitmap(item, item.getWidth()*Utils.FOUR*scale, item.getHeight()*Utils.FOUR*scale, false);
    var view = new android.view.View(Utils.getContext());
    view.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(item));
    var params = new android.widget.RelativeLayout.LayoutParams(item.getWidth(), item.getHeight());
    params.setMargins(x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    view.setLayoutParams(params);
    return view;
};

Utils.showItemBackground = function(x, y) {
    var view = new android.widget.ImageView(Utils.getContext());
    view.setScaleType(android.widget.ImageView.ScaleType.CENTER);
    var params = new android.widget.RelativeLayout.LayoutParams(40*Utils.FOUR, 40*Utils.FOUR);
    params.setMargins(x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    view.setLayoutParams(params);
    view.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getGui(), Utils.getGui().getWidth()*0.78125, Utils.getGui().getHeight()*0.1796875, Utils.getGui().getWidth()*0.0625, Utils.getGui().getWidth()*0.0625), 40*Utils.FOUR, 40*Utils.FOUR, false)));
    return view;
};

Utils.justText = function(str, x, y, width) {
    str = Lang.getData(str);
    var text = new android.widget.TextView(Utils.getContext());
    text.setLineSpacing(Utils.FOUR, 1);
    text.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
    var params;
    if(typeof width === "number")
        params = new android.widget.RelativeLayout.LayoutParams(width*Utils.FOUR, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
    else
        params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
    params.setMargins(x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    text.setLayoutParams(params);
    text.setText(Utils.hasNonAscii(str) ? Utils.getStringBuilder(str, "#e1e1e1")[0] : str);
    text.setGravity(android.view.Gravity.CENTER);
    text.setTypeface(Utils.getTypeface());
    text.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
    text.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, 8*Utils.FOUR);
    text.setShadowLayer(0.00001, Utils.FOUR, Utils.FOUR, android.graphics.Color.DKGRAY);
    return text;
};

Utils.renderArrow = function(x, y) {
    var w = android.graphics.Color.WHITE;
    var b = android.graphics.Color.parseColor("#23000000");
    var pixels = [0,0,0,0,0,0,0,0,0,0,0,0,w,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,w,w,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,w,w,w,0,
                  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
                  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
                  b,b,b,b,b,b,b,b,b,b,b,b,w,w,w,b,
                  0,0,0,0,0,0,0,0,0,0,0,0,w,w,b,0,
                  0,0,0,w,0,0,0,0,0,0,0,0,w,b,0,0,
                  0,0,w,w,0,0,0,0,0,0,0,0,b,0,0,0,
                  0,w,w,w,0,0,0,0,0,0,0,0,0,0,0,0,
                  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
                  w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,
                  b,w,w,w,b,b,b,b,b,b,b,b,b,b,b,b,
                  0,b,w,w,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,b,w,0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0];
    var bitmap = android.graphics.Bitmap.createBitmap(pixels, 0, 16, 16, 16, android.graphics.Bitmap.Config.ARGB_8888);
    var view = new android.view.View(Utils.getContext());
    var params = new android.widget.RelativeLayout.LayoutParams(16*Utils.FOUR, 16*Utils.FOUR);
    params.setMargins(x*Utils.FOUR, y*Utils.FOUR, 0, 0);
    view.setLayoutParams(params);
    var drawable = new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(bitmap, 16*Utils.FOUR, 16*Utils.FOUR, false));
    view.setBackgroundDrawable(drawable);
    view.setOnLongClickListener(new android.view.View.OnLongClickListener({
        onLongClick: function() {
            Utils.createUiThread(function() {
                view.setBackgroundDrawable(Easter.DRAWABLE);
                Easter.DRAWABLE.start();
            });
            new android.os.Handler().postDelayed(new java.lang.Runnable({
                run: function() {
                    view.setBackgroundDrawable(drawable);
                    Easter.DRAWABLE.stop();
                }
            }), 1200);
            return true;
        }
    }));
    return view;
};

Utils.getItemImage = function(text, data) {
    var items = android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/items-opaque.png"));
    var uvs = Trade.META[Trade.META_MAPPED.indexOf(text)].uvs[data];
    return android.graphics.Bitmap.createBitmap(items, uvs[0]*items.getWidth(), uvs[1]*items.getHeight(), uvs[2]*items.getWidth()-uvs[0]*items.getWidth(), uvs[3]*items.getHeight()-uvs[1]*items.getHeight());
};

Utils.updateTradeList = function(namev, itemv, costv, countv) {
    var page = Trade.PAGE;
    var type = Utils.getVillagerType(Trade.SELLER);
    var name = Trade.Items[type].name[page];
    if(Utils.hasNonAscii(Lang.getData(name)))
        namev.setText(Utils.getStringBuilder(Lang.getData(name), "#e1e1e1")[0]);
    else
        namev.setText(Lang.getData(name));
    var item = Utils.getItemImage(Trade.Items[type].meta[page][0], Trade.Items[type].meta[page][1]);
    itemv.setImageBitmap(android.graphics.Bitmap.createScaledBitmap(item, 16*Utils.FOUR*1.6, 16*Utils.FOUR*1.6, false));
    costv.setText(""+Trade.Items[type].cost[page]);
    countv.setText(""+Trade.Items[type].count[page]);
};

Utils.getAllItems = function(id, dam) {
    var result = 0;
    for(var i = 9; i <= 44; i++) {
        if(Player.getInventorySlot(i) === id && Player.getInventorySlotData(i) === dam)
            result+=Player.getInventorySlotCount(i);
    }
    return result;
};

Utils.buyThing = function() {
    var type = Utils.getVillagerType(Trade.SELLER);
    if(Trade.EME_COUNT >= Trade.Items[type].cost[Trade.PAGE]) {
        Trade.EME_COUNT-=Trade.Items[type].cost[Trade.PAGE];
        Utils.addItemInventory(388, -Trade.Items[type].cost[Trade.PAGE], 0);
        Utils.addItemInventory(Trade.Items[type].id[Trade.PAGE], Trade.Items[type].count[Trade.PAGE], Trade.Items[type].dam[Trade.PAGE]);
    } else {
        if(Utils.isWarning())
            Trade.WARNING_TOAST.cancel();
        Trade.WARNING_TOAST = new Utils.warn(R.string.not_enough_emerald);
        Trade.WARNING_TOAST.show();
    }
};

Utils.warn = function(txt) {
    var that = this;
    Utils.createUiThread(function(ctx) {
        var text = new android.widget.TextView(ctx);
        text.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
        txt = Lang.getData(txt);
        if(Utils.hasNonAscii(txt))
            text.setText(Utils.getStringBuilder(txt, "#ff0000", 1.5, "#410000")[0]);
        else
            text.setText(txt);
        text.setGravity(android.view.Gravity.CENTER);
        text.setSingleLine(true);
        text.setLineSpacing(Utils.FOUR*1.5, 1);
        text.setTypeface(Utils.getTypeface());
        text.setShadowLayer(0.00001, 1.5*Utils.FOUR, 1.5*Utils.FOUR, android.graphics.Color.parseColor("#410000"));
        text.setTextColor(android.graphics.Color.RED);
        text.setTextSize(6*4);
        var fade_in = new android.view.animation.AlphaAnimation(0, 1);
        fade_in.setDuration(180);
        
        var toast = new android.widget.PopupWindow(ctx);
        toast.setContentView(text);
        toast.setWidth(ctx.getScreenWidth());
        toast.setHeight(Utils.hasNonAscii(txt) ? 27*Utils.FOUR : 18*Utils.FOUR);
        toast.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
        that.isShowing = function() {
            return toast.isShowing();
        };
        that.show = function() {
            toast.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.TOP, 0, 32*Utils.FOUR);
            text.startAnimation(fade_in);
            new android.os.Handler().postDelayed(new java.lang.Runnable({
                run: function() {
                    that.cancel();
                }
            }), 1000);
        };
        that.cancel = function() {
            Utils.createUiThread(function() {
                var fade_out = new android.view.animation.AlphaAnimation(1, 0);
                fade_out.setDuration(180);
                text.startAnimation(fade_out);
                new android.os.Handler().postDelayed(new java.lang.Runnable({
                    run: function() {
                        toast.dismiss();
                    }
                }), 180);
            });
        };
    });
};

Utils.sellThing = function() {
    var type = Utils.getVillagerType(Trade.SELLER);
    var counts = Utils.getAllItems(Trade.Items[type].id[Trade.PAGE], Trade.Items[type].dam[Trade.PAGE]);
    if(counts >= Trade.Items[type].count[Trade.PAGE]) {
        Utils.addItemInventory(388, Trade.Items[type].cost[Trade.PAGE], 0);
        Utils.addItemInventory(Trade.Items[type].id[Trade.PAGE], -Trade.Items[type].count[Trade.PAGE], Trade.Items[type].dam[Trade.PAGE]);
    } else {
        if(Utils.isWarning())
            Trade.WARNING_TOAST.cancel();
        Trade.WARNING_TOAST = new Utils.warn(R.string.not_enough_item);
        Trade.WARNING_TOAST.show();
    }
};

Utils.addItemInventory = function(id, count, dam) {
    if(count >= 0)
        addItemInventory(id, count, dam);
    else {
        var c = -count;
        
        for(var i = 9; i <= 44; i++) {
            var sid = Player.getInventorySlot(i);
            var scount = Player.getInventorySlotCount(i);
            var sdam = Player.getInventorySlotData(i);
            if(sid == id && sdam == dam) {
                if(scount > c) {
                    Player.setInventorySlot(i, sid, scount-c, dam);
                    c = 0;
                } else {
                    Player.clearInventorySlot(i);
                    c-=scount;
                }
            }
            if(c == 0)
                break;
        }
    }
};

CachedString = {};

Utils.getStringBuilder = function(text, color, scale, shadowc, shadow) {
    if(color != null)
        color = android.graphics.Color.parseColor(color);
    if(CachedString[color+text] != null)
        return CachedString[color+text];
        
    if(scale == null)
        scale = 1;
    if(shadowc == null)
        shadowc = android.graphics.Color.DKGRAY;
    else
        shadowc = android.graphics.Color.parseColor(shadowc);
    var divide = function(a) {
        var b = 0;
        if (a > 256)
            b = a % 256;
        else
            b = a;
        return [b, Math.floor(a / 256)];    
    };
    var width = 0;
    var builder = new android.text.SpannableStringBuilder(text);
    for(var i = 0; i < text.length; i++) {
        if(text.charAt(i) == " ") {
            var bitmap = android.graphics.Bitmap.createBitmap(5*Utils.FOUR, scale*9*Utils.FOUR, android.graphics.Bitmap.Config.ARGB_8888);
            builder.setSpan(new android.text.style.ImageSpan(Utils.getContext(), bitmap), i, i+1, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
            width+=5*Utils.FOUR;
            continue;
        }
        var d = divide(text.charCodeAt(i));
        var x = ((parseInt(d[0], 10) % 16)) * 16;
        var y = Math.floor(parseInt(d[0], 10) / 16) * 16;
        var num = parseInt(d[1], 10).toString(16).toUpperCase();
        if(num.length < 2)
            num = "0"+num;
        var font = android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack("images/font/glyph_"+num+".png"));
        var bitmap = Utils.trimImage(font, x, y, 15, 16);
        if(!Utils.hasNonAscii(text.charAt(i)) || (Trade.CUR_LANG != "ko_KR" && Trade.CUR_LANG != "ja_JP" && Trade.CUR_LANG != "zh_CN"))
            bitmap = Utils.cutText(bitmap);
        var result = android.graphics.Bitmap.createBitmap(bitmap.getWidth()+2, 18, android.graphics.Bitmap.Config.ARGB_8888);
        var canvas = new android.graphics.Canvas(result);
        var p = new android.graphics.Paint();
        var p2 = new android.graphics.Paint();
        if(shadow || shadow == null) {
            p.setColorFilter(new android.graphics.PorterDuffColorFilter(shadowc, android.graphics.PorterDuff.Mode.MULTIPLY));
            canvas.drawBitmap(bitmap, 2, 2, p);
        }
        p2.setColorFilter(new android.graphics.PorterDuffColorFilter(color, android.graphics.PorterDuff.Mode.MULTIPLY));
        canvas.drawBitmap(bitmap, 0, 0, p2);
        var bitmap = android.graphics.Bitmap.createScaledBitmap(result, scale*((bitmap.getWidth()+2)/2)*Utils.FOUR, scale*9*Utils.FOUR, false);
        builder.setSpan(new android.text.style.ImageSpan(Utils.getContext(), bitmap), i, i+1, android.text.Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);
        width+=bitmap.getWidth();
    }
    CachedString[color+text] = [builder, width+11*Utils.FOUR];
    return [builder, width+11*Utils.FOUR];
};

Utils.cutText = function(bitmap) {
    var start = -1, end = 0;
    var Color = android.graphics.Color;
    for(var i = 0; i < bitmap.getWidth(); i++) {
        if(Color.alpha(bitmap.getPixel(i, 0))>0 ||
           Color.alpha(bitmap.getPixel(i, 1))>0 ||
           Color.alpha(bitmap.getPixel(i, 2))>0 ||
           Color.alpha(bitmap.getPixel(i, 3))>0 ||
           Color.alpha(bitmap.getPixel(i, 4))>0 ||
           Color.alpha(bitmap.getPixel(i, 5))>0 ||
           Color.alpha(bitmap.getPixel(i, 6))>0 ||
           Color.alpha(bitmap.getPixel(i, 7))>0 ||
           Color.alpha(bitmap.getPixel(i, 8))>0 ||
           Color.alpha(bitmap.getPixel(i, 9))>0 ||
           Color.alpha(bitmap.getPixel(i, 10))>0 ||
           Color.alpha(bitmap.getPixel(i, 11))>0 ||
           Color.alpha(bitmap.getPixel(i, 12))>0 ||
           Color.alpha(bitmap.getPixel(i, 13))>0 ||
           Color.alpha(bitmap.getPixel(i, 14))>0 ||
           Color.alpha(bitmap.getPixel(i, 15))>0) {
               if(start == -1)
                   start = i;
         } else if(start != -1) {
             end = i;
             break;
         }
    }
	return android.graphics.Bitmap.createBitmap(bitmap, start, 0, end-start+1, bitmap.getHeight());
};

Utils.hasNonAscii = function(str) {
    return str.split("").some(function(e) {
        return e.charCodeAt(0) > 255;
    });
};

Utils.interactInit = function() {
    var text = new android.widget.TextView(Utils.getContext());
    if(Utils.hasNonAscii(Lang.getData(R.string.trade)))
        var txt = " "+Lang.getData(R.string.trade)+" ";
    else
        var txt = Lang.getData(R.string.trade);
    if(Utils.hasNonAscii(txt))
        txt = Utils.getStringBuilder(txt, "#e1e1e1", null, null, false)[0];
    text.setText(txt);
    text.setSingleLine(true);
    text.setGravity(android.view.Gravity.CENTER);
    text.setTypeface(Utils.getTypeface());
    text.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
    text.setTextSize(android.util.TypedValue.COMPLEX_UNIT_PX, 8*Utils.FOUR);
    text.setOnClickListener(new android.view.View.OnClickListener({
        onClick: function() {
            Trade.showScreen();
        }
    }));
    var drawable = new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(Utils.trimImage(Utils.getGui(), 0, Utils.getGui().getHeight()*0.640625, Utils.getGui().getWidth()*0.4609375, Utils.getGui().getHeight()*0.078125), 118*0.75*Utils.FOUR, 20*Utils.FOUR, false));
    drawable.setAlpha(180);
    var pw = new android.widget.PopupWindow(Utils.getContext());
    pw.setContentView(text);
    pw.setWidth(50*Utils.FOUR);
    pw.setHeight(20*Utils.FOUR);
    pw.setBackgroundDrawable(drawable);
    Trade.INTERACTPW[Trade.CUR_LANG] = pw;
};

Utils.showInteractPw = function() {
    if(Trade.MAINPW[Trade.CUR_LANG].isShowing())
        return;
    Utils.createUiThread(function(ctx) {
        Trade.INTERACTPW[Trade.CUR_LANG].showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.BOTTOM, 0, 24*Utils.FOUR);
    });
};

Utils.getVillagerType = function(ent) {
    var path = Entity.getMobSkin(ent);
    return path.substring(path.lastIndexOf("/")+1, path.length-4);
};

Utils.clickSound = function() {
    Level.playSound(getPlayerX(), getPlayerY(), getPlayerZ(), "random.click", 7 ,7);
};

Utils.setButtonClickable = function(view, bool) {
    view.setClickable(bool);
    if(bool) {
        view.setTextColor(android.graphics.Color.parseColor("#e1e1e1"));
    } else {
        view.setTextColor(android.graphics.Color.parseColor("#9c9c9c"));
    }
};

Utils.isWarning = function() {
    return Trade.WARNING_TOAST != null && Trade.WARNING_TOAST.isShowing();
};

Utils.getCurrentLanguage = function() {
    var file = new java.io.File("/sdcard/games/com.mojang/minecraftpe/options.txt");
    var br = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file)));
    var read, lang;
    while((read = br.readLine()) != null) {
        if(read.split(":")[0] == "game_language") {
            lang = read.split(":")[1];
            break;
        }
    }
    br.close();
    return lang;
};

Utils.getStringFor = function(key) {
    if(key["all"] != null)
        return key["all"];
    var data = key[Trade.CUR_LANG];
    return data == null ? key["en_US"] : data;
};

Utils.getStringLength = function(text) {
    var lengths = [0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
                   8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,
                   4,1,4,5,5,5,5,2,4,4,4,5,1,5,1,5,
                   5,5,5,5,5,5,5,5,5,5,1,1,4,5,4,5,
                   6,5,5,5,5,5,5,5,5,3,5,5,5,5,5,5,
                   5,5,5,5,5,5,5,5,5,5,5,3,5,3,5,5,
                   2,5,5,5,5,5,4,5,5,1,5,4,2,5,5,5,
                   5,5,5,5,3,5,5,5,5,5,5,4,1,4,6,5,
                   5,5,5,5,5,5,5,5,5,5,5,3,5,2,5,5,
                   5,5,5,5,5,5,5,5,5,5,5,5,5,7,3,5,
                   5,1,5,5,5,5,5,5,5,6,5,5,5,1,6,5,
                   8,8,8,5,5,5,7,7,5,7,5,5,5,5,5,5,
                   8,8,8,8,5,5,5,5,8,5,8,8,8,8,8,8,
                   8,5,8,8,8,8,5,3,7,5,8,8,5,4,8,8,
                   5,5,5,7,5,5,5,5,5,5,5,5,2,2,5,3,
                   6,5,5,5,5,5,5,7,5,5,5,5,5,4,6,5];
    var result = 0;
    for(var i = 0; i < text.length; i++)
        result+=(lengths[text.charCodeAt(i)]+1)*Utils.FOUR;
    return result+11*Utils.FOUR;
};

var Lang = {};

Lang.Strings = {};

Lang.getPath = function() {
    return "lang/pc-base/"+Utils.getCurrentLanguage()+".lang";
};

Lang.readLang = function() {
    var lang = new java.lang.String(ModPE.getBytesFromTexturePack(Lang.getPath()))+"";
    lang.split(/\r?\n/).forEach(function(e) {
        var a = e.split("=");
        Lang.Strings[Trade.CUR_LANG][a[0]] = a[1];
    });
};

Lang.getData = function(key) {
    if(typeof key === "object")
        key = Utils.getStringFor(key);
    var data = Lang.Strings[Trade.CUR_LANG][key];
    if(typeof data === "undefined")
        return key;
    return data;
};

var Easter = {};

Easter.DRAWABLE = null;

Easter.init = function() {
    var records = ["11", "13", "blocks", "cat", "chirp", "far", "mall", "mellohi", "stal", "strad", "wait", "ward"];
    var drawable = new android.graphics.drawable.AnimationDrawable();
    drawable.setOneShot(true);
    for(var i = 0; i < 12; i++) {
        var bm = Utils.getItemImage("record_"+records[i], 0);
        drawable.addFrame(new android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(bm, bm.getWidth()*Utils.FOUR, bm.getHeight()*Utils.FOUR, false)), 100);
    }
    Easter.DRAWABLE = drawable;
};

Easter.goToURL = function(url) {
    var ctx = Utils.getContext();
    var uri = android.net.Uri.parse(url);
    var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
    ctx.startActivity(intent);
};

Init = {};

Init.INITIALIZING = false;

Player.setInventorySlot = Player.setInventorySlot || function(slot, id, count, dam) {
    net.zhuoweizhang.mcpelauncher.ScriptManager.nativeSetInventorySlot(slot, id, count, dam);
};





function modTick() {
    if(Lang.Strings[Trade.CUR_LANG] == null) {
        Lang.Strings[Trade.CUR_LANG] = {};
        Lang.readLang();
    }
    if(Loading.MAINPW[Trade.CUR_LANG] == null) {
        Loading.MAINPW[Trade.CUR_LANG] = 0;
        Loading.init();
        Loading.showScreen();
    }
    if(Trade.META == null)
        eval("Trade.META = "+new java.lang.String(ModPE.getBytesFromTexturePack("images/items.meta"))+";");
    if(Trade.META_MAPPED == null)
        Trade.META_MAPPED = Trade.META.map(function(e) {
            return e.name;
        });
    if(Easter.DRAWABLE == null) {
        Easter.DRAWABLE = 0;
        Easter.init();
    }
    if(Trade.MAINPW[Trade.CUR_LANG] == null) {
        Trade.MAINPW[Trade.CUR_LANG] = 0;
        Trade.init();
    }
    if(Trade.INTERACTPW[Trade.CUR_LANG] == null) {
        Trade.INTERACTPW[Trade.CUR_LANG] = 0;
        Utils.interactInit();
    }
    if(Help.MAINPW [Trade.CUR_LANG] == null) {
        Help.MAINPW[Trade.CUR_LANG] = 0;
        Help.init();
    }
    if(Update.MAINPW[Trade.CUR_LANG] == null) {
        Update.MAINPW[Trade.CUR_LANG] = 0;
        Update.init();
    }
    if(SpecialThanks.MAINPW[Trade.CUR_LANG] == null) {
        SpecialThanks.MAINPW[Trade.CUR_LANG] = 0;
        SpecialThanks.init();
    }
    if(Options.MAINPW[Trade.CUR_LANG] == null) {
        Options.MAINPW[Trade.CUR_LANG] = 0;
        Options.init();
    }
    if(NoInternet.MAINPW[Trade.CUR_LANG] == null) {
        NoInternet.MAINPW[Trade.CUR_LANG] = 0;
        NoInternet.init();
    }
    if(Init.INITIALIZING == true) {
        Init.INITIALIZING = false;
        Loading.killScreen();
    }
    if(Entity.getEntityTypeId(Player.getPointedEntity()) == 15) {
        if(!Trade.INTERACTPW[Trade.CUR_LANG].isShowing()) {
            Trade.SELLER = Player.getPointedEntity();
            Utils.showInteractPw();
        }
    }
    if(Player.getCarriedItem() == 346 || Entity.getEntityTypeId(Player.getPointedEntity()) != 15) {
        Utils.createUiThread(function() {
            if(Trade.INTERACTPW[Trade.CUR_LANG] != null && Trade.INTERACTPW[Trade.CUR_LANG].isShowing())
                Trade.INTERACTPW[Trade.CUR_LANG].dismiss();
        });
    }
    if(Trade.TRADING) {
        Entity.setVelX(Trade.SELLER, 0);
        Entity.setVelZ(Trade.SELLER, 0);
    }
    
    if(Trade.SELLER != null && (Entity.getHealth(Player.getEntity()) <= 0 || Entity.getHealth(Trade.SELLER) <= 0)) {
        leaveGame();
    }
    if(Trade.CUR_HEALTH > Entity.getHealth(Player.getEntity())) {
        Trade.CUR_HEALTH = Entity.getHealth(Player.getEntity());
        leaveGame();
    }
}

function selectLevelHook() {
    if(Trade.CUR_LANG != Utils.getCurrentLanguage())
        Trade.CUR_LANG = Utils.getCurrentLanguage();
    Options.loadOption();
}

function newLevel() {
    Trade.CUR_HEALTH = Entity.getHealth(Player.getEntity());
}

function leaveGame() {
    Utils.createUiThread(function() {
        var lang = Trade.CUR_LANG;
        if(Trade.MAINPW[lang] != 0 && Trade.MAINPW[lang] != null && Trade.MAINPW[lang].isShowing())
            Trade.MAINPW[lang].dismiss();
        if(Trade.INTERACTPW[lang] != 0 && Trade.MAINPW[lang] != null && Trade.INTERACTPW[lang].isShowing())
            Trade.INTERACTPW[lang].dismiss();
        if(Help.MAINPW[lang] != 0 && Help.MAINPW[lang] != null && Help.MAINPW[lang].isShowing())
            Help.MAINPW.dismiss();
        if(Update.MAINPW[lang] != 0 && Update.MAINPW[lang] != null && Update.MAINPW[lang].isShowing())
            Update.MAINPW[lang].dismiss();
        if(SpecialThanks.MAINPW[lang] != 0 && SpecialThanks.MAINPW[lang] != null && SpecialThanks.MAINPW[lang].isShowing())
            SpecialThanks.MAINPW[lang].dismiss();
    });
}

Utils.downloadFontFile();

//STRING
var R = {
    string: {
        trade: {
            de_DE: "Tauschen",
            en_US: "Trade",
            es_ES: "Comerciar",
            fr_FR: "Commerce",
            it_IT: "Scambia",
            ja_JP: "取引する",
            ko_KR: "거래하기",
            pt_BR: "Comércio",
            ru_RU: "Торговля",
            zh_CN: "交易"
        },
        back: {
            all: "gui.back"
        },
        buy: {
            de_DE: "Kaufen",
            en_US: "Buy",
            es_ES: "Comprar",
            fr_FR: "Acheter",
            it_IT: "Compra",
            ja_JP: "買取",
            ko_KR: "구입",
            pt_BR: "Comprar",
            ru_RU: "Купить",
            zh_CN: "购买"
        },
        sell: {
            de_DE: "Verkaufen",
            en_US: "Sell",
            es_ES: "Vender",
            fr_FR: "Vendre",
            it_IT: "Vendi",
            ja_JP: "販売",
            ko_KR: "판매",
            pt_BR: "Vender",
            ru_RU: "Продать",
            zh_CN: "出售"
        },
        about: {
            de_DE: "Info",
            en_US: "Info",
            es_ES: "Info",
            fr_FR: "Infos",
            it_IT: "Info",
            ja_JP: "情報",
            ko_KR: "정보",
            pt_BR: "Informações",
            ru_RU: "Информация",
            zh_CN: "信息"
        },
        check_update: {
            de_DE: "Suche nach Updates",
            en_US: "Check for updates",
            es_ES: "Buscar actualización",
            fr_FR: "Vérifier les mises à jour",
            it_IT: "Controlla aggiornamenti",
            ja_JP: "アップデートをチェック",
            ko_KR: "업데이트 확인",
            pt_BR: "Ver se há Atualizaçōes",
            ru_RU: "Проверить обновления",
            zh_CN: "检查更新"
        },
        special_thanks: {
            de_DE: "Besonderen Dank an",
            en_US: "Special thanks to",
            es_ES: "Agradecimiento especial para",
            fr_FR: "Merci spécial à",
            it_IT: "Ringraziamenti speciali per",
            ja_JP: "手伝ってくれた人",
            ko_KR: "도와주신 분들",
            pt_BR: "Agradecimentos Para",
            ru_RU: "Особая благодарность",
            zh_CN: "特别感谢"
        },
        new_found_1: {
            de_DE: "Aktualisierung!",
            en_US: "Update!",
            es_ES: "Actualizacion!",
            fr_FR: "Mise à jour!",
            it_IT: "Aggiornamenti!",
            ja_JP: "アップデート！",
            ko_KR: "업데이트!",
            pt_BR: "Atualização!",
            ru_RU: "Обновление!",
            zh_CN: "有更新！"
        },
        new_found_2: {
            de_DE: "Eine neue Version von TradePE wurde gefunden!\nWillst du es jetzt installieren?",
            en_US: "A new version of TradePE has been found!\nWould you like to install it now?",
            es_ES: "Una nueva versión de TradePE ha sido encontrada!\nQuieres instalar ahora?",
            fr_FR: "Une nouvelle de TradePE a été trouvé!\nSouhaitez-vouz l'installer maintenant?",
            it_IT: "Una nuova versione di TradePE è stata trovata!\nVuoi installarla ora?",
            ja_JP: "TradePEの新しいバージョンを発見しました。\n今すぐにインストールしますか？",
            ko_KR: "TradePE의 새 버전을 발견했습니다!\n지금 바로 설치하시겠습니까?",
            pt_BR: "Uma nova versão de TradePE está disponivel!\nVoce quer instalar agora?",
            ru_RU: "Была найдена новая версия TradePE!\nУстановить сейчас?",
            zh_CN: "发现TradePE的新版本！\n立即下载？"
        },
        yes: {
            all: "gui.yes"
        },
        later: {
            de_DE: "Später",
            en_US: "Later",
            es_ES: "Despues",
            fr_FR: "Plus tard",
            it_IT: "Più avanti",
            ja_JP: "後で",
            ko_KR: "나중에",
            pt_BR: "Depois",
            ru_RU: "Позже",
            zh_CN: "稍后"
        },
        not_enough_item: {
            de_DE: "Nicht genug Items",
            en_US: "Not enough items",
            es_ES: "No hay items suficientes",
            fr_FR: "Pas assez d'éléments",
            it_IT: "Non hai abbastanza oggetti",
            ja_JP: "アイテムが十分ではありません",
            ko_KR: "아이템이 부족합니다",
            pt_BR: "Voce não Tem items",
            ru_RU: "Не хватает предметов",
            zh_CN: "物品不足"
        },
        not_enough_emerald: {
            de_DE: "Nicht genug Smaragd",
            en_US: "Not enough emeralds",
            es_ES: "No hay esmeraldas suficientes",
            fr_FR: "Pass assez émeraudes",
            it_IT: "Non hai abbastanza Smeraldi",
            ja_JP: "エメラルドが十分ではありません",
            ko_KR: "에메랄드가 부족합니다",
            pt_BR: "Voce não tem esmeraldas",
            ru_RU: "Не хватает изумрудов",
            zh_CN: "绿宝石不足"
        },
        no_internet: {
            de_DE: "Vielleicht gibt es ein Problem mit deiner Internetverbindung?",
            en_US: "Maybe check your internet connection?",
            es_419: "Comprueba tu conexión a Internet",
            es_ES: "Comprueba tu conexión a Internet",
            fr_CA: "Peut-être devriez-vous vérifier votre connexion Internet?",
            fr_FR: "Peut-être devriez-vous vérifier votre connexion Internet?",
            it_IT: "Verificare la connessione Internet?",
            ja_JP: "インターネット接続を確認してください",
            ko_KR: "인터넷 연결 상태를 확인하십시오",
            pt_BR: "Talvez deve verificar sua conexão à Internet?",
            pt_PT: "Talvez deve verificar sua conexão à Internet?",
            ru_RU: "С вашим Интернетом все в порядке?",
            zh_CN: "请检查您的网络连接？",
            zh_TW: "可否請您確認一下目前的網際網路連線狀態呢？"
        },
        options: {
            all: "selectServer.edit"
        }
    }
};
