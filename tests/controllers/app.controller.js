module.exports = {
    getIndexPage: (req, res) => {
        if (req.user.isLoggedIn()) {
            return res.send("Hey");
        }

        res.send("Oops. You need to log in to access this page");
    }
}