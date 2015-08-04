import flash.external.ExternalInterface;
import flash.system.Security;
import flash.Lib;


class HostThread {
    private var mWorkers:Array<WebWorker> = [];
    private var mTaskMgr:TaskMgr = new TaskMgr();
    private var mInput:String;


    public function new() {
        Security.allowDomain('*');

        ExternalInterface.addCallback('Start', extern_start);
        ExternalInterface.call('__fla_pow_ready');
    }

    /**
     * 
     */
    public function extern_start(thread:UInt, input:String) {
        mInput = input;
        mTaskMgr.reset();

        for (i in 0 ... thread) {
            var worker = new WebWorker(Lib.current.loaderInfo.bytes);
            worker.addEventListener('message', onmessage);
            worker.postMessage({
                msg: 'init',
                input: input
            });
            mWorkers[i] = worker;
        }
    }

    private function stop() {
        for (w in mWorkers) {
            w.terminate();
        }
    }

    private function complete(result:String) {
        ExternalInterface.call('__fla_pow_complete', mInput, result);
    }

    private function onmessage(e:WebWorkerEvent) {
        var worker:WebWorker = e.target;
        var data = e.data;

        // 计算出结果
        if (data.msg == 'found') {
            stop();
            complete(data.result);
            return;
        }

        // 分配下一个计算任务
        var task = mTaskMgr.next();
        if (task == null) {
            complete(null);
        } else {
            worker.postMessage({
                msg: 'task',
                beg: task.beg,
                end: task.end
            });
        }
    }
}
