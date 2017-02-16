  










var fargsParser = require("./index");

function test() {
    let [name, email, age, callback, a] = fargsParser(arguments, 'name, email [, age], callback [, a]', {
        args: ["Akash", "akash@gmail.com", 23, function(){console.log('callback')}, 123
            // {
            //     name: "name",
            //     default: "Akash"
            // }, {
            //     name: "email",
            //     default: "akash@gmail.com"
            // }, {
            //     name: "age",
            //     default: 21
            // }, {
            //     name: "callback",
            //     default: function(){
            //         console.log("Callback");
            //     }
            // }, {
            //     name: "a",
            //     default: 123
            // }
        ]
    });

    console.log('name:', name);
    console.log('email:', email);
    console.log('age:', age);
    console.log('callback:', callback);
    console.log('a:', a);

}


test('cavin', 'cavin@mail.com', 235, function(){
    console.log('callback');
});
