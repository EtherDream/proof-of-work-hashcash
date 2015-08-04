/**
 * HTML5 风格的 WebWorker
 *   @author: EtherDream
 *   @update: 2015/07/20
 */
import flash.utils.ByteArray;
import flash.events.Event;
import flash.events.EventDispatcher;
import flash.system.MessageChannel;
import flash.system.WorkerDomain;
import flash.system.Worker;


class WebWorker extends EventDispatcher {

    private var worker:Worker;
    private var mainToBack:MessageChannel;
    private var backToMain:MessageChannel;
    private var ready = false;
    private var queue = [];

    
    private function onMessage(e:Event) {
        if (!backToMain.messageAvailable) {
            return;
        }

        var data:Dynamic = backToMain.receive();

        // flush queue
        if (!ready && data == '__connected__') {
            ready = true;
            for (v in queue) {
                mainToBack.send(v);
            }
            queue = null;
            return;
        }

        dispatchEvent(new WebWorkerEvent('message', data));
    }

    public function new(blob:ByteArray) {
        super();
        worker = WorkerDomain.current.createWorker(blob);
        mainToBack = Worker.current.createMessageChannel(worker);

        backToMain = worker.createMessageChannel(Worker.current);
        backToMain.addEventListener(Event.CHANNEL_MESSAGE, onMessage);

        worker.setSharedProperty('backToMain', backToMain);
        worker.setSharedProperty('mainToBack', mainToBack);
        worker.start();
    }

    public function postMessage(data:Dynamic) {
        if (ready) {
            mainToBack.send(data);
        } else {
            queue.push(data);
        }
    }

    public function terminate() {
        worker.terminate();
    }
}
