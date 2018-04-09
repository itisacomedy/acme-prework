const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(require('body-parser').json());

app.get('/api/students', (req, res, next)=> {
    Student.findAll()
        .then(students => res.send(students))
        .catch(next);
})

app.get('/api/campuses', (req, res, next)=> {
    Campus.findAll()
        .then(campuses => res.send(campuses))
        .catch(next);
})

app.post('/api/students', (req, res, next)=> {
    Student.create(req.body)
        .then(student => res.send(student))
        .catch(next);
})
//need to assign campus to student

app.post('/api/campuses', (req, res, next)=> {
    Campus.create(req.body)
        .then(campus => res.send(campus))
        .catch(next)
})

app.put('/api/students/:id', (req, res, next)=> {
    Student.findById(req.params.id)
    .then(student => {
        Object.assign(student, req.body);
        return student.save();
    })
})

app.put('/api/campuses/:id', (req, res, next)=> {
    Campus.findById(req.params.id)
    .then(campus => {
        Object.assign(campus, req.body);
        return campus.save();
    })
})

app.delete('/api/campuses/:id', (req, res, next)=> {
    Campus.findById(req.params.id)
    .then(campus => {
        return Promise.all([
            campus.destroy(),
            Student.destroy({ where: { campusId: campus.id }})
        ])
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next)=> {
    Student.findById(req.params.id)
    .then(student => {
        return student.destroy();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})

const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/campus_student');

const Student = conn.define('student', {
    firstName: {
        type: Sequelize.STRING,
        empty: null
    },
    lastName: {
        type: Sequelize.STRING,
        empty: null
    },
    email: {
        type: Sequelize.STRING,
        // empty: null
    },
    gpa: {
        type: Sequelize.DECIMAL,
        // empty: null
    }
}, {
    getterMethods: {
        name() {
            return this.firstName + ' ' + this.lastName
        }
    }
})

const Campus = conn.define('campus', {
    name: {
        type: Sequelize.STRING,
        empty: null
    },
    // imageUrl: {
    //     defaultValue: 'https://goo.gl/images/aefWYz'
    // },
    description: {
        type: Sequelize.TEXT,
        // empty: null
    }
})

Student.belongsTo(Campus);

conn.sync({ force: true })
    .then( ()=> Promise.all([
        Student.create({ firstName: 'Ha', lastName: 'Du', email: 'hahaidu@gmail.com', gpa: 3.9 }),
        Student.create({ firstName: 'Chris', lastName: 'Tsoi', email: 'ctsoi87@gmail.com', gpa: 3.2 }),
        Student.create({ firstName: 'Kevin', lastName: 'Du', email: 'dugiakhai@gmail.com', gpa: 3.8 }),
        Campus.create({ name: 'New York', description: 'This is New York campus' }),
        Campus.create({ name: 'San Francisco', description: 'This is San Francisco campus' })
    ]))
    .then(([s1, s2, s3, c1, c2])=>Promise.all([
       s1.setCampus(c1),
       s2.setCampus(c2),
       s3.setCampus(c2),
    ]))

app.listen(port, ()=> console.log(`listening on port ${port}`));