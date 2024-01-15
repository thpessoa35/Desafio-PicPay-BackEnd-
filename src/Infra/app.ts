import express from 'express'

import {router}   from './routes'

export const app = express();

app.use(express.json());
app.use(router)

app.get('/client', (req, res) => {
    res.send('ola');
});

app.listen(3333,()=>{console.log('server is running')})




