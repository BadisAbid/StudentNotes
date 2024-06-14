import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


 const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'public/images');
    },
    filename:(req, file, cb) => {
        cb(null, file.fieldname +"_"+ Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage
})


app.post('/upload',upload.single('image') ,(req, res) => {
  const image = req.file.filename;
  const sql = "INSERT INTO images (image) VALUES (?)";
    db.query(sql, [image], (err, result) => {
        if (err) return res.json({ Message: "Error" });
        return res.json({ Status: "Success" });
       

    })
})


app.get('/', (req, res) => {
    const sql = "select * FROM images";
    db.query(sql, (err, result) => {
        if (err) return res.json("Error" );
        return res.json(result);
    })
})


const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: '',
    database: 'sigin_react'
});

const secretKey = "your_secret_key"; // Use a strong secret key in production

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/adminlogin', (req, res) => {
    const sql = 'SELECT * FROM adminlogin WHERE username = ? AND password = ?';
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ message: "Error" });
        
        if (data.length > 0) {
            return res.json({ message: "Login Successfully" });
        } else {
            return res.json({ message: "Invalid Email or Password" });
        }
    });
});






app.delete('/delete/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const sql = "DELETE FROM images WHERE image = ?";
    db.query(sql, [imageName], (err, result) => {
        if (err) {
            console.error('Error deleting image from database:', err);
            return res.status(500).json({ Status: "Error", Message: "Failed to delete image from database" });
        }
        const imagePath = path.join(__dirname, 'public', 'images', imageName);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Failed to delete local image file:', err);
                return res.status(500).json({ Status: "Error", Message: "Failed to delete local image file" });
            }
            return res.json({ Status: "Success" });
        });
    });
});











app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.password];
    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.json({ Error: "Inserting data Error" });
        }
        return res.json({ Status: "Data inserted successfully" });
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error('Login Error:', err);
            return res.json({ Error: "Login Error in server" });
        }
        if (data.length > 0) {
            const token = jwt.sign({ email: req.body.email }, secretKey, { expiresIn: '1h' });
            console.log('Login successful, token generated:', token);
            return res.json({ Status: "Success", token });
        } else {
            console.log('Invalid email or password');
            return res.json({ Error: "Invalid email or password" });
        }
    });
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        console.log('No token provided');
        return res.status(403).json({ Error: "No token provided" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Failed to authenticate token:', err);
            return res.status(500).json({ Error: "Failed to authenticate token" });
        }
        req.email = decoded.email;
        next();
    });
};

app.get('/protected', verifyToken, (req, res) => {
    return res.json({ Status: "Success", message: "This is a protected route" });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000...");
});

