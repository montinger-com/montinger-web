declare global {
  interface String {
    isNotEmpty(): boolean
    isEmpty(): boolean
    capitalizeFirst(): string
    getFileExtension(): string
    isEmail(): boolean
  }
}

if (!String.prototype.isNotEmpty) {
  String.prototype.isNotEmpty = function () {
    return this && this.length > 0
  }
}

if (!String.prototype.isEmpty) {
  String.prototype.isEmpty = function () {
    return !this.isNotEmpty()
  }
}

if (!String.prototype.isEmail) {
  String.prototype.isEmail = function () {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(this.toString())
  }
}

if (!String.prototype.capitalizeFirst) {
  String.prototype.capitalizeFirst = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
}

if (!String.prototype.getFileExtension) {
  String.prototype.getFileExtension = function () {
    return this.slice((Math.max(0, this.lastIndexOf(".")) || Infinity) + 1)
  }
}


export {}