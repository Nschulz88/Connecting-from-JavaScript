const input = process.argv[2];

// console.log(input); Checking my CLI input

const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
    user        : settings.user,
    password    : settings.password,
    database    : settings.database,
    host        : settings.hostname,
    port        : settings.port,
    ssl         : settings.ssl
});

const query = {
    // give the query a unique name
    name: 'find-paul',
    text: `SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1`,
    values: [input]
  }

client.connect((err) => {
    if(err) {
        return console.error('Connection error', err)
    }
    console.log("Searching...");
    client.query(query, (err, result) => {
        if (err) {
          return console.error("error running query", err);
        }
        let resultAmount = result.rows.length;

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

        let myResult = result.rows;
        myResult.forEach(function (e) {
            console.log(`- ${e.id}: ${e.first_name} ${e.last_name}, born ${getDate(e.birthdate)}`);
        });
        client.end();
    });
});