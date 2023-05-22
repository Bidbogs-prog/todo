import styled from 'styled-components'

export const StyledNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 30px;
  padding: 20px;
  color: black;
  font-size: 24px;
  margin-right: 2%;
  a {
    color: inherit;
    text-decoration: inherit;
  }
  .active {
    color: #ffff;
  }
  .pending {
    color: orange;
  }
`
