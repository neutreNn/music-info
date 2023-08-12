let musicNameRef = document.getElementById("music-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

function getMusic() {
    let musicName = musicNameRef.value;
    let url = `https://musicbrainz.org/ws/2/${musicName}`;
    if (musicName.lenght <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a music name</h3>`;
    }
    else {
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            if (data.Response == 'True') {
                result.innerHTML = `
                    <div class="info">
                        <img src="${data.image_url} class="image-url">
                        <div>
                            <div class="main-info">
                                <a href="${data.track_viewURL}>${data.title}</a>
                                <p>${data.artist_name}</p>
                            </div>
                            <audio controls>
                                <source src="${data.short_music_preview}" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>
                `;
            }
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
        });
    }
};

searchBtn.addEventListener("click", getMusic);
window.addEventListener("load", getMusic);