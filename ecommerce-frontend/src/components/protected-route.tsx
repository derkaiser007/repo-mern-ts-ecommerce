// ReactElement is a type that represents a React element (i.e., an instance of a React component or DOM element) 
// in TypeScript. In the context of React, it defines the structure of the JSX you are working with, which gets 
// rendered to the DOM.
import { ReactElement } from "react";
// <Navigate />: This component is part of react-router-dom and is used for programmatically navigating to a 
// different route. It’s used here to redirect unauthorized users.
// <Outlet />: This is also a part of react-router-dom and is used to render nested routes. In this case, it's 
// used as a fallback if no children are provided, meaning that nested routes will be rendered when the conditions 
// pass.
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  isAdmin?: boolean;
  redirect?: string;
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  adminOnly,
  isAdmin,
  redirect = "/",
}: Props) => {
    // If isAuthenticated is false, the user is redirected to the redirect URL (or / if no redirect is specified).
    if (!isAuthenticated) return <Navigate to={redirect} />;

    // If adminOnly is true and isAdmin is false, the user is redirected to the redirect URL (or / if no redirect 
    // is specified).
    if (adminOnly && !isAdmin) return <Navigate to={redirect} />;
  
    // If both the authentication and admin checks pass (or if they are not required), the children prop is 
    // rendered (if it exists), otherwise, the <Outlet /> component is rendered (typically used in react-router-dom 
    // to render nested routes).
    return children ? children : <Outlet />;
};

export default ProtectedRoute;