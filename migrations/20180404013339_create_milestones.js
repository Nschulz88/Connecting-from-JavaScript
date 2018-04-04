
exports.up = function(knex, Promise) {
    return Promise.all([
         knex.schema.createTable('milestones', function(table) {
      table.string('description');
      table.date('date_acheived');
  })
])
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable('milestones')
    ])
};



// description (string)
// date_achieved (date)