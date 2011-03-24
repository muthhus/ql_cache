/*
* Authors: Sam Breed & Taylor Beseda for Quick Left, 2011
*/

(function($){

window.ql_cache = function (key, value, persist, expires){
  if( typeof key == "undefined" ) return false;

  var data,
      is_json = /^\{|\[.+\}|\]$/,
      cache_value = localStorage.getItem(key);

  // Return value if just the key is passed
  if( typeof value == "undefined" ) {
    // Detect if the string from localStorage tastes like JSON or an Array
    return ( is_json.test(cache_value) ) ? JSON.parse(cache_value): cache_value;
  }

  if( cache_value && persist ) {
    // Stick new value into an array with old value(s)
    data = is_json.test(cache_value) ? JSON.parse( cache_value ): cache_value;

    if( $.isArray(data) ) {
      // Don't hold on to more than 5 objects in a key
      persist = ( typeof persist ==  "number" ) ? persist: 4;
      if( data.length > persist ) data.shift();

      data.push(value);
    } else {
      data = [ data, value ];
    }

  } else {
    data = value;
  }

  // Set an optional expires key, useful for knowing when to refresh cache
  if( expires ) {
    localStorage.setItem( key + "_expires", ( typeof expires == "number" ) ? expires: Date.now() );
  }

  localStorage.setItem( key, ( typeof data == "object" ) ? JSON.stringify(data): data );
};

})(jQuery);
