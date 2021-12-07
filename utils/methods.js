noSelectedSpecialCharacters = (payload) => {
  regex = new RegExp(/^[a-zA-Z0-9!@,._\s-]+$/g);
  return regex.test(payload);
};

noSpecialCharacters = (payload) => {
  regex = new RegExp(/^[a-zA-Z0-9]+$/g);
  return regex.test(payload);
};

formatDate = (date) => {
  return date.toDateString();
};

const is = {
  undefinedDate: (date) => {
    return date === undefined;
  },
  emptyDate: (date) => {
    return date === "";
  },
  dashDate: (date) => {
    return date.search("-") !== -1;
  },
  slashDate: (date) => {
    return date.search("/") !== -1;
  },
};
const set = {
  emptyDate: () => {
    return new Date();
  },
  dashDate: (date) => {
    return new Date(date);
  },
  slashDate: (date) => {
    const dateArray = date.split("/");
    const year = parseInt(dateArray[0], 10);
    const month = parseInt(dateArray[1], 10) - 1;
    const day = parseInt(dateArray[2], 10) + 1;
    return new Date(year, month, day);
  },
  undefinedDate: (date) => {
    if (new Date(date).toString() === "Invalid Date") return undefined;
    return set.dashDate(date);
  },
};
const parse = {
  duration: (time) => {
    return parseInt(time, 10);
  },
  date: (date) => {
    if (is.undefinedDate(date)) return set.emptyDate();
    if (is.emptyDate(date)) return set.emptyDate();
    if (is.dashDate(date)) return set.dashDate(date);
    if (is.slashDate(date)) return set.slashDate(date);
  },
};
parseExerciseRequest = (payload) => {
  const { description, duration, date } = payload;
  const parsed_duration = parse.duration(duration);
  const parsed_date = parse.date(date);

  const parsedPayload = {
    description,
    parsed_duration,
    parsed_date,
  };
  return parsedPayload;
};

exports.noSelectedSpecialCharacters = noSelectedSpecialCharacters;
exports.noSpecialCharacters = noSpecialCharacters;
exports.formatDate = formatDate;
exports.parseExerciseRequest = parseExerciseRequest;
exports.set = set;
