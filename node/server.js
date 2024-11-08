const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());

app.use(require('./routes/index'));

const PORT = process.env.PORT || 3000;

app.on('close', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    }
    console.log('Closed the database connection.');
  });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
