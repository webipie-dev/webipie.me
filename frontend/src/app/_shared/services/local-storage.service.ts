import { Injectable } from '@angular/core';
import StorageService from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService extends StorageService {

	private _storage = localStorage;

	constructor() {
		super();
	}

	protected get storage(): Storage {
		return this._storage;
	}
}