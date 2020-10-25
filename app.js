(()=>{
  // const model = {
  // }

  const controller = {
    init: function(){
      formView.init();
    },

    checkValidations: function(e){
      e.preventDefault();
      if(formView.title.value === '' || formView.author.value === '' || formView.isbn.value === ''){
        controller.warningMessage('Please fill in all fields', 'error')
      } else {
        controller.addNewBook();
      }
    },

    addNewBook: function(){
      resultView.init();
      controller.warningMessage('Book added successfully', 'success')
      controller.clearAllFields();
    },

    warningMessage: function(message, className){
      warningView.init(message, className)
    },

    clearAllFields: function(){
      formView.title.value = '';
      formView.author.value = '';
      formView.isbn.value = '';
    },

    deleteBook: function(){

    }
  }

  const formView = {
    init: function (){
      this.bookForm = document.getElementById('book-form');
      this.title = document.getElementById('title');
      this.author = document.getElementById('author');
      this.isbn = document.getElementById('isbn');
      this.render()
    },

    render: function(){
      // Add event listener to the submission of the form
      this.bookForm.addEventListener('submit', controller.checkValidations)

    }
  }

  const resultView = {
    init: function(){
      this.bookList = document.getElementById('book-list');
      this.render()
    },

    render: function(){
      resultView.bookList.innerHTML += `
      <tr>
      <td>${formView.title.value}</td>
      <td>${formView.author.value}</td>
      <td>${formView.isbn.value}</td>
      <td><a href="#" class="delete">X<a></td>
      </tr>
      `
    }
  }

  const warningView = {
    init: function(message, className){
      // Create div
      this.div = document.createElement('div');
      // Add classes
      this.div.className = `alert ${className}`;
      // Add text
      this.div.appendChild(document.createTextNode(message));
      // Get parent
      this.container = document.querySelector('.container');
      // Get form
      // this.form = document.querySelector('#book-form');

      this.render();
    },

    render: function(){
      // Insert alert
      if(document.querySelector('.alert') === null){
        this.container.insertBefore(this.div,formView.bookForm);
      
        // Timeout after 3 sec
        setTimeout(function(){
          document.querySelector('.alert').remove();
        }, 3000);
      }
    }
  }

  controller.init();
})()
