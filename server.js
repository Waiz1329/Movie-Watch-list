//yaha par express ko importt kea or application bnayi

const express = require('express');
const app = express();
app.use (express.static("public"));

// express ko allow kea frntend ka data smjhny mai
app.use(express.json());
let movId = 1;

// array bnaaya
const movies = [];

// response check kea
app.get('/', (req,res) =>
     {
       res.send('Welcome to CineVault API');
     });

app.get('/movies', (req,res) => 
    {
    res.json(movies)
    })

    // moives ko add kea
app.post('/movies',(req,res) => 
    {
    const newMovies = 
    {
        id: movId++,
        title: req.body.title,
        genre: req.body.genre,
        status: req.body.status

    };

   movies.push(newMovies);
   res.json(newMovies);
    })

    // single movie find k liyay
app.get('/movies/:id', (req, res) => 
    {
    const id = parseInt(req.params.id);
    const movie = movies.find((n) => n.id === id);
    if(!movie)
        {
      return res.status(404).send("Movie not found");
        }
    else
        {
        res.json(movie);
        }

    })
 
    // put for update kea movies ko
app.put('/movies/:id', (req, res) => 
    {
    const id = parseInt(req.params.id);
    const movie = movies.find((n) => n.id === id);
    const { title, genre, status } = req.body;
    if(!movie)
        {
      return res.status(404).send("Movie not found");
    }
    else
        {
        if(title !== undefined)
            {
            movie.title = title;
            }

        if(genre !== undefined) 
            {
            movie.genre = genre;
            }

        if(status !== undefined)
            {
            movie.status = status;
            }
    res.json(movie);
         }
    });

    // id ki help sai delete kea
app.delete('/movies/:id', (req, res) =>
     {
    const id = parseInt(req.params.id);
    const index = movies.findIndex((n) => n.id === id);
    if (index === -1)
         {
     return res.status(404).send("Movie not found");
         }

    movies.splice(index, 1);
    res.send("Movie deleted successfully");
     });
     
     // server ko start kea
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});