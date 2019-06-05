const db = require('./dbConfig');

module.exports = {
  find,
  findById,
  add,
  remove,
  update
};

function find(id = 0, dbn='zoos') {
  
  if(id && id > 0) 
    return db(dbn)
    .where({ id })
    .first();

  return db(dbn);
}

function findById(id) {return find(id)}

async function add(zoo,dbn='zoos') {
  const [id] = await db(dbn).insert(zoo);

  return find(id);
}

function remove(id,dbn='zoos') {
  return db(dbn)
    .where({ id })
    .del();
}

async function update(id, changes, dbn='zoos') {
  let i = await db(dbn)
    .where({ id })
    .update(changes, '*');
  return find(i);
}