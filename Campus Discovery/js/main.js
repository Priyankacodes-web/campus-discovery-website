function searchEvents() {

    const searchInput =
        document.getElementById("searchInput");

    const searchValue =
        searchInput.value.trim();

    if (searchValue === "") {

        alert("Please enter something to search.");

        return;
    }

    alert("Searching for: " + searchValue);
}