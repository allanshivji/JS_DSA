class PriorityQueue {
  constructor() {
    this.values = []
  }

  enqueue(val, priority) { // same as insert from Heap
    let newNode = new Node(val, priority)
    this.values.push(newNode)
    this.bubbleUp()
  }

  bubbleUp() { // For any child node at index n, its parent is at index (n - 1)/2
    let idx = this.values.length - 1
    const element = this.values[idx]
    while(idx > 0) {
      let parentIdx = Math.floor((idx - 1)/2)
      let parent = this.values[parentIdx]
      // if (element.priority <= parent.priority) { // if we want less priority or dequeue first
      if (element.priority >= parent.priority) {// if we want more priority or dequeue first
        break
      }
      this.values[parentIdx] = element
      this.values[idx] = parent
      idx = parentIdx
    }
  }

  dequeue() { // same as extractMax from Heap
    const max = this.values[0]
    const end = this.values.pop()
    this.values[0] = end

    // trickle down
    this.sinkDown()

    return max
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length
    const element = this.values[0]

    while(true) { // We found index. Find index of left child by (2 * index + 1) and find index of right child by (2 * index + 2)
      let leftChildIdx = 2 * idx + 1
      let rightChildIdx = 2 * idx + 2
      let leftChild, rightChild;
      let swap = null
      // check left side
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx]
        // if (leftChild.priority > element.priority) {
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx
        }
      }

      // check for right side
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx]
        if ( 
            // (swap===null && rightChild.priority > element.priority) || 
            (swap===null && rightChild.priority < element.priority) || 
            // (swap !== null && rightChild.priority > leftChild.priority) 
            (swap !== null && rightChild.priority < leftChild.priority) 
          ) {
          swap = rightChildIdx
        }
      }

      if (swap === null) break

      this.values[idx] = this.values[swap]
      this.values[swap] = element
      idx = swap
    }
  }
}

class Node {
  constructor(value, priority) {
    this.value = value
    this.priority = priority
  }
}

// Insertion - O(log n)
// Removal - O(log n)
// Search - O(n)


let ER = new PriorityQueue()
ER.enqueue("commom cold", 1)
ER.enqueue("something wound", 5)
ER.enqueue("high fever", 2)
console.log(ER)
console.log(ER.dequeue())
console.log(ER.dequeue())
console.log(ER.dequeue())
