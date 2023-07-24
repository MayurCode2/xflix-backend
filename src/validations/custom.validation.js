const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message("{{#label}} must be valid mongo id");
  }
  return value;
};

const videoLink = (value, helpers) => {
  if (
    !value.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    )
  ) {
    return helpers.message("Invalid Youtube video link");
  }
  return value;
};

const releaseDate = (value, helpers) => {
  if (
    !value.match(
      /^(([0-9])|([0-2][0-9])|([3][0-1])) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/
    )
  ) {
    return helpers.message("Invalid Release Date");
  }
  return value;
};
module.exports = { objectId, videoLink, releaseDate };
