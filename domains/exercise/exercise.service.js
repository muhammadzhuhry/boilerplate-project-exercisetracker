const { mongoose } = require("./../../service/index");
const { Schema } = mongoose;

const exerciseSchema = new Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

let ExerciseModel = mongoose.model("Exercise", exerciseSchema);

async function postExercise(payload) {
  const { _id, description, duration, date } = payload;
  const exerciseRecord = new ExerciseModel({
    user: _id,
    description,
    duration,
    date,
  });
  await exerciseRecord.save(function (err) {
    if (err) return err;
  });
  const response = {
    description,
    duration,
    date,
  };

  return response;
}

// get exercises
async function fetchExercises(_id, from, to, limit) {
  const setFromDate = { $gte: from };
  const setToDate = { $lte: to };
  const request = {
    user: _id,
  };
  if (from) request.date = { ...setFromDate };
  if (to) request.date = { ...request.date, ...setToDate };
  const query = ExerciseModel.find(request).limit(limit);
  await query.exec(function (err) {
    if (err) return err;
  });
  return query;
}

exports.postExercise = postExercise;
exports.fetchExercises = fetchExercises;