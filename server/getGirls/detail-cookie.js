var my = `'Cookie': 'accessID=20190319214241558161; ip_loc=44; stadate1=199715830; myloc=44%7C4401; myage=33; mysex=f; myuid=199715830; myincome=30; PHPSESSID=c3875d8c3d9c2060789b542ca4ce7315; SESSION_HASH=b5d105ed27165bc7040ed72e36117b5e7c55fbb9; user_access=1; main_search:200715830=%7C%7C%7C00; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; sl_jumper=%26cou%3D17%26omsg%3D0%26dia%3D0%26lst%3D1970-01-01; last_login_time=1553315969; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3.0; is_searchv2=1; pop_avatar=1; RAW_HASH=F2KBzNI39XO-2zvstfmiM7%2A6k4-Jrvlg-XXcYnCfL0mWT8FJpGHo4l9SFeHQwnsq5Ri%2ATUe1cwywTkkbNVBC5fq6gyd3rlBfpNe7G6Uvobq6TBo.; td_cookie=18446744069817862219; pop_time=1553316371924'`

var my1 = `'Cookie': 'accessID=20190319214241558161; ip_loc=45; stadate1=199715830; myloc=45%7C4401; myage=33; mysex=f; myuid=199715830; myincome=30; PHPSESSID=c3875d8c3d9c2060789b542ca4ce7315; SESSION_HASH=b5d105ed27165bc7040ed72e36117b5e7c55fbb9; user_access=1; main_search:200715830=%7C%7C%7C00; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; sl_jumper=%26cou%3D17%26omsg%3D0%26dia%3D0%26lst%3D1970-01-01; last_login_time=1553315969; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3.0; is_searchv2=1; pop_avatar=1; RAW_HASH=F2KBzNI39XO-2zvstfmiM7%2A6k4-Jrvlg-XXcYnCfL0mWT8FJpGHo4l9SFeHQwnsq5Ri%2ATUe1cwywTkkbNVBC5fq6gyd3rlBfpNe7G6Uvobq6TBo.; td_cookie=18446744069817862219; pop_time=1553316371924'`
/* pop_time: 最后登录时间（随便随机  不校验）
   last_login_time： 不校验
   ip_loc: 不校验
   myloc: 不校验
  stadate1 === myuid === 用别人的
  user_access === 1 / 0 都没事
  accessID=20190319214241558161  默认是你注册的时间   不校验 随便伪造
  PHPSESSID   不校验 可以伪造
  SESSION_HASH    不校验  可以伪造
  COMMON_HASH   !!!校验  重点在这个字段  ---   就是你的账号哈希  要和 RAW_HASH 对应
  RAW_HASH       !!!校验  重点在这个字段
  td_cookie    不校验  可以伪造
*/
var my2 = `'Cookie': 'accessID=20190319214241558161; ip_loc=45; stadate1=199815830; myloc=45%7C4401; myage=33; mysex=f; myuid=199815830; myincome=30; PHPSESSID=c3875d8c3d9c2060789b542ca4ce7315; SESSION_HASH=b5d105ed27165bc7040ed72e36117b5e7c55fbb9; user_access=1; main_search:200715830=%7C%7C%7C00; COMMON_HASH=cc6ec580692f7e2df42323b614bc63fd; sl_jumper=%26cou%3D17%26omsg%3D0%26dia%3D0%26lst%3D1970-01-01; last_login_time=1553315969; PROFILE=200715830%3A%25E5%2596%25B5%25E5%2596%25B5%3Af%3Aimages1.jyimg.com%2Fw4%2Fglobal%2Fi%3A0%3A%3A1%3Azwzp_f.jpg%3A1%3A1%3A50%3A10%3A3.0; is_searchv2=1; pop_avatar=1; RAW_HASH=F2KBzNI39XO-2zvstfmiM7%2A6k4-Jrvlg-XXcYnCfL0mWT8FJpGHo4l9SFeHQwnsq5Ri%2ATUe1cwywTkkbNVBC5fq6gyd3rlBfpNe7G6Uvobq6TBo.; td_cookie=18446744069817862219; pop_time=1553316371924'`
