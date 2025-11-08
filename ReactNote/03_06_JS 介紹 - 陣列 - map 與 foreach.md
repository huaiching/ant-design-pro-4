# JS 介紹 - 陣列 - map 與 foreach

## 1. map

`map()` 是陣列的方法，用於將陣列中的每個元素轉換成新的值，並返回一個新陣列

- 不會改變原陣列
- 返回一個新陣列，長度與原陣列相同
- 常用於 React 渲染列表

---

### 基本用法

```ts
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(num => num * 2)

console.log(doubled) // [2, 4, 6, 8, 10]
console.log(numbers) // [1, 2, 3, 4, 5] (原陣列不變)
```

---

### 轉換物件陣列

```ts
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
]

const userNames = users.map(user => user.name)
console.log(userNames) // ['Alice', 'Bob', 'Charlie']
```

---

### 在 React 中使用 map 渲染列表

```tsx
function UserList() {
  const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
  ]

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} - {user.age} 歲
        </li>
      ))}
    </ul>
  )
}
```

**重點**: 在 React 中使用 `map()` 時，每個元素都需要有唯一的 `key` 屬性!

### map 的完整參數

```ts
const numbers = [10, 20, 30]

// map 可以接收三個參數: (元素, 索引, 原陣列)
const result = numbers.map((num, index, array) => {
  console.log(`元素: ${num}, 索引: ${index}, 原陣列: ${array}`)
  return num * index
})

console.log(result) // [0, 20, 60]
```

---

### 常見錯誤

```ts
// ❌ 錯誤: 忘記 return
const wrong = [1, 2, 3].map(num => {
  num * 2 // 沒有 return, 結果會是 [undefined, undefined, undefined]
})

// ✅ 正確: 使用箭頭函數的隱式返回
const correct1 = [1, 2, 3].map(num => num * 2)

// ✅ 正確: 明確使用 return
const correct2 = [1, 2, 3].map(num => {
  return num * 2
})
```

---

## 2. foreach

`forEach()` 是陣列的方法，用於遍歷陣列中的每個元素並執行指定的操作

- 不會返回新陣列
- 無法中斷迴圈(不能使用 break 或 continue)
- 主要用於執行副作用(side effects)

---

### 基本用法

```ts
const numbers = [1, 2, 3, 4, 5]

numbers.forEach(num => {
  console.log(num)
})
// 輸出: 1 2 3 4 5
```

---

### forEach 的完整參數

```ts
const fruits = ['apple', 'banana', 'cherry']

// forEach 可以接收三個參數: (元素, 索引, 原陣列)
fruits.forEach((fruit, index, array) => {
  console.log(`索引 ${index}: ${fruit}`)
  console.log(`原陣列長度: ${array.length}`)
})

// 輸出:
// 索引 0: apple
// 原陣列長度: 3
// 索引 1: banana
// 原陣列長度: 3
// 索引 2: cherry
// 原陣列長度: 3
```

---

## 3. map 跟 foreach 的比較

| 特性       | forEach   | map  |
| -------- | --------- | ---- |
| 返回值      | undefined | 新陣列  |
| 用途       | 執行副作用     | 轉換資料 |
| React 渲染 | ❌ 不適合     | ✅ 適合 |
| 可中斷      | ❌ 不可      | ❌ 不可 |
