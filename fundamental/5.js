const input = [
  {
    session_id: 1,
    time: '09:00',
    student: {
      student_id: 1,
      name: 'Adi',
    },
    class: {
      class_id: 1,
      name: 'A',
    },
  },
  {
    session_id: 2,
    time: '10:00',
    student: {
      student_id: 5,
      name: 'Surya',
    },
    class: {
      class_id: 3,
      name: 'C',
    },
  },
  {
    session_id: 2,
    time: '10:00',
    student: {
      student_id: 8,
      name: 'Edi',
    },
    class: {
      class_id: 4,
      name: 'D',
    },
  },
  {
    session_id: 2,
    time: '10:00',
    student: {
      student_id: 7,
      name: 'Dede',
    },
    class: {
      class_id: 4,
      name: 'D',
    },
  },
  {
    session_id: 1,
    time: '09:00',
    student: {
      student_id: 3,
      name: 'Bayu',
    },
    class: {
      class_id: 2,
      name: 'B',
    },
  },
  {
    session_id: 1,
    time: '09:00',
    student: {
      student_id: 2,
      name: 'Budi',
    },
    class: {
      class_id: 1,
      name: 'A',
    },
  },
  {
    session_id: 1,
    time: '09:00',
    student: {
      student_id: 4,
      name: 'Dharma',
    },
    class: {
      class_id: 2,
      name: 'B',
    },
  },
  {
    session_id: 2,
    time: '10:00',
    student: {
      student_id: 3,
      name: 'Maha',
    },
    class: {
      class_id: 3,
      name: 'C',
    },
  },
];

function formatArray(input) {
  const result = [];
  for (let i = 0; i < input.length; i++) {
    const { session_id, time, student, class: classData } = input[i];
    const { class_id, name } = classData;

    classData.students = [student];
    if (result.length == 0) {
      result.push({ session_id, time, classes: [classData] });
    } else {
      let idx = result.findIndex((e) => e.session_id == session_id);
      if (idx == -1) {
        result.push({ session_id, time, classes: [classData] });
      } else {
        let classIdx = result[idx].classes.findIndex((e) => e.class_id == class_id);
        if (classIdx == -1) {
          result[idx].classes.push({ class_id, name, students: [student] });
        } else {
          result[idx].classes[classIdx].students.push(student);
        }
      }
    }
  }

  return result;
}

console.log(formatArray(input));
