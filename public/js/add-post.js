async function newFormHandler(event){
  event.preventDefault();

  const title = document.querySelector('#newTitle').value;
  const content = document.querySelector('#newContent').value;

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#newPostForm').addEventListener('submit', newFormHandler);