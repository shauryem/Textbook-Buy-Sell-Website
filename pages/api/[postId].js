import { authenticatedAction } from "../../utils/api";
import { initDatabase } from "../../utils/mongodb";
import { ObjectId } from "mongodb";

async function deletePost(postId) {
  const client = await initDatabase();
  const posts = client.collection("posts");

  const query = {
    _id: ObjectId(postId),
  };

  const result = await posts.deleteOne(query);

  return result.value;
}

async function performAction(req, user) {
  const { postId } = req.query;

  switch (req.method) {
    case "DELETE":
      return deletePost(postId);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
