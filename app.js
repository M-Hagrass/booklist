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
      controller.clearAllFields();
      controller.warningMessage('Book added successfully', 'success')
    },

    warningMessage: function(message, className){
      controller.removeWarningMessage();
      warningView.init(message, className)
    },

    clearAllFields: function(){
      formView.title.value = '';
      formView.author.value = '';
      formView.isbn.value = '';
    },

    removeWarningMessage: function(){

      if(document.querySelector('.alert') !== null){
        document.querySelector('.alert').remove();
        clearTimeout(warningView.removeAfterThreeSeconds);
      }
    },

    deleteBook: function(e){
        if(e.target.className === 'delete'){
          e.target.parentElement.remove();
          controller.warningMessage('Book deleted successfully', 'success')
        }
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
      this.bookList.addEventListener('click', controller.deleteBook)
      this.render()
    },

    render: function(){
      resultView.bookList.innerHTML += `
      <tr>
      <td>${formView.title.value}</td>
      <td>${formView.author.value}</td>
      <td>${formView.isbn.value}</td>
      <td class="delete">X</td>
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

      this.render();
    },

    render: function(){
      // Insert alert
      setTimeout(()=>{
        this.container.insertBefore(this.div,formView.bookForm);
      }, 0)

      // Timeout after 3 sec
      this.removeAfterThreeSeconds = setTimeout(function(){
        if(document.querySelector('.alert') !== null){
          document.querySelector('.alert').remove()
        }
      }, 3000)
    }
  }


  controller.init();
})()
