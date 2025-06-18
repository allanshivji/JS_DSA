class Heap {

  #heap = []

  getHeap() {
    return [...this.#heap]
  }

  #leftChild(index) {
    return 2 * index + 1
  }

  #rightChild(index) {
    return 2 * index + 2
  }

  #parent(index) {
    return Math.floor((index - 1)/2)
  }

  #swap(index1, index2) {
    [ this.#heap[index1], this.#heap[index2] ] = [ this.#heap[index2], this.#heap[index1] ]
  }

  insert(value) {
    this.#heap.push(value)
    let current = this.#heap.length - 1

    while ( current > 0 && this.#heap[current] > this.#heap[this.#parent(current)] ) {
      this.#swap(current, this.#parent(current))
      current = this.#parent(current)
    }
  }

  remove() {
    if (this.#heap.length === 0) {
      return null
    }
    // One item
    if (this.#heap.length === 1) {
      return this.#heap.pop()
    }

    const maxValue = this.#heap[0]

    this.#heap[0] = this.#heap.pop()
    this.#sinkDown(0)

    return maxValue
  }

  #sinkDown(index) {
    let maxindex = index
    let size = this.#heap.length

    while(true) {
      let leftIndex = this.#leftChild(index)
      let rightIndex = this.#rightChild(index)

      if (this.#heap[leftIndex] > this.#heap[maxindex]) {
        maxindex = leftIndex
      }

      if (this.#heap[rightIndex] > this.#heap[maxindex]) {
        maxindex = rightIndex
      }

      if (maxindex !== index) {
        this.#swap(index, maxindex)
        index = maxindex
      } else {
        return
      }
    }
  }


}

const heap = new Heap()
heap.insert(99)
heap.insert(72)
heap.insert(61)
heap.insert(58)

console.log(heap.getHeap())

heap.insert(100)

console.log(heap.getHeap())

heap.remove() // will remove max value

console.log(heap.getHeap())