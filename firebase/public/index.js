const fileForm = document.querySelector("#test-form");
const btnFileSelect = document.querySelector("#btnFileSelect");

fileForm.onsubmit = (event) => {
  event.preventDefault();

  let file = btnFileSelect.files[0];
  
  if (file) {
    console.log("File", file);

    submitData(file);
  } else {
    console.log("Please select a file to upload");
  }

}

const submitData = (file) => {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('name', `time_${Date.now()}`);

  let init = { 
    method: 'POST',
    cache: 'default',
    body: formData
  };

  fetch("http://localhost:3000/occurrence", init).then((response) => {
    return response.json();
  }).then((result) => {
    console.log(result);
  });
}