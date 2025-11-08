# 附錄 - Button 的 onClick 呼叫函式的寫法

React 中，Button 的 onClick 只能放 無參數函式

```tsx
<Button onClick={函式名稱}> 按鈕文字 </Button>
```

如果 想要在 onClick 呼叫 有參數函式，就必須再另外進行包裝

```tsx
<Button type="primary" onClick={() => 函式名稱(參數)}> 按鈕文字 </Button>
```
