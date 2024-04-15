let globalArrayOfWords = [];

async function loadData() {
  try {
    const response = await fetch(
      "/data/ddo-fullform/ddo_fullforms_2023-10-11.csv"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();

    globalArrayOfWords = csvText.split("\n").map((line) => {
      const parts = line.split("\t"); // Change '\t' to ',' if your CSV uses commas
      return {
        variant: parts[0],
        headword: parts[1],
        homograph: parts[2],
        partofspeech: parts[3],
        id: parts[4],
      };
    });

    // her vi skal tilføje den sortering

    globalArrayOfWords.sort((a, b) => a.variant.localeCompare(b.variant, "da"));
    // her vi kan test om vores kode den virke eller ikke med at brug den console
    console.log(globalArrayOfWords.slice(0, 10));
    console.log(globalArrayOfWords.slice(-10));
  } catch (error) {
    console.error("Failed to load and parse the CSV file:", error);
  }
}

function performSearch() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  const index = binarySearch(globalArrayOfWords, searchTerm);
  const resultsDiv = document.getElementById("results");

  if (index !== -1) {
    const result = globalArrayOfWords[index];
    resultsDiv.textContent = `Found: ${result.variant} (${result.headword})`;
  } else {
    resultsDiv.textContent = "No results found.";
  }
}

window.onload = loadData;

// her vi skal lave den anden funktion.

function binarySearch(array, searchTerm) {
  let low = 0;
  let high = array.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = array[mid].variant;
    if (guess === searchTerm) {
      return mid;
    } else if (guess > searchTerm) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
