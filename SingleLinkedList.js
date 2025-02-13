class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}


class SingleLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(val) { // add to end
    let newNode = new Node(val)
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head; 
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }

  unshift(val) { // add new node to begining of the linked list
    let newNode = new Node(val)
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head; 
    } else {
      var current = this.head
      newNode.next = current
      this.head = newNode
    }
    this.length++
    return this
  }

  pop() { // delete from end
    if (this.head === null) { // List is empty
      return undefined
    } else if (this.head.next === null) { // List with one only one node
      this.head = null
      this.tail = null
    } else {
      var current = this.head
      var newTail = current
      while (current.next) {
        newTail = current
        current = current.next
      }
      this.tail = newTail
      this.tail.next = null
    }
    this.length--
    return current
  }

  shift() { // remove from the begining
    if (this.head === null) { // List is empty
      return undefined
    } else if (this.head.next === null) { // List with one only one node
      this.head = null
      this.tail = null
    } else {
      var current = this.head
      this.head = current.next
      current.next = null
    }
    this.length--
    return this
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return undefined
    }
    let count = 0
    var current = this.head
    while (count !== index) {
      current = current.next
      count++
    }
    return current 
  }

  set(index, value) { // Change value of a node at index
    var foundNode = get(index)
    if (!foundNode) {
      return false
    }
    foundNode.val = value
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      return undefined
    }
    if (index === 0) return this.unshift(value) // add to start
    if (index === this.length) return this.push(value) // add to end

    const newNode = new Node(value)
    const temp = this.get(index - 1)
    newNode.next = temp.next
    temp.next = newNode
    this.length++
    return this
  }

  remove (index) {
    if (index < 0 || index >= this.length) return undefined
    if (index === 0) return this.shift() // remove from start
    if (index === this.length) return this.pop() // remove from end

    const nodeToRemovePrev = this.get(index - 1)
    const nodeToRemove = nodeToRemovePrev.next

    nodeToRemovePrev.next = nodeToRemove.next
    nodeToRemove.next = null
    this.length--
    return this
  }

  reverse () {
    var temp = this.head
    this.head = this.tail 
    this.tail = temp

    var next = temp.next
    var prev = null

    for (let i=0; i<this.length; i++) {
      next = temp.next
      temp.next = prev
      prev = temp
      temp = next
    }

    return this
  }

}

const list = new SingleLinkedList()
list.push(3)
list.push(5)
list.push(11)
list.push(22)
console.log('Pushed', JSON.stringify(list))
// list.pop()
console.log('Popped from end',list.pop())
console.log('New List',JSON.stringify(list))
list.unshift(21)
console.log('Unshift/Add to begin 21', JSON.stringify(list))
list.shift()
console.log('Shift/remove from begin 21', JSON.stringify(list))
// list.get(3)
console.log('Get', list.get(0))
console.log(JSON.stringify(list))
console.log('Reverse',JSON.stringify(list.reverse()))
console.log(JSON.stringify(list))