
export type Immutable<T>=
    T extends object ? {readonly [k in keyof T]: Immutable <T[k]>}:
        T