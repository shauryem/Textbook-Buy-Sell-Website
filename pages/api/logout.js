import auth0 from "../../utils/auth0";

// Logout error logs

export default async function (req, res) {
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
