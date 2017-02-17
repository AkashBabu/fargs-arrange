function assignValues(_arguments, parseStr, defaultVal) {

    var argsArr = [];
    var level = 0;

    var varNames = parseStr.split(','); // Split the given parseStr exp into names

    varNames.forEach((name, ind) => {
        let openBrcCnt = (name.match(/\[/g) || []).length; // Count the number of '[' in the name
        let closeBrcCnt = (name.match(/\]/g) || []).length; // Count the number of ']' in the name

        name = name
            .replace(/ /g, "")
            .replace(/\[/g, "")
            .replace(/\]/g, ""); // remove ' ', '[' & ']'

        if (!argsArr[level]) {
            let diff = (level - argsArr.length) + 2;
            for (let i = 0; i < diff; i++) {
                argsArr.push([]);
            }
        }
        argsArr[level].push({
            name: name,
            level: level,
            ind: ind,
            val: defaultVal.args[ind]
        });

        level += openBrcCnt - closeBrcCnt;
    })

    var len = _arguments.length;

    var i = 0;
    var flatArgs = [];
    argsArr.forEach((arg, ind) => {
        arg.forEach((a) => {
            if (_arguments[i]) {
                if (ind > 0) {

                    var notAssgn = flatArgs.every((a1, ind1) => {
                        if (a1.ind > a.ind) {
                            a.val = a1.val;
                            for (var j = ind1; j < flatArgs.length; j++) {
                                flatArgs[j].val = flatArgs[j + 1] ? flatArgs[j + 1].val : _arguments[i];
                            }
                            flatArgs.splice(ind1, 0, a);
                            return false;
                        }
                        return true;
                    })

                    if (notAssgn) {
                        a.val = _arguments[i];
                        flatArgs.push(a);
                    }

                } else {
                    a.val = _arguments[i];
                    flatArgs.push(a);
                }
                i++;
            } else {
                flatArgs.splice(a.ind, 0, a);
            }
        })
    })

    // console.log('flatArgs:', flatArgs);
    return flatArgs;
}

var parser = function(_arguments, parseStr, defaultVal) {
        return assignValues(_arguments, parseStr, defaultVal).map(a => a.val);
    }
    // var parser = function (args, vars, defaults) {
    //     // var varNames = parseNames(vars, defaults);
    //     var assignedVal =  assignValues(args, varNames);
    //
    //     return assignedVal.map(a => a.val);
    // }

module.exports = parser;
