const {
  User,
  Roles
} = require('./models');

let seedUser = new User({
  username: 'jon',
  password : 'hunter2'
});
seedUser.saveΔ();

let jon = User.findByUsername("jon");
console.log( jon.roles ); // Set {}

jon.grant$( Roles.PUBLIC );
jon.grant$( Roles.ADMIN );
console.log( jon.roles ); // Set { Symbol(ADMIN) }

jon = User.findByUsername("jon");
console.log( jon.roles ); // Set { }, was not saved

jon.grant$( Roles.PUBLIC );
jon.grant$( Roles.ADMIN );
jon.saveΔ();

jon = User.findByUsername("jon");
console.log( jon.roles ); // Set { Symbol(PUBLIC), Symbol(ADMIN) }

jon.revoke$( Roles.ADMIN );
jon.saveΔ();
console.log( jon.hasRole( Roles.ADMIN ) ); // false
