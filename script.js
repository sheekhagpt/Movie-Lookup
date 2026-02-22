let movieBox = document.getElementById("movieBox");
let searchBtn = document.getElementById("searchBtn");
let error = document.getElementById("error");

let title = document.getElementById("title");
let year = document.getElementById("year");
let type = document.getElementById("type");
let rating = document.getElementById("rating");
let poster = document.getElementById("poster");
let plot = document.getElementById("plot");

searchBtn.addEventListener("click", function () {

    console.log("Button clicked");

    let movieName = movieBox.value.trim();

    // Error clear
    error.textContent = "";

    // Old details clear
    title.textContent = "";
    year.textContent = "";
    type.textContent = "";
    rating.textContent = "";
    poster.innerHTML = "";
    plot.textContent = "";

    // Empty input check
    if (movieName === "") {
        error.textContent = "Please enter a movie or series name.";
        return;
    }

    // ✅ Correct Fetch (Dynamic Title Search)
    fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=5f9d9b28`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            console.log(data); // Debug ke liye

            if (data.Response === "False") {
                error.textContent = "Movie or series not found.";
                return;
            }

            // Fill Data
            title.textContent = data.Title;
            year.textContent = "Year: " + data.Year;
            type.textContent = "Type: " + data.Type;
            rating.textContent = "IMDb Rating: " + data.imdbRating;
            plot.textContent = data.Plot;

            // Poster check
            if (data.Poster !== "N/A") {
                poster.innerHTML = `<img src="${data.Poster}" width="200">`;
            } else {
                poster.textContent = "No poster available";
            }

        })
        .catch(function () {
            error.textContent = "Something went wrong. Please try again.";
        });

});