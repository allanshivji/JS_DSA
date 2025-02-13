class MaxBinaryHeap {
  constructor() {
    this.values = []
  }

  insert(element) {
    this.values.push(element)
    this.bubbleUp()
  }

  bubbleUp() { // For any child node at index n, its parent is at index (n - 1)/2
    let idx = this.values.length - 1
    const element = this.values[idx]
    while(idx > 0) {
      let parentIdx = Math.floor((idx - 1)/2)
      let parent = this.values[parentIdx]
      if (element <= parent) {
        break
      }
      this.values[parentIdx] = element
      this.values[idx] = parent
      idx = parentIdx
    }
  }

  extractMax() {
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
        if (leftChild > element) {
          swap = leftChildIdx
        }
      }

      // check for right side
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx]
        if ( 
            (swap===null && rightChild > element) || 
            (swap !== null && rightChild > leftChild) 
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


let heap = new MaxBinaryHeap()
// 41,39,33,18,27,12 
heap.insert(41)
heap.insert(39)
heap.insert(33)
heap.insert(18)
heap.insert(27)
heap.insert(12)
heap.insert(55)
console.log(heap)
console.log(heap.extractMax())
console.log(heap.values)