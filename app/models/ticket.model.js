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

  const ticket = mongoose.model("ticket", schema);
  return ticket;
};
