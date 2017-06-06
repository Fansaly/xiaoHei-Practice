<template>
    <span class="clipboard">
        <span v-show="hasCopied">
            <Icon type="checkmark"></Icon>
        </span>
        <span v-show="!hasCopied" @click="copyToClipboard" id="clipboard" :data-clipboard-text="context">
            <Icon type="clipboard"></Icon>
        </span>
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

/* eslint-disable no-new */
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
.clipboard {
    position: absolute;
    top: 18px;
    right: 18px;
    font-size: 18px;
    line-height: 1;
    cursor: default;
    overflow: hidden;
}
.clipboard span {
    padding: 2px 4px;
}
.clipboard .ivu-icon-checkmark {
    color: #16bf27;
}
#clipboard {
    color: #999;
    cursor: pointer;
    transition: color .22s ease;
}
#clipboard:hover {
    color: #666;
}
</style>
