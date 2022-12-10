/* 获取本地存储内容 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/* 插入本地存储 */
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

/* 删除本地存储 */
export const removeItem = name => {
  window.localStorage.removeItem(name)
}

// 以上都是公共组件的内容
