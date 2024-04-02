const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let courses = [];

app.get(`/courses`, (request, response) => {
    response.json(courses);
});

app.get(`/courses/:id`, (request, response) => {
    const courseId = request.params.id;
    const course = courses.find(course => course.id === parseInt(courseId));
    if (!course) {
        response.send('course not found');
    }
    response.json(course);
});

app.post(`/courses`, (request, response) => {
    const { title, description } = request.body;
    const newCourse = {
        id: courses.length + 1,
        title,
        description,
        registeredStudents: []
    };
    courses.push(newCourse);
    response.json(newCourse);
});

app.put(`/courses/:id`, (request, response) => {
    const courseId = request.params.id;
    const { title, description } = req.body;
    const courseIndex = courses.findIndex(course => course.id === parseInt(courseId));
    if (courseIndex === -1) {
        response.send('course not found');
    }
    const updatedCourse = {
        ...courses[courseIndex],
        title: title || courses[courseIndex].title,
        description: description || courses[courseIndex].description
    };
    courses[courseIndex] = updatedCourse;
    response.json(updatedCourse);
});

app.delete(`/courses/:id`, (request, response) => {
    const courseId = request.params.id;
    const courseIndex = courses.findIndex(course => course.id === parseInt(courseId));
    if (courseIndex === -1) {
        response.send('cant be found');
    }
    courses.splice(courseIndex, 1);
    response.send('course has been deleted');
});

app.post(`/courses/:id/register`, (request, response) => {
    const courseId = request.params.id;
    const { studentName } = request.body;
    const courseIndex = courses.findIndex(course => course.id === parseInt(courseId));
    if (courseIndex === -1) {
        response.send('could not be found');
    }
    courses[courseIndex].registeredStudents.push(studentName);
    response.json(courses[courseIndex]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});