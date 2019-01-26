const u1 = {name : 'Cynthia'};
const u2 = {name : 'Jackson'};
const u3 = {name : 'Olive'};
const u4 = {name : 'James'};

const userRoles = new Map();

userRoles.set(u1, 'User').set(u2, 'User').set(u3, 'Admin'); 

console.log(userRoles);

for(let ur of userRoles.entries())
console.log(`${ur[0].name}: ${ur[1]}`);

for(let [u,r] of userRoles.entries())
console.log(`${u.name}: ${r}`);

for(let [u,r] of userRoles)
console.log(`${u.name}: ${r}`);

[...userRoles.values()];
console.log([...userRoles.values()])