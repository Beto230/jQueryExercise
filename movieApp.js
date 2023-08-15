let currentId = 0;
let moviesList = [];
$(function() {
    $("#newMovie").on("submit", function(evt) {
        evt.preventDefault();
        let title = $("#title").val();
        let rating = $("#rating").val();
        let movieData = {title, rating, currentId};
        const HTMLtoAppend = createMovieDataHTML(movieData);
        currentId++
        moviesList.push(movieData);
        $("#movieContent").append(HTMLtoAppend);
        $("#newMovie").trigger("reset");
    });

    $("tbody").on("click", ".btnDanger", function(evt) {
        let indexRemove = moviesList.findIndex( movie => movie.currentId === 
            +$(evt.target).data("deleteId"))
        moviesList.splice(indexRemove, 1)
        $(evt.target)
            .closest("tr")
            .remove();
    });

    $(".fas").on("click", function(evt) {
        let direction = $(evt.target).hasClass("fa-sort-down") ?
        "down" : "up";
        let keyToSort = $(evt.target).attr("id");
        let sortedMovies = sortBy(moviesList, keyToSort, direction);
        $("movieContent").empty();
        for (let movie of sortedMovies) {
            const HTMLtoAppend = createMovieDataHTML(movie);
            $("#movieContent").append(HTMLtoAppend);
        }

        $(evt.target).toggleClass("fa-sort-down");
        $(evt.target).toggleClass("fa-sort-up");
    });
});

function sortBy( array, keyToSort,direction) {
    return array.sort(function(a,b) {
        if(keyToSort === "rating") {
            a[keyToSort] = +a[keyToSort];
            b[keyToSort] = +b[keyToSort];
        }
        if (a[keyToSort] > b[keyToSort]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSort] > a[keyToSort]) {
            return direction === "up" ? -1 :1;
        }
        return 0;
    });
}

function createMovieDataHTML(data) {
    return `
    <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
            <button class="btnDanger" data-delete-id = ${data.currentId}> 
                Delete
            </button>
        </td>
    <tr>`;
}