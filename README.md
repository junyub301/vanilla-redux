# 프로젝트 목적(Vanilla Redux)
  React Redux 공부 전 Vanilla Redux구조 및 개념 공부
  
## 설치
```
npm install redux
```

## Redux란?
  Javascript application들의 state(상태)를 관리하는 방법
  
## 기본 개념
  - store     : data(state)를 넣는 곳, 한 application 당 하나의 스토어를 만든다.
  - state     : application에서 바뀌는 data
  - action    : reducer와 커뮤니케이션 할 수 있는 방법, 반드시 Object여야 한다.
  - reducer   
    - state를 수정할 수 있는 함수
    - state와 action 두가지 파라미터를 받아온다.
    - reducer가 리턴한 값이 application의 state가 된다.
  - dispatch  : 액션을 발생시기는 스토어 내장함수, action을 파라미터로 전달한다.
  - subscribe : store에 변화가 있을 때 호출되는 스토어 내장 함수, 함수를 파라미터로 전달한다.

## 예제
```javascript
import {createStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";

// action creator
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const reducer = (state = [], action) => {
  // state를 mutate(변형)하는게 아니라 새로은 object를 리턴한다. 즉, 상태를 수정하는게 하니라 새로운 상태를 리턴한다
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    ...
    default:
      return state;
  }
};

const store = createStore(reducer); // store 생성

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");   
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
```

