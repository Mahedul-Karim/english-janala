const navContainer = document.querySelector(".nav-container");
const header = document.getElementById("header");
const levelButtons = document.getElementById("level-buttons");
const vocalbularyContainer = document.getElementById("vocabulary-container");
const modal = document.getElementById("my_modal_1");
const modalBox = document.querySelector(".modal-box");

const headerHeight = header.clientHeight;
let currentButton = 0;
let activeVocabulary = 0;

const getData = async (endpoint) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/${endpoint}`
  );

  const data = await res.json();

  return data;
};

const renderLoader = (elem) => {
  elem.innerHTML = `<div class="flex items-center justify-center"><span class="loading loading-ring loading-xl"></span></div>`;
};

const handleModal = async (id) => {
  renderLoader(modalBox);
  modal.showModal();

  const { data } = await getData(`word/${id}`);

  const modalData = `<div class="border border-solid border-gray-200 rounded-[0.5rem] p-4">
          <h2
            class="text-2xl font-poppins text-black font-bold flex items-center"
          >
            ${data.word}(<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z"
              />
              <path
                d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z"
              />
            </svg>
            :${data.pronunciation || "কোনো উচ্চারণ পাওয়া যায়নি"})
          </h2>
          <div class="my-2 space-y-1">
            <p class="font-poppins font-semibold text-black">Meaning</p>
            <p class="font-bangla font-medium text-black">${
              data.meaning || '"কোনো অর্থ পাওয়া যায়নি"'
            }</p>
          </div>
          <div class="my-2 space-y-1">
            <p class="font-poppins font-semibold text-black">Example</p>
            <p class="font-poppins text-black">
              ${data.sentence || '"কোন বাক্য পাওয়া যায়নি"'}
            </p>
          </div>
          <div class="my-2 space-y-1">
            <p class="font-bangla font-semibold text-black">
              সমার্থক শব্দ গুলো
            </p>
            <div class="flex items-center gap-2 flex-wrap">
            ${
              data.synonyms.length > 0
                ? data.synonyms
                    .map((syn) => {
                      return `<div
                class="badge font-poppins border border-solid border-[#D7E4EF] text-base h-[35px] !text-dark bg-sky-light-1"
              >
                ${syn}
              </div>`;
                    })
                    .join("")
                : '"কোনো প্রতিশব্দ পাওয়া যায়নি"'
            }
              
            </div>
          </div>
          <div class="modal-action justify-start">
            <form method="dialog">
              <button
                class="btn btn-primary h-[30px] sm:h-[38px] sm:text-base text-sm px-[0.4rem] sm:px-[1rem]"
              >
                Complete Learning
              </button>
            </form>
          </div>
        </div>`;

  modalBox.innerHTML = modalData;
};

const renderVocabolary = (data = []) => {
  if (currentButton === 0) {
    vocalbularyContainer.innerHTML = `<div class="flex flex-col gap-2 items-center justify-center">
              <p class="text-dark-1 text-sm font-bangla">আপনি এখনো কোন Lesson Select করেন ন</p>
              <h3 class="text-3xl font-medium text-dark font-bangla">একটি Lesson Select করুন।</h3>
            </div>`;
    return;
  }

  if (currentButton > 0 && data.length === 0) {
    vocalbularyContainer.innerHTML = `<div class="flex flex-col gap-2 items-center justify-center">
            <div>
              <img src="./src/assets/alert-error.png" alt="" />
            </div>
            <p class="text-dark-1 text-sm font-bangla">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h3 class="text-3xl font-medium text-dark font-bangla">
              নেক্সট Lesson এ যান
            </h3>
          </div>`;
  }

  if (currentButton > 0 && data.length > 0) {
    const cards = data
      .map((card) => {
        return `
            <div class="card bg-base-100">
              <div class="card-body items-center">
                <h2
                  class="card-title text-center text-2xl font-poppins text-black font-bold"
                >
                  ${card.word}
                </h2>
                <p class="text-black font-medium font-poppins">
                  Meaning /Pronounciation
                </p>
                <p class="font-bangla text-dark-1 text-2xl font-semibold">
                  "${card.meaning || "কোনো উচ্চারণ পাওয়া যায়নি"}"
                </p>
                <div class="card-actions justify-between self-stretch mt-4">
                  <button
                    class="bg-sky-light p-2 rounded-lg text-dark-2 cursor-pointer"
                    onclick="handleModal(${card.id})"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="size-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    class="bg-sky-light p-2 rounded-lg text-dark-2 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      class="size-6"
                    >
                      <path
                        d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z"
                      />
                      <path
                        d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>`;
      })
      .join("");
    vocalbularyContainer.innerHTML = `<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${cards}</div>`;
    return;
  }
};

const handleLevelSelection = async (e, index) => {
  const allButtons = document.querySelectorAll(".level-btn");

  allButtons.forEach((btn) => {
    btn.classList.add("btn-outline");
  });

  if (currentButton === index) {
    e.target.classList.add("btn-outline");
    currentButton = 0;
    renderVocabolary();
    return;
  }

  const clickedButton = e.target.closest(".level-btn");

  clickedButton.classList.remove("btn-outline");
  currentButton = index;

  renderLoader(vocalbularyContainer);

  const { data } = await getData(`level/${currentButton}`);

  renderVocabolary(data);
};

const getButtons = async () => {
  const buttons = await getData("levels/all");

  buttons.data.forEach((btn) => {
    const div = document.createElement("div");
    const btnContent = `<button
                class="btn btn-outline btn-primary items-center h-[30px] sm:h-[38px] sm:text-base text-sm px-[0.4rem] sm:px-[1rem] level-btn"
                onclick="handleLevelSelection(event,${btn.level_no})"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-4 sm:size-5"
                >
                  <path
                    d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
                  />
                </svg>
                Lesson-${btn.level_no}
              </button>`;

    div.innerHTML = btnContent;
    levelButtons.appendChild(div);
  });
};

navContainer.addEventListener("click", function (e) {
  const button = e.target.closest(".nav-btn");

  if (!button) return;

  const sectionId = button.dataset.id;

  const section = document.getElementById(sectionId);

  window.scrollTo({
    top: section.offsetTop - headerHeight,
    behavior: "smooth",
  });
});

getButtons();
renderVocabolary();
