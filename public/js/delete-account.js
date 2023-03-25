async function deleteBtnHandler(event){
  event.preventDefault();

  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length -1
  // ];
  const userId = document.querySelector('#userId').value

  const response = await fetch(`/api/dashboard/delete-account/${userId}`, {
    method: 'DELETE',
  });

  if (response.ok){
    document.location.replace(`/`);
  } else {
    alert(response.statusText);
  }
} 

document.querySelector('#deleteAcctBtn').addEventListener('click', deleteBtnHandler);