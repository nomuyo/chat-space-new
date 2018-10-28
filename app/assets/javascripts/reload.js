$(function() {
  function buildHTML(message) {
    var html =`<div class="message" data-message-id="${message.id}">
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
                      ${message.image ? `<img class="lower-message__image" src="${message.image}">` : ''}
                    </p>
                  </div>
                </div>`
    return html;
  }
  function reload(){
    var id = $('.message:last').data('message-id');
    var pathname = location.pathname;
    if ( pathname.indexOf('messages') != -1) {
      $.ajax({
        type: 'GET',
        url: pathname,
        data: { latestId: id },
        dataType: 'json'
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var html = buildHTML(message);
          $('.messages').append(html);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500, 'swing');
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      })
    }
  }
  setInterval(reload, 5000);
});



