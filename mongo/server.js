

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection
const mongoURI = 'mongodb+srv://Karthi10:10Karthi@cluster0.v1sblu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
});

// Student Schema
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    rollno: String,
    college: String,
    branch: String,
    year: String,
});

const Student = mongoose.model('Student', studentSchema);

// Routes
app.post('/add-student', async (req, res) => {
    const newStudent = new Student(req.body);
    try {
        await newStudent.save();
        res.status(201).send('Student added successfully');
    } catch (error) {
        res.status(400).send('Error adding student');
    }
});

app.get('/fetch-students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).send('Error fetching students');
    }
});

app.put('/update-student', async (req, res) => {
    const { rollno, email } = req.body;
    try {
        const updatedStudent = await Student.findOneAndUpdate(
            { rollno },
            { email },
            { new: true }
        );
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).send('Error updating student');
    }
});

app.get('/fetch-student/:rollno', async (req, res) => {
    const { rollno } = req.params;
    try {
        const student = await Student.findOne({ rollno });
        res.status(200).json(student);
    } catch (error) {
        res.status(404).send('Student not found');
    }
});

app.delete('/delete-student/:rollno', async (req, res) => {
    const { rollno } = req.params;
    try {
        await Student.findOneAndDelete({ rollno });
        res.status(200).send('Student deleted successfully');
    } catch (error) {
        res.status(400).send('Error deleting student');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
