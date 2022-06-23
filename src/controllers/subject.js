const bcrypt = require("bcrypt-nodejs");
const Subject = require("../models/subject");

const postSubject = (req, res) => {
  const subject = new Subject();
  const {
    department,
    academic_activity,
    activity_code,
    number_credits,
    piaa_version,
    piaa_status,
    file_date,
    theory_hours,
    hoursnon_attendance_reprovals,
    last_chance,
    duration_semester,
    practical_hours,
    presential_teacher_hours,
    maximum_quotas,
    passing_score,
    weeks_duration,
    file_number
  } = req.body;
  subject.department = department;
  subject.academic_activity = academic_activity;
  subject.activity_code = activity_code;
  subject.number_credits = number_credits;
  subject.piaa_version = piaa_version;
  subject.piaa_status = piaa_status;
  subject.file_date = file_date;
  subject.theory_hours = theory_hours;
  subject.hoursnon_attendance_reprovals = hoursnon_attendance_reprovals;
  subject.last_chance = last_chance;
  subject.duration_semester = duration_semester;
  subject.practical_hours = practical_hours;
  subject.theory_hours = theory_hours;
  subject.presential_teacher_hours = presential_teacher_hours;
  subject.maximum_quotas = maximum_quotas;
  subject.passing_score = passing_score;
  subject.weeks_duration = weeks_duration;
  subject.file_number = file_number;

  let subjectData = req.body;
  if (subjectData == null) {
    res.status(404).send({
      message:
        "Todos los campos son obligatorios. ServerSide Warning from postSubject",
    });
  } else {
    subject.save((err, subjectStored) => {
      if (err) {
        res.status(500).send({ message: "La asignatura ya existe." });
      } else {
        if (!subjectStored) {
          res.status(404).send({ message: "Error al crear la asignatura." });
        } else res.status(200).send({ subject: subjectStored });
      }
    });
  }
};

const getSubjects = (req, res) => {
  Subject.find().then((subject) => {
    !subject
      ? res
          .status(404)
          .send({ message: "No se ha encontrado ningún asignatura" })
      : res.status(200).send({ subject });
  });
};

// filtro pedido por pia version
const filterByPIAA = (req, res) => {
  const piaaVersion = req.params.piaa_version;
  Subject.find({ piaa_version: piaaVersion }).then((data) => {
    !data || data == 0
      ? res
          .status(404)
          .send({ message: "Not Found, version del pia: " + piaaVersion })
      : res.status(200).send({ data });
  });
};

async function updateSubject(req, res) {
  const params = req.params;
  let subjectData = req.body;

  /* Actualizamos el resto de los datos */
  Subject.findOneAndUpdate({ _id: params.id }, subjectData, (err, subject) => {
    err
      ? res.status(500).send({ message: "Error del servidor." })
      : !subject
      ? res.status(404).send({ message: "No se encontro la asignatura." })
      : res.status(200).send({ message: "Usuario actualizado correctamente." });
  });
}

const deleteSubject = (req, res) => {
  const { id } = req.params;
  Subject.findByIdAndDelete(id, (err, SubjectDeleted) => {
    err
      ? res.status(500).send({ message: "Error del servidor." })
      : !SubjectDeleted
      ? res.status(404).send({ message: "Asignatura no encontrado." })
      : res
          .status(200)
          .send({ message: "La asinatura ha sido eliminada correctamente." });
  });
};

module.exports = {
  postSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
  filterByPIAA,
};
