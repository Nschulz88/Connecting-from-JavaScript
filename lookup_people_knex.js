const input = process.argv[2];
const settings = require('./settings');

// console.log(input); Checking my CLI input
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

//  knex.select().from('users') <-- could also do  WOKS <<
knex('famous_people').where('first_name', '=', input).asCallback((err, results) => {
    if(err) {
        console.log('Error', err);
    } else {
        let resultAmount = results.length;
        console.log(`Found ${resultAmount} person(s) by the name '${input}':`);

        function getDate(birthdate) {
            let year = birthdate.getFullYear();
            let month = birthdate.getMonth() +1;
            let day = birthdate.getDate();
                if (month < 10) {
                    month = `0${month}`;
                }
                if (day < 10) {
                    day = `0${day}`;
                }
            let convertedDate = `${year}-${month}-${day}`;
            return convertedDate;
        }

        results.forEach(function (e) {
            console.log(`- ${e.id}: ${e.first_name} ${e.last_name}, born ${getDate(e.birthdate)}`);
        });
    }
});


 

