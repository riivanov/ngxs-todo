import {
  ApplicationConfig,
  Injectable,
  provideZoneChangeDetection,
} from '@angular/core';

import {
  STORAGE_ENGINE,
  StorageEngine,
  withNgxsStoragePlugin,
} from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { get, set } from 'idb-keyval';
import { TodoState } from './store/todo/todo.state';

@Injectable()
export class MyStorageEngine implements StorageEngine {
  async getItem(key: string) {
    console.log('getItem', key);
    const tmp = await get(key);
    if (!tmp) return
    return JSON.parse(tmp)
  }

  async setItem(key: string, value: any) {
    console.log('setItem', key, value);
    await set(key, value);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      [TodoState],
      withNgxsStoragePlugin({
        keys: [TodoState],
        async deserialize(obj) {
          if (!obj) return;
          const tmp = await obj;
          console.log('deserialize', tmp);
          if (!tmp) return;
          return tmp;
        },
      })
    ),
    {
      provide: STORAGE_ENGINE,
      useClass: MyStorageEngine,
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
