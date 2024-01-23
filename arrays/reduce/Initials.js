const input = "George Raymond Richard Martin";
function initials(str) {
     return str.split(" ").reduce((acc,cur)=>acc+cur.charAt(0),"")
}
 console.log(initials(input));