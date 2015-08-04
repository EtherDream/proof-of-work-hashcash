
class ChildThread extends WebWorkerContext {

    public function new() {
        super();
        addEventListener('message', onmessage);
    }


    private function dword_to_str4(val:UInt) {
        return (
            String.fromCharCode(val >>  0 & 0xff) +
            String.fromCharCode(val >>  8 & 0xff) +
            String.fromCharCode(val >> 16 & 0xff) +
            String.fromCharCode(val >> 24 & 0xff)
        );
    }
    private function str4_to_dword(str:String) {
        return (
            str.charCodeAt(0) << 0  |
            str.charCodeAt(1) << 8  |
            str.charCodeAt(2) << 16 |
            str.charCodeAt(3) << 24
        );
    }


    private var x0:UInt;
    private var x1:UInt;
    private var x2:UInt;


    private function task(beg:UInt, end:UInt) {
        var ret = Hashcash.task(beg, end, x0, x1, x2);

        if (ret != 0) {
            postMessage({
                msg: 'found',
                result: dword_to_str4(ret)
            });
        } else {
            postMessage({
                msg: 'done'
            });
        }
    }


    private function onmessage(e:WebWorkerEvent) {
        var data = e.data;

        switch (data.msg) {
        case 'init':
            var input:String = data.input;
            x0 = str4_to_dword( input.substr(0, 4) );
            x1 = str4_to_dword( input.substr(4, 4) );
            x2 = str4_to_dword( input.substr(8, 4) );
            postMessage({msg: 'ready'});

        case 'task':
            task(data.beg, data.end);
        }
    }
}