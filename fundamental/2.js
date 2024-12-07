const input = [1, 4, 2, 3, 5, 3, 2, 4];

function removeDuplicate(input) {
  const uniques = [];
  input.forEach((num) => {
    let unique = true;
    for (let i = 0; i < uniques.length; i++) {
      const element = uniques[i];
      if (num == element) {
        unique = false;
        break;
      }
    }
    if (unique) {
      uniques.push(num);
    }
  });
  return uniques;
}

console.log(removeDuplicate(input));
