import express from 'express';
import path from 'path';

const app = express();
const port = 3000;
const dirname = `${path.resolve()}/src/wordle`;

app.use(express.static(dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, '/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});