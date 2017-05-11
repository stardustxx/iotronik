const fileForm = document.querySelector("#test-form");
const btnFileSelect = document.querySelector("#btnFileSelect");

fileForm.onsubmit = (event) => {
  event.preventDefault();

  let file = btnFileSelect.files[0];
  
  console.log("File", file);

  uploadImage(file);

}

const uploadImage = (file) => {
  let formData = new FormData();
  formData.append('file', file);

  let init = { 
    method: 'POST',
    mode: 'no-cors',
    cache: 'default',
    body: formData
  };

  fetch("http://localhost:3000/test-image", init).then(response => {
    console.log(response);
  })
}