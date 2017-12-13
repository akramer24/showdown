// synce db, start server

const db = require('./server/db');
const app = require('./server');
const PORT = 2005;

db.sync()
    .then(() => {
        console.log('DB synced');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    })
