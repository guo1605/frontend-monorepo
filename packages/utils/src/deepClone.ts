export function deepClone<T>(value: T, cache = new WeakMap()): T {
  // Primitive types(string,number,boolean,null,undefined)
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // 如果已拷贝过，直接返回缓存副本（防止循环引用）
  if (cache.has(value)) {
    return cache.get(value) as T;
  }

  // Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // 处理普通对象
  const result = (Array.isArray(value) ? [] : {}) as T;
  cache.set(value, result);

  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone((value as T)[key], cache);
    }
  }

  return result;
}