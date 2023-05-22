import { NavLink, Outlet } from 'react-router-dom'

import { StyledNav } from '../../styles'

export const NavBar = () => {
  return (
    <div>
      <StyledNav>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
          to="/example"
        >
          Example
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
          to="/todo"
        >
          Todo
        </NavLink>
      </StyledNav>
      <Outlet />
    </div>
  )
}
