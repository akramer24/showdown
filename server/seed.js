const { db, Batter, Pitcher, User } = require('./db/models');

const data = {
    batters: [
        {
            firstName: 'Gary',
            lastName: 'Sheffield',
            year: 2002,
            onBase: 14,
            SO: [1, 2],
            GB: [3],
            FB: [4, 5, 6],
            BB: [7, 8, 9, 10, 11, 12, 13],
            single: [14, 15],
            singlePlus: [],
            double: [16, 17],
            triple: [],
            homeRun:[18, 19, 20],
            speed: 15,
            bats: 'Right',
            position: 'LF/RF',
            image: 'https://i.ebayimg.com/images/g/qVoAAOSwUEVYDjOi/s-l300.jpg'
        },

        {
            firstName: 'Edgar',
            lastName: 'Martinez',
            year: 2002,
            onBase: 15,
            SO: [1, 2, 3, 4],
            GB: [5, 6],
            FB: [7],
            BB: [8, 9, 10, 11, 12],
            single: [13, 14, 15],
            singlePlus: [],
            double: [16, 17, 18, 19],
            triple: [],
            homeRun: [20],
            speed: 12,
            bats: 'Right',
            position: '3B',
            image: 'https://shlabotnikreport.files.wordpress.com/2017/02/2002-mlb-showdown-edgar-martinez-super-season.jpg?w=214&h=300'
        }

        // {
        //     firstName:
        //     lastName:
        //     year:
        //     onBase:
        //     SO:
        //     GB:
        //     FB:
        //     BB:
        //     single:
        //     singlePlus:
        //     double:
        //     triple:
        //     homeRun:
        //     speed:
        //     bats:
        //     position:
        //     image:
        // },

        // {
        //     firstName:
        //     lastName:
        //     year:
        //     onBase:
        //     SO:
        //     GB:
        //     FB:
        //     BB:
        //     single:
        //     singlePlus:
        //     double:
        //     triple:
        //     homeRun:
        //     speed:
        //     bats:
        //     position:
        //     image:
        // }
    ],

    pitchers: [
        {
            firstName: 'Randy',
            lastName: 'Johnson',
            year: 2002,
            control: 5,
            PU: [1, 2],
            SO: [3, 4, 5, 6, 7, 8, 9, 10, 11],
            GB: [12, 13, 14],
            FB: [15, 16],
            BB: [17, 18, 19],
            single: [20],
            double: [],
            homeRun: [],
            IP: 6, 
            throws: 'Left',
            position: 'SP',
            image: 'http://thumbs3.ebaystatic.com/d/l225/m/msrARJ4agBIJVLHTvTnQqQg.jpg',
        }
    ],

    users: [
        {
            firstName: 'Ari',
            lastName: 'Kramer',
            email: 'arikramer24@gmail.com',
            teamName: 'Diggity Dingers'
        }
    ]
}

db.sync({force: true})
.then(() => {
    data.batters.forEach(batter => {
        Batter.create(batter)
    })
})
.then(() => {
    data.pitchers.forEach(pitcher => {
        Pitcher.create(pitcher)
    })
})
.then(() => {
    data.users.forEach(user => {
        User.create(user)
    })
})
.catch(err => console.error(err));