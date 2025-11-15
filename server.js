const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const users = [
        { id: 1, name: 'kaycey', email: 'kaycey@gmail.com' },
        { id: 2, name: 'rakie', email: 'rakie@gmail.com'}
    ];

//create user
app.post('/users', (req, res) => {
    console.log("post /users called");
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required cant be empty' });
    }
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: { name, email } });
});


//get all users
app.get('/users', (req,res)=>{
    console.log("get /users called");
    
    res.status(200).json(users);
});

//get user by id
app.get('/users/:id', (req, res) => {
    console.log("get /users/:id called");
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
});

//update user by id
app.put('/users/:id', (req, res) => {
    console.log("put /users/:id called");
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    res.status(200).json({ message: 'User updated successfully', user });
});

//delete user by id
app.delete('/users/:id', (req, res) => {
    console.log("delete /users/:id called");
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});