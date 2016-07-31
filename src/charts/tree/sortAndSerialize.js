import { is } from 'ramda'
import fclone from 'fclone';

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
    const tObj = {}
    Object.keys(obj).sort().forEach(key => tObj[key] = sortObject(obj[key]))
    return tObj
  }

  return obj
}

export default function sortAndSerialize(obj) {
  return JSON.stringify(sortObject(fclone(obj), true), undefined, 2)
}
