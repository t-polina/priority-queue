const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null
		this.parentNodes = []
		this.size1 = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority)
		this.insertNode(node)
		this.shiftNodeUp(node)
	}

	pop() {
		if (this.root) {
		
			let root = this.detachRoot()
			this.restoreRootFromLastInsertedNode(root)
			this.size1--
			if (root.left) this.shiftNodeDown(this.root)
			return root.data
		}
	}

	detachRoot() {
		const root = this.root
		if (this.parentNodes.indexOf(root) > -1) this.parentNodes.splice(this.parentNodes.indexOf(this.root), 1)
		this.root = null
		return root
	}

	restoreRootFromLastInsertedNode(detached) {
		if (detached.left) {
			this.root = this.parentNodes[this.parentNodes.length - 1]

			if (this.parentNodes.length < 3) this.parentNodes.splice(0, 0, this.root)
			if (this.root.parent.right == this.root && this.root.parent != detached) this.parentNodes.splice(0, 0, this.root.parent)
			this.parentNodes.splice(this.parentNodes.lastIndexOf(this.root), 1)

			if (this.root.parent.left == this.root) {
				this.root.parent.left = null
			} else this.root.parent.right = null

			this.root.left = detached.left
			if (this.root.left) this.root.left.parent = this.root
			this.root.right = detached.right
			if (this.root.right) this.root.right.parent = this.root
			this.root.parent = null
		}
	}

	size() {
		return this.size1;
	}

	isEmpty() {
		if (this.root) return false
		return true
	}

	clear() {
		this.root = null
		this.parentNodes = []
		this.size1 = 0;
	}

	insertNode(node) {
		if (!this.root) {
			this.root = node
			this.parentNodes[0] = this.root
		} else {
			node.parent = this.parentNodes[0]
			if (!node.parent.left) {
				node.parent.left = node
				this.parentNodes.push(node)
			} else {
				node.parent.right = node
				this.parentNodes.splice(0, 1)
				this.parentNodes.push(node)
			}
		}
		this.size1++
	}

	shiftNodeUp(node) {
		if (!node.parent) this.root = node;
		if (node.parent && node.parent.priority < node.priority) {
			if (this.parentNodes.indexOf(node) != -1) {
				if (this.parentNodes.indexOf(node.parent) == -1) {
					this.parentNodes.splice(this.parentNodes.indexOf(node), 1, node.parent)
				} else {
					this.parentNodes[this.parentNodes.indexOf(node)] = node.parent
					this.parentNodes[this.parentNodes.indexOf(node.parent)] = node
				}
			}
			node.swapWithParent()
			this.shiftNodeUp(node)
		}
	}
	shiftNodeDown(node) {
		let rightPriority = -1;
		if (node.right) rightPriority = node.right.priority
		if (node.left) {
			if (node.left.priority > node.priority || rightPriority > node.priority) {
				rightPriority > node.left.priority ? node.right.swapWithParent() : node.left.swapWithParent()
				if (node == this.root) this.root = node.parent

				if (this.parentNodes.indexOf(node.parent) != -1) {
					if (this.parentNodes.indexOf(node) == -1) {
						this.parentNodes.splice(this.parentNodes.indexOf(node.parent), 1, node)
					} else {
						this.parentNodes[this.parentNodes.lastIndexOf(node)] = node.parent
						this.parentNodes[this.parentNodes.lastIndexOf(node.parent)] = node
					}
				}
				this.shiftNodeDown(node)
			}
		}
	}
}

module.exports = MaxHeap;
