$(document).ready(() => {

    
    let user = $.get('/api/user_data').then(function (data) {
        console.log('user.email: ', data.email);
        console.log('user.id: ', data.id);
        return data;
    });

    let currentMovieId;
    $(document).on('click', (event) => {

        if ($(event.target).attr('class') === 'categoryLink') {

            $.ajax({
                method: 'GET',
                url: `/api/movies/category/${event.target.text}`
            })
            .then((books) => {
                console.log(`Movies within ${event.target.text}: `, movies);

                $('#movieCards').empty();

                movies.forEach((movie) => {

                    let card = `
                    <div class = "card" style="width: 12rem;">
                        <img src="${movie.thumbnail}" class="card-img-top" alt="${movie.title} movie image"/>
                        <div class="card-body">
                            <h5 class="card-title"><a href="#" class="modalTrigger" movieId="${movie.id}">${movie.title}</a></h5>
                            <p class="card-text">
                                Directed By ${movie.director}
                            </p>
                        </div>
                    </div>
                    `;
                        $('#movieCards').append(card);
                });
            });
        }

        else if ($(event.target).attr('class') == 'modalTrigger') {
            
            $.ajax({
                method: 'GET',
                url: `/api/movies/${$(event.target).attr('movieId')}`
            }).then((movie) => {
                console.log('Modal movie: ', movie);

                $('.modal-body').empty();

                let modalMovieCard = `
                <div class="card">
                    <img src="${movie.thumbnail}" class=card-img-top" alt="${movie.thumbnail}" />
                    <div class="card-body">
                        <h5 class="card-title"><a href="#" class="modalTrigger" movieId="${movie.id}">${movie.title}</a></h5>
                        <p class="card-text"> <strong> Subtitle </strong> ${movie.subtitle}</p>
                        <p class="card-text"> <strong> Directed By </strong> ${movie.director}</p>
                        <p class="card-text"> <strong> Categories </strong> ${movie.categories}</p>
                        <p class="card-text"> <strong> Release Year </strong> ${movie.release_year}</p>
                        <p class="card-text"> <strong> Average Rating </strong> ${movie.average_rating}</p>
                        <p class="card-text"> <strong> Description </strong> ${movie.description}</p>
                    </div>
                </div>
                `;

                $('.modal-body').append(modalMovieCard);

                $('#movieModal').modal();

                currentMovieId = movie.id;
            });

        }

        else if ($(event.target).attr('id') == 'addToList') {
            console.log('add to list btn clicked');
            console.log('currentMovieId: ', currentMovieId);

            $.get('/api/user_data').then(function (data) {
                console.log('user.email: ', data.email);
                console.log('user.id: ', data.id);

                $.post('/api/shoppingcarts', {
                    UserId: data.id,
                    MovieId: currentMovieId
                }, (cart_answer) => {
                    console.log('cart_answer: ', cart_answer);
                    window.location.href = '/cart';
                });
            });
        }
    });


    $.ajax({
        method: 'GET',
        url:'/api/movies/'
    })
    .then((movies) => {
        let categories = movies.map((movie) => {
            return movie.categores;
        });

        let uniqueCategories = Array.from(new Set(categories));

        uniqueCategories.forEach((category) => {
            let li = $('<li>');
            let a = $('<a>');
            a.attr('href', '#');
            a.attr('class', 'categoryLink');
            a.text(category);
            li.append(a);
            $('#categories').append(li);
        });
    });
});