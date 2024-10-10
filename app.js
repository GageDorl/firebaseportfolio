// app.js
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./scheduling/firebaseConfig");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

// API to get available appointment slots
app.get("/appointments", async (req, res) => {
  try {
    const appointmentsSnapshot = await db.collection("appointments").get();
    let appointments = [];
    appointmentsSnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API to book an appointment
app.post("/book", async (req, res) => {
  const { name, email, date, time } = req.body;
  try {
    await db.collection("appointments").add({
      name,
      email,
      date,
      time,
      status: "booked",
    });
    res.send("Appointment booked successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
