//Native 转换 Unicode
function Native2Unicode(v) {
  let r = ''
  for (var i = 0; i < v.length; i++) {
    r += '&#' + v.charCodeAt(i) + ';'
  }
  return r
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