const datastore = new Map();

module.exports = class User {

  static findByUsername(username){
    return datastore.has(username) ?
      new User(datastore.get(username)) :
      null;
  }

  /*
   * constructor is used to also create clones
   * instead of using the actual value stored
   * in the datastore
   */
  constructor({ username, password, roles }){
    this.username = username;
    this.password = password;
    this.roles = roles || new Set();
  }

  grant$(role){
    this.roles.add(role);
  }

  revoke$(role){
    this.roles.delete(role);
  }

  hasRole(role){
    return this.roles.has(role);
  }

  saveΔ(){
    datastore.set(this.username, new User(this));
  }

};
