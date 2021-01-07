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
    location: {
      address: String,
      city: String,
      province: String,
      coordinate: [Number],
      type: String,
    },
    images: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const wisata = mongoose.model("wisata", schema);
  return wisata;
};
