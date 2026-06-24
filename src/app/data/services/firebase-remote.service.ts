import { Injectable } from '@angular/core';
import { RemoteConfig, getValue, fetchAndActivate } from '@angular/fire/remote-config';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseRemoteService {
    private isCategoriesEnabledSubject = new BehaviorSubject<boolean>(true);
    isCategoriesEnabled$: Observable<boolean> = this.isCategoriesEnabledSubject.asObservable();

    constructor(private remoteConfig: RemoteConfig) {
        this.initRemoteConfig();
    }

    private async initRemoteConfig() {
        try {
            this.remoteConfig.defaultConfig = {
                'show_categories_feature': true
            };

            await fetchAndActivate(this.remoteConfig);

            const remoteValue = getValue(this.remoteConfig, 'show_categories_feature').asBoolean();

            this.isCategoriesEnabledSubject.next(remoteValue);
            console.log('🔥 Remote Config inicializado con éxito. show_categories_feature =', remoteValue);
        } catch (error) {
            console.error('❌ Error al conectar o sincronizar con Firebase Remote Config:', error);
        }
    }
}