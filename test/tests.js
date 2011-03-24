
// documentation on writing tests here: http://docs.jquery.com/QUnit
// example tests: https://github.com/jquery/qunit/blob/master/test/same.js

// below are some general tests but feel free to delete them.
$(function(){

module("Basic Requirements");

  test("Should be attached to the window",function(){
    expect(1);

    ok( !!window.ql_cache, "ql_canvas should be present");
  });

  test("should do nothing with no options", function(){
    equals( ql_cache(), false, "doesn't do anything");
  });

  test("should store and retrieve simple strings", function(){
    localStorage.clear();

    ql_cache("key", "value");

    equals( ql_cache("key"), "value", "string storage and retrival");
  });

module("Object and Array handling");

  test("should handle JSON storage and retrieval", function(){
    localStorage.clear();

    var key, value = { "food": "hotdogs"};

    ql_cache("key", value);

    key = ql_cache("key");

    deepEqual( key, value, "JSON object is stored and retrived as expected");
  });


  test("should handle Array storage and retrieval", function(){
    localStorage.clear();

    expect(2);

    var value1 = [ { "food": "hotdogs"}, { "food": "bratz"} ],
        value2 = [ "hotdogs", "bratwurst" ];

    ql_cache("json_array", value1 );
    ql_cache("simple_array", value2 );

    deepEqual( ql_cache("json_array"), value1, "works with arrays of JSON objects");
    deepEqual( ql_cache("json_array"), value1, "and works with simple arrays");
  });

module("Persisting values within a key");

  test("should persist values with the same key", function(){
    localStorage.clear();

    expect(4);

    var value1 = { "food": "hotdogs"},
        value2 = { "food": "bratz"};

    ql_cache("persist", value1);
    ql_cache("persist", value2, true );

    equals( $.isArray( ql_cache("persist") ) , true, "should return an array of objects");
    equals( ql_cache("persist").length , 2, "should have a length of 2");

    ql_cache("persist", value2, true );

    equals( ql_cache("persist").length , 3, "should increment length when more values are added");

    deepEqual( ql_cache("persist"), [ value1, value2, value2 ], "should match the array of expected values" );
  });


  test("should only hold on to 5 values for a given key", function(){
    localStorage.clear();

    expect(3);

    ql_cache("persist", '1');
    ql_cache("persist", '2', true );
    ql_cache("persist", '3', true );
    ql_cache("persist", { "k": "v" }, true );
    ql_cache("persist", '5', true );

    deepEqual( ql_cache("persist"), [ "1", "2", "3", { "k": "v" }, "5" ], "should match the array of expected values" );

    ql_cache("persist", "6", true);

    equals( ql_cache("persist").length , 5, "should still have a length of 5");
    deepEqual( ql_cache("persist"), [ "2", "3", { "k": "v" }, "5", "6" ], "should match the array of expected values" );

  });


  test("should clear a value if persist is false", function(){
    localStorage.clear();

    expect(2);

    var value1 = { "food": "hotdogs"},
        value2 = { "food": "bratz"};

    ql_cache("persist", value1);
    ql_cache("persist", value2, true );

    deepEqual( ql_cache("persist"), [ value1, value2 ], "should match the array of expected values" );

    ql_cache("persist", "empty");

    equals( ql_cache("persist") , "empty", "should reflect the new value");

  });

module("Setting an expires key");

  test("should be set when expires is true", function(){
    localStorage.clear();

    expect(2);

    ql_cache('gonna_expire', "some value", false, true);

    equals( typeof ql_cache("gonna_expire_expires"), "string", "sets expires key to current time");
    equals( ql_cache("gonna_expire_expires").length, 13, "and it's a time string");

  });

  test("should update when key is updated", function(){
    localStorage.clear();

    var old_time,
        new_time;

    ql_cache('gonna_expire', "some value", false, true);

      old_time = ql_cache("gonna_expire_expires");

    ql_cache('gonna_expire', "some updated value", false, true);

      new_time = ql_cache("gonna_expire_expires");


    ok( old_time !== new_time, "time string was updated");
  });

  test("should set a future timestamp if expires is passed a number", function(){
    localStorage.clear();

    var d = new Date();

    d.setHours( d.getHours() + 1 );

    ql_cache('gonna_expire', "some value", false, d.getTime() );

    equals( ql_cache('gonna_expire_expires'), d.getTime(), "should respect any number that's passed into it");

  });


});
