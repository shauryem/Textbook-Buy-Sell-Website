import auth0 from "./auth0";

// Called every time a user performs an action, making sure the correct access is present. 

export function authenticatedAction(actionFn) {
  return auth0.requireAuthentication(async function (req, res) {
    try {
      const { user } = await auth0.getSession(req);

      const actionResult = await actionFn(req, user);

      res.statusCode = actionResult ? 200 : 204;
      res.end(JSON.stringify(actionResult));
    } catch (error) {
      console.error(error);
      res
        .status(error.status || 500)
        .end(error.message && JSON.stringify({ message: error.message }));
    }
  });
}
