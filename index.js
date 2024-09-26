import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import videoRouter from './routes/videos.js';

const { PORT, ORIGIN } = process.env;

const app = express();
app.use(express.json({ limit: '10mb' }))
app.use('/images', express.static('public'));
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