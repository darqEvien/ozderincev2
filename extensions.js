import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyAKNMTOMEAfiSs3MIgDe6sgDCPD2qtvSoE",
  authDomain: "voiceflowproject-1.firebaseapp.com",
  projectId: "voiceflowproject-1",
  storageBucket: "voiceflowproject-1.appspot.com",
  messagingSenderId: "854779509286",
  appId: "1:854779509286:web:d0b1a4a84d97d69b1c44e7",
  measurementId: "G-FP76TE5D64",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`;

export const FormExtension = {
  name: "Forms",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_form" || trace.payload.name === "ext_form",
  render: ({ trace, element }) => {
    const formContainer = document.createElement("form");

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="text"], input[type="email"], input[type="tel"] {
              width: 100%;
              border: none;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              background: transparent;
              margin: 5px 0;
              outline: none;
            }
            .phone {
              width: 150px;
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
              margin-top:1rem
            }
            h1,p{
              margin: 1em auto;
              text-align: center;
            }
            input[type="text"],input[type="email"],input[type="number"],input[type="tel"],#dropdown,#ilceler,#mahalle{
              width: 90%;
              text-align: left;
              margin: 0.25rem 0 0 1rem;
            }
            input,select,textarea{
              margin: 0;
              min-height: 2em;
              font-size: inherit;
              border: 1px solid #76ABAE;
              border-radius: 0.25rem;
            }
            input,textarea{
              background-color: #EEEEEE;
              border: 1 px solid #76ABAE;
              color: black;
            }
            #mahalleClass{
              display: none;
            }
            #input__field{
              display: none;
            }
          </style>

          <label for="phone">Telefon Numarası</label>
            <P>Numaranızı başında 0 olmadan yazınız.</P>
            <input type="tel" name="phone" class="phone" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" max-length="10" required
                placeholder="5554443322"><br><br>
       
       
              <label for="ilceler">İlçeler</label>
              <select id="ilceler" class="form-control" >
                  <option hidden disabled selected value="0">Lütfen bir ilçe seçiniz</option>
              </select><br><br>
        

            <div id="mahalleClass">
                <label for="mahalle">Mahalleler</label>
                <select id="mahalle" class="form-control" >
                    <option hidden disabled selected value="0">Lütfen bir mahalle seçiniz</option>
                </select>
            </div><br><br>
            <div id="input__field">
              <label for="sokak">Sokak</label>
              <input type="text" placeholder="ABC SK" class="sokak" name="sokak"><br><br>
              <label for="binaAdi">Bina Adı</label>
              <input type="text" placeholder="ABC Apartmanı" class="binaAdi" name="binaAdi"><br><br>
              <label for="daireNo">Daire No</label>
              <input type="text" placeholder="8" name="daireNo" class="daireNo"><br><br>
              </div>
            <input type="submit" class="submit" value="Submit">
            <script src="https://www.gstatic.com/firebasejs/10.13.1/firebase.js"></script>
              
        `;
    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const phone = formContainer.querySelector(".phone");
      const ilcelers = formContainer.querySelector("#ilceler");
      const mahalles = formContainer.querySelector("#mahalle");
      const sokak = formContainer.querySelector(".sokak");
      const binaAdi = formContainer.querySelector(".binaAdi");
      const daireNo = formContainer.querySelector(".daireNo");
      console.log(ilcelers.value);
      if (
        !phone.checkValidity() ||
        !ilcelers.checkValidity() ||
        !mahalles.checkValidity() ||
        !sokak.checkValidity() ||
        !binaAdi.checkValidity() ||
        !daireNo.checkValidity()
      ) {
        phone.classList.add("invalid");
        ilcelers.classList.add("invalid");
        mahalles.classList.add("invalid");
        sokak.classList.add("invalid");
        binaAdi.classList.add("invalid");
        daireNo.classList.add("invalid");
        return;
      }

      formContainer.querySelector(".submit").remove();

      window.voiceflow.chat.interact({
        type: "complete",
        payload: {
          phone: phone.value,
          ilcelers: ilcelers.value,
          mahalles: mahalles.value,
          sokak: sokak.value.toUpperCase(),
          binaAdi: binaAdi.value.toUpperCase(),
          daireNo: daireNo.value.toUpperCase(),
        },
      });
      console.log(payload[phone]);
    });

    function resetInputs() {
      const sokak = formContainer.querySelector(".sokak");
      const binaAdi = formContainer.querySelector(".binaAdi");
      const daireNo = formContainer.querySelector(".daireNo");
      sokak.value = "";
      binaAdi.value = "";
      daireNo.value = "";
    }
    const mahallelerJson = "./mahalleler-3.json";

    const ilcelerSelect = formContainer.querySelector("#ilceler");
    const mahalleSelect = formContainer.querySelector("#mahalle");

    fetchMahalleData();

    function fetchMahalleData() {
      fetch(mahallelerJson)
        .then((res) => res.json())
        .then((data) => filteringMethod(data))
        .catch((err) => console.log(err));
    }

    function filteringMethod(data) {
      const uniqueIlceler = [...new Set(data.map((item) => item.ilce_adi))];
      uniqueIlceler.forEach((ilce) => {
        const option = document.createElement("option");
        option.value = ilce;
        option.textContent = ilce;
        ilcelerSelect.appendChild(option);
      });
      ilcelerSelect.addEventListener("change", (event) => {
        const selectedIlce = event.target.value;
        const selectedIlceId = data.find(
          (item) => item.ilce_adi === selectedIlce
        )?.ilce_id;
        if (ilcelerSelect.value == 0) {
          formContainer.querySelector("#mahalleClass").style.hidden = "none";
        } else {
          formContainer.querySelector("#mahalleClass").style.display = "block";
        }

        // Mahalleleri temizle
        mahalleSelect.innerHTML =
          '<option hidden disabled selected value="0">Lütfen bir mahalle seçiniz</option>';

        if (selectedIlceId !== undefined) {
          const mahalleler = data
            .filter((item) => item.ilce_id === selectedIlceId)
            .map((item) => item.mahalle_adi);

          // Mahalleleri select öğesine ekle
          mahalleler.forEach((mahalle) => {
            const option = document.createElement("option");
            option.value = mahalle;
            option.textContent = mahalle;
            mahalleSelect.appendChild(option);
          });
        }
        mahalleSelect.addEventListener("change", (event) => {
          if (mahalleSelect.value == 0) {
            formContainer.querySelector("#input__field").style.hidden = "none";
          } else {
            formContainer.querySelector("#input__field").style.display =
              "block";
          }
          resetInputs();
        });
      });
    }

    element.appendChild(formContainer);
  },
};

