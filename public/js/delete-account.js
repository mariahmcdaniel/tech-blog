const endSesh = async function() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

const deleteAcctHandler = async function (event){
  event.preventDefault();

  // const id = window.location.toString().split('/')[
  //   window.location.toString().split('/').length -1
  // ];
  const userId = document.querySelector('#userId').value

  const response = await fetch(`/api/users/delete-account/${userId}`, {
    method: 'DELETE',
  });

  if (response.ok){
    endSesh();
    return;
  } else {
    alert(response.statusText);
  }
} 

document.querySelector('#deleteAcctBtn').addEventListener('click', deleteAcctHandler);