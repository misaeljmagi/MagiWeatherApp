export interface AsyncListState<TValue> {
  loaded: boolean;
  loading: boolean;
  error?: Error | string;
  items: TValue[];
}

export function getEmptyAsyncListState<TValue>(): AsyncListState<TValue> {
  return {
    loaded: false,
    loading: false,
    error: undefined,
    items: [],
  };
}
