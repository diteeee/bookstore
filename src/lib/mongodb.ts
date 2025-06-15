import { MongoClient } from "mongodb";

declare global {
  // For Next.js hot reloads — to avoid multiple clients
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI as string;

// Append options if not present (optional, but recommended)
const options = {
  // You can add options here if needed
};

const client = new MongoClient(uri, options);

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
