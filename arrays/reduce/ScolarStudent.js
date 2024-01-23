const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob", scores: [75, 80, 85] },
  { name: "Charlie", scores: [90, 95, 85] },
  { name: "Jack", scores: [100, 100, 100] },
];

function ScolarStudents(arr) {
  return students
    .map((student) => {
      const sum = student.scores.reduce((a, c) => a + c);
      return { name: student.name, avg: sum / student.scores.length };
    })
    .filter((student) => student.avg > 90);
}
console.log(ScolarStudents(students));
