class StoreLocal {
  constructor () {
    this.store = window.localStorage;
    this.isOn = true;
    this.listeners = {};
    // this.handleStorageEvent = this.handleStorageEvent.bind(this);
  }

  /**Disbale this.set();*/
  off() { this.isOn = false; }
  /**Enable this.set();*/
  on() { this.isOn = true; }

  /**
    Sets a key value pair in localStorage.
    @param {string} key - The key to set.
    @param {*} value - The value to set for the key.
    @description - if this.isOn bool is false, do not set new values.
    a.)if val is date, check if valid && convert to ISO
    b.)if val is object, must stringify
  */
  set(key, value) {
    if (!this.isOn) return;

    if (value instanceof Date && !isNaN(value)) {
      value = value.toISOString();
    } else if (typeof value === 'object') {
      value = JSON.stringify(value);
    } else if (typeof value === undefined) {
      value = 'undefined';
    }
    this.store.setItem(key, value);
  }

  /**
  Returns the value of the key from localStorage.
  @param {string} key - The key to get.
  @returns {*} The value of the key.
  */
  get(key) {
    let value = this.store.getItem(key);
    if (value === null) {
      return null;
    }
    try {
      value = JSON.parse(value);
    } catch (e) {
      if (e instanceof SyntaxError) {
        if (value === 'undefined') {
          return undefined;
        }
        if (value === 'null') {
          return null;
        }
        if (value === 'true') {
          return true;
        }
        if (value === 'false') {
          return false;
        }
        if (/^-?\d+$/.test(value)) {
          return Number(value);
        }
        if (/^-?\d+\.\d+$/.test(value)) {
          return Number(value);
        }
      } else {
        throw e;
      }
    }

    if (value instanceof Date) {
      return new Date(value);
    }

    return value;
  }

  has(key) {
    return this.store.getItem(key) !== null;
  }

  /**
  Removes the key value pair from localStorage.
  @param {string} key
  */
  remove(key) {
    this.store.removeItem(key);
  }

  /*Reset local storage*/
  clear() {
    this.store.clear();
  }

  /**
  Returns the key at the given index from localStorage.
  @param {number} index - The index of the key to get.
  @returns {string} The key at the given index.
  */
  key(index) {
    return this.store.key(index);
  }

  /**
  Returns the number of key value pairs in localStorage.
  @returns {number} The number of key value pairs in localStorage.
  */
  length() {
    return this.store.length;
  }

  /**
  Returns all key value pairs in localStorage as an object.
  @returns {Object} An object containing all key value pairs in localStorage.
  */
  getEntries() {
    const entries = {};
    for (let i = 0; i < this.store.length; i++) {
      const key = this.store.key(i);
      entries[key] = this.get(key);
    }
    return entries;
  }

  /**
  Returns all keys in localStorage as an array.
  @returns {string[]} An array containing all keys in localStorage.
  */
  getKeys() {
    const keys = [];
    for (let i = 0; i < this.store.length; i++) {
      keys.push(this.store.key(i));
    }
    return keys;
  }

  /**
   * not currently in use
  Handles a storage event from localStorage.
  @private
  @param {StorageEvent} event - The storage event to handle.
  handleStorageEvent(event) {
    const { key, newValue, oldValue } = event;
    if (this.listeners[key]) {
      for (const listener of this.listeners[key]) {
        listener({ key, newValue, oldValue });
      }
    }
  }
  */
};

export default new StoreLocal();