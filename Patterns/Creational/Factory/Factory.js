// Factory is used for whole object creation
// As opposed to piece wise object creation in the builder pattern

  CoordinateSystem = {
    CARTESIAN : 0,
    POLAR : 1
  };
  
  class Point
  {
    constructor(x, y)
    {
      this.x = x;
      this.y = y;
    }

    /*
        The following constructor is bad practice because:
        1. a & b parameters in the constructor do not give a description of what needs to be provided. They could be anything as far as the person initializing the class knows
        2. if we wanted to add another coordinate system, we'd need to modify the constructor. Violates Open-Closed principle.
    */

    // constructor(a, b, cs=CoordinateSystem.CARTESIAN)
    // {
    //   switch (cs)
    //   {
    //     case CoordinateSystem.CARTESIAN:
    //       this.x = a;
    //       this.y = b;
    //       break;
    //     case CoordinateSystem.POLAR:
    //       this.x = a * Math.cos(b);
    //       this.y = a * Math.sin(b);
    //       break;
    //   }
    // }
  
    static newCartesianPoint(x, y)
    {
      return new Point(x, y);
    }
  
    static newPolarPoint(rho, theta)
    {
      return new Point(rho*Math.cos(theta), rho*Math.sin(theta));
    }
  
    static get factory()
    {
      return new PointFactory();
    }
  }
  
  /* 
    Use factory class over a factory method if:
    You want to adhere to the Single Responsibility Principle and Separation of concerns
    ↳ Creating objects is a separate responsibility.
    ↳ Factory may have methods that are specific to creation - calculations or storing data.
  */

  class PointFactory
  {
    // not necessarily static
    newCartesianPoint(x, y)
    {
      return new Point(x, y);
    }
  
    static newPolarPoint(rho, theta)
    {
      return new Point(rho*Math.cos(theta), rho*Math.sin(theta));
    }
  }
  
  let p1 = new Point(2, 3, CoordinateSystem.CARTESIAN);
  console.log(p1);

  // Point → PointFactory
  let p2 = PointFactory.newPolarPoint(5, Math.PI/2);
  console.log(p2);
  
  // this line will not work if newCartesianPoint is static!
  let p3 = Point.factory.newCartesianPoint(2, 3);
  console.log(p3);