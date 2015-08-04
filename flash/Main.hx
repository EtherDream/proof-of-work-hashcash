import flash.system.Worker;


class Main {
    static function main() {
        // 为方便起见，主模块和线程模块共用一个 swf
        if (Worker.current.isPrimordial) {
            new HostThread();
        } else {
            new ChildThread();
        }
    }
}
