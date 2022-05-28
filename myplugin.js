class MyPlugin {
    apply(compiler) {
        compiler.hooks.done.tap("My Plugin", stats => {
            console.log("MyPlugin: done");
        })

        // webpack 4 에서 지원한다고 한다.
        // compiler.plugin() 함수로 후처리한다
/*        compiler.plugin("emit", (compilation, callback) => {
            const source = compilation.assets["main.js"].source()
            console.log(source)
            callback()
        })*/
    }
}

module.exports = MyPlugin;