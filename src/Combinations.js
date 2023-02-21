export function findCombinations(forms, conPlayer, min_credit, max_credit) {
  function* combinations(arr, k) {
    for (let i = 0; i < arr.length; i++) {
      if (k === 1) {
        yield [arr[i]];
      } else {
        let subArr = arr.slice(i + 1);
        for (let combo of combinations(subArr, k - 1)) {
          yield [arr[i], ...combo];
        }
      }
    }
  }

  function select_players(groups) {
    let players = [];
    for (let group of groups) {
      players.push(...group);
    }
    let comb = [];
    for (let combi of combinations(players, 8)) {
      let totalScore = combi.reduce((acc, p) => acc + p[1], 0);
      if (
        totalScore >= parseFloat(min_credit) &&
        totalScore <= parseFloat(max_credit)
      ) {
        comb.push(combi);
      }
    }
    return comb;
  }

  const conPlayers = conPlayer.map(({ name }) => name);
  console.log(conPlayers);

  const groups = forms.map(({ formFields }) =>
    formFields.map(({ name, credit }) => [name, parseFloat(credit)])
  );
  const combination = select_players(groups);

  const group_members = forms.map(({ formFields }) =>
    formFields.reduce((acc, { name }) => acc.concat(name), [])
  );

  let pgCount = 0;
  let sgCount = 0;
  let sfCount = 0;
  let pfCount = 0;
  let cCount = 0;
  let totTeams = 0;
  let teamWithRange = [];

  for (let comb of combination) {
    let team = comb.map((player) => player[0]);
    pgCount = 0;
    sgCount = 0;
    sfCount = 0;
    pfCount = 0;
    cCount = 0;

    let flag = 0;
    for (let conPlayer of conPlayers) {
      if (team.includes(conPlayer)) {
        flag = 1;
      } else {
        flag = 0;
        break;
      }
    }

    if (flag === 1) {
      for (let player of team) {
        if (group_members[0].includes(player)) {
          pgCount += 1;
        }
        if (group_members[1].includes(player)) {
          sgCount += 1;
        }
        if (group_members[2].includes(player)) {
          sfCount += 1;
        }
        if (group_members[3].includes(player)) {
          pfCount += 1;
        }
        if (group_members[4].includes(player)) {
          cCount += 1;
        }
      }
      if (
        pgCount > 0 &&
        sgCount > 0 &&
        sfCount > 0 &&
        pfCount > 0 &&
        cCount > 0
      ) {
        totTeams += 1;
        teamWithRange.push([
          team,
          comb.reduce((total, player) => total + player[1], 0),
        ]);
      }
    }
  }
  console.log(totTeams);
  const sorted_list = teamWithRange.sort((a, b) => b[1] - a[1]);
  return sorted_list;
}
