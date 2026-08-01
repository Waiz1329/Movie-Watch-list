const API = "http://localhost:3000/movies";

let movies = [];

// movies ko fetch krwaya
async function loadMovies() 
{
    try 
    {
        const response = await fetch(API);
        movies = await response.json();
        displayMovies();
        
    } 
    catch (error) 
    {
        console.log("Error loading movies:", error);
    }
}
// movies add krwayi 
async function addMovie() 
{

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;

    if (!title || !genre)
    {
        alert("Please fill in all fields.");
        return;
    }

    const newMovie = 
    {
        title,
        genre,
        status
    };

    try {
        await fetch(API,
             {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        });

       await loadMovies();

        document.getElementById("title").value = "";
        document.getElementById("genre").value = "";
       document.getElementById("status").value = "Not Watched";
    } 
    catch (error)
     {
        console.log(error);
    }
}

// movie ko delete krwany k liyay
async function deleteMovie(id) 
{
    try 
    {
        await fetch(`${API}/${id}`, 
        {
            method: "DELETE"
        });

       await loadMovies();
    
    } 
    catch (error) 
    {
        console.log(error);
    }
}

// for edit k liyay movies ko 
async function editMovie(id)
 {

    const title = prompt("Enter new title:");
    const genre = prompt("Enter new genre:");
    const status = prompt("Enter status (Watched/Not Watched):");

    if (title === null || genre === null || status === null) 
    {
        return;
    }

    const updatedMovie =
    {
        title,
        genre,
        status
    };

    try
    {
        await fetch(`${API}/${id}`, 
{
            method: "PUT",
            headers:
             {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedMovie)
        });

       await loadMovies();

    }
     catch (error) 
    {
        console.log(error);
    }
}
//display krwaya movie ko
function displayMovies() 
{

    const container = document.getElementById("movieContainer");

    container.innerHTML = "";

    movies.forEach(movie => 
        {

        container.innerHTML += `

        <div class="movie-card">

            <div class="movie-header">

                <h3>
                     ${movie.title}
                </h3>

                <span class="${movie.status === "Watched" ? "watched" : "pending"}">
                    ${movie.status}
                </span>

            </div>

            <div class="movie-info">

                <p>
                    <strong>Genre:</strong>
                    ${movie.genre}
                </p>

            </div>

            <div class="movie-buttons">
                <button
                class="edit-btn"
                onclick="editMovie(${movie.id})">
                    Edit
                </button>

                <button
                class="delete-btn"
                onclick="deleteMovie(${movie.id})">
                    Delete
                </button>
            </div>
        </div>

        `;

    });

}

//addmovie ka eventlistener bnaya
document.getElementById("movieForm")
.addEventListener("submit", function(e)
{

    e.preventDefault();

    addMovie();

});

//call krwaya main func ko
loadMovies();