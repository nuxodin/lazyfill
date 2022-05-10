if (!HTMLSlotElement.prototype.assignedElements) {
  HTMLSlotElement.prototype.assignedElements = function () {
    return this.assignedNodes().filter(n => n instanceof Element)
  }
}
