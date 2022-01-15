import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import JWT from 'jsonwebtoken';

declare global {
  function getAuthCookie(): string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'secretst';
  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();

  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.getAuthCookie = () => {
  // Build a JWT payload {id, email}
  const payload = {
    id: 'e505e72e',
    email: 'test@test.com',
  };

  // Create the JWT
  const token = JWT.sign(payload, process.env.JWT_KEY!);

  // Build Session
  const session = { jwt: token };

  // Turn session into JSON
  const sessionJSON = JSON.stringify(session);

  // Encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string as cookie with the encoded data
  return [`session=${base64}`];
};
