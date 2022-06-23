const express = require("express");
const SubjectController = require("../controllers/subject");
const middleware_user_authenticated = require("../middleware/authenticated_user");
const api = express.Router();

api.post("/subject", SubjectController.postSubject);
api.get("/subjects", SubjectController.getSubjects);

// filtro pedido
api.get("/findsubject/:piaa_version", SubjectController.filterByPIAA);

// edit the rest to subject from user
api.put("/updatesubject/:id", SubjectController.updateSubject);
api.delete("/deletesubject/:id", SubjectController.deleteSubject);

module.exports = api;
