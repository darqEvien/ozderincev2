const mahallelerJson = "./src/mahalleler-3.json";

const ilcelerSelect = document.getElementById('ilceler');
const mahalleSelect = document.getElementById('mahalle');




fetchMahalleData();

function fetchMahalleData() {
  console.log(`Inside ${arguments.callee.name}`);
  fetch(mahallelerJson)
    .then((res) => res.json())
    .then((data) => filteringMethod(data))
    .catch((err) => console.log(err));
}

function filteringMethod(data) {
  const uniqueIlceler = [...new Set(data.map(item => item.ilce_adi))];
  uniqueIlceler.forEach(ilce => {
    const option = document.createElement('option');
    option.value = ilce;
    option.textContent = ilce;
    ilcelerSelect.appendChild(option);
});
ilcelerSelect.addEventListener('change', (event) => {
  const selectedIlce = event.target.value;
  const selectedIlceId = data.find(item => item.ilce_adi === selectedIlce)?.ilce_id;
  let value = this.value;
  if (ilcelerSelect.value == 0) {
    document.getElementById("mahalleClass").style.hidden = "none";
  } else {
    document.getElementById("mahalleClass").style.display = "inline";
  }
  
  // Mahalleleri temizle
  mahalleSelect.innerHTML = '<option hidden disabled selected value="0">Lütfen bir mahalle seçiniz</option>';
  
  if (selectedIlceId !== undefined) {
      const mahalleler = data
          .filter(item => item.ilce_id === selectedIlceId)
          .map(item => item.mahalle_adi);

      // Mahalleleri select öğesine ekle
      mahalleler.forEach(mahalle => {
          const option = document.createElement('option');
          option.value = mahalle;
          option.textContent = mahalle;
          mahalleSelect.appendChild(option);
      });
  }
});
}



