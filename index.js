import express from 'express'
import fs from 'fs'
import cors from 'cors'
import { v4 as uuidv4 } from 'uuid'
import 'dotenv/config'

const app = express();
const { PORT, ORIGIN } = process.env;

app.use(express.json());
app.use('/images', express.static('public'));
app.use(cors({ PORT, ORIGIN }));

/* Import simplified video list */
const simpleVideoList = fs.readFileSync('./data/videos.json',{encoding: 'utf8'});
/* Import detailed video list */
const detailedVideoList = fs.readFileSync('./data/video-details.json',{encoding: 'utf8'});

/* /videos
GET
 - Returns an array of video objects
 - Contains only enough information to display in side bar
POST
 - Adds a new video to the video list
 - A unique id is generated for each video added
*/
app.route('/videos')
  .get((req,res) => {
    res.send(simpleVideoList);
  })
  // .post(function(req,res) {
  
  //   /* Simplified video data */
  //   const newVideoId = uuidv4();
  //   const title = req.body.title;
  //   const channel = "BrainStation";
  //   const image = req.body.image;
  //   const description = req.body.description;
  //   const views = 0;
  //   const likes = 0;
  //   const timestamp = Date.now();
  //   const comments = [];

  //   /* Partial video details */
  //   const newVideo = {
  //     id: newVideoId,
  //     title: title,
  //     channel: channel,
  //     image: image,
  //   }

  //   /* Full video details */
  //   const newFullVideo = {
  //     id: newVideoId,
  //     title: title,
  //     channel: channel,
  //     image: image,
  //     description: description,
  //     views: views,
  //     likes: likes,
  //     timestamp: timestamp,
  //     comments: comments
  //   }
 
  //   /* Import json file containing simplified list of videos */
  //   const getVideos= () => {fs.readFileSync('./data/videos.json',{encoding: 'utf8'})}
  //   let readVideos = JSON.parse(getVideos());
  //   /* update data array containing simplified video list */
  //   readVideos.push(newVideo);
  //   /* write the new updated array for simplified video list and callback confirmation */
  //   fs.writeFile('./data/videos.json',
  //     JSON.stringify(readVideos), () => {
  //       res.json(`${title} has been uploaded`);
  //     }
  //   );

  //   /* Import json file containing detailed list of videos */
  //   const getFullVideos = () => { fs.readFileSync('./data/video-details.json',{encoding: 'utf8'})}
  //   let readFullVideos = JSON.parse(getFullVideos());
  //   /* update data array containing detailed video list */
  //   readFullVideos.push(newFullVideo);
  //   /* write the new updated array for detailed video list and callback confirmation */
  //   fs.writeFile('./data/video-details.json',
  //     JSON.stringify(readFullVideos), () => {
  //       res.json(`${title} has been added to next video list`)
  //     }
  //   );

  // })

/* /videos/:id
 - :id must be swapped out with the id of a video as found in the list of videos
GET
 - Returns a detailed object of a single video
 - Details include the list of comments for that video
PUT
 - Increments the like count of the video specified by video id
*/
app.route('/videos/:id')
  .get(function(req,res) {
    const videoId = req.params.id;
    const readDetailedList = JSON.parse(detailedVideoList);
    const videoIndex = readDetailedList.findIndex(video => video.id == videoId);
    const writeDetailedList = JSON.stringify(readDetailedList[videoIndex]);
    res.send(writeDetailedList);
  })
  // .put(function(req,res) {
  //   res.send('increment number of likes')
  // })

/* /videos/:id/comments
POST 
 - :id must be swapped out with the numeric id of a video as found in the list of videos
 - Creates a new comment for a specific video
*/
app.post('/videos/:id/comments', function(req,res) {

});

/* /vidoes/:videoId/comments/:commentId
DELETE
 - Deletes the given comment and returns it in the response body
 - :videoId must be swapped out with the numeric id of a video as found in the list of videos
 - :commentId must be swapped out with the numeric id of a comment as found in the list of comments for the given video
*/
// app.delete(function(req,res) {
//   res.send('delete a comment')
// });

/* Run the server */
app.listen(PORT, () => {console.log(`Litsening on ${PORT}`)})