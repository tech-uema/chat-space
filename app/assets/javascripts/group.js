$(document).on('turbolinks:load', function(){

  function buildHTML(users) {
   var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
                <p class='chat-group-user__name'>${user.name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
               </div>`
    
  }

  $(function() {
    $('#user-search-field').on("keyup", function() {
      // var input = $('#user-search-result').val();
      console.log("fire ok");
    });
  });


  $('#user-search-field').on('keyup', function(){
    
    var users = $('#user-search-field').val();
    var url = "/users";
    $.ajax({  
      url: url,
      type: 'GET',
      data: { name: users },
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(users) {
      if (users.length !== 0) {
        users.forEach(function(users){
          buildHTML(users);
        });
      }
      else {
        appendErrMsgToHTML("一致する映画はありません");
      }
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scrollBottom();

    })





  })
});