const deleteBtnHandler = async function (event){
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
  ];
  const userId = document.querySelector('#userId').value

  const response = await fetch(`/api/dashboard/delete/${id}`, {
    method: 'DELETE',
  });

  if (response.ok){
    document.location.replace(`/dashboard/${userId}`);
  } else {
    alert(response.statusText);
  }
} 

document.querySelector('#deletePostBtn').addEventListener('click', deleteBtnHandler);