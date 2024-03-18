// Define postsContainer as a global variable
let postsContainer;

document.addEventListener('DOMContentLoaded', function(event) {
    // Assign the reference to the "posts" container element by its ID
    postsContainer = document.getElementById("posts");

    // Rebuild the list of posts
    rebuildPostsList();
});

function rebuildPostsList() {
    // Clear existing posts
    postsContainer.innerHTML = '';

    // Define the path to your "queries" table
    const queriesRef = db.ref("queries");

    // Retrieve data from the "queries" table as a JSON object and rebuild the posts
    queriesRef.once("value")
        .then((snapshot) => {
            const data = snapshot.val();
            var temp = 1; // Reset temp for numbering

            // Check if data is not null and rebuild posts
            if (data) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const entry = data[key];
                        const postElement = createPostElement(entry, key, temp++);
                        postsContainer.appendChild(postElement);
                    }
                }
                addDeleteEventListeners(); // Add event listeners to new delete buttons
            } else {
                // Handle the case where there is no data
                console.log("No data found in the 'queries' table.");
            }
        })
        .catch((error) => {
            console.error("Error getting data:", error);
        });
}

function createPostElement(entry, key, number) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.id = "post-" + key;
    postElement.innerHTML = `
        <h2>Query number - ${number}</h2>
        <p>Name: ${entry.name}</p>
        <p>Email: ${entry.email}</p>
        <p>Phone: ${entry.phone}</p>
        <p>Gender: ${entry.gender}</p>
        <p>Subscribe: ${entry.subscribe}</p>
        <p>Info: ${entry.additionalInfo}</p>
        <button class="delete-btn" data-key="${key}">Delete</button>
    `;
    return postElement;
}

function addDeleteEventListeners() {
    const deleteButtons = document.getElementsByClassName('delete-btn');
    Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function() {
            const queryKey = this.getAttribute('data-key');
            deleteQuery(queryKey);
        });
    });
}

function deleteQuery(key) {
    const queryToDelete = db.ref("queries/" + key);
    queryToDelete.remove()
        .then(() => {
            console.log('Query successfully deleted');
            rebuildPostsList(); // Rebuild the list of posts to update query numbers
        })
        .catch((error) => {
            console.error("Error deleting query:", error);
        });
}
