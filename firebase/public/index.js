const fileForm = document.querySelector("#test-form");
const btnFileSelect = document.querySelector("#btnFileSelect");

fileForm.onsubmit = (event) => {
  event.preventDefault();

  let file = btnFileSelect.files[0];
  
  if (file) {
    console.log("File", file);

    uploadImage(file);
  } else {
    console.log("Please select a file to upload");
  }

}

const uploadImage = (file) => {
  let formData = new FormData();
  formData.append('file', file);

  let init = { 
    method: 'POST',
    cache: 'default',
    body: formData
  };

  fetch("http://localhost:3000/test-image", init).then((response) => {
    return response.json();
  }).then((result) => {
    console.log(result);
  });
}