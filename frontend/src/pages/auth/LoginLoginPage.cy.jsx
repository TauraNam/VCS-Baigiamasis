import React from 'react'
import LoginPage from './Login'

describe('<LoginPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoginPage />)
  })
})