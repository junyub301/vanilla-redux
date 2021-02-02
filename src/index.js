import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { createStore } from "redux";

/*
  store : data(state)를 넣는 곳
  state : application에서 바뀌는 data
  createStore : reducer를 주기를 요구하고 reducer는 함수여야한다.
  reducer : data를 수정하는 함수

  
*/
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  // state를 mutate(변형)하는게 아니라 새로은 object를 리턴한다. 즉, 상태를 수정하는게 하니라 새로운 상태를 리턴한다
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== parseInt(action.id));
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
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

/* 1단계 : redux 사용x => dataless
const createToDo = toDo => {
  const li = document.createElement("li");
  li.innerText = toDo;
  ul.appendChild(li); 
};

const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  createToDo(toDo);
};

form.addEventListener("submit",onSubmit);
 */

// COUNT 예제

/* 
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

const countModifier = (count = 0, action) => {
 switch(action.type) {
   case ADD:
     return count + 1;
    case MINUS:
      return count - 1;
    default:
        return count;
 }
};

const countStore = createStore(countModifier);


const onChange = () => {
  number.innerText = countStore.getState();
}
// state 변경시 호출
countStore.subscribe(onChange);



const handleAdd = () => {
  // action 호출 type이 꼭 있어야한다.
  countStore.dispatch({type:ADD})
}

const handleMinus = () => {
  countStore.dispatch({type:MINUS})
}


add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
 */

/* 
redux 사용하지 않음.

let count = 0;

number.innerHTML = count;

const updateText = () => {
  number.innerHTML = count;
}

const handleAdd = () => {
  count = count + 1;
  updateText();
}

const handleMinus = () => {
  count = count - 1;
  updateText();
}

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
*/
