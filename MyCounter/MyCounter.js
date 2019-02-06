var i_trans_scp = [0, 7, 'count-tscp'];
var i_trans_tale = [0, 3, 'count-ttale'];
var i_trans_other = [0, 5, 'count-tother'];
var i_ori_scp = [0, 1, 'count-oscp'];
var i_ori_tale = [0, 1, 'count-otale'];
var i_ori_other = [0, 0, 'count-oother']

i_s = [i_trans_scp,
      i_trans_tale,
      i_trans_other,
      i_ori_scp,
      i_ori_tale,
      i_ori_other]

i_s.forEach(function getIntervals(i){
    i[3] = setInterval(function(){
        if (i[0] === i[1]){
            clearInterval(i[3]);
        }
        document.getElementById(i[2]).innerHTML = i[0]
        i[0]++
    }, 90);
});