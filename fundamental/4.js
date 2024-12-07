const input = ['flower', 'flow', 'flight'];

function findPrefix(input) {
  const prefix = [];
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    if (input[i + 1]) {
      for (let j = 0; j < element.length; j++) {
        const element1 = element[j];
        const element2 = input[i + 1][j];
        if (element1 == element2) {
          prefix.push(element1);
        }
      }
    }
  }
  const result = [];
  for (let i = 0; i < prefix.length; i++) {
    const element1 = prefix[i];
    let isPrefix = false;
    for (let j = i + 1; j < prefix.length; j++) {
      const element2 = prefix[j];
      if (element1 == element2 && j != i) {
        isPrefix = true;
        break;
      }
    }
    if (isPrefix) {
      result.push(element1);
    }
  }
  return result.join('');
}

console.log(findPrefix(input));
