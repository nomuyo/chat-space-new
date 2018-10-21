$(function(){
  function buildHTML(message){
    var image = '';
    if (message.image) {
      image = `<img class="lower-message__image" src="${message.image}">`
    }
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                      ${image}
                    </p>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      // submitボタンの非活性を解除
      $('.form__submit').attr('disabled', false);
      // formのreset
      document.getElementById("new_message").reset();
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500, 'swing');
    })
    .fail(function() {
     alert('メッセージの送信に失敗しました！');
    });
  })
})
