import express from 'express'
import bodyParser from 'body-parser'
import renderApi from '@api/render-api';
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = 3001
app.use(bodyParser.json())
app.get('', (req, res) => {
    res.send('👍👍👍👍👍')
})

app.get('/Services', (req, res)=>{
    renderApi.auth(process.env.API_KEY);
  renderApi.listServices({ includePreviews: 'true', limit: '20' })
    .then( data  => {return res.status(200).send({data: data})})
    .catch(err => console.error(err));
})

app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})
