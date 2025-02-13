class PriorityQueue {
  constructor() {
    this.values = []
  }

  enqueue(val, priority) {
    this.values.push({ val, priority })
    this.sort()
  }

  dequeue() {
    return this.values.shift()
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority)
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {}
  }

  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
      return true
    }
    return false
  }

  addEdge(vertex1, vertex2, weight) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight })
      this.adjacencyList[vertex2].push({ node: vertex1, weight })
      return true
    }
    return false
  }

  Dijkstra(start, finish) {
    const nodes = new PriorityQueue()
    const distances = {}
    const previous = {}
    let path = []
    let smallest;

    // build up initial state
    for (let vertex of this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0
        nodes.enqueue(vertex, 0)
      } else {
        distances[vertex] = Infinity
        nodes.enqueue(vertex, Infinity)
      }
      previous[vertex] = null
    }

    while(nodes.values.length) {
      smallest = nodes.dequeue().val
      if (smallest === finish) {
        // We are done and build the path
        while(previous[smallest]) {
          path.push(smallest)
          smallest = previous[smallest]
        }
        break
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (neighbour in this.adjacencyList[smallest]) {
          // find neighbouring node
          let nextNode = this.adjacencyList[smallest][neighbour]
          // calculate new distances
          let candidate = distances[smallest] + nextNode.weight
          let nextNeighbour = nextNode.node
          if(candidate < distances[nextNeighbour]) {
            // updating new samllest distance to neightbour
            distances[nextNeighbour] = candidate
            // updating previous - How we got to neighbour
            previous[nextNeighbour] = smallest
            // enqueue in priority with new priority
            nodes.enqueue(nextNeighbour, candidate)
          }
        }
      }
    }
    return path.concat(smallest).reverse()
  }
}