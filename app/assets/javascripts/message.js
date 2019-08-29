$(function() {

  function buildHTML(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` :  '';

    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                    <div class"lower-message">
                      <p class="lower-message__content">
                      ${message.content}
                      </p>
                      ${image}
                    </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({  
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      scrollBottom();
    
      function scrollBottom(){
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({
          scrollTop: position
        }, 300, 'swing');
       }
    })
    
    .fail(function(data){
      alert('エラーです');
    })
    
  })

  
      var reloadMessages = function() {
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
            messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
            insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
            $('.messages').append(insertHTML);//メッセージを追加
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
       }
     };
    setInterval(reloadMessages, 5000);
});

