async function editFormHandler(event){
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
  ];
  
  const title = document.querySelector('#editTitle').value.trim();
  const content = document.querySelector('#editContent').value;

  const response = await fetch(`api/posts/${id}`, {
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
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#editPostForm').addEventListener('submit', editFormHandler);