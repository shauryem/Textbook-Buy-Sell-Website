import { authenticatedAction } from "../../utils/api";
import { initDatabase } from "../../utils/mongodb";
import { currentDate } from "../../utils/date";

export async function getUsersPosts(user) {
  const client = await initDatabase();
  const posts = client.collection("posts");

  return posts.find({ id: user.sub }).toArray();
}

export async function getPosts(req) {
  const client = await initDatabase();
  const posts = client.collection("posts");

  return posts.find({}).toArray();
}

export async function getPostsSearch(req) {
  const isbn = req.body;
  const client = await initDatabase();
  const posts = client.collection("posts");

  return posts.find({ isbn: isbn }, { price: $slice(20) }).toArray;
}

async function createPost(req, user) {
  const image = req.body.image;
  const isbn = req.body.isbn;
  const name = req.body.name;
  const class_for = req.body.class_for;
  const professor = req.body.professor;
  const contact = req.body.contact;
  const price = req.body.price;
  const date = currentDate();
  const id = user.sub;

  console.log(id);

  const client = await initDatabase();
  const posts = client.collection("posts");

  const query = {
    image,
    isbn,
    name,
    class_for,
    professor,
    contact,
    price,
    date,
    id,
  };

  const mutation = {
    $setOnInsert: {
      image,
      isbn,
      name,
      class_for,
      professor,
      contact,
      price,
      date,
      id,
    },
  };

  const result = await posts.findOneAndUpdate(query, mutation, {
    upsert: true,
    returnOriginal: false,
  });

  return result.value;
}

async function performAction(req, user) {
  switch (req.method) {
    case "GET":
      if (req.body.type === "user") {
        return getUsersPosts(user);
      } else {
        return getPostsSearch(req);
      }
    case "POST":
      return createPost(req, user);
  }

  throw { status: 405 };
}

export default authenticatedAction(performAction);
