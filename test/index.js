const test = require('tape');
const {
  User,
  Roles
} = require('../models');

test('User', user => {

  user.test('unsaved should not be findable', should => {
    let unsavedUser = new User({
      username: 'unsavedUser',
      password : 'hunter2'
    });

    let findUnsavedUser = User.findByUsername('unsavedUser');
    should.equal(findUnsavedUser, null, 'unsaved user should not be findable');
    should.end();
  });

  user.test('saved should be findable', should => {
    let savedUser = new User({
      username: 'savedUser',
      password : 'hunter2'
    });
    savedUser.saveΔ();

    let findSavedUser = User.findByUsername('savedUser');
    should.deepEqual(findSavedUser, savedUser, 'saved user should be findable');
    should.end();
  });


  user.test('valid username', should => {
    let findUser = new User({
      username: 'findUser',
      password : 'hunter2'
    });
    findUser.saveΔ();

    let foundUser = User.findByUsername('findUser');
    should.deepEqual(foundUser, findUser, 'finding valid user should return the user');
    should.end();
  });

  user.test('invalid username', should => {
    let lostUser = User.findByUsername('lostUser');
    should.equal(lostUser, null, 'invalid username should return null');
    should.end();
  });

  user.test('has no role', should => {
    let unauthorizedUser = new User({
      username: 'unauthorizedUser',
      password : 'hunter2'
    });
    unauthorizedUser.saveΔ();

    let publicUser = User.findByUsername('unauthorizedUser');
    should.ok(
      Object.keys(Roles)
      .map(key => Roles[key])
      .every(role => !publicUser.roles.has(role) ), 'unauthorizedUser should not have any roles assigned');
    should.end();
  });

  user.test('grant public role', should => {
    let publicUser = new User({
      username: 'publicUser',
      password : 'hunter2'
    });
    publicUser.saveΔ();
    publicUser.grant$(Roles.PUBLIC);

    should.ok(publicUser.roles.has(Roles.PUBLIC), 'publicUser should have role PUBLIC');
    should.ok(!publicUser.roles.has(Roles.ADMIN), 'publicUser should not have role ADMIN');
    should.end();
  });

  user.test('revoke admin role', should => {
    let adminUser = new User({
      username: 'adminUser',
      password : 'hunter2'
    });
    adminUser.saveΔ();
    adminUser.grant$(Roles.PUBLIC);
    adminUser.grant$(Roles.ADMIN);

    should.ok(adminUser.roles.has(Roles.PUBLIC), 'adminUser should have role PUBLIC');
    should.ok(adminUser.roles.has(Roles.ADMIN), 'adminUser should have role ADMIN');

    adminUser.revoke$(Roles.ADMIN);
    should.notOk(adminUser.roles.has(Roles.ADMIN), 'adminUser should not have ADMIN role revoked');
    should.end();
  });

  user.test('changes should not persist if not saved', should => {
    let unsavedChangesUser = new User({
      username: 'unsavedChangesUser',
      password : 'hunter2'
    });
    unsavedChangesUser.saveΔ();
    unsavedChangesUser.grant$(Roles.PUBLIC);
    unsavedChangesUser.grant$(Roles.ADMIN);

    let findUnsavedChangesUser = User.findByUsername('unsavedChangesUser');
    should.notOk(findUnsavedChangesUser.roles.has(Roles.PUBLIC), 'unsavedChangesUser should not have role PUBLIC');
    should.notOk(findUnsavedChangesUser.roles.has(Roles.ADMIN), 'unsavedChangesUser should not have role ADMIN');

    should.end();
  });

  user.test('changes should persist when saved', should => {
    let savedChangesUser = new User({
      username: 'savedChangesUser',
      password : 'hunter2'
    });
    savedChangesUser.saveΔ();
    savedChangesUser.grant$(Roles.PUBLIC);
    savedChangesUser.grant$(Roles.ADMIN);

    savedChangesUser.saveΔ();

    let findSavedChangesUser = User.findByUsername('savedChangesUser');
    should.ok(findSavedChangesUser.roles.has(Roles.PUBLIC), 'savedChangesUser should have role PUBLIC');
    should.ok(findSavedChangesUser.roles.has(Roles.ADMIN), 'savedChangesUser should have role ADMIN');

    findSavedChangesUser.revoke$(Roles.ADMIN);
    findSavedChangesUser.saveΔ();
    should.notOk(findSavedChangesUser.roles.has(Roles.ADMIN), 'savedChangesUser should have ADMIN role revoked');

    should.end();
  });

});
