let a = [
  { id: 1, name: "hosain_" },
  { id: 2, name: "Ahmed" },
  { id: 3, name: "Shawon" },
];
let b = [
  { id: 1, name: "hosain_" },
  { id: 2, name: "Ahmed" },
  { id: 3, name: "Shawon" },
];
let x = [1, 2, 3];
let y = [1, 2, 4];

let ab = [...a, ...b];
let xy = [...x, y];
console.log(xy);
