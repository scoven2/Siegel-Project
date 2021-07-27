// middleware for restricting routes a user is not allowed to visit if they are not logged in
module.exports = function(req, rest, next) {

    // if the user is logged in then the request is good to go to the restricted route
    if (req.user) {
        return next();
    }

    // if the user is not logged in then the request is not good to go to the restricted route, instead re-direct them back to the login page
    return rest.redirect("/");
};