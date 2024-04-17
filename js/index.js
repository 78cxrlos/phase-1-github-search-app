document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("github-form");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById("search").value.trim();

    if (searchQuery) {
      try {
        const response = await fetch(
          `https://api.github.com/search/users?q=${searchQuery}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );
        const data = await response.json();

        userList.innerHTML = "";
        data.items.forEach((user) => {
          const userElement = document.createElement("li");
          userElement.textContent = user.login;

          userElement.addEventListener("click", async () => {
            try {
              const reposResponse = await fetch(
                `https://api.github.com/users/${user.login}/repos`,
                {
                  headers: {
                    Accept: "application/vnd.github.v3+json",
                  },
                }
              );
              const reposData = await reposResponse.json();

              reposList.innerHTML = "";
              reposData.forEach((repo) => {
                const repoElement = document.createElement("li");
                repoElement.textContent = repo.name;
              });
            } catch (error) {
              console.error("Error fetching user repos:", error);
            }
          });

          userList.appendChild(userElement);
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  });
});
