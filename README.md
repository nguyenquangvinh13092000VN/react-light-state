# React Light State
Light and simple React state management.

## Intro
Easy to manage global state with 2 steps:

  1. Create a state:
  ```js
    const initialState = ["Task 1", "Task 2"];
    export const TodosLight = new LightState({todos: initialState});
  ```

  2. Connect to the Light State with `withLight`
  ```js
    export default TodosLight.withLight(YourComponent)
  ```

## Install
```sh
npm install react-light-state
# or 
yarn add react-light-state
```

## Usage
Setup Light State:
```js
import LightState from "react-light-state";

const initialState = ["Task 1", "Task 2"];
export const TodosLight = new LightState({todos: initialState});
```

Use with your component:
```js
import {TodosLight} from "../setupLightState";

const ViewTodos = ({todos}) => (
  <div>
    <ul>
      {todos.map((todo, idx) => (
        <li key={idx}>{todo}</li>
      ))}
    </ul>
  </div>
)

export default TodosLight.withLight(ViewTodos);
```

Update TodoLight:
```js
import {TodosLight} from "../setupLightState";

function AddTodo (todos) {
  const [todo, setTodo] = useState("")
  return (
    <div>
      <input
        placeHolder="Enter todo"
        value={todo}
        onInput={e => {setTodo(e.target.value)}}
      />
      <button
        onClick={
          () => {
            TodosLight.setState(...TodosLight.getState().todos, todo)
          }
        }
      ></button>
    </div>
  )
}

```
