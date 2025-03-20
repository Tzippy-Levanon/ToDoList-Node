import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios';
import renderApi from '@api/render-api';


const app = express()
const port = 3001
app.use(bodyParser.json())
app.get('', (req, res) => {
    res.send('👍👍👍👍👍')
})

// app.get('/Services', async (req, res) => {
//     try {
//         const response = await axios.get('https://api.render.com/v1/Services', {
//             headers: {
//                 'Authorization': `Bearer ${process.env.API_KEY}`,
//                 'Content-Type': 'application/json'
//             }
//         });
//         res.json(response.data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving services');
//     }
// });

app.get('/Services', (req, res)=>{
    renderApi.auth(process.env.API_KEY);
  renderApi.listServices({ includePreviews: 'true', limit: '20' })
    .then( data  => {return res.status(200).send({data: data})})
    .catch(err => console.error(err));
})

app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})
