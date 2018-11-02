jQuery(document).ready(function($) {
  var body = $('body');

  body.on('click', '.corner:not(.active)', function() {
    var corner = $(this);
    var embed = corner.parents('#embed');
    var corners = embed.find('.corner')
    var cornerId = corner.data('id');
    var cornerContent = embed.find('#'+cornerId);
    var cornerContents = embed.find('.cornerContent');
    corners.removeClass('active');
    corner.addClass('active');
    cornerContents.removeClass('active');
    cornerContent.addClass('active');
    embed.addClass('activeCorner');
  });

  body.on('click', '.corner.active', function() {
    var corner = $(this);
    var embed = corner.parents('#embed');
    var corners = embed.find('.corner')
    var cornerContents = embed.find('.cornerContent');
    corners.removeClass('active');
    cornerContents.removeClass('active');
    embed.removeClass('activeCorner');
  });
});