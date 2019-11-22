<h1 align="center">Welcome to @theshy/pub-sub.js 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@theshy/pub-sub.js" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@theshy/pub-sub.js.svg">
  </a>
  <a href="https://github.com/theshying/pub-sub.js#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/theshying/pub-sub.js/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/theshying/pub-sub.js/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/theShy/@theshy/pub-sub.js" />
  </a>
</p>

> super-pub-sub.js is a ligtweight、none dependence lib, it supports event pulish、subscibe and offline subscibe.

### 🏠 [Homepage](https://github.com/theshying/pub-sub.js#readme)

## :tada:Install

```sh
npm i @theshy/pub-sub.js --save
```

## :pencil:Usage

### *Browser*
```javascript
  <script src="/dist/pub-sub.js"></script>
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
### *Node*
```javascript
const _event = require('@theshy/pub-sub.js')
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
## :zap: Api

### *on(type, cb ,offline, flag)*

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


### *once(type, cb, offline, flag)*

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

> *ps: the handler use once() to add will not be removed by off()*



### *emit(type, message)*

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

### *off(type, cb)*

>**remove hanbler function**

> *ps: off(type) will remove all handler under this subject*
### *emitList()*
>**return all pulish message list**

### *eventList()*
>**return all subscibe handler**


## :white_check_mark:Run tests

```sh
npm run test
```

## Author

👤 **theShy**

* Github: [@theShy](https://github.com/theShy)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/theshying/pub-sub.js/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [theShy](https://github.com/theShy).<br />
This project is [MIT](https://github.com/theshying/pub-sub.js/blob/master/LICENSE) licensed.
