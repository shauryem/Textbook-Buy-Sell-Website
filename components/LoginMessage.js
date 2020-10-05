function LoginMessage(props) {
  const user = props.user;

  // Simple component that notifies the user when he/she is logged in
  
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
