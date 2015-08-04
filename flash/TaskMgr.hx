import flash.Lib;


class TaskMgr {
    private var prog = 0;

    public function reset() {
        prog = 32;
    }

    public function next() {
        // not found
        if (prog == 126) {
            return null;
        }

        return {
            beg: prog,
            end: ++prog
        };
    }
}