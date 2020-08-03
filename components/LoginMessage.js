function LoginMessage(props) {
  const user = props.user;

  return (
    <div>
      {user ? (
        <div>You're logged in!</div>
      ) : (
        <div>Log in to post your books!</div>
      )}
    </div>
  );
}

export default LoginMessage;
