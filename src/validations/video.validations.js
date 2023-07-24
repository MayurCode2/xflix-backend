const Values = require("../utils/values");
const customValidation = require("./custom.validation");
const Joi = require("joi").extend((joi) => ({
  base: joi.array(),
  coerce: (value, helpers) => ({
    value: value.split ? value.split(",") : value,
  }),
  type: "stringArray",
}));

const searchVideos = {
  query: Joi.object().keys({
    title: Joi.string(),
    genres: Joi.stringArray().items(Joi.string().valid(...Values.genres, "All")),
    contentRating: Joi.string().valid(...Values.contentRatings, "All"),
    sortBy: Joi.string().valid(...Values.sortBy),
  }),
};

const getVideo = {
  params: Joi.object().keys({
    videoId: Joi.required().custom(customValidation.objectId),
  }),
};

const addVideo = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    videoLink: Joi.string().required().custom(customValidation.videoLink),
    genre: Joi.string()
      .required()
      .valid(...Values.genres),
    contentRating: Joi.string()
      .required()
      .valid(...Values.contentRatings),
    releaseDate: Joi.string().required().custom(customValidation.releaseDate),
    previewImage: Joi.string().uri(),
  }),
};

const updateVotes = {
  params: Joi.object().keys({
    videoId: Joi.required().custom(customValidation.objectId),
  }),
  body: Joi.object().keys({
    vote: Joi.string()
      .required()
      .valid(...Values.updateVoteTypes),
    change: Joi.string()
      .required()
      .valid(...Values.changeVoteTypes),
  }),
};

const updateViews = {
  params: Joi.object().keys({
    videoId: Joi.required().custom(customValidation.objectId),
  }),
};

module.exports = {
  searchVideos,
  getVideo,
  addVideo,
  updateVotes,
  updateViews,
};
