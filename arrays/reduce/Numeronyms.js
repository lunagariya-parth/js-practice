const input = "Every developer likes to mix kubernetes and javascript";
function Numeronyms(str) {
  return input.split(" ").map((item) => {
    return item.length > 3 ? item[0] + String(item.length - 2) + item[item.length-1] : item;
  }).join(" ");
}
console.log(Numeronyms(input));