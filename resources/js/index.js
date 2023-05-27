// import { magazines } from "../data/magazines.js";
const accordions = document.getElementById("accordion-section");

const accordion = document.createElement("div");
accordion.className = "accordion";
accordion.id = "accordionExample";
accordions.appendChild(accordion);

async function feed(url) {
    try {
        const res = await fetch(
            "https://api.rss2json.com/v1/api.json?rss_url=" + url
        );
        return res.json();
    } catch (e) {
        return null;
    }
}

(() => {
    const accordionInner = document.getElementById("accordionExample");
    magazines.forEach((element, index) => {
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";
        let data = "";
        (async () => {
            let res = await feed(element);
            data = res;
            console.log(data);

            index === 0
                ? (accordionItem.innerHTML = `<h2 class="accordion-header" id="heading${index}">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                            ${data["feed"]["title"]}
                                        </button>
                                      </h2>
                                      <div id="collapse${index}" class="accordion-collapse collapse show" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                                          <div class="accordion-body" id="accordion-${index}" >
                                          </div>
                                      </div>
                                    `)
                : (accordionItem.innerHTML = `<h2 class="accordion-header" id="heading${index}">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        ${data["feed"]["title"]}
                                        </button>
                                      </h2>
                                      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                                      <div class="accordion-body" id="accordion-${index}" ></div>
                                    `);

            accordionInner.append(accordionItem);
            // ---------------------------------------------------------------------------------------------------------------------

            // Inserting The carousel elements inside each accordions
            const carousel = document.getElementById(`accordion-${index}`);
            const carouselBody = `<div id="carouselExampleIndicators${index}" class="carousel slide" data-bs-ride="carousel">
                              <div class="carousel-inner" id='carousel-${index}'>
                                
                              </div>
                              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${index}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                              </button>
                            </div>`;
            carousel.innerHTML = carouselBody;

            // -------------------------------------------------------------------------------------------------------------------

            data.items.forEach((content, i) => {
                const div = document.createElement("div");
                i === 0
                    ? div.classList.add("carousel-item", "active")
                    : div.classList.add("carousel-item");
                div.innerHTML = `<div class="carousel__container">
                          <a href='${content.link}' target="_blank">
                            <div class='carousel__container-image'>
                              <img src=${content.enclosure['link']} class='img-fluid w-100 h-50'>
                            </div>
                            <h2>${content.title}</h2>
                            <div class="carousel__container-author">
                              <p>${content.author}</p>
                              <div class="dot"></div>
                              <span>${date(content.pubDate)}</span>
                            </div>
                            <p class="carousel__container-content">${content.content}</p>
                          </a>
                         </div>`
                const inner = document.getElementById(`carousel-${index}`);
                inner.append(div);
            });
        })();
    });
})();

const date = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString();
}
