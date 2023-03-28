const editFormHandler= async (event)=>{
  event.preventDefault();

  const id = window.location.toString().split('/').pop();

  const userId = document.querySelector('#userEditId').value;
  
  const title = document.querySelector('#editTitle').value.trim();
  const content = document.querySelector('#editContent').value;

  const response = await fetch(`/api/dashboard/edit-post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok){
    document.location.replace(`/dashboard/:${userId}`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#editPostForm').addEventListener('submit', editFormHandler);