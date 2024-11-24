import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Login = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Main />
    </Auth0Provider>
  );
};

const Main = () => {
  const { loginWithRedirect, user, getIdTokenClaims } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const callBackend = async () => {
    const token = await getIdTokenClaims(); // Get the JWT
    const jwt = token?.__raw;

    // Send the token to the backend
    const response = await axios.get("http://localhost:4000/protected", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    console.log(response.data);
  };

  return (
    <div>
      {user ? (
        <>
          <h2>Welcome {user.name}</h2>
          <button onClick={callBackend}>Call Protected Backend</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default Login;
