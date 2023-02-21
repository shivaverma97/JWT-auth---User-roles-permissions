const ROLE = {
    ADMIN : "admin",
    USER : 'user'
}

module.exports = {
    ROLE : ROLE,

    Posts : [
        {
            id : 1,
            post : "post1",
            user : "alex"
        },
        {
            id : 2,
            post : "post2",
            user : "john"
        },
        {
            id : 3,
            post : "post3",
            user : "martin"
        },
        {
            id : 4,
            post : "post4",
            user : "daisy"
        },
        {
            id : 5,
            post : "post5",
            user : "kyle"
        },
        {
            id : 6,
            post : "post1",
            user : "alex"
        },
        {
            id : 7,
            post : "post1",
            user : "alex"
        }
    ],
    
    Users : [
        {
            role : ROLE.ADMIN,
            user : "alex"
        },
        {
            role : ROLE.USER,
            user : "john"
        },
        {
            role : ROLE.USER,
            user : "martin"
        },
        {
            role : ROLE.USER,
            user : "daisy"
        },
        {
            role : ROLE.ADMIN,
            user : "kyle"
        }
    ]
}