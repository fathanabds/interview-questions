const input = require('./6.json');

function worldCup(input) {
  const rank = {};
  for (let i = 0; i < input.length; i++) {
    const { name, group, matches } = input[i];
    let points = 0;
    matches.forEach((element) => {
      const { result } = element;
      switch (result) {
        case 'win':
          points += 3;
          break;
        case 'draw':
          points += 1;
          break;
      }
    });
    if (!rank[group]) {
      rank[group] = [{ name, match_played: matches.length, points }];
    } else {
      rank[group].push({ name, match_played: matches.length, points });
    }
  }
  const result = [];
  for (group in rank) {
    const element = rank[group];
    for (let i = 0; i < 2; i++) {
      element[i].group = group;
      result.push(element[i]);
    }
  }
  return result;
}

console.log(worldCup(input));
