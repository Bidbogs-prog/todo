import styled from 'styled-components'

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;

  padding: 2%;
  margin: 2%;
  li {
    list-style: none;
    font-weight: bold;
    margin-right: 40px;
  }
`
