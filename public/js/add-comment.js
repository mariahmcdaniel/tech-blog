async function commentFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector('#commentContent').value.trim();
  const postId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const userId = document.querySelector('#userId').value;

  if (content){
    const response = await fetch('/api/dashboard/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postId,
        text: content,
        user_id: userId,
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