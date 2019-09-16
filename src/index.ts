/*
 * File: index.ts
 * Desc: main class
 * File Created: 2019-09-11 23:33:18
 * Author: chenghao
 * ------
 * Copyright 2019 - present, karakal
 */
import Store from './store';
import StoreEnum from './config';

const store = new Store();
interface IFDeliveryman {
    hire: () => void;
    delivering: (name: string, callbak: (express: any) => void) => void;
    send: (key: string, express: any) => void;
    receive: (key: string) => any;
    fire: () => void;
    delete: (key: string) => boolean;
}
interface IFCtr {
    withoutListen: boolean;
}
/**
 * message tool between main page and iframe
 *
 * made for mirco frontend development
 */
class Deliveryman implements IFDeliveryman {
    private callbacks: any = null;

    /**
     * constructor
     * @param options
     * @example
     * options.withoutListen
     */
    constructor(options: IFCtr) {
        store.removeAll();
        // call hire after new
        if (options && !options.withoutListen) this.hire();
    }

    hire() {
        window.addEventListener('message', this.work.bind(this));
    }

    private work(event: MessageEvent) {
        if (!event.data) return;
        const keys = Object.keys(event.data);
        keys.forEach((key: string) => {
            // write after matching prefix
            if (!key.match(StoreEnum.prefix)) return;
            store.write(key, JSON.stringify(event.data[key]));
            // trigger callback
            if (this.callbacks && this.callbacks[key]) this.callbacks[key](event.data[key]);
        });
    }

    /**
     * get message immediately after sending message
     * @param key
     * @param callback
     */
    delivering(key: string, callback: (express: any) => void) {
        if (!this.callbacks) this.callbacks = {};
        // cache callback waiting for recalling
        this.callbacks[StoreEnum.prefix + key] = callback;
    }

    /**
     * send message
     * @param key
     * @param data
     */
    send(key: string, data: any) {
        window.parent.postMessage({ [StoreEnum.prefix + key]: data }, '*');
    }

    /**
     * receive message: make sure message has been sended
     * @param key
     * @example
     * get message by button click
     */
    receive(key: string) {
        return JSON.parse(store.read(StoreEnum.prefix + key) || '') || null;
    }

    /**
     * delete message
     * @param key
     */
    delete(key: string) {
        store.remove(StoreEnum.prefix + key);
        return !!store.read(StoreEnum.prefix + key);
    }

    /**
     * removeEventListener
     */
    fire() {
        window.removeEventListener('message', this.work.bind(this));
    }
}

export default Deliveryman;
