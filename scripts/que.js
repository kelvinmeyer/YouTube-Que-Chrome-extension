function que(){
  this.length = 0;
  this.data = [];

  this.add = function(data){
      this.length = this.data.push(data);
  }

  this.overloadConstructor = function(q){
    this.length = q.length;
    this.data = q.data;
  }

  this.pop = function(){
    length--;
    var out = this.data[0];
    this.data.shift();
    return out;
  }

  this.nuke = function(){
    this.data = [];
    this.length = 0;
  }

  this.peek = function(){
    return this.data[0];
  }

  this.logElements = function(){
    for(d in this.data){
      console.log(this.data[d]);
    }
  }
}
