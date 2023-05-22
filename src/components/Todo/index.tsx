import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '../../styles/common/button'
import { TodoContainer } from '../../styles/common/containers'
import { Input } from '../../styles/common/input'

type Todo = {
  name: string
  isEdit: boolean
}

export const TodoComponent = () => {
  // our todo list state
  const [list, setList] = useState<ReadonlyArray<Todo>>([])

  // access the input html element and its data
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // handle todo list addition
  const handleClick = useCallback(() => {
    //will return a memoized version of the callback that only changes if one of the inputs has changed.
    const inputValue = inputRef.current?.value

    if (inputValue !== undefined && inputValue !== '' && inputRef.current !== null) {
      setList((prevState) => [...prevState, { name: inputValue, isEdit: false }])

      const todos = [...list, { name: inputValue, isEdit: false }]

      localStorage.setItem('todos', JSON.stringify(todos))

      inputRef.current.value = '' // clear the input
    }
  }, [list])

  // handle Enter key press
  const handleEnterPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleClick()
      }
    },
    [handleClick],
  )

  //handle delete list item
  const handleDelete = useCallback(
    (todoId: number) => {
      const oldTodos = [...list]
      const newTodos = oldTodos.filter((_item, index) => index !== todoId)

      setList(newTodos)

      localStorage.setItem('todos', JSON.stringify(newTodos))
    },
    [list],
  )

  //handle edit
  const handleEdit = useCallback(
    (todoId: number) => {
      const newTodos = list.map((item, index) => {
        if (index === todoId) {
          // edit the todo with isEdit true and return it instead of the old one
          const newTodo = { ...item, isEdit: true }
          return newTodo
        }
        // return old ones unchanged
        return item
      })

      setList(newTodos)
    },
    [list],
  )

  //handle cancelling edit
  const handleCancel = useCallback(
    (todoId: number) => {
      const newTodos = list.map((item, index) => {
        if (index === todoId) {
          // edit the todo with isEdit true and return it instead of the old one
          const newTodo = { ...item, isEdit: false }
          return newTodo
        }
        // return old ones unchanged
        return item
      })

      setList(newTodos)
    },
    [list],
  )

  // handle editing a todo
  const handleEditClick = useCallback(
    (todoId: number) => {
      //will return a memoized version of the callback that only changes if one of the inputs has changed.
      const inputValue = inputRefs.current[todoId]?.value

      if (inputValue !== undefined && inputValue !== '' && inputRef.current !== null) {
        const newTodos = list.map((item, index) => {
          if (index === todoId) {
            // edit the todo with isEdit true and return it instead of the old one
            const newTodo = { ...item, name: inputValue, isEdit: false }
            return newTodo
          }
          // return old ones unchanged
          return item
        })

        setList(newTodos)

        localStorage.setItem('todos', JSON.stringify(newTodos))

        inputRef.current.value = '' // clear the input
      }
    },
    [list],
  )

  const handleEditEnterPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === 'Enter') {
        handleEditClick(index)
      }
    },
    [handleEditClick],
  )

  // 1 run after component mounting
  useEffect(() => {
    const localStorageTodos = localStorage.getItem('todos')

    if (localStorageTodos === null) {
      localStorage.setItem('todos', JSON.stringify([]))

      return
    }

    setList(
      JSON.parse(localStorageTodos).map((todo: Todo) => ({ ...todo, isEdit: false })),
    )
  }, [])

  return (
    <div>
      <ul>
        {list.map(({ name, isEdit }, index) => {
          return (
            <TodoContainer key={index}>
              {isEdit ? (
                <Input
                  placeholder={name}
                  type='text'
                  ref={(inputId) => (inputRefs.current[index] = inputId)}
                  onKeyDown={(e) => handleEditEnterPress(e, index)}
                ></Input>
              ) : (
                <li>{name}</li>
              )}

              <Button onClick={() => handleDelete(index)}>delete</Button>
              {isEdit ? (
                <>
                  <Button onClick={() => handleEditClick(index)}>Save</Button>
                  <Button onClick={() => handleCancel(index)}>Cancel</Button>
                </>
              ) : (
                <Button onClick={() => handleEdit(index)}>Edit</Button>
              )}
            </TodoContainer>
          )
        })}
      </ul>
      <div className='submitContainer'>
        <Input
          className='submit'
          onKeyDown={handleEnterPress}
          type='text'
          placeholder='insert todo'
          ref={inputRef}
        />
        <Button onClick={handleClick}>add todo</Button>
      </div>
    </div>
  )
}
