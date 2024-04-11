function $(id){
  return document.getElementById(id);
}

function randomNum(a, b) { //a以上b以下の乱数を返す a,bは整数
  return a + Math.floor(Math.random() * (b - a + 1));
}

function timeHyouji(num) {
  let m = Math.floor(num / 60);
  if (m > 99) m = 99;
  if (m < 10) m = "0" + m;
  let s = num % 60;
  if (s < 10) s = "0" + s;
  return m + ":" + s;

}


class Q {
  constructor(){
    this.qNum = 0;
    this.x ;
    this.y ;
    this.a ;
    this.syutudai();
    this.time = 0;
    this.times = [];
  }
  
  hyouji(){
    $("qdiv").innerText = this.x + "×" + this.y;
  }
  
  
  
  syutudai() {
    $("answerInput").value = "";
    this.x = randomNum(1, 9) + randomNum(1,9) *10;
    this.y = randomNum(1, 9) + randomNum(1,9) *10;
    this.a = this.x * this.y;
    this.hyouji();
    clearInterval(timer);
    this.time = 0;
    timer = setInterval(() => {
      this.time += 1;
      $("timediv").innerText = timeHyouji(this.time);
    }, 1000);
    this.qNum++;
  }
}

let timer;
let q = new Q();

function answer(){
  let ans = $("answerInput").value;
  if(ans != q.a)return;
  
  let txt = q.x + "×" + q.y + "=" + q.a + "/" + timeHyouji(q.time) + "<br>";
  $("resultdiv").innerHTML += txt;
  q.times.push(q.time);
  clearInterval(timer);
  q.time = 0;
  $("timediv").innerText = q.timeHyouji();
  
  if (q.qNum >= 10) {
    clearInterval(timer);
    $("timediv").innerText = "";
    let heikinTime;
    for (var i = 0; i < q.times.length; i++) {
      heikinTime += q.times[i];
    }
    heikinTime = Math.round(heikinTime / q.times.length ) ;
    $("resultdiv").innerHTML += "平均タイム:" + timeHyouji(heikinTime) + "<br>";
      return;
  }else{
    setTimeout(()=>{q.syutudai();},2000);
  }
}
