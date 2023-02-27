const inputPage = document.querySelector("input");
const inputLimit = document.getElementById("limit");
const submitButton = document.querySelector(".btn");
const outputSpan = document.querySelector(".span");
const photosContainer = document.querySelector(".photos");

submitButton.addEventListener("click", submitButtonHandle);

if (loadPhotosFromLocalStorage())
    write("Загружены последние просмотренные фото.");

function submitButtonHandle() {
    const pageNumber = inputPage.value;
    console.log(pageNumber)
    const limit = inputLimit.value;
    console.log(limit)

    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        write("Номер страницы и лимит вне диапазона от 1 до 10.");
        return;
    } else
    if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
        write("Номер страницы вне диапазона от 1 до 10.");
        return;
    } else
    if (limit < 1 || limit > 10 || isNaN(limit)) {
        write("Лимит вне диапазона от 1 до 10.");
        return;
    }

    fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            loadPhotos(json);
            savePhotosToLocalStorage();
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}

function write(text) {
    outputSpan.innerHTML = text;
}

function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                src="${item.download_url}"
                                style="width: 150px; margin-right: 30px"
                                />
                            </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photos", photosContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
    photosContainer.innerHTML = localStorage.getItem("last_photos");
    return  photosContainer.innerHTML.length > 0;
}