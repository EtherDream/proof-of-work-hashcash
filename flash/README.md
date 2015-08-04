
Hashcash Flash 版实现

## HostThread.hx

主模块

## ChildThread.hx

子线程模块


**为了方便移植，这里封装了一个 HTML5 风格的 WebWorker**

### WebWorker.hx

在主程序中：
```
new WebWorker(swf bytearray)
```

即可类似 HTML5 的线程创建：
```
new Worker(js blob)
```

### WebWorkerContext.hx

子线程模块继承该类，可获得 message 事件、postMessage 方法。

```
class Child extends WebWorkerContext {
	postMessage(...)
	this.addEventListener('message', ...)
}
```

### WebWorkerEvent.hx

消息事件的参数类型，提供 data 属性

```
// main
worker.addEventListener('message', function(e:WebWorkerEvent) {
	e.data;		// data from child
});

// child
this.addEventListener('message', function(e:WebWorkerEvent) {
	e.data;		// data from main
});
```
