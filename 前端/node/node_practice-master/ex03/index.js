const fs = require('fs');
const { resolve } = require('path');
module.exports.parser = path => {
    const readStream = fs.createReadStream(path)
    let reqData = [];
    let size = 0;
//     return new Promise(resolve => {
//          // ##BEGIN## 代码已加密
// JEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOOIOSOOJSOEAOEXOSSOOIOEOJHOOEEOESJPPJPEOSOOOIOEAOOIJPEJPAJEHOSOOOIOEAOOIJEHJXIJXAJEHOPX
// JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOEHJIHOOIOEAOOIJHOOEPOPJOEIOSHJPPOSOOOIOEAOOIJPHJXH
// JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEIOSXOPHOSSJEHJPIJXIJEHOSOOOIOEAOOIJHOOEJOSSOESOSPOEAOSHJXH
// JEHJEHJEHJEHJEHJEHJEHJEHOPAJPHJXH
// JEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOOIOSOOJSOEAOEXOSSOOIOEOJHOOEEOESJPPJPEOSSOESOSOJPEJPAJEHOSEOPJOESOSJOEAOSXOEEOESJEHJPPJPHJEHOPX
// JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOSJOEEOESOEIOEAJEHOSOOOIOEAOOIJEHJXIJEHJIEOPJOSEOSEOSSOEXJHOOSJOEEOESOSJOOIOEAJPPOEXOSSOEHJIHOOIOEAOOIJPAJEHOEIOSXOPHOSSJPHJXH
// JEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHJEHOEXOSSOEIOEEOEJOPOOSSJPPJASOJSJAIJAXJHOOEPOOIOEXOEIOSSJPPOSOOOIOEAOOIJHOOEAOEEOJSOEAOEXOSXOESOSPJPPJPHJPHJPH
// JEHJEHJEHJEHJEHJEHJEHJEHOPAJPHJXH
//          // ##END##
//     })

return new Promise(resolve => {
    readStream.on("open", () =>{
        console.log("这是打开文件的监听")
    })

    readStream.on("data",(data) =>{
        reqData.push(data)
        size += data.length
    })

    readStream.on("end",() =>{
        const cData = Buffer.concat(reqData, size)
        resolve(JSON.parse(cData.toString()))
    })
})


}

// console.log(this.parser('./__tests__/data/data.json'))
