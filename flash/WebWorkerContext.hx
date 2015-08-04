import flash.system.*;
import flash.events.*;


class WebWorkerContext extends EventDispatcher {
    private var mainToBack:MessageChannel;
    private var backToMain:MessageChannel;


    public function new() {
        super();
        mainToBack = Worker.current.getSharedProperty('mainToBack');
        backToMain = Worker.current.getSharedProperty('backToMain');

        mainToBack.addEventListener(Event.CHANNEL_MESSAGE, onMessage);
        postMessage('__connected__');
    }

    public function postMessage(msg:Dynamic) {
        backToMain.send(msg);
    }

    private function onMessage(e:Event) {
        if (mainToBack.messageAvailable) {
            var msg = mainToBack.receive();
            dispatchEvent(new WebWorkerEvent('message', msg));
        }
    }
}