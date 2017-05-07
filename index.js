//middleware authorization 
function requireRole(role) {
    return function(req, res, next) {
        if (req.session.user && req.session.user.role === role)
            next();
        else
            res.send(403);
    }
}

app.get("/foo", foo.index);
app.get("/foo/:id", requireRole("user"), foo.show);
app.post("/foo", requireRole("admin"), foo.create);

// All bars are protected
app.all("/foo/bar", requireRole("admin"));