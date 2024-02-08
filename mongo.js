const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Usage: node mongo.js <password> <name> <number>");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://rendychristiann:${password}@cluster0.zxtye4r.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);

(async () => {
  try {
    await mongoose.connect(url);

    const pbSchema = new mongoose.Schema({
      id: Number,
      name: String,
      number: String,
    });

    const Phonebook = mongoose.model("Phonebook", pbSchema);

    if (process.argv.length === 3) {
      const entries = await Phonebook.find({});
      console.log("Phonebook entries:");
      entries.forEach((entry) => {
        console.log(`${entry.name} ${entry.number}`);
      });

    } else {
      const name = process.argv[3];
      const number = process.argv[4];

      const lastEntry = await Phonebook.findOne({}, {}, { sort: { id: -1 } });
      const newId = (lastEntry ? lastEntry.id : 0) + 1;
      if (!name || !number) {
        console.log("Please provide both name and number.");
        process.exit(1);
      }

      const newEntry = new Phonebook({
        id: newId,
        name: name,
        number: number,
      });

      await newEntry.save();
      console.log("New entry added to Phonebook", newEntry);
    }

    // const PhonebookData = [
    //   {
    //     id: 1,
    //     name: 'Arto Hellas',
    //     number: '040-123456',
    //   },
    //   {
    //     id: 2,
    //     name: 'Ada Lovelace',
    //     number: '39-44-5323523',
    //   },
    //   {
    //     id: 3,
    //     name: 'Dan Abramov',
    //     number: '12-43-234345',
    //   },
    //   {
    //     id: 4,
    //     name: 'Mary Poppendieck',
    //     number: '39-23-6423122',
    //   },
    // ];

    // const savePhonebook = PhonebookData.map(entry => new Phonebook(entry));
    // await Phonebook.insertMany(savePhonebook);
    // console.log('Phonebook saved!');
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();
