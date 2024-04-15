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
  } catch (error) {
    console.error("Failed to load and parse the CSV file:", error);
  }
}

function performSearch() {
  const searchTerm = document.getElementById("searchInput").value.trim();
  const result = globalArrayOfWords.find((word) => word.variant === searchTerm);
  const resultsDiv = document.getElementById("results");
  if (result) {
    resultsDiv.textContent = `Found: ${result.variant} (${result.headword})`;
  } else {
    resultsDiv.textContent = "No results found.";
  }
}

window.onload = loadData;
