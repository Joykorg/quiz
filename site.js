// супер дивы
let sup = document.querySelector(".super")
let supstart = document.querySelector(".superstart")
// дивы
let otv = document.querySelectorAll (".otvet")
let start = document.querySelector(".start")
// инд-ы
let vopr = document.querySelector ("#qes")
let time = document.querySelector("#time")
// поля полей
let starrec = 0
let cookie = document.cookie.split('; ')
for (let i = 0; i<cookie.length;i += 1)
{
    if(cookie[i].split('=')[0] == 'rec')
    {
        starrec = cookie[i].split('=')[1]
        time.innerHTML = `${time.innerHTML} рекорд: ${starrec}%`
        break 
    }
}

sup.style.display = 'none'

start.addEventListener('click', function(){
    sup.style.display = 'flex'
    supstart.style.display = 'none'
    setTimeout (function(){
        sup.style.display = 'none'
        supstart.style.display = 'flex'
        let pr = ver / (ver+osh) * 100
        pr = Math.round(pr * 100) / 100
        time.innerHTML = 
        `Результат: ${ver} из ${ver + osh} это ${pr}% 
        ${starrec > 0 ? `${starrec > pr ? `ваш старый рекорд: ${starrec}` : 
        `вы побили ваш старый рекорд на ${pr - starrec}`}%`: ''}`        
        if(ver + osh > 9)
        {
            time.style.fontSize = "90px";
        }
        if(pr > starrec)
        {
            let new_cookie = `rec = ${pr}; max-age=9999999999999999999999999`
            document.cookie = new_cookie
            starrec = pr
        }
        ver = 0;
        osh = 0;
    }, 10000)
})
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) { // Цикл повторяется до тех пор, пока остаются элементы для перемешивания
    randomIndex = Math.floor(Math.random() * currentIndex); // Выбираем оставшийся элемент.
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [    // Меняем местами с текущим элементом.
      array[randomIndex], array[currentIndex]];
  }
  return array; // Возвращаем перемешанный массив
}
function randit1(min, max)
{
    return Math.round(Math.random() * (max - min) + min)
}
let osh = 0
let ver = 0
class Qestion 
{
    constructor ()
    {
        let a = randit1(1, 10)
        let b = randit1(1, 10)
        this.zn = ['+', "-", '*', '/'][randit1(0,3)]
        this.voprosik = `${a} ${this.zn} ${b}`
        if (this.zn == '+')
        {
            this.otvetik4 = a + b
        }
        if (this.zn == '-')
        {
            this.otvetik4 = a - b
        }
        if (this.zn == '*')
        {
            this.otvetik4 = a * b
        }
        if (this.zn == '/')
        {
            this.otvetik4 = a / b
        }
        this.otvetik4 = Math.round(this.otvetik4 * 100) / 100
        this.otvetiki = [this.otvetik4+randit1(-10, 10), this.otvetik4, this.otvetik4+randit1(-10, 10), this.otvetik4+randit1(0, 10), this.otvetik4+randit1(0, 10)]
        shuffle(this.otvetiki)
    }
    kartina ()
    {
        vopr.innerHTML = this.voprosik
        for (let i = 0; i < otv.length; i += 1)
        {
            otv[i].innerHTML = this.otvetiki[i]
        }
    } 
}
let queue1 = new Qestion ()
queue1.kartina()
for (let i = 0; i < 5; i+=1)
{
    otv[i].addEventListener('click', function(){
        if(otv[i].innerHTML == queue1.otvetik4)
        {
            ver++
            otv[i].style.background = '#00FF00'
            anime ({
                targets:  otv[i],
                duration: 2000,
                background: '#FFFFFF',
                delay: 500
            })
        }
        else
        {
            osh++
            otv[i].style.background = '#FF0000'
            anime ({
                targets:  otv[i],
                duration: 2000,
                background: '#FFFFFF',
                delay: 500
            })
        }
        queue1 = new Qestion ()
        queue1.kartina()
        console.log(ver, osh)
    })
}
