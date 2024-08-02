$(function() {
  
  // your code here
  let currentUserID = 1;

  function fetchUserData(userID){
    $.ajax({
      url: `https://dummyjson.com/users/${userID}`,
      type:'GET',
      success: function(data) {
        displayUserData(data);
        fetchUserPosts(userID);
        fetchUserTodos(userID);
      },
      error: function(error) {
        reject(error)
      }
    })
  }

  function displayUserData(data){
    $('.info__image img').attr('src', data.image);
    $('.info__content').html(`<h2>${data.firstName} ${data.lastName}</h2> <p>Age:${data.age}</p> <p>Email: ${data.email}</p><p>Phone: ${data.phone}`
    )
    $('.posts h3').html(`${data.firstName}'s Posts`)
    $('.todos h3').html(`${data.firstName}'s To Dos`)
  }

  // PostList

  function fetchUserPosts(userID)  {
    $.ajax({
      url: `https://dummyjson.com/users/${userID}/posts`,
      type:'GET',
      success: function(data) {
        displayUserPosts(data.posts);
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  function displayUserPosts(posts) {
    const postList = $('.posts ul');
    postList.empty();
    if(posts.length === 0){
      postList.append('<li>User has no posts</li>')
    }else {
      posts.forEach(post => {
        const postItem = $(`<li><h4 class="postTitle" data-id="${post.id}">${post.title}</h4><p>${post.body}</p></li>`)
        postList.append(postItem);
      })
    }
  }

  // Todolist

  function fetchUserTodos(userID)  {
    $.ajax({
      url: `https://dummyjson.com/users/${userID}/todos`,
      type:'GET',
      success: function(data) {
        displayUserTodos(data.todos);
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  function displayUserTodos(todos) {
    const todoList = $('.todos ul');
    todoList.empty()
    if (todos.length === 0){
      todoList.append('<li>User has no todos')
    }else{
      todos.forEach(todo => {
        todoList.append(`<li>${todo.todo}</li>`);
      })
    }
  }

  const h3 = $('h3')

  //h3 click Event

  $('.posts h3, .todos h3').click(function() {
    $(this).next().slideToggle();
  });

  //modal

  function fetchPostDetails(postid)  {
    $.ajax({
      url: `https://dummyjson.com/posts/${postid}`,
      type:'GET',
      success: function(post) {
        displayUserModal(post);
      },
      error: function(error) {
        console.log(error)
      }
    })
  }


  function displayUserModal(post) {
    const modalHtml = `
      <div class="overlay open">
        <div class="modal open">
          <div class="modal-content">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <p>Views: ${post.views}</p>
            <button id="closeModal">Close Modal</button>
          </div>
        </div>
      </div>
    `;
    $('body').append(modalHtml);
  }

  $(document).on('click', '.postTitle', function() {
    const postID = $(this).data('id');
    fetchPostDetails(postID); 
  });


  $(document).on('click', '#closeModal', function() {
    $('.overlay').remove();
  });
  

  //next

  $('button:contains("Next User")').click(function() {
    currentUserID = currentUserID === 30 ? 1 : currentUserID + 1;
    fetchUserData(currentUserID);
  });

  //previous

  $('button:contains("Previous User")').click(function() {
    currentUserID = currentUserID === 1 ? 30 : currentUserID - 1;
    fetchUserData(currentUserID);
  });
  

  fetchUserData(currentUserID);
  
})