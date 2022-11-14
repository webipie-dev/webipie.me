import { Observable, BehaviorSubject } from 'rxjs';

abstract class StorageService {

	private itemSources: Map<string, BehaviorSubject<string>> = new Map();
	protected abstract get storage(): Storage;

	constructor() {
		addEventListener('storage', (event: StorageEvent) => {
			if (event.key) {
				if (this.itemSources.has(event.key)) {
					this.itemSources.get(event.key)!.next(event.newValue!);
				}
			}
		});
	}

	getItem(key: string): Observable<string> {
		if (!this.itemSources.has(key)) {
			this.itemSources.set(key, new BehaviorSubject<string>(this.storage.getItem(key)!));
		}

		return this.itemSources.get(key)!.asObservable();
	}

	setItem(key: string, value: string) {
		try {
			this.storage.setItem(key, value);
			if(this.itemSources.has(key)) {
				this.itemSources.get(key)!.next(this.storage.getItem(key)!);
			}
		}
		catch (error) {
			this.itemSources.get(key)!.error(error);
		}
	}

	removeItem(key: string) {
		this.storage.removeItem(key);

		if (this.itemSources.has(key)) {
			this.itemSources.get(key)!.next(this.storage.getItem(key)!);	// Expect to be null
			this.itemSources.delete(key);
		}
	}

	clear() {
		this.storage.clear();
		this.itemSources.forEach((itemSource: BehaviorSubject<string>) => {
			itemSource.next(null!);
			itemSource.complete();
		});

		this.itemSources.clear();
	}
}

export default StorageService;