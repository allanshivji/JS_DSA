class Node {
	constructor(value) {
		this.value = value
		this.next = null
	}
}

class Stack {
	constructor() {
		this.top = null
		this.length = 0
	}

	push(value) {
		let newNode = new Node(value)
		if (!this.top) {
			this.top = newNode;
		} else {
			newNode.next = this.top
			this.top = newNode
		}
		this.length++
		return this
	}

	pop() {
		if (!this.top) return undefined

		let temp = this.top
		this.top = this.top.next
		temp.next = null

		this.length--
		return temp
	}

	peek() {
		if (this.isEmpty()) return undefined
		return this.top.value
	}

	isEmpty() {
		return this.top === null
	}
}

const stack = new Stack()
stack.push(1)
stack.push(2)
stack.push(3)
console.log('List', JSON.stringify(stack))
console.log('Peek', stack.peek())
console.log('Popped', stack.pop())
console.log('IsEmpty', stack.isEmpty())
console.log('List', JSON.stringify(stack))