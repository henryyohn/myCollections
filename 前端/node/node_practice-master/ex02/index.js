module.exports.compose = middlewares => {
    //     return function () {
    //         return dispatch(0)
    //         function dispatch(i) {
    //             // ##BEGIN## 代码已加密
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEJOSSOEAJEHOSEOESJEHJXIJEHOEOOSXOSOOSOOEJOSSOPSOOIOEXOSSOEIOOOOSXOOE
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOSXOSEJEHJPPJEXOSEOESJPHJEHOPX
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOEAOPJOEXOESJEHJAAOEXOEEOEOOSXOEIOSSJHOOEXOSSOEIOEEOEJOPOOSSJPPJPH
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOPA
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOEAOPJOEXOESJEHJAAOEXOEEOEOOSXOEIOSSJHOOEXOSSOEIOEEOEJOPOOSSJPP
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOSEOESJPPOSEOPJOESOSJOEAOSXOEEOESJEHOESOSSOPEOEAJPPJPHJEHOPX
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOEAOPJOEXOESJEHOSOOSXOEIOEPOOIOEAOSJOSHJPPOSXJEHJPIJEHJHPJPH
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOPAJPH
    // JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJPH
    //             // ##END##
    //         }
    //     }


    // return function () {
    //     return dispatch(0)
    //     function dispatch(i) {
    //         const fn = middlewares[i]
    //         if(!fn) return Promise.resolve()
    //         return Promise.resolve(
    //             fn(function next() {
    //                 return dispatch(i + 1)
    //             })
    //         )
    //     }
    // }
    // 暗号： 排序暗号： 排序暗号： 排序暗号： 排序暗号： 排序暗号： 排序暗号： 排序

    return function() {
        return dispatch(0)
        function dispatch(i) {
            const fn = middlewares[i]
            if(!fn) return Promise.resolve()
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}
