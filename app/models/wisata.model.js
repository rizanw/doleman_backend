module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    label: String,
    name: String,
    description: String,
    phone: String,
    time_op: {
      day: [String],
      hour: [String],
    },
    address: {
      street: String,
      city: String,
      province: String,
    },
    location: {
      coordinates: [Number],
      type: { type: String },
    },
    images: [String],
  });

  const wisata = mongoose.model("wisata", schema);
  return wisata;
};
