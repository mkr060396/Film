// The OMDB API is stored in the "url" variable
let url = "http://www.omdbapi.com/?apikey=499a8b3f&t=";
// This variable contains the JSON data for "title" and "youtubeId"
let movieJson = {
    "movies":[{

    "title": "It",
        "youtubeId": "hAUTdjf9rko"},
        {
    "title": "Get Out",
        "youtubeId": "DzfpyUB60YY"},
        {
    "title": "The Babadook",
        "youtubeId": "k5WQZzDRVtw"},
        {
    "title": "Hereditary",
        "youtubeId": "V6wWKNij_1M"},
        {
    "title": "Annihilation",
        "youtubeId": "89OP78l9oF0"},
        {
    "title": "The Exorcist",
        "youtubeId": "YDGw1MTEe9k"}]
};

// This variable gets and contains an ID called "movieContainer"
let container = document.getElementById("movieContainer");

//This loop runs through the JSON data and fetches it
for (let i = 0; i < movieJson.movies.length; i++) {
    let fetchUrl = url + movieJson.movies[i].title.replace(/( )/g, "%20");
    fetch(fetchUrl)
        .then(response => {
            return response.json();
        })
        //This creates the different tags, ids and classes for the content, essentially making HMTL-tags in JavaScript
        .then(data => {
            const box = document.createElement("li");
            const section = document.createElement("section");
            section.setAttribute("class", "movie");

            const h2 = document.createElement("h2");
            h2.setAttribute("class", "movieTitle");

            const poster = document.createElement("img");
            poster.setAttribute("src", data.Poster);

            const div = document.createElement("div");
            div.setAttribute("id", "player" + i);
            div.setAttribute("class", "show");


            const p = document.createElement("p");
            p.setAttribute("class", "description");

            h2.innerText = data.Title;
            p.innerText = data.Plot;
// This appends the content and creates an order for the different elements
            box.appendChild(section);
            section.appendChild(h2);
            section.appendChild(poster);
            section.appendChild(p);
            section.appendChild(div);
            container.appendChild(box);
        })
        // Here I'm trying to catch potential errors
        .catch(function (err) {
            console.log('error: ' + err);

        })
}
// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "http://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    for (let i = 0; i < movieJson.movies.length; i++) {
        player = new YT.Player('player' + i, {
            height: '390',
            width: '640',
            videoId: movieJson.movies[i].youtubeId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

// 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }
}