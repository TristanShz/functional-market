type Team = "A" | "B";
type Score = { teamA: number; teamB: number };
type ShotResult = {
  shot: number;
  score: Score;
  teamAShot: number;
  teamBShot: number;
};
type History = ShotResult[];

const randomShot = (result?: number): number =>
  result ?? (Math.random() < 0.5 ? 1 : 0);

const updateScore = (team: Team, score: Score, shot: number): Score =>
  team === "A"
    ? { ...score, teamA: score.teamA + shot }
    : { ...score, teamB: score.teamB + shot };

const hasWinner = (score: Score, shotNumber: number): boolean => {
  const maxShots = 5;
  const shotsLeft = maxShots - shotNumber;
  const lead = Math.abs(score.teamA - score.teamB);

  if (shotsLeft < lead) {
    return true;
  }

  if (shotNumber >= maxShots) {
    return score.teamA !== score.teamB;
  }

  return false;
};

const shootout = (history: History): History => {
  const shotNumber = history.length;
  const score = history[history.length - 1]?.score ?? { teamA: 0, teamB: 0 };
  const currentTeam: Team = shotNumber % 2 === 0 ? "A" : "B";
  const shot = randomShot();

  const updatedScore = updateScore(currentTeam, score, shot);
  const newHistory: ShotResult = {
    shot: shotNumber + 1,
    score: updatedScore,
    teamAShot: currentTeam === "A" ? shot : 0,
    teamBShot: currentTeam === "B" ? shot : 0,
  };

  const newHistoryList = [...history, newHistory];

  if (hasWinner(updatedScore, shotNumber + 1)) {
    return newHistoryList;
  }

  return shootout(newHistoryList);
};

const displayHistory = (history: History): void => {
  const displayShot = (shot: number) => (shot === 1 ? "+1" : "0");
  history.forEach((result) => {
    console.log(
      `Tir ${result.shot} | Score : ${result.score.teamA}/${result.score.teamB} ` +
        `(équipe A : ${displayShot(result.teamAShot)}, équipe B : ${displayShot(
          result.teamBShot,
        )})`,
    );
  });

  const finalScore = history[history.length - 1].score;
  const winner = finalScore.teamA > finalScore.teamB ? "A" : "B";
  console.log(`Victoire : Equipe ${winner}`);
};

const main = () => {
  const history = shootout([]);
  displayHistory(history);
};

main();