export const MapExtension = {
  name: "Maps",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_map" || trace.payload.name === "ext_map",
  render: ({ trace, element }) => {
    const GoogleMap = document.createElement("iframe");
    const { apiKey, origin, destination, zoom, height, width } = trace.payload;

    GoogleMap.width = width || "240";
    GoogleMap.height = height || "240";
    GoogleMap.style.border = "0";
    GoogleMap.loading = "lazy";
    GoogleMap.allowFullscreen = true;
    GoogleMap.src = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${origin}&destination=${destination}&zoom=${zoom}`;

    element.appendChild(GoogleMap);
  },
};

export const VideoExtension = {
  name: "Video",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_video" || trace.payload.name === "ext_video",
  render: ({ trace, element }) => {
    const videoElement = document.createElement("video");
    const { videoURL, autoplay, controls } = trace.payload;

    videoElement.width = 240;
    videoElement.src = videoURL;

    if (autoplay) {
      videoElement.setAttribute("autoplay", "");
    }
    if (controls) {
      videoElement.setAttribute("controls", "");
    }

    videoElement.addEventListener("ended", function () {
      window.voiceflow.chat.interact({ type: "complete" });
    });
    element.appendChild(videoElement);
  },
};

export const TimerExtension = {
  name: "Timer",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_timer" || trace.payload.name === "ext_timer",
  render: ({ trace, element }) => {
    const { duration } = trace.payload || 5;
    let timeLeft = duration;

    const timerContainer = document.createElement("div");
    timerContainer.innerHTML = `<p>Time left: <span id="time">${timeLeft}</span></p>`;

    const countdown = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(countdown);
        window.voiceflow.chat.interact({ type: "complete" });
      } else {
        timeLeft -= 1;
        timerContainer.querySelector("#time").textContent = timeLeft;
      }
    }, 1000);

    element.appendChild(timerContainer);
  },
};

export const FileUploadExtension = {
  name: "FileUpload",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_fileUpload" || trace.payload.name === "ext_fileUpload",
  render: ({ trace, element }) => {
    const fileUploadContainer = document.createElement("div");
    fileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' style='display: none;'>
     
    `;

    const fileInput = fileUploadContainer.querySelector("input[type=file]");
    const fileUploadBox = fileUploadContainer.querySelector(".my-file-upload");

    fileUploadBox.addEventListener("click", function () {
      fileInput.click();
    });

    fileInput.addEventListener("change", function () {
      const file = fileInput.files[0];
      console.log("File selected:", file);

      fileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`;

      var data = new FormData();
      data.append("file", file);

      fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Upload failed: " + response.statusText);
          }
        })
        .then((result) => {
          fileUploadContainer.innerHTML =
            '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">';
          console.log("File uploaded:", result.data.url);
          window.voiceflow.chat.interact({
            type: "complete",
            payload: {
              file: result.data.url.replace(
                "gs://voiceflowproject-1.appspot.com/",
                "gs://voiceflowproject-1.appspot.com/"
              ),
            },
          });
        })
        .catch((error) => {
          console.error(error);
          fileUploadContainer.innerHTML = "<div>Error during upload</div>";
        });
    });

    element.appendChild(fileUploadContainer);
  },
};

export const KBUploadExtension = {
  name: "KBUpload",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_KBUpload" || trace.payload.name === "ext_KBUpload",
  render: ({ trace, element }) => {
    const apiKey = trace.payload.apiKey || null;
    const maxChunkSize = trace.payload.maxChunkSize || 1000;
    const tags = `tags=${JSON.stringify(trace.payload.tags)}&` || "";
    const overwrite = trace.payload.overwrite || false;

    if (apiKey) {
      const kbfileUploadContainer = document.createElement("div");
      kbfileUploadContainer.innerHTML = `
      <style>
        .my-file-upload {
          border: 2px dashed rgba(46, 110, 225, 0.3);
          padding: 20px;
          text-align: center;
          cursor: pointer;
        }
      </style>
      <div class='my-file-upload'>Drag and drop a file here or click to upload</div>
      <input type='file' accept='.txt,.text,.pdf,.docx' style='display: none;'>
    `;

      const fileInput = kbfileUploadContainer.querySelector("input[type=file]");
      const fileUploadBox =
        kbfileUploadContainer.querySelector(".my-file-upload");

      fileUploadBox.addEventListener("click", function () {
        fileInput.click();
        
      });

      fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];

        kbfileUploadContainer.innerHTML = `<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/upload/upload.gif" alt="Upload" width="50" height="50">`;

        const formData = new FormData();
        formData.append("file", file);

        fetch(
          `https://api.voiceflow.com/v3alpha/knowledge-base/docs/upload?${tags}overwrite=${overwrite}&maxChunkSize=${maxChunkSize}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: apiKey,
            },
            body: formData,
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Upload failed: " + response.statusText);
              window.voiceflow.chat.interact({
                type: "error",
                payload: {
                  id: 0,
                },
              });
            } 
          })
          .then((result) => {
            if(file){
              const storageRef = ref(storage,`files/${fileInput.files[0].name}`);
              uploadBytes(storageRef, file);
            }
            kbfileUploadContainer.innerHTML =
              '<img src="https://s3.amazonaws.com/com.voiceflow.studio/share/check/check.gif" alt="Done" width="50" height="50">';
            window.voiceflow.chat.interact({
              type: "complete",
              payload: {
                id: result.data.documentID || 0,
              },
            });
          })
          .catch((error) => {
            console.error(error);
            kbfileUploadContainer.innerHTML = "<div>Error during upload</div>";
          });
      });
      element.appendChild(kbfileUploadContainer);
    }
  },
};

export const DateExtension = {
  name: "Date",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_date" || trace.payload.name === "ext_date",
  render: ({ trace, element }) => {
    const formContainer = document.createElement("form");

    // Get current date and time
    let currentDate = new Date();
    let minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 1);
    let maxDate = new Date();
    maxDate.setMonth(currentDate.getMonth() + 2);

    // Convert to ISO string and remove seconds and milliseconds
    let minDateString = minDate.toISOString().slice(0, 16);
    let maxDateString = maxDate.toISOString().slice(0, 16);

    formContainer.innerHTML = `
          <style>
            label {
              font-size: 0.8em;
              color: #888;
            }
            input[type="datetime-local"]::-webkit-calendar-picker-indicator {
                border: none;
                background: transparent;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
                bottom: 0;
                outline: none;
                color: transparent;
                cursor: pointer;
                height: auto;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: auto;
                padding:6px;
                font: normal 8px sans-serif;
            }
            .meeting input{
              background: transparent;
              border: none;
              padding: 2px;
              border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
              font: normal 14px sans-serif;
              outline:none;
              margin: 5px 0;
              &:focus{outline:none;}
            }
            .invalid {
              border-color: red;
            }
            .submit {
              background: linear-gradient(to right, #2e6ee1, #2e7ff1 );
              border: none;
              color: white;
              padding: 10px;
              border-radius: 5px;
              width: 100%;
              cursor: pointer;
              opacity: 0.3;
            }
            .submit:enabled {
              opacity: 1; /* Make the button fully opaque when it's enabled */
            }
          </style>
          <label for="date">Select your date/time</label><br>
          <div class="meeting"><input type="datetime-local" id="meeting" name="meeting" value="" min="${minDateString}" max="${maxDateString}" /></div><br>
          <input type="submit" id="submit" class="submit" value="Submit" disabled="disabled">
          `;

    const submitButton = formContainer.querySelector("#submit");
    const datetimeInput = formContainer.querySelector("#meeting");

    datetimeInput.addEventListener("input", function () {
      if (this.value) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    });
    formContainer.addEventListener("submit", function (event) {
      event.preventDefault();

      const datetime = datetimeInput.value;
      console.log(datetime);
      let [date, time] = datetime.split("T");

      formContainer.querySelector(".submit").remove();

      window.voiceflow.chat.interact({
        type: "complete",
        payload: { date: date, time: time },
      });
    });
    element.appendChild(formContainer);
  },
};

export const ConfettiExtension = {
  name: "Confetti",
  type: "effect",
  match: ({ trace }) =>
    trace.type === "ext_confetti" || trace.payload.name === "ext_confetti",
  effect: ({ trace }) => {
    const canvas = document.querySelector("#confetti-canvas");

    var myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });
    myConfetti({
      particleCount: 200,
      spread: 160,
    });
  },
};

export const FeedbackExtension = {
  name: "Feedback",
  type: "response",
  match: ({ trace }) =>
    trace.type === "ext_feedback" || trace.payload.name === "ext_feedback",
  render: ({ trace, element }) => {
    const feedbackContainer = document.createElement("div");

    feedbackContainer.innerHTML = `
          <style>
            .vfrc-feedback {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .vfrc-feedback--description {
                font-size: 0.8em;
                color: grey;
                pointer-events: none;
            }

            .vfrc-feedback--buttons {
                display: flex;
            }

            .vfrc-feedback--button {
                margin: 0;
                padding: 0;
                margin-left: 0px;
                border: none;
                background: none;
                opacity: 0.2;
            }

            .vfrc-feedback--button:hover {
              opacity: 0.5; /* opacity on hover */
            }

            .vfrc-feedback--button.selected {
              opacity: 0.6;
            }

            .vfrc-feedback--button.disabled {
                pointer-events: none;
            }

            .vfrc-feedback--button:first-child svg {
                fill: none; /* color for thumb up */
                stroke: none;
                border: none;
                margin-left: 6px;
            }

            .vfrc-feedback--button:last-child svg {
                margin-left: 4px;
                fill: none; /* color for thumb down */
                stroke: none;
                border: none;
                transform: rotate(180deg);
            }
          </style>
          <div class="vfrc-feedback">
            <div class="vfrc-feedback--description">Was this helpful?</div>
            <div class="vfrc-feedback--buttons">
              <button class="vfrc-feedback--button" data-feedback="1">${SVG_Thumb}</button>
              <button class="vfrc-feedback--button" data-feedback="0">${SVG_Thumb}</button>
            </div>
          </div>
        `;

    feedbackContainer
      .querySelectorAll(".vfrc-feedback--button")
      .forEach((button) => {
        button.addEventListener("click", function (event) {
          const feedback = this.getAttribute("data-feedback");
          window.voiceflow.chat.interact({
            type: "complete",
            payload: { feedback: feedback },
          });

          feedbackContainer
            .querySelectorAll(".vfrc-feedback--button")
            .forEach((btn) => {
              btn.classList.add("disabled");
              if (btn === this) {
                btn.classList.add("selected");
              }
            });
        });
      });

    element.appendChild(feedbackContainer);
  },
};
