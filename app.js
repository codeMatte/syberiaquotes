const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");
const searchResults = document.querySelector("#search-results");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "songs.txt");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const songs = xhr.responseText.split("\n");
      const matchingSongs = songs.filter(function (song) {
        return song.toLowerCase().includes(searchTerm.toLowerCase());
      });

      searchResults.innerHTML = ""; // usuwamy poprzednie wyniki wyszukiwania

      if (matchingSongs.length > 0) {
        matchingSongs.forEach(function (song) {
          const songTitle = song.split("|")[0];
          const songText = song.split("|")[1];
          const songElement = document.createElement("div");
          songElement.classList.add("song");

          const titleElement = document.createElement("h2");
          titleElement.textContent = songTitle;
          songElement.appendChild(titleElement);

          const textElement = document.createElement("p");
          textElement.innerHTML = songText.replace(/\n/g, "<br>");
          songElement.appendChild(textElement);

          searchResults.appendChild(songElement);
        });
      } else {
        const noResultsElement = document.createElement("p");
        noResultsElement.textContent = "Brak wyników wyszukiwania.";
        searchResults.appendChild(noResultsElement);
      }
    } else {
      const errorElement = document.createElement("p");
      errorElement.textContent = "Wystąpił błąd podczas ładowania pliku.";
      searchResults.appendChild(errorElement);
    }

    searchInput.value = "";
  };
  xhr.send();
  matchingSongs.forEach(function (song) {
    const songElement = document.createElement("div");
    songElement.classList.add("song");

    // zamiana znaku nowej linii na <br>
    const songText = song.replace(/\n/g, "<br>");

    songElement.innerHTML = `<h2>${song.title}</h2><p>${songText}</p>`;
    searchResults.appendChild(songElement);
  });
});
const audio = document.getElementById("audio");
const randomButton = document.getElementById("random-button");

// Tablica z nazwami plików w folderze
const songs = ["song1.mp3", "song2.mp3", "song3.mp3", "song4.mp3", "song5.mp3"];

// Funkcja losująca numer piosenki z tablicy
function getRandomSong() {
  const randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
}

// Obsługa kliknięcia przycisku "Losuj piosenkę"
randomButton.addEventListener("click", () => {
  const song = getRandomSong();
  audio.src = `./audio/${song}`;
  audio.play();
});
