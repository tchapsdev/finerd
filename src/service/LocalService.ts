import { find, isEmpty, remove } from 'lodash';

export abstract class LocalService<T extends { id: number; createdAt?: Date; updatedAt?: Date }> {
    protected abstract key: string;

    protected readonly createOrUpdate = (model: T): T => {
        let data = this.findAll();

        if (!model.id) {
            model.id = data[0] ? data[0].id + 1 : 1;
            model.createdAt = new Date();
        } else {
            data = data.filter(item => item.id !== model.id);
            model.updatedAt = new Date();
        }

        data.push(model);
        this.store(this.key, data);

        return model;
    };

    protected readonly deleteById = (id: number): boolean => {
        const data = remove(this.findAll(), item => item.id === id);

        if (isEmpty(data)) return false;
        this.store(this.key, data);

        return true;
    };

    protected readonly findById = (id: number): T | null => find(this.findAll(), item => item.id === id) || null;

    protected readonly findAll = (): T[] => this.fetch(this.key) || [];

    private readonly store = (key: string, data: T[]): void => {
        data.sort((a, b) => b.id - a.id); // keep data sorted in desc order
        localStorage.setItem(key, JSON.stringify(data));
    }

    private readonly fetch = (key: string): T[] | null => JSON.parse(localStorage.getItem(key));
}
