import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, user } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return (
    <>
      <div>
        {user ? (
          <h2>Welcome {user.name}</h2>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
      <div>

      </div>
    </>
  );
};

export default Login;
