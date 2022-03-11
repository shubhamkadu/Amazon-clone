import { buffer } from "micro";
import * as admin from "firebase-admin";

//sequre connetion to firease from the backend
const serviceAccount = require("../../../permissions.json");
console.log("1");
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//establish connetion to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("2");
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  console.log("3");
  console.log("fulfilling order", session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS:order${session.id} had been added to the DB`);
    });
};

console.log("4");
export default async (req, res) => {
  if (req.method === "POST") {
    console.log("5");
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //verify that event posted came from stripe.

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      //console.log("6");
      return res.status(400).send(`Webhook error:${err.message}`);
    }

    //handle the checkout session completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //fulfill the order...

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`webhook Error:${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
