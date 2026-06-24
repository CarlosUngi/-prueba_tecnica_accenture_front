import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StorageRepository } from '../../core/repositories/storage.repository';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService implements StorageRepository {
    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
        this.initStorage();
    }

    private async initStorage() {
        if (!this._storage) {
            const storage = await this.storage.create();
            this._storage = storage;
        }
    }

    private getStorage(): Observable<Storage> {
        if (this._storage) {
            return of(this._storage);
        }
        return from(this.storage.create()).pipe(
            map(storage => {
                this._storage = storage;
                return storage;
            })
        );
    }

    get<T>(key: string): Observable<T | null> {
        return this.getStorage().pipe(
            switchMap(storage => from(storage.get(key))),
            map(value => value as T | null)
        );
    }

    set<T>(key: string, value: T): Observable<boolean> {
        return this.getStorage().pipe(
            switchMap(storage => from(storage.set(key, value))),
            map(() => true)
        );
    }

    remove(key: string): Observable<boolean> {
        return this.getStorage().pipe(
            switchMap(storage => from(storage.remove(key))),
            map(() => true)
        );
    }

    clear(): Observable<boolean> {
        return this.getStorage().pipe(
            switchMap(storage => from(storage.clear())),
            map(() => true)
        );
    }
}