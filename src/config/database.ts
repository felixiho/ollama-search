interface RecordData {
    [key: string]: any;
}

export class IndexedDB {
    private dbName: string;
    private storeName: string;
    private db: IDBDatabase | null = null;

    constructor(dbName: string, storeName: string) {
        this.dbName = dbName;
        this.storeName = storeName;
    }

    openDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };

            request.onsuccess = (event: Event) => {
                this.db = (event.target as IDBOpenDBRequest).result;
                resolve(this.db);
            };

            request.onerror = (event: Event) => {
                reject(`Error opening database: ${(event.target as IDBOpenDBRequest).error}`);
            };
        });
    }

    createRecord(id: string, data: RecordData): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return reject('Database is not open');
            }
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.add({ ...data, id });

            request.onsuccess = () => resolve('Record created successfully');
            request.onerror = () => reject('Error creating record');
        });
    }

    readRecord(id: string): Promise<RecordData | undefined> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return Promise.reject('Database is not open');
            }
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject('Error reading record');
        });
    }

    updateRecord(id: string, newData: RecordData): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return Promise.reject('Database is not open');
            }

            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ ...newData, id });

            request.onsuccess = () => resolve('Record updated successfully');
            request.onerror = () => reject('Error updating record');
        });
    }

    deleteRecord(id: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                return Promise.reject('Database is not open');
            }
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete(id);

            request.onsuccess = () => resolve('Record deleted successfully');
            request.onerror = () => reject('Error deleting record');
        });
    }
}
