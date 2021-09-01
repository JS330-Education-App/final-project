// const errorHandler = async function(err, req, res, next) {
//     if (err.message.includes("Cast to ObjectId failed")) {
//         res.status(400).send("Cast to ObjectId failed");
//     } else if (err.message.includes("Bad request")) {
//         res.status(400).send("Email or Password requred");
//     } else if (err.message.includes("Empty request")) {
//         res.status(400).send("Empty request");
//     } else if (err.message.includes("Assignment not found")) {
//         res.status(404).send("Assignment not found");
//     } else if (err.message.includes("Not found")) {
//         res.status(404).send("User not found");
//     } else if (err.message.includes("Invalid request")) {
//         res.status(404).send("Student doesn't have the assignment");
//     } else if (err.message.includes("Unauthorized")) {
//         res.status(401).send("Unauthorized user");
//     } else if (err.message.includes("Password is required")) {
//         res.status(400).send("Password is required");
//     } else {
//         res.status(500).send("Server error");
//     }
// };

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