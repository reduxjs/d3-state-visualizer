import { is } from 'ramda'
import isPlainObject from 'is-plain-object'
import fclone from 'fclone';

function isSerializable(obj) {
  if (obj === undefined || obj === null || is(Boolean, obj) || is(Number, obj) || is(String, obj)) {
    return true
  }

  if (!isPlainObject(obj) && !is(Array, obj)) {
    return false
  }

  for (const key in obj) {
    if (!isSerializable(obj[key])) {
      return false
    }
  }

  return true
}

function sortObject(obj, strict) {
  if (obj instanceof Array) {
    let ary
    if (strict) {
      ary = obj.sort()
    } else {
      ary = obj
    }
    return ary
  }

  if (obj && typeof obj === 'object') {
    if (!isSerializable(obj)) {
      return {error: 'not serializable'}
    }

    const tObj = {}
    Object.keys(obj).sort().forEach(key => tObj[key] = sortObject(obj[key]))
    return tObj
  }

  return obj
}

export default function sortAndSerialize(obj) {
  return JSON.stringify(sortObject(fclone(obj), true), undefined, 2)
}
