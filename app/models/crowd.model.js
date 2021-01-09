module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    wisata: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wisata",
    },
    date: Date,
    in: Number,
    total: Number,
    capacity: Number,
  });

  const crowd = mongoose.model("crowd", schema);
  return crowd;
};
