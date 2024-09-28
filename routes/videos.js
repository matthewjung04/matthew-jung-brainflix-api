import express from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser';

const videoRouter = express.Router();
const jsonParser = bodyParser.json();

/* Import video list */
const videoList = fs.readFileSync('./data/videos.json',{encoding: 'utf8'});

/* Returns video list */
videoRouter.get('/', (req,res) => { 
  res.send(videoList);
})

/* Returns a detailed object of a single video */
videoRouter.get('/:id', (req,res) => {
  const videoId = req.params.id;
  const readVideoList = JSON.parse(videoList);
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

  /* update data array containing simplified video list */
  let readVideos = JSON.parse(videoList);
  readVideos.push(newVideo);

  /* write the new updated array for simplified video list and callback confirmation */
  fs.writeFile('./data/videos.json',
    JSON.stringify(readVideos), () => {
      res.json(`${newVideo.title} has been uploaded`)
    }
  ); 
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

  /* update data array containing video specific comments */
  let readVideos = JSON.parse(videoList);
  const index = readVideos.findIndex(video => video.id == videoId);
  readVideos[index].comments.push(newComment);

  /* write the new updated array containing new comment and callback confirmation */
  fs.writeFile('./data/videos.json',
    JSON.stringify(readVideos), () => {
      res.json('New comment has been posted')
    }  
  ); 

})


// .put(function(req,res) {
//   res.send('increment number of likes')
// })




/* /vidoes/:videoId/comments/:commentId
DELETE
 - Deletes the given comment and returns it in the response body
 - :videoId must be swapped out with the numeric id of a video as found in the list of videos
 - :commentId must be swapped out with the numeric id of a comment as found in the list of comments for the given video
*/
// app.delete(function(req,res) {
//   res.send('delete a comment')
// });

export default videoRouter