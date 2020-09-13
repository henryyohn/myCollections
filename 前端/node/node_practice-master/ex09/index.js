

module.exports.brackets = (target, property) => {
    const old = target.prototype[property]
    target.prototype[property] = msg => {
        msg = `[${msg}]`
        return old(msg)
    }
}
module.exports.sender = name => (target, property) => {

    const old = target.prototype[property]
    if(old) {
        target.prototype[property] = msg => {
            return `${name} : ${msg}`
        }
    }
    //暗号：回溯算法暗号：回溯算法暗号：回溯算法暗号：回溯算法暗号：回溯算法暗号：回溯算法

    // ##BEGIN## 代码已加密
// JEHJEHJEHJEHOSJOEEOESOEIOEAJEHOEEOEJOSOJEHJXIJEHOEAOOIOEXOSPOSSOEAJHOOEPOEXOEEOEAOEEOEAOPPOEPOSSOOOOEPOEXOEEOEPOSSOEXOEAOPPOOE
// JEHJEHJEHJEHOEAOOIOEXOSPOSSOEAJHOOEPOEXOEEOEAOEEOEAOPPOEPOSSOOOOEPOEXOEEOEPOSSOEXOEAOPPOOEJEHJXIJEHOEOOEIOSPJEHJXIJXAJEHOPX
// JEHJEHJEHJEHJEHJEHJEHJEHOEOOEIOSPJEHJXIJEHOOXJPJOPXOESOOIOEOOSSOPAJEHJXPJEHJPJOPXOEOOEIOSPOPAOOX
// JEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOEAOPJOEXOESJEHOEEOEJOSOJPPOEOOEIOSPJPH
// JEHJEHJEHJEHOPA
    // ##END##
}
