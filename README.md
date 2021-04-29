# Introduction(Vanilla Redux)
  React Redux 공부 전 Vanilla Redux구조 및 개념 공부
  
## intallation
```
npm install redux
```

## Redux?
  Javascript application들의 state(상태)를 관리하는 방법
  
## 기본 개념
  - store   : data(state)를 넣는 곳
  - state   : application에서 바뀌는 data
  - action  : reducer와 커뮤니케이션 할수 있는 방법 ex) store.dispatch({type:"ADD"})

## Example
reducer(state,action) : reducer는 함수여야한다. reducer만이 state를 수정할 수 있다.

```
import {createStore} from "redux"

const reducer = (state, action) => {
  
  swtich(action.type) {
  case "ADD" : return state + 1;
  ....
  } 
}

const store = createStore(reducer)

store.dispatch({type: "ADD"})
```

