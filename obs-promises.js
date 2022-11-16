const {observable, async, Observable} = require('rxjs')

const doSomething = () =>{
    return new Promise((resolve => {
        resolve('Valor 1');
    }))
}

const {observable, async} = require('rxjs')

const doSomething$ = () =>{
    return new Observable(observer => {
        observer.next('valor 1 $');
    })
}

(async () => {
    const rta = await doSomething();
    console.log(rta)
})();

( () => {
    const obs$ = doSomething$();
    obs$.subscribe(rta => {
        console.log(rta)
    })
})();