module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    wisata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wisata",
    },
    code: String,
    date: Date,
    quantity: Number,
    price: Number,
    status: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ticket = mongoose.model("ticket", schema);
  return ticket;
};
