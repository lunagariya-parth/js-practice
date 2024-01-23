// You are given an array of objects representing a collection of employees, each with a name, salary, and department.
// Your task is to use map, filter, and reduce to calculate the average salary for each department and then
// return an array of objects containing only the departments that have an average salary above 65000.

const employees = [
  { name: "John", salary: 50000, department: "IT" },
  { name: "Jane", salary: 60000, department: "HR" },
  { name: "Bob", salary: 55000, department: "IT" },
  { name: "Sophie", salary: 75000, department: "HR" },
  { name: "Mike", salary: 65000, department: "IT" },
  { name: "Emily", salary: 80000, department: "HR" },
  { name: "David", salary: 70000, department: "IT" },
];

function MaxAvgSalDept(employees) {
  const prodByCat = employees.reduce((acc, cur) => {
    if (!acc[cur.department]) {
      acc[cur.department] = [];
    }
    acc[cur.department].push(cur);
    return acc;
  }, {});
  const catAvg = Object.keys(prodByCat).map((dept) => {
    const sum = prodByCat[dept].reduce((a, c) => (a += c.salary), 0);
    return { dept: dept, avg: Number((sum / prodByCat[dept].length).toFixed(0)) };
  });
    return catAvg.filter((dept)=>dept.avg>65000)
}
console.log(MaxAvgSalDept(employees));
