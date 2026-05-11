const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const admin = require("firebase-admin");

dotenv.config();

const stripe = require("stripe")(process.env.PAYMENT_GATEWAY_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
//////////////////////////////////
const decodedKey = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
  "utf8"
);

const serviceAccount = JSON.parse(decodedKey);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
/////////////////////////////////
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y0sheda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
});
let db,
  usersCollection,
  parcelsCollection,
  paymentsCollection,
  ridersCollection,
  chatsCollection,
  messagesCollection,
  feedbacksCollection;

async function connectDB() {
  if (!db) {
    await client.connect();

    db = client.db("parcelDB");
    usersCollection = db.collection("users");
    parcelsCollection = db.collection("parcels");
    paymentsCollection = db.collection("payments");
    ridersCollection = db.collection("riders");
    chatsCollection = db.collection("chats");
    messagesCollection = db.collection("messages");
    feedbacksCollection = db.collection("feedbacks");
    console.log("✅ MongoDB connected");
  }
}

// Ensure DB connection before each request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

/////////////////////////////////////////

//custom middlewares
// const verifyFBToken = async (req, res, next) => {
//   const authHeader = req.headers.Authorization;
//   if (!authHeader) {
//     return res.status(401).send({ message: "Unauthorized access" });
//   }
//   const token = authHeader.split(" ")[1];
//   if (!token) {
//     return res.status(401).send({ message: "Unauthorized access" });
//   }

//   //verify token
//   try {
//     const decoded = await admin.auth().verifyIdToken(token);
//     req.decoded = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).send({ message: "forbidden access" });
//   }
// };

app.post("/users", async (req, res) => {
  const email = req.body.email;
  const userExists = await usersCollection.findOne({ email: email });
  if (userExists) {
    return res.status(200).send({ message: "User already exists" });
  }
  const user = req.body;
  const result = await usersCollection.insertOne(user);
  res.send(result);
});

