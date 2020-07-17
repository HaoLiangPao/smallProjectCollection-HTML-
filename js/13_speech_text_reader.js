// DOM elements selected
const main = document.querySelector("main");
const textBox = document.getElementById("text-box");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

//////// Init the application ////////
// Constant data
const data = [
  {
    image: "../resources/img/13_speech_text_reader/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "../resources/img/13_speech_text_reader/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "../resources/img/13_speech_text_reader/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "../resources/img/13_speech_text_reader/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "../resources/img/13_speech_text_reader/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "../resources/img/13_speech_text_reader/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "../resources/img/13_speech_text_reader/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "../resources/img/13_speech_text_reader/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "../resources/img/13_speech_text_reader/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "../resources/img/13_speech_text_reader/home.jpg",
    text: "I want to go home",
  },
  {
    image: "../resources/img/13_speech_text_reader/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "../resources/img/13_speech_text_reader/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];
// Create UI grid
data.forEach(createBox);
// Store voices
let voices = [];
// Create the voice selector
getVoices();
// Init speech synth
const message = new SpeechSynthesisUtterance();

///////// Add Event Listener ///////
// Open input text box
toggleBtn.addEventListener("click", () => textBox.classList.toggle("show"));
// Close input text box
closeBtn.addEventListener("click", () => textBox.classList.toggle("show"));
// Voices changed: reset the select list?
// speechSynthesis.addEventListener("voicesChanged", getVoices);
// Change voice
voicesSelect.addEventListener("change", setVoice);
// Read custom text button
readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});
///////// Functions ////////////

// Create speech boxes
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");

  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}
  `;

  box.addEventListener("click", () => {
    // Set the text to speak
    setTextMessage(text);
    // Speak the text
    speakText();

    // Add active effect
    box.classList.add("active");
    // Remove the active affect after 8 seconds
    setTimeout(() => box.classList.remove("active"), 800);
  });

  main.appendChild(box);
}
// Get all available voices
async function getVoices() {
  // The speechSynthesis.getVoices() returns an array but the process is actually asyncronous, we need to treat it as promise.
  const getVoicesAPI = new Promise((resolve, reject) => {
    // Call multiple times
    let id = setInterval(() => {
      let voicesAPI = speechSynthesis.getVoices();
      // Only need to run this method twice since it returns [] at the first time.
      // console.log(id);
      if (voicesAPI.length > 0) {
        resolve(voicesAPI);
        clearInterval(id);
      }
    }, 10);
  });
  // Get all voices from speech API
  voices = await getVoicesAPI;
  // console.log(voices);
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    // Add new option to select list
    voicesSelect.appendChild(option);
  });
}
// Set the text to be speak
function setTextMessage(text) {
  message.text = text;
}
// Speak the text
function speakText() {
  speechSynthesis.speak(message);
}
// Set voice for speaking
function setVoice(e) {
  message.voice = voices.find((voice) => voice.name === e.target.value);
}
