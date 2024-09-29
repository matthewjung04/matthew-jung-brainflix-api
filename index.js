import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import videoRouter from './routes/videos.js';

const ORIGIN = process.env.ORIGIN;
const PORT = process.env.PORT || 5050;

const app = express();
app.use(express.json({ limit: '10mb' }))
app.use(cors({ PORT, ORIGIN }));


/* Middleware */
app.use((req, res, next) => {
  // res.send("incoming request")
  next();
});


app.use((req, res, next) => {
  // res.send("incoming request")
  next();
});

app.use("/videos", videoRouter)


/* Run the server */
app.listen(PORT, () => {console.log(`Litsening on ${PORT}`)})