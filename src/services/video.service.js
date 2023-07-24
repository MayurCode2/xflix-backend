const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { Video } = require("../models");
const ApiError = require("../utils/catchAsync");
const Values = require("../utils/values");

const getVideos = async (title, contentRating, genres, sortBy) => {
  console.log(title, " ", contentRating, " ", genres, " ", sortBy);
  const titleMatch = { title: { $regex: title, $options: "i" } };

  const contentRatings = getPossibleContentRating(contentRating);
  const contentRatingMatch = { contentRating: { $in: contentRatings } };

  let genreMatch = { genre: { $in: genres } };
  if (genres.includes("All")) {
    genreMatch = null;
  }

  const videos = await Video.find({
    ...titleMatch,
    ...contentRatingMatch,
    ...genreMatch,
  });

  const sortedVideos = sortVideos(videos, sortBy);

  return sortedVideos;
};

const getPossibleContentRating = (contentRating) => {
  const contentRatings = [...Values.contentRatings];

  //if contentRating is ALl the return all rating from Values.contentRating
  if (contentRating === "All") {
    return contentRatings;
  }

  //Index of content rating from Values.contentRatings
  const contentRatingIndex = contentRatings.indexOf(contentRating);

  //get only the content from Values.contentRating and return
  const possibleContentRating = contentRatings.splice(contentRatingIndex);

  return possibleContentRating;
};

const sortVideos = (videos, sortBy) => {

  videos.sort((video1, video2) => {
    let field1 = video1[sortBy];
    let field2 = video2[sortBy];

    if (sortBy === "releaseDate") {
      field1 = new Date(field1).getTime();
      field2 = new Date(field2).getTime();
    }

    if (field1 > field2) {
      return -1;
    }

    return 1;
  });

  return videos;
};

const getVideo = async (id) => {
  const video = await findVideoById(id);
  // console.log("get function",video);
  return video;
};

const findVideoById = async (id) => {
  const video = await Video.findById(id);
  // console.log("find by id function",video);
  if (!video) {
    throw new Error(httpStatus.NOT_FOUND);
  }

  return video;
};

const addVideo = async (videoBody) => {
  const video = await Video.create(videoBody).catch((error) => {
    if (mongoose.Error.ValidationError) {
      throw new Error(httpStatus.BAD_REQUEST);
    }
  });
  return video;
};

const changeVotes = async (id, vote, change) => {
  const video = await findVideoById(id);

  let changeVote = "";

  if (vote === "upVote") {
    changeVote = "upVotes";
  } else {
    changeVote = "downVotes";
  }

  const prevVotes = video.votes[changeVote];
  let newVotes = prevVotes;

  if (change === "increase") {
    newVotes += 1;
  } else {
    newVotes -= 1;
  }

  newVotes = Math.max(newVotes, 0);

  video.votes[changeVote] = newVotes;

  await video.save();

  return;
};

const changeViews = async (id) => {
  const video = await findVideoById(id);
  video.viewCount += 1;
  await video.save();
  return;
};

module.exports = {
  getVideos,
  getVideo,
  addVideo,
  changeVotes,
  changeViews,
};
