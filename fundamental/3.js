const input = [9, 6, 4, 2, 3, 5, 7, 0, 1];

function findMissingNum(input) {
  const dict = [9, 6, 4, 2, 3, 5, 7, 0, 1, 8];
  let missing;
  dict.forEach((num) => {
    let founded = false;
    for (let i = 0; i < input.length; i++) {
      const element = input[i];
      if (num == element) {
        founded = true;
        break;
      }
    }
    missing = num;
  });
  return missing ? missing : 'complete numbers list';
}

console.log(findMissingNum(input));