// GET /parcels - fetch all parcels or by user email
app.get("/parcels", async (req, res) => {
  try {
    const userEmail = req.query.email;
    const query = userEmail ? { created_by: userEmail } : {};
    const parcels = await parcelsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    res.send(parcels);
  } catch (error) {
    console.error("Error fetching parcels:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// ⬇ GET Parcel by ID
app.get("/parcels/:id", async (req, res) => {
  try {
    const parcelId = req.params.id;

    const parcel = await parcelsCollection.findOne({
      _id: new ObjectId(parcelId),
    });

    if (!parcel) {
      return res.status(404).json({ message: "Parcel not found" });
    }

    res.json(parcel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /parcels - create new parcel
app.post("/parcels", async (req, res) => {
  try {
    const newParcel = req.body;
    const result = await parcelsCollection.insertOne(newParcel);

    // Create initial tracking entry using the tracking_id from the parcel
    // if (newParcel.tracking_id) {
    //   await trackingCollection.insertOne({
    //     parcelId: result.insertedId.toString(),
    //     trackingId: newParcel.tracking_id,
    //     status: "pending",
    //     location: "Warehouse",
    //     description: "Parcel booked successfully",
    //     timestamp: new Date(),
    //   });
    // }

    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating parcel:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// DELETE /parcels/:id - delete parcel by ID
app.delete("/parcels/:id", async (req, res) => {
  try {
    const parcelId = req.params.id;

    if (!ObjectId.isValid(parcelId)) {
      return res.status(400).send({ message: "Invalid parcel ID" });
    }

    const result = await parcelsCollection.deleteOne({
      _id: new ObjectId(parcelId),
    });

    if (result.deletedCount === 0) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    res.send({ message: "Parcel deleted successfully" });
  } catch (error) {
    console.error("Error deleting parcel:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// POST /payments/success - handle successful payment
app.post("/payments/success", async (req, res) => {
  try {
    const { parcelId, transactionId, amount, userEmail, paymentMethod } =
      req.body;

    // Update parcel payment_status
    const parcelUpdateResult = await parcelsCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      { $set: { payment_status: "paid" } }
    );

    if (parcelUpdateResult.matchedCount === 0) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    // Create payment history
    const paymentRecord = {
      parcelId: new ObjectId(parcelId),
      transactionId,
      amount,
      userEmail,
      paymentMethod,
      paid_at_string: new Date().toLocaleString(),
      paymentDate: new Date(),
    };
    const paymentInsertResult = await paymentsCollection.insertOne(
      paymentRecord
    );

    res.status(201).send({
      message: "Payment successful and recorded",
      paymentId: paymentInsertResult.insertedId,
    });
  } catch (error) {
    console.error("Error processing successful payment:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /payments - fetch payment history
app.get("/payments", async (req, res) => {
  try {
    const userEmail = req.query.email;
    // console.log("decoded:", req.decoded);
    // if (req.decoded.email !== userEmail) {
    //   return res.status(403).send({ message: "Forbidden access" });
    // }

    const query = userEmail ? { userEmail: userEmail } : {};
    const payments = await paymentsCollection
      .find(query)
      .sort({ paymentDate: -1 })
      .toArray();
    res.send(payments);
  } catch (error) {
    console.error("Error fetching payment history:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// POST /tracking - Create new tracking entry
// app.post("/tracking", async (req, res) => {
//   try {
//     const { parcelId, trackingId, status, location, description } =
//       req.body;

//     const trackingEntry = {
//       parcelId: new ObjectId(parcelId),
//       trackingId,
//       status,
//       location,
//       description,
//       timestamp: new Date(),
//     };

//     const result = await trackingCollection.insertOne(trackingEntry);
//     res.status(201).send(result);
//   } catch (error) {
//     console.error("Error creating tracking:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// GET /tracking/:trackingId - Get all tracking entries by tracking ID
// app.get("/tracking/:trackingId", async (req, res) => {
//   try {
//     const trackingId = req.params.trackingId;

//     const trackingEntries = await trackingCollection
//       .find({ trackingId })
//       .sort({ timestamp: -1 })
//       .toArray();

//     if (trackingEntries.length === 0) {
//       return res.status(404).json({ message: "Tracking ID not found" });
//     }

//     res.json({
//       trackingId,
//       currentStatus: trackingEntries[0].status,
//       updates: trackingEntries,
//     });
//   } catch (error) {
//     console.error("Error fetching tracking:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amountInCents } = req.body;

    console.log("Received payment request:", { amountInCents });

    // Validate amount
    if (!amountInCents || isNaN(amountInCents) || amountInCents < 50) {
      return res.status(400).json({
        error: "Invalid amount. Minimum is 50 cents ($0.50)",
      });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amountInCents),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log("Payment intent created:", paymentIntent.id);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(400).json({ error: error.message });
  }
});

// riders application thing
app.post("/riders/apply", async (req, res) => {
  try {
    const applicationData = req.body;

    // Check if user already applied
    const existingApplication = await ridersCollection.findOne({
      email: applicationData.email,
    });

    if (existingApplication) {
      // If pending or approved, don't allow new application
      if (existingApplication.status === "pending") {
        return res.status(400).send({
          message:
            "You already have a pending application. Please wait for review.",
        });
      }

      if (existingApplication.status === "approved") {
        return res.status(400).send({
          message: "You are already an approved rider!",
        });
      }

      // If rejected or deactivated, allow re-application by updating existing record
      if (
        existingApplication.status === "rejected" ||
        existingApplication.status === "deactivated"
      ) {
        const result = await ridersCollection.updateOne(
          { email: applicationData.email },
          {
            $set: {
              ...applicationData,
              status: "pending",
              appliedAt: new Date(),
              reapplied: true,
              previousStatus: existingApplication.status,
            },
          }
        );
        return res.status(200).send({
          message: "Application resubmitted successfully",
          modifiedCount: result.modifiedCount,
        });
      }
    }

    // New application - insert fresh record
    const result = await ridersCollection.insertOne(applicationData);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error submitting rider application:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// end of riders application thing

// GET /riders/pending - Fetch all pending rider applications
app.get("/riders/pending", async (req, res) => {
  try {
    const pendingRiders = await ridersCollection
      .find({ status: "pending" })
      .sort({ appliedAt: -1 })
      .toArray();
    res.send(pendingRiders);
  } catch (error) {
    console.error("Error fetching pending riders:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /riders/:id/approve - Approve rider application
app.patch("/riders/:id/approve", async (req, res) => {
  try {
    const riderId = req.params.id;

    // First, get the rider details to access their email
    const rider = await ridersCollection.findOne({
      _id: new ObjectId(riderId),
    });

    if (!rider) {
      return res.status(404).send({ message: "Rider not found" });
    }

    // Update the rider's status in ridersCollection
    const riderResult = await ridersCollection.updateOne(
      { _id: new ObjectId(riderId) },
      {
        $set: {
          status: "approved",
          approvedAt: new Date(),
        },
      }
    );

    // Update the user's role in usersCollection
    const userResult = await usersCollection.updateOne(
      { email: rider.email },
      {
        $set: {
          role: "rider",
        },
      }
    );

    if (riderResult.matchedCount === 0) {
      return res.status(404).send({ message: "Rider not found" });
    }

    res.send({
      message: "Rider approved successfully",
      userRoleUpdated: userResult.modifiedCount > 0,
    });
  } catch (error) {
    console.error("Error approving rider:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /riders/:id/reject - Reject rider application
app.patch("/riders/:id/reject", async (req, res) => {
  try {
    const riderId = req.params.id;

    const result = await ridersCollection.updateOne(
      { _id: new ObjectId(riderId) },
      {
        $set: {
          status: "rejected",
          rejectedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Rider not found" });
    }

    res.send({ message: "Rider rejected successfully" });
  } catch (error) {
    console.error("Error rejecting rider:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /riders/active - Fetch all active/approved riders
app.get("/riders/active", async (req, res) => {
  try {
    const activeRiders = await ridersCollection
      .find({ status: "approved" })
      .sort({ approvedAt: -1 })
      .toArray();
    res.send(activeRiders);
  } catch (error) {
    console.error("Error fetching active riders:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /riders/:id/deactivate - Deactivate a rider
app.patch("/riders/:id/deactivate", async (req, res) => {
  try {
    const riderId = req.params.id;

    const result = await ridersCollection.updateOne(
      { _id: new ObjectId(riderId) },
      {
        $set: {
          status: "deactivated",
          deactivatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Rider not found" });
    }

    res.send({ message: "Rider deactivated successfully" });
  } catch (error) {
    console.error("Error deactivating rider:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

///jeno assign rider korar por rider status (in delivery hoy)
// GET /riders/by-district/:district - Get riders by district
app.get("/riders/by-district/:district", async (req, res) => {
  try {
    const district = req.params.district;

    const riders = await ridersCollection
      .find({
        status: "approved",
        district: district,
      })
      .toArray();

    res.send(riders);
  } catch (error) {
    console.error("Error fetching riders by district:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
// PATCH /parcels/:id/assign-rider - Assign rider to parcel
app.patch("/parcels/:id/assign-rider", async (req, res) => {
  try {
    const parcelId = req.params.id;
    const { riderId, riderName, riderEmail } = req.body;

    // Update parcel with rider info
    const parcelResult = await parcelsCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      {
        $set: {
          riderId: riderId,
          riderName: riderName,
          riderEmail: riderEmail,
          delivery_status: "assigned",
          assignedAt: new Date(),
        },
      }
    );

    if (parcelResult.matchedCount === 0) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    // Update rider status to "in delivery"
    const riderResult = await ridersCollection.updateOne(
      { _id: new ObjectId(riderId) },
      {
        $set: {
          status: "in delivery",
          currentParcelId: parcelId,
          onDeliverySince: new Date(),
        },
      }
    );

    res.send({
      message: "Rider assigned successfully",
      parcelUpdated: parcelResult.modifiedCount > 0,
      riderUpdated: riderResult.modifiedCount > 0,
    });
  } catch (error) {
    console.error("Error assigning rider:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /users/search - Search for users by email
app.get("/users/search", async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .send({ message: "Email query parameter is required" });
    }

    // Search for users whose email contains the search term (case-insensitive)
    const users = await usersCollection
      .find({
        email: { $regex: email, $options: "i" },
      })
      .limit(10) // Limit results to 10
      .toArray();

    res.send(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /users/:email - Get a specific user by exact email
app.get("/users/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /users/:email/make-admin - Make a user an admin
app.patch("/users/:email/make-admin", async (req, res) => {
  try {
    const userEmail = req.params.email;

    // First, check the user's current role
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Prevent riders from becoming admins
    if (user.role === "rider") {
      return res.status(400).send({
        message:
          "Riders cannot be promoted to admin. Please remove rider status first.",
      });
    }

    // Prevent if already admin
    if (user.role === "admin") {
      return res.status(400).send({
        message: "User is already an admin",
      });
    }

    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          role: "admin",
          madeAdminAt: new Date(),
        },
      }
    );

    res.send({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error("Error making user admin:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /users/:email/remove-admin - Remove admin role from a user
app.patch("/users/:email/remove-admin", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const result = await usersCollection.updateOne(
      { email: userEmail },
      {
        $set: {
          role: "user",
        },
        $unset: {
          madeAdminAt: "",
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "Admin role removed successfully" });
  } catch (error) {
    console.error("Error removing admin role:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /users/role/:email - Get user role by email
app.get("/users/role/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await usersCollection.findOne(
      { email: userEmail },
      { projection: { email: 1, role: 1, _id: 0 } } // Only return email and role
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      email: user.email,
      role: user.role || "user", // Default to "user" if no role set
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /riders/by-district/:district - Get riders by district
app.get("/riders/by-district/:district", async (req, res) => {
  try {
    const district = req.params.district;

    const riders = await ridersCollection
      .find({
        status: "approved",
        district: district,
      })
      .toArray();

    res.send(riders);
  } catch (error) {
    console.error("Error fetching riders by district:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /parcels/:id/assign-rider - Assign rider to parcel
app.patch("/parcels/:id/assign-rider", async (req, res) => {
  try {
    const parcelId = req.params.id;
    const { riderId, riderName, riderEmail } = req.body;

    const result = await parcelsCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      {
        $set: {
          riderId: riderId,
          riderName: riderName,
          riderEmail: riderEmail,
          delivery_status: "assigned",
          assignedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    res.send({ message: "Rider assigned successfully" });
  } catch (error) {
    console.error("Error assigning rider:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/parcels/rider/:email", async (req, res) => {
  try {
    const riderEmail = req.params.email;

    const parcels = await parcelsCollection
      .find({
        riderEmail: riderEmail,
        delivery_status: { $in: ["assigned", "in-transit"] },
      })
      .sort({ assignedAt: -1 })
      .toArray();

    res.send(parcels);
  } catch (error) {
    console.error("Error fetching rider parcels:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.patch("/parcels/:id/update-status", async (req, res) => {
  try {
    const parcelId = req.params.id;
    const { delivery_status } = req.body;

    const updateData = {
      delivery_status: delivery_status,
    };

    // Add timestamps based on status
    if (delivery_status === "in-transit") {
      updateData.startedDeliveryAt = new Date();
    } else if (delivery_status === "delivered") {
      updateData.deliveredAt = new Date();
    }

    const result = await parcelsCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    // NEW: If delivery is completed, reset rider status back to "approved"
    if (delivery_status === "delivered") {
      // Get the parcel to find the rider
      const parcel = await parcelsCollection.findOne({
        _id: new ObjectId(parcelId),
      });

      if (parcel && parcel.riderId) {
        // Update rider status back to "approved"
        await ridersCollection.updateOne(
          { _id: new ObjectId(parcel.riderId) },
          {
            $set: {
              status: "approved",
            },
            $unset: {
              currentParcelId: "",
              onDeliverySince: "",
            },
          }
        );
      }
    }

    res.send({ message: "Delivery status updated successfully" });
  } catch (error) {
    console.error("Error updating delivery status:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /parcels/rider/:email/completed - Get completed deliveries with earnings
app.get("/parcels/rider/:email/completed", async (req, res) => {
  try {
    const riderEmail = req.params.email;

    const parcels = await parcelsCollection
      .find({
        riderEmail: riderEmail,
        delivery_status: "delivered",
      })
      .sort({ deliveredAt: -1 })
      .toArray();

    // Calculate earnings for each parcel
    const parcelsWithEarnings = parcels.map((parcel) => {
      const isSameDistrict = parcel.senderDistrict === parcel.receiverDistrict;
      const earningPercentage = isSameDistrict ? 0.1 : 0.15;
      const riderEarning = parcel.cost * earningPercentage;

      return {
        ...parcel,
        isSameDistrict,
        earningPercentage: earningPercentage * 100,
        riderEarning: parseFloat(riderEarning.toFixed(2)),
        cashoutStatus: parcel.cashoutStatus || "pending",
      };
    });

    res.send(parcelsWithEarnings);
  } catch (error) {
    console.error("Error fetching completed deliveries:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /parcels/:id/cashout - Mark delivery as cashed out
app.patch("/parcels/:id/cashout", async (req, res) => {
  try {
    const parcelId = req.params.id;

    const result = await parcelsCollection.updateOne(
      { _id: new ObjectId(parcelId) },
      {
        $set: {
          cashoutStatus: "completed",
          cashedOutAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    res.send({ message: "Cashout successful" });
  } catch (error) {
    console.error("Error processing cashout:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /parcels/rider/:email/earnings-stats - Get detailed earnings statistics
app.get("/parcels/rider/:email/earnings-stats", async (req, res) => {
  try {
    const riderEmail = req.params.email;

    // Get all completed deliveries
    const parcels = await parcelsCollection
      .find({
        riderEmail: riderEmail,
        delivery_status: "delivered",
      })
      .toArray();

    // Calculate earnings for each parcel
    const parcelsWithEarnings = parcels.map((parcel) => {
      const isSameDistrict = parcel.senderDistrict === parcel.receiverDistrict;
      const earningPercentage = isSameDistrict ? 0.1 : 0.15;
      const riderEarning = parcel.cost * earningPercentage;

      return {
        ...parcel,
        isSameDistrict,
        earningPercentage: earningPercentage * 100,
        riderEarning: parseFloat(riderEarning.toFixed(2)),
        cashoutStatus: parcel.cashoutStatus || "pending",
        deliveredDate: new Date(parcel.deliveredAt),
      };
    });

    // Calculate time-based statistics
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const stats = {
      // Overall stats
      totalDeliveries: parcelsWithEarnings.length,
      totalEarnings: parcelsWithEarnings.reduce(
        (sum, p) => sum + p.riderEarning,
        0
      ),
      pendingCashout: parcelsWithEarnings
        .filter((p) => p.cashoutStatus === "pending")
        .reduce((sum, p) => sum + p.riderEarning, 0),
      cashedOut: parcelsWithEarnings
        .filter((p) => p.cashoutStatus === "completed")
        .reduce((sum, p) => sum + p.riderEarning, 0),

      // Time-based stats
      today: {
        deliveries: parcelsWithEarnings.filter((p) => p.deliveredDate >= today)
          .length,
        earnings: parcelsWithEarnings
          .filter((p) => p.deliveredDate >= today)
          .reduce((sum, p) => sum + p.riderEarning, 0),
      },
      thisWeek: {
        deliveries: parcelsWithEarnings.filter(
          (p) => p.deliveredDate >= weekStart
        ).length,
        earnings: parcelsWithEarnings
          .filter((p) => p.deliveredDate >= weekStart)
          .reduce((sum, p) => sum + p.riderEarning, 0),
      },
      thisMonth: {
        deliveries: parcelsWithEarnings.filter(
          (p) => p.deliveredDate >= monthStart
        ).length,
        earnings: parcelsWithEarnings
          .filter((p) => p.deliveredDate >= monthStart)
          .reduce((sum, p) => sum + p.riderEarning, 0),
      },
      thisYear: {
        deliveries: parcelsWithEarnings.filter(
          (p) => p.deliveredDate >= yearStart
        ).length,
        earnings: parcelsWithEarnings
          .filter((p) => p.deliveredDate >= yearStart)
          .reduce((sum, p) => sum + p.riderEarning, 0),
      },

      // Delivery type breakdown
      sameDistrict: {
        count: parcelsWithEarnings.filter((p) => p.isSameDistrict).length,
        earnings: parcelsWithEarnings
          .filter((p) => p.isSameDistrict)
          .reduce((sum, p) => sum + p.riderEarning, 0),
      },
      crossDistrict: {
        count: parcelsWithEarnings.filter((p) => !p.isSameDistrict).length,
        earnings: parcelsWithEarnings
          .filter((p) => !p.isSameDistrict)
          .reduce((sum, p) => sum + p.riderEarning, 0),
      },
    };

    res.send(stats);
  } catch (error) {
    console.error("Error fetching earnings stats:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.get("/tracking/:trackingId", async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase();

    const parcel = await parcelsCollection.findOne({
      tracking_id: trackingId,
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Tracking ID not found",
      });
    }

    // Build timeline based on parcel data
    const timeline = [];

    // 1. Parcel Submitted
    if (parcel.createdAt) {
      timeline.push({
        status: "submitted",
        title: "Parcel Submitted",
        description: `Your parcel has been registered in our system`,
        timestamp: parcel.createdAt,
        completed: true,
      });
    }

    // 2. Payment Received
    if (parcel.payment_status === "paid") {
      // Try to get payment date from payments collection
      const payment = await paymentsCollection.findOne({
        parcelId: new ObjectId(parcel._id),
      });

      timeline.push({
        status: "paid",
        title: "Payment Received",
        description: "Payment has been successfully processed",
        timestamp: payment?.paymentDate || parcel.createdAt,
        completed: true,
      });
    } else {
      timeline.push({
        status: "pending_payment",
        title: "Awaiting Payment",
        description: "Please complete the payment to proceed",
        timestamp: null,
        completed: false,
      });
    }

    // 3. Rider Assigned
    if (parcel.riderId) {
      timeline.push({
        status: "rider_assigned",
        title: "Rider Assigned",
        description: `Rider ${parcel.riderName} has been assigned to your parcel`,
        timestamp: parcel.assignedAt || null,
        completed: true,
      });
    } else if (parcel.payment_status === "paid") {
      timeline.push({
        status: "awaiting_rider",
        title: "Awaiting Rider Assignment",
        description: "We're assigning a rider to pick up your parcel",
        timestamp: null,
        completed: false,
      });
    }

    // 4. Picked Up (when status changes from "assigned" to "in-transit")
    if (
      parcel.delivery_status === "in-transit" ||
      parcel.delivery_status === "delivered"
    ) {
      timeline.push({
        status: "picked_up",
        title: "Parcel Picked Up",
        description: `Rider has picked up your parcel from ${parcel.senderAddress}`,
        timestamp: parcel.startedDeliveryAt || null,
        completed: true,
      });
    } else if (parcel.delivery_status === "assigned") {
      timeline.push({
        status: "awaiting_pickup",
        title: "Awaiting Pickup",
        description: "Rider will pick up your parcel soon",
        timestamp: null,
        completed: false,
      });
    }

    // 5. In Transit
    if (parcel.delivery_status === "in-transit") {
      timeline.push({
        status: "in_transit",
        title: "In Transit",
        description: `Your parcel is on the way to ${parcel.receiverAddress}`,
        timestamp: parcel.startedDeliveryAt || null,
        completed: true,
        current: true,
      });
    } else if (parcel.delivery_status === "delivered") {
      timeline.push({
        status: "in_transit",
        title: "In Transit",
        description: "Parcel was in transit",
        timestamp: parcel.startedDeliveryAt || null,
        completed: true,
      });
    }

    // 6. Delivered
    if (parcel.delivery_status === "delivered") {
      timeline.push({
        status: "delivered",
        title: "Delivered Successfully",
        description: `Parcel delivered to ${parcel.receiverName}`,
        timestamp: parcel.deliveredAt || null,
        completed: true,
      });
    } else if (parcel.delivery_status === "in-transit") {
      timeline.push({
        status: "awaiting_delivery",
        title: "Awaiting Delivery",
        description: "Parcel will be delivered soon",
        timestamp: null,
        completed: false,
      });
    }

    res.json({
      success: true,
      parcel: {
        tracking_id: parcel.tracking_id,
        title: parcel.title,
        type: parcel.type,
        weight: parcel.weight,
        cost: parcel.cost,
        payment_status: parcel.payment_status,
        delivery_status: parcel.delivery_status,
        sender: {
          name: parcel.senderName,
          district: parcel.senderDistrict,
          region: parcel.senderRegion,
          service: parcel.senderService,
        },
        receiver: {
          name: parcel.receiverName,
          district: parcel.receiverDistrict,
          region: parcel.receiverRegion,
          service: parcel.receiverService,
        },
        rider: parcel.riderId
          ? {
              name: parcel.riderName,
              email: parcel.riderEmail,
            }
          : null,
      },
      timeline,
    });
  } catch (error) {
    console.error("Error fetching tracking:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// GET /tracking/check/:trackingId - Quick check if tracking ID exists
app.get("/tracking/check/:trackingId", async (req, res) => {
  try {
    const trackingId = req.params.trackingId.toUpperCase();
    const parcel = await parcelsCollection.findOne({
      tracking_id: trackingId,
    });

    res.json({
      exists: !!parcel,
      trackingId: trackingId,
    });
  } catch (error) {
    console.error("Error checking tracking ID:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
/////////////////////////////////////////////

////////////////////FEEDBACK//////////////////////
// POST /feedbacks - Submit user feedback
app.post("/feedbacks", async (req, res) => {
  try {
    const feedbackData = req.body;

    // Check if feedback already exists for this parcel
    const existingFeedback = await feedbacksCollection.findOne({
      parcelId: new ObjectId(feedbackData.parcelId),
    });

    if (existingFeedback) {
      return res.status(400).send({
        message: "Feedback already submitted for this parcel",
      });
    }

    // Verify parcel is delivered
    const parcel = await parcelsCollection.findOne({
      _id: new ObjectId(feedbackData.parcelId),
    });

    if (!parcel) {
      return res.status(404).send({ message: "Parcel not found" });
    }

    if (parcel.delivery_status !== "delivered") {
      return res.status(400).send({
        message: "Can only give feedback for delivered parcels",
      });
    }

    const feedback = {
      ...feedbackData,
      parcelId: new ObjectId(feedbackData.parcelId),
      riderId: new ObjectId(feedbackData.riderId),
      createdAt: new Date(),
    };

    const result = await feedbacksCollection.insertOne(feedback);
    res.status(201).send(result);
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /feedbacks - Get all feedbacks (admin only)
app.get("/feedbacks", async (req, res) => {
  try {
    const feedbacks = await feedbacksCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.send(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /feedbacks/rider/:email - Get feedbacks for specific rider
app.get("/feedbacks/rider/:email", async (req, res) => {
  try {
    const riderEmail = req.params.email;

    const feedbacks = await feedbacksCollection
      .find({ riderEmail: riderEmail })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(feedbacks);
  } catch (error) {
    console.error("Error fetching rider feedbacks:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /feedbacks/user/:email - Get feedbacks by specific user
app.get("/feedbacks/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const feedbacks = await feedbacksCollection
      .find({ userEmail: userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(feedbacks);
  } catch (error) {
    console.error("Error fetching user feedbacks:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /feedbacks/parcel/:id - Check if feedback exists for parcel
app.get("/feedbacks/parcel/:id", async (req, res) => {
  try {
    const parcelId = req.params.id;

    const feedback = await feedbacksCollection.findOne({
      parcelId: new ObjectId(parcelId),
    });

    if (!feedback) {
      return res.status(404).send({ message: "No feedback found" });
    }

    res.send(feedback);
  } catch (error) {
    console.error("Error fetching parcel feedback:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /riders/:email/rating-stats - Get rider rating statistics
app.get("/riders/:email/rating-stats", async (req, res) => {
  try {
    const riderEmail = req.params.email;

    const feedbacks = await feedbacksCollection
      .find({ riderEmail: riderEmail })
      .toArray();

    if (feedbacks.length === 0) {
      return res.send({
        totalFeedbacks: 0,
        averageRating: 0,
        ratingBreakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        parcelConditionBreakdown: {
          good: 0,
          damaged: 0,
          partially_damaged: 0,
        },
        averageDeliverySpeed: 0,
        averageRiderBehavior: 0,
      });
    }

    // Calculate average rating
    const totalRating = feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0);
    const averageRating = totalRating / feedbacks.length;

    // Rating breakdown (5 stars, 4 stars, etc.)
    const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    feedbacks.forEach((f) => {
      if (f.rating >= 1 && f.rating <= 5) {
        ratingBreakdown[f.rating]++;
      }
    });

    // Parcel condition breakdown
    const parcelConditionBreakdown = {
      good: 0,
      damaged: 0,
      partially_damaged: 0,
    };
    feedbacks.forEach((f) => {
      if (f.parcelCondition) {
        parcelConditionBreakdown[f.parcelCondition]++;
      }
    });

    // Optional ratings averages
    const deliverySpeedRatings = feedbacks.filter((f) => f.deliverySpeed);
    const averageDeliverySpeed =
      deliverySpeedRatings.length > 0
        ? deliverySpeedRatings.reduce((sum, f) => sum + f.deliverySpeed, 0) /
          deliverySpeedRatings.length
        : 0;

    const riderBehaviorRatings = feedbacks.filter((f) => f.riderBehavior);
    const averageRiderBehavior =
      riderBehaviorRatings.length > 0
        ? riderBehaviorRatings.reduce((sum, f) => sum + f.riderBehavior, 0) /
          riderBehaviorRatings.length
        : 0;

    const stats = {
      totalFeedbacks: feedbacks.length,
      averageRating: parseFloat(averageRating.toFixed(2)),
      ratingBreakdown,
      parcelConditionBreakdown,
      averageDeliverySpeed: parseFloat(averageDeliverySpeed.toFixed(2)),
      averageRiderBehavior: parseFloat(averageRiderBehavior.toFixed(2)),
      recentFeedbacks: feedbacks.slice(0, 5), // Last 5 feedbacks
    };

    res.send(stats);
  } catch (error) {
    console.error("Error fetching rider rating stats:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
////////////////////FEEDBACK//////////////////////

// ============= CHAT SYSTEM =============

// POST /chats/create - Create or get existing chat between user and admin
// app.post("/chats/create", async (req, res) => {
//   try {
//     const { userEmail, userName } = req.body;

//     // Check if chat already exists
//     const existingChat = await chatsCollection.findOne({
//       userEmail: userEmail,
//     });

//     if (existingChat) {
//       return res.status(200).send(existingChat);
//     }

//     // Create new chat
//     const newChat = {
//       userEmail,
//       userName,
//       status: "active", // active, closed
//       createdAt: new Date(),
//       lastMessageAt: new Date(),
//       unreadByUser: 0,
//       unreadByAdmin: 0,
//     };

//     const result = await chatsCollection.insertOne(newChat);
//     const chat = await chatsCollection.findOne({ _id: result.insertedId });

//     res.status(201).send(chat);
//   } catch (error) {
//     console.error("Error creating chat:", error);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });
// REPLACE your existing POST /chats/create endpoint with this

app.post("/chats/create", async (req, res) => {
  try {
    const { userEmail, userName } = req.body;

    // ✅ FIXED: Use findOneAndUpdate with upsert to prevent duplicates
    const result = await chatsCollection.findOneAndUpdate(
      { userEmail: userEmail }, // Find by email
      {
        $setOnInsert: {
          // Only set these on INSERT (first time)
          userEmail,
          userName,
          status: "active",
          createdAt: new Date(),
          unreadByUser: 0,
          unreadByAdmin: 0,
        },
        $set: {
          // Always update lastMessageAt
          lastMessageAt: new Date(),
        },
      },
      {
        upsert: true, // Create if doesn't exist
        returnDocument: "after", // Return the document after update
      }
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error creating/fetching chat:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET /chats/user/:email - Get chat for specific user
app.get("/chats/user/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;

    const chat = await chatsCollection.findOne({
      userEmail: userEmail,
    });

    if (!chat) {
      return res.status(404).send({ message: "No chat found" });
    }

    res.send(chat);
  } catch (error) {
    console.error("Error fetching user chat:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /chats/admin - Get all chats for admin view
app.get("/chats/admin", async (req, res) => {
  try {
    const chats = await chatsCollection
      .find({})
      .sort({ lastMessageAt: -1 })
      .toArray();

    res.send(chats);
  } catch (error) {
    console.error("Error fetching admin chats:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// POST /messages/send - Send a message
app.post("/messages/send", async (req, res) => {
  try {
    const { chatId, senderEmail, senderName, senderRole, message } = req.body;

    const newMessage = {
      chatId: new ObjectId(chatId),
      senderEmail,
      senderName,
      senderRole,
      message,
      sentAt: new Date(),
      read: false,
    };

    const result = await messagesCollection.insertOne(newMessage);

    // ✅ FIXED: Separate $set and $inc operators
    if (senderRole === "admin") {
      await chatsCollection.updateOne(
        { _id: new ObjectId(chatId) },
        {
          $set: { lastMessageAt: new Date() },
          $inc: { unreadByUser: 1 },
        }
      );
    } else {
      await chatsCollection.updateOne(
        { _id: new ObjectId(chatId) },
        {
          $set: { lastMessageAt: new Date() },
          $inc: { unreadByAdmin: 1 },
        }
      );
    }

    const insertedMessage = await messagesCollection.findOne({
      _id: result.insertedId,
    });

    res.status(201).json(insertedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// GET /messages/:chatId - Get all messages for a chat
app.get("/messages/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;

    const messages = await messagesCollection
      .find({ chatId: new ObjectId(chatId) })
      .sort({ sentAt: 1 })
      .toArray();

    res.send(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /messages/mark-read/:chatId - Mark messages as read
app.patch("/messages/mark-read/:chatId", async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const { role } = req.body; // "user" or "admin"

    // Mark unread messages as read
    await messagesCollection.updateMany(
      {
        chatId: new ObjectId(chatId),
        senderRole: role === "user" ? "admin" : "user",
        read: false,
      },
      {
        $set: { read: true },
      }
    );

    // Reset unread count in chat
    const updateField = role === "user" ? "unreadByUser" : "unreadByAdmin";
    await chatsCollection.updateOne(
      { _id: new ObjectId(chatId) },
      { $set: { [updateField]: 0 } }
    );

    res.send({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// PATCH /chats/:id/close - Close a chat
app.patch("/chats/:id/close", async (req, res) => {
  try {
    const chatId = req.params.id;

    const result = await chatsCollection.updateOne(
      { _id: new ObjectId(chatId) },
      {
        $set: {
          status: "closed",
          closedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Chat not found" });
    }

    res.send({ message: "Chat closed successfully" });
  } catch (error) {
    console.error("Error closing chat:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// GET /chats/stats - Get chat statistics for admin
app.get("/chats/stats", async (req, res) => {
  try {
    const totalChats = await chatsCollection.countDocuments({});
    const activeChats = await chatsCollection.countDocuments({
      status: "active",
    });
    const totalUnread = await chatsCollection
      .aggregate([
        { $match: { status: "active" } },
        { $group: { _id: null, total: { $sum: "$unreadByAdmin" } } },
      ])
      .toArray();

    res.send({
      totalChats,
      activeChats,
      totalUnreadMessages: totalUnread[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching chat stats:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// await client.db("admin").command({ ping: 1 });
// console.log(
//   "Pinged your deployment. You successfully connected to MongoDB!"
// );

// Root route
app.get("/", (req, res) => {
  res.send("Parcel server is running!");
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Catch-all for debugging
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  });
});
// Export for Vercel
module.exports = app;
