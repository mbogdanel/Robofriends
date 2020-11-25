import React, { useState, useEffect } from 'react'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox.js'
import Scroll from '../components/Scroll.js'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'

function App() {
  // constructor() {
  //     super()
  //     this.state = {
  //         robots: [],
  //         searchfield: ''
  //     }
  // }

  const [robots, setRobots] = useState([])
  const [searchfield, setSearchfield] = useState('')

  // componentDidMount() {
  //     fetch('https://jsonplaceholder.typicode.com/users')
  //         .then(response => response.json())
  //         .then(users => this.setState({ robots: users}));
  // }

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => {
        setRobots(users)
      })
  }, [])

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  })
  if (robots.length === 0) {
    return <h1>Loading</h1>
  } else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    )
  }
}

export default App
