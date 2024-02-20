const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Replace '<password>' with your actual MongoDB Atlas password
// const mongoURI = 'mongodb+srv://vishnuvardhan:vishnu07@cluster0.dp3dpcx.mongodb.net/surveyDB';
const mongoURI = 'mongodb+srv://vishnuvardhan:vishnu07@cluster0.dp3dpcx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

const surveySchema = new mongoose.Schema({
  questions: [String],
  answers: Object,
});

const Survey = mongoose.model('Survey', surveySchema);

app.post('/api/survey', async (req, res) => {
  try {
    const { questions, answers } = req.body;
    const survey = new Survey({ questions, answers });
    await survey.save();
    res.status(201).json({ message: 'Survey data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
