declare class SearchStore {
    searchParams: Record<string, any>;
    reloadByManual: boolean;
    constructor();
    setSearchParams(params: Record<string, any>): void;
    setReloadByManual(reload: boolean): void;
    reset(): void;
}
export declare const searchStore: SearchStore;
export {};
