async function newFormHandler(event){
  event.preventDefault();
  const id = document.querySelector('#userId').value;
  const title = document.querySelector('#newTitle').value;
  const content = document.querySelector('#newContent').value;

  const response = await fetch(`/api/dashboard/`, {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      content: content,
      user_id: id,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (response.ok) {
    document.location.replace(`/dashboard/${id}`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#newPostForm').addEventListener('submit', newFormHandler);