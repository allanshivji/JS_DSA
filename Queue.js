class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class Queue {
	constructor() {
		this.first = null
		this.last = null
		this.length = 0
	}

	enqueue(value) {
		let newNode = new Node(value)
		if (!this.first) {
			this.first = newNode
			this.last = newNode
		} else {
			this.last.next = newNode
			this.last = newNode
		}
		this.length++
		return this
	}

	dequeue() {
		if (!this.first) return undefined
		let temp = this.first
		if (this.length === 1) {
			this.first = null
			this.last = null
		} else {
			this.first = this.first.next
			temp.next = null
		}
		this.length--
		return temp
	}
}