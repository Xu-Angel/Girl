import React , {useState} from 'react'
function Example() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p> 你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
      <a
            className="App-link"
            href="./Game"
          >
            Game
          </a>
    </div>
  )
}

export default Example