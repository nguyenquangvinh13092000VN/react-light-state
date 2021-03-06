<img src="https://raw.githubusercontent.com/fozg/react-light-state/dev/images/react-light-state-logo-github.png" width="300">

---

Light and simple React global state management.

[![Build Status](https://fozg.visualstudio.com/react-light-state/_apis/build/status/fozg.react-light-state?branchName=master)](https://fozg.visualstudio.com/react-light-state/_build/latest?definitionId=13&branchName=master)
[![npm version](https://badge.fury.io/js/react-light-state.svg)](https://badge.fury.io/js/react-light-state)

### Latest docs [here](https://github.com/fozg/react-light-state/blob/master/README.md)

**To create a store**

```js
const initialState = { todos: ['Task 1', 'Task 2'] }
export const TodosLightState = new LightState(initialState)
// => store: {todos: ["Task 1", "Task 2"]}
```

**Get this store**

```js
// with React Hooks
const { useStore } = TodosLightState
function Listing() {
  const todos = useStore(state => ({ todos: state.todos }));
  return (
    <Wrapper>
      <List todos={todos} />
    </Wrapper>
  )
}

// or directly get from Store
TodosLightState.getState()

// or
const { getState } = TodosLilghtState
getState()
// => {todos: ["Task 1", "Task 2"]}
```

**Update this store**

```js
// directly
const {setState} = TodosLightState;

setState({
  todos: [...TodosLightState.getStore().todos, 'Task 3']
})
// => {todos: ["Task 1", "Task 2", "Task 3"]}

// async update
setState(async currentState => {
  let data = await fetchData();
  return { todos: currentState.todos.concat(data) }
})

// callback
setState({...someData}, (newState) => {
  ...
})

```

**or `dispatch`**

```js
const {dispatch} = TodosLightState;

dispatch((dispatch, currentState) => {
  dispatch({loading: true});

  fetchData().then(data => {
    dispatch({loading: false, data: data})
  })
}, newState => {
  ...
})
```

Use with React. Connect your react component with `withLight` or `connect`

```js
export default TodosLightState.withLight()(MappedComponent)
// or
export default TodosLightState.connect()(MappedComponent)
/**
 * your component will map state of LightState to your props,
 * the default props will be `yourOptionalStoreName`, if the LightState doesn't
 * have default store name the props will be `lightProps`
 * /
```

So your mapped component look like

```js
const MappedComponent = ({ yourOptionalStoreName, ...yourRestProps }) => {
  return (
    <ul>
      {yourOptionalStoreName.todos.map((todo, idx) => (
        <li key={idx}>{todo}</li>
      ))}
    </ul>
  )
}
```

#### Storage built-in

The Light State can save to localStorage by default

```js
new LightState(initialState, 'yourOptionalStoreName', {
  storageName: 'YourTodosStorageName', // [REQUIRED] if you want to save the data.
  getFromStorage: () => {}, // [OPTIONAL] custom function get data
  saveToStorage: () => {} // [OPTIONAL] custom function save data
})
```

## Install

```sh
npm install react-light-state
# or
yarn add react-light-state
# or
npm install @fozg/react-light-state
```

## Basic usage

Setup Light State:

```js
import LightState from "react-light-state";

export const TodosLightState = new LightState({list: ["Task 1", "Task 2"]}, "todos");
/**
 * `todos` is store name, when you connect the LightState with your component
 * with api withLight(), your store name will be default props.
 *
 * If store name is null, default props will be `lightProps`.
 *
 * Otherwise, you can define function `mapStateToProps` at withLight(mapStateToProps)
 * to specify which field you want to use..
 * /
```

Use with your component:

```js
import { TodosLightState } from '../setupLightState'

const ViewTodos = ({ todos }) => (
  <div>
    <ul>
      {todos.list.map((todo, idx) => (
        <li key={idx}>{todo}</li>
      ))}
    </ul>
  </div>
)

export default TodosLightState.withLight()(ViewTodos)
```

Update TodoLight:

```js
import { TodosLightState } from '../setupLightState'

const { setState, getState } = TodosLightState

function AddTodo(todos) {
  const [todo, setTodo] = useState('')
  return (
    <div>
      <input
        placeHolder="Enter todo"
        value={todo}
        onInput={e => {
          setTodo(e.target.value)
        }}
      />
      <button
        onClick={() => {
          setState(...getState().list, todo)
        }}
      />
    </div>
  )
}
```

## Sample

### Todo Apps

```js
import React, { useState } from 'react'
import LightState from 'react-light-state'

const TodoStore = new LightState(['My frist todo'], 'todos')

const TodoApp = TodoStore.withLight()(({ todos }) => {
  const [input, setInput] = useState('')
  return (
    <div>
      Todo list:
      {todos.length === 0 && 'No todo found'}
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>{todo}</li>
        ))}
      </ul>
      Enter todo:
      <form
        onSubmit={e => {
          e.preventDefault()
          TodoStore.setState([...todos, input])
          setInput('')
        }}
      >
        <input
          value={input}
          onChange={e => {
            setInput(e.target.value)
          }}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  )
})

export default TodoApp
```

## Advanced usage

### Render props

```js
import {Light} from TodosLightState;

// your component
() => (
  <Light mapStateToProps={state => ({todos: state.todos})}>
    {({todos}) => (
      <div>
        {todos.map(item => ...)}
      </div>
    )}
  </Light>
)

```