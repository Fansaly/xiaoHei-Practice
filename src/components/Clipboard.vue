<template>
    <span id="clipboard" :class="{cpied: hasCopied}" @click="copyToClipboard" :data-clipboard-text="context">
        <Icon type="checkmark" v-show="hasCopied"></Icon>
        <Icon type="clipboard" v-show="!hasCopied"></Icon>
    </span>
</template>
<script>
/**
 * 剪切板组件
 * ------------------------
 * 需要父元素指定拷贝内容
 * 当前拷贝内容对象类型 `text`
 */
import Clipboard from 'clipboard'

new Clipboard('#clipboard')

export default {
    name: 'Clipboard',
    props: ['context'],
    data () {
        return {
            hasCopied: false
        }
    },
    methods: {
        copyToClipboard () {

            if (!/[^\s]/.test(this.context)) {

                this.$Message.warning('没有内容需要拷贝。')

                return false

            } else if (this.hasCopied) {

                return false

            } else {

                this.hasCopied = true

                this.$Message.success('代码已拷贝至剪切板。', 2, () => {
                    this.hasCopied = false
                })
            }
        }
    }
}
</script>
<style>
#clipboard {
    position: absolute;
    padding: 2px 4px;
    top: 18px;
    right: 18px;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    overflow: hidden;
}
#clipboard.cpied {
    cursor: default;
}
#clipboard .ivu-icon-checkmark {
    color: #16bf27;
}
#clipboard .ivu-icon-clipboard {
    color: #999;
    transition: color .22s ease;
}
#clipboard .ivu-icon-clipboard:hover {
    color: #666;
}
</style>