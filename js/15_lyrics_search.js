const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//////// Event listeners ////////
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    searchSongs(searchTerm);
  } else {
    alert("Please type in a search term");
  }
});
result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  console.log(clickedEl.tagName);
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});

///////// Functions /////////

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  // Show songs/artists
  showSongs(data);
}

// Show song and artist in DOM
function showSongs(songs) {
  // let output = "";
  // songs.data.forEach((song) => {
  //   output += `
  //     <li>
  //       <span><strong>${song.artist.name}</strong> -${song.title}</span>
  //       <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //     </li>
  //   `;
  // });
  // result.innerHTML = `
  //   <ul class="songs">
  //   ${output}
  //   </ul>
  // `;
  result.innerHTML = `
    <ul class="songs">
      ${songs.data
        .map(
          (song) => `<li>
          <span><strong>${song.artist.name}</strong> --${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`
        )
        .join("")}
    </ul>
  `;

  if (songs.prev || songs.next) {
    more.innerHTML = `
      ${
        songs.prev
          ? `<button class='btn' onclick="getMoreSongs('${songs.prev}')">Prev</button>`
          : ``
      }
      ${
        songs.next
          ? `<button class='btn' onclick="getMoreSongs('${songs.next}')">Next</button>`
          : ``
      }
    `;
  } else {
    more.innerHTML = "";
  }
}

// Get prev and next songs
async function getMoreSongs(url) {
  // Solve CORS problems due to the API restriction -- can be found from
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showSongs(data);
}

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2><span>${lyrics}</span>`;

  more.innerHTML = "";
}
