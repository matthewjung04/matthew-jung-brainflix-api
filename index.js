import express from 'express'
import axios from 'axios'
import fs from 'fs'

const app = express();

/* /videos
GET
 - Returns an array of video objects
 - Contains only enough information to display in side bar
POST
 - Adds a new video to the video list
 - A unique id is generated for each video added
*/
app.route('/video')
  .get(function(req,res) {
    res.send('get list of videos');
  })
  .post(function(req,res) {
    res.send('add a video');
  })

/* /videos/:id
 - :id must be swapped out with the id of a video as found in the list of videos
GET
 - Returns a detailed object of a single video
 - Details include the list of comments for that video
PUT
 - Increments the like count of the video specified by video id
*/
app.route('video/:id')
  .get(function(req,res) {
    res.send('get video details');
  })
  .put(function(req,res) {
    res.send('increment number of likes')
  })

/* /videos/:id/comments
POST
 - :id must be swapped out with the numeric id of a video as found in the list of videos
 - Creates a new comment for a specific video
*/
app.post(function(req,res) {
  res.send('add a comment');
})

/* /vidoes/:videoId/comments/:commentId
DELETE
 - Deletes the given comment and returns it in the response body
 - :videoId must be swapped out with the numeric id of a video as found in the list of videos
 - :commentId must be swapped out with the numeric id of a comment as found in the list of comments for the given video
*/
app.delete(function(req,res) {
  res.send('delete a comment')
})