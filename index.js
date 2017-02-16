









function parseNames(parseStr, defaults) {
    var argsArr = [];
    var level = 1;

    var names = parseStr.split(',');

    names.forEach((name, ind) => {
        let openBrcCnt = (name.match(/\[/g) || []).length;
        let closeBrcCnt = (name.match(/\]/g) || []).length;

        name = name
            .replace(/ /g, "")
            .replace(/\[/g, "")
            .replace(/\]/g, "");
        
        let ind1 = (level - 1);
        if (!argsArr[ind1]) {
            let diff = (ind1 - argsArr.length) + 1;
            for (let i = 0; i < diff; i++) {
                argsArr.push([]);
            }
        }
        argsArr[ind1].push({
            name: name,
            level: ind1,
            ind: ind,
            value: defaults.args[ind]
        });

        level += openBrcCnt - closeBrcCnt;
    })

    console.log('argsArr:', argsArr);

    return argsArr;
}


function assignValues(args, argsArr) {
    var len = args.length;

    var i = 0;
    var flatArgs = [];
     argsArr.forEach((arg, ind) => {
        arg.forEach((a) => {
            if (args[i]) {
                if (ind > 0) {

                    var notAssgn = flatArgs.every((a1, ind1) => {
                        if (a1.ind > a.ind) {
                            a.value = a1.value;
                            for (var j = ind1; j < flatArgs.length; j++) {
                                flatArgs[j].value = flatArgs[j + 1] ? flatArgs[j + 1].value : args[i];
                            }
                            flatArgs.splice(ind1, 0, a);
                            return false;
                        }
                        return true;
                    })

                    if (notAssgn) {
                        a.value = args[i];
                        flatArgs.push(a);
                    }

                } else {
                    a.value = args[i];
                    flatArgs.push(a);
                }
                i++;
            } else {
                flatArgs.splice(a.ind, 0, a);
            }
        })
    })

    return flatArgs;
}

var parser = function (args, vars, defaults) {
    var varNames = parseNames(vars, defaults);
    var assignedVal =  assignValues(args, varNames);

    return assignedVal.map(a => a.value);
}

module.exports = parser;
