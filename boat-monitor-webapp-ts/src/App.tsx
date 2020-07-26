import React from 'react';
import * as bs from 'react-bootstrap';
import MyMap from "./MyMap";


function App() {
  const [count, setCount] = React.useState(0);

  function incr() {
    return setCount(count + 1);
  }

  return <div>
    <bs.Navbar>
      <bs.Navbar.Brand>Boat Monitor</bs.Navbar.Brand>
      {
        // <bs.Nav.Item>Hi</bs.Nav.Item>
      }
    </bs.Navbar>
    <bs.Container>
      <bs.CardGroup>
        <bs.Card>
          <bs.Card.Header>Count</bs.Card.Header>
          <bs.Card.Body>
            <p>{count}</p>
            <bs.Button onClick={incr}>
              Hi
            </bs.Button>
          </bs.Card.Body>
        </bs.Card>
        <bs.Card>
          <bs.Card.Header>
            Map
          </bs.Card.Header>
          <bs.Card.Body>
            <MyMap/>
          </bs.Card.Body>
        </bs.Card>
      </bs.CardGroup>
    </bs.Container>
  </div>;
}

export default App;
