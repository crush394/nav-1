const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x) // x变为对象
window.hashMap = xObject ||  [
    {logo:'F',url:'https://www.Figma.com'},
    {logo:'B',url:'https://www.bilibili.com'},
]

const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '') // 删除 / 开头的内容
}

const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)} </div>
                <div class="close">
                <svg class="icon">
                <use xlink:href="#icon-close"></use>
            </svg>
            </div>
            </div>
    </li>`).insertBefore($lastLi)
    $li.on('click',()=>{
        window.open(node.url)
    })
    $li.on('click','.close',(e)=>{
        e.stopPropagation() // 阻止冒泡
        hashMap.splice(index,1)
        render() // 重新渲染
    }) 
    })
}

render()

$('.addButton')
.on('click',()=>{
   let url = window.prompt('请问您要添加的网站网址为')
   if(url.indexOf('http')!==0){
       url = 'https://'+url
   }
hashMap.push({
    logo:simplifyUrl(url)[0].toUpperCase(),
    logoType:'text',
    url:url
})

render()
//    const $li = $(`<li>
//         <div class="site">
//         <div class="logo">${url[0]}</div>
//         <div class="link">${url}</div>
//         </div>
//    </li>`).insertBefore($lastLi)
})

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    // 在本地存储里设置一个x 它的值为string window可省略
    window.localStorage.setItem('x',string)
}
$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})