export class LocalService {
    protected save_Item(key: string, model: any) {
        let storageData = this.get_Items(key);
        // remove if already exist
        storageData = storageData.filter(item => {
            return item.id != model.id;
        });
        // Add new item
        storageData.push(model);
        this.localStoreSet(key, storageData);
    }

    protected get_Item_by_id(key: string, id: number) {
        let storageData = this.localStoreGet(key);
        if (storageData == null || storageData == undefined) {
            return null;
        }
        return storageData.filter(item => {
            return item.id === id;
        })[0];
    }

    protected delete_Item_by_id(key: string, id: number) {
        let storageData = this.localStoreGet(key);
        if (storageData == null || storageData == undefined) {
            console.log(`Can not delete. The item with id = ${id} does not exit !`)
            return;
        }
        storageData = storageData.filter(item => {
            return item.id != id;
        });
        this.localStoreSet(key, storageData);
    }

    protected get_Items(key: string) {
        let storageData = this.localStoreGet(key);
        if (storageData == null || storageData == undefined) {
            return [];
        }
        return storageData;
    }

    protected localStoreSet(key: string, data: object) {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    protected localStoreGet(key: string) {
        return JSON.parse(window.localStorage.getItem(key));
    }
}
