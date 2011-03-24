$(function(){

  $('#cache-it').live('click', function(e){
    e.preventDefault();
    
    var is_json = /^\{|\[.+\}|\]$/,
        key = $('#key').val(),
        value = $('#value').val(),
        persist = $('#persist').attr('checked') ? true: false,
        expires = $('#expires').attr('checked') ? true: false;

    try {
      // Since we're grabbing JSON out of a form field (not normal),
      // it needs to be run through JSON.parse on the way in.
      // Normal use cases DON'T need this step
      ql_cache( key, is_json.test(value) ? JSON.parse(value): value , persist, expires );
    } catch(error){
      throw error.message;
    }

    $('#results pre')
      .show()
      .empty()
      .html('Cached!');

    $('#get-it').attr('disabled', '');

  });

  $('#get-it').live('click', function(e){
    e.preventDefault();

    var key = $('#key').val(),
        value = ql_cache( key ),
        expires = ql_cache( key + "_expires");

    $('#results pre')
      .show()
      .empty()
      .append( typeof value == "object" ? JSON.stringify(value) : value  );

    if( expires )
     $('#results pre').append(" expires: "+ expires);
  });
});

