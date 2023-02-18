async function commentFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector('#commentContent').value.trim();
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (content){
    const response = await fetch('api/dashboard/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok){
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#commentForm').addEventListener('submit', commentFormHandler);