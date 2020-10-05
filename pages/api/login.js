import auth0 from "../../utils/auth0";

// Calls atho0 login

export default async function (req, res) {
  try {
    await auth0.handleLogin(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
