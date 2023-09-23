const { MongoClient, ObjectId } = require("mongodb");

const MONGO_URL =
  "mongodb://and_kirsten:Firework1scj!@api.daybreakhaunts.ignorelist.com:3001/rewards";

const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect((err, client) => {
  // Use "client" instead of "db"
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MongoDB");

    const db = client.db("rewards");
    const collection = db.collection("rewards");

    const newReward = {
      _id: new ObjectId("650a5ca9c00307a8ea55a069"),
      eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
      rewardTitle: "Alloy Personal Training",
      businessDescription:
        "Since 1992, We have helped countless people get in the best shape of their lives.",
      offer:
        "One free week (up to three sessions) of personal training, including a movement screen and body composition assessment.",
      imgUrl: "/images/alloy_logo.png",
      rewardExtras: "",
      rewardTerms:
        "Offer valid for up to 2 people per household 18 years or older. Expires November 14th. This promotion cannot be combined with other coupons or redeemed more than once per individual.",
    };

    collection.insertMany(newReward, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(
          "Inserted documents into the collection",
          result.insertedCount,
          "documents",
        );
      }

      // Close the MongoDB connection when the operation is complete
      client
        .close()
        .then(() => console.log("Connection closed"))
        .catch((err) => console.log(err));
    });
  }
});

//   } else {
//     console.log("New reward added to database");
//   }
// });
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Mathnasium',
//     businessDescription: 'Customized math tutoring plans that build confidence and lead to true understanding',
//     offer: '$50 off enrollment fee',
//     imgUrl: '/images/mathnasium_logo.jpg',
//     rewardExtras: '',
//     rewardTerms: 'Offer valid for any passholder family member(s). Expires November 14th"'
//   },
//   {
//     _id: new ObjectId("650a7d72c00307a8ea55a072"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Mt. Mike’s Pizza: Offer 1',
//     businessDescription: 'Pizza the way it oughta be!',
//     offer: 'Buy 1 pizza get 1 free of equal or lesser value.',
//     imgUrl: '/images/mountain_mikes_logo.jpeg',
//     rewardExtras: 'Free garlic sticks or small dessert pizza with any pizza purchase.',
//     rewardTerms: 'Expires November 14th.'
//   },
//   {
//     _id: new ObjectId("650a7e85c00307a8ea55a073"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Mt. Mike’s Pizza: Offer 2',
//     businessDescription: 'Pizza the way it oughta be!',
//     offer: 'Buy up to 3 lunch buffets and get the same number of equal or lesser value free.',
//     imgUrl: '/images/mountain_mikes_logo.jpeg',
//     rewardExtras: 'Free garlic sticks or small dessert pizza with any pizza purchase.',
//     rewardTerms: 'Expires November 14th.'
//   },
//   {
//     _id: new ObjectId("650a7eafc00307a8ea55a074"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Cupbop',
//     businessDescription: '',
//     offer: 'Free side of Mandoo with any Cupbop Bowl purchase. Offer valid for up to 10 people.',
//     imgUrl: '/images/cupbop.png',
//     rewardExtras: 'Free piece of Mandoo with any purchase.',
//     rewardTerms: 'Expires October 31st'
//   },
//   {
//     _id: new ObjectId("650a7f4ec00307a8ea55a075"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Warrens',
//     businessDescription: '',
//     offer: 'Free small shake for coming into the store. Offer valid for up to four people',
//     imgUrl: '/images/warrens.png',
//     rewardExtras: 'Buy any one breakfast item, get one of equal or lesser value free.',
//     rewardTerms: 'Offers are valid for in-store customers only. Expires November 14th.'
//   },
//   {
//     _id: new ObjectId("650a7f83c00307a8ea55a076"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Sweet and Cool',
//     businessDescription: '',
//     offer: 'Buy up to 3 Soft Serves or Drinks and get the same number of equal or lesser value free.',
//     imgUrl: '/images/sweetAndCool.jpg',
//     rewardExtras: '',
//     rewardTerms: 'Offers are valid for in-store customers only. Expires November 14th.'
//   },
//   {
//     _id: new ObjectId("650cc9aec00307a8ea55a08a"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Lucienne (Salon - Spa - Boutique)',
//     businessDescription: 'Be Bold. Be Beautiful. Compassionate and expert care for your skin.',
//     offer: '1 free brow wax or tint or 1 free deep conditioning treatment with a color service',
//     imgUrl: '/images/lucienne.jpeg',
//     rewardExtras: '$20 off a hair color service or lash lift.',
//     rewardTerms: 'Offers valid if appointment is scheduled before November 14th'
//   },
//   {
//     _id: new ObjectId("650cca6ac00307a8ea55a08b"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Costa Vida: Offer 1',
//     businessDescription: 'We serve amazing- one meal, one person, one experience at a time.',
//     offer: 'Buy one handheld burrito & two drinks and receive a second handheld burrito free',
//     imgUrl: '/images/costavida.jpeg',
//     rewardExtras: '',
//     rewardTerms: 'Expires November 14th.'
//   },
//   {
//     _id: new ObjectId("650ccb2cc00307a8ea55a08c"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Costa Vida: Offer 2',
//     businessDescription: 'We serve amazing- one meal, one person, one experience at a time.',
//     offer: 'Buy one handheld burrito & two drinks and receive a second handheld burrito free',
//     imgUrl: '/images/costavida.jpeg',
//     rewardExtras: '',
//     rewardTerms: 'Expires November 14th.'
//   },
//   {
//     _id: new ObjectId("650e63dec00307a8ea55a08d"),
//     eventId: new ObjectId("6508f51dcbfd4972a366a5b1"),
//     rewardTitle: 'Sweet Churros',
//     businessDescription: 'Delicious churros with a unique flavor and more',
//     offer: 'Free basket of 6 sweet churros or 4 loops. Offer valid for up to four people',
//     imgUrl: '/images/sweet-churros.png',
//     rewardExtras: 'Monday - Thursday, buy any one basket of churros or loops, receive one basket of equal or lesser value free.',
//     rewardTerms: 'Offers are valid for in-store customers only. Expires November 14th.'
//   }
// ]};

// collection.insertMany(newReward, (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Inserted documents into the collection", result.insertedCount, 'documents');

//     // Close the connection after insertion
//     mongoClient.close()
//       .then(() => console.log("Connection closed"))
//       .catch((err) => console.log(err));
//   }
// });
