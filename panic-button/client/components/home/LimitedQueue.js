class LimitedQueue {
    constructor(limit) {
      this.limit = limit;
      this.queue = [];
    }
  
    enqueue(item) {
      if (this.queue.length === this.limit) {
        this.dequeue(); // If the queue is full, remove the first item
      }
      this.queue.push(item);
    }
  
    dequeue() {
      return this.queue.shift();
    }
  }
  
  export default LimitedQueue; 
  