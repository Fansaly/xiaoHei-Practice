<template>
    <div class="layout-context" :class="{not: !data.hasFile}">
        <Input v-model="context" type="textarea" :autosize="{minRows: 10,maxRows: 42}" placeholder="请获取补丁内容..."></Input>
        <Clipboard :context="context"></Clipboard>
    </div>
</template>
<script>
import Clipboard from './Clipboard'

export default {
    name: 'Context',
    props: ['data'],
    data () {
        return {
            context: ''
        }
    },
    components: {
        Clipboard
    },
    watch: {
        data: function (val, oldVal) {
            // 有文件地址，不为同一地址时，获取文件内容
            if (val.fileURL && val.fileURL !== oldVal.fileURL) {
                this.getContext()

            // 文件地址不存在，文件作者不同时，清空内容区内容
            } else if (!val.fileURL && val.author !== oldVal.author) {
                this.context = ''
            }
        }
    },
    methods: {
        getContext () {
            this.$Loading.start()

            this.axios
                .get(this.data.fileURL)
                .then((response) => {
                    this.context = response.data
                    this.$Loading.finish()
                })
                .catch((error) => {
                    console.log(error)
                    this.$Loading.error()
                })
        }
    }
}
</script>
<style>
.layout-context {
    position: relative;
    padding: 10px;
    height: 100%;
}
.layout-context textarea {
    min-width: 100%;
    max-width: 100%;
    width: auto !important;
    max-height: 95% !important;
    padding: 20px;
    overflow: auto;
    background-color: #fcfcfc;
    color: #565e67;
    font-family: Menlo, Monaco, 'Microsoft YaHei Mono', 'Courier New';
    transition: all .3s ease;
}
.layout-context.not textarea {
    opacity: .6;
    box-shadow: 0 0 6px rgba(0,0,0,.1) inset
}
.ivu-input-wrapper {
    height: 100%;
}
@media screen and (max-height: 400px) {
    .layout-content,
    .layout-context textarea {
        min-height: auto !important;
    }
}
</style>
