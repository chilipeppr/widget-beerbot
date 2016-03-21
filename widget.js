/* global requirejs cprequire cpdefine chilipeppr THREE */
// Defining the globals above helps Cloud9 not show warnings for those variables

// ChiliPeppr Widget/Element Javascript

requirejs.config({
    /*
    Dependencies can be defined here. ChiliPeppr uses require.js so
    please refer to http://requirejs.org/docs/api.html for info.
    
    Most widgets will not need to define Javascript dependencies.
    
    Make sure all URLs are https and http accessible. Try to use URLs
    that start with // rather than http:// or https:// so they simply
    use whatever method the main page uses.
    
    Also, please make sure you are not loading dependencies from different
    URLs that other widgets may already load like jquery, bootstrap,
    three.js, etc.
    
    You may slingshot content through ChiliPeppr's proxy URL if you desire
    to enable SSL for non-SSL URL's. ChiliPeppr's SSL URL is
    https://i2dcui.appspot.com which is the SSL equivalent for
    http://chilipeppr.com
    */
    paths: {
        // Example of how to define the key (you make up the key) and the URL
        // Make sure you DO NOT put the .js at the end of the URL
        // SmoothieCharts: '//smoothiecharts.org/smoothie',
    },
    shim: {
        // See require.js docs for how to define dependencies that
        // should be loaded before your script/widget.
    }
});

cprequire_test(["inline:com-zipwhip-widget-texterator"], function(myWidget) {

    // Test this element. This code is auto-removed by the chilipeppr.load()
    // when using this widget in production. So use the cpquire_test to do things
    // you only want to have happen during testing, like loading other widgets or
    // doing unit tests. Don't remove end_test at the end or auto-remove will fail.

    // Please note that if you are working on multiple widgets at the same time
    // you may need to use the ?forcerefresh=true technique in the URL of
    // your test widget to force the underlying chilipeppr.load() statements
    // to referesh the cache. For example, if you are working on an Add-On
    // widget to the Eagle BRD widget, but also working on the Eagle BRD widget
    // at the same time you will have to make ample use of this technique to
    // get changes to load correctly. If you keep wondering why you're not seeing
    // your changes, try ?forcerefresh=true as a get parameter in your URL.

    console.log("test running of " + myWidget.id);

    
    
    // load 3dviewer
    // have to tweak our own widget to get it above the 3dviewer
    $('#' + myWidget.id).css('position', 'relative');
    //$('#' + myWidget.id).css('background', 'none');
    $('#' + myWidget.id).css('width', '420px');
    $('body').prepend('<div id="3dviewer"></div>');
    chilipeppr.load(
      "#3dviewer",
      "http://raw.githubusercontent.com/chilipeppr/widget-3dviewer/master/auto-generated-widget.html",
      function() {
        cprequire(['inline:com-chilipeppr-widget-3dviewer'], function (threed) {
            threed.init({
                doMyOwnDragDrop: false
            });
            
            // hide toolbar for room
            $('#com-chilipeppr-widget-3dviewer .panel-heading').addClass("hidden");
            
            // only init eagle widget once 3d is loaded
            // init my widget
            // myWidget.init();
            myWidget.init({silent:true});
        });
    });

    // load flash message
    $('body').prepend('<div id="testDivForFlashMessageWidget"></div>');
    chilipeppr.load(
        "#testDivForFlashMessageWidget",
        "http://fiddle.jshell.net/chilipeppr/90698kax/show/light/",
        function() {
            console.log("mycallback got called after loading flash msg module");
            cprequire(["inline:com-chilipeppr-elem-flashmsg"], function(fm) {
                //console.log("inside require of " + fm.id);
                fm.init();
            });
        }
    );
    
    $("body").append('<div id="addonWidgets" style="position:absolute;width:420px;left:20px;"></div>');
    
    // Texterator widget
    $("#addonWidgets").append('<' + 'div id="myDivWidgetRecvtext" ><' + '/div>');
    
    chilipeppr.load(
      "#myDivWidgetRecvtext",
      "http://raw.githubusercontent.com/chilipeppr/widget-recvtext/master/auto-generated-widget.html",
      function() {
        // Callback after widget loaded into #myDivWidgetRecvtext
        // Now use require.js to get reference to instantiated widget
        cprequire(
          ["inline:com-chilipeppr-widget-recvtext"], // the id you gave your widget
          function(myObjWidgetRecvtext) {
            // Callback that is passed reference to the newly loaded widget
            console.log("Widget / Zipwhip Receive Text just got loaded.", myObjWidgetRecvtext);
            myObjWidgetRecvtext.init();
          }
        );
      }
    );
    
    // Inject SPJS
    $("#addonWidgets").append('<' + 'div id="myDivWidgetSerialport" ><' + '/div>');
    
    chilipeppr.load(
      "#myDivWidgetSerialport",
      "http://raw.githubusercontent.com/chilipeppr/widget-spjs/master/auto-generated-widget.html",
      function() {
        // Callback after widget loaded into #myDivWidgetSerialport
        // Now use require.js to get reference to instantiated widget
        cprequire(
          ["inline:com-chilipeppr-widget-serialport"], // the id you gave your widget
          function(myObjWidgetSerialport) {
            // Callback that is passed reference to the newly loaded widget
            console.log("Widget / Serial Port JSON Server just got loaded.", myObjWidgetSerialport);
            myObjWidgetSerialport.init();
          }
        );
      }
    );
    
    $('#' + myWidget.id).css('margin', '20px');
    $('title').html(myWidget.name);
    // $('body').css("position", "relative");

} /*end_test*/ );

