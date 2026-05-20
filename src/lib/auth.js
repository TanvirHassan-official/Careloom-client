// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_URI);
// const db = client.db("careloom");

// export const auth = betterAuth({
//     database: mongodbAdapter(db, { client }),
//     emailAndPassword: {
//         enabled: true
//     },
//     baseURL:process.env.BETTER_AUTH_URL,
//     socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID, 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
//         }, 
//     }
// });

import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
    plugins: [dash()],
});