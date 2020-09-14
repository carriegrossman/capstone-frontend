import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, currentUser, currentShop, setCurrentShop, ...rest }) => {
  console.log(currentUser)
  return (
    <Route {...rest} render={
      props => {
        if (currentUser) {
          return <Component {...rest} {...props} currentUser={currentUser} currentShop={currentShop} setCurrentShop={setCurrentShop} />
        } else {
          return <Redirect to={
            {
              pathname: '/login',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;