// This is the main definition of your widget. Give it a unique name.
cpdefine("inline:com-zipwhip-widget-texterator", ["chilipeppr_ready", /* other dependencies here */ ], function() {
    return {
        /**
         * The ID of the widget. You must define this and make it unique.
         */
        id: "com-zipwhip-widget-texterator", // Make the id the same as the cpdefine id
        name: "Widget / Texterator", // The descriptive name of your widget.
        desc: "A widget for controlling the Zipwhip Texterator.",
        url: "(auto fill by runme.js)",       // The final URL of the working widget as a single HTML file with CSS and Javascript inlined. You can let runme.js auto fill this if you are using Cloud9.
        fiddleurl: "(auto fill by runme.js)", // The edit URL. This can be auto-filled by runme.js in Cloud9 if you'd like, or just define it on your own to help people know where they can edit/fork your widget
        githuburl: "(auto fill by runme.js)", // The backing github repo
        testurl: "(auto fill by runme.js)",   // The standalone working widget so can view it working by itself
        /**
         * Define pubsub signals below. These are basically ChiliPeppr's event system.
         * ChiliPeppr uses amplify.js's pubsub system so please refer to docs at
         * http://amplifyjs.com/api/pubsub/
         */
        /**
         * Define the publish signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        publish: {
            // Define a key:value pair here as strings to document what signals you publish.
            //'/onExampleGenerate': 'Example: Publish this signal when we go to generate gcode.'
        },
        /**
         * Define the subscribe signals that this widget/element owns or defines so that
         * other widgets know how to subscribe to them and what they do.
         */
        subscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // so other widgets can publish to this widget to have it do something.
            // '/onExampleConsume': 'Example: This widget subscribe to this signal so other widgets can send to us and we'll do something with it.'
        },
        /**
         * Document the foreign publish signals, i.e. signals owned by other widgets
         * or elements, that this widget/element publishes to.
         */
        foreignPublish: {
            // Define a key:value pair here as strings to document what signals you publish to
            // that are owned by foreign/other widgets.
            // '/jsonSend': 'Example: We send Gcode to the serial port widget to do stuff with the CNC controller.'
            "/com-chilipeppr-widget-3dviewer/request3dObject" : "This gives us back the 3d object from the 3d viewer so we can add Three.js objects to it.",
            "/com-chilipeppr-widget-recvtext/send" : 'We send texts via this publish. The payload is like {body: "my text msg body", to: "313-555-1212"}',
            
        },
        /**
         * Document the foreign subscribe signals, i.e. signals owned by other widgets
         * or elements, that this widget/element subscribes to.
         */
        foreignSubscribe: {
            // Define a key:value pair here as strings to document what signals you subscribe to
            // that are owned by foreign/other widgets.
            // '/com-chilipeppr-elem-dragdrop/ondropped': 'Example: We subscribe to this signal at a higher priority to intercept the signal. We do not let it propagate by returning false.'
            "/com-chilipeppr-widget-3dviewer/recv3dObject" : "By subscribing to this we get the callback when we /request3dObject and thus we can grab the reference to the 3d object from the 3d viewer and do things like addScene() to it with our Three.js objects.",
            "/com-chilipeppr-widget-recvtext/recv" : "We watch for incoming texts so we can trigger the Texterator.",
            
        },
        /**
         * All widgets should have an init method. It should be run by the
         * instantiating code like a workspace or a different widget.
         */
        init: function(opts) {
            console.log("I am being initted. Thanks.");

            // open database
            var that = this;
            this.openDb(function() {
                that.refreshUserView();
                that.refreshQueueView();
            });
            
            this.setupSerialPubSub();
            
            // see if they passed in options
            if (opts && 'silent' in opts && opts.silent) {
                console.log("user wants silent mode");
                this.isSilent = true;
                // this.init3d(function() {
                //     console.log("initted 3d viewer in silent mode");
                // });
            } else {
                this.init3d();
            }

            this.setupTextListener();

            this.setupUiFromLocalStorage();
            this.btnSetup();
            this.forkSetup();

            console.log("I am done being initted.");
        },
        /**
         * Listen for incoming texts so we can trigger the Texterator as well
         * as send responses back, keep stats, etc.
         */
        setupTextListener: function() {
            chilipeppr.subscribe("/com-chilipeppr-widget-recvtext/recv", this, this.onIncomingText);
        },
        /**
         * This method is called when an incoming text comes in via pubsub from the
         * Zipwhip Receive Text widget. So make sure that widget is loaded.
         */
        onIncomingText: function(msg) {
            console.log("texterator. got onIncomingText. msg:", msg);
            
            // when we get a msg we need to analyze it for content
            
            // if msg is from 844-txt-beer then ignore it
            if (msg.srcAddr == "8448982337") {
                console.warn("got msg from self. ignoring so don't end up in endless loop.")
                return;
            }
            
            // see if they want a beer
            var that = this;
            if (msg.body.match(/beer/i)) {
                console.log("looks like they want a beer");
                
                // get user record
                this.userUpdateOrAddThenGet(msg, function(user) {
                    console.log("we have a user:", user);
                    
                    // see how many beers
                    var txt = "";
                    if (user.beers == 1) {
                        txt += `Hi there. It looks like you want your first beer ever from me. Pleased to meet you. My name is Texterator. I will whip up that beer 4 u lickety split.`;
                        
                    } else if (user.beers >= 2) {
                        
                        // they had a previous beer
                        // get seconds since last beer
                        var delta = parseInt((user.lastBeer - user.prevBeer) / 1000);
                        console.log("delta:", delta);
                        var smarmy = "";
                        if (delta < 60 * 5) {
                            // < 5 mins. crazy fast.
                            smarmy = "That's crazy fast 4 ur next beer. U might want to take it easy on the boozing.";
                        }
                        else if (delta < 60 * 20) {
                            // < 20 mins since last beer. is fast.
                            smarmy = "That's kinda quick 4 ur next beer. U may want to slow down there buddy.";
                        } 
                        else if (delta <= 60 * 60) {
                            // < less than 1 hr. good pace.
                            smarmy = "Good pace on not drinkin 2 fast or 2 slow. Enjoy.";
                        } 
                        else if (delta > 60 * 60 * 5) {
                            // longer than 5 hrs, must have been a previous event or prev day
                            smarmy = "Good to see u back again. Glad u like my brew.";
                        }
                        else if (delta > 60 * 60) {
                            // longer than an hour, but less than 5 hrs, so must be same event but going slow
                            smarmy = "Ur drinkin kinda slow. Keep up the pace next time to keep the party goin.";
                        }
                        
                        var prettyCnt = that.prettyCount(user.beers);
                        var prettyDiff = that.prettyDateDiff(user.lastBeer, user.prevBeer);
                        txt += "Hey there again. I'll get ur " + prettyCnt + " beer going stat. Did u know that " 
                        + prettyDiff + " u got ur prev beer? " + smarmy;
                        
                    }
                    
                    // so we know they want a beer. we should just inject it in the queue and then let
                    // the queue run on it's own cycle to pick up the order
                    that.injectUserIntoBeerQueue(msg.srcAddr);
                    
                    // send back response text
                    that.sendText(msg.srcAddr, txt);
                })
            } else {
                
                // see if they've ever texted in before
                this.getUser(msg.srcAddr, function(user) {
                    
                    var txt = "";
                    if (user == null) {
                        txt += "Hi there. My name is Texterator. My creator is Zipwhip and my whole purpose in life is " +
                        "to serve you up yummy beer. Text me back with the word beer so I can vend a cup for you.";
                    } else {
                        var prettyDiff = that.prettyDateDiff(new Date(), user.lastBeer);
                        txt += "Hey, Texterator here. Looks like I've served u up a beer " + prettyDiff + ", but u just texted a word I don't understand. Txt back the word beer so I can serve you.";
                    }
                    // send back response text
                    that.sendText(msg.srcAddr, txt);
                });
            }
            
        },
        
        /**
         * Serial commands
         */
         
        /**
         * Make sure to update the serial port that the arduino/nodemcu device is on that takes commands.
         */
        comPort: "com14",
        
        /**
         * Advances lazy susan once and vends beer
         */
        moveFwdSlotAndVendBeer: function() {
            this.sendSerial("moveFwdSlotAndVendBeer()\n");
        },
        /**
         * Called when we see the done cmd come back in over serial.
         */
        onDoneMoveFwdSlotAndVendBeer: function() {
            // we need to update the queue record for the queueId that just got completed
            console.log("got done for beer vend. activeQueueIdVendingBeer:", this.activeQueueIdVendingBeer);
            var that = this;
            this.getQueue(this.activeQueueIdVendingBeer, function(qrec) {
                qrec.status = "Beer done. Waiting laser...";
                qrec.endTime = new Date();
                that.updateQueue(qrec, function() {
                    console.log("just updated qrec after beer done");
                    that.refreshQueueView();
                    // now that this is done, we need to just re-check the queue and go vend again
                    that.triggerQueue();
                });
            });
            
        },
        sendSerial: function(cmd) {
            if (!cmd.match(/\n$/)) cmd += "\n";
            chilipeppr.publish("/com-chilipeppr-widget-serialport/ws/send", "send " + this.comPort + " " + cmd);    
        },
        setupSerialPubSub: function() {
            chilipeppr.subscribe("/com-chilipeppr-widget-serialport/ws/recv", this, this.onRecvSerial);    
        },
        lastSerialData: "",
        onRecvSerial: function(data) {
            console.log("got onRecvSerial. data:", data);
            if (data.match(/^{/)) {
                // it is json, good
                var json = JSON.parse(data);
                if ('P' in json) {
                    var re = new RegExp(this.comPort, 'i');
                    if (json.P.match(re)) {
                        // this is the com port we are looking for (not the droid we are looking for)
                        this.lastSerialData += json.D;
                        this.processSerialDataRaw();
                    }
                }
            }
        },
        /**
         * Data does not come in line by line, so we have to queue the incoming characters and
         * then split on newline to generate individual lines for easy processing.
         */
        processSerialDataRaw: function() {
            // we have a string that has a bunch of newlines, but that string
            // keeps getting appended to as serial data comes in. so we will process each line
            // up to a newline and as we process each line we'll remove it from the string
            var lines = this.lastSerialData.split(/\n/);
            for (var i in lines) {
                if (i == lines.length - 1) break; // don't process last index
                var line = lines[i];
                // remove this line from the lastSerialData
                this.lastSerialData = this.lastSerialData.substring(line.length + 1);
                // now process this line. get rid of \r if they exist.
                // clean up some stuff
                line = line.replace(/\r/g, "");
                line = line.replace(/^> /, ""); //sometimes nodemcu shoves this crap at front of line
                this.onSerialIncomingLine(line);
            }
        },
        /**
         * This method is called for each line that comes in on the serial port.
         */
        onSerialIncomingLine: function(line) {
            
            console.log("onSerialIncomingLine. line:", line);
            // when we see certain commands come in, we know stuff is done
            // we should only get json in
            if (line.match(/^{/)) {
                // we have json
                var json = JSON.parse(line);
                console.log("got json from texterator. json:", json);
                
                // see if it is a command we care about
                if ('sr' in json) {
                    // status report
                    var sr = json.sr;
                    if ('stat' in sr) this.sr.stat = sr.stat;
                    if ('beer' in sr) this.sr.beer = sr.beer;
                    if ('slots' in sr) this.sr.slots = sr.slots;
                    this.statusUpdated();
                }
                else if ('done' in json) {
                    // a done command came in
                    if (json.done == "moveFwdSlotAndVendBeer()") {
                        this.onDoneMoveFwdSlotAndVendBeer();
                    }
                }
            }
        },
        /**
         * This method is called if the status is updated from incoming serial data so that we
         * can trigger stuff off of it like re-checking the queue.
         */
        statusUpdated: function() {
            
        },
        
        /**
         * Queue commands
         */

        /**
         * The status of the arduino/nodemcu. It auto-updates when we see incoming serial data.
         */
        sr: {"slots":[1,1,1,0,0,0,0,0], "beer":1, "stat":1},
        /**
         * The status of the laser. Auto-updates based on Gcode execution on TinyG
         */
        laserSr: {stat: 1},

        /**
         * In this method we look at the queue and see if there is something to do like send a
         * serial command to start the beer vending process.
         */
        triggerQueue: function() {
            
            console.log("triggerQueue");
            
            // the order of the queue is:
            // ['Waiting...','Beer pouring...', 'Lasering...', 'Cup pickup...', 'Cup gone']
            
            // get the queue in order and see if there's anything to do. we should just be able
            // to iterate it with a cursor and order it by 
            
            var store = this.getObjectStore(this.DB_STORE_NAME_QUEUE, "readonly");
            var cursorRequest = store.openCursor(null, 'prev'); // next or prev
            //var index = store.index('status');
            //var cursorRequest = index.openCursor(IDBKeyRange.only(["Waiting..."]), 'prev'); // next or prev
            
            var that = this;
            var qWaiting = [];
            var qBeerPouring = [];
            var qBeerDone = [];
            var qLasering = [];
            var qCupPickup = [];
            this.qWaiting = qWaiting;
            this.qBeerPouring = qBeerPouring;
            this.qBeerDone = qBeerDone;
            cursorRequest.onsuccess = function(e) {

                var cursor = e.target.result;
                if (cursor) {
                    console.log("triggerQueue cursor:", cursor);
                    
                    if (cursor.value.status.match(/^Waiting/)) {
                        console.log("user is waiting. id:", cursor.key);
                        qWaiting.push(cursor.key);
                        console.log("qWaiting:", qWaiting);
                    }
                    else if (cursor.value.status.match(/^Beer pouring/)) {
                        console.log("user has beer pouring. id:", cursor.key);
                        qBeerPouring.push(cursor.key);
                        console.log("qBeerPouring:", qBeerPouring);
                    }
                    else if (cursor.value.status.match(/^Beer done/i)) {
                        console.log("user has beer done, waiting for move to laser. id:", cursor.key);
                        qBeerDone.push(cursor.key);
                        console.log("qBeerDone:", qBeerDone);
                    }
                    else if (cursor.value.status.match(/^Lasering/)) {
                        console.log("user has lasering. id:", cursor.key);
                        qLasering.push(cursor.key);
                        console.log("qLasering:", qLasering);
                    }
                    else if (cursor.value.status.match(/^Cup pickup/)) {
                        console.log("user has a Cup pickup waiting. id:", cursor.key);
                        qCupPickup.push(cursor.key);
                        console.log("qCupPickup:", qCupPickup);
                    }
                    else if (cursor.value.status.match(/^Cup gone/)) {
                        // we are done iterating. skip everything after.
                        console.log("done looking at queue. got to cup gone record.");
                        that.triggerQueueCallback();
                        return;
                    }
                    cursor.continue();
                }
                else {
                    console.log("triggerQueue. done with cursor. no more records.");
                    that.triggerQueueCallback();
                }
            };
            
        },
        /**
         * This is called when the triggerQueue is done grabbing all queues that need to get worked.
         */
        triggerQueueCallback: function() {
            console.log("triggerQueueCallback");
            
            // we have a lot of scenarios we need to deal with regarding how to manage all movements
            
            // STATUSES
            // (W) Waiting              Waiting...
            // (M) MovingToBeer           Moving to beer pour...
            // (W) WaitingBeer          Waiting for beer pour...
            // (M) MovingBeerPour       Beer pouring...
            // (W) WaitingBeerPourDone  Beer done...
            // (M) MovingToLaser          Moving to lasering...
            // (W) WaitingLaser         Waiting for laser...
            // (M) MovingLasering       Lasering...
            // (W) WaitingLaseringDone  Laser done.
            // (M) MovingToPickup3        Moving to cup pick up slot 3
            // (W) WaitingPickup3       Waiting for user to pick me up slot 3
            // (M) MovingToPickup4        Moving to cup pick up slot 4
            // (W) WaitingPickup4       Waiting for user to pick me up slot 4
            // (M) MovingToPickup5        Moving to cup pick up slot 5
            // (W) WaitingPickup5       Waiting for user to pick me up slot 5
            // (M) MovingToPickup6        Moving to cup pick up slot 6
            // (W) WaitingPickup6       Waiting for user to pick me up slot 6
            //     Done                 Cup is gone so this item is a wrap.
            
            // Any time movement is occurring, we won't trigger anything. So any movement items above
            // are not really real queues cuz they're pointless.
            // However, as done commands come back, we need to make sure all statuses are updated
            // to (W) waiting statuses so they end up in the correct queue.
            
            // Does each Wait step require a queue? Yes.
            // (Adv) means an "Advance" queue where it's in a spot it needs to advance/move fwd one slot
            // (Static) means queues where movement occurs and takes time but no advance is allowed during
            //
            // (Adv)    Waiting
            // (Static) WaitingBeer
            // (Adv)    WaitingBeerPourDone
            // (Static) WaitingLaser
            // (Adv)    WaitingLaseringDone
            // (Adv)    WaitingPickup3
            // (Adv)    WaitingPickup4
            // (Adv)    WaitingPickup5
            // (Adv)    WaitingPickup6
            
            /*
            So we have 2 types of waiting queues. 1 that needs an advance moveFwdSlot() and 1 that needs a static move.
            
            if any (Static) queues have items in them, then trigger them and ignore everything else because we
            can't move (Adv) queues.

            if any (Adv) queues have stuff in them and (Stat) queues are empty, we can moveFwdSlot() 
            */
            
            /*
            With respect to moving stuff to next queue, when (Adv) queues are complete a done:moveFwdSlot()
            is sent to us by the arduino/nodemcu. Here's how we update each status to get the item into the
            next queue:
            
            Waiting             ->  MovingToBeer      ->  moveFwdSlot()   ->  done:moveFwdSlot()  ->  WaitingBeer
            WaitingBeerPourDone ->  MovingToLaser     ->  moveFwdSlot()   ->  done:moveFwdSlot()  ->  WaitingLaser
            WaitingLaseringDone ->  MovingToPickup3   ->  moveFwdSlot()   ->  done:moveFwdSlot()  ->  WaitingPickup3
            WaitingPickup3      ->  MovingToPickup4   ->  moveFwdSlot()   ->  done:moveFwdSlot()  ->  WaitingPickup4
            WaitingPickup4      ->  MovingToPickup4   ->  moveFwdSlot()   ->  done:moveFwdSlot()  ->  WaitingPickup5
            WaitingPickup5      ->  MovingToPickup4   ->  moveFwdSlot()   ->  done:moveFwdSlot()  ->  WaitingPickup6
            
            With respect to checking cups, we need to verify there's a cup in the following spots before
            proceeding with the next step:
            
            Waiting         -> Check cup in slot 0 (moveFwdSlot()) or slot 1 (just update status to WaitingBeer)
            WaitingBeer     -> Check cup in slot 1
            WaitingLaser    -> Check cup in slot 2
            
            In other queues if a cup disappears, I could just set status to Done
            
            */
            
            // if there are items waiting in qBeerDone then those need to advance forward to get lasered
            // if items in qBeerDone and in qWaiting then we will need to do this stuff in parallel
            

            /*
            if items in Waiting and all else empty then
                if cup in slot 0 then 1) mark as "MovingBeer" 2) moveFwdSlot() 3) on done mark as "WaitingBeer"
                if cup in slot 1 then 1) mark as "MovingBeerPour" 2) beerStart() 3) on done mark as "WaitingBeerPourDone"
            if items in WaitingBeer and all else empty then
                if cup in slot 1 then 1) mark as "MovingBeerPour" 2) beerStart() 3) on done mark as "WaitingBeerPourDone"
            if items in WaitingBeerPourDone and all else empty then
                if cup in slot 1 then 1) mark as "MovingLaser" 2) moveFwdSlot() 3) on done mark as "WaitingLaser"
            if items in WaitingLaser and all else empty then
                if cup in slot 2 then 1) mark as "MovingLasering" 2) laserIt() 3) on done mark as "WaitingLaseringDone"
            if items in WaitingLaseringDone and all else empty then
                if cup in slot 2 then 1) mark as "MovingPickup3" 2) moveFwdSlot() 3) on done mark as "WaitingPickup3"
            if items in WaitingPickup3 and all else empty then
                if cup in slot 3 then 1) mark as "MovingPickup4" 2) moveFwdSlot() 3) on done mark as "WaitingPickup4"
            if items in WaitingPickup4 and all else empty then
                if cup in slot 4 then 1) mark as "MovingPickup5" 2) moveFwdSlot() 3) on done mark as "WaitingPickup5"
                
            if items in Waiting and WaitingBeer and all else empty then
                if cup in slot 0 and cup in slot 1 then 1) mark slot 0 as "MovingBeer" 2) mark slot 1 as 
            
            */
            
            // OLD
            
            // if item in qWaiting, but no items in qBeerDone or qLaserDone or qCupPickup then
            //      we are in a nice start position
            //      if cup in slot 0 then moveFwdSlot(). mark status as "Moving to beer pour...". on done mark status as "Waiting for beer pour..."
            //      if cup in slot 1 then beerStart(). mark status as "Beer pouring...". one done mark status as "Done beer pour."

            // it item in qWaitingBeerPour, but no items in other queues
            
            
            // if item in qBeerDone, but no items in qWaiting or qLaserDone or qCupPickup then
            //      we are dealing with 1 cup on lazy susan
            //      moveFwdSlot(). when done trigger lasering.
            
            
            // if item in qWaiting and no items in qBeerDone and cup in slot 1 then
            //      we could assume that operator placed cup in slot 1 and we could just beerStart()
            // if item in qBeerDone and item in qWaiting and cup in slot 0 then
            //      moveFwdSlotAndVendBeer() and trigger lasering when moveFwd() done
            // if item in qBeerDone and item in qWaiting but no cup in slot 0 then
            //      we can still moveFwdSlot() and trigger lasering
            // if item in qBeerDone and no items waiting then
            //      moveFwdSlot() and trigger lasering when moveFwd() done
            // if item in qWaiting and no items in qBeerDone then
            //      moveFwdSlotAndVendBeer()
            // if 
            
            if (this.qBeerDone.length > 0 && this.qWaiting.length > 0 && this.sr.slots[0] == 1) {
                console.log("we have a qBeerDone and qWaiting and a cup in slot 0 so we can moveFwdSlot, do beer vend and laser at same time");
                // moveFwdSlotAndVendBeer() and trigger lasering when moveFwd() done
                this.laserNeedsTriggeredWhenMoveFwdDone = true;
                this.laserQueueId = this.qBeerDone[this.qBeerDone.length-1];
                // by starting the beer vend, we will get a moveFwdSlot which helps the laser
                // the incoming serial data will say {"done":"moveFwdSlot()"} which will give us
                // the trigger we need to fire the laser at the correct time
                this.tryToStartBeerVendForQueueItem(this.qWaiting[this.qWaiting.length-1]);
            }
            else if (this.qWaiting.length > 0) {
                // stuff is waiting
                // trigger attempt for the oldest waiting item, i.e. the one with lowest index, which would be the one at the top
                console.log("qWaiting:", this.qWaiting);
                this.tryToStartBeerVendForQueueItem(this.qWaiting[this.qWaiting.length-1]);
            }
        },
        activeQueueIdVendingBeer: null,
        /**
         * You can send us a queue ID that you'd like to have us attempt to start a beer vend for.
         * What we look for is whether slot 0 has a cup in it, which would mean sr.slots[0] = 1.
         * If it does then we can send the serial command of "moveFwdSlot"
         */
        tryToStartBeerVendForQueueItem: function(queueId) {
            console.log("tryToStartBeerVendForQueueItem. queueId:", queueId);
            // see if there is a non-busy status that we can do this
            if (this.sr.stat == 1) {
                // machine is not busy, that's good, we can at least count on this state being good
                console.log("lazy susan/beer vend not busy");
                if (this.laserSr.stat == 1) {
                    // good, beer vending and laser is not working, so we are good to go from that respect
                    console.log("laser not busy");
                    if (this.sr.slots[0] == 1) {
                        // awesome. there is a cup in slot 0 so we can proceed
                        console.log("there is a cup in slot 0. so can proceed");
                         $("#" + this.id + " .givemeacup").addClass("hidden");
                         
                         // get the queue record
                        var that = this;
                        this.getQueue(queueId, function(qrecord) {
                            console.log("have queue record so now can update, refresh q, and send serial");
                            qrecord.status = "Beer pouring...";
                            qrecord.slot = 1; // since we're moving to this slot, indicate we'll be there
                            that.updateQueue(qrecord, function() {
                                console.log("updateQueue finished. can now refresh view.")
                                that.refreshQueueView();
                            });
                            
                            // record which id the beer vending is for so when
                            // we see a done on the moveFwdSlotAndVendBeer we know who it was for
                            // we could have the arduino/nodemcu tell us this id, but that seems like
                            // more work than necessary for an embedded device.
                            that.activeQueueIdVendingBeer = queueId;
                            
                            // send serial port command
                            that.moveFwdSlotAndVendBeer();
                        });
                        
                    } else {
                        // show the "Please give me a cup dialog box"
                        $(".givemeacup").removeClass("hidden");
                        console.log("seems we do not have a cup in place. operator needs to place one.");
                    }
                } else {
                    console.log("the laser is busy, so can't do anything right now. try again later.");
                }
            } else {
                console.log("the lazy susan/beer vend seem to be busy. trigger the queue again later.")
            }
            
            
        },
        injectUserIntoBeerQueue: function(phone) {
            // we need to add this user to the queue
            console.log("injectUserIntoBeerQueue. phone:", phone);
            var that = this;
            this.getUser(phone, function(user) {
                that.addQueue(phone, user.beers, function(qrec) {
                    console.log("added user to queue. qrec:", qrec);
                    that.refreshQueueView();
                    that.triggerQueue();
                });
            });
        },
        sendText: function(to, body) {
            var payload = {
                to: to,
                body: body
            };
            chilipeppr.publish("/com-chilipeppr-widget-recvtext/send", payload);   
        },
        userUpdateOrAddThenGet: function(msg, callback) {
            // look up if we have this user in our record already
            var that = this;
            this.getUser(msg.srcAddr, function(res) {
                console.log("getUser. res:", res);
                if (res) {
                    // there was a user
                    console.log("found the user. res:", res);
                    
                    // update the record
                    res.beers++;
                    res.prevBeer = res.lastBeer; // make previous beer be the last beer
                    res.lastBeer = new Date(); // make this beer be from now
                    
                    that.updateUser(res, function(res) {
                        console.log("updated user record. res:", res);
                        that.getUser(msg.srcAddr, function(res) {
                            console.log("updated user:", res);
                            if (callback) callback(res);
                        });
                        
                        that.refreshUserView();
                    });
                } else {
                    // no user, add it
                    that.addUser(msg.srcAddr, 1, new Date(), new Date(), function() {
                        that.getUser(msg.srcAddr, function(res) {
                            console.log("added user:", res);
                            if (callback) callback(res);
                        });    
                    });
                    
                    that.refreshUserView();
                }
            });
        },
        refreshQueueView: function() {

            var hdr = $('<tr><th>Id</th><th>Phone</th><th>Beer #</th><th>Slot</th>' + 
                '<th>Status</th><th>Start Time</th><th>End Time</th><th>Duration</th></tr>');
            var tableEl = $("#" + this.id + " .table-queue");
            tableEl.empty().append(hdr);

            // just re-read the entire table and show it in the users tab table
            var store = this.getObjectStore(this.DB_STORE_NAME_QUEUE, "readonly");
            // var cursorRequest = store.index('id').openCursor(null, 'prev'); // next or prev
            var cursorRequest = store.openCursor(null, 'prevunique'); // next or prev
            
            var that = this;
            cursorRequest.onsuccess = function(e) {

                var cursor = e.target.result;
                if (cursor) {
                    console.log("cursor:", cursor);
                    
                    // figure out duration
                    var duration = "-";
                    var endTime = "-";
                    var slot = cursor.value.slot;
                    if (cursor.value.slot == null) slot = "-";
                    
                    if (cursor.value.startTime && cursor.value.endTime) {
                        duration = parseInt((cursor.value.endTime - cursor.value.startTime) / 1000) + "s";
                        endTime = new Date(cursor.value.endTime).toLocaleString();
                    }
                    var row = $(
                        '<tr>' + 
                        '<td>' + 
                        cursor.key +
                        '</td><td>' +
                        that.phoneFormat(cursor.value.phone) + 
                        '</td><td>' +
                        cursor.value.beerNum + 
                        '</td><td>' +
                        slot +
                        '</td><td>' +
                        cursor.value.status +
                        '</td><td>' +
                        new Date(cursor.value.startTime).toLocaleString() + 
                        '</td><td>' +
                        endTime + 
                        '</td><td>' +
                        duration + 
                        '</td></tr>' +
                    '');
                    tableEl.append(row);
                    
                    cursor.continue();
                }
                else {
                    console.log("done with cursor. no more records.");
                }
            };
            
        },
        refreshUserView: function() {

            var hdr = $('<tr><th>Phone</th><th>Beers</th><th>Last Beer</th><th>Prev Beer</th><th>Delta</th></tr>');
            var tableEl = $("#" + this.id + " .table-users");
            tableEl.empty().append(hdr);

            // just re-read the entire table and show it in the users tab table
            var store = this.getObjectStore(this.DB_STORE_NAME, "readonly");
            var cursorRequest = store.index('lastBeer').openCursor(null, 'prev'); // next or prev
            
            var that = this;
            cursorRequest.onsuccess = function(e) {

                var cursor = e.target.result;
                if (cursor) {
                    console.log("cursor:", cursor);
                    var row = $('<tr><td>' + 
                    that.phoneFormat(cursor.value.phone) + '</td><td>' +
                    cursor.value.beers + '</td><td>' +
                    new Date(cursor.value.lastBeer).toLocaleString() + '</td><td>' +
                    new Date(cursor.value.prevBeer).toLocaleString() + '</td><td>' +
                    that.prettyDateDiff(cursor.value.lastBeer, cursor.value.prevBeer) + '</td></tr>' +
                    '');
                    // tableEl.append(row);
                    tableEl.append(row);
                    
                    cursor.continue();
                }
                else {
                    console.log("done with cursor. no more records.");
                }
            };
            
        },
        phoneFormat: function(phone) {
            if (phone.match(/(\d\d\d)(\d\d\d)(\d+)/)) {
                return "(" + RegExp.$1 + ") " + RegExp.$2 + "-" + RegExp.$3;
            }
            return phone;
        },
        prettyCount: function(count) {
            // format a count to human readable
            // 1 = 1st, 2 = 2nd, 3 = 3rd, 4 = 4th, 5 = 5th, etc.
            count = count + "";
            var ret = "";
            if (count.match(/11$/)) ret = count + "th"; // 11th, 111th, 211th
            else if (count.match(/12$/)) ret = count + "th"; // 12th, 212th
            else if (count.match(/13$/)) ret = count + "th"; // 13th, 413th
            else if (count.match(/0$/)) ret = count + "th"; // 10th, 20th, 30th, 100th
            else if (count.match(/1$/)) ret = count + "st"; // 1st, 21st, 31st, 101st
            else if (count.match(/2$/)) ret = count + "nd"; // 2nd, 22nd, 32nd, 102nd
            else if (count.match(/3$/)) ret = count + "rd"; // 3rd, 23rd, 33rd, 103rd
            else if (count.match(/[4-9]$/)) ret = count + "th"; // 4th, 5th, 9th, 14th, 19th, 24th, 109th
            else console.warn("did not address a count convert. count:", count);
            return ret;
        },
        prettyDateDiff: function(timeNew, timeOld) {
            var date = timeOld; //new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
            var diff = (((timeNew).getTime() - date.getTime()) / 1000),
                day_diff = Math.floor(diff / 86400);
            var year = date.getFullYear(),
                month = date.getMonth()+1,
                day = date.getDate();
        
            if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
                return (
                    year.toString()+'-'
                    +((month<10) ? '0'+month.toString() : month.toString())+'-'
                    +((day<10) ? '0'+day.toString() : day.toString())
                );
        
            var r =
            ( 
                (
                    day_diff == 0 && 
                    (
                        (diff < 60 && "just now")
                        || (diff < 120 && "1 min ago")
                        || (diff < 3600 && Math.floor(diff / 60) + " mins ago")
                        || (diff < 7200 && "1 hr ago")
                        || (diff < 86400 && Math.floor(diff / 3600) + " hrs ago")
                    )
                )
                || (day_diff == 1 && "Yesterday")
                || (day_diff < 7 && day_diff + " days ago")
                || (day_diff < 31 && Math.ceil(day_diff / 7) + " wks ago")
            );
            return r;
        },
        
        queueBeer: function(msg) {
            // we get a msg in and we queue a beer from it
        },
        db: null, // contains the database reference for texterator indexedDb
        // store: null, // contains the table for users
        // storeQueue: null, // contains the table for queue
        DB_NAME: "texterator",
        DB_VERSION: 11,
        DB_STORE_NAME: "users",
        DB_STORE_NAME_QUEUE: "queue",
        openDb: function(callback) {
            
            console.log("openDb ...");
            var req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
            var that = this;
            req.onsuccess = function (evt) {
                // Better use "this" than "req" to get the result to avoid problems with
                // garbage collection.
                // db = req.result;
                that.db = this.result;
                console.log("openDb DONE");
                if (callback) callback();
            };
            req.onerror = function (evt) {
                console.error("openDb:", evt.target.errorCode);
            };
            
            req.onupgradeneeded = function (evt) {
                console.log("openDb.onupgradeneeded");
                
                var res = evt.currentTarget.result;
                
                // create users table
                if (false) {
                    if (res.objectStoreNames.contains(that.DB_STORE_NAME)) {
                       // delete it
                       res.deleteObjectStore(that.DB_STORE_NAME);
                    }
                    var store = res.createObjectStore(
                        that.DB_STORE_NAME, { keyPath: 'phone', autoIncrement: false });
                    store.createIndex('lastBeer', 'lastBeer', { unique: false });
                }
                
                // create queue table
                if (res.objectStoreNames.contains(that.DB_STORE_NAME_QUEUE)) {
                   // delete it
                   res.deleteObjectStore(that.DB_STORE_NAME_QUEUE);
                }
                var storeQueue = res.createObjectStore(
                    that.DB_STORE_NAME_QUEUE, { keyPath: 'id', autoIncrement: true });
                    
                // create foreign key reference. since we will have multiple queue entries
                // let unique be false
                // storeQueue.createIndex('id', 'id', { unique:true});
                storeQueue.createIndex('phone', 'phone', { unique:false});
                //storeQueue.createIndex('status', ['Waiting...','Beer pouring...', 'Lasering...', 'Cup pickup...', 'Cup gone'], {unique:false});
                
                // store.createIndex('biblioid', 'biblioid', { unique: true });
                // store.createIndex('title', 'title', { unique: false });
                // store.createIndex('year', 'year', { unique: false });
                
            };
            
        },
        /**
        * @param {string} store_name
        * @param {string} mode either "readonly" or "readwrite"
        */
        getObjectStore: function(store_name, mode) {
            var tx = this.db.transaction(store_name, mode);
            return tx.objectStore(store_name);
        },
        addQueue: function(phone, beerNum, callback) {
            console.log("addQueue arguments:", arguments);
            var obj = { phone: phone, beerNum: beerNum, slot: null, status: "Waiting...", startTime: new Date(), endTime: null };
            
            var store = this.getObjectStore(this.DB_STORE_NAME_QUEUE, 'readwrite');
            var req;
            try {
              req = store.add(obj);
            } catch (e) {
              throw e;
            }
            req.onsuccess = function (evt) {
                console.log("addQueue. Insertion in DB successful. evt:", evt);
                var res = evt.target.result;
                if (callback) callback(res);
            };
            req.onerror = function() {
              console.error("addQueue. error", this.error);
            };    
        },
        updateQueue: function(record, callback) {
            console.log("updateQueue");
            var store = this.getObjectStore(this.DB_STORE_NAME_QUEUE, 'readwrite');
            var req = store.put(record);
            if (req == null) callback(null);
            req.onsuccess = function(evt) {
                callback(evt);
            }
            
        },
        getQueue: function(id, callback) {
            var store = this.getObjectStore(this.DB_STORE_NAME_QUEUE, 'readonly');
            var req = store.get(id);
            if (req == null) {
                callback(null);
            }
            req.onsuccess = function(evt) {
                console.log("getQueue. got success. evt:", evt, "evt.target.result:", evt.target.result);
                var res = evt.target.result;
                if (callback) callback(res);
            }
        },
        /**
        * @param {string} phone
        * @param {integer} beers
        * @param {date} lastBeer
        * @param {date} prevBeer
        */
        addUser: function(phone, beers, lastBeer, prevBeer, callback) {
            console.log("addUser arguments:", arguments);
            var obj = { phone: phone, beers: beers, lastBeer: lastBeer, prevBeer: prevBeer };
            
            var store = this.getObjectStore(this.DB_STORE_NAME, 'readwrite');
            var req;
            try {
              req = store.add(obj);
            } catch (e) {
              throw e;
            }
            req.onsuccess = function (evt) {
              console.log("addUser. Insertion in DB successful. evt:", evt);
              if (callback) callback();
            //   displayActionSuccess();
            //   displayPubList(store);
            };
            req.onerror = function() {
              console.error("addUser. error", this.error);
            };
        },
        updateUser: function(record, callback) {
            var store = this.getObjectStore(this.DB_STORE_NAME, 'readwrite');
            var req = store.put(record);
            if (req == null) callback(null);
            req.onsuccess = function(evt) {
                callback(evt);
            }
            
        },
        getUser: function(phone, callback) {
            
            console.log("getUser. phone:", phone, "callback:", callback);
            var store = this.getObjectStore(this.DB_STORE_NAME, 'readonly');
            var req = store.get(phone);
            if (req == null) {
                callback(null);
            }
            req.onsuccess = function(evt) {
                console.log("getUser. got success. evt:", evt, "evt.target.result:", evt.target.result);
                var res = evt.target.result;
                callback(res);
            }
            
        },
        
        /**
         * Try to get a reference to the 3D viewer.
         */
        init3d: function () {
            this.get3dObj();
            if (this.obj3d == null) {
                console.log("loading 3d scene failed, try again in 1 second");
                var attempts = 1;
                var that = this;
                setTimeout(function () {
                    that.get3dObj();
                    if (that.obj3d == null) {
                        attempts++;
                        setTimeout(function () {
                            that.get3dObj();
                            if (that.obj3d == null) {
                                console.log("giving up on trying to get 3d");
                            } else {
                                console.log("succeeded on getting 3d after attempts:", attempts);
                                that.onInit3dSuccess();
                            }
                        }, 5000);
                    } else {
                        console.log("succeeded on getting 3d after attempts:", attempts);
                        that.onInit3dSuccess();
                    }
                }, 1000);
            } else {
                this.onInit3dSuccess();
            }

        },
        drawtexterator: function() {
            // draw the major components of the beer bot
            var main = new THREE.Object3D();
            
            
            // create base box
            var baseGeo = new THREE.BoxGeometry( 500, 700, 20 );
            // var material = new THREE.MeshNormalMaterial({
            //         color: 0xd78356,
            //         transparent: true,
            //         opacity: 0.99,
            //         side: THREE.SingleSide,
            //         depthWrite: false
            //     });
            var baseMat = new THREE.MeshPhongMaterial({
                    color: 0xd5d3cb,
                    // transparent: true,
                    // opacity: 0.99,
                    // side: THREE.DoubleSide,
                    // shading: THREE.FlatShading,
                    // depthWrite: true
                });
            // var material = new THREE.MeshBasicMaterial({
            //         color: 0xd78356,
            //         transparent: true,
            //         opacity: 0.99,
            //         side: THREE.SingleSide,
            //         depthWrite: false
            //     });
            //var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            var baseMesh = new THREE.Mesh( baseGeo, baseMat );
            baseMesh.position.setZ(-10);
            //main.add( baseMesh );
            
            // alternate drawing of box as extrude
            var rectLength = 500, rectWidth = 700;
			var rectShape = new THREE.Shape();
			rectShape.moveTo( 0,0 );
			rectShape.lineTo( 0, rectWidth );
			rectShape.lineTo( rectLength, rectWidth );
			rectShape.lineTo( rectLength, 0 );
			rectShape.lineTo( 0, 0 );
			var extrudeSettings = { 
                amount: 30, bevelEnabled: true, bevelSegments: 2, steps: 2, 
                bevelSize: 3, bevelThickness: 3 };
			var geometry = new THREE.ExtrudeGeometry( rectShape, extrudeSettings );

			var rectMesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { 
			    color: color,
			 //   side: THREE.SingleSide
		    } ) );
		    rectMesh.position.setX(-rectLength/2);
		    rectMesh.position.setY(-rectWidth/2);
		    rectMesh.position.setY(rectMesh.position.y + 100);
		    rectMesh.position.setZ(-15);
		    rectMesh.receiveShadow = true;
		    rectMesh.name = "Base Box";
		    main.add(rectMesh);
            
            // draw lazy susan group
            var lazySusanGroup = new THREE.Object3D();
            
            geometry = new THREE.CylinderGeometry( 450 / 2, 450 / 2, 20, 32 );
            var color = 0x938a79;
            var lazySusanMaterial = new THREE.MeshPhongMaterial({
                    color: color,
                    // transparent: true,
                    // opacity: 0.2,
                    // side: THREE.DoubleSide,
                    // polygonOffset: true,
                    // polygonOffsetFactor: 2,
                    // polygonOffsetUnits: 0.5,
                    // depthTest: false,
                    // depthWrite: false
                });
            // var cylinder = new THREE.Mesh( geometry, material );
            // cylinder.rotateX(Math.PI / 2);
            // cylinder.position.setZ(11);
            // cylinder.position.setY(-100);
            //main.add( cylinder );
            
            var shape = new THREE.Shape();
            shape.absellipse(0, 0, 450 / 2, 450 / 2, 0, Math.PI * 2);
            //shape.autoClose = true;
            
            // let's make a circle with 8 segments so we can extract the xy val for each vertex
            var radius = 350 / 2;
            var segments = 8;
            var holeCenterGeometry = new THREE.CircleGeometry( radius, segments );

            for (var hi = 0; hi < 8; hi++) {
                
                var pt = holeCenterGeometry.vertices[hi + 1]
                var hole = new THREE.Path();
                hole.absellipse(pt.x, pt.y, 85/2, 85/2, 0, Math.PI * 2, true);
                shape.holes.push(hole);
            }
            
            // var geometry = new THREE.ShapeGeometry( shape );

// 			var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { 
			 //   color: color, side: THREE.DoubleSide } ) );
// 			mesh.position.set( x, y, z - 125 );
// 			mesh.rotation.set( rx, ry, rz );
// 			mesh.scale.set( s, s, s );
// 			main.add( mesh );
            
            // extruded shape
            var extrudeSettings = { 
                amount: 30, bevelEnabled: true, bevelSegments: 2, steps: 2, 
                bevelSize: 2.5, bevelThickness: 2.5 };
			var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

			var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { 
			    color: color,
			    depthTest: true, 
                depthWrite: true, 
                polygonOffset: true,
                polygonOffsetFactor: -4
			 //   side: THREE.SingleSide
		    } ) );
// 			mesh.position.set( x, y, z - 75 );
// 			mesh.rotation.set( rx, ry, rz );
// 			mesh.scale.set( s, s, s );
            mesh.position.setZ(40);
            //mesh.position.setY(-100);
            mesh.castShadow = true;
            mesh.name = "Lazy Susan";
			lazySusanGroup.add( mesh );
			
			// Red solo cups
			var redCupGroup = new THREE.Object3D();
			
			var redCupGeo = new THREE.CylinderGeometry( 45, 35, 100, 32 );
			var color = 0x8B0000;
            var redCupMat = new THREE.MeshPhongMaterial({
                    color: color,
                    // transparent: true,
                    // opacity: 0.2,
                    // side: THREE.DoubleSide,
                    // polygonOffset: true,
                    // polygonOffsetFactor: 2,
                    // polygonOffsetUnits: 0.5,
                    // depthTest: false,
                    // depthWrite: false
                });
                
            var ptZero = new THREE.Vector3(0,0,0);
            for(var i in holeCenterGeometry.vertices) {
                if (i == 0 || i == 9) continue;
                var pt = holeCenterGeometry.vertices[i];
                var redCupMesh = new THREE.Mesh( redCupGeo, redCupMat );
                redCupMesh.rotateX(Math.PI / 2);
                redCupMesh.position.set(pt.x, pt.y, 0);
                redCupGroup.add(redCupMesh);
                
                // add cup numbers
                var numMesh = this.makeText(
                    {text:i, height:3, x:pt.x, y:pt.y, z:80, size:30}
                );
                // need to center
                
                numMesh.rotateX(Math.PI / 2);
                
                // create grp cuz i don't know how to apply 2 rotations
                // but the group does it for me
                var numGrp = new THREE.Object3D();
                numGrp.add(numMesh);
                
                //var pt2 = new THREE.Vector2(pt.x, pt.y);
                // computes the angle in radians with respect to the positive x-axis
        		var angleto = Math.atan2( pt.y, pt.x );
        		if ( angleto < 0 ) angleto += 2 * Math.PI;
                //numMesh.rotateZ(angle);
                var pt3 = new THREE.Vector3(pt.x, pt.y, 0);
                pt3.normalize();
                console.log("pt3:", pt3, "ptZero:", ptZero);
                //var v = ptZero;
                //var theta = pt3.dot( v ) / ( Math.sqrt( pt3.lengthSq() * v.lengthSq() ) );
                //var angleto = theta; //pt3.angleTo(ptZero);
                //var angleto = ptZero.angleTo(pt3);
                console.log("angleto:", angleto);
                //numGrp.rotateZ(angleto);
                //numGrp.rotateZ(Math.PI / 2);
                //numGrp.position.set(pt.x, pt.y, 0);
                
                redCupGroup.add(numGrp);
            }
            redCupGroup.position.setZ(70);
            lazySusanGroup.add( redCupGroup );
            
			
			main.add(lazySusanGroup);
			
            // var extrudeSettings = { amount: 18, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
            // var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
            // var lazysusan = new THREE.Mesh( geometry, lazySusanMaterial );
            // lazysusan.position.setZ(10);
            // lazysusan.position.setY(-100);
            //main.add(lazysusan);

            // remove the grid
            this.obj3dmeta.widget.gridTurnOff();
            
            this.mySceneGroup = main;
            this.sceneReAddMySceneGroup();
            this.obj3dmeta.camera.far = 5000;
            this.obj3dmeta.camera.near = 10;
            console.log("texterator three obj:", this.obj3d, "objmeta:", this.obj3dmeta);
            
            chilipeppr.publish('/com-chilipeppr-widget-3dviewer/viewextents' );
            
        },
        createText: function(text, options) {
            
            // taken from http://threejs.org/examples/webgl_geometry_text.html
            
            /*
			textGeo = new THREE.TextGeometry( text, {

				font: options.font ? options.font : "",

				size: size,
				height: height,
				curveSegments: curveSegments,

				bevelThickness: bevelThickness,
				bevelSize: bevelSize,
				bevelEnabled: bevelEnabled,

				material: 0,
				extrudeMaterial: 1

			});

			textGeo.computeBoundingBox();
			textGeo.computeVertexNormals();

			// "fix" side normals by removing z-component of normals for side faces
			// (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)

			if ( ! bevelEnabled ) {

				var triangleAreaHeuristics = 0.1 * ( height * size );

				for ( var i = 0; i < textGeo.faces.length; i ++ ) {

					var face = textGeo.faces[ i ];

					if ( face.materialIndex == 1 ) {

						for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

							face.vertexNormals[ j ].z = 0;
							face.vertexNormals[ j ].normalize();

						}

						var va = textGeo.vertices[ face.a ];
						var vb = textGeo.vertices[ face.b ];
						var vc = textGeo.vertices[ face.c ];

						var s = THREE.GeometryUtils.triangleArea( va, vb, vc );

						if ( s > triangleAreaHeuristics ) {

							for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

								face.vertexNormals[ j ].copy( face.normal );

							}

						}

					}

				}

			}

			var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			textMesh1 = new THREE.Mesh( textGeo, material );

			textMesh1.position.x = centerOffset;
			textMesh1.position.y = hover;
			textMesh1.position.z = 0;

			textMesh1.rotation.x = 0;
			textMesh1.rotation.y = Math.PI * 2;

			group.add( textMesh1 );

			if ( mirror ) {

				textMesh2 = new THREE.Mesh( textGeo, material );

				textMesh2.position.x = centerOffset;
				textMesh2.position.y = -hover;
				textMesh2.position.z = height;

				textMesh2.rotation.x = Math.PI;
				textMesh2.rotation.y = Math.PI * 2;

				group.add( textMesh2 );

			}
			*/

		},
        /**
         * Pass in vals {
         *   color: 0xff0000, // default 0x999999
         *   text: "asdf",
         *   height: 10, // default 1
         *   size: 5, // default 10
         *   x: 0,
         *   y: 0,
         *   z: 0,
         * }
         */
        makeText: function(vals) {
            var shapes, geom, mat, mesh;
            
            console.log("Do we have the global ThreeHelvetiker font:", ThreeHelvetiker);
            console.log("THREE.FontUtils:", THREE.FontUtils);
            
            if (!THREE.FontUtils) {
                console.error("THREE.FontUtils not defined per bug in r73 of three.js. So not making text.");
                return;
            }
            
            THREE.FontUtils.loadFace(ThreeHelvetiker);
            shapes = THREE.FontUtils.generateShapes( vals.text, {
                font: "helvetiker",
                height: vals.height ? vals.height : 1,
                //weight: "normal",
                size: vals.size ? vals.size : 10
            } );
            geom = new THREE.ShapeGeometry( shapes );
            mat = new THREE.MeshPhongMaterial({
                color: vals.color ? vals.color : 0x999999,
                side: THREE.DoubleSide,
                // transparent: true,
                // opacity: vals.opacity ? vals.opacity : 0.5,
            });
            mesh = new THREE.Mesh( geom, mat );
            
            mesh.position.x = vals.x;
            mesh.position.y = vals.y;
            mesh.position.z = vals.z;
            
            return mesh;
            
        },
        onInit3dSuccess: function () {
            console.log("onInit3dSuccess. That means we finally got an object back.");
            this.clear3dViewer();
            
            // open the last file
            //var that = this;
            //setTimeout(function () {
                //that.open();
            //}, 1000);
            this.drawtexterator();
        },
        obj3d: null, // gets the 3dviewer obj stored in here on callback
        obj3dmeta: null, // gets metadata for 3dviewer
        userCallbackForGet3dObj: null,
        get3dObj: function (callback) {
            this.userCallbackForGet3dObj = callback;
            chilipeppr.subscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this, this.get3dObjCallback);
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/request3dObject", "");
            chilipeppr.unsubscribe("/com-chilipeppr-widget-3dviewer/recv3dObject", this.get3dObjCallback);
        },
        get3dObjCallback: function (data, meta) {
            console.log("got 3d obj:", data, meta);
            this.obj3d = data;
            this.obj3dmeta = meta;
            if (this.userCallbackForGet3dObj) {
                //setTimeout(this.userCallbackForGet3dObj.bind(this), 200);
                //console.log("going to call callback after getting back the new 3dobj. this.userCallbackForGet3dObj:", this.userCallbackForGet3dObj);
                this.userCallbackForGet3dObj();
                this.userCallbackForGet3dObj = null;
            }
        },
        is3dViewerReady: false,
        clear3dViewer: function () {
            console.log("clearing 3d viewer");
            chilipeppr.publish("/com-chilipeppr-widget-3dviewer/sceneclear");
            //if (this.obj3d) this.obj3d.children = [];            
            /*
            this.obj3d.children.forEach(function(obj3d) {
                chilipeppr.publish("/com-chilipeppr-widget-3dviewer/sceneremove", obj3d);
            });
            */
            this.is3dViewerReady = true;
            
            // this should reset the 3d viewer to resize to high dpi displays
            $(window).trigger("resize");
        },
        mySceneGroup: null,
        sceneReAddMySceneGroup: function() {
            if (this.obj3d && this.mySceneGroup) {
                this.obj3d.add(this.mySceneGroup);
            }
            this.obj3dmeta.widget.wakeAnimate();
        },
        sceneRemoveMySceneGroup: function() {
            if (this.obj3d && this.mySceneGroup) {
                this.obj3d.remove(this.mySceneGroup);
            }
            this.obj3dmeta.widget.wakeAnimate();
        },
        /**
         * Call this method from init to setup all the buttons when this widget
         * is first loaded. This basically attaches click events to your 
         * buttons. It also turns on all the bootstrap popovers by scanning
         * the entire DOM of the widget.
         */
        btnSetup: function() {

            // Chevron hide/show body
            var that = this;
            $('#' + this.id + ' .hidebody').click(function(evt) {
                console.log("hide/unhide body");
                if ($('#' + that.id + ' .panel-body').hasClass('hidden')) {
                    // it's hidden, unhide
                    that.showBody(evt);
                }
                else {
                    // hide
                    that.hideBody(evt);
                }
            });

            // Ask bootstrap to scan all the buttons in the widget to turn
            // on popover menus
            $('#' + this.id + ' .btn').popover({
                delay: 1000,
                animation: true,
                placement: "auto",
                trigger: "hover",
                container: 'body'
            });

            // Init Say Hello Button on Main Toolbar
            // We are inlining an anonymous method as the callback here
            // as opposed to a full callback method in the Hello Word 2
            // example further below. Notice we have to use "that" so 
            // that the this is set correctly inside the anonymous method
            $('#' + this.id + ' .btn-sayhello').click(function() {
                console.log("saying hello");
                // Make sure popover is immediately hidden
                $('#' + that.id + ' .btn-sayhello').popover("hide");
                // Show a flash msg
                chilipeppr.publish(
                    "/com-chilipeppr-elem-flashmsg/flashmsg",
                    "Hello Title",
                    "Hello World from widget " + that.id,
                    1000
                );
            });

            // Init Hello World 2 button on Tab 1. Notice the use
            // of the slick .bind(this) technique to correctly set "this"
            // when the callback is called
            $('#' + this.id + ' .btn-helloworld2').click(this.onHelloBtnClick.bind(this));

        },
        /**
         * onHelloBtnClick is an example of a button click event callback
         */
        onHelloBtnClick: function(evt) {
            console.log("saying hello 2 from btn in tab 1");
            chilipeppr.publish(
                '/com-chilipeppr-elem-flashmsg/flashmsg',
                "Hello 2 Title",
                "Hello World 2 from Tab 1 from widget " + this.id,
                2000 /* show for 2 second */
            );
        },
        /**
         * User options are available in this property for reference by your
         * methods. If any change is made on these options, please call
         * saveOptionsLocalStorage()
         */
        options: null,
        /**
         * Call this method on init to setup the UI by reading the user's
         * stored settings from localStorage and then adjust the UI to reflect
         * what the user wants.
         */
        setupUiFromLocalStorage: function() {

            // Read vals from localStorage. Make sure to use a unique
            // key specific to this widget so as not to overwrite other
            // widgets' options. By using this.id as the prefix of the
            // key we're safe that this will be unique.

            // Feel free to add your own keys inside the options 
            // object for your own items

            var options = localStorage.getItem(this.id + '-options');

            if (options) {
                options = $.parseJSON(options);
                console.log("just evaled options: ", options);
            }
            else {
                options = {
                    showBody: true,
                    tabShowing: 1,
                    customParam1: null,
                    customParam2: 1.0
                };
            }

            this.options = options;
            console.log("options:", options);

            // show/hide body
            if (options.showBody) {
                this.showBody();
            }
            else {
                this.hideBody();
            }

        },
        /**
         * When a user changes a value that is stored as an option setting, you
         * should call this method immediately so that on next load the value
         * is correctly set.
         */
        saveOptionsLocalStorage: function() {
            // You can add your own values to this.options to store them
            // along with some of the normal stuff like showBody
            var options = this.options;

            var optionsStr = JSON.stringify(options);
            console.log("saving options:", options, "json.stringify:", optionsStr);
            // store settings to localStorage
            localStorage.setItem(this.id + '-options', optionsStr);
        },
        /**
         * Show the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        showBody: function(evt) {
            $('#' + this.id + ' .panel-body').removeClass('hidden');
            $('#' + this.id + ' .panel-footer').removeClass('hidden');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = true;
                this.saveOptionsLocalStorage();
            }
        },
        /**
         * Hide the body of the panel.
         * @param {jquery_event} evt - If you pass the event parameter in, we 
         * know it was clicked by the user and thus we store it for the next 
         * load so we can reset the user's preference. If you don't pass this 
         * value in we don't store the preference because it was likely code 
         * that sent in the param.
         */
        hideBody: function(evt) {
            $('#' + this.id + ' .panel-body').addClass('hidden');
            $('#' + this.id + ' .panel-footer').addClass('hidden');
            $('#' + this.id + ' .hidebody span').removeClass('glyphicon-chevron-up');
            $('#' + this.id + ' .hidebody span').addClass('glyphicon-chevron-down');
            if (!(evt == null)) {
                this.options.showBody = false;
                this.saveOptionsLocalStorage();
            }
        },
        /**
         * This method loads the pubsubviewer widget which attaches to our 
         * upper right corner triangle menu and generates 3 menu items like
         * Pubsub Viewer, View Standalone, and Fork Widget. It also enables
         * the modal dialog that shows the documentation for this widget.
         * 
         * By using chilipeppr.load() we can ensure that the pubsubviewer widget
         * is only loaded and inlined once into the final ChiliPeppr workspace.
         * We are given back a reference to the instantiated singleton so its
         * not instantiated more than once. Then we call it's attachTo method
         * which creates the full pulldown menu for us and attaches the click
         * events.
         */
        forkSetup: function() {
            var topCssSelector = '#' + this.id;

            $(topCssSelector + ' .panel-title').popover({
                title: this.name,
                content: this.desc,
                html: true,
                delay: 1000,
                animation: true,
                trigger: 'hover',
                placement: 'auto'
            });

            var that = this;
            chilipeppr.load("http://fiddle.jshell.net/chilipeppr/zMbL9/show/light/", function() {
                require(['inline:com-chilipeppr-elem-pubsubviewer'], function(pubsubviewer) {
                    pubsubviewer.attachTo($(topCssSelector + ' .panel-heading .dropdown-menu'), that);
                });
            });

        },

    }
});