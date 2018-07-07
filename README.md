# event-bus

## Introduction

> pub-sub.js is a ligtweight、none dependence lib, it supports event pulish、subscibe and offline subscibe.

## Install

> npm i super-pub-sub.js --save

## Usage

### Browser
```javascript
  <script src="../dist/event_bus.js"></script>
    var e = new eventBus({
    });
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
### Node
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


## Api

### on(type, cb ,offline, flag)

> **add  handler functon**
<table>
    <thead>
        <tr>
            <th>name</th>
            <th>type</th>
            <th>default</th>
            <th>descriptin</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>String Number Boolean  Expression</td>
            <td>-</td>
            <td>subject of pub-sub</td>
        </tr>
        <tr>
            <td>cb</td>
            <td>Function</td>
            <td>-</td>
            <td>handler of pub-sub</td>
        </tr>
        <tr>
            <td>offline</td>
            <td>Boolean</td>
            <td>false</td>
            <td>support offline subscibe? default:false.</td>
        </tr>
        <tr>
            <td>flag</td>
            <td>Boolean</td>
            <td>false</td>
            <td>unshift or push  handler in event queue(true: unshift, false: push)</td>
        </tr>
    </tbody>
</table>
### once(type, cb, offline, flag)

> **add handler functon, this function will only execute one time**

<table>
    <thead>
        <tr>
            <th>name</th>
            <th>type</th>
            <th>default</th>
            <th>descriptin</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>String Number Boolean  Expression</td>
            <td>-</td>
            <td>subject of pub-sub</td>
        </tr>
        <tr>
            <td>cb</td>
            <td>Function</td>
            <td>-</td>
            <td>handler of pub-sub</td>
        </tr>
        <tr>
            <td>offline</td>
            <td>Boolean</td>
            <td>false</td>
            <td>support offline subscibe? default:false.</td>
        </tr>
        <tr>
            <td>flag</td>
            <td>Boolean</td>
            <td>false</td>
            <td>unshift or push  handler in event queue(true: unshift, false: push)</td>
        </tr>
    </tbody>
</table>
> ps: the handler use once() to add will not be removed by off()
 


### emit(type, message)

> **publish a messgae in a subject**
<table>
    <thead>
        <tr>
            <th>name</th>
            <th>type</th>
            <th>default</th>
            <th>descriptin</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>type</td>
            <td>String Number Boolean  Expression</td>
            <td>-</td>
            <td>subject of publish</td>
        </tr>
        <tr>
            <td>cb</td>
            <td>Function</td>
            <td>-</td>
            <td>message of publish</td>
        </tr>
     
    </tbody>
</table>

### off(type, cd)

>**remove hanbler function**

> *ps: off(type) will remove all handler under this subject*
### emitList()
>**return all pulish message list**

### eventList()
>**return all subscibe handler**
