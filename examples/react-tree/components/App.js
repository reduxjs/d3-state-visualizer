import React from 'react';

class Box1 extends React.Component {
  render() {
    return <span>box1</span>;
  }
}
class Box2 extends React.Component {
  render() {
    return <span>box2</span>;
  }
}
class Parent extends React.Component {
  render() {
    return (
      <div>
        <Box1/>
        <Box2/>
      </div>
    );
  }
}
class App extends React.Component {
  render() {
    return <Parent/>;
  }
}

export default App;
