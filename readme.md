# ql\_cache()

v0.0.1

A simple wrapper for localStorage.

## Usage

Since the localStorage API is only a handful of functions, ql\_cache provides a single function to interact with your browser storage. It's like a getter/setter, but with a few more options than the standard interface. Let's dig in!

### Setting a key

To save data into storage, just pass the key and the value into
`ql_cache()`.

    ql_cache( "some_key", "some value" );

Pretty easy, right? There are a few more options, but we'll get to those
in a minute.

### Retriving a key

To get your data back just pass the key

    ql_cache( "some_key" );

    -- "some value"

### Object and Array support

One of the unfortunate handicaps of localStorage is that it only accepts
strings. `ql_cache` is relies ony JSON.parse() and
JSON.stringify to encode and decode any JSON values (or Arrays) passed into it.

    ql_cache( "my_json", { "my_value": "is awesome" } );

    ql_cache( "my_json" )

    -- { "my_value": "is awesome" }

This also applies to Arrays.

    ql_cache( "my_array", [{ "some": "json" }, { "even more": "json" }] );

    ql_cache( "my_array" );

    [{ "some": "json" }, { "even more": "json" }]

### Persisting values

localStorage is inherently destructive; if you've already set a value to
a key and then set that same key again, your value is overwritten. The
third option is a flag to se" whether or not to use the standard
behavior. It's default value is false.

This since this is really only applicable to keys that already have a
value in storage, let's assume that we're continuing with the "my\_json" example from
above.

    ql_cache( "my_json", { "my_value": "is now EVEN MOAR awesome" } );

    ql_cache( "my_json" );

    [{ "my_value": "is awesome" }, { "my_value": "is now EVEN MOAR awesome" }];

The persist option can either be a boolean or a number. If you pass it a
number, that represents the maximum number of values to store in that
key. The default is to only store 5 values before removing the oldest.

### Expires timestamps

The fourth option is the `expires` flag. This allows you to set a timestamp value
to be saved in another key alongside your value. This takes either a
boolean or a number (preferably a unix timestamp, but it will take any
numeric value) and saves it into "your key" + "\_expires". If you just
pass `true`, the timestamp is set to the current time.

    ql_cache( "my-awesome-key", "a totally rad value", false, true);

    ql_cache( "my-awsome-key_expires" )

    "1234567890123" // the value of Date.now()

## Bugs & Contributions

Please report any issues here on github, and if you want to contribute
just fork it and make a pull request :)

## License

MIT, as always.
