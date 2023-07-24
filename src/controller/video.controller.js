const { videoService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const getVideos = catchAsync(async (req, res) => {
  const title = req.query.title ? req.query.title : "";
  const contentRating = req.query.contentRating ? req.query.contentRating : "All";
  const genres = req.query.genres ? req.query.genres : ["All"];
  const sortBy = req.query.sortBy ? req.query.sortBy : "releaseDate";

  const videos = await videoService.getVideos(
    title,
    contentRating,
    genres,
    sortBy
  );

  res.status(200).send({ videos: videos });
});

const getVideo = catchAsync(async (req, res) => {
  const video = await videoService.getVideo(req.params.videoId);
  res.status(200).send(video);
})

const addVideo = catchAsync(async (req, res) => {
  const video = await videoService.addVideo(req.body);
  res.status(201).send(video);
});

const changeVotes = catchAsync(async (req, res) => {
  await videoService.changeVotes(
    req.params.videoId,
    req.body.vote,
    req.body.change
  );
  res.status(204).send();
});

const changeViews = catchAsync(async (req, res) => {
  await videoService.changeViews(req.params.videoId);
  res.status(204).send();
});

module.exports = {
  getVideos,
  getVideo,
  addVideo,
  changeVotes,
  changeViews,
};
