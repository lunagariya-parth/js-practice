// Write a function that takes two arrays(a and b) as arguments. 
// Create an object that has properties with keys 'a' and corresponding values 'b'.Return the object.

function myFunction(a, b) {
    return a.reduce((acc, cur, i) => ({ ...acc, [cur]: b[i] }), {});
}
 
// myFunction(['a','b','c'],[1,2,3])
// Expected
// {a:1,b:2,c:3}
// myFunction(['w','x','y','z'],[10,9,5,2])
// Expected
// {w:10,x:9,y:5,z:2}
// myFunction([1,'b'],['a',2])
// Expected
// {1:'a',b:2}



// Write a function that takes two objects as arguments.Unfortunately, the property 'b' in the second object has the wrong key.It should be named 'd' instead.Merge both objects and correct the wrong property name.
// Return the resulting object.It should have the properties 'a', 'b', 'c', 'd', and 'e'.

function myFunction(x, y) {
    const { b, ...rest } = y;
    return { ...x, ...rest, d: b };
  }