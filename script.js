let players = [];

const storedDate = localStorage.getItem("playersData");
if (storedDate) {
  const parsedData = JSON.parse(storedDate);
  if (parsedData && parsedData.players) {
    players = parsedData.players;
  }
}

const addPlayerButton = document.querySelector("#add");
const removePlayerButton = document.querySelector("#remove");
const pickWinnerButton = document.querySelector("#pick-winner");
const newRoundButton = document.querySelector("#new-round");

document.addEventListener("DOMContentLoaded", () => {
  renderPlayersTable();
});

const saveToLocalStorge = () => {
  const jsonData = JSON.stringify({ players: players });
  localStorage.setItem("playersData", jsonData);
  console.log("Data saved to local storage:", jsonData);
};

const renderPlayersTable = () => {
  const tbody = document.querySelector("#players-list tbody");
  tbody.innerHTML = "";

  players.forEach((playerObj) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${playerObj.id}</td><td>${playerObj.name}</td>`;
    tbody.appendChild(tr);
  });
  console.log("Table rendered with data:", players);
};

const randomId = () => {
  const length = players.length;

  let random;
  do {
    random = Math.floor(Math.random() * (length + 1)) + 1;
  } while (players.some((playerObj) => playerObj.id === random));

  return random;
};

addPlayerButton.addEventListener("click", () => {
  const newName = prompt("Enter the new name:");
  const lowerNewName = newName.toLowerCase();

  const nameExists = players.some(
    (nameObj) => nameObj.name.toLowerCase() === lowerNewName
  );
  if (!nameExists) {
    const newId = randomId();
    players.push({ id: newId, name: newName });
  } else {
    alert("Name already exists.");
  }

  saveToLocalStorge();
  renderPlayersTable();
});

removePlayerButton.addEventListener("click", () => {
  const idToDelete = prompt("Enter the Name to removed:");

  const lowerIdToDelete = idToDelete.toLowerCase();

  const indexToDelete = players.findIndex(
    (playerObj) => playerObj.name.toLowerCase() === lowerIdToDelete
  );
  if (indexToDelete !== -1) {
    players.splice(indexToDelete, 1);
  } else {
    alert("Name not found.");
  }
  saveToLocalStorge();
  renderPlayersTable();
});

pickWinnerButton.addEventListener("click", () => {
  const winner = players[Math.floor(Math.random() * players.length)];
  alert(`Winner: ${winner.name} - ID: ${winner.id} 🏆`);
});

const shuffleList = (list) => {
  const shuffledNames = list
    .map((player) => player.name)
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i < list.length; i++) {
    list[i].name = shuffledNames[i];
  }
};

newRoundButton.addEventListener("click", () => {
  shuffleList(players);
  renderPlayersTable();
});
