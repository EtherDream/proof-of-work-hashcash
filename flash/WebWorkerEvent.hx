import flash.events.Event;

class WebWorkerEvent extends Event {
    public var data:Dynamic;

    public function new(type:String, data:Dynamic) {
        super(type);
        this.data = data;
    }
}