(function() {
    var USE_HTML5_WORKER = !!window.Worker && !/Trident/i.test(navigator.userAgent);


    var Pow = window.Pow = {
        state: 0,
        thread: 2,
        onReady: function(){},
        onResolved: function(){},

        STAT_NONE: 0,
        STAT_READY: 1,
        STAT_RESOLVING: 2,
        STAT_RESOLVED: 3
    };


    function onComplete(ques, answ) {
        Pow.state = Pow.STAT_RESOLVED;
        Pow.onResolved(ques, answ);
    }

    Pow.resolve = function(ques) {
        Pow.state = Pow.STAT_RESOLVING;

        if (USE_HTML5_WORKER) {
            worker_start(ques);
        } else {
            fla.Start(Pow.thread, ques);
        }
    };

    //
    // Flash
    //
    var SUPPORT_ACTIVEX = 'ActiveXObject' in window;

    function getFlashVer() {
        var ver = '';
        try {
            if (SUPPORT_ACTIVEX) {
                ver = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                        .GetVariable('$version')
                        .replace(',', '.');
            } else {
                ver = navigator.plugins['Shockwave Flash'].description;
            }
        }
        catch (e) {}
        return +ver.match(/\d+\.\d+/) || -1;
    }
    
    function createFlash(url) {
        var html;
        var id = '__fla' + ~~(1e6 * Math.random());

        if (SUPPORT_ACTIVEX) {
            html = '<object id="' + id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash"><param name="movie" value="' + url + '"><param name="allowScriptAccess" value="always"></object>';
        } else {
            html = '<embed id="' + id + '" src="' + url + '" allowScriptAccess="always"></embed>';
        }
        var box = document.createElement('div');
        box.innerHTML = html;
        box.style.position = 'absolute';
        box.style.top = '-999px';
        document.body.appendChild(box);

        return box.firstChild;
    }

    var fla;

    function initFlash() {
        var ver = getFlashVer();
        if (ver < 11.4) {
            alert('Flash 版本过低');
            return;
        }
        window.__fla_pow_ready = function() {
            setTimeout(function() {
                Pow.onReady();
            }, 0);
        };
        window.__fla_pow_complete = function(ques, answ) {
            setTimeout(function() {
                onComplete(ques, answ);
            }, 0);
        };
        fla = createFlash('pow.swf');
    }

    //
    // HTML5
    //
    function loadFile(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            callback(xhr.responseText)
        };
        xhr.open('GET', url, true);
        xhr.send();
    }

    function initHtml5() {
        loadFile('worker.js', function(text) {
            var blob = new Blob([text], {type: 'application/javascript'});
            var url = URL.createObjectURL(blob);
            worker_init(url);

            Pow.onReady();
        });
    }

    function init() {
        if (USE_HTML5_WORKER) {
            initHtml5();
        } else {
            initFlash();
        }
    }

    init();

    //
    // 线程维护
    //
    var workers = [];

    function worker_init(url) {
        for (var i = 0; i < Pow.thread; i++) {
            workers[i] = new Worker(url);
            workers[i].onmessage = worker_message;
        }
    }

    function worker_stop() {
        workers.forEach(function(w) {
            w.onmessage = null;
            w.terminate();
        });
    }

    function worker_start(input) {
        task_init();

        workers.forEach(function(w) {
            w.postMessage({
                msg: 'init',
                input: input
            });
        });
    }

    function worker_message(e) {
        var data = e.data;

        // 计算出结果
        if (data.msg == 'found') {
            worker_stop();
            onComplete(data.input, data.result);
            return;
        }

        // 分配下一个计算任务
        var task = task_next();
        if (task == null) {
            onComplete(data.input, null);
        } else {
            this.postMessage({
                msg: 'task',
                beg: task.beg,
                end: task.end
            });
        }
    }

    //
    // 任务分配
    //
    var prog;

    function task_init() {
        prog = 32;
    }

    function task_next() {
        // not found
        if (prog == 126) {
            return;
        }
        return {
            beg: prog,
            end: ++prog
        };
    }

})();
