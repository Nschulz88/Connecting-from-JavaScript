const input = process.argv.slice(2);

const settings = require('./settings');

const knex = require('knex')({
    client: 'pg',
    connection: {
    // 'postgres://user:pass@localhost:5432/test_db'
    user        : settings.user,
    password    : settings.password,
    database    : settings.database,
    host        : settings.hostname,
    port        : settings.port,
    ssl         : settings.ssl
    }
  });

    knex('famous_people')
    .insert({ 
        first_name: `${input[0]}`,
        last_name: `${input[1]}`,
        birthdate: `${input[2]}`,
    })
    .returning('*')
    .asCallback((err, results) => {
        // console.log(insertResults);
        // knex('famous_people').select().asCallback((err, results) => {
            if(err) {
                console.log('Error', err);
            } else {
                console.log(results)
            }
        // });
        return knex.destroy();
    });


    // TO DELETE A ROW - (where must be specified) : 

    // knex("famous_people")
    // .del()
    // .where({
    //   first_name: 'Elvis'})
    // .returning('*')
    // .asCallback((err, insertResults) => {
    //     console.log(insertResults);
    //     knex('famous_people').select().asCallback((err, results) => {
    //         if(err) {
    //             console.log('Error', err);
    //         } else {
    //             console.log(results)
    //         }
    //     });
    // });