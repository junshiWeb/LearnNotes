var navitems = document.querySelector('.nav').querySelectorAll('a')
    for(var i = 0; i < navitems.length; i++) {
      navitems[i].addEventListener('click',function() {
        for (let j = 0; j < navitems.length; j++) {
            navitems[j].className = ''          
        }
        this.className = 'nav-item-change'
        console.log('111');
      })
    }
    console.log(navitems);