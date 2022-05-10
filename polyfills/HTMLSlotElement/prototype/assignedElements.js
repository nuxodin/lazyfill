if (!HTMLSlotElement.prototype.assignedElements) {
  HTMLSlotElement.prototype.assignedElements = function () {
    return Array.from(this.assignedNodes()).filter(n => n instanceof Element)
  }
}
