
const { books, users, admins } = require('../models/collection')



// BOOK FUNCTIONS
addBook = (req, res) => {
    // destructuring
    const { id, bname, title, author, pyear, category, rating, view, admin } = req.body
    if (admin == true) {
        console.log(bname);
        books.findOne({ id: id }).then((book) => {
            if (book) {
                res.status(400).json({
                    message: "book already exist",
                    status: false
                })

            }
            else {
                let book = new books({
                    id: id,
                    bname: bname,
                    title: title,
                    author: author,
                    pyear: pyear,
                    category: category,
                    rating: rating,
                    view: view
                })

                book.save()
                res.status(200).json({
                    message: "book added successfully!",
                    status: true
                })
            }
        })
    }
    else {
        res.status(400).json({
            message: "ACCESS DENIED!",
            status: true
        })
    }

}

// edit book api

editBook = (req, res) => {
    // destructuring
    let { id, bname, title, author, pyear, category, rating, view, admin } = req.body
    if (admin == true) {
        books.findOne({ id: id }).then((book) => {
            if (book) {
                console.log(book);
                if (bname == "") {
                    bname = book.bname;
                }

                if (title == "") {
                    title = book.title;
                }

                if (author == "") {
                    author = book.author;
                }

                if (pyear == "") {
                    pyear = book.pyear;
                }

                if (category == "") {
                    category = book.category;
                }

                if (rating == "") {
                    rating = book.rating;
                }

                if (view == "") {
                    view = book.view;
                }
                books.updateOne({ id: id }, { id: id, bname: bname, title: title, author: author, pyear: pyear, category: category, rating: rating, view: view }).then(data => {
                    res.status(200).json({
                        message: "book updated!",
                        status: true,
                        statusCode: 200,
                    })
                })

            }
            else {
                res.status(400).json({
                    message: "book does not exist",
                    status: false
                })
            }
        })
    }
    else {
        res.status(400).json({
            message: "ACCESS DENIED!",
            status: true
        })
    }


}


deleteBook = (req, res) => {
    const { id, admin } = req.body
    if (admin == true) {
        console.log({ id });
        books.findOne({ id: id }).then((book) => {
            if (book) {
                books.deleteOne({ id: id }).then(data => {
                    res.status(200).json({
                        message: "book removed from db",
                        status: true,
                        statusCode: 200,
                    })
                })
            }
            else {
                res.status(400).json({
                    message: "book not found",
                    status: false
                })
            }
        })
    }
    else {
        res.status(400).json({
            message: "ACCESS DENIED!",
            status: true
        })
    }

}


listBooks = (req, res) => {
    books.find().then((data) => {
        res.status(200).json({
            books: data
        })
    })
}



searchName = (req, res) => {
    // book name ,author name,start year,ending year, category
    let { bname } = req.body

    books.find({ bname: bname }).then((data) => {
        res.status(200).json({
            message: data
        })
    })

}
searchAuth = (req, res) => {
    // book name ,author name,start year,ending year, category
    let { author } = req.body

    books.find({ author: author }).then((data) => {
        res.status(200).json({
            message: data
        })
    })

}

searchYear = (req, res) => {
    let { syear, eyear } = req.body

    syear = parseInt(syear)
    eyear = parseInt(eyear)
    years = []
    for (syear; syear < eyear + 1; syear++) {
        years.push(syear)
    }
    console.log(years);
    books.find({ pyear: years }).then((data1) => {
        res.status(200).json({
            message: data1
        })
    })
}

searchCategory = (req, res) => {
    let { category } = req.body
    books.find({ category: category }).then((data1) => {
        res.status(200).json({
            message: data1
        })
    })
}


// USER FUNCTIONS

userLogin = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email: email, psw: psw }).then((user) => {
        if (user) {
            res.status(200).json({
                message: "LOGGED IN SUCCESSFULLY!"
            })

        }
        else {
            res.status(400).json({
                message: "user not found",
                status: false
            })
        }
    })
}

userRegin = (req, res) => {
    const { email, psw, cpsw } = req.body
    console.log(psw);
    if (psw == cpsw) {
        users.findOne({ email: email }).then((user) => {
            if (user) {
                res.status(400).json({
                    message: "User already exist!"
                })

            }
            else {
                let newUser = new users({
                    email: email,
                    psw: psw
                })
                newUser.save()
                res.status(400).json({
                    message: "user added successfully!",
                    status: true
                })
            }
        })
    }
    else {
        res.status(400).json({
            message: "passwords does not match",
            status: false
        })
    }

}

pswReset = (req, res) => {
    const { email, psw, npsw } = req.body
    console.log(psw);
    if (psw != npsw) {
        users.findOne({ email: email, psw: psw }).then((user) => {
            if (user) {
                users.updateOne({ email: email }, { email: email, psw: npsw }).then(data => {
                    res.status(200).json({
                        message: "password updated!",
                        status: true,
                        statusCode: 200,
                    })
                })

            }
            else {

                res.status(400).json({
                    message: "user not found!",
                    status: false
                })
            }
        })
    }
    else {
        res.status(400).json({
            message: "no change in password",
            status: false
        })
    }

}






module.exports = { addBook, editBook, deleteBook, userLogin, userRegin, pswReset, listBooks, searchName, searchYear, searchCategory, searchAuth }