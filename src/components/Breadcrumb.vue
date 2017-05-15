<template>
    <div class="layout-breadcrumb">
        <Breadcrumb>
            <Breadcrumb-item :href="data.url">
                <Icon type="social-github" v-if="data.domain === 'github.com'"></Icon>
                <Icon type="earth" v-else-if="data.url"></Icon>
                &nbsp;{{ data.author }}
            </Breadcrumb-item>
            <Breadcrumb-item v-if="data.author">
                <Icon type="document-text" v-if="data.hasFile"></Icon>
                <Icon type="document" v-if="!data.hasFile"></Icon>
                {{ file }}
            </Breadcrumb-item>
        </Breadcrumb>
    </div>
</template>
<script>
export default {
    props: ['data'],
    data () {
        return {
            file: ''
        }
    },
    watch: {
        'data.hasFile': function (val) {
            this.file = val || ''
        }
    }
}
</script>
<style>
.ivu-breadcrumb a {
    font-weight: 700;
}
.ivu-breadcrumb-item-separator {
    cursor: default;
    pointer-events: none;
}
</style>
