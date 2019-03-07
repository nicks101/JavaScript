// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
  // Get form values
  var siteName = document.getElementById('siteName').value;
  var siteURL = document.getElementById('siteURL').value;

  if(!validateForm(siteName, siteURL)){
    return false;
  }

  var bookmark = {
    name : siteName,
    url  : siteURL
  }

/*
  // Local Storage Test : stores only string
  localStorage.setItem('test', 'Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
*/

  // Test if bookmark is null
  if(localStorage.getItem('bookmarks') === null){
    // initial array
    var bookmarks = [];  //JSON array
    // Add to array
    bookmarks.push(bookmark);
    // Set to local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks)); // change to string
  }

  else{
    // get bookmarks from local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Save back to local local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookamrks();

  // prevent form from submitting
  e.preventDefault();
}

// delete Bookmarks
function deleteBookmark(url){
  // get bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop through Bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Save back to local local Storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookamrks();
}


// fetch Booksmarks
function fetchBookamrks(){
  // get bookmarks from local Storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // get output id
  var booksmarksResult = document.getElementById('booksmarksResult');

  // build output
  booksmarksResult.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    booksmarksResult.innerHTML += '<div class="card card-body bg-light">'+
                                  '<h3>' + name +
                                  '  <a class="btn btn-outline-secondary" target="_blank" href="'+url+'">Visit</a>' +
                                  '  <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>' +
                                  '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteURL){

  if(!siteName || !siteURL){
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteURL.match(regex)){
      alert('Plese use a valid URL.');
      return false;
  }
  return true;
}
