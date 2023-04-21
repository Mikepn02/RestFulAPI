const { response } = require("express");

// const deleteButtons = document.querySelectorAll('.delete');
// deleteButtons.forEach((button) => {
//   button.addEventListener('click', async (event) => {
//     event.preventDefault();
//     const id = button.dataset.id;
//     const response = await fetch(`/api/users/${id}`, {
//       method: 'DELETE'
//     })
//     if (response.ok) {
//       location.reload();
//     } else {
//       console.log(response.statusText);
//     }
// })
//   });


const form = document.getElementById('update-user')
form.addEventListener('submit',async(event) =>{
  event.preventDefault()
  const formData = new FormData(form)
  const id = formData.get('id')
  await fetch(`api/users/${id}?_method=PUT`,{
    method:'POST',
    body: formData
  })
  .then((response) => response.json)
  .then((data)=>{
    console.log(data)
  }).catch((error) =>{
    console.error(error)
  })
})