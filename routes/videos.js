import express from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser';

const videoRouter = express.Router();
const jsonParser = bodyParser.json();

videoRouter.use('/static', express.static('public'));

/* Import video list */
const videoList = fs.readFileSync('./data/videos.json',{encoding: 'utf8'});

/* Video Source for custom player controls */
const videoSrc = "http://localhost:5050/videos/static/images/BrainStationSampleVideo.mp4";

/* Export video List */
const writeToJSON = (data, res, reply) => {
  fs.writeFile('./data/videos.json',
    JSON.stringify(data), () => {
      res.json(reply)
    }
  ); 
}

/* Returns video list */
videoRouter.get('/', (req,res) => {
  const readVideoList = JSON.parse(videoList);
  readVideoList.forEach((videoObj) => videoObj.video=videoSrc)
  const writeVideoList = JSON.stringify(readVideoList);
  res.send(writeVideoList);
})

/* Returns a detailed object of a single video */
videoRouter.get('/:id', (req,res) => {
  const videoId = req.params.id;
  const readVideoList = JSON.parse(videoList);
  readVideoList.forEach((videoObj) => videoObj.video=videoSrc)
  const videoIndex = readVideoList.findIndex(video => video.id == videoId);
  const writeDetailedList = JSON.stringify(readVideoList[videoIndex]);
  res.send(writeDetailedList);
})

/* Adds new video object to video list */
videoRouter.post('/', jsonParser, (req,res) => {

  /* New video details */
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "BrainStation",
    image: req.body.image,
    description: req.body.description,
    views: 0,
    likes: 0,
    timestamp: Date.now(),
    comments: []
  }

  /* Update data array containing simplified video list */
  let readVideos = JSON.parse(videoList);
  readVideos.push(newVideo);
  readVideos.forEach((videoObj) => videoObj.video=videoSrc)

  /* Write the new updated array for simplified video list and callback confirmation */
  writeToJSON(readVideos, res, `${newVideo.title} has been uploaded`);
})

/* Creates a new comment for a specific video */
videoRouter.post('/:videoId/comments', jsonParser, (req,res) => {
  const videoId = req.params.videoId;
  
  /* New comment details */
  const newComment = {
    id: uuidv4(),
    name: req.body.name,
    comment: req.body.comment,
    likes: 0,
    timestamp: Date.now()
  }

  /* Update data array containing video specific comments */
  let readVideos = JSON.parse(videoList);
  readVideos.forEach((videoObj) => videoObj.video=videoSrc)
  const index = readVideos.findIndex(video => video.id == videoId);
  readVideos[index].comments.push(newComment);

  /* Write the new updated array containing new comment and callback confirmation */
  writeToJSON(readVideos, res, newComment);
})

/* Deletes the given comment and returns it in the response body */
videoRouter.delete('/:videoId/comments/:commentId', function(req,res) {
  const videoId = req.params.videoId;
  const commentId = req.params.commentId;

  let readVideos = JSON.parse(videoList);
  readVideos.forEach((videoObj) => videoObj.video=videoSrc)
  const videoIndex = readVideos.findIndex(video => video.id == videoId);
  const commentIndex = readVideos[videoIndex].comments.findIndex(comment => comment.id == commentId);
  const deletedComment = readVideos[videoIndex].comments[commentIndex];
  readVideos[videoIndex].comments.splice(commentIndex,1);

  writeToJSON(readVideos, res, deletedComment)
})

/* Increments number of likes for specific video*/
.put('/:id/likes',function(req,res) {
  const videoId = req.params.id;
  let readVideoList = JSON.parse(videoList);
  readVideoList.forEach((videoObj) => videoObj.video=videoSrc)

  const selectedVideo = readVideoList.find(element => element.id == videoId);
  const selectedIndex = readVideoList.findIndex(element => element.id == videoId);

  let likes = parseFloat(selectedVideo.likes.replace(/,/g, ''));
  likes = likes+1;
  selectedVideo.likes = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  readVideoList[selectedIndex] = selectedVideo;
  writeToJSON(readVideoList, res, selectedVideo);
})


export default videoRouter