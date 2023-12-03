document.addEventListener('DOMContentLoaded', function(event) {
  // Define the path to your "queries" table
  const queriesRef = db.ref("queries");

  // Get a reference to the "posts" container element by its ID
  const postsContainer = document.getElementById("posts");

  // Retrieve data from the "queries" table as a JSON object
  queriesRef.once("value")
      .then((snapshot) => {
          const data = snapshot.val();

          // Check if data is not null
          if (data) {
              // Loop through each entry in the data
              var temp = 1;
              for (const key in data) {
                  if (data.hasOwnProperty(key)) {
                      const entry = data[key];

                      // Create a new post element
                      const postElement = document.createElement("div");
                      postElement.classList.add("post");

                      // Populate the post element with data
                      postElement.innerHTML = `
                          <h2>Querie number - ${temp}</h2>
                          <p>Name: ${entry.name}</p>
                          <p>Email: ${entry.email}</p>
                          <p>Phone: ${entry.phone}</p>
                          <p>Gender: ${entry.gender}</p>
                          <p>Subscribe: ${entry.subscribe}</p>
                          <p>Info: ${entry.additionalInfo}</p>
                          <button class="delete-btn" data-key="${key}">Delete</button>
                      `;
                      temp++;

                      postsContainer.appendChild(postElement);
                  }
              }

              // Add event listeners to the delete buttons
              const deleteButtons = document.getElementsByClassName('delete-btn');
              Array.from(deleteButtons).forEach(button => {
                  button.addEventListener('click', function() {
                      const queryKey = this.getAttribute('data-key');
                      deleteQuery(queryKey);
                  });
              });

          } else {
              // Handle the case where there is no data
              console.log("No data found in the 'queries' table.");
          }
      })
      .catch((error) => {
          console.error("Error getting data:", error);
      });
});

function deleteQuery(key) {
  const queryToDelete = db.ref("queries/" + key);
  queryToDelete.remove()
      .then(() => {
          console.log('Query successfully deleted');
      })
      .catch((error) => {
          console.error("Error deleting query:", error);
      });
}
