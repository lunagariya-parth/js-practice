function outer() {
    let getY;
    {
      const y = 6;
      getY = () => y;
    }
    console.log(typeof y); 
    console.log(getY()); 
  }
  
  outer();
  