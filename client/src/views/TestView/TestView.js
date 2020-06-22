import React, { useEffect } from 'react'

/** Components **/
import { TestComponent } from '../../components';
/** Reactstrap **/
import { Button } from 'reactstrap';

const TestView = () => {

  return (
    <div>
      From View.js
      <TestComponent />
      <Button>Click</Button>
    </div>
  )
}

export default TestView
