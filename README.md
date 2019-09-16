# deliveryman

deliveryman: simple tool for messages between iframes and main page, made for micro frontend development.

## usage

### install

npm i deliveryman

or yarn add deliveryman

### basic code

```js
// common

import Deliveryman from 'deliveryman';

const deliveryman = new Deliveryman();

// from iframe

deliveryman.send('package', { name: 'huawei p30 pro', price: '￥6000' });

// from main page

deliveryman.delivering('package', function(package) {
    console.log(package);
});

// or u can just use receive

const package = deliveryman.receive('package');
```

## apis

| api | type | return | description
| --- | --- | --- | --- |
| `send` | Function(key: string, data: any) | void | send message |
| `delivering` | Function(key: string, callback: Function) | void | listen message and receive data |
| `receive` | Function(key: string) | data: any | receive message |
| `delete` | Function(key: string) | boolean | delete message |
| `fire` | Function() | void | destroy deliveryman |