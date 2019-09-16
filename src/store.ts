/*
 * File: store.ts
 * Desc: store util
 * File Created: 2019-09-12 22:14:29
 * Author: chenghao
 * ------
 * Copyright 2019 - present, karakal
 */
import StoreEnum from './config';
interface IFStore {
    write: (key: string, value: string) => boolean;
    read: (key: string) => string | null;
    remove: (key: string) => boolean;
    removeAll: (key: string) => boolean;
}

class Store implements IFStore {
    /**
     * write into sessionStorage
     * @param key
     * @param value
     */
    write(key: string, value: string): boolean {
        sessionStorage.setItem(key, value);
        return sessionStorage.getItem(key) === value;
    }

    /**
     * read sessionStorage value
     * @param key
     */
    read(key: string): string | null {
        return sessionStorage.getItem(key);
    }

    /**
     * remove seesionStorage value single
     * @param key
     */
    remove(key: string): boolean {
        sessionStorage.removeItem(key);
        return !!sessionStorage.getItem(key);
    }

    /**
     * remove all deliveryman value
     */
    removeAll(): boolean {
        const _arr = [...new Array(sessionStorage.length)];
        // delete one by one
        _arr.forEach((v: any, index: number) => {
            const _key = sessionStorage.key(index);
            if (_key && _key.match(StoreEnum.prefix)) {
                sessionStorage.removeItem(_key);
            }
        });
        // check if exists
        return _arr.some((v: any, index: number) => {
            const _key = sessionStorage.key(index);
            if (_key) return !!_key.match(StoreEnum.prefix);
            return false;
        });
    }
}

export default Store;
