import { Route, Routes } from 'react-router-dom'

import { ErrorPage, Home, NavBar, RouteExample } from '../pages'
import Todo from '../pages/todo'

export const MyRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="example" element={<RouteExample />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="todo" element={<Todo />} />
      </Route>
    </Routes>
  )
}
