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
    var out = this.data[0];
    this.data.shift();
    return out;
  }

  this.popVidId = function(){
    var out = this.data[0].slice(32);
    this.data.shift();
    return out;
  }
  //https://www.youtube.com/watch?v= 32 characters

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
