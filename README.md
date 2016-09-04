# ECMAScript Mutable Method Naming

Convention for JavaScript to mark methods as "dangerous methods" and methods with side effects

This is a living document to describe the usage of special method naming markers.

Discussions go in [Issues](https://github.com/theRemix/ECMAScript-Mutable-Method-Naming/issues).

Forking for proposed updates to the convention is encouraged.

This repo also includes some code samples of it's usage.

`npm start`

`npm install` _to run tests_

`npm test`

## Mutating methods $

Lets methods that mutate the owner/context be easily readable.

```
let existingUser = User.findByUsername("jon");
console.log( existingUser.roles ); // Set { }

existingUser.grant$( Roles.ADMIN );
console.log( existingUser.roles ); // Set { Symbol(ADMIN) }
```

## Side effect methods Δ

Lets methods that create side effects be easily readable.

```
let jon = new User({ username : 'jon', password : 'hunter2' });
jon.saveΔ();
```

> Side effects are lies.
_- Uncle Bob_

In this case, (and maybe all cases), a side effect does not have to occur

```
// mutates, without other side effects
datastore.add$( jon );
```

### Delta Δ

it's purposefully a hassle to type so that the author is very aware of the decision to allow side effects.

_open to suggestions for other markers_

#### On Windows

Hold down the ALT key and type 0916 on the keypad
_Note: alt code greater than 255 are not universal and will only work in applications that support them such as Wordpad or Words_

#### On Mac OS

Hold down the Option key and press J

Or Cmd+Ctrl+Space and search "Delta"

#### In HTML

`&Delta;` or `&#916;`
