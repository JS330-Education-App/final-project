const errorHandler = async function(err, req, res, next) {

    switch (err.message) {
        case "Cast to ObjectId failed":
            res.status(400).send("Cast to ObjectId failed");
            break;
        case "Invalid request":
            res.status(400).send("Invalid request");
            break;
        case "Not found":
            res.status(404).send("Object not found");
            break;
        case "Invalid assignment":
            res.status(404).send("Student doesn't have the assignment");
            break;
        case "Unauthorized":
            res.status(401).send("Unauthorized user");
            break;
        case "Empty field":
            res.status(400).send("Fill out all required entry fields");
            break;
        case "Token not found":
            res.status(404).send("Token not found");
            break;
        case "Bad token":
            res.status(403).send("Bad token");
            break;
        case "User already exists":
            res.status(409).send("User already exists");
            break;
        case "Passwords do not match":
            res.status(401).send("Passwords do not match");
            break;
        default:
            res.status(500).send("Server error");

    }
};



module.exports = errorHandler;