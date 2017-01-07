function video(u, n, a, t, c){
  //{url:temp, id:temp.slice(32), num:(q.length+1), active:false, title:'t', channel:'c'}
  this.url = u;
  this.id = u.slice(32);
  this.num = n+1;
  this.active = a;
  this.thumbnail = "https://i.ytimg.com/vi/"+this.id+"/hqdefault.jpg?custom=true&w=120&h=90&jpg444=true&jpgq=90&sp=68&sigh=1aZgAcdjkana70f1uXEkpsMaFIA";
}
