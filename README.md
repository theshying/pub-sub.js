# event-bus

### Introduction

> event-bus is a ligtweight、none dependence lib, it supports distribution、subscription and offline subscription.

### Install

> npm i event-bus

### Usage

#### Browser
```javascript
  <script src="../dist/event_bus.js"></script>
    var e = new eventBus({
    });
```
#### Node
```javascript
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

> **add  handler functon**
<table>
    <thead>
        <tr>
            <th>name</th>
            <th>default</th>
            <th>descriptin</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>-</td>
            <td>subject of pub-sub, support String Number Boolean and Expression</td>
        </tr>
        <tr>
            <td>cb</td>
            <td>-</td>
            <td>handler  of pub-sub</td>
        </tr>
        <tr>
            <td>offline</td>
            <td>false</td>
            <td>support offline subscibe? default:false.</td>
        </tr>
        <tr>
            <td>flag</td>
            <td>false</td>
            <td>unshift or push  handler  in event queue(true: unshift, false: push) default true</td>
        </tr>
    </tbody>
</table>
#### once(type, cb, offline, flag)

> **add handler functon, this function will only execute one time**

 - *type:* :       subject of pub-sub
 - *cb:*         handler  of pub-sub
 - *offline:*:     support offline subscibe? default:false.
 - *flag:*     handler  unshift or push in event queue(true: unshift, false: push) default true

> ps: the handler use once() to add will not be removed by off()
 


#### emit(type, message)

> **publish a messgae in a subject**

- *type:* subject of publish
- *message:* message of publish

#### off(type, cd)

>**remove hanbler function**

> ps: off(type) will remove all handler under this subject

#### emitList()
>**return all pulish message list**

#### eventList()
>**return all subscibe handler**
