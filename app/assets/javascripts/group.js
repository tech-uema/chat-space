$(document).on('turbolinks:load', function(){
 


    function buildHTML(user) {
      var html = `<div class="chat-group-user clearfix" id="user_namber${user.name}">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" id='add-btn' data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                  </div>`
      return html;
    }


    function addGroup(user) {
      var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                  </div>`
      return html;
    }

    $('#user-search-field').on('keyup', function(){
      var input = $('#user-search-field').val();
      var url = '/users';
      $.ajax({  
        url: url,
        type: 'GET',
        data: { keyword: input },
        dataType: 'json',
        processData: false,
        contentType: false
        })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = buildHTML(user)
            $('#user-search-result').append(html)
          });
        }
        else {
        }
        })
        .fail(function() {
          alert('ユーザー検索に失敗しました');
        })
  　})

    $(document).on('click','#add-btn',function(){
      var user = {}
      user.id = $(this).attr('data-user-id');
      user.name =$(this).attr('data-user-name');
      var html = addGroup(user)
      $('#goup-menber').append(html);
      $(`#user_namber${user.name}`).empty();
      
    })

    $(document).on('click','.js-remove-btn',function(){
      $(this).parent('div').remove();
    })

});
