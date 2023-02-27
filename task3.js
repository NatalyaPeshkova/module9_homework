const input = document.querySelector(".input");
const submitButton = document.querySelector(".btn");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector(".photos");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    const value = input.value;

    if (value >= 1 && value <= 10 && !isNaN(value)) {
        useRequest("https://picsum.photos/v2/list?limit=" + value, loadPhotos);
    } else {
        write("Число вне диапазона от 1 до 10.");
    }
}

function write(text) {
    outputSpan.innerHTML = text;
}

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status !== 200) {
            write("Error: ", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        write("Error: ", xhr.status);
    };

    xhr.send();
};

function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img src="${item.download_url}"
                                style="width: 100px; margin-right: 30px; margin-bottom: 30px"
                                />
                            </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}

