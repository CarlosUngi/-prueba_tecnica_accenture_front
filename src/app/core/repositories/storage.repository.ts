import { Observable } from 'rxjs';

export interface StorageRepository {
  get<T>(key: string): Observable<T | null>;
  set<T>(key: string, value: T): Observable<boolean>;
  remove(key: string): Observable<boolean>;
  clear(): Observable<boolean>;
}
