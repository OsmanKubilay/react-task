import {useState, useEffect} from 'react'

const Dashboard = () => {

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }, [])
  return (
    <div>
        dashboard
    </div>
  )
}

export default Dashboard