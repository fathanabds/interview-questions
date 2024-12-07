const input = [
  {
    session_name: 'first test',
    classes: [
      {
        class_name: undefined,
        students: [
          {
            name: 'Jhon',
          },
        ],
      },
    ],
  },
  {
    session_name: null,
    classes: [
      {
        class_name: 'second class',
        students: [
          {
            student_name: 'Doe',
          },
        ],
      },
    ],
  },
];

function removeInvalidKey(input) {
  input.forEach((el) => {
    for (key in el) {
      if (!el[key]) {
        delete el[key];
      }
    }
  });

  return input;
}

console.log(removeInvalidKey(input));
