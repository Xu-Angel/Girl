`"nickname":"<font color="red">三</font><font colo",` // json_江西\jsonP63.json
`喂,要幸福` // json_江西\jsonP18.json
  `"nickname":"花自飘<font color="red">零</font>"` // json_江西\jsonP25.json
  `"nickname":"Ang<font color="red">er</font> 叶子",` // json_湖北\jsonP7.json
  `"nickname":"゛冷銫調.",`   //json_湖北\jsonP21.json:
  `"nickname":"" ___未完待續...",` // 湖南59
`"nickname":"/mg淡茶沉香",` // 湖南88
  `"shortnote":"40岁以上的男士请不要给我发信了，年龄大一些我可以接受，但大太多，我觉得可能会有代沟，谢谢。  年龄比我小三岁的男士请不要给我发信，谢谢。  我不异地，异地的朋友就请不要给我发信…",`  // 四川19
  `"nickname":"ャ.o貊苼.魜",`
`"nickname":"<font color="red">ba</font>by_Anne",` // 云南96
  `"nickname":""~随缘…",` // 云南13
`"nickname":"紫魅",` //甘肃79
//Native 转换 Unicode
function Native2Unicode(v) {
  let r = ''
  for (var i = 0; i < v.length; i++) {
    r += '&#' + v.charCodeAt(i) + ';'
  }
  return r
}
const j = {
  't': "/mg淡茶沉香"
}
//Unicode 转换 Native
function Unicode2Native(v) {
  const code = v.match(/&#(\d+);/g)
  let r = ''
  if (code == null) {
    return ''
  }
  for (var i = 0; i < code.length; i++)
    r += String.fromCharCode(code[i].replace(/[&#;]/g, ''))
}
console.log(Native2Unicode(`"nickname":"<font color="red">三</font><font colo",`))
console.log(Unicode2Native('&#34;&#110;&#105;&#99;&#107;&#110;&#97;&#109;&#101;&#34;&#58;&#34;&#60;&#102;&#111;&#110;&#116;&#32;&#99;&#111;&#108;&#111;&#114;&#61;&#34;&#114;&#101;&#100;&#34;&#62;&#19977;&#60;&#47;&#102;&#111;&#110;&#116;&#62;&#60;&#102;&#111;&#110;&#116;&#32;&#99;&#111;&#108;&#111;&#34;&#44;'))