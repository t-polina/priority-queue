class Node {
	constructor(data, priority) {
		this.data = data,
			this.priority = priority,
			this.parent = null,
			this.left = null,
			this.right = null
	}

	appendChild(node) {
		if (!this.right) this.left ? this.right = node : this.left = node;
		node.parent = this;
	}

	removeChild(node) {
		if (node != this.left && node != this.right) throw "No childs"
		if (node == this.left) this.left = null
		if (node == this.right) this.right = null
		node.parent = null;
	}

	remove() {
		if (this.parent) this.parent.removeChild(this)
	}

	swapWithParent() {
		if (this.parent) {
			let tmp = {}
			if (this.parent.left && this.parent.left != this) this.parent.left.parent = this
			if (this.left) this.left.parent = this.parent
			if (this.parent.right && this.parent.right != this) this.parent.right.parent = this
			if (this.right) this.right.parent = this.parent

			if (this.parent.parent) {
				if (this.parent == this.parent.parent.left) {
					this.parent.parent.left = this
				}
				if (this.parent == this.parent.parent.right) {
					this.parent.parent.right = this
				}
			}

			tmp.right = this.right
			this.right = this.parent.right
			this.parent.right = tmp.right

			tmp.left = this.left
			this.left = this.parent.left
			this.parent.left = tmp.left


			tmp.parent = this.parent
			this.parent = this.parent.parent
			tmp.parent.parent = this

			if (this.left == this) this.left = tmp.parent
			if (this.right == this) this.right = tmp.parent
		}

	}
}

module.exports = Node;
