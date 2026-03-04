export const directives = (app: any) => {
    app.directive('debounce', {
        mounted(el: any, binding: any) {
            // 1. 检查绑定值是否为函数，不是则直接返回
            if(typeof binding.value !== 'function') return
            // 2. 在 DOM 元素上挂载 timer 和 handler
            el.timer = null
            el.handler = function(){
                // 3. 防抖核心：每次点击清除上一次的定时器
                if(el.timer) clearTimeout(el.timer)
                // 4. 设置新定时器，600ms 后执行绑定的函数
                el.timer = setTimeout(() => {
                    binding.value.apply(this, arguments)
                }, 600)
            }
            // 5. 给元素绑定点击事件
            el.addEventListener('click', el.handler)
        },
        beforeUnmount(el: any) {
            if(el.timer){
                clearTimeout(el.timer)
                el.timer = null
            }
            el.removeEventListener('click', el.handler)
        }
    })
}