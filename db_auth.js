var connection = new Mongo("localhost:27017");
var adminDB = connection.getDB("admin");

adminDB.createUser({
	user: "mongoAdmin",
	pwd: "123",
	roles: [ {role: "userAdminAnyDatabase", db: "admin"} ],
});

var projectDB = connection.getDB("project");

projectDB.createUser({
	user: "dbAdmin",
	pwd: "123",
	roles: [ {role: "readWrite", db: "project"} ]
});
