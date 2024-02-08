const Phonebook = require("../models/phonebook");

const index = (request, response) => {
  Phonebook.find({}).then((people) => {
    return response.json(people);
  });
};

const show = (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((phonebook) => {
      if (phonebook) {
        return response.json(phonebook);
      } else {
        return response.status(404).end();
      }
    })
    .catch((error) => next(error));
};

const info = (request, response) => {
  const date = new Date();
  Phonebook.count().then((count) => {
    return response.send(
      `<h2>Phonebook has info for ${count} people</h2><br/><p>${date}</p>`
    );
  });
};

const deleteById = (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      return response.status(204).end();
    })
    .catch((error) => next(error));
};

const create = (request, response, next) => {
  const body = request.body;
  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  });

  phonebook
    .save()
    .then((result) => {
      console.log("Add phonebook successfull");
      return response.status(201).json(result);
    })
    .catch((error) => next(error));
};

const update = (request, response, next) => {
  const { name, number } = request.body;
  Phonebook.findByIdAndUpdate(
    request.params.id,
    { name, number },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  )
    .then((updatedNote) => {
      return response.json(updatedNote);
    })
    .catch((error) => next(error));
};

module.exports = {
  create,
  deleteById,
  index,
  info,
  update,
  show,
};
