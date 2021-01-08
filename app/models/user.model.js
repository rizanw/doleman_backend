module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      email: String,
      password: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role",
        },
      ],
      adminOn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "wisata",
      },
      favorites: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "wisata",
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("user", schema);
  return User;
};
