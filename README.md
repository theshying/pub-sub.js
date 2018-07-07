# event-bus

### Introduction

> event-bus is a ligtweight、none dependence lib, it supports distribution、subscription and offline subscription.

### Install

> npm i event-bus

### Usage

#### Browser
```
  <script src="../dist/event_bus.js"></script>
    var e = new eventBus({
    });
```
#### Node
```
const _event = require('e')
const e = new _event({})   //init
const handler = (params) => {
    console.log(params)
}
//event subscripte
e.on('msg', handler);  

//event distribute
e.emit('msg', 'recive a message');  

//remove subscripte
e.off('msg', handler)  

```


### Api

#### on(type, cb ,offline, flag)
```
 type: subscribe type
 cb: callback function
 offline: true: support offline subscribe, In other words Subscribe is after emit
 flag: callback insert first or last of event queue
```
#### once

#### emit

#### off

#### emitList

#### eventList

