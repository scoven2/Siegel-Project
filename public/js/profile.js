const newFormHandler = async(event) => {
    event.preventDefault();

    const name = document.querySelector("#movie-name").value.trim();
    const needed_funding = document.querySelector("#movie-funding").value.trim();
    const description = document.querySelector("#movie-desc").value.trim();

    if (name && needed_funding && description) {
        const response = await fetch(`/api/movies`, {
            method: "POST",
            body: JSON.stringify({ name, needed_funding, description }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Failed to create movie");
        }
    }
};

const delButtonHandler = async(event) => {
    if (event.target.hasAttribute("data-id")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/movies/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert("Failed to delete movie");
        }
    }
};

document
    .querySelector(".new-movie-form")
    .addEventListener("submit", newFormHandler);

document
    .querySelector(".movie-list")
    .addEventListener("click", delButtonHandler